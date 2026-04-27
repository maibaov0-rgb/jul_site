"use client";

import { useState, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminUploadImage, adminCreateProduct, adminUpdateProduct, type ApiProduct } from "@/lib/api";

const MAX_IMAGES = 6;

const categories = [
  { value: "shampoo", label: "Шампунь" },
  { value: "conditioner", label: "Кондиціонер" },
  { value: "mask", label: "Маска" },
  { value: "leave-in", label: "Незмивний догляд" },
  { value: "peeling-shampoo", label: "Пілінг шампуні" },
  { value: "emotions", label: 'Лінійка "Емоції"' },
];


function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[а-яіїєьъ]/g, (c) =>
      "абвгдеєжзиіїйклмнопрстуфхцчшщьъыэюяё".split("").reduce((acc, letter, i) => {
        const translit = "abvgdeyezhziijklmnoprstufhtschshshyyyuya".split("")[i];
        return c === letter ? acc + (translit ?? c) : acc;
      }, ""),
    )
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getAdminPassword() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)admin_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

type Props = {
  product?: ApiProduct;
  password?: string;
};

export function ProductForm({ product }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    category: product?.category ?? "shampoo",
    volume: product?.volume ?? "",
    ph: product?.ph ?? "",
    featured: product?.featured ?? false,
    imageUrls: product?.imageUrls ?? [] as string[],
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleNameChange(name: string) {
    setForm((f) => ({ ...f, name, slug: f.slug || toSlug(name) }));
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (form.imageUrls.length >= MAX_IMAGES) return;

    setUploading(true);
    setError("");
    try {
      const { url } = await adminUploadImage(getAdminPassword(), file);
      setForm((f) => ({ ...f, imageUrls: [...f.imageUrls, url] }));
    } catch {
      setError("Помилка завантаження фото");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    setForm((f) => ({ ...f, imageUrls: f.imageUrls.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const data = {
      name: form.name,
      slug: form.slug || toSlug(form.name),
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      volume: form.volume,
      ph: form.ph,
      featured: form.featured,
      imageUrls: form.imageUrls,
    };

    try {
      const currentPassword = getAdminPassword();
      if (product) {
        await adminUpdateProduct(currentPassword, product.id, data);
      } else {
        await adminCreateProduct(currentPassword, data);
      }
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка збереження");
    } finally {
      setSaving(false);
    }
  }

  const canAddMore = form.imageUrls.length < MAX_IMAGES;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Photo upload */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Фото товару
          <span className="ml-2 text-xs font-normal text-muted">
            {form.imageUrls.length}/{MAX_IMAGES}
          </span>
        </label>

        {/* Thumbnails grid */}
        {form.imageUrls.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {form.imageUrls.map((url, i) => (
              <div key={url} className="relative h-20 w-20 overflow-hidden rounded-xl border border-border/60">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white text-xs hover:bg-black/80"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add button */}
        <div
          className={`relative flex h-20 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-colors ${
            canAddMore
              ? "border-border/60 hover:border-foreground/30 hover:bg-background"
              : "cursor-not-allowed border-border/30 opacity-40"
          }`}
          onClick={() => canAddMore && fileRef.current?.click()}
        >
          {uploading ? (
            <span className="text-sm text-muted">Завантаження...</span>
          ) : (
            <>
              <span className="text-xl text-muted">📷</span>
              <span className="text-sm text-muted">
                {canAddMore ? "Додати фото" : "Досягнуто ліміт фото"}
              </span>
            </>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={!canAddMore}
        />
      </div>

      {/* Name */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">
            Назва <span className="text-red-400">*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:border-foreground/40 focus:outline-none"
            placeholder="Наприклад: Шампунь Revital"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug (URL-ім'я)</label>
          <input
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:border-foreground/40 focus:outline-none font-mono"
            placeholder="revital-shampoo"
          />
        </div>
      </div>

      {/* Category + Price */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">
            Категорія <span className="text-red-400">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:border-foreground/40 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Ціна (грн) <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:border-foreground/40 focus:outline-none"
            placeholder="680"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Об'єм (напр. 500 мл)</label>
          <input
            value={form.volume}
            onChange={(e) => setForm((f) => ({ ...f, volume: e.target.value }))}
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:border-foreground/40 focus:outline-none"
            placeholder="500 мл"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">pH (напр. 3,5-4,5)</label>
          <input
            value={form.ph}
            onChange={(e) => setForm((f) => ({ ...f, ph: e.target.value }))}
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:border-foreground/40 focus:outline-none"
            placeholder="3,5-4,5"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Опис</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={4}
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:border-foreground/40 focus:outline-none resize-none"
          placeholder="Детальний опис товару..."
        />
      </div>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
          className="h-4 w-4 rounded border-border"
        />
        <span className="text-sm">Показувати на головній (популярний товар)</span>
      </label>

      {error && (
        <p className="text-sm text-red-500" role="alert">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-foreground px-6 py-2.5 text-sm text-background transition-opacity disabled:opacity-60"
        >
          {saving ? "Збереження..." : product ? "Зберегти зміни" : "Додати товар"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-border px-6 py-2.5 text-sm hover:border-foreground/40"
        >
          Скасувати
        </button>
      </div>
    </form>
  );
}
