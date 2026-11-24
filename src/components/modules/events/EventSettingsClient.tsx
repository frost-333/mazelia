'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { Event } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { updateEventAction, deleteEventAction } from '@/actions/event-actions';
import { AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';

interface EventSettingsClientProps {
  event: Event;
}

export function EventSettingsClient({ event }: EventSettingsClientProps) {
  const updateActionWithId = updateEventAction.bind(null, event.id);
  const [updateState, formAction, isUpdating] = useActionState(updateActionWithId, null);

  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [deleteInput, setDeleteInput] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (deleteInput === event.name) {
      setIsDeleting(true);
      await deleteEventAction(event.id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Edit Event Form */}
      <div className="rounded-2xl border border-mazelia-border bg-white p-6 sm:p-8 shadow-luxury space-y-6">
        <h3 className="font-serif text-lg font-bold text-mazelia-charcoal border-b border-mazelia-border/60 pb-3">
          Informasi & Jadwal Acara
        </h3>

        {updateState?.error && (
          <div className="p-3.5 rounded-xl bg-red-50 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{updateState.error}</span>
          </div>
        )}

        {updateState?.success && (
          <div className="p-3.5 rounded-xl bg-emerald-50 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{updateState.success}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <Input
            name="name"
            label="Nama Acara"
            defaultValue={event.name}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light mb-1.5">
                Kategori
              </label>
              <select
                name="category"
                defaultValue={event.category}
                className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
              >
                <option value="Wedding">Wedding</option>
                <option value="Engagement">Engagement</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Family Gathering">Family Gathering</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light mb-1.5">
                Status Acara
              </label>
              <select
                name="status"
                defaultValue={event.status}
                className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
              >
                <option value="planning">Dalam Perencanaan (Planning)</option>
                <option value="active">Aktif / Berlangsung (Active)</option>
                <option value="completed">Selesai (Completed)</option>
                <option value="archived">Diarsipkan (Archived)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="event_date"
              type="date"
              label="Tanggal Acara"
              defaultValue={event.event_date}
              required
            />
            <Input
              name="event_time"
              type="time"
              label="Waktu Acara"
              defaultValue={event.event_time || ''}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="city"
              label="Kota"
              defaultValue={event.city}
              required
            />
            <Input
              name="location"
              label="Lokasi / Venue"
              defaultValue={event.location || ''}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="estimated_budget"
              type="number"
              label="Target Anggaran Total (Rp)"
              defaultValue={event.estimated_budget?.toString()}
            />
            <Input
              name="estimated_guest_count"
              type="number"
              label="Perkiraan Tamu (Pax)"
              defaultValue={event.estimated_guest_count?.toString()}
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
              Catatan / Deskripsi
            </label>
            <textarea
              name="description"
              rows={2}
              defaultValue={event.description || ''}
              className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" size="md" className="shadow-luxury-gold" isLoading={isUpdating}>
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>

      {/* Danger Zone: Delete Event */}
      <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 sm:p-8 space-y-4">
        <div>
          <h4 className="font-serif text-lg font-bold text-red-900 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" /> Zona Bahaya: Hapus Acara
          </h4>
          <p className="text-xs text-red-700 mt-1">
            Menghapus acara akan menghapus seluruh data checklist, anggaran, sesi, dan daftar tamu yang terkait secara permanen (*cascade delete*). Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        {!confirmDelete ? (
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => setConfirmDelete(true)}
          >
            Hapus Acara Ini
          </Button>
        ) : (
          <div className="p-4 rounded-xl border border-red-300 bg-white space-y-3">
            <p className="text-xs text-mazelia-charcoal font-semibold">
              Ketik nama acara <span className="text-red-600 underline">&quot;{event.name}&quot;</span> di bawah untuk mengonfirmasi:
            </p>
            <Input
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder={event.name}
              className="border-red-300 focus:border-red-500"
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setConfirmDelete(false);
                  setDeleteInput('');
                }}
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                disabled={deleteInput !== event.name}
                isLoading={isDeleting}
                onClick={handleDelete}
              >
                Saya Yakin, Hapus Permanen
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
