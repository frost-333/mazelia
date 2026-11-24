import { z } from 'zod';

export const budgetItemSchema = z.object({
  category: z.string().min(1, 'Kategori pengeluaran wajib diisi'),
  item_name: z.string().min(2, 'Nama item minimal 2 karakter').max(200),
  estimated_cost: z.coerce.number().min(0, 'Estimasi biaya tidak boleh negatif').default(0),
  actual_cost: z.coerce.number().min(0, 'Biaya aktual tidak boleh negatif').default(0),
  down_payment: z.coerce.number().min(0, 'Uang muka (DP) tidak boleh negatif').default(0),
  payment_status: z.enum(['unpaid', 'partially_paid', 'paid']).default('unpaid'),
  notes: z.string().optional().or(z.literal('')),
});

export type BudgetItemInput = z.infer<typeof budgetItemSchema>;
