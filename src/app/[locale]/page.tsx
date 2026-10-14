import HeroVideo from "@/components/HeroVideo";
import VeneersSection from "@/components/VeneersSection";
import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-lavender text-ink">
      <HeroVideo />
      <VeneersSection />
    </main>
  );
}