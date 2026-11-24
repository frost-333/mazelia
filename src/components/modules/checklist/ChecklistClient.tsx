'use client';

import * as React from 'react';
import { useOptimistic, useTransition, useActionState } from 'react';
import { EventChecklist } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { toggleChecklistAction, createChecklistAction, deleteChecklistAction } from '@/actions/checklist-actions';
import { Plus, Check, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { formatDateIndo } from '@/lib/utils/formatters';

interface ChecklistClientProps {
  eventId: string;
  initialChecklists: EventChecklist[];
}

export function ChecklistClient({ eventId, initialChecklists }: ChecklistClientProps) {
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'uncompleted' | 'completed'>('all');
  const [filterCategory, setFilterCategory] = React.useState<string>('all');
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  const [isPending, startTransition] = useTransition();

  // Optimistic updates for instant toggle feel
  const [optimisticChecklists, setOptimisticChecklists] = useOptimistic(
    initialChecklists,
    (state, { id, is_completed }: { id: string; is_completed: boolean }) =>
      state.map((item) => (item.id === id ? { ...item, is_completed } : item))
  );

  const handleToggle = (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      setOptimisticChecklists({ id, is_completed: !currentStatus });
      await toggleChecklistAction(id, eventId, currentStatus);
    });
  };

  const categories = Array.from(new Set(initialChecklists.map((c) => c.category))).filter(Boolean);

  const filteredChecklists = optimisticChecklists.filter((item) => {
    if (filterStatus === 'uncompleted' && item.is_completed) return false;
    if (filterStatus === 'completed' && !item.is_completed) return false;
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    return true;
  });

  const total = optimisticChecklists.length;
  const completed = optimisticChecklists.filter((c) => c.is_completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Add Task action
  const createActionWithId = createChecklistAction.bind(null, eventId);
  const [addState, formAction, isAdding] = useActionState(createActionWithId, null);

  React.useEffect(() => {
    if (addState?.success) {
      setIsAddOpen(false);
    }
  }, [addState]);

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <div className="rounded-2xl border border-mazelia-border bg-white p-6 shadow-luxury">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-mazelia-charcoal">
              Kemajuan Persiapan Acara
            </h3>
            <p className="text-xs text-mazelia-taupe mt-0.5">
              {completed} dari {total} tugas selesai ({percent}%)
            </p>
          </div>
          <Button size="sm" onClick={() => setIsAddOpen(true)} className="gap-2 shadow-luxury-gold self-start sm:self-auto">
            <Plus className="w-4 h-4" /> Tambah Tugas Baru
          </Button>
        </div>

        <div className="w-full h-2.5 bg-mazelia-border/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-mazelia-gold rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-mazelia-border shadow-sm">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-mazelia-ivory rounded-lg text-xs font-semibold">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filterStatus === 'all'
                ? 'bg-white text-mazelia-charcoal shadow-sm'
                : 'text-mazelia-taupe hover:text-mazelia-charcoal'
            }`}
          >
            Semua ({total})
          </button>
          <button
            onClick={() => setFilterStatus('uncompleted')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filterStatus === 'uncompleted'
                ? 'bg-white text-mazelia-charcoal shadow-sm'
                : 'text-mazelia-taupe hover:text-mazelia-charcoal'
            }`}
          >
            Belum Selesai ({total - completed})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              filterStatus === 'completed'
                ? 'bg-white text-mazelia-charcoal shadow-sm'
                : 'text-mazelia-taupe hover:text-mazelia-charcoal'
            }`}
          >
            Selesai ({completed})
          </button>
        </div>

        {/* Category Dropdown */}
        {categories.length > 0 && (
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-mazelia-border bg-white px-3 py-1.5 text-xs text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none focus:ring-1 focus:ring-mazelia-gold"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredChecklists.length === 0 ? (
          <div className="rounded-xl border border-dashed border-mazelia-border bg-white p-12 text-center text-xs text-mazelia-taupe">
            Tidak ada tugas yang sesuai dengan filter ini.
          </div>
        ) : (
          filteredChecklists.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-4 transition-all flex items-start justify-between gap-3 bg-white ${
                item.is_completed
                  ? 'border-mazelia-border/40 bg-mazelia-ivory/40 opacity-75'
                  : 'border-mazelia-border hover:border-mazelia-gold/60 shadow-sm'
              }`}
            >
              {/* Checkbox & Content */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => handleToggle(item.id, item.is_completed)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all mt-0.5 shrink-0 ${
                    item.is_completed
                      ? 'bg-mazelia-gold border-mazelia-gold text-white shadow-sm'
                      : 'border-mazelia-border bg-white hover:border-mazelia-gold text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                <div className="space-y-1 min-w-0">
                  <h4
                    className={`text-sm font-medium transition-all ${
                      item.is_completed ? 'line-through text-mazelia-taupe' : 'text-mazelia-charcoal'
                    }`}
                  >
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-mazelia-taupe line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <Badge variant="neutral" className="text-[10px]">
                      {item.category}
                    </Badge>
                    <Badge
                      variant={
                        item.priority === 'high'
                          ? 'danger'
                          : item.priority === 'medium'
                          ? 'warning'
                          : 'neutral'
                      }
                      className="text-[10px]"
                    >
                      Prioritas {item.priority}
                    </Badge>
                    {item.due_date && (
                      <span className="text-[10px] text-mazelia-taupe flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Tenggat: {formatDateIndo(item.due_date)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Delete Action */}
              <button
                type="button"
                onClick={() => deleteChecklistAction(item.id, eventId)}
                className="p-1.5 text-mazelia-taupe hover:text-red-600 rounded-lg transition-colors shrink-0"
                title="Hapus Tugas"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Tambah Tugas Persiapan Baru"
        description="Tambahkan tugas kustom untuk melengkapi lini masa acara Anda."
      >
        <form action={formAction} className="space-y-4">
          {addState?.error && (
            <div className="p-3 rounded-lg bg-red-50 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{addState.error}</span>
            </div>
          )}

          <Input
            name="title"
            label="Nama Tugas"
            placeholder="Contoh: Booking Photographer Tambahan"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light mb-1.5">
                Kategori
              </label>
              <input
                name="category"
                list="task-categories"
                placeholder="Pilih atau ketik..."
                defaultValue="Umum"
                className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
              />
              <datalist id="task-categories">
                <option value="Venue & Gedung" />
                <option value="Catering" />
                <option value="Dekorasi" />
                <option value="Busana & Rias" />
                <option value="Dokumentasi" />
                <option value="Undangan" />
                <option value="Hiburan" />
                <option value="Administrasi" />
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light mb-1.5">
                Prioritas
              </label>
              <select
                name="priority"
                defaultValue="medium"
                className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
              >
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
            </div>
          </div>

          <Input
            name="due_date"
            type="date"
            label="Tanggal Tenggat Waktu (Opsional)"
          />

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
              Catatan Tugas (Opsional)
            </label>
            <textarea
              name="description"
              rows={2}
              placeholder="Rincian kontak vendor, detail ukuran, dll..."
              className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-mazelia-border/60 flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddOpen(false)}>
              Batal
            </Button>
            <Button size="sm" type="submit" isLoading={isAdding}>
              Simpan Tugas
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
