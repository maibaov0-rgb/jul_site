"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { adminGetProducts, adminDeleteProduct, type ApiProduct } from "@/lib/api";

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  const password =
    typeof window !== "undefined"
      ? document.cookie.match(/(?:^|;\s*)admin_token=([^;]+)/)?.[1] ?? ""
      : "";

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminGetProducts(password);
      setProducts(data);
    } catch {
      setError("Не вдалось завантажити товари");
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Видалити "${name}"?`)) return;
    setDeleting(id);
    try {
      await adminDeleteProduct(password, id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Помилка при видаленні");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-3xl">Товари</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-opacity hover:opacity-80"
        >
          + Додати товар
        </Link>
      </div>

      {loading && (
        <div className="py-12 text-center text-muted">Завантаження...</div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted">Товарів поки немає.</p>
          <Link
            href="/admin/products/new"
            className="mt-4 inline-block text-sm underline hover:text-accent"
          >
            Додати перший товар
          </Link>
        </div>
      )}

      {products.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-background/60">
              <tr>
                <th className="py-3 pl-4 text-left font-medium text-muted">Фото</th>
                <th className="py-3 text-left font-medium text-muted">Назва</th>
                <th className="py-3 text-left font-medium text-muted hidden sm:table-cell">
                  Категорія
                </th>
                <th className="py-3 text-right font-medium text-muted">Ціна</th>
                <th className="py-3 pr-4 text-right font-medium text-muted">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-background/40">
                  <td className="py-3 pl-4">
                    <div className="h-10 w-10 overflow-hidden rounded-lg border border-border/60 bg-gradient-to-br from-accent/20 to-gold/15">
                      {product.imageUrls[0] ? (
                        <img
                          src={product.imageUrls[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-serif text-sm text-foreground/20">
                          {product.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted">{product.slug}</div>
                  </td>
                  <td className="py-3 hidden sm:table-cell">
                    <span className="rounded-full bg-background px-2.5 py-0.5 text-xs text-muted">
                      {categoryLabels[product.category] ?? product.category}
                    </span>
                  </td>
                  <td className="py-3 text-right font-serif">
                    {formatPrice(product.price)}
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="rounded-lg border border-border px-3 py-1 text-xs hover:border-foreground/30"
                      >
                        Редагувати
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deleting === product.id}
                        className="rounded-lg border border-red-200 px-3 py-1 text-xs text-red-500 hover:bg-red-50 disabled:opacity-50"
                      >
                        {deleting === product.id ? "..." : "Видалити"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
