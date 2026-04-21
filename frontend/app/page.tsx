"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/home/Hero";
import { BrandPhilosophy } from "@/components/home/BrandPhilosophy";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BlogPreview } from "@/components/home/BlogPreview";

export default function Home() {
  return (
    <>
      {/* overflow-hidden clips off-screen content so browser doesn't paint it */}
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: -600, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="bg-background">
            <Hero />
          </div>
          <BrandPhilosophy />
        </motion.div>
      </div>

      <div className="bg-background">
        <FeaturedProducts />
      </div>

      <div className="bg-background">
        <BlogPreview />
      </div>
    </>
  );
}
