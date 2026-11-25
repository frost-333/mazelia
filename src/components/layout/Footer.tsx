import Link from 'next/link';
import { WEDDING_THEMES } from '@/lib/constants/themes';

export function Footer() {
  const themes = Object.values(WEDDING_THEMES);

  return (
    <footer className="border-t border-[#E8DFD0] bg-white text-[#302D29] pt-16 pb-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col items-start">
              <span className="font-serif text-2xl font-bold tracking-wider text-[#302D29]">
                MAZÉLIA
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#9B9185] -mt-0.5 font-medium">
                Events • Moments • Memories
              </span>
            </Link>
            <p className="text-xs text-[#6E675F] leading-relaxed">
              Platform dan agensi undangan digital elegan untuk pernikahan, pertunangan, dan berbagai momen istimewa keluarga di Indonesia. Praktis, personal, dan mudah dibagikan.
            </p>
          </div>

          {/* Nav Links 1: Navigasi Website */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#846B48]">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-xs text-[#554F47]">
              <li>
                <Link href="/#beranda" className="hover:text-[#B69A72] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#tentang" className="hover:text-[#B69A72] transition-colors">
                  Tentang MAZÉLIA
                </Link>
              </li>
              <li>
                <Link href="/#cara-pesan" className="hover:text-[#B69A72] transition-colors">
                  Cara Pemesanan
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#B69A72] transition-colors">
                  Pilihan Paket
                </Link>
              </li>
              <li>
                <Link href="/fadhil-mazaya" className="hover:text-[#B69A72] transition-colors">
                  Contoh Undangan Langsung
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links 2: Koleksi Tema */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#846B48]">
              Koleksi Tema
            </h4>
            <ul className="space-y-2.5 text-xs text-[#554F47]">
              {themes.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/fadhil-mazaya?preview=true&previewTheme=${t.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#B69A72] transition-colors inline-flex items-center gap-2"
                  >
                    <span
                      className="w-2 h-2 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: t.swatch[0] }}
                    />
                    <span>{t.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Links 3: Bantuan & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#846B48]">
              Bantuan &amp; Kebijakan
            </h4>
            <ul className="space-y-2.5 text-xs text-[#554F47]">
              <li>
                <Link href="/#faq" className="hover:text-[#B69A72] transition-colors">
                  Pertanyaan Umum (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#B69A72] transition-colors">
                  Hubungi Tim Pemesanan
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#B69A72] transition-colors">
                  Masuk Akun Pengguna
                </Link>
              </li>
              <li>
                <span className="text-[#9B9185]">Privacy Policy (UU PDP No. 27/2022)</span>
              </li>
              <li>
                <span className="text-[#9B9185]">Terms &amp; Conditions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#E8DFD0]/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#9B9185]">
          <p>© {new Date().getFullYear()} MAZÉLIA Agency. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="font-serif italic text-[#846B48]">
            Dirancang dengan keanggunan untuk momen-momen paling berharga dalam hidup Anda.
          </p>
        </div>
      </div>
    </footer>
  );
}
