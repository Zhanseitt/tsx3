"use client";

import { PageTitle } from "@/components/shared/PageTitle";
import { TaskList } from "@/components/tasks/TaskList"; 
import { useTasks } from "@/context/TasksContext";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function DeleteTaskPage() {
  const { tasks, isLoading } = useTasks();

  if (isLoading && tasks.length === 0) {
    return <LoadingSpinner isLoading={true} text="Загрузка задач..." className="h-64" />;
  }

  return (
    <div className="space-y-8">
      <PageTitle subTitle="Выберите задачи, которые вы хотите удалить из списка.">
        Удаление задач
      </PageTitle>
      
      {tasks.length === 0 && !isLoading ? (
         <p className="text-slate-600 text-center bg-white p-10 shadow-md rounded-lg">
          Нет задач для удаления.
        </p>
      ) : (
        <TaskList
          tasks={tasks}
          emptyListMessage="Все задачи удалены или их не было."
          emptyListActionText="Перейти на главную"
          emptyListActionLink="/"
        />
      )}
    </div>
  );
}