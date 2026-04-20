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
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">

        {/* Photo — on top for mobile, left for desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-first md:order-none"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-gold/25 via-surface to-accent/25 shadow-xl md:max-w-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-[6rem] italic leading-none text-foreground/20 sm:text-[8rem]">
                ЮД
              </span>
            </div>
          </div>

          {/* Quote card — shown on sm+, positioned outside on md+ */}
          <div className="mt-4 rounded-2xl border border-border/60 bg-background/95 p-4 text-sm sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 sm:w-48 sm:shadow-lg sm:backdrop-blur-sm">
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
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Юлія Данільченко
          </h2>
          <p className="mt-1.5 text-sm uppercase tracking-wider text-accent">
            Косметолог · Трихолог
          </p>

          <div className="mt-6 space-y-3 text-base leading-relaxed text-muted sm:mt-8">
            <p>
              Понад десять років допомагаю жінкам повертати здоров&apos;я та
              красу волосся. У практиці поєдную професійні знання з ретельним
              добором продуктів, яким можна довіряти.
            </p>
            <p>
              Кожен засіб у цьому каталозі — особисто протестований, з
              розумінням того, як саме він працює на різних типах волосся.
            </p>
          </div>

          {/* Stats */}
          <dl className="mt-8 grid grid-cols-3 gap-2 border-y border-border/60 py-5 sm:mt-10 sm:gap-4 sm:py-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-2xl text-foreground sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <LinkButton href="#contacts" variant="primary" className="w-full sm:w-auto">
              Отримати консультацію
            </LinkButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
