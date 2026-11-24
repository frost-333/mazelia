import { z } from 'zod';

export const checklistSchema = z.object({
  title: z.string().min(2, 'Nama tugas minimal 2 karakter').max(255),
  category: z.string().min(1, 'Kategori wajib dipilih').default('Umum'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  due_date: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
});

export type ChecklistInput = z.infer<typeof checklistSchema>;
