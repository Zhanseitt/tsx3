import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", 
        className
      )}
    >
      {children}
    </div>
  );
};