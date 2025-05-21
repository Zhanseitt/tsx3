import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TasksProvider } from "@/context/TasksContext"; 
import NavBar from "@/components/ui/NavBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "To-Do App with Context",
  description: "A simple to-do list application using Next.js and React Context API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}> 
      <body className="font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col"> 
        <TasksProvider> 
          <NavBar /> 
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
        </TasksProvider>
      </body>
    </html>
  );
}