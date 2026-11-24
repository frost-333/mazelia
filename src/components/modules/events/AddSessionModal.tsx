'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createSessionAction } from '@/actions/event-actions';
import { Plus, AlertCircle } from 'lucide-react';

interface AddSessionModalProps {
  eventId: string;
}

export function AddSessionModal({ eventId }: AddSessionModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const createActionWithId = createSessionAction.bind(null, eventId);
  const [state, formAction, isPending] = useActionState(createActionWithId, null);

  React.useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setIsOpen(true)} className="gap-1.5 text-xs">
        <Plus className="w-3.5 h-3.5" /> Tambah Sesi
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Tambah Sesi Acara"
        description="Jadwalkan sesi khusus seperti Akad Nikah, Pemberkatan, atau Resepsi Malam."
      >
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="p-3 rounded-lg bg-red-50 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{state.error}</span>
            </div>
          )}

          <Input
            name="name"
            label="Nama Sesi"
            placeholder="Contoh: Akad Nikah / Resepsi Utama"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              name="start_time"
              type="time"
              label="Waktu Mulai"
              required
            />
            <Input
              name="end_time"
              type="time"
              label="Waktu Selesai (Opsional)"
            />
          </div>

          <Input
            name="location"
            label="Nama Tempat / Ruangan"
            placeholder="Contoh: Gedung Serbaguna Lt. 2"
            required
          />

          <Input
            name="address"
            label="Alamat Lengkap"
            placeholder="Jl. Gatot Subroto No. ..."
          />

          <Input
            name="maps_url"
            label="Tautan Google Maps (Opsional)"
            placeholder="https://maps.google.com/..."
          />

          <div className="pt-3 border-t border-mazelia-border/60 flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
            <Button size="sm" type="submit" isLoading={isPending}>
              Simpan Sesi
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
