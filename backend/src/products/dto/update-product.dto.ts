export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  volume?: string;
  imageUrls?: string[];
  tags?: string[];
  featured?: boolean;
  slug?: string;
}
