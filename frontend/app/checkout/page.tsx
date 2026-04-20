"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { createOrder } from "@/lib/api";

function formatPrice(price: number) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(price);
}

type Step = "form" | "success";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("form");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    city: "",
    branch: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const deliveryInfo = `${form.city}, відділення ${form.branch}`;
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
          className="mt-8 inline-flex h-12 items-center rounded-full bg-foreground px-8 text-sm text-background"
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
          <h1 className="mt-6 font-serif text-4xl">Дякуємо за замовлення!</h1>
          {orderId && (
            <p className="mt-2 text-muted">Замовлення №{orderId}</p>
          )}
          <p className="mt-6 leading-relaxed text-muted">
            Юлія звʼяжеться з вами найближчим часом для підтвердження.
          </p>

          <div className="mt-10 rounded-2xl border border-border/60 bg-surface p-6 text-left">
            <h2 className="font-serif text-xl">Оплата</h2>
            <p className="mt-3 text-sm text-muted">
              Оплатіть замовлення після отримання або переведіть на IBAN:
            </p>
            <div className="mt-3 rounded-xl bg-background px-4 py-3">
              <p className="font-mono text-sm font-medium">UA12 3456 7890 1234 5678 9012 3456</p>
              <p className="mt-1 text-xs text-muted">Данільченко Юлія Іванівна</p>
            </div>
            <p className="mt-3 text-xs text-muted">
              У призначенні платежу вкажіть ваше ім'я та номер замовлення.
            </p>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-foreground px-8 text-sm text-background transition-colors hover:bg-foreground/90"
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
                  placeholder="Іванenko Іван Іванович"
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
                <label htmlFor="city" className="mb-1.5 block text-sm font-medium">
                  Місто <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Київ"
                  value={form.city}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20"
                />
              </div>
              <div>
                <label htmlFor="branch" className="mb-1.5 block text-sm font-medium">
                  Відділення <span className="text-red-500">*</span>
                </label>
                <input
                  id="branch"
                  name="branch"
                  type="text"
                  required
                  placeholder="№ 12"
                  value={form.branch}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20"
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
            className="flex h-14 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-all hover:bg-foreground/90 disabled:opacity-60"
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
