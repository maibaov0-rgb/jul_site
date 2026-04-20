export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  volume?: string;
  imageUrls: string[];
  featured?: boolean;
  slug: string;
}
