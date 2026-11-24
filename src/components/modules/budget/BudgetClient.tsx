'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { EventBudget } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import {
  createBudgetItemAction,
  updateBudgetItemAction,
  deleteBudgetItemAction,
  updateOverallTargetBudget,
} from '@/actions/budget-actions';
import { Plus, Trash2, Edit2, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatRupiah } from '@/lib/utils/formatters';

interface BudgetClientProps {
  eventId: string;
  targetBudget: number;
  initialBudgets: EventBudget[];
}

export function BudgetClient({ eventId, targetBudget, initialBudgets }: BudgetClientProps) {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<EventBudget | null>(null);
  const [isEditTargetOpen, setIsEditTargetOpen] = React.useState(false);
  const [newTargetInput, setNewTargetInput] = React.useState(targetBudget.toString());

  // Calculations
  const totalEstimated = initialBudgets.reduce((acc, b) => acc + (b.estimated_cost || 0), 0);
  const totalActual = initialBudgets.reduce((acc, b) => acc + (b.actual_cost || 0), 0);
  const totalDownPayment = initialBudgets.reduce((acc, b) => acc + (b.down_payment || 0), 0);
  const remainingBudget = targetBudget - totalActual;
  const percentUsed = targetBudget > 0 ? Math.min(Math.round((totalActual / targetBudget) * 100), 100) : 0;

  // Add Item Action
  const createActionWithId = createBudgetItemAction.bind(null, eventId);
  const [addState, formAction, isAdding] = useActionState(createActionWithId, null);

  React.useEffect(() => {
    if (addState?.success) {
      setIsAddOpen(false);
    }
  }, [addState]);

  // Group budgets by Category
  const categories = Array.from(new Set(initialBudgets.map((b) => b.category)));

  const handleUpdateTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateOverallTargetBudget(eventId, Number(newTargetInput));
    setIsEditTargetOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 4 SUMMARY STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Target Budget */}
        <div className="rounded-xl border border-mazelia-border bg-white p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-mazelia-taupe">
            <span className="font-semibold uppercase tracking-wider">Target Anggaran</span>
            <button
              onClick={() => setIsEditTargetOpen(true)}
              className="text-[11px] text-mazelia-gold hover:underline font-bold"
            >
              Ubah
            </button>
          </div>
          <div className="font-serif text-2xl font-bold text-mazelia-charcoal truncate">
            {formatRupiah(targetBudget)}
          </div>
          <p className="text-[11px] text-mazelia-taupe">Plafon total biaya acara</p>
        </div>

        {/* Real Cost */}
        <div className="rounded-xl border border-mazelia-border bg-white p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-mazelia-taupe uppercase tracking-wider block">
            Total Biaya Riil
          </span>
          <div className="font-serif text-2xl font-bold text-mazelia-charcoal truncate">
            {formatRupiah(totalActual)}
          </div>
          <p className="text-[11px] text-mazelia-taupe">Estimasi awal: {formatRupiah(totalEstimated)}</p>
        </div>

        {/* Down Payment (DP) */}
        <div className="rounded-xl border border-mazelia-border bg-white p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-mazelia-taupe uppercase tracking-wider block">
            Dana Terbayar (DP)
          </span>
          <div className="font-serif text-2xl font-bold text-emerald-700 truncate">
            {formatRupiah(totalDownPayment)}
          </div>
          <p className="text-[11px] text-mazelia-taupe">
            Sisa pelunasan: {formatRupiah(Math.max(totalActual - totalDownPayment, 0))}
          </p>
        </div>

        {/* Balance Status */}
        <div className="rounded-xl border border-mazelia-border bg-white p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-mazelia-taupe uppercase tracking-wider">
              Sisa Anggaran
            </span>
            <Badge variant={remainingBudget >= 0 ? 'success' : 'danger'}>
              {remainingBudget >= 0 ? 'Surplus' : 'Defisit'}
            </Badge>
          </div>
          <div
            className={`font-serif text-2xl font-bold truncate ${
              remainingBudget >= 0 ? 'text-mazelia-charcoal' : 'text-red-600'
            }`}
          >
            {formatRupiah(remainingBudget)}
          </div>
          <p className="text-[11px] text-mazelia-taupe">{percentUsed}% dari target teralokasi</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="rounded-xl border border-mazelia-border bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-mazelia-charcoal">Penyerapan Anggaran</span>
            <span className="text-mazelia-bronze">{percentUsed}%</span>
          </div>
          <div className="w-full h-2 bg-mazelia-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                percentUsed > 100 ? 'bg-red-500' : 'bg-mazelia-gold'
              }`}
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </div>
        </div>
        <Button size="sm" onClick={() => setIsAddOpen(true)} className="gap-2 shrink-0 shadow-luxury-gold">
          <Plus className="w-4 h-4" /> Tambah Pos Biaya
        </Button>
      </div>

      {/* BUDGET ITEMS TABLE */}
      <div className="rounded-xl border border-mazelia-border bg-white shadow-luxury overflow-hidden">
        {initialBudgets.length === 0 ? (
          <div className="p-12 text-center text-xs text-mazelia-taupe space-y-2">
            <Wallet className="w-8 h-8 mx-auto text-mazelia-taupe/60" />
            <p>Belum ada pos pengeluaran tercatat.</p>
            <Button variant="outline" size="sm" onClick={() => setIsAddOpen(true)}>
              Tambah Pos Pengeluaran Pertama
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-mazelia-ivory/60 border-b border-mazelia-border text-mazelia-bronze font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Kategori & Item</th>
                  <th className="py-3.5 px-4">Estimasi</th>
                  <th className="py-3.5 px-4">Biaya Riil</th>
                  <th className="py-3.5 px-4">Terbayar (DP)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mazelia-border/60">
                {initialBudgets.map((item) => (
                  <tr key={item.id} className="hover:bg-mazelia-ivory/30 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-mazelia-charcoal text-sm">{item.item_name}</p>
                      <span className="text-[10px] text-mazelia-taupe bg-mazelia-ivory-warm px-2 py-0.5 rounded-full inline-block mt-0.5">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">{formatRupiah(item.estimated_cost)}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-mazelia-charcoal">
                      {formatRupiah(item.actual_cost)}
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-700">
                      {formatRupiah(item.down_payment)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          item.payment_status === 'paid'
                            ? 'success'
                            : item.payment_status === 'partially_paid'
                            ? 'warning'
                            : 'neutral'
                        }
                      >
                        {item.payment_status === 'paid'
                          ? 'Lunas'
                          : item.payment_status === 'partially_paid'
                          ? 'DP Terbayar'
                          : 'Belum Bayar'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteBudgetItemAction(item.id, eventId)}
                        className="p-1.5 text-mazelia-taupe hover:text-red-600 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Tambah Pos Pengeluaran"
        description="Catat kesepakatan harga vendor dan pembayaran uang muka."
      >
        <form action={formAction} className="space-y-4">
          {addState?.error && (
            <div className="p-3 rounded-lg bg-red-50 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{addState.error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light mb-1.5">
                Kategori
              </label>
              <input
                name="category"
                list="budget-categories"
                placeholder="Pilih kategori..."
                defaultValue="Venue & Dekorasi"
                className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
                required
              />
              <datalist id="budget-categories">
                <option value="Venue & Gedung" />
                <option value="Katering" />
                <option value="Dekorasi" />
                <option value="Busana & Rias" />
                <option value="Dokumentasi (Foto & Video)" />
                <option value="Undangan & Souvenir" />
                <option value="Musik & Entertainment" />
                <option value="Logistik & Transportasi" />
                <option value="Lainnya" />
              </datalist>
            </div>

            <Input
              name="item_name"
              label="Nama Item / Vendor"
              placeholder="Contoh: DP Gedung Resepsi"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              name="estimated_cost"
              type="number"
              step="50000"
              label="Estimasi Biaya (Rp)"
              placeholder="0"
            />
            <Input
              name="actual_cost"
              type="number"
              step="50000"
              label="Biaya Riil Kontrak (Rp)"
              placeholder="0"
              required
            />
            <Input
              name="down_payment"
              type="number"
              step="50000"
              label="Terbayar / DP (Rp)"
              placeholder="0"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
              Catatan Khusus (Opsional)
            </label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Nomor rekening vendor, termin pembayaran ke-2, dll..."
              className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-mazelia-border/60 flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddOpen(false)}>
              Batal
            </Button>
            <Button size="sm" type="submit" isLoading={isAdding}>
              Simpan Pos Biaya
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Target Budget Modal */}
      <Modal
        isOpen={isEditTargetOpen}
        onClose={() => setIsEditTargetOpen(false)}
        title="Ubah Target Anggaran Acara"
        description="Perbarui batas total anggaran keseluruhan untuk acara ini."
      >
        <form onSubmit={handleUpdateTarget} className="space-y-4">
          <Input
            type="number"
            step="500000"
            label="Target Anggaran Total (Rp)"
            value={newTargetInput}
            onChange={(e) => setNewTargetInput(e.target.value)}
            required
          />
          <div className="pt-3 border-t border-mazelia-border/60 flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsEditTargetOpen(false)}>
              Batal
            </Button>
            <Button size="sm" type="submit">
              Perbarui Target
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
