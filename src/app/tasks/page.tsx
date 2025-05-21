"use client";

import { PageTitle } from "@/components/shared/PageTitle";
import { TaskList } from "@/components/tasks/TaskList";
import { useTasks } from "@/context/TasksContext";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function TasksPage() {
  const { tasks, isLoading } = useTasks();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <PageTitle className="mb-0 text-left sm:text-center flex-grow">Ваши задачи</PageTitle>
        <Button asChild size="lg" className="w-full sm:w-auto"> 
          <Link href="/add" className="flex items-center gap-2">
            <PlusCircle size={20} />
            Новая задача
          </Link>
        </Button>
      </div>

      {isLoading && tasks.length === 0 ? (
        <LoadingSpinner isLoading={true} text="Загрузка задач..." className="h-64" />
      ) : (
        <TaskList
          tasks={tasks}
          emptyListMessage="Начните свой продуктивный день с добавления первой задачи!"
          emptyListActionText="Создать задачу"
          emptyListActionLink="/add"
        />
      )}
    </div>
  );
}