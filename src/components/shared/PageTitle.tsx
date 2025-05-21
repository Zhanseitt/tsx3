import { cn } from "@/lib/utils";
import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
  subTitle?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children, className, subTitle }) => {
  return (
    <div className={cn("mb-8 text-center", className)}>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {children}
      </h1>
      {subTitle && (
        <p className="mt-3 max-w-2xl mx-auto text-md sm:text-lg text-muted-foreground">
          {subTitle}
        </p>
      )}
    </div>
  );
};