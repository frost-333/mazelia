import { z } from 'zod';

export const guestSchema = z.object({
  full_name: z.string().min(2, 'Nama tamu minimal 2 karakter').max(150),
  group_id: z.string().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  pax: z.coerce.number().min(1, 'Minimal 1 pax').max(20, 'Maksimal 20 pax per undangan').default(1),
  rsvp_status: z.enum(['pending', 'attending', 'not_attending']).default('pending'),
  attendance_status: z.enum(['unconfirmed', 'present', 'absent']).default('unconfirmed'),
  notes: z.string().optional().or(z.literal('')),
});

export type GuestInput = z.infer<typeof guestSchema>;
