# MAZÉLIA — TECHNICAL ARCHITECTURE SPECIFICATION

**Dokumen Versi:** 1.0 — Architecture Blueprints  
**Status:** Approved for Implementation  
**Penulis:** Senior Software Architect & Lead Full-Stack Engineer  
**Teknologi Utama:** Next.js 15+ (App Router), TypeScript, Supabase SSR  
**Tanggal:** November 2026  

---

## 1. Pola Arsitektur: Modular Monolith

MAZÉLIA dibangun dengan arsitektur **Modular Monolith** dalam satu repositori (*monorepo single app*). Pendekatan ini dipilih secara sadar untuk menghindari kompleksitas operasional *microservices* yang prematur, namun tetap menjaga isolasi domain yang rapi melalui modularisasi kode berbasis fitur (*feature-based folder structure*).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 15 APP ROUTER                           │
├────────────────────────────────────────────────────────────────────────┤
│  SERVER-SIDE RESPONSIBILITIES:                                         │
│  • React Server Components (RSC): Fetch data privat langsung via RLS   │
│  • Server Actions: Menangani mutasi data (CUD) dengan validasi Zod     │
│  • Edge Middleware: Session refresh, RBAC gatekeeper, route redirect   │
│  • Route Handlers (/api): Endpoint webhook (Midtrans) & public RSVP    │
├────────────────────────────────────────────────────────────────────────┤
│  CLIENT-SIDE RESPONSIBILITIES:                                         │
│  • Client Component Islands: Form interaktif, modal, slider, filter    │
│  • Optimistic UI Updates: Centang checklist instan sebelum server sync │
│  • Currency Formatter: Pemisah ribuan Rupiah saat mengetik             │
│  • URL State Management: Sinkronisasi filter tabel via search params   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                         PostgreSQL Query via JWT
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        SUPABASE PLATFORM ENGINE                        │
├────────────────────────────────────────────────────────────────────────┤
│  • Supabase Auth: Cookie-based session storage (httpOnly)              │
│  • PostgreSQL 15: ACID transaction, UUID, BIGINT, Native RLS policies  │
│  • Supabase Storage: Public/Private asset buckets (avatars, media)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Resolusi Akses Database: Native Supabase SSR vs Prisma

Berdasarkan hasil evaluasi mendalam terhadap risiko bypass keamanan pada Prisma Client standar:
- **Keputusan:** **Prisma ORM DIHAPUS dari arsitektur.**
- **Pola Terpilih:** **`@supabase/ssr` natif**.
- **Mekanisme Kerja:**
  1. Komponen Server dan Server Actions menggunakan client yang diinisialisasi via `createServerClient()`.
  2. Kredensial token JWT pengguna diteruskan secara otomatis ke PostgreSQL engine pada setiap pemanggilan query.
  3. Mesin PostgreSQL mengevaluasi aturan *Row Level Security (RLS)* secara natif.
  4. Tipe TypeScript dibuat secara otomatis melalui Supabase CLI:
     ```bash
     npx supabase gen types typescript --project-id <id> > src/types/database.types.ts
     ```

---

## 3. Struktur Direktori Proyek (Clean Architecture)

