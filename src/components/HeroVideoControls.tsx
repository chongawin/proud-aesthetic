"use client";

import { useTranslations } from "next-intl";
import { PlayIcon, ProfileIcon, SoundOffIcon, SoundOnIcon } from "@/components/icons";

type HeroVideoControlsProps = {
  muted: boolean;
  blocked: boolean;
  onToggleSound: () => void;
  onPlay: () => void;
};

export default function HeroVideoControls({
  muted,
  blocked,
  onToggleSound,
  onPlay,
}: HeroVideoControlsProps) {
  const t = useTranslations("Hero");

  return (
    <>
      <button
        aria-label={t("profile")}
        className="absolute bottom-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
      >
        <ProfileIcon />
      </button>

      <button
        onClick={onToggleSound}
        aria-label={muted ? t("soundOn") : t("soundOff")}
        className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
      >
        {muted ? <SoundOffIcon /> : <SoundOnIcon />}
      </button>

      {blocked && (
        <button
          type="button"
          onClick={onPlay}
          aria-label={t("play")}
          className="absolute inset-0 z-20 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/80 text-white"
        >
          <PlayIcon className="h-8 w-8" />
        </button>
      )}
    </>
  );
}