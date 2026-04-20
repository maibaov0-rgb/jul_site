import { Hero } from "@/components/home/Hero";
import { BrandPhilosophy } from "@/components/home/BrandPhilosophy";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BlogPreview } from "@/components/home/BlogPreview";

export default function Home() {
  return (
    <>
      <div className="bg-background">
        <Hero />
      </div>

      <BrandPhilosophy />

      <div className="bg-background">
        <FeaturedProducts />
      </div>

      <div className="bg-background">
        <BlogPreview />
      </div>
    </>
  );
}
