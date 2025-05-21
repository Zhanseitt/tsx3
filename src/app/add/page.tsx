"use client";

import { useState } from "react";
import { useTasks } from "@/context/TasksContext";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const { addTask, isLoading } = useTasks();
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
        alert("Название задачи не может быть пустым.");
        return;
    }
    addTask(title); 
    setTitle("");
  };

  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6 text-center">Добавить новую задачу</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 bg-white p-6 shadow-md rounded-lg">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-300 p-3 rounded-md flex-grow focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
          placeholder="Например, купить молоко"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold px-6 py-3 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Добавление..." : "Добавить"}
        </button>
      </form>
    </section>
  );
}