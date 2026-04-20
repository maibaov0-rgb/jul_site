import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Адмін-панель | Na Gólov[y]",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-muted hover:text-foreground"
            >
              ← Сайт
            </Link>
            <span className="text-border">|</span>
            <span className="font-serif text-lg">Адмін-панель</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin/products" className="hover:text-accent">
              Товари
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-8">{children}</div>
    </div>
  );
}
