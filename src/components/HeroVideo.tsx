"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const svgProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const SoundOnIcon = () => (
  <svg {...svgProps}>
    <path d="M11 5 6 9H3v6h3l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
);

const SoundOffIcon = () => (
  <svg {...svgProps}>
    <path d="M11 5 6 9H3v6h3l5 4V5z" />
    <path d="m16 9 5 6" />
    <path d="m21 9-5 6" />
  </svg>
);

const UserIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
  </svg>
);

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
    ref.current?.play().then(() => setBlocked(false));
  };

  return (
    <section className="relative h-svh w-full overflow-hidden bg-charcoal">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <div className="absolute inset-x-6 bottom-24 text-white">
        <h1 className="font-serif text-5xl uppercase leading-tight">{t("title")}</h1>
        <button className="mt-6 rounded-full border border-white px-6 py-2 text-sm">
          {t("cta")}
        </button>
      </div>

      <button
        aria-label={t("profile")}
        className="absolute bottom-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
      >
        <UserIcon />
      </button>
      
    <button
       className="absolute bottom-6 left-1/2 flex h-10 -translate-x-1/2 items-center justify-center rounded-full bg-black/30 px-5 text-xs tracking-wide text-white backdrop-blur-sm"
    >
       {t("fullVideo")}
     </button>

      <button
        onClick={toggleSound}
        aria-label={muted ? t("soundOn") : t("soundOff")}
        className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
      >
        {muted ? <SoundOffIcon /> : <SoundOnIcon />}
      </button>

      {blocked && (
        <button
          onClick={playManually}
          aria-label={t("play")}
          className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-black/50 text-2xl text-white"
        >
          ▶
        </button>
      )}
    </section>
  );
}