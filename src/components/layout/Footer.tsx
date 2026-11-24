import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-mazelia-border bg-white text-mazelia-charcoal pt-16 pb-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex flex-col items-start">
              <span className="font-serif text-2xl font-bold tracking-wider text-mazelia-charcoal">
                MAZÉLIA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-mazelia-taupe -mt-1 font-medium">
                Events • Moments • Memories
              </span>
            </Link>
            <p className="text-xs text-mazelia-taupe leading-relaxed">
              Platform perencanaan acara digital elegan untuk masyarakat dan keluarga di Indonesia. Menjadikan setiap momen berharga lebih terstruktur, tenang, dan berkesan.
            </p>
          </div>

          {/* Nav Links 1: Perencanaan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-mazelia-bronze">Perencanaan Acara</h4>
            <ul className="space-y-2 text-xs text-mazelia-charcoal-light">
              <li><Link href="/register" className="hover:text-mazelia-gold transition-colors">Wedding Planner</Link></li>
              <li><Link href="/register" className="hover:text-mazelia-gold transition-colors">Engagement Planner</Link></li>
              <li><Link href="/register" className="hover:text-mazelia-gold transition-colors">Birthday & Milestone</Link></li>
              <li><Link href="/register" className="hover:text-mazelia-gold transition-colors">Family Gathering</Link></li>
            </ul>
          </div>

          {/* Nav Links 2: Fitur Utama */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-mazelia-bronze">Fitur Inti</h4>
            <ul className="space-y-2 text-xs text-mazelia-charcoal-light">
              <li><Link href="/fitur#checklist" className="hover:text-mazelia-gold transition-colors">Event Checklist & Timeline</Link></li>
              <li><Link href="/fitur#budget" className="hover:text-mazelia-gold transition-colors">Budget Planner (IDR)</Link></li>
              <li><Link href="/fitur#guest" className="hover:text-mazelia-gold transition-colors">Guest Management & RSVP</Link></li>
              <li><Link href="/fitur#whatsapp" className="hover:text-mazelia-gold transition-colors">WhatsApp Invitation Generator</Link></li>
            </ul>
          </div>

          {/* Nav Links 3: Bantuan & Kebijakan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-mazelia-bronze">Bantuan & Legal</h4>
            <ul className="space-y-2 text-xs text-mazelia-charcoal-light">
              <li><Link href="/tentang" className="hover:text-mazelia-gold transition-colors">Tentang Kami</Link></li>
              <li><Link href="/pricing" className="hover:text-mazelia-gold transition-colors">Paket & Harga</Link></li>
              <li><Link href="/kontak" className="hover:text-mazelia-gold transition-colors">Hubungi Dukungan</Link></li>
              <li><span className="text-mazelia-taupe/80">Kepatuhan UU PDP No. 27/2022</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-mazelia-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-mazelia-taupe">
          <p>© {new Date().getFullYear()} MAZÉLIA. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="mt-2 sm:mt-0 font-serif italic text-mazelia-gold-dark">
            Dirancang dengan keanggunan untuk momen-momen paling sakral dalam hidup Anda.
          </p>
        </div>
      </div>
    </footer>
  );
}
