"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Home, PlusCircle, Edit, Trash2, Info, ListChecks } from "lucide-react";


const navLinks = [
  { href: "/", label: "Главная", icon: <Home size={18} /> },
  { href: "/tasks", label: "Задачи", icon: <ListChecks size={18} /> },
  { href: "/add", label: "Добавить", icon: <PlusCircle size={18} /> },
  { href: "/edit", label: "Изменить", icon: <Edit size={18} /> },
  { href: "/delete", label: "Удалить", icon: <Trash2 size={18} /> },
  { href: "/about", label: "О нас", icon: <Info size={18} /> },
];

export const NavBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-card border-b border-border shadow-subtle">
      <Container className="flex flex-wrap items-center justify-center sm:justify-start py-3 gap-x-3 gap-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out group",
              "hover:bg-primary/10 hover:text-primary",
              pathname === link.href
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            )}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            <span className={cn(
                "transition-colors",
                 pathname === link.href ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
            )}>
                {link.icon}
            </span>
            {link.label}
          </Link>
        ))}
      </Container>
    </nav>
  );
};