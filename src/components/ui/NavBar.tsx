"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 

const links = [
  { href: "/", label: "Главная" },
  { href: "/add", label: "Добавить задачу" },
  { href: "/edit", label: "Редактировать" },
  { href: "/delete", label: "Удалить задачу" },
  { href: "/tasks", label: "Список задач" }, 
  { href: "/about", label: "О приложении" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2 p-4 bg-slate-100 border-b border-slate-300 shadow-sm">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-slate-700 hover:text-purple-600 transition-colors duration-150 pb-1",
            pathname === link.href 
              ? "font-semibold text-purple-700 border-b-2 border-purple-700" 
              : "font-medium"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}