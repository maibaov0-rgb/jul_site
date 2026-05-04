"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

const TEXT =
  "Професійний догляд, фарбування та індивідуальні консультації. Обирайте найкраще для свого волосся разом з експертом.";

const charVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const textContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.018,
        delayChildren: 0.1,
      },
    },
  };

  const buttonsContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: TEXT.length * 0.018 + 0.1,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-12 md:py-20 lg:py-24"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="relative flex flex-row overflow-hidden rounded-3xl md:rounded-[2rem] bg-surface shadow-2xl shadow-foreground/5 border border-border/50 min-h-[320px] md:min-h-[600px]"
      >
        {/* Left: Text Content */}
        <div className="w-1/2 p-4 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center bg-[#f7f1fb] relative z-10">

          {/* Typewriter text */}
          <motion.p
            className="text-[11px] sm:text-sm md:text-base leading-relaxed text-foreground/70 max-w-md"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {TEXT.split("").map((char, i) => (
              <motion.span key={i} variants={charVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>

          {/* Buttons — appear after text finishes */}
          <motion.div
            className="mt-4 md:mt-10 flex flex-col xl:flex-row gap-2 sm:gap-3 w-full xl:w-auto"
            variants={buttonsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href="/catalog"
              variants={buttonVariants}
              className="flex items-center justify-center rounded-full bg-accent px-3 py-2 sm:px-8 sm:py-3.5 text-[10px] sm:text-sm font-medium text-white shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Перейти до каталогу
            </motion.a>
            <motion.a
              href="https://t.me/danilchenko_julia"
              target="_blank"
              rel="noreferrer"
              variants={buttonVariants}
              className="flex items-center justify-center rounded-full border border-border px-3 py-2 sm:px-8 sm:py-3.5 text-[10px] sm:text-sm font-medium text-foreground transition-colors hover:bg-muted/10 hover:border-accent/40 text-center"
            >
              Консультація
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Video with clip-path reveal */}
        <motion.div
          className="w-1/2 min-h-full relative overflow-hidden"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-surface/30 via-transparent to-transparent md:block hidden" />
        </motion.div>
      </motion.div>
    </section>
  );
}
