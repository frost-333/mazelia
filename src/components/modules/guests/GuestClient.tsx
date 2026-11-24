'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { Guest, GuestGroup, Event } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import {
  createGuestAction,
  updateGuestAction,
  deleteGuestAction,
  updateGuestRsvpAction,
  createGuestGroupAction,
} from '@/actions/guest-actions';
import {
  Plus,
  Trash2,
  Users,
  Search,
  MessageCircle,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { formatDateIndo } from '@/lib/utils/formatters';

interface GuestClientProps {
  eventId: string;
  event: Event;
  initialGuests: Guest[];
  initialGroups: GuestGroup[];
}

export function GuestClient({ eventId, event, initialGuests, initialGroups }: GuestClientProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedGroup, setSelectedGroup] = React.useState('all');
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = React.useState(false);
  const [newGroupName, setNewGroupName] = React.useState('');

  // WhatsApp Dialog state
  const [selectedGuestForWA, setSelectedGuestForWA] = React.useState<Guest | null>(null);
  const [copied, setCopied] = React.useState(false);

  // Add Guest Action
  const createActionWithId = createGuestAction.bind(null, eventId);
  const [addState, formAction, isAdding] = useActionState(createActionWithId, null);

  React.useEffect(() => {
    if (addState?.success) {
      setIsAddOpen(false);
    }
  }, [addState]);

  // Metrics
  const totalGuests = initialGuests.length;
  const totalPax = initialGuests.reduce((acc, g) => acc + (g.pax || 1), 0);
  const attendingGuests = initialGuests.filter((g) => g.rsvp_status === 'attending');
  const attendingPax = attendingGuests.reduce((acc, g) => acc + (g.pax || 1), 0);
  const notAttendingPax = initialGuests
    .filter((g) => g.rsvp_status === 'not_attending')
    .reduce((acc, g) => acc + (g.pax || 1), 0);
  const pendingPax = initialGuests
    .filter((g) => g.rsvp_status === 'pending')
    .reduce((acc, g) => acc + (g.pax || 1), 0);

  // Filtered
  const filteredGuests = initialGuests.filter((guest) => {
    const matchSearch =
      guest.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (guest.phone && guest.phone.includes(searchTerm));
    const matchGroup = selectedGroup === 'all' || guest.group_id === selectedGroup;
    return matchSearch && matchGroup;
  });

  // Helper for generating WA message
  const generateWAMessage = (guest: Guest) => {
    return `Kepada Yth.
Bapak/Ibu/Sahabat ${guest.full_name},

Tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk hadir dan berbagi kebahagiaan dalam acara kami:

*${event.name}*
📅 Tanggal: ${formatDateIndo(event.event_date)}
📍 Tempat: ${event.location || event.city}
👥 Alokasi Kehadiran: ${guest.pax} Orang

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.

Salam hangat dan hormat kami,
Keluarga Besar ${event.name}`;
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      await createGuestGroupAction(eventId, newGroupName);
      setNewGroupName('');
      setIsAddGroupOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-mazelia-border bg-white p-4 sm:p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-mazelia-taupe uppercase tracking-wider block">
            Total Undangan
          </span>
          <div className="font-serif text-2xl font-bold text-mazelia-charcoal">
            {totalGuests} <span className="text-xs font-normal text-mazelia-taupe">Undangan</span>
          </div>
          <p className="text-[11px] text-mazelia-taupe">Total alokasi {totalPax} Pax / Kursi</p>
        </div>

        <div className="rounded-xl border border-mazelia-border bg-white p-4 sm:p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
            Terkonfirmasi Hadir
          </span>
          <div className="font-serif text-2xl font-bold text-emerald-700">
            {attendingPax} <span className="text-xs font-normal text-mazelia-taupe">Pax</span>
          </div>
          <p className="text-[11px] text-mazelia-taupe">{attendingGuests.length} Undangan bersedia hadir</p>
        </div>

        <div className="rounded-xl border border-mazelia-border bg-white p-4 sm:p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
            Menunggu Respons
          </span>
          <div className="font-serif text-2xl font-bold text-amber-700">
            {pendingPax} <span className="text-xs font-normal text-mazelia-taupe">Pax</span>
          </div>
          <p className="text-[11px] text-mazelia-taupe">Belum konfirmasi kehadiran</p>
        </div>

        <div className="rounded-xl border border-mazelia-border bg-white p-4 sm:p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-red-700 uppercase tracking-wider block">
            Berhalangan
          </span>
          <div className="font-serif text-2xl font-bold text-red-700">
            {notAttendingPax} <span className="text-xs font-normal text-mazelia-taupe">Pax</span>
          </div>
          <p className="text-[11px] text-mazelia-taupe">Telah konfirmasi tidak hadir</p>
        </div>
      </div>

      {/* TOOLBAR: SEARCH & GROUPS & ACTIONS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-mazelia-border shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-mazelia-taupe absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama atau no. telepon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-mazelia-border bg-white pl-9 pr-3.5 py-2 text-xs text-mazelia-charcoal placeholder:text-mazelia-taupe/70 focus:border-mazelia-gold focus:outline-none"
          />
        </div>

        {/* Group Filter and Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="rounded-lg border border-mazelia-border bg-white px-3 py-2 text-xs text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
          >
            <option value="all">Semua Kelompok</option>
            {initialGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAddGroupOpen(true)}
            className="text-xs"
          >
            + Kelompok
          </Button>

          <Button size="sm" onClick={() => setIsAddOpen(true)} className="gap-1.5 shadow-luxury-gold text-xs">
            <Plus className="w-3.5 h-3.5" /> Tambah Tamu
          </Button>
        </div>
      </div>

      {/* GUEST TABLE */}
      <div className="rounded-xl border border-mazelia-border bg-white shadow-luxury overflow-hidden">
        {filteredGuests.length === 0 ? (
          <div className="p-12 text-center text-xs text-mazelia-taupe space-y-2">
            <Users className="w-8 h-8 mx-auto text-mazelia-taupe/60" />
            <p>Tidak ada tamu undangan yang cocok dengan pencarian.</p>
            <Button variant="outline" size="sm" onClick={() => setIsAddOpen(true)}>
              Tambah Tamu Undangan Baru
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-mazelia-ivory/60 border-b border-mazelia-border text-mazelia-bronze font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Nama Tamu & Kontak</th>
                  <th className="py-3.5 px-4">Kelompok</th>
                  <th className="py-3.5 px-4">Alokasi Pax</th>
                  <th className="py-3.5 px-4">Status RSVP</th>
                  <th className="py-3.5 px-4 text-center">Pesan WA</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mazelia-border/60">
                {filteredGuests.map((guest) => {
                  const groupName = initialGroups.find((g) => g.id === guest.group_id)?.name;
                  return (
                    <tr key={guest.id} className="hover:bg-mazelia-ivory/30 transition-colors">
                      {/* Name & Phone */}
                      <td className="py-3 px-4">
                        <p className="font-semibold text-mazelia-charcoal text-sm">{guest.full_name}</p>
                        {guest.phone && <p className="text-[11px] text-mazelia-taupe font-mono">{guest.phone}</p>}
                        {guest.address && <p className="text-[10px] text-mazelia-taupe/80 truncate max-w-xs">{guest.address}</p>}
                      </td>

                      {/* Group */}
                      <td className="py-3 px-4">
                        <Badge variant="neutral" className="text-[10px]">
                          {groupName || 'Umum'}
                        </Badge>
                      </td>

                      {/* Pax */}
                      <td className="py-3 px-4 font-semibold text-mazelia-charcoal">
                        {guest.pax} Kursi / Pax
                      </td>

                      {/* RSVP Switcher */}
                      <td className="py-3 px-4">
                        <select
                          value={guest.rsvp_status}
                          onChange={(e) =>
                            updateGuestRsvpAction(guest.id, eventId, e.target.value as any)
                          }
                          className={`text-xs font-semibold rounded-lg px-2.5 py-1 border transition-all ${
                            guest.rsvp_status === 'attending'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : guest.rsvp_status === 'not_attending'
                              ? 'bg-red-50 text-red-800 border-red-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="pending">Menunggu</option>
                          <option value="attending">Hadir</option>
                          <option value="not_attending">Berhalangan</option>
                        </select>
                      </td>

                      {/* WhatsApp Button */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedGuestForWA(guest)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-100 transition-colors shadow-sm"
                          title="Generate Pesan WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Pesan WA</span>
                        </button>
                      </td>

                      {/* Delete Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => deleteGuestAction(guest.id, eventId)}
                          className="p-1.5 text-mazelia-taupe hover:text-red-600 rounded-lg transition-colors"
                          title="Hapus Tamu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* WhatsApp Message Generator Modal */}
      {selectedGuestForWA && (
        <Modal
          isOpen={!!selectedGuestForWA}
          onClose={() => setSelectedGuestForWA(null)}
          title="Draf Pesan Undangan WhatsApp"
          description={`Teks undangan sopan yang dipersonalisasi untuk ${selectedGuestForWA.full_name}.`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-mazelia-ivory-warm border border-mazelia-border font-mono text-xs text-mazelia-charcoal whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {generateWAMessage(selectedGuestForWA)}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleCopyText(generateWAMessage(selectedGuestForWA))}
                className="w-full sm:w-auto gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Teks Berhasil Disalin!' : 'Salin Teks Undangan'}
              </Button>

              {selectedGuestForWA.phone ? (
                <a
                  href={`https://api.whatsapp.com/send?phone=${selectedGuestForWA.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(
                    generateWAMessage(selectedGuestForWA)
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    type="button"
                    size="sm"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Buka WhatsApp & Kirim Langsung
                  </Button>
                </a>
              ) : (
                <span className="text-[11px] text-mazelia-taupe italic">
                  *Nomor WA belum dicatat, salin teks untuk kirim manual
                </span>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Add Guest Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Tambah Tamu Undangan"
        description="Masukkan data nama dan kontak tamu keluarga atau sahabat Anda."
      >
        <form action={formAction} className="space-y-4">
          {addState?.error && (
            <div className="p-3 rounded-lg bg-red-50 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{addState.error}</span>
            </div>
          )}

          <Input
            name="full_name"
            label="Nama Lengkap / Keluarga"
            placeholder="Contoh: Bpk. Ir. Bambang & Keluarga"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light mb-1.5">
                Kelompok Tamu
              </label>
              <select
                name="group_id"
                className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
              >
                <option value="">Tanpa Kelompok</option>
                {initialGroups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              name="pax"
              type="number"
              min="1"
              max="20"
              defaultValue="1"
              label="Alokasi Pax (Kursi)"
              required
            />
          </div>

          <Input
            name="phone"
            type="tel"
            label="Nomor WhatsApp (Opsional)"
            placeholder="Contoh: 08123456789 atau +62812..."
          />

          <Input
            name="address"
            label="Alamat / Kota Asal (Opsional)"
            placeholder="Contoh: Bandung"
          />

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mazelia-charcoal-light">
              Catatan Tamu (Opsional)
            </label>
            <input
              name="notes"
              placeholder="Contoh: Meja VIP, Saudara dari pihak Ibu"
              className="flex w-full rounded-lg border border-mazelia-border bg-white px-3.5 py-2.5 text-sm text-mazelia-charcoal focus:border-mazelia-gold focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-mazelia-border/60 flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddOpen(false)}>
              Batal
            </Button>
            <Button size="sm" type="submit" isLoading={isAdding}>
              Simpan Tamu
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Group Modal */}
      <Modal
        isOpen={isAddGroupOpen}
        onClose={() => setIsAddGroupOpen(false)}
        title="Buat Kelompok Tamu Baru"
        description="Kelompokkan tamu seperti Teman SMA, Rekan Kantor, Kerabat Dekat."
      >
        <form onSubmit={handleAddGroup} className="space-y-4">
          <Input
            label="Nama Kelompok"
            placeholder="Contoh: Alumni Kuliah"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            required
          />
          <div className="pt-3 border-t border-mazelia-border/60 flex justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddGroupOpen(false)}>
              Batal
            </Button>
            <Button size="sm" type="submit">
              Tambah Kelompok
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
