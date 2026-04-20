import React from "react";

export const metadata = {
  title: "Блог | Косметика від Юлії Данільченко",
  description: "Корисні статті та поради щодо здоров'я волосся та шкіри від експерта.",
};

export default function BlogPage() {
  return (
    <div className="section-white pb-32 pt-20 sm:pt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center text-foreground">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-muted mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Статті
        </span>
        
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl mb-12">
          Блог
        </h1>
        
        <div className="space-y-6 text-left text-muted leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
          <p>
            Вітаємо на сторінці нашого блогу. Цей розділ наразі знаходиться в розробці.
          </p>
          <p>
            Незабаром тут з'являться корисні статті, поради щодо правильного догляду за волоссям і шкірою, а також огляди інгредієнтів від нашого експерта Юлії Данільченко. Залишайтесь з нами!
          </p>
        </div>
      </div>
    </div>
  );
}
