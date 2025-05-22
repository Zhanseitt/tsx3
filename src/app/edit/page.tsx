"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageTitle } from "@/components/shared/PageTitle";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useTasks, TaskInputData } from "@/context/TasksContext";
import { Task } from "@/@types/task";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function EditTaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getTaskById, editTask, tasks, isLoading: isContextLoading } = useTasks();

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [initialFormData, setInitialFormData] = useState<Partial<TaskInputData>>({});
  const [isLoadingPage, setIsLoadingPage] = useState(true); 

  useEffect(() => {
    const taskIdFromQuery = searchParams.get("taskId");
    if (taskIdFromQuery) {
      const id = parseInt(taskIdFromQuery, 10);
      if (!isNaN(id)) {
        setSelectedTaskId(id);
      } else {
        setSelectedTaskId(null);
        setIsLoadingPage(false);
      }
    } else {
      setSelectedTaskId(null); 
      setIsLoadingPage(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedTaskId !== null) {
      if (tasks.length > 0 || !isContextLoading) {
        const foundTask = getTaskById(selectedTaskId);
        if (foundTask) {
          setInitialFormData({
            title: foundTask.title,
            description: foundTask.description,
            dueDate: foundTask.dueDate,
            isImportant: foundTask.isImportant,
          });
        } else {
          toast.error(`Задача с ID ${selectedTaskId} не найдена.`);
          setInitialFormData({}); 
          setSelectedTaskId(null);
        }
        setIsLoadingPage(false);
      } else if (!isContextLoading) {
        toast.error("Список задач пуст или задача не найдена.");
        setInitialFormData({});
        setSelectedTaskId(null);
        setIsLoadingPage(false);
      }
    } else {
        if (!isContextLoading) setIsLoadingPage(false);
    }
  }, [selectedTaskId, getTaskById, tasks, isContextLoading]);


  const handleEditTask = async (data: TaskInputData) => {
    if (selectedTaskId) {
      await editTask(selectedTaskId, data);
      toast.success("Задача успешно обновлена!");
      router.push("/tasks");
    }
  };

  const handleSelectTaskForEditing = (taskId: number) => {
    router.push(`/edit?taskId=${taskId}`);
  };

  const effectiveIsLoading = isContextLoading || isLoadingPage;

  if (effectiveIsLoading) {
    return <LoadingSpinner isLoading={true} text="Загрузка данных для редактирования..." className="h-64" />;
  }

  if (selectedTaskId === null && !initialFormData.title) { 
    if (tasks.length === 0) {
        return (
            <div className="max-w-xl mx-auto text-center">
                <PageTitle className="mb-8">Редактировать задачу</PageTitle>
                <p className="text-muted-foreground mb-4">Список задач пуст. Сначала добавьте задачи.</p>
                <Button asChild><Link href="/add">Добавить задачу</Link></Button>
            </div>
        )
    }
    return (
      <div className="max-w-xl mx-auto">
        <PageTitle className="mb-8">Выберите задачу для редактирования</PageTitle>
        <div className="bg-card p-6 rounded-xl shadow-medium space-y-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => handleSelectTaskForEditing(task.id)}
              className={cn(
                "w-full text-left p-3 border rounded-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                task.isCompleted ? "border-slate-300 bg-slate-50 text-muted-foreground" : "border-border bg-card"
              )}
            >
              <span className={cn(task.isCompleted ? "line-through" : "")}>{task.title}</span>
              {task.dueDate && <span className="text-xs text-muted-foreground ml-2"> (до {new Date(task.dueDate+'T00:00:00Z').toLocaleDateString('ru-RU')})</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  if (selectedTaskId !== null && initialFormData.title !== undefined) { 
    return (
      <div className="max-w-xl mx-auto">
        <PageTitle className="mb-4">Редактировать задачу</PageTitle>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Вы редактируете: <span className="font-semibold text-foreground">{initialFormData.title}</span>
        </p>
        <div className="bg-card p-6 sm:p-8 rounded-xl shadow-medium">
          <TaskForm
            onSubmit={handleEditTask}
            initialData={initialFormData}
            buttonText={isContextLoading ? "Сохранение..." : "Сохранить изменения"}
            onCancel={() => {
                setSelectedTaskId(null); 
                setInitialFormData({}); 
                router.replace('/edit'); 
            }}
          />
        </div>
      </div>
    );
  }

  return (
      <div className="max-w-xl mx-auto text-center">
        <PageTitle className="mb-8">Ошибка</PageTitle>
        <p className="text-muted-foreground mb-4">
            Не удалось загрузить задачу для редактирования или задача не выбрана.
        </p>
        <Button asChild><Link href="/tasks">К списку задач</Link></Button>
    </div>
  )
}