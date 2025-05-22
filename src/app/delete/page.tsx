"use client";

import { PageTitle } from "@/components/shared/PageTitle";
import { TaskList } from "@/components/tasks/TaskList";
import { useTasks } from "@/context/TasksContext";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function DeleteTaskPage() {
  const { tasks, isLoading, deleteCompletedTasks, deleteAllTasks, error: tasksLoadingError } = useTasks();

  const handleBulkDeleteCompleted = async () => {
    if (isLoading) return;
    const completedTasks = tasks.filter(task => task.isCompleted);
    if (completedTasks.length === 0) {
      toast.info("Нет выполненных задач для удаления.");
      return;
    }
    if (confirm(`Вы уверены, что хотите удалить ${completedTasks.length} выполненных задач? Это действие необратимо.`)) {
      await deleteCompletedTasks();
    }
  };

  const handleBulkDeleteAll = async () => {
    if (isLoading) return;
    if (tasks.length === 0) {
      toast.info("Список задач уже пуст.");
      return;
    }
    if (confirm(`ВЫ УВЕРЕНЫ, что хотите удалить ВСЕ ${tasks.length} задач? ЭТО ДЕЙСТВИЕ НЕОБРАТИМО!`)) {
      if (confirm(`ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ: ТОЧНО удалить все задачи?`)) {
        await deleteAllTasks();
      }
    }
  };

  if (isLoading && tasks.length === 0 && !tasksLoadingError) { 
    return <LoadingSpinner isLoading={true} text="Загрузка списка задач..." className="h-64" />;
  }
  
  if (tasksLoadingError) {
      return <div className="text-center py-10 text-destructive">Ошибка загрузки задач: {tasksLoadingError}</div>;
  }

  return (
    <div className="space-y-8">
      <PageTitle 
        subTitle="Здесь вы можете управлять удалением ваших задач. Будьте внимательны."
      >
        Управление задачами
      </PageTitle>
      
      <div className="bg-card p-6 rounded-xl shadow-medium space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">Массовое удаление</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="destructive"
              size="lg"
              className="flex-1 gap-2"
              onClick={handleBulkDeleteCompleted}
              disabled={isLoading || tasks.filter(t => t.isCompleted).length === 0}
            >
              <Trash2 size={18} />
              Удалить все выполненные
            </Button>
            <Button
              variant="destructive" 
              size="lg"
              className="flex-1 gap-2 bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white"
              onClick={handleBulkDeleteAll}
              disabled={isLoading || tasks.length === 0}
            >
              <AlertTriangle size={18} />
              Удалить ВСЕ задачи
            </Button>
          </div>
        </div>

        <div>
            <h2 className="text-xl font-semibold text-foreground mb-3 mt-8 border-t border-border pt-6">Поштучное удаление</h2>
            {tasks.length === 0 && !isLoading ? (
                <p className="text-muted-foreground text-center py-4">
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
      </div>
    </div>
  );
}