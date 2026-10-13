import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Montserrat, Noto_Sans_Thai } from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-cormorant",
});
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const notoThai = Noto_Sans_Thai({ subsets: ["thai"], variable: "--font-noto-thai" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${cormorant.variable} ${montserrat.variable} ${notoThai.variable} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}