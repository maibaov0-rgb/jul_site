"use client";

import { useState } from "react";
import Link from "next/link";
import type { ApiProduct } from "@/lib/api";
import { useCartStore } from "@/lib/store";

const categoryLabels: Record<string, string> = {
  shampoo: "Шампунь",
  mask: "Маска",
  gel: "Гель",
  other: "Інше",
};

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
      {/* ... (image area) */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-gradient-to-br from-accent/20 via-background to-gold/15"
        aria-label={product.name}
      >
        {product.imageUrls?.[0] ? (
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-5xl text-foreground/15 transition-transform duration-500 group-hover:scale-110 sm:text-6xl lg:text-7xl">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
        <span className="absolute left-2.5 top-2.5 rounded-full bg-background/85 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
          {categoryLabels[product.category] ?? product.category}
        </span>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-base leading-tight transition-colors group-hover:text-accent sm:text-xl line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-muted min-h-[2.5rem]">
          {product.description || "\u00A0"}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2 sm:pt-3">
          <div className="flex flex-col">
            {product.volume && (
              <span className="text-[10px] text-muted uppercase tracking-wide">
                {product.volume}
              </span>
            )}
            <span className="font-serif text-lg sm:text-2xl">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`min-h-[44px] rounded-full px-3 py-2 text-xs transition-all sm:px-4 sm:text-sm ${
              added
                ? "bg-green-600 text-white"
                : "bg-foreground text-background hover:scale-[1.03] hover:bg-foreground/90 active:scale-[0.97]"
            }`}
          >
            {added ? "✓ Додано" : "В кошик"}
          </button>
        </div>
      </div>
    </article>
  );
}
