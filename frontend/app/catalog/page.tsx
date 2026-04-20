"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts, type ApiProduct } from "@/lib/api";
import { ProductCard } from "@/components/ui/ProductCard";

const categories = [
  { value: "", label: "Всі" },
  { value: "shampoo", label: "Шампуні" },
  { value: "mask", label: "Маски" },
  { value: "gel", label: "Гелі" },
  { value: "other", label: "Інше" },
];

export default function CatalogPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === ""
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-muted">
          Каталог
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Всі товари</h1>
      </motion.div>

      {/* Category filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-full px-4 py-2 text-sm transition-all ${
              activeCategory === cat.value
                ? "bg-foreground text-background"
                : "border border-border hover:border-foreground/40"
            }`}
          >
            {cat.label}
            {cat.value === "" && products.length > 0 && (
              <span className="ml-1.5 text-xs opacity-60">
                {products.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {loading ? (
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-2xl bg-border/40"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-20 text-center">
          <p className="font-serif text-2xl text-muted">Товарів не знайдено</p>
          <p className="mt-2 text-sm text-muted">
            Спробуйте обрати іншу категорію
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
