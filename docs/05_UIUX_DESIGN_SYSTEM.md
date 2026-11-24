# MAZÉLIA — UI/UX DESIGN SYSTEM & COMPONENT SPECIFICATIONS

**Dokumen Versi:** 1.0 — Design System Tokens & Components  
**Status:** Approved for Implementation  
**Penulis:** Senior UI/UX Architect  
**Arah Estetika:** Editorial Luxury • Warm Minimalist • Contemporary Grace  
**Tanggal:** November 2026  

---

## 1. Filosofi Desain MAZÉLIA

MAZÉLIA dirancang sebagai platform perencanaan acara personal yang menghembuskan ketenangan, kemewahan hangat, dan kejelasan visual. Berbeda dari software korporat yang dingin dan sarat angka kaku, MAZÉLIA menghadirkan kanvas digital yang menyerupai majalah pernikahan berkelas internasional (*editorial luxury*), mengutamakan *whitespace* lapang, kurva lembut, dan micro-interaction yang anggun.

---

## 2. Color Palette & WCAG AA Accessibility Tokens

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MAZÉLIA COLOR PALETTE                           │
├────────────────────────────────────────────────────────────────────────┤
│  Primary Gold: Champagne Gold (#B69A72)                                │
│  Text Accent: Deep Muted Bronze (#846B48) [Lolos WCAG AA 4.6:1]        │
│  Background: Luxury Ivory (#FAF8F4)                                    │
│  Surface / Card: Pure White (#FFFFFF)                                  │
│  Text Primary: Deep Charcoal (#302D29) [Lolos WCAG AAA 10.8:1]         │
│  Secondary / Muted: Warm Taupe (#9B9185)                               │
│  Borders & Dividers: Muted Warm Border (#EAE4DC / #E2DCD3)             │
│  Success: Soft Sage Green (#2D7A58)                                    │
│  Warning / Pending: Muted Warm Amber (#B87428)                         │
│  Danger / Error: Warm Crimson (#A83838)                                │
└────────────────────────────────────────────────────────────────────────┘
```

### Konfigurasi Tailwind CSS (`tailwind.config.ts` Tokens)

```typescript
// tailwind.config.ts snippet
export const themeColors = {
  mazelia: {
    gold: {
      DEFAULT: '#B69A72',
      light: '#C7B191',
      dark: '#A0845E',
    },
    bronze: {
      DEFAULT: '#846B48', // Khusus teks link & aksen keterbacaan tinggi
      dark: '#685336',
    },
    ivory: {
      DEFAULT: '#FAF8F4',
      warm: '#F4EFEB',
    },
    charcoal: {
      DEFAULT: '#302D29',
      light: '#4A4641',
      muted: '#6E675F',
    },
    taupe: {
      DEFAULT: '#9B9185',
      light: '#BDB4A8',
      dark: '#7A7165',
    },
    border: '#EAE4DC',
  }
};
```

---

## 3. Tipografi Harmonis

1. **Editorial & Display Headings (H1, H2, H3, Hero Titles):**
   - **Font Family:** `Playfair Display` atau `Cormorant Garamond` (Serif).
   - Memberikan kesan mahal, personal, sastrawi, dan eksklusif.
   - Sifat: Letter-spacing normal hingga sedikit renggang (`tracking-wide`), font-weight 500 (Medium) atau 600 (SemiBold).
2. **Functional UI, Tables, Inputs & Body Copy (H4, Body, Buttons, Tables):**
   - **Font Family:** `Plus Jakarta Sans` atau `Inter` (Geometric Sans-Serif).
   - Menjamin legibilitas tajam di layar smartphone berukuran kecil.
   - Fitur tabular figures (`tnum`) untuk angka monospaced pada tabel kalkulasi anggaran Rupiah agar digit ribuan sejajar sempurna.

---

## 4. Spesifikasi Komponen UI Inti

### A. Buttons (Tombol Aksi)
- **Primary Button (CTA Utama):**
  - Background: Champagne Gold (`#B69A72`).
  - Text: Pure White (`#FFFFFF`) atau Charcoal (`#302D29`), Font-Medium, ukuran 14px (Mobile) / 15px (Desktop).
  - Hover State: Background berubah halus ke `#A0845E` dengan bayangan lembut: `box-shadow: 0 4px 14px rgba(182, 154, 114, 0.25)`.
  - Border Radius: `rounded-lg` (8px–10px).
- **Secondary Button (Outline):**
  - Background: Transparan.
  - Border: 1px solid `#B69A72` atau `#D5C9B8`.
  - Text: Deep Muted Bronze (`#846B48`).
  - Hover State: Background tipis `#FAF8F4`.
- **Ghost / Minimal Button:**
  - Background: Transparan, tanpa border.
  - Text: `#302D29`, hover background `#F4EFEB`.

### B. Cards & Containers
- Latar Belakang: Pure White (`#FFFFFF`).
- Border: 1px solid `#EAE4DC` (*subtle hairline border*).
- Radius: `rounded-xl` (12px–14px).
- Bayangan (*Soft Luxury Shadow*): `box-shadow: 0 4px 20px -2px rgba(48, 45, 41, 0.04);`.
- Padding internal: 20px–24px (Desktop) / 16px (Mobile).

### C. Form Inputs & Currency Fields
- Latar Belakang: `#FFFFFF`.
- Border Default: 1px solid `#DDD7CD`.
- Focus Ring: `ring-2 ring-[#B69A72]/20 border-[#B69A72] outline-none`.
- Placeholder: `#A8A29A`.
- **Currency Input (Rupiah):**
  - Dilengkapi label statis `"Rp"` di sisi kiri dengan latar belakang abu-abu hangat lembut `#F7F4EF`.
  - Angka terformat otomatis dengan titik pemisah ribuan saat diketik (*client-side formatter*).

### D. Badges & Status Indicators
- **Lunas / Selesai (Success):** Background `#EBF8EE`, Text `#2D7A58`, Border 1px solid `#B7E4C7`.
- **DP / Dalam Proses (Pending):** Background `#FFF4E5`, Text `#B87428`, Border 1px solid `#FCD5A4`.
- **Belum Bayar / Tertunda (Unpaid):** Background `#FDF0ED`, Text `#A83838`, Border 1px solid `#F8C8C0`.

---

## 5. Pola Navigasi Desktop vs Mobile-First

### Tampilan Desktop (Viewport $\ge$ 1024px)
- **Sidebar Kiri Tetap (Fixed Left Sidebar, Width: 260px):**
  - Logo MAZÉLIA elegan di bagian atas.
  - Switcher Acara Aktif (*Event Selector Dropdown*).
  - Menu Navigasi: *Overview, Checklist, Budget, Guests, Settings*.
  - Profil Pengguna dan tombol Keluar di bagian bawah.
- **Area Kerja Utama:** Latar belakang Ivory `#FAF8F4` yang lapang dengan margin dan padding yang bernapas.

### Tampilan Mobile (Viewport < 1024px)
- **Top Bar Ringkas (Height: 56px):**
  - Logo MAZÉLIA kecil di kiri, dropdown ganti event di tengah, dan avatar pengguna di kanan.
- **Bottom Navigation Bar Tetap (Fixed Bottom Nav, Height: 64px):**
  - Terletak tepat di bagian bawah layar smartphone dalam jangkauan jempol natural.
  - 4 Ikon Utama:
    1. *Overview* (Icon: Layout Dashboard)
    2. *Checklist* (Icon: Check Square)
    3. *Budget* (Icon: Wallet / Coins)
    4. *Guests* (Icon: Users)
  - Menu Settings dapat diakses dengan mengklik avatar pada top bar.
  - Efek: Background `#FFFFFF` dengan batas atas `1px solid #EAE4DC` dan bayangan lembut ke arah atas.
