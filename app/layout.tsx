import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// 英文标题用 Playfair Display —— 优雅的 didone 风格衬线
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// 正文用 Inter —— 现代简洁
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lydia's Study · 刘丽航专属留学顾问",
  description: "澳洲留学 / 移民顾问专属知识库与 AI 问答系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen font-sans">
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/60 border-b border-brand-100/60">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-rose-button flex items-center justify-center shadow-soft text-white text-lg font-serif">
                L
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-lg text-ink-900 tracking-wide">
                  Lydia&apos;s Study
                </span>
                <span className="text-[11px] text-ink-500 tracking-wider uppercase">
                  Australia Immigration Atelier
                </span>
              </div>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <NavLink href="/knowledge">知识库</NavLink>
              <NavLink href="/assess">评估</NavLink>
              <NavLink href="/checklist">清单</NavLink>
              <NavLink href="/content">内容</NavLink>
              <NavLink href="/todo">待办</NavLink>
              <NavLink href="/fun">小工具</NavLink>
              <NavLink href="/chat" highlight>
                AI 问答
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">
          {children}
        </main>

        <footer className="max-w-5xl mx-auto px-6 py-10 text-center">
          <div className="inline-flex items-center gap-3 text-xs text-ink-400 tracking-wider">
            <span className="h-px w-8 bg-gold-300/60"></span>
            <span>Lydia&apos;s Private Knowledge Atelier</span>
            <span className="h-px w-8 bg-gold-300/60"></span>
          </div>
        </footer>
      </body>
    </html>
  );
}

function NavLink({
  href,
  children,
  highlight,
}: {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  if (highlight) {
    return (
      <Link
        href={href}
        className="ml-2 px-4 py-2 rounded-full bg-gradient-rose-button text-white text-sm font-medium shadow-soft hover:shadow-soft-lg hover:bg-gradient-rose-button-hover transition-all duration-300 flex items-center gap-1.5"
      >
        <span className="text-[10px]">✦</span>
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-full text-ink-600 hover:bg-brand-50 hover:text-brand-700 transition-all duration-200"
    >
      {children}
    </Link>
  );
}
