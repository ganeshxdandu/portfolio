import "./globals.css";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Ganesh Dandu - Web Designer & Developer",
  description: "Freelance Web Designer & Developer crafting minimal, high-performance websites that help businesses stand out online.",
  keywords: "Ganesh Dandu, Web Designer, Web Developer, Freelance Web Designer, Freelance Developer, React Developer, Next.js Developer, Portfolio",
  authors: [{ name: "Ganesh Dandu" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://ganeshdandu.com",
  },
  openGraph: {
    type: "website",
    url: "https://ganeshdandu.com",
    title: "Ganesh Dandu — Web Designer & Developer",
    description: "Freelance Web Designer & Developer crafting minimal, high-performance websites.",
    images: [
      {
        url: "https://ganeshdandu.com/og-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Dandu — Web Designer & Developer",
    description: "Freelance Web Designer & Developer crafting minimal, high-performance websites.",
    images: ["https://ganeshdandu.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#F7F7F7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0F0F0F" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="/site-light.svg"
          type="image/x-icon"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-7C3WL3C3K1"} />
      </body>
    </html>
  );
}