```
mazelia/
├── public/                     # Static files (fonts, icons, brand assets)
│   ├── fonts/                  # Playfair Display & Plus Jakarta Sans
│   └── brand/                  # Logo SVG MAZÉLIA Champagne Gold
├── src/
│   ├── app/                    # App Router Hierarchy
│   │   ├── layout.tsx          # Root Layout (Fonts, Global Toast Provider)
│   │   ├── page.tsx            # Public Landing Page
│   │   ├── (auth)/             # Route Group: Autentikasi
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── auth/callback/route.ts # OAuth Exchange Handler
│   │   ├── dashboard/          # Area Terproteksi Pengguna
│   │   │   ├── layout.tsx      # Dashboard Shell (Sidebar & Bottom Nav)
│   │   │   ├── events/
│   │   │   │   ├── page.tsx    # Multi-Event Selector Page
│   │   │   │   └── [id]/       # Event Workspace Context
│   │   │   │       ├── overview/page.tsx
│   │   │   │       ├── checklist/page.tsx
│   │   │   │       ├── budget/page.tsx
│   │   │   │       ├── guests/page.tsx
│   │   │   │       └── settings/page.tsx
│   │   └── api/                # Route Handlers Publik / Webhooks
│   ├── components/             # Reusable UI Primitives & Layouts
│   │   ├── ui/                 # Button, Input, Modal, Card, Badge
│   │   ├── layout/             # Sidebar, Header, MobileBottomNav
│   │   └── modules/            # Domain-Specific Components
│   │       ├── events/         # EventCard, EventWizardModal
│   │       ├── checklist/      # ChecklistItem, ChecklistFilter
│   │       ├── budget/         # BudgetSummaryCards, BudgetTable, CurrencyInput
│   │       └── guests/         # GuestTable, WhatsAppShareButton
│   ├── actions/                # Type-Safe Server Actions (Mutations)
│   │   ├── event-actions.ts
│   │   ├── checklist-actions.ts
│   │   ├── budget-actions.ts
│   │   └── guest-actions.ts
│   ├── lib/                    # Core Infrastructure Utilities
│   │   ├── supabase/
│   │   │   ├── client.ts       # Browser Client
│   │   │   ├── server.ts       # Server Component & Action Client
│   │   │   └── middleware.ts   # Session Refresh Helper
│   │   ├── validations/        # Zod Schemas
│   │   └── utils/              # Currency (IDR) & Date (Indonesian) Formatters
│   ├── types/                  # TypeScript Types
│   │   ├── database.types.ts   # Auto-generated from Supabase
│   │   └── index.ts            # Application domain types
│   └── middleware.ts           # Root Next.js Edge Auth & Route Gatekeeper
├── tailwind.config.ts          # MAZÉLIA Design System Tokens
├── tsconfig.json               # Strict Mode TypeScript Configuration
└── package.json
```

---

## 4. Pola Validasi & Mutasi Data (Server Actions + Zod)

Setiap mutasi data wajib mematuhi alur terstandarisasi:

```typescript
// Contoh Pola Implementasi Server Action yang Aman
"use server";

import { createClient } from "@/lib/supabase/server";
import { budgetItemSchema } from "@/lib/validations/budget";
import { revalidatePath } from "next/cache";

export async function createBudgetItem(eventId: string, rawData: unknown) {
  // 1. Inisialisasi Supabase Server Client (Dengan Konteks User Auth)
  const supabase = await createClient();

  // 2. Validasi Input Ketat Menggunakan Zod
  const validation = budgetItemSchema.safeParse(rawData);
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  // 3. Eksekusi Query Database (Diproteksi RLS)
  const { data, error } = await supabase
    .from("event_budgets")
    .insert({
      event_id: eventId,
      ...validation.data,
    })
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  // 4. Revalidasi Cache Halaman Terkait
  revalidatePath(`/dashboard/events/${eventId}/budget`);
  revalidatePath(`/dashboard/events/${eventId}/overview`);

  return { success: true, data };
}
```

---

## 5. Environment Variables & Keamanan Rahasia

```bash
# File: .env.local (DILARANG COMMIT KE REPOSITORI)
# Kredensial Publik Supabase (Aman diakses browser)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# Kredensial Server Rahasia (HANYA DIAKSES SERVER SIDE)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... # HANYA UNTUK SEED & MIGRATION SCRIPT

# URL Domain Aplikasi
NEXT_PUBLIC_SITE_URL=https://mazelia.com
```

---

## 6. Strategi Deployment & Infrastruktur

- **Frontend & Edge Hosting:** **Vercel** (Optimal untuk Next.js App Router, caching otomatis di Edge network Singapura).
- **Database & Storage:** **Supabase Cloud** region **ap-southeast-1 (Singapura)** untuk memastikan latensi jaringan serendah mungkin bagi pengguna di Jakarta dan kota-kota lain di Indonesia (<30ms).
- **DNS & CDN:** **Cloudflare** dengan SSL mode *Full (Strict)* dan kompresi Brotli aktif.
