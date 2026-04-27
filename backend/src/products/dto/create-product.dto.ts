export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  volume?: string;
  ph?: string;
  imageUrls: string[];
  tags?: string[];
  featured?: boolean;
  slug: string;
}
