export interface ChecklistPresetItem {
  title: string;
  category: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
}

export const CHECKLIST_PRESETS: Record<string, ChecklistPresetItem[]> = {
  Wedding: [
    { title: 'Tentukan tanggal dan konsep utama pernikahan', category: 'Persiapan Venue', priority: 'high' },
    { title: 'Tentukan anggaran keseluruhan pernikahan', category: 'Administrasi', priority: 'high' },
    { title: 'Survei dan booking venue akad dan resepsi', category: 'Persiapan Venue', priority: 'high' },
    { title: 'Daftar dan urus berkas administrasi KUA / Catatan Sipil', category: 'Administrasi', priority: 'high' },
    { title: 'Pilih dan test food vendor katering', category: 'Catering', priority: 'high' },
    { title: 'Pilih vendor dekorasi dan tentukan tema pelaminan', category: 'Dekorasi', priority: 'high' },
    { title: 'Fitting busana pengantin dan keluarga inti', category: 'Busana', priority: 'high' },
    { title: 'Pilih vendor MUA (Make Up Artist) dan hair/hijab do', category: 'Makeup', priority: 'high' },
    { title: 'Pilih vendor dokumentasi (foto dan video sinematik)', category: 'Dokumentasi', priority: 'medium' },
    { title: 'Susun daftar tamu undangan (keluarga, VIP, rekan)', category: 'Undangan', priority: 'high' },
    { title: 'Pilih dan cetak / terbitkan undangan', category: 'Undangan', priority: 'medium' },
    { title: 'Pilih MC, penghibur, atau sound system', category: 'Hiburan', priority: 'medium' },
    { title: 'Beli cincin nikah dan hantaran / seserahan', category: 'Administrasi', priority: 'high' },
    { title: 'Pilih souvenir pernikahan', category: 'Undangan', priority: 'low' },
    { title: 'Technical meeting dengan seluruh vendor dan keluarga', category: 'Administrasi', priority: 'high' },
    { title: 'Gladi resik susunan acara (rundown)', category: 'Administrasi', priority: 'high' },
  ],
  Engagement: [
    { title: 'Tentukan tanggal dan lokasi lamaran', category: 'Venue', priority: 'high' },
    { title: 'Tentukan anggaran acara lamaran', category: 'Administrasi', priority: 'high' },
    { title: 'Pesan katering / konsumsi keluarga', category: 'Catering', priority: 'high' },
    { title: 'Pesan backdrop dekorasi lamaran', category: 'Dekorasi', priority: 'high' },
    { title: 'Fitting busana lamaran calon pengantin', category: 'Busana', priority: 'medium' },
    { title: 'Booking MUA untuk lamaran', category: 'Makeup', priority: 'medium' },
    { title: 'Siapkan cincin tunangan dan hantaran pembuka', category: 'Administrasi', priority: 'high' },
    { title: 'Booking fotografer dokumentasi', category: 'Dokumentasi', priority: 'medium' },
    { title: 'Susun daftar keluarga yang hadir dan rundown acara', category: 'Administrasi', priority: 'high' },
  ],
  Birthday: [
    { title: 'Tentukan tema dan konsep pesta ulang tahun', category: 'Konsep', priority: 'high' },
    { title: 'Booking tempat atau siapkan ruangan acara', category: 'Venue', priority: 'high' },
    { title: 'Pesan kue ulang tahun (custom cake)', category: 'Catering', priority: 'high' },
    { title: 'Pesan katering, snack box, atau tumpeng', category: 'Catering', priority: 'high' },
    { title: 'Pesan balon dan dekorasi tema', category: 'Dekorasi', priority: 'medium' },
    { title: 'Susun daftar undangan teman dan keluarga', category: 'Undangan', priority: 'medium' },
    { title: 'Siapkan bingkisan / goodie bag tamu', category: 'Logistik', priority: 'low' },
    { title: 'Pilih MC atau susun games & playlist musik', category: 'Hiburan', priority: 'low' },
  ],
  Anniversary: [
    { title: 'Tentukan konsep perayaan (intimate dinner / syukuran)', category: 'Konsep', priority: 'high' },
    { title: 'Reservasi restoran atau venue khusus', category: 'Venue', priority: 'high' },
    { title: 'Pesan kue atau hidangan spesial', category: 'Catering', priority: 'medium' },
    { title: 'Siapkan kado atau perhiasan kenang-kenangan', category: 'Logistik', priority: 'high' },
    { title: 'Booking fotografer untuk sesi foto berdua/keluarga', category: 'Dokumentasi', priority: 'medium' },
  ],
  'Family Gathering': [
    { title: 'Bentuk panitia kecil keluarga dan tentukan tanggal', category: 'Administrasi', priority: 'high' },
    { title: 'Survei dan booking villa / hall / area outdoor', category: 'Venue', priority: 'high' },
    { title: 'Rancang anggaran iuran dan alokasi biaya', category: 'Administrasi', priority: 'high' },
    { title: 'Pesan katering / siapkan bahan BBQ bersama', category: 'Catering', priority: 'high' },
    { title: 'Pesan seragam kaos keluarga', category: 'Logistik', priority: 'low' },
    { title: 'Susun rundown games dan doorprize', category: 'Hiburan', priority: 'medium' },
    { title: 'Data konfirmasi kehadiran tiap kepala keluarga', category: 'Undangan', priority: 'high' },
  ],
  Other: [
    { title: 'Tentukan tujuan utama dan tanggal acara', category: 'Umum', priority: 'high' },
    { title: 'Susun rencana anggaran awal', category: 'Administrasi', priority: 'high' },
    { title: 'Pilih dan booking lokasi acara', category: 'Venue', priority: 'high' },
    { title: 'Pesan konsumsi dan katering', category: 'Catering', priority: 'high' },
    { title: 'Sebar undangan kepada peserta', category: 'Undangan', priority: 'medium' },
    { title: 'Susun susunan acara lengkap', category: 'Administrasi', priority: 'medium' },
  ],
};
