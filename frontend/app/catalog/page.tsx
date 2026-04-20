"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts, type ApiProduct } from "@/lib/api";
import { ProductCard } from "@/components/ui/ProductCard";

const categories = [
  { value: "", label: "Всі" },
  { value: "shampoo", label: "Шампуні" },
  { value: "conditioner", label: "Кондиціонери" },
  { value: "mask", label: "Маски" },
  { value: "leave-in", label: "Незмивний догляд" },
  { value: "other", label: "Інше" },
];

const subtypes: Record<string, { value: string; label: string }[]> = {
  shampoo: [
    { value: "normal-scalp", label: "Нормальна шкіра" },
    { value: "dry-scalp", label: "Суха шкіра" },
    { value: "oily-scalp", label: "Жирна шкіра" },
    { value: "sensitive-scalp", label: "Чутлива шкіра" },
    { value: "peeling", label: "Пілінг" },
  ],
  "leave-in": [
    { value: "heat-spray", label: "Спреї термозахисти" },
    { value: "leave-in-cream", label: "Незмивні креми" },
    { value: "fluid-elixir", label: "Флюїди еліксири" },
  ],
};

export default function CatalogPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  function handleCategoryChange(value: string) {
    setActiveCategory(value);
    setActiveTags([]);
  }

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function clearAll() {
    setActiveCategory("");
    setActiveTags([]);
  }

  const currentSubtypes = activeCategory ? subtypes[activeCategory] ?? [] : [];

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "" || p.category === activeCategory;
    const matchesTags =
      activeTags.length === 0 ||
      activeTags.every((t) => (p.tags ?? []).includes(t));
    return matchesCategory && matchesTags;
  });

  const hasActiveFilters = activeCategory !== "" || activeTags.length > 0;

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

      {/* Filters */}
      <div className="mt-8 space-y-3">
        {/* Row 1: Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleCategoryChange(cat.value)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-all ${
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

        {/* Row 2: Subtypes — animate in/out */}
        <AnimatePresence>
          {currentSubtypes.length > 0 && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
                {currentSubtypes.map((sub) => {
                  const active = activeTags.includes(sub.value);
                  return (
                    <button
                      key={sub.value}
                      type="button"
                      onClick={() => toggleTag(sub.value)}
                      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-all ${
                        active
                          ? "bg-accent/15 text-accent border border-accent/40"
                          : "border border-border/60 text-muted hover:border-foreground/30 hover:text-foreground"
                      }`}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-xs text-muted">
                Знайдено: {filtered.length}
              </span>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-muted underline hover:text-foreground"
              >
                Очистити фільтри
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
            Спробуйте обрати інші фільтри
          </p>
        </div>
      ) : (
        <motion.div
          key={`${activeCategory}-${activeTags.join(",")}`}
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
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
        </motion.div>
      )}
    </div>
  );
}
