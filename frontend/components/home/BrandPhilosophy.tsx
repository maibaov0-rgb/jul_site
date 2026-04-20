"use client";

import { motion } from "framer-motion";

export function BrandPhilosophy() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-8 font-serif text-3xl sm:text-4xl md:text-5xl text-accent">
            Na Gólov[y]
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted sm:text-xl">
            <p>
              Це синергія науки та мистецтва в догляді за волоссям. Український бренд створює продукти за трирівневою архітектурою, що працюють на зміцнення структури, підтримку ліпідного шару та захист поверхні волосся.
            </p>
            <p>
              Кожен засіб є частиною єдиної системи, а нішеві аромати дозволяють перетворити рутинний догляд на справжній ритуал самовираження.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <div className="h-px w-24 bg-accent/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
