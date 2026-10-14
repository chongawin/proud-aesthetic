"use client";

import { useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";

type BeforeAfterSliderProps = {
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
  beforePlaceholder: string;
  afterPlaceholder: string;
  beforeImage?: string;
  afterImage?: string;
};

export default function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  sliderLabel,
  beforePlaceholder,
  afterPlaceholder,
  beforeImage,
  afterImage,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const gesture = useRef<{
    startX: number;
    startY: number;
    horizontal: boolean;
  } | null>(null);

  const updatePosition = (clientX: number, element: HTMLDivElement) => {
    const bounds = element.getBoundingClientRect();
    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(95, Math.max(5, nextPosition)));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLInputElement) return;
    gesture.current = {
      startX: event.clientX,
      startY: event.clientY,
      horizontal: event.pointerType === "mouse",
    };

    if (event.pointerType === "mouse") {
      updatePosition(event.clientX, event.currentTarget);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeGesture = gesture.current;
    if (!activeGesture) return;

    const deltaX = event.clientX - activeGesture.startX;
    const deltaY = event.clientY - activeGesture.startY;
    if (!activeGesture.horizontal) {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 6) return;
      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        gesture.current = null;
        return;
      }
      activeGesture.horizontal = true;
    }

    updatePosition(event.clientX, event.currentTarget);
  };

  const finishPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeGesture = gesture.current;
    if (activeGesture && !activeGesture.horizontal) {
      const deltaX = event.clientX - activeGesture.startX;
      const deltaY = event.clientY - activeGesture.startY;
      if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) {
        updatePosition(event.clientX, event.currentTarget);
      }
    }
    gesture.current = null;
  };

  return (
    <div
      className="relative aspect-[1.6] w-full select-none overflow-hidden bg-neutral-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-neutral-600"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={() => {
        gesture.current = null;
      }}
      style={{ touchAction: "pan-y" }}
    >
      <div
        className={`absolute inset-0 ${beforeImage ? "bg-cover bg-center" : "bg-neutral-200"}`}
        style={beforeImage ? { backgroundImage: `url("${beforeImage}")` } : undefined}
      />
      {!beforeImage && (
        <span className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xs text-neutral-500">
          {beforePlaceholder}
        </span>
      )}

      <div
        className={`absolute inset-0 ${afterImage ? "bg-cover bg-center" : "bg-neutral-100"}`}
        style={{
          clipPath: `inset(0 0 0 ${position}%)`,
          ...(afterImage ? { backgroundImage: `url("${afterImage}")` } : {}),
        }}
      />
      {!afterImage && (
        <span
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xs text-neutral-500"
          style={{ left: `${position + (100 - position) / 2}%` }}
        >
          {afterPlaceholder}
        </span>
      )}

      <span className="absolute left-3 top-3 bg-white/85 px-2 py-1 text-[10px] uppercase tracking-wide text-neutral-700">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 bg-white/85 px-2 py-1 text-[10px] uppercase tracking-wide text-neutral-700">
        {afterLabel}
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 top-0 w-px bg-white shadow-[0_0_3px_rgba(0,0,0,0.45)]"
        style={{ left: `${position}%` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow"
        style={{ left: `${position}%` }}
      >
        <ArrowRightIcon className="h-4 w-4 text-neutral-600" />
      </div>

      <input
        aria-label={sliderLabel}
        className="before-after-range pointer-events-none absolute inset-0 h-full w-full focus-visible:outline-none"
        type="range"
        min="5"
        max="95"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  );
}