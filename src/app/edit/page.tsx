"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageTitle } from "@/components/shared/PageTitle";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useTasks } from "@/context/TasksContext";
import { Task } from "@/@types/task";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditTaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getTaskById, editTask, tasks, isLoading: isContextLoading } = useTasks();

  const [taskToEdit, setTaskToEdit] = useState<Task | null | undefined>(undefined); 
  const [initialTitle, setInitialTitle] = useState("");
  const [isLoadingTask, setIsLoadingTask] = useState(true);

  useEffect(() => {
    const taskIdParam = searchParams.get("taskId");
    if (taskIdParam) {
      const id = parseInt(taskIdParam, 10);
      if (!isNaN(id)) {
        if (tasks.length > 0 || !isContextLoading) {
            const foundTask = getTaskById(id);
            setTaskToEdit(foundTask || null);
            setInitialTitle(foundTask?.title || "");
            setIsLoadingTask(false);
        } else if (!isContextLoading) {
             setTaskToEdit(null);
             setInitialTitle("");
             setIsLoadingTask(false);
        }
      } else {
        setTaskToEdit(null);
        setIsLoadingTask(false);
      }
    } else {
      setTaskToEdit(undefined);
      setIsLoadingTask(false);
    }
  }, [searchParams, getTaskById, tasks, isContextLoading]);


  const handleEditTask = async (newTitle: string) => {
    if (taskToEdit) {
      await editTask(taskToEdit.id, newTitle);
      router.push("/tasks");
    }
  };
  
  if (isContextLoading && taskToEdit === undefined) {
      return <LoadingSpinner isLoading={true} text="Загрузка данных..." className="h-64" />;
  }


  if (isLoadingTask) {
    return <LoadingSpinner isLoading={true} text="Поиск задачи для редактирования..." className="h-64" />;
  }

  if (taskToEdit === undefined) {
    return (
        <div className="max-w-xl mx-auto text-center">
            <PageTitle className="mb-8">Редактировать задачу</PageTitle>
            <p className="text-muted-foreground mb-4">
                Чтобы отредактировать задачу, сначала выберите ее из <Link href="/tasks" className="text-primary hover:underline">общего списка задач</Link> и нажмите иконку редактирования.
            </p>
            <Button asChild><Link href="/tasks">К списку задач</Link></Button>
        </div>
    )
  }

  if (taskToEdit === null) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <PageTitle className="mb-8">Задача не найдена</PageTitle>
        <p className="text-muted-foreground mb-4">
          Задача с указанным ID не найдена или вы не выбрали задачу для редактирования.
        </p>
        <Button asChild><Link href="/tasks">Вернуться к списку задач</Link></Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <PageTitle className="mb-4">Редактировать задачу</PageTitle>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Вы редактируете: <span className="font-semibold text-foreground">{taskToEdit.title}</span>
      </p>
      <div className="bg-card p-6 sm:p-8 rounded-xl shadow-medium">
        <TaskForm
          onSubmit={handleEditTask}
          initialTitle={initialTitle} 
          buttonText={isContextLoading ? "Сохранение..." : "Сохранить изменения"}
          isLoadingExternally={isContextLoading}
        />
      </div>
       <div className="mt-6 text-center">
            <Button variant="outline" asChild>
                <Link href="/tasks">Отмена</Link>
            </Button>
        </div>
    </div>
  );
}