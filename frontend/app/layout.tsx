import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpacePulse AI",
  description: "Real-time space weather intelligence, personalized for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col text-white" style={{ background: '#060610' }}>
        {children}
      </body>
    </html>
  );
}
