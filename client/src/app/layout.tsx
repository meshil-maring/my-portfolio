import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Cursor } from "@/components/ui/Cursor";
import { ChatWidget } from "@/components/ui/ChatWidget";

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
  title: "DS Meshil Maring — Full-Stack Developer & AI Application Engineer",
  description:
    "Portfolio of DS Meshil Maring: scalable web applications, secure backend systems, and intelligent AI solutions.",
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

