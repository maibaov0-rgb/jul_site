"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";

function formatPrice(price: number) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8">
        <p className="font-serif text-4xl">Кошик порожній</p>
        <p className="mt-3 text-muted">Додайте товари з каталогу</p>
        <Link
          href="/catalog"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-8 text-sm text-white transition-colors hover:bg-accent/90"
        >
          До каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-serif text-4xl sm:text-5xl"
      >
        Кошик
      </motion.h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* Items list */}
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex gap-4 rounded-2xl border border-border/60 bg-surface p-4 sm:gap-6 sm:p-6"
            >
              {/* Image */}
              <Link
                href={`/product/${item.product.slug}`}
                className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-accent/20 via-background to-gold/15 sm:h-28 sm:w-28"
              >
                {item.product.imageUrls?.[0] ? (
                  <img
                    src={item.product.imageUrls[0]}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-serif text-3xl text-foreground/15">
                      {item.product.name.charAt(0)}
                    </span>
                  </div>
                )}
              </Link>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="text-lg font-semibold leading-snug text-foreground hover:text-accent sm:text-xl"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    type="button"
                    aria-label="Видалити"
                    onClick={() => removeItem(item.product.id)}
                    className="shrink-0 text-muted transition-colors hover:text-foreground"
                  >
                    <TrashIcon />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  {/* Quantity control */}
                  <div className="flex items-center gap-1 rounded-full border border-border">
                    <button
                      type="button"
                      aria-label="Зменшити кількість"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-foreground/5"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Збільшити кількість"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-foreground/5"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-xl font-bold text-foreground">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-fit rounded-2xl border border-border/60 bg-surface p-6 lg:sticky lg:top-24"
        >
          <h2 className="font-serif text-2xl">Підсумок</h2>

          <div className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-foreground">
                <span className="line-clamp-1 flex-1 pr-4">{item.product.name} × {item.quantity}</span>
                <span className="shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-border/60 pt-4">
            <div className="flex justify-between">
              <span className="font-medium">Разом</span>
              <span className="text-2xl font-bold text-foreground">{formatPrice(total())}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Без урахування доставки</p>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm text-white transition-colors hover:bg-accent/90"
          >
            Оформити замовлення
          </Link>

          <Link
            href="/catalog"
            className="mt-3 flex h-11 w-full items-center justify-center rounded-full border border-border text-sm transition-colors hover:border-foreground/40"
          >
            Продовжити покупки
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function TrashIcon() {
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
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
