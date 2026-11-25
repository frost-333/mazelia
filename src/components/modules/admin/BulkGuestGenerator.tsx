'use client';

import * as React from 'react';
import { 
  Users, 
  Download, 
  Copy, 
  Check, 
  Send, 
  FileSpreadsheet, 
  Sparkles, 
  FileText, 
  ChevronRight,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BulkGuestGeneratorProps {
  slug: string;
  groomNickname: string;
  brideNickname: string;
  ceremonyDate?: string;
  ceremonyLocation?: string;
}

export function BulkGuestGenerator({
  slug,
  groomNickname,
  brideNickname,
  ceremonyDate,
  ceremonyLocation,
}: BulkGuestGeneratorProps) {
  const [namesText, setNamesText] = React.useState('');
  const [guestList, setGuestList] = React.useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const [copiedAll, setCopiedAll] = React.useState(false);
  const [searchFilter, setSearchFilter] = React.useState('');
  const [baseUrl, setBaseUrl] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const handleProcessNames = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const lines = namesText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      // Remove duplicates
      const unique = Array.from(new Set(lines));
      setGuestList(unique);
      setIsProcessing(false);
    }, 250);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const lines = content
        .split(/\r?\n/)
        .map((l) => l.split(',')[0].replace(/^["']|["']$/g, '').trim())
        .filter((l) => l.length > 0 && !l.toLowerCase().includes('nama'));

      setNamesText(lines.join('\n'));
      setGuestList(Array.from(new Set(lines)));
    };
    reader.readAsText(file);
  };

  const generateGuestUrl = (name: string) => {
    const encoded = encodeURIComponent(name);
    return `${baseUrl || ''}/${slug}?to=${encoded}`;
  };

  const generateWhatsAppMessage = (name: string) => {
    const url = generateGuestUrl(name);
    return `Kepada Yth.
Bapak/Ibu/Saudara/i: *${name}*

Assalamu'alaikum Wr. Wb / Salam Sejahtera,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri momen istimewa pernikahan kami:

💍 *${groomNickname} & ${brideNickname}* 💍

Untuk informasi lengkap mengenai acara dan konfirmasi kehadiran, silakan buka tautan undangan digital kami berikut:
${url}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
Wassalamu'alaikum Wr. Wb.`;
  };

  const copyGuestUrl = (name: string, index: number) => {
    const url = generateGuestUrl(name);
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadCSV = () => {
    if (guestList.length === 0) return;

    // Excel UTF-8 BOM
    let csvContent = '\uFEFF"Nama Tamu","Tautan Undangan","Pesan WhatsApp Siap Kirim"\n';

    guestList.forEach((name) => {
      const url = generateGuestUrl(name);
      const msg = generateWhatsAppMessage(name).replace(/"/g, '""');
      csvContent += `"${name}","${url}","${msg}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const filename = `Daftar_Tamu_${slug}_${new Date().toISOString().split('T')[0]}.csv`;
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredGuests = guestList.filter((g) =>
    g.toLowerCase().includes(searchFilter.toLowerCase().trim())
  );

  return (
    <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE5DC]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#B69A72]/30 flex items-center justify-center text-[#846B48]">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-[#302D29]">
              Generator Massal Link Tamu & WhatsApp (Bulk Export)
            </h2>
            <p className="text-xs text-[#6E675F]">
              Masukkan puluhan hingga ratusan nama tamu sekaligus. Dapatkan tautan personal & unduh format Excel / CSV.
            </p>
          </div>
        </div>

        {guestList.length > 0 && (
          <Button
            type="button"
            onClick={downloadCSV}
            size="sm"
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Excel / CSV ({guestList.length} Tamu)</span>
          </Button>
        )}
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input Textarea */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A4641] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#B69A72]" />
              <span>Daftar Nama Tamu (1 Nama Per Baris)</span>
            </label>
            <label className="text-[11px] text-[#846B48] hover:underline cursor-pointer font-medium">
              <span>+ Unggah CSV / TXT</span>
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <textarea
            rows={6}
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
            placeholder={`Bpk. Bambang & Keluarga\nAnisa Rahma\nDr. Hendra Wijaya, Sp.A\nKeluarga Besar Bpk. Gunawan\nRizky & Fani`}
            className="w-full p-3.5 rounded-xl border border-[#EAE5DC] bg-white text-xs leading-relaxed focus:border-[#B69A72] focus:outline-none focus:ring-2 focus:ring-[#B69A72]/20 font-sans"
          />

          <div className="flex items-center justify-between">
            <p className="text-[10px] text-[#9B9185]">
              Pisahkan tiap tamu dengan menekan tombol Enter (baris baru).
            </p>
            <Button
              type="button"
              onClick={handleProcessNames}
              size="sm"
              isLoading={isProcessing}
              className="bg-[#B69A72] hover:bg-[#A0845E] text-white gap-1.5 text-xs shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proses Tautan Tamu</span>
            </Button>
          </div>
        </div>

        {/* Right: Quick Instructions / Tips */}
        <div className="p-5 rounded-xl bg-[#FAF8F4] border border-[#EAE5DC] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#846B48] block">
              💡 Cara Kerja Massal untuk Klien & Vendor
            </span>
            <ul className="text-xs text-[#6E675F] space-y-2 list-disc list-inside leading-relaxed">
              <li>
                <strong>Copy-Paste Langsung:</strong> Salin kolom nama dari Excel klien Anda, lalu tempel di kolom teks sebelah kiri.
              </li>
              <li>
                <strong>Tautan Otomatis:</strong> Setiap nama tamu akan memiliki tautan khusus seperti <code className="bg-white px-1.5 py-0.5 rounded border border-[#EAE5DC] text-[11px]">/{slug}?to=Nama+Tamu</code>.
              </li>
              <li>
                <strong>Serahkan ke Klien / WO:</strong> Tekan tombol hijau <em>Unduh Excel / CSV</em> untuk memberikan file spreadsheet lengkap yang siap dipakai broadcast ke WhatsApp oleh pengantin.
              </li>
            </ul>
          </div>

          <div className="p-3 bg-white rounded-lg border border-[#EAE5DC] text-[11px] text-[#846B48] flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Format file CSV mendukung huruf khusus, gelar akademik, & simbol.</span>
          </div>
        </div>
      </div>

      {/* Generated Table View */}
      {guestList.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[#EAE5DC]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#302D29]">
                Hasil Pembuatan Tautan ({guestList.length} Tamu Siap)
              </span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9185]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cari nama tamu..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#EAE5DC] bg-white text-xs focus:border-[#B69A72] focus:outline-none"
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto rounded-xl border border-[#EAE5DC]">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#FAF8F4] sticky top-0 border-b border-[#EAE5DC] text-[11px] font-semibold text-[#846B48] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">No</th>
                  <th className="py-2.5 px-3">Nama Tamu Undangan</th>
                  <th className="py-2.5 px-3">Tautan Undangan Khusus</th>
                  <th className="py-2.5 px-3 text-right">Aksi Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5DC] bg-white">
                {filteredGuests.map((name, idx) => {
                  const url = generateGuestUrl(name);
                  const waMsg = generateWhatsAppMessage(name);
                  const waUrl = `https://wa.me/?text=${encodeURIComponent(waMsg)}`;

                  return (
                    <tr key={idx} className="hover:bg-[#FAF8F4]/50 transition-colors">
                      <td className="py-2.5 px-3 text-[#9B9185] font-mono text-[11px]">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-medium text-[#302D29]">{name}</td>
                      <td className="py-2.5 px-3 text-[#6E675F] font-mono text-[11px] max-w-xs truncate">
                        {url}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => copyGuestUrl(name, idx)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF8F4] hover:bg-[#F2EDE4] border border-[#EAE5DC] text-[11px] font-medium text-[#846B48] transition-colors"
                            title="Salin Tautan"
                          >
                            {copiedIndex === idx ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedIndex === idx ? 'Tersalin' : 'Salin'}</span>
                          </button>

                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-medium text-emerald-700 transition-colors"
                            title="Kirim ke WhatsApp"
                          >
                            <Send className="w-3 h-3" />
                            <span>Kirim WA</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}