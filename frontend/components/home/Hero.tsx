"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

const TEXT1 =
  "Це синергія науки та мистецтва в догляді за волоссям. Український бренд створює продукти за трирівневою архітектурою, що працюють на зміцнення структури, підтримку ліпідного шару та захист поверхні волосся.";

const CHAR_DELAY = 0.01;
const TITLE_DELAY = 0.1;
const TEXT1_DELAY = TITLE_DELAY + 0.4;
const BUTTONS_DELAY = TEXT1_DELAY + TEXT1.length * CHAR_DELAY + 0.2;

const charVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

function TypewriterText({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: CHAR_DELAY, delayChildren: delay } },
  };
  return (
    <motion.p className={className} variants={variants} initial="hidden" animate="visible">
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const buttonsVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: BUTTONS_DELAY } },
  };

  return (
    <section
      ref={containerRef}
      className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-12 md:py-20 lg:py-24"
    >
      <motion.div
        style={{ opacity, scale }}
        className="relative flex flex-row overflow-hidden rounded-3xl md:rounded-[2rem] bg-surface shadow-2xl shadow-foreground/5 border border-border/50 min-h-[320px] md:min-h-[600px]"
      >
        {/* Left: Text Content */}
        <div className="w-1/2 p-4 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center bg-[#f7f1fb] relative z-10 gap-3 md:gap-5">

          {/* Brand title */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight font-normal text-accent"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: TITLE_DELAY }}
          >
            Na Gólov[y]
          </motion.h1>

          {/* Typewriter paragraphs */}
          <TypewriterText
            text={TEXT1}
            delay={TEXT1_DELAY}
            className="text-[11px] sm:text-sm md:text-base leading-relaxed text-foreground/70"
          />
          {/* Buttons */}
          <motion.div
            className="mt-2 md:mt-4 flex flex-col xl:flex-row gap-2 sm:gap-3 w-full xl:w-auto"
            variants={buttonsVariants}
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
