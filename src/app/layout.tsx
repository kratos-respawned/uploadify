import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/themeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { SessionContext } from "@/components/Session";
import { Navbar } from "@/components/navbar";
import { Footer } from "./Footer";
const sans = Montserrat({
  display: "swap",
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const calSans = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal",
});
export const metadata: Metadata = {
  title: "Uploadify",
  description: "Uploadify is a file uploader for all your JS apps.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={cn("font-inter ", sans.variable, calSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionContext session={session}>
            <div className="relative min-h-[100dvh] ">
              <Navbar />
              {children}
              <Footer />
            </div>
          </SessionContext>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
