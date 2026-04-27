"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getProducts, type ApiProduct } from "@/lib/api";
import { useCartStore } from "@/lib/store";
import Link from "next/link";

const categoryLabels: Record<string, string> = {
  shampoo: "Шампунь",
  conditioner: "Кондиціонер",
  mask: "Маска",
  "leave-in": "Незмивні засоби",
  "peeling-shampoo": "Пілінг шампунь",
  emotions: "Емоції",
};

function formatVolume(volume: string) {
  const t = volume.trim();
  return /мл$/i.test(t) || /ml$/i.test(t) ? t.replace(/мл$/i, "мл").replace(/ml$/i, "мл") : `${t} мл`;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    getProducts()
      .then((products) => {
        const found = products.find((p) => p.slug === slug) ?? null;
        setProduct(found);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  function handleAddToCart() {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-border/40" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-border/40" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-border/40" />
            <div className="h-24 animate-pulse rounded bg-border/40" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8">
        <h1 className="font-serif text-3xl">Товар не знайдено</h1>
        <Link href="/catalog" className="mt-6 inline-block text-sm underline hover:text-accent">
          ← Повернутись до каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="hover:text-foreground">Головна</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-foreground">Каталог</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        {/* Image gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-accent/20 via-surface to-gold/15 aspect-square">
            {product.imageUrls[activeImage] ? (
              <img
                src={product.imageUrls[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-serif text-[8rem] text-foreground/15">
                  {product.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.imageUrls.length > 1 && (
            <div className="flex gap-2">
              {product.imageUrls.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImage === i ? "border-foreground" : "border-border/60"
                  }`}
                >
                  <img src={url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col"
        >
          <span className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs uppercase tracking-wider text-muted w-fit">
            {categoryLabels[product.category] ?? product.category}
          </span>

          <h1 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
            {product.name}
          </h1>

          {product.ph && (
            <div className="mt-2 text-sm tracking-wide text-foreground/70">
              pH {product.ph}
            </div>
          )}
          {product.volume && (
            <div className="mt-1 text-sm tracking-wide text-foreground/70">
              Об&apos;єм: {formatVolume(product.volume)}
            </div>
          )}

          <div className="mt-5 font-serif text-4xl text-foreground">
            {formatPrice(product.price)}
          </div>

          {product.description && (
            <p className="mt-6 leading-relaxed text-foreground">
              {product.description}
            </p>
          )}

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full rounded-full py-4 text-sm font-medium transition-all ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-accent text-white hover:bg-accent/90"
              }`}
            >
              {added ? "✓ Додано до кошика" : "В кошик"}
            </button>
            <Link
              href="/cart"
              className="flex w-full items-center justify-center rounded-full border border-border py-4 text-sm transition-colors hover:border-foreground/40"
            >
              Перейти до кошика
            </Link>
          </div>

          <div className="mt-8 border-t border-border/60 pt-6 space-y-2 text-sm text-foreground">
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Доставка Новою Поштою
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Відправка після повної оплати на IBAN
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Консультація від Юлії Данільченко
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
