import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Cursor } from "@/components/ui/Cursor";
import { ChatWidget } from "@/components/ui/ChatWidget";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DS Meshil Maring — Full-Stack Developer & AI Application Engineer",
    template: "%s | DS Meshil Maring",
  },
  description:
    "Portfolio of DS Meshil Maring: scalable web applications, secure backend systems, and intelligent AI solutions.",
  keywords: [
    "Full-Stack Developer",
    "AI Application Engineer",
    "React",
    "Next.js",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "RAG",
    "Portfolio",
  ],
  authors: [{ name: "DS Meshil Maring" }],
  creator: "DS Meshil Maring",
  publisher: "DS Meshil Maring",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "DS Meshil Maring Portfolio",
    title: "DS Meshil Maring — Full-Stack Developer & AI Application Engineer",
    description:
      "Portfolio of DS Meshil Maring: scalable web applications, secure backend systems, and intelligent AI solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DS Meshil Maring — Full-Stack Developer & AI Application Engineer",
    description:
      "Portfolio of DS Meshil Maring: scalable web applications, secure backend systems, and intelligent AI solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1410" },
  ],
};

function themeInitScript() {
  return `(function(){try{var t=localStorage.getItem("theme");var s=t||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");if(s==="dark"){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body className="min-h-full bg-bg font-sans text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "DS Meshil Maring",
              jobTitle: "Full-Stack Developer & AI Application Engineer",
              url: siteUrl,
              sameAs: [],
            }),
          }}
        />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-text"
          >
            Skip to content
          </a>
          {children}
          <Cursor />
          {/* Floating AI assistant — available on every page. */}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}

