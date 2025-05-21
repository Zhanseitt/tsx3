"use client";

import Link from "next/link";
import { PageTitle } from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/context/TasksContext";
import { TaskList } from "@/components/tasks/TaskList";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const { tasks, isLoading } = useTasks();

  const recentTasks = tasks.slice(-3).reverse();

  return (
    <div className="space-y-10">
      <PageTitle subTitle="Организуйте свои дела легко и эффективно с нашим простым трекером задач.">
        Добро пожаловать в To-Do App Pro!
      </PageTitle>

      {isLoading && tasks.length === 0 && (
        <LoadingSpinner isLoading={true} text="Загрузка ваших задач..." />
      )}

      {!isLoading && tasks.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 text-center sm:text-left">
            Недавние задачи
          </h2>
          <TaskList tasks={recentTasks} emptyListMessage="Добавьте свою первую задачу, чтобы начать!" />
          {tasks.length > 3 && (
            <div className="mt-6 text-center">
              <Button variant="link" asChild className="text-primary hover:text-primary/80">
                <Link href="/tasks">
                  Посмотреть все задачи <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </section>
      )}
      
      {!isLoading && tasks.length === 0 && (
         <div className="text-center">
            <p className="text-muted-foreground mb-6 text-lg">
                У вас пока нет задач. Начнем?
            </p>
            <Button size="lg" asChild>
                <Link href="/add">Добавить первую задачу</Link>
            </Button>
         </div>
      )}

      <section className="mt-12 text-center">
        <p className="text-muted-foreground">
          Готовы стать более продуктивным?
        </p>
        <Button variant="outline" size="lg" className="mt-4" asChild>
          <Link href="/tasks">Перейти ко всем задачам</Link>
        </Button>
      </section>
    </div>
  );
}