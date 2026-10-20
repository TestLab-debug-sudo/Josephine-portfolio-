import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { DataProvider } from "@/context/DataContext";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

export const metadata: Metadata = {
  title: "Dr. Josephine Selle Jeyanathan | Associate Professor & Researcher",
  description:
    "Official Academic Portfolio of Dr. Josephine Selle Jeyanathan, Associate Professor at Kalasalingam Academy of Research and Education. Principal Investigator for ₹74L DBT grant on AI-Based IR Grading for Diabetic Foot Ulcers. Specializing in Medical Image Processing, Infrared Thermography, and IoT.",
  keywords: [
    "Dr. Josephine Selle Jeyanathan",
    "Associate Professor",
    "Medical Image Processing",
    "Breast Thermography",
    "Diabetic Foot Ulcer",
    "Infrared Thermography",
    "Department of Biotechnology DBT Grant",
    "Kalasalingam Academy of Research and Education",
    "Anna University PhD",
    "IoT Healthcare",
    "Machine Learning",
  ],
  authors: [{ name: "Dr. Josephine Selle Jeyanathan" }],
  openGraph: {
    title: "Dr. Josephine Selle Jeyanathan | Academic Portfolio",
    description:
      "Associate Professor, Principal Investigator (DBT ₹74L), Medical Image Processing & IoT Researcher at Kalasalingam Academy of Research and Education.",
    type: "profile",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-card-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <DataProvider>
            <ToastProvider>
              <AuthProvider>
                <Navbar />
                <main className="flex-1">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
                <MobileNav />
              </AuthProvider>
            </ToastProvider>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
