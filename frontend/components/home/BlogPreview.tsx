"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

const PLACEHOLDER_POSTS = [
  {
    id: 1,
    title: "5 міфів про догляд за волоссям взимку",
    excerpt: "Дізнайтесь, чому не варто боятись холодів і як правильно захистити своє волосся від перепадів температур.",
    date: "14 Грудня 2026",
    category: "Поради",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  },
  {
    id: 2,
    title: "Як обрати правильний шампунь для вашого типу шкіри голови",
    excerpt: "Більшість людей обирає шампунь за запахом або позначкою 'для нормального волосся'. Чому це велика помилка?",
    date: "02 Листопада 2026",
    category: "Вибір засобів",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
  },
  {
    id: 3,
    title: "Що таке пілінг для шкіри голови і кому він потрібен",
    excerpt: "Очищення шкіри голови — це фундамент здорового волосся. Розповідаємо, як працює пілінг.",
    date: "18 Жовтня 2026",
    category: "Процедури",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
  },
];

export function BlogPreview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-8 pb-16 sm:px-8 sm:pt-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col gap-4 text-center sm:text-left"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Корисне
          </span>
          <h2 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Блог експерта
          </h2>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEHOLDER_POSTS.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-background transition-shadow hover:shadow-xl hover:shadow-foreground/5"
          >
            <Link href="/blog" className="flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center justify-between text-xs font-medium text-muted">
                  <span className="rounded-full bg-surface px-2.5 py-1">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="mb-2 font-serif text-xl leading-snug text-foreground group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12 sm:mt-16 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <LinkButton href="/blog" variant="outline">
          Читати всі статті →
        </LinkButton>
      </motion.div>
    </section>
  );
}
