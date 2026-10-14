"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "@/components/icons";
import HeroNavigation from "./HeroNavigation";
import HeroVideoControls from "./HeroVideoControls";

export default function HeroVideo() {
  const t = useTranslations("Hero");
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // iOS ต้องให้ muted เป็น true จริงก่อนเรียก play()
    v.play().catch(() => setBlocked(true));
  }, []);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    v.volume = 1;
    v.play().catch(() => {});
    setMuted(v.muted);
  };

  const playManually = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
  };

  return (
    <section className="relative mx-auto h-svh w-full max-w-none bg-charcoal md:max-w-107.5">
      <video
        ref={ref}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setBlocked(false)}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

      <HeroNavigation />

      <div className="absolute inset-x-6 top-[44%] -translate-y-1/2 text-center text-white">
        <p className="font-serif text-4xl leading-none">Proud Aesthetic</p>
      </div>

      <div className="absolute inset-x-7 bottom-22 text-white">
        <h1 className="max-w-sm font-serif text-4xl uppercase leading-[1.08]">
          {t("title")}
        </h1>
        <p className="mt-3 max-w-xs font-sans text-sm leading-snug">
          {t("description")}
        </p>
        <button className="mt-5 inline-flex items-center gap-3 rounded-full border border-white px-6 py-2.5 text-base">
          {t("cta")}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>

      <HeroVideoControls
        muted={muted}
        blocked={blocked}
        onToggleSound={toggleSound}
        onPlay={playManually}
      />
    </section>
  );
}