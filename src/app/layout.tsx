import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header"; 

const inter = Inter({ 
  subsets: ["cyrillic", "latin"],
  display: 'swap',
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  title: "To-Do App Pro",
  description: "Manage your tasks efficiently and stylishly!",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full`}>
      <body className="font-sans antialiased text-foreground bg-background h-full flex flex-col">
        <Header />
        <main className="flex-grow w-full"> 
          {children}
        </main>
        <footer className="bg-muted text-muted-foreground text-center p-4 text-xs sm:text-sm border-t">
            © {new Date().getFullYear()} To-Do App Pro. All rights reserved.
        </footer>
      </body>
    </html>
  );
}