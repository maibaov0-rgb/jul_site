"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ApiProduct } from "@/lib/api";
import { useCartStore } from "@/lib/store";

const categoryLabels: Record<string, string> = {
  shampoo: "Шампунь",
  conditioner: "Кондиціонер",
  mask: "Маска",
  "leave-in": "Незмивний догляд",
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

export function ProductCard({ product }: { product: ApiProduct }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-gradient-to-br from-accent/20 via-background to-gold/15"
        aria-label={product.name}
      >
        {product.imageUrls?.[0] ? (
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-5xl text-foreground/15 transition-transform duration-500 group-hover:scale-110 sm:text-6xl lg:text-7xl">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-background/85 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
          {categoryLabels[product.category] ?? product.category}
        </span>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-tight text-foreground sm:text-base line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2 sm:pt-3">
          <div className="flex flex-col">
            {product.ph && (
              <span className="text-[10px] text-foreground/70 tracking-wide">
                pH {product.ph}
              </span>
            )}
            {product.volume && (
              <span className="text-[10px] text-foreground/70 tracking-wide">
                {formatVolume(product.volume)}
              </span>
            )}
            <span className="text-sm font-bold text-foreground sm:text-base">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`shrink-0 whitespace-nowrap min-h-[44px] rounded-full px-3 py-2 text-xs transition-all sm:px-4 sm:text-sm ${
              added
                ? "bg-green-600 text-white"
                : "bg-accent text-white hover:scale-[1.03] hover:bg-accent/90 active:scale-[0.97]"
            }`}
          >
            {added ? "✓ Додано" : "В кошик"}
          </button>
        </div>
      </div>
    </article>
  );
}
