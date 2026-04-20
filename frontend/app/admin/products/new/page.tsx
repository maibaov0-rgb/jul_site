"use client";

import { useEffect, useState } from "react";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  const [password, setPassword] = useState("");

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)admin_token=([^;]+)/);
    setPassword(match?.[1] ?? "");
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl">Новий товар</h1>
        <p className="mt-1 text-sm text-muted">
          Заповніть форму щоб додати товар до каталогу
        </p>
      </div>
      <ProductForm password={password} />
    </div>
  );
}
