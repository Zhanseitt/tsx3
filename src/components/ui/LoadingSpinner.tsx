"use client";
import { ClimbingBoxLoader } from "react-spinners";

interface LoadingSpinnerProps {
  isLoading: boolean;
  size?: number;
  color?: string;
  className?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  size = 20,
  color = "hsl(var(--primary))", 
  className,
  text = "Загрузка...",
}) => {
  if (!isLoading) return null;

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <ClimbingBoxLoader color={color} size={size} aria-label="Loading Spinner" />
      {text && <p className="mt-4 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};