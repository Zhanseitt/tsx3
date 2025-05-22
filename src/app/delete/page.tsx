"use client";

import Link from "next/link";
import { PageTitle } from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/context/TasksContext";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { TaskCard } from "@/components/tasks/TaskCard";
import { PlusCircle, LayoutGrid } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function HomePage() {
  const { tasks, isLoading } = useTasks();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <PageTitle className="mb-0 text-left sm:text-center flex-grow">
          Мои Заметки
        </PageTitle>
        <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" asChild className="flex-1 sm:flex-none">
                <Link href="/tasks" className="flex items-center gap-2">
                    <LayoutGrid size={18} />
                    Все задачи (список)
                </Link>
            </Button>
            <Button asChild size="lg" className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/add" className="flex items-center gap-2">
                    <PlusCircle size={20} />
                    Создать заметку
                </Link>
            </Button>
        </div>
      </div>

      {isLoading && tasks.length === 0 ? (
        <LoadingSpinner isLoading={true} text="Загрузка ваших заметок..." className="h-64" />
      ) : null}

      {!isLoading && tasks.length === 0 ? (
        <EmptyState
            icon={<PlusCircle size={48} strokeWidth={1.5} className="text-primary"/>}
            title="Пока нет ни одной заметки"
            message="Самое время создать первую, чтобы ничего не забыть!"
            actionText="Создать первую заметку"
            actionLink="/add"
            className="mt-10"
        />
      ) : null}

      {!isLoading && tasks.length > 0 && (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}