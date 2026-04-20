"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { LinkButton } from "@/components/ui/Button";
import { getProducts, type ApiProduct } from "@/lib/api";

export function FeaturedProducts() {
  const [products, setProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    getProducts()
      .then((all) => {
        const featured = all.filter((p) => p.featured);
        setProducts(featured.length > 0 ? featured.slice(0, 4) : all.slice(0, 4));
      })
      .catch(() => setProducts([]));
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Бестселери
          </span>
          <h2 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Популярні товари
          </h2>
        </div>
        <LinkButton href="/catalog" variant="outline" className="self-start sm:self-auto">
          Увесь каталог →
        </LinkButton>
      </motion.div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: index * 0.07,
              ease: "easeOut",
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
