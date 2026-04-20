import Link from "next/link";

export function Footer() {
  return (
    <footer
      id="contacts"
      className="mt-24 border-t border-border/60 bg-surface/60"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl leading-none tracking-wide">
              Yulia
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Danilchenko
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Професійна косметика для волосся, дібрана та перевірена косметологом.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium tracking-wide uppercase text-muted">
            Навігація
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/catalog" className="hover:text-accent">
                Каталог
              </Link>
            </li>
            <li>
              <Link href="/brand" className="hover:text-accent">
                Про бренд
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-accent">
                Кошик
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium tracking-wide uppercase text-muted">
            Зв&apos;язок
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="https://www.instagram.com/juli_danilchenko/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent">
                Telegram
              </a>
            </li>
            <li>
              <a href="tel:+380000000000" className="hover:text-accent">
                +38 (000) 000-00-00
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:px-8">
          <span>© {new Date().getFullYear()} Юлія Данільченко</span>
          <span>Створено з турботою про ваше волосся</span>
        </div>
      </div>
    </footer>
  );
}
