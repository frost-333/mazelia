import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAZÉLIA — Events • Moments • Memories',
  description: 'Platform perencanaan acara digital elegan untuk individu dan keluarga di Indonesia. Checklist, anggaran, tamu, dan vendor dalam satu tempat.',
  keywords: ['event planner', 'wedding planner', 'undangan digital', 'budget planner', 'acara indonesia'],
  openGraph: {
    title: 'MAZÉLIA — Events • Moments • Memories',
    description: 'Platform perencanaan acara digital elegan untuk individu dan keluarga di Indonesia.',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-mazelia-ivory text-mazelia-charcoal flex flex-col font-sans selection:bg-mazelia-gold/20 selection:text-mazelia-bronze">
        {children}
      </body>
    </html>
  );
}
