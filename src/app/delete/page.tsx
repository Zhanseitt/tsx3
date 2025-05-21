"use client";

import { useTasks } from "@/context/TasksContext";
import { TaskItem } from "@/components/ui/TaskItem";

export default function DeletePage() {
  const { tasks, deleteTask, isLoading } = useTasks();

  const handleDeleteWithConfirmation = (id: number, title: string) => {
    if (confirm(`Вы уверены, что хотите удалить задачу "${title}"?`)) {
      deleteTask(id);
    }
  };
  
  if (isLoading && tasks.length === 0) {
    return <div className="text-center p-8"><p className="text-slate-500 animate-pulse">Загрузка задач...</p></div>;
  }


  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6 text-center">Удалить задачу</h1>
      {tasks.length === 0 ? (
        <p className="text-slate-600 text-center bg-white p-6 shadow-md rounded-lg">Нет задач для удаления.</p>
      ) : (
        <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex justify-between items-center p-3 border border-slate-200 rounded-md hover:shadow-sm transition-shadow">
                <div className="flex-grow mr-3">
                    <span className={task.isCompleted ? "line-through text-slate-400" : ""}>{task.title}</span>
                </div>
                <button
                    onClick={() => handleDeleteWithConfirmation(task.id, task.title)}
                    className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium px-4 py-2 rounded-md transition-colors text-sm flex-shrink-0"
                    disabled={isLoading}
                >
                    {isLoading ? "..." : "Удалить"}
                </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}