import { Instrument_Serif, Inter } from "next/font/google";

// ============================================================
// FONT CONFIGURATION
// Change fonts here — this is the single source of truth.
// Swap any Google Font by changing the import and constructor.
// ============================================================

export const fontSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
