import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { NavBar } from "@/components/shared/NavBar"; 
import { TasksProvider } from "@/context/TasksContext"; 
import { Container } from "@/components/shared/Container"; 

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
        <TasksProvider> 
          <Header />
          <NavBar /> 
          <main className="flex-grow w-full py-6 sm:py-8"> 
            <Container> 
              {children}
            </Container>
          </main>
          <footer className="bg-card border-t border-border text-center p-4 text-xs sm:text-sm text-muted-foreground">
              © {new Date().getFullYear()} To-Do App Pro.
          </footer>
        </TasksProvider>
      </body>
    </html>
  );
}