'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  ExternalLink, 
  Edit, 
  Trash2, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  Users, 
  MessageSquareHeart, 
  Plus, 
  Search,
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { formatDateIndo } from '@/lib/utils/formatters';
import { deleteInvitationAction, duplicateInvitationAction } from '@/actions/invitation-actions';

interface InvitationItem {
  id: string;
  slug: string;
  title: string;
  groom_nickname: string;
  bride_nickname: string;
  ceremony_date?: string;
  ceremony_location?: string;
  created_at: string;
  attendingCount: number;
  totalPax: number;
  totalWishes: number;
  status?: string;
}

interface AgencyClientGridProps {
  initialInvitations: InvitationItem[];
}

export function AgencyClientGrid({ initialInvitations }: AgencyClientGridProps) {
  const [invitations, setInvitations] = React.useState<InvitationItem[]>(initialInvitations);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = React.useState<string | null>(null);
  const [baseUrl, setBaseUrl] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const filtered = invitations.filter((inv) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      inv.title.toLowerCase().includes(q) ||
      inv.groom_nickname.toLowerCase().includes(q) ||
      inv.bride_nickname.toLowerCase().includes(q) ||
      inv.slug.toLowerCase().includes(q)
    );
  });

  const copyUrl = (slug: string, id: string) => {
    const fullUrl = baseUrl ? `${baseUrl}/${slug}` : `/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDuplicate = async (inv: InvitationItem) => {
    setDuplicatingId(inv.id);
    const res = await duplicateInvitationAction(inv.id);
    setDuplicatingId(null);

    if (res?.success && res.newInvitationId) {
      const duplicatedItem: InvitationItem = {
        ...inv,
        id: res.newInvitationId,
        slug: res.newSlug,
        title: `${inv.title} (Salinan)`,
        status: 'draft',
        attendingCount: 0,
        totalPax: 0,
        totalWishes: 0,
        created_at: new Date().toISOString(),
      };
      setInvitations((prev) => [duplicatedItem, ...prev]);
      alert(`Undangan berhasil diduplikasi menjadi: ${duplicatedItem.title}`);
    } else if (res?.error) {
      alert(res.error);
    }
  };

  const handleDelete = async (inv: InvitationItem) => {
    if (!window.confirm(`Yakin ingin menghapus undangan "${inv.title}"? Seluruh data tamu dan ucapan terkait akan ikut terhapus.`)) {
      return;
    }

    setDeletingId(inv.id);
    const res = await deleteInvitationAction(inv.id);
    setDeletingId(null);

    if (res?.success) {
      setInvitations((prev) => prev.filter((item) => item.id !== inv.id));
    } else if (res?.error) {
      alert(res.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B9185]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama klien atau slug..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#EAE5DC] bg-white text-xs focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20"
          />
        </div>

        <Link
          href="/studio-mazelia/ruang-agensi/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs font-semibold shadow-luxury-gold transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Undangan Klien Baru</span>
        </Link>
      </div>

      {/* Grid of Invitations */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAE5DC] p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F4] text-[#B69A72] border border-[#B69A72]/30 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-[#302D29]">
              {searchQuery ? 'Tidak Ditemukan Klien yang Cocok' : 'Belum Ada Klien Undangan'}
            </h3>
            <p className="text-xs text-[#6E675F] max-w-sm mx-auto">
              {searchQuery
                ? 'Coba gunakan kata kunci lain untuk mencari nama mempelai.'
                : 'Mulai buat website undangan digital pertama untuk klien Anda.'}
            </p>
          </div>
          {!searchQuery && (
            <Link
              href="/studio-mazelia/ruang-agensi/new"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs font-semibold shadow-luxury-gold transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Undangan Klien Sekarang</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  {inv.status === 'draft' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Draf (Terkunci)
                    </span>
                  ) : inv.status === 'archived' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-[10px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      Arsip Selesai
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Online
                    </span>
                  )}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(inv)}
                      disabled={duplicatingId === inv.id || deletingId === inv.id}
                      className="text-[#9B9185] hover:text-[#B69A72] p-1 rounded-lg transition-colors disabled:opacity-50"
                      title="Duplikat Template Acara Ini"
                    >
                      {duplicatingId === inv.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B69A72]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(inv)}
                      disabled={deletingId === inv.id || duplicatingId === inv.id}
                      className="text-[#9B9185] hover:text-red-600 p-1 rounded-lg transition-colors disabled:opacity-50"
                      title="Hapus Acara Klien"
                    >
                      {deletingId === inv.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#302D29] group-hover:text-[#B69A72] transition-colors line-clamp-1">
                    {inv.title}
                  </h3>
                  <div className="flex items-center gap-1.5 pt-1 text-xs text-[#846B48]">
                    <span className="font-mono bg-[#FAF8F4] px-2 py-0.5 rounded-lg border border-[#EAE5DC]">
                      /{inv.slug}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyUrl(inv.slug, inv.id)}
                      className="p-1 rounded text-[#9B9185] hover:text-[#302D29] transition-colors"
                      title="Salin Tautan"
                    >
                      {copiedId === inv.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#6E675F] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B69A72] shrink-0" />
                    <span>{formatDateIndo(inv.ceremony_date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B69A72] shrink-0" />
                    <span className="truncate">{inv.ceremony_location || 'Lokasi Acara'}</span>
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="pt-4 border-t border-[#EAE5DC] space-y-4">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#FAF8F4] border border-[#EAE5DC]">
                    <span className="text-[10px] uppercase text-[#9B9185] block font-medium">Hadir</span>
                    <span className="font-serif font-bold text-sm text-[#302D29]">
                      {inv.attendingCount} ({inv.totalPax} Pax)
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF8F4] border border-[#EAE5DC]">
                    <span className="text-[10px] uppercase text-[#9B9185] block font-medium">Ucapan</span>
                    <span className="font-serif font-bold text-sm text-[#302D29]">
                      {inv.totalWishes} Doa
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/studio-mazelia/ruang-agensi/invitations/${inv.id}`}
                    className="px-3 py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#F2EDE4] border border-[#B69A72]/30 text-xs font-semibold text-[#846B48] flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <span>Buku Tamu</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/studio-mazelia/ruang-agensi/invitations/${inv.id}/edit`}
                    className="px-3 py-2 rounded-xl bg-[#B69A72] hover:bg-[#A0845E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm text-center"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit Acara</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`/${inv.slug}/monitor`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 rounded-lg border border-[#B69A72]/40 bg-[#FAF8F4] text-[11px] font-medium text-[#846B48] hover:bg-[#F2EDE4] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Portal Pengantin 📱</span>
                  </a>

                  <a
                    href={`/${inv.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 rounded-lg border border-[#EAE5DC] text-[11px] font-medium text-[#6E675F] hover:text-[#302D29] hover:bg-[#FAF8F4] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Lihat Web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
