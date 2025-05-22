"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useTasks, TaskInputData } from '@/context/TasksContext';
import { CalendarIcon } from 'lucide-react';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { TASK_COLORS, TaskColor } from '@/lib/colors';

interface TaskFormProps {
  onSubmit: (data: TaskInputData) => Promise<void>;
  initialData?: Partial<TaskInputData>;
  buttonText?: string;
  onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialData,
  buttonText = "Добавить задачу",
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [isImportant, setIsImportant] = useState(initialData?.isImportant || false);
  
  const defaultColorObject = TASK_COLORS.find(c => c.name === "Yellow") || TASK_COLORS[0];
  const [selectedColor, setSelectedColor] = useState<TaskColor>(
    TASK_COLORS.find(c => c.bg === initialData?.color) || defaultColorObject
  );
  
  const { isLoading: isContextLoading } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTitle(initialData?.title || "");
    setDescription(initialData?.description || "");
    setDueDate(initialData?.dueDate || "");
    setIsImportant(initialData?.isImportant || false);
    setSelectedColor(TASK_COLORS.find(c => c.bg === initialData?.color) || defaultColorObject);
  }, [initialData, defaultColorObject]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
        alert("Название задачи не может быть пустым.");
        return;
    }
    if (isSubmitting || isContextLoading) return;

    setIsSubmitting(true);
    await onSubmit({ 
        title: title.trim(), 
        description: description.trim(), 
        dueDate: dueDate || undefined,
        isImportant,
        color: selectedColor.bg,
    });
    setIsSubmitting(false);

    if (!initialData) { 
        setTitle(""); setDescription(""); setDueDate(""); setIsImportant(false);
        setSelectedColor(defaultColorObject);
    }
  };

  const effectiveIsLoading = isSubmitting || isContextLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="task-title" className="block text-sm font-medium text-foreground mb-1">Название задачи <span className="text-destructive">*</span></Label>
        <Input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Что нужно сделать?"
          className="border-border p-3 rounded-md w-full focus:ring-2 focus:ring-ring focus:border-primary outline-none transition-shadow text-base"
          disabled={effectiveIsLoading}
          required
        />
      </div>

      <div>
        <Label htmlFor="task-description" className="block text-sm font-medium text-foreground mb-1">Описание</Label>
        <Textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Дополнительные детали о задаче..."
          className="border-border p-3 rounded-md w-full min-h-[100px] focus:ring-2 focus:ring-ring focus:border-primary outline-none transition-shadow text-base"
          disabled={effectiveIsLoading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
            <Label htmlFor="task-dueDate" className="block text-sm font-medium text-foreground mb-1">Срок выполнения</Label>
            <div className="relative">
                <Input
                    id="task-dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border-border p-3 rounded-md w-full focus:ring-2 focus:ring-ring focus:border-primary outline-none transition-shadow text-base pr-10"
                    disabled={effectiveIsLoading}
                />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
        </div>
        <div className="flex items-center space-x-2 pt-2 sm:pt-0 sm:self-end sm:pb-1">
            <Checkbox
                id="task-isImportant"
                checked={isImportant}
                onCheckedChange={(checked) => setIsImportant(checked as boolean)}
                disabled={effectiveIsLoading}
                className="h-5 w-5"
            />
            <Label htmlFor="task-isImportant" className="text-sm font-medium text-foreground cursor-pointer">
                Важная задача
            </Label>
        </div>
      </div>
      
      <ColorPicker
        selectedColorBgClass={selectedColor.bg}
        onColorSelect={setSelectedColor}
        disabled={effectiveIsLoading}
      />

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 disabled:opacity-70 text-primary-foreground font-semibold px-6 py-3 rounded-md transition-colors text-base w-full sm:w-auto"
          disabled={effectiveIsLoading || !title.trim()}
        >
          {effectiveIsLoading ? "Обработка..." : buttonText}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="font-semibold px-6 py-3 rounded-md transition-colors text-base w-full sm:w-auto"
            disabled={effectiveIsLoading}
          >
            Отмена
          </Button>
        )}
      </div>
    </form>
  );
};