"use client";

import Link from "next/link";
import { useTasks } from "@/context/TasksContext";
import { TaskItem } from "@/components/ui/TaskItem";

export default function HomePage() {
  const { tasks, isLoading } = useTasks();

  if (isLoading && tasks.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-slate-500 animate-pulse">Загрузка задач...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Ваш список дел</h1>
        <p className="text-lg text-slate-600">
          Управляйте своими задачами легко и просто.
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center p-10 border-2 border-dashed border-slate-300 rounded-lg">
          <p className="text-slate-500 mb-4">У вас пока нет задач.</p>
          <Link href="/add" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
            Добавить первую задачу
          </Link>
        </div>
      ) : (
        <div className="space-y-3 max-w-2xl mx-auto">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}