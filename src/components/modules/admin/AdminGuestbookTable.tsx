'use client';

import * as React from 'react';
import { 
  Search, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle,
  FileSpreadsheet,
  Loader2
} from 'lucide-react';
import { deleteWishAction } from '@/actions/invitation-actions';

interface Wish {
  id: string;
  sender_name: string;
  relationship?: string | null;
  attendance: string;
  pax_count?: number | null;
  message: string;
  created_at: string;
}

interface AdminGuestbookTableProps {
  initialWishes: Wish[];
}

export function AdminGuestbookTable({ initialWishes }: AdminGuestbookTableProps) {
  const [wishes, setWishes] = React.useState<Wish[]>(initialWishes);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'attending' | 'maybe' | 'not_attending'>('all');
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Sync state if initialWishes changes
  React.useEffect(() => {
    setWishes(initialWishes);
  }, [initialWishes]);

  // Filter & Search logic
  const filteredWishes = wishes.filter((w) => {
    const matchesFilter = filterStatus === 'all' || w.attendance === filterStatus;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      w.sender_name.toLowerCase().includes(query) ||
      w.message.toLowerCase().includes(query) ||
      (w.relationship && w.relationship.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  // Export to CSV for Excel
  const handleExportCSV = () => {
    if (wishes.length === 0) return;

    const headers = ['Nama Pengirim', 'Hubungan', 'Status Kehadiran', 'Jumlah Pax', 'Pesan Doa Restu', 'Waktu Kirim'];
    const rows = filteredWishes.map((w) => [
      `"${w.sender_name.replace(/"/g, '""')}"`,
      `"${(w.relationship || '-').replace(/"/g, '""')}"`,
      w.attendance === 'attending' ? 'Hadir' : w.attendance === 'maybe' ? 'Ragu-ragu' : 'Tidak Hadir',
      w.pax_count || 1,
      `"${w.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${new Date(w.created_at).toLocaleString('id-ID')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Rekap_RSVP_Ucapan_MAZELIA_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Delete wish handler
  const handleDelete = async (wish: Wish) => {
    if (!window.confirm(`Yakin ingin menghapus ucapan dari "${wish.sender_name}"?`)) {
      return;
    }

    setDeletingId(wish.id);
    const res = await deleteWishAction(wish.id);
    setDeletingId(null);

    if (res?.error) {
      setNotification({ type: 'error', message: res.error });
    } else {
      setWishes((prev) => prev.filter((item) => item.id !== wish.id));
      setNotification({ type: 'success', message: 'Ucapan berhasil dihapus dari daftar.' });
    }

    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EAE5DC] shadow-sm overflow-hidden space-y-4">
      {/* Table Header & Controls */}
      <div className="p-5 sm:p-6 border-b border-[#EAE5DC] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#302D29]">
              Buku Tamu & Ucapan Doa Masuk
            </h2>
            <p className="text-xs text-[#9B9185] mt-0.5">
              Kelola doa restu dan konfirmasi kehadiran yang dikirimkan oleh para tamu melalui website.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            disabled={filteredWishes.length === 0}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#B69A72]/30 text-xs font-semibold text-[#846B48] hover:bg-[#F2EDE4] hover:border-[#B69A72] transition-all shadow-sm disabled:opacity-50 disabled:pointer-events-none self-start sm:self-auto"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#B69A72]" />
            <span>Download Rekap CSV (Excel)</span>
          </button>
        </div>

        {/* Notifications */}
        {notification && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in ${
              notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F4] rounded-xl border border-[#EAE5DC]">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'all'
                  ? 'bg-white text-[#846B48] shadow-sm'
                  : 'text-[#6E675F] hover:text-[#302D29]'
              }`}
            >
              Semua ({wishes.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('attending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'attending'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-[#6E675F] hover:text-emerald-700'
              }`}
            >
              Hadir ({wishes.filter((w) => w.attendance === 'attending').length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('maybe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'maybe'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-[#6E675F] hover:text-amber-700'
              }`}
            >
              Ragu ({wishes.filter((w) => w.attendance === 'maybe').length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('not_attending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'not_attending'
                  ? 'bg-white text-gray-700 shadow-sm'
                  : 'text-[#6E675F] hover:text-gray-700'
              }`}
            >
              Tidak Hadir ({wishes.filter((w) => w.attendance === 'not_attending').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B9185]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau pesan..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#EAE5DC] text-xs focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
            />
          </div>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FAF8F4] text-[#6E675F] uppercase font-semibold border-b border-[#EAE5DC]">
            <tr>
              <th className="py-3 px-4 sm:px-6">Nama Pengirim</th>
              <th className="py-3 px-4 sm:px-6">Hubungan</th>
              <th className="py-3 px-4 sm:px-6">Kehadiran</th>
              <th className="py-3 px-4 sm:px-6">Pax</th>
              <th className="py-3 px-4 sm:px-6">Pesan Doa Restu</th>
              <th className="py-3 px-4 sm:px-6">Waktu Kirim</th>
              <th className="py-3 px-4 sm:px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE5DC]">
            {filteredWishes.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#9B9185]">
                  {searchQuery || filterStatus !== 'all'
                    ? 'Tidak ada ucapan yang sesuai dengan filter atau kata kunci pencarian.'
                    : 'Belum ada ucapan doa atau konfirmasi RSVP masuk.'}
                </td>
              </tr>
            ) : (
              filteredWishes.map((w) => (
                <tr key={w.id} className="hover:bg-[#FAF8F4]/60 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-semibold text-[#302D29]">
                    {w.sender_name}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#6E675F]">
                    {w.relationship || '-'}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        w.attendance === 'attending'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : w.attendance === 'maybe'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {w.attendance === 'attending'
                        ? 'Hadir'
                        : w.attendance === 'maybe'
                        ? 'Ragu'
                        : 'Tidak Hadir'}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-mono font-semibold text-[#302D29]">
                    {w.pax_count || 1}
                  </td>
                  <td className="py-4 px-4 sm:px-6 max-w-sm sm:max-w-md text-[#4A4641] leading-relaxed whitespace-pre-wrap">
                    {w.message}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#9B9185] whitespace-nowrap">
                    {new Date(w.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(w)}
                      disabled={deletingId === w.id}
                      className="p-1.5 rounded-lg text-[#9B9185] hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      title="Hapus Ucapan"
                    >
                      {deletingId === w.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-[#FAF8F4]/50 border-t border-[#EAE5DC] flex items-center justify-between text-xs text-[#9B9185]">
        <span>
          Menampilkan <strong className="text-[#302D29]">{filteredWishes.length}</strong> dari {wishes.length} ucapan
        </span>
      </div>
    </div>
  );
}
