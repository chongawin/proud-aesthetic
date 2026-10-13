import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Hero");

  return (
    <main className="min-h-screen bg-lavender p-6 text-ink">
      <h1 className="font-serif text-4xl">{t("title")}</h1>
      <button className="mt-6 rounded-full border border-ink px-6 py-2 text-sm">{t("cta")}</button>
    </main>
  );
}