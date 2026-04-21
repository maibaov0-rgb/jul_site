"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { useCartStore } from "@/lib/store";

const navItems = [
  { href: "/", label: "Головна" },
  { href: "/catalog", label: "Каталог" },
  { href: "/brand", label: "Про бренд" },
  { href: "/blog", label: "Блог" },
  { href: "/#contacts", label: "Контакти" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore((s) => s.count());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 overflow-hidden transition-all duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-header-bg/90 shadow-sm shadow-foreground/5 backdrop-blur-md"
            : "bg-header-bg/60 backdrop-blur-sm"
        }`}
      >
        {/* One-time shimmer sweep on load */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={false}
        >
          <motion.div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/30 to-transparent skew-x-[-20deg]"
            initial={{ x: "-100%" }}
            animate={{ x: "400%" }}
            transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:block" aria-label="Головна навігація">
            <ul className="flex items-center gap-8 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Кошик"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm transition-colors hover:border-foreground/40"
            >
              <CartIcon />
              <span className="hidden sm:inline">Кошик</span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label={open ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-border transition-colors hover:border-foreground/40 md:hidden"
            >
              <span
                className={`h-px w-5 bg-foreground transition-all duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-foreground transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-foreground transition-all duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-background shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Навігаційне меню"
      >
        <div className="flex h-16 items-center justify-between border-b border-border/60 px-6">
          <span className="font-serif text-lg">Меню</span>
          <button
            type="button"
            aria-label="Закрити меню"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 px-6 py-8" aria-label="Мобільна навігація">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center rounded-xl px-3 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border/60 p-6">
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm text-background"
          >
            <CartIcon className="text-background" />
            Кошик {cartCount > 0 ? `(${cartCount})` : ""}
          </Link>
        </div>
      </div>
    </>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
