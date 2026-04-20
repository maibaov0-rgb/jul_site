"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminGetProducts, type ApiProduct } from "@/lib/api";
import { ProductForm } from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)admin_token=([^;]+)/);
    const pwd = match?.[1] ?? "";
    setPassword(pwd);

    adminGetProducts(pwd)
      .then((products) => {
        const found = products.find((p) => p.id === Number(id));
        setProduct(found ?? null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-12 text-center text-muted">Завантаження...</div>;
  if (!product) return <div className="py-12 text-center text-muted">Товар не знайдено</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl">Редагування</h1>
        <p className="mt-1 text-sm text-muted">{product.name}</p>
      </div>
      <ProductForm product={product} password={password} />
    </div>
  );
}
