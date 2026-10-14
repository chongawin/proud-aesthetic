"use client";

import { useTranslations } from "next-intl";
import BeforeAfterSlider from "./BeforeAfterSlider";

const veneerCases = [
  {
    id: "case-01",
    beforeImage: "/images/veneers/case-01-before.webp",
    afterImage: "/images/veneers/case-01-after.webp",
  },
  {
    id: "case-02",
    beforeImage: "/images/veneers/case-02-before.webp",
    afterImage: "/images/veneers/case-02-after.webp",
  },
];

export default function VeneersSection() {
  const t = useTranslations("Veneers");

  const sliderProps = {
    beforeLabel: t("before"),
    afterLabel: t("after"),
    sliderLabel: t("adjustComparison"),
    beforePlaceholder: t("beforePlaceholder"),
    afterPlaceholder: t("afterPlaceholder"),
  };

  return (
    <section className="mx-auto w-full max-w-none bg-white px-6 py-8 text-ink md:max-w-107.5">
      <header className="text-left">
        <h2 className="font-sans text-3xl leading-tight">{t("sectionTitle")}</h2>
        <p className="mt-2 font-sans text-xs leading-relaxed">{t("sectionDescription")}</p>
      </header>

      <div className="mt-8 text-center">
        <h3 className="font-sans text-2xl">{t("title")}</h3>
        <p className="mt-1 font-sans text-sm">{t("tagline")}</p>
        <p className="mx-auto mt-2 max-w-sm font-sans text-[10px] leading-relaxed text-neutral-500">
          {t("description")}
        </p>
      </div>

      <h4 className="mb-3 mt-7 text-center font-sans text-[11px] uppercase tracking-wide">
        {t("beforeAfterTitle")}
      </h4>
      <div className="space-y-4">
        {veneerCases.map((veneerCase) => (
          <BeforeAfterSlider
            key={veneerCase.id}
            {...sliderProps}
            beforeImage={veneerCase.beforeImage}
            afterImage={veneerCase.afterImage}
          />
        ))}
      </div>
    </section>
  );
}