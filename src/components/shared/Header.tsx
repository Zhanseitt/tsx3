import Link from "next/link";
import React from "react";
import { Container } from "./Container";

export const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50 py-3"> 
      <Container className="flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl sm:text-3xl font-bold tracking-tight hover:opacity-90 transition-opacity"
        >
          To-Do App Pro
        </Link>
      </Container>
    </header>
  );
};