import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DeferredWidgets } from "@/components/conversion/DeferredWidgets";
import { JsonLd } from "@/components/ui";
import { createMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-MJP0XCBHE9";
const GTM_ID = "GTM-K4JHVHJQ";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = createMetadata({});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Google Tag Manager — as high in <head> as possible */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* Google tag (gtag.js) — loaded once for every page */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <DeferredWidgets />
      </body>
    </html>
  );
}
