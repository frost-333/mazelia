import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().min(3, 'Nama acara minimal 3 karakter').max(200, 'Nama acara terlalu panjang'),
  category: z.string().min(1, 'Pilih kategori acara'),
  event_date: z.string().min(1, 'Tanggal acara wajib diisi'),
  event_time: z.string().optional().or(z.literal('')),
  city: z.string().min(2, 'Kota penyelenggaraan wajib diisi'),
  location: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  estimated_budget: z.coerce.number().min(0, 'Estimasi budget tidak boleh negatif').default(0),
  estimated_guest_count: z.coerce.number().min(0, 'Jumlah tamu tidak boleh negatif').default(0),
});

export type EventInput = z.infer<typeof eventSchema>;
