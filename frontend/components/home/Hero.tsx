"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set up scroll animations for the dynamic "dissolve" effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={containerRef}
      className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-12 md:py-20 lg:py-24"
    >
      <motion.div 
        style={{ opacity, scale, y }}
        className="relative flex flex-row overflow-hidden rounded-3xl md:rounded-[2rem] bg-surface shadow-2xl shadow-foreground/5 border border-border/50 min-h-[320px] md:min-h-[600px]"
      >
        
        {/* Left side: Expert Photo */}
        <div className="w-[43%] md:w-1/2 relative shrink-0 overflow-hidden">
          <Image 
            src="/expert.png" 
            alt="Юлія Данільченко" 
            fill
            priority
            sizes="(max-width: 640px) 43vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        {/* Right side: Text details */}
        <div className="w-[57%] md:w-1/2 p-4 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center bg-surface relative z-10 shrink-0">
          <h2 className="mb-1 text-[9px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest text-muted">
            Ваш експерт
          </h2>
          
          <h1 className="font-serif text-xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground">
            Юлія Данільченко
          </h1>
          
          <p className="mt-1 md:mt-3 text-[10px] sm:text-base md:text-lg font-medium text-accent">
            Перукар-колорист
          </p>

          <p className="mt-3 md:mt-8 text-[11px] sm:text-sm md:text-base leading-relaxed text-muted max-w-md">
            Професійний догляд, фарбування та індивідуальні консультації. Обирайте найкраще для свого волосся разом з експертом.
          </p>

          <div className="mt-4 md:mt-10 flex flex-col xl:flex-row gap-2 sm:gap-4 w-full xl:w-auto">
            <a 
              href="/catalog" 
              className="flex items-center justify-center rounded-full bg-accent px-3 py-2 sm:px-8 sm:py-3.5 text-[10px] sm:text-sm font-medium text-white shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Перейти до каталогу
            </a>
            <a 
              href="https://t.me/MaibaOV" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center rounded-full border border-border px-3 py-2 sm:px-8 sm:py-3.5 text-[10px] sm:text-sm font-medium text-foreground transition-colors hover:bg-muted/10 hover:border-accent/40 text-center"
            >
              Консультація
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
