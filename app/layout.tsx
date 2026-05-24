import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MiMo NPC Tavern',
  description: 'AI-powered fantasy tavern with interactive NPCs, quest generation, and moral evaluation',
  icons: {
    icon: '/icons/tavern.svg',
  },
  openGraph: {
    title: 'MiMo NPC Tavern',
    description: 'AI-powered fantasy tavern with interactive NPCs',
    images: ['/images/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} scroll-container`}>
        <div className="min-h-screen bg-gradient-to-b from-tavern-dark to-tavern-wood">
          <header className="sticky top-0 z-50 border-b border-tavern-gold/20 bg-tavern-dark/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏰</div>
                  <h1 className="text-xl font-bold text-tavern-gold">
                    MiMo NPC Tavern
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-tavern-gold/70">
                    AI-powered fantasy adventure
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-tavern-gold/20 bg-tavern-dark/80 py-6">
            <div className="container mx-auto px-4 text-center text-sm text-tavern-gold/50">
              <p>Powered by MiMo AI V2.5 Pro • Interactive NPCs • Quest Generation • Moral Evaluation</p>
              <p className="mt-2">© 2026 MiMo NPC Tavern • A fantasy adventure experience</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
