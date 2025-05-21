"use client";

import { PageTitle } from "@/components/shared/PageTitle";
import { TaskForm } from "@/components/tasks/TaskForm"; 
import { useTasks } from "@/context/TasksContext";
import { useRouter } from "next/navigation"; 

export default function AddTaskPage() {
  const { addTask, isLoading } = useTasks();
  const router = useRouter();

  const handleAddTask = async (title: string) => {
    await addTask(title);
    router.push("/tasks"); 
  };

  return (
    <div className="max-w-xl mx-auto">
      <PageTitle className="mb-8">Добавить новую задачу</PageTitle>
      <div className="bg-card p-6 sm:p-8 rounded-xl shadow-medium">
        <TaskForm 
          onSubmit={handleAddTask} 
          buttonText={isLoading ? "Добавление..." : "Добавить задачу"}
          isLoadingExternally={isLoading}
        />
      </div>
    </div>
  );
}