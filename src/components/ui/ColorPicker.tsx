"use client";

import { TASK_COLORS, TaskColor } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Label } from "./label";

interface ColorPickerProps {
  selectedColorBgClass: string;
  onColorSelect: (color: TaskColor) => void;
  disabled?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColorBgClass,
  onColorSelect,
  disabled = false,
}) => {
  return (
    <div>
        <Label className="block text-sm font-medium text-foreground mb-2">Цвет заметки</Label>
        <div className="flex flex-wrap gap-2">
        {TASK_COLORS.map((colorOption) => (
            <button
            key={colorOption.name}
            type="button"
            onClick={() => onColorSelect(colorOption)}
            disabled={disabled}
            className={cn(
                "w-8 h-8 rounded-full border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
                colorOption.bg,
                selectedColorBgClass === colorOption.bg 
                  ? `${colorOption.border} ring-2 ring-offset-1 ${colorOption.border === 'border-slate-300' && colorOption.bg !== 'bg-white' ? 'ring-primary' : colorOption.border}` 
                  : `${colorOption.border} hover:opacity-80`,
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            )}
            aria-label={`Выбрать цвет ${colorOption.name}`}
            title={colorOption.name}
            >
            {selectedColorBgClass === colorOption.bg && (
                <Check size={16} className={cn(
                    (colorOption.name === "Default" || colorOption.name === "Slate" || colorOption.name === "Yellow" || colorOption.name === "Lime")
                     ? 'text-slate-700' 
                     : 'text-white',
                    "mx-auto"
                )} />
            )}
            </button>
        ))}
        </div>
    </div>
  );
};