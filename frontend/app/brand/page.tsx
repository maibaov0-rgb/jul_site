import React from "react";

export const metadata = {
  title: "Про бренд | Косметика від Юлії Данільченко",
  description: "Дізнайтесь більше про нашу філософію та професійну косметику, яку обирає експерт.",
};

export default function BrandPage() {
  return (
    <div className="section-white pb-32 pt-20 sm:pt-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center text-foreground">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-muted mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Філософія
        </span>
        
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl mb-12">
          Про бренд
        </h1>
        
        <div className="space-y-6 text-left text-muted leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
          <p>
            Вітаємо на сторінці нашого бренду. Цей розділ наразі знаходиться в розробці.
          </p>
          <p>
            Незабаром тут з'явиться детальна інформація про нашу філософію, підхід до вибору інгредієнтів та цінності, якими ми керуємося при створенні нашої косметики. Ми прагнемо запропонувати вам лише найкращі, перевірені експертами формули для догляду за вашою шкірою та волоссям.
          </p>
        </div>
      </div>
    </div>
  );
}
