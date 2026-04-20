"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Set up scroll animations for the dynamic "dissolve" effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale, y }}
      className="relative w-full max-w-6xl mx-auto px-4 py-8 sm:px-8 sm:py-16 md:py-24"
    >
      {/* Cohesive Block with sophisticated shadow */}
      <div className="relative flex flex-row overflow-hidden rounded-3xl md:rounded-[2rem] bg-surface shadow-2xl shadow-foreground/5 border border-border/50">
        
        {/* Left side: Expert Photo */}
        <div className="w-[45%] md:w-1/2 relative shrink-0">
          <img 
            src="/expert.png" 
            alt="Юлія Данільченко" 
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="%23f3f4f6"><rect width="100%" height="100%"/><text x="50%" y="50%" fill="%239ca3af" font-family="system-ui" font-size="20" text-anchor="middle" dy=".3em">Фото експерта</text></svg>';
            }}
          />
        </div>

        {/* Right side: Text details */}
        <div className="w-[55%] md:w-1/2 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface relative z-10 shrink-0">
          <h2 className="mb-2 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-widest text-muted">
            Ваш експерт
          </h2>
          
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground">
            Юлія Данільченко
          </h1>
          
          <p className="mt-2 md:mt-3 text-xs sm:text-base md:text-lg font-medium text-accent">
            Косметолог · Трихолог
          </p>

          <p className="mt-4 md:mt-8 text-[11px] sm:text-sm md:text-base leading-relaxed text-muted max-w-md">
            Професійна косметика та індивідуальні консультації. Обирайте найкраще для свого волосся та шкіри разом з експертом.
          </p>

          <div className="mt-6 md:mt-10 flex flex-col xl:flex-row gap-2 sm:gap-4 w-full xl:w-auto">
            <a 
              href="https://t.me/MaibaOV" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center rounded-full bg-foreground px-4 py-2 sm:px-8 sm:py-3.5 text-[10px] sm:text-xs md:text-sm font-medium text-background transition-opacity hover:opacity-85 text-center"
            >
              Консультація
            </a>
            <a 
              href="/catalog" 
              className="flex items-center justify-center rounded-full border border-border px-4 py-2 sm:px-8 sm:py-3.5 text-[10px] sm:text-xs md:text-sm font-medium transition-colors hover:bg-muted/10 hover:border-foreground/30 text-center"
            >
              Перейти до каталогу
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
