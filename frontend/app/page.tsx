import { Hero } from "@/components/home/Hero";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      <div className="bg-background">
        <Hero />
      </div>

      <div className="bg-background">
        <BlogPreview />
      </div>

      <div className="bg-background">
        <FeaturedProducts />
      </div>
    </>
  );
}
