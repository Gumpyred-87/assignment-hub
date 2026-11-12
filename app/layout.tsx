import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AssignPro — AI Assignment Assistant",
  description:
    "Finish assignments faster, with clarity. Plan, research, draft, refine and format academic and professional assignments end to end.",
  metadataBase: new URL("https://assignpro.example"),
  openGraph: {
    title: "AssignPro",
    description: "AI assignment assistant for students and professionals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}