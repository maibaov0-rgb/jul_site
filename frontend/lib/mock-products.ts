export type Category = "shampoo" | "mask" | "gel" | "other";

export const categoryLabels: Record<Category, string> = {
  shampoo: "Шампуні",
  mask: "Маски",
  gel: "Гелі",
  other: "Інше",
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrls: string[];
  featured?: boolean;
};

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "revital-shampoo",
    name: "Відновлюючий шампунь Revital",
    description:
      "Делікатне очищення та глибоке живлення для пошкодженого волосся. З олією аргани та кератином.",
    price: 680,
    category: "shampoo",
    imageUrls: ["/products/shampoo-1.svg"],
    featured: true,
  },
  {
    id: "2",
    slug: "silk-mask",
    name: "Маска Silk Therapy",
    description:
      "Інтенсивна маска для блиску та м'якості. Повертає волоссю шовкову структуру вже після першого застосування.",
    price: 920,
    category: "mask",
    imageUrls: ["/products/mask-1.svg"],
    featured: true,
  },
  {
    id: "3",
    slug: "style-gel",
    name: "Гель для стайлінгу Shape",
    description:
      "Легка фіксація без ефекту склеювання. Підходить для щоденного укладання будь-якого типу волосся.",
    price: 540,
    category: "gel",
    imageUrls: ["/products/gel-1.svg"],
    featured: true,
  },
  {
    id: "4",
    slug: "scalp-serum",
    name: "Сироватка для шкіри голови",
    description:
      "Зміцнює корені та зменшує випадіння волосся. Курсовий догляд на 30 днів.",
    price: 1180,
    category: "other",
    imageUrls: ["/products/serum-1.svg"],
    featured: true,
  },
  {
    id: "5",
    slug: "color-shampoo",
    name: "Шампунь для фарбованого волосся",
    description:
      "Зберігає яскравість кольору до 8 тижнів. Без сульфатів та парабенів.",
    price: 720,
    category: "shampoo",
    imageUrls: ["/products/shampoo-2.svg"],
  },
  {
    id: "6",
    slug: "keratin-mask",
    name: "Маска з кератином Pro",
    description:
      "Салонний ефект вдома. Реконструкція структури волосся за 10 хвилин.",
    price: 1050,
    category: "mask",
    imageUrls: ["/products/mask-2.svg"],
  },
];

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.featured);
}
