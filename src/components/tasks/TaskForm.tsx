"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/context/TasksContext';

interface TaskFormProps {
  onSubmit: (title: string) => void;
  initialTitle?: string;
  buttonText?: string;
  isLoadingExternally?: boolean; 
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialTitle = "",
  buttonText = "Добавить задачу",
  isLoadingExternally
}) => {
  const [title, setTitle] = useState(initialTitle);
  const { isLoading: isContextLoading } = useTasks();

  const effectiveIsLoading = isLoadingExternally !== undefined ? isLoadingExternally : isContextLoading;

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || effectiveIsLoading) return;
    onSubmit(title.trim());
    if (!initialTitle) {
        setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи..."
        className="border-border p-3 rounded-md flex-grow focus:ring-2 focus:ring-ring focus:border-primary outline-none transition-shadow text-base"
        disabled={effectiveIsLoading}
        required
      />
      <Button
        type="submit"
        className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold px-6 py-3 rounded-md transition-colors text-base"
        disabled={effectiveIsLoading || !title.trim()}
      >
        {effectiveIsLoading ? "Обработка..." : buttonText}
      </Button>
    </form>
  );
};