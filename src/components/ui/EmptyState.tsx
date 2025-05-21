import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  message: string;
  actionText?: string;
  actionLink?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Ничего не найдено",
  message,
  actionText,
  actionLink,
  className,
  icon
}) => {
  return (
    <div
      className={cn(
        "text-center p-8 sm:p-12 border-2 border-dashed border-border rounded-xl bg-card shadow-subtle",
        className
      )}
    >
      {icon && <div className="mb-4 text-primary opacity-70 flex justify-center">{icon}</div>}
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{message}</p>
      {actionText && actionLink && (
        <Button asChild variant="default" size="lg">
          <Link href={actionLink}>{actionText}</Link>
        </Button>
      )}
    </div>
  );
};