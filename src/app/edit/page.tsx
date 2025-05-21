"use client";

import { useState } from "react";
import { useTasks } from "@/context/TasksContext";
import { Task } from "@/@types/task";

export default function EditPage() {
  const { tasks, editTask, isLoading } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setNewTitle(task.title);
  };

  const handleSaveChanges = () => {
    if (selectedTask && newTitle.trim()) {
      editTask(selectedTask.id, newTitle.trim(), selectedTask.isCompleted);
      setSelectedTask(null);
      setNewTitle("");
    } else if (!newTitle.trim()) {
        alert("Название задачи не может быть пустым.");
    }
  };

  if (isLoading && !selectedTask) {
      return <div className="text-center p-8"><p className="text-slate-500 animate-pulse">Обновление списка...</p></div>;
  }

  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6 text-center">Редактировать задачу</h1>
      {tasks.length === 0 ? (
        <p className="text-slate-600 text-center bg-white p-6 shadow-md rounded-lg">Нет задач для редактирования.</p>
      ) : (
        <div className="bg-white p-6 shadow-md rounded-lg">
          {!selectedTask ? (
            <>
              <h2 className="text-xl text-slate-700 mb-3">Выберите задачу для редактирования:</h2>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li key={task.id}>
                    <button
                      onClick={() => handleSelectTask(task)}
                      className="text-left w-full border border-slate-300 p-3 rounded-md hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={isLoading}
                    >
                      <span className={task.isCompleted ? "line-through text-slate-400" : ""}>{task.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-700">Редактирование задачи: <span className="font-semibold">{selectedTask.title}</span></p>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border border-slate-300 p-3 rounded-md w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
                placeholder="Новое название задачи"
                disabled={isLoading}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSaveChanges}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold px-5 py-2.5 rounded-md transition-colors"
                  disabled={isLoading || !newTitle.trim()}
                >
                  {isLoading ? "Сохранение..." : "Сохранить"}
                </button>
                <button
                  onClick={() => { setSelectedTask(null); setNewTitle(""); }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-5 py-2.5 rounded-md transition-colors"
                  disabled={isLoading}
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}