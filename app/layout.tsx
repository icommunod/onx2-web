import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OnX2 - AI-Powered C-UAS Solutions",
  description: "AI-powered C-UAS orchestration for critical sites."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
