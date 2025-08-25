import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Olwen Lifesciences - Trusted Pharmaceutical Solutions",
  description: "Your trusted partner in healthcare. Quality medicines, expert guidance, and reliable service for all your pharmaceutical needs.",
  keywords: "pharmacy, medicines, healthcare, pharmaceuticals, prescription, online pharmacy, medical supplies",
  authors: [{ name: "Olwen Lifesciences" }],
  openGraph: {
    title: "Olwen Lifesciences - Trusted Pharmaceutical Solutions",
    description: "Your trusted partner in healthcare. Quality medicines, expert guidance, and reliable service.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ReduxProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
