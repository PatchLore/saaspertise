import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Saaspertise - Top SaaS & AI Consultants Directory",
    template: "%s | Saaspertise"
  },
  description: "Find top SaaS and AI consultants to grow your business. Connect with expert consultants specializing in SaaS development, AI implementation, and digital transformation. Browse verified consultants by location, expertise, and industry.",
  keywords: [
    "SaaS consultants",
    "AI consultants", 
    "digital transformation",
    "software development consultants",
    "business technology consultants",
    "consultant directory",
    "tech consultants",
    "SaaS development",
    "AI implementation",
    "digital strategy"
  ],
  authors: [{ name: "Saaspertise Team" }],
  creator: "Saaspertise",
  publisher: "Saaspertise",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.saaspertise.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.saaspertise.com",
    siteName: "Saaspertise",
    title: "Saaspertise - Top SaaS & AI Consultants Directory",
    description: "Find top SaaS and AI consultants to grow your business. Connect with expert consultants specializing in SaaS development, AI implementation, and digital transformation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Saaspertise - SaaS & AI Consultants Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saaspertise - Top SaaS & AI Consultants Directory",
    description: "Find top SaaS and AI consultants to grow your business. Connect with expert consultants specializing in SaaS development, AI implementation, and digital transformation.",
    images: ["/og-image.jpg"],
    creator: "@saaspertise",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your actual verification code
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}