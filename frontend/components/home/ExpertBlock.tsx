"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";

const stats = [
  { value: "10+", label: "років практики" },
  { value: "2000+", label: "клієнток" },
  { value: "50+", label: "протест. засобів" },
];

export function ExpertBlock() {
  return (
    <section
      id="expert"
      className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="grid items-center gap-4 sm:gap-14 grid-cols-2">
        {/* Photo — left for both desktop and mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border/60 bg-gradient-to-br from-accent/20 via-surface to-accent/10 shadow-xl">
            <img 
              src="/expert.png" 
              alt="Юлія Данільченко" 
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Quote card — hidden on small mobile to save space */}
          <div className="mt-2 hidden sm:block rounded-2xl border border-border/60 bg-background/95 p-4 text-sm sm:absolute sm:-bottom-6 sm:-right-6 sm:w-48 sm:shadow-lg sm:backdrop-blur-sm">
            <p className="font-serif italic leading-relaxed text-foreground/80">
              «Красиве волосся — це не генетика, а системний догляд».
            </p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Ваш експерт
          </span>
          <h2 className="mt-2 font-serif text-xl sm:text-4xl md:text-5xl leading-tight">
            Юлія Данільченко
          </h2>
          <p className="mt-1 text-[10px] sm:text-sm uppercase tracking-wider text-accent">
            Косметолог · Трихолог
          </p>

          <div className="mt-4 sm:mt-8 space-y-2 sm:space-y-3 text-[11px] sm:text-base leading-relaxed text-muted">
            <p>
              Понад десять років допомагаю жінкам повертати здоров&apos;я та
              красу волосся.
            </p>
            <p className="hidden sm:block">
              Кожен засіб у цьому каталозі — особисто протестований, з
              розумінням того, як саме він працює на різних типах волосся.
            </p>
          </div>

          {/* Stats */}
          <dl className="mt-6 grid grid-cols-3 gap-1 sm:gap-4 border-y border-border/60 py-3 sm:mt-10 sm:py-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-sm sm:text-3xl text-foreground">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-[8px] sm:text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <LinkButton href="https://t.me/MaibaOV" variant="primary" className="w-full sm:w-auto text-[10px] sm:text-sm py-2 sm:py-3.5">
              Консультація
            </LinkButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
