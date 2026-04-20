const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function adminFetch<T>(
  path: string,
  options: RequestInit = {},
  adminPassword: string,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': adminPassword,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export type ApiProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrls: string[];
  featured: boolean;
  slug: string;
  createdAt: string;
};

export async function getProducts(): Promise<ApiProduct[]> {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function adminGetProducts(password: string): Promise<ApiProduct[]> {
  return adminFetch('/admin/products', {}, password);
}

export async function adminCreateProduct(
  password: string,
  data: Omit<ApiProduct, 'id' | 'createdAt'>,
): Promise<ApiProduct> {
  return adminFetch('/admin/products', { method: 'POST', body: JSON.stringify(data) }, password);
}

export async function adminUpdateProduct(
  password: string,
  id: number,
  data: Partial<Omit<ApiProduct, 'id' | 'createdAt'>>,
): Promise<ApiProduct> {
  return adminFetch(
    `/admin/products/${id}`,
    { method: 'PATCH', body: JSON.stringify(data) },
    password,
  );
}

export async function adminDeleteProduct(password: string, id: number): Promise<void> {
  await adminFetch(`/admin/products/${id}`, { method: 'DELETE' }, password);
}

export type CreateOrderDto = {
  customerName: string;
  phone: string;
  deliveryInfo: string;
  products: Array<{ id: number; name: string; price: number; quantity: number }>;
  totalPrice: number;
};

export type ApiOrder = {
  id: number;
  customerName: string;
  phone: string;
  deliveryInfo: string;
  products: unknown;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export async function createOrder(data: CreateOrderDto): Promise<ApiOrder> {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function adminUploadImage(password: string, file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/admin/upload`, {
    method: 'POST',
    headers: { 'x-admin-password': password },
    body: formData,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return res.json();
}
