import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "刘丽航专属留学 App",
  description: "澳洲留学 / 移民顾问知识库与问答系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🎓</span>
              <span className="font-bold text-slate-800">
                刘丽航 · 澳洲留学顾问
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <NavLink href="/knowledge">知识库</NavLink>
              <NavLink href="/knowledge/new">+ 新增</NavLink>
              <span className="ml-2 px-2 py-1 text-xs bg-slate-100 text-slate-500 rounded">
                Phase 1
              </span>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        <footer className="max-w-5xl mx-auto px-4 py-8 text-center text-xs text-slate-400">
          刘丽航专属 · 本地运行 · 数据储存在 prisma/dev.db
        </footer>
      </body>
    </html>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
    >
      {children}
    </Link>
  );
}
