import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { ChatAgentProvider } from "@/components/ui/JotformChatDialog";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const labeDisplay = Space_Grotesk({
  variable: "--font-labe-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Labe — Modern websites and practical AI solutions",
    template: "%s | Labe",
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "64x64" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Labe — Modern websites and practical AI solutions",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Labe beaker logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Labe — Modern websites and practical AI solutions",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon`,
    image: `${siteConfig.url}/opengraph-image`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "South Australia",
    },
    sameAs: [
      "https://www.facebook.com/share/19ENGSTuSX",
      "https://www.instagram.com/labe.labs",
      "https://x.com/labe_labs",
      "https://www.linkedin.com/in/max-walsh-a4a594424",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${labeDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <ChatAgentProvider>{children}</ChatAgentProvider>
      </body>
    </html>
  );
}
