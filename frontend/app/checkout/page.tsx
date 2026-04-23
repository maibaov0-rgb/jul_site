"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { createOrder } from "@/lib/api";
import { searchCities, getWarehouses, type NpCity, type NpWarehouse } from "@/lib/novaposhta";

function formatPrice(price: number) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(price);
}

type Step = "form" | "success";

// ── City autocomplete ──────────────────────────────────────────────────────

function CityField({
  onSelect,
}: {
  onSelect: (city: NpCity) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NpCity[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipSearchRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skipSearchRef.current) { skipSearchRef.current = false; return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 2) { setResults([]); setOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const cities = await searchCities(query);
        setResults(cities);
        setOpen(cities.length > 0);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSelect(city: NpCity) {
    skipSearchRef.current = true;
    setQuery(city.Present);
    setOpen(false);
    onSelect(city);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          required
          placeholder="Почніть вводити місто…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-10 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20"
        />
        {loading && <div className="absolute right-3 top-1/2 -translate-y-1/2"><SpinnerIcon /></div>}
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-border/60 bg-background shadow-lg"
          >
            {results.map((city) => (
              <li key={city.Ref}>
                <button
                  type="button"
                  onMouseDown={() => handleSelect(city)}
                  className="flex w-full flex-col px-4 py-2.5 text-left hover:bg-surface transition-colors"
                >
                  <span className="text-sm">{city.Present}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Warehouse autocomplete ─────────────────────────────────────────────────

function WarehouseField({
  cityRef,
  onSelect,
}: {
  cityRef: string;
  onSelect: (warehouse: NpWarehouse) => void;
}) {
  const [query, setQuery] = useState("");
  const [warehouses, setWarehouses] = useState<NpWarehouse[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cityRef) return;
    setQuery("");
    setWarehouses([]);
    setLoading(true);
    getWarehouses(cityRef)
      .then(setWarehouses)
      .finally(() => setLoading(false));
  }, [cityRef]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = warehouses.filter((w) =>
    w.Description.toLowerCase().includes(query.toLowerCase()),
  );

  function handleSelect(w: NpWarehouse) {
    setQuery(w.Description);
    setOpen(false);
    onSelect(w);
  }

  const disabled = !cityRef;

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          required
          disabled={disabled}
          placeholder={disabled ? "Спочатку оберіть місто" : loading ? "Завантаження…" : "Пошук відділення…"}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { if (!disabled && warehouses.length > 0) setOpen(true); }}
          className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-10 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <SpinnerIcon />
          </div>
        )}
      </div>
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-border/60 bg-background shadow-lg"
          >
            {filtered.map((w) => (
              <li key={w.Ref}>
                <button
                  type="button"
                  onMouseDown={() => handleSelect(w)}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-surface transition-colors"
                >
                  {w.Description}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("form");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ customerName: "", phone: "" });
  const [selectedCity, setSelectedCity] = useState<{ name: string; ref: string }>({ name: "", ref: "" });
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCity.name || !selectedWarehouse) {
      setError("Будь ласка, оберіть місто та відділення зі списку.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const deliveryInfo = `${selectedCity.name}, ${selectedWarehouse}`;
      const order = await createOrder({
        customerName: form.customerName,
        phone: form.phone,
        deliveryInfo,
        products: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })),
        totalPrice: total(),
      });
      setOrderId(order.id);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStep("success");
    } catch {
      setError("Помилка при оформленні замовлення. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && step === "form") {
    return (
      <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8">
        <p className="font-serif text-4xl">Кошик порожній</p>
        <Link
          href="/catalog"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-8 text-sm text-white"
        >
          До каталогу
        </Link>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
            <CheckIcon />
          </div>
          <h1 className="mt-6 text-4xl font-bold uppercase text-accent">Дякуємо за замовлення!</h1>
          {orderId && <p className="mt-2 text-muted">Замовлення №{orderId}</p>}
          <p className="mt-6 leading-relaxed text-muted">
            Юлія звʼяжеться з вами найближчим часом для підтвердження.
          </p>

          <motion.div
            className="mt-10 rounded-2xl border-2 border-accent bg-surface p-6 text-left"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(131,99,157,0)",
                "0 0 16px 4px rgba(131,99,157,0.35)",
                "0 0 0 0 rgba(131,99,157,0)",
              ],
            }}
            transition={{ duration: 1.4, repeat: 3, ease: "easeInOut", delay: 0.4 }}
          >
            <h2 className="font-serif text-xl">Оплата</h2>
            <p className="mt-3 text-sm text-muted">
              Оплатіть замовлення після отримання або переведіть на IBAN:
            </p>
            <div className="mt-3 rounded-xl bg-background px-4 py-3">
              <p className="font-mono text-sm font-medium">UA12 3456 7890 1234 5678 9012 3456</p>
              <p className="mt-1 text-xs text-muted">Данільченко Юлія</p>
            </div>
            <p className="mt-3 text-xs text-muted">
              У призначенні платежу вкажіть ваше ім'я та номер замовлення.
            </p>
          </motion.div>

          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-8 text-sm text-white transition-colors hover:bg-accent/90"
          >
            На головну
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="mb-8 flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-foreground">Головна</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-foreground">Кошик</Link>
          <span>/</span>
          <span className="text-foreground">Оформлення</span>
        </nav>
        <h1 className="font-serif text-4xl sm:text-5xl">Оформлення</h1>
      </motion.div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <section className="rounded-2xl border border-border/60 bg-surface p-6">
            <h2 className="font-serif text-xl">Контактні дані</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="customerName" className="mb-1.5 block text-sm font-medium">
                  ПІБ <span className="text-red-500">*</span>
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Іваненко Іван Іванович"
                  value={form.customerName}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                  Телефон <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+380 XX XXX XX XX"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border/60 bg-surface p-6">
            <h2 className="font-serif text-xl">Доставка Новою Поштою</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Місто <span className="text-red-500">*</span>
                </label>
                <CityField
                  onSelect={(city) => setSelectedCity({ name: city.Present, ref: city.Ref })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Відділення <span className="text-red-500">*</span>
                </label>
                <WarehouseField
                  cityRef={selectedCity.ref}
                  onSelect={(w) => setSelectedWarehouse(w.Description)}
                />
              </div>
            </div>
          </section>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-14 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-all hover:bg-accent/90 disabled:opacity-60"
          >
            {loading ? "Оформлюємо…" : "Підтвердити замовлення"}
          </button>
        </motion.form>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-fit rounded-2xl border border-border/60 bg-surface p-6 lg:sticky lg:top-24"
        >
          <h2 className="font-serif text-xl">Ваше замовлення</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-accent/20 via-background to-gold/15">
                  {item.product.imageUrls?.[0] ? (
                    <img
                      src={item.product.imageUrls[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-serif text-lg text-foreground/15">
                        {item.product.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 text-sm">
                  <p className="line-clamp-1 font-medium">{item.product.name}</p>
                  <p className="text-muted">× {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border/60 pt-4">
            <div className="flex justify-between">
              <span className="font-medium">Разом</span>
              <span className="font-serif text-2xl">{formatPrice(total())}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Доставка оплачується окремо</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin text-muted" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
