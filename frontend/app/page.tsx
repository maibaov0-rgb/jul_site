"use client";

import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BlogPreview } from "@/components/home/BlogPreview";

export default function Home() {
  return (
    <>
      <div className="bg-background">
        <Hero />
      </div>

      <div className="bg-[#f7f1fb]">
        <FeaturedProducts />
      </div>

      <div className="bg-background">
        <BlogPreview />
      </div>
    </>
  );
}
