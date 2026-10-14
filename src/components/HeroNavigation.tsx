"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { MenuIcon } from "@/components/icons";

export default function HeroNavigation() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-none md:max-w-107.5">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-black/50 via-black/20 to-transparent"
      />
      <header className="pointer-events-auto absolute inset-x-6 top-6 flex items-center justify-between text-white">
        <Link
          href={`/${locale}`}
          aria-label={t("home")}
          className="font-sans text-xl tracking-[0.12em]"
        >
          PROUD
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale === "en" ? "th" : "en"}`}
            aria-label={t("switchLanguage")}
            className="font-sans text-xs"
          >
            {locale.toUpperCase()}
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? t("closeMenu") : t("menu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-8 w-8 items-center justify-center"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="pointer-events-auto absolute right-6 top-16 z-10 flex min-w-28 flex-col gap-3 rounded-sm bg-black/60 p-4 font-sans text-sm text-white backdrop-blur-sm">
          <Link href="/en" onClick={() => setMenuOpen(false)}>
            English
          </Link>
          <Link href="/th" onClick={() => setMenuOpen(false)}>
            ไทย
          </Link>
        </nav>
      )}
    </div>
  );
}