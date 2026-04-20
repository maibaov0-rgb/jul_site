export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrls: string[];
  featured?: boolean;
  slug: string;
}
