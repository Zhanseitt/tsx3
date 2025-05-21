"use client";

import { Task } from "@/@types/task";
import { useTasks } from "@/context/TasksContext";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Edit3, Trash2 } from "lucide-react"; 
import Link from "next/link"; 

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, isLoading } = useTasks();

  const handleToggle = () => {
    if (!isLoading) {
      toggleTaskCompletion(task.id);
    }
  };

  const handleDelete = () => {
    if (!isLoading && confirm(`Удалить задачу "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-3 border rounded-md transition-all duration-150",
        task.isCompleted ? "bg-slate-100 border-slate-300" : "bg-white border-slate-200 hover:shadow-sm",
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      )}
    >
      <div className="flex items-center flex-grow mr-2">
        <button
          onClick={handleToggle}
          className={cn(
            "mr-3 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1",
            task.isCompleted ? "text-green-500 hover:text-green-600 focus:ring-green-400" : "text-slate-400 hover:text-slate-600 focus:ring-slate-400",
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          )}
          title={task.isCompleted ? "Отметить как невыполненную" : "Отметить как выполненную"}
          disabled={isLoading}
        >
          {task.isCompleted ? <CheckCircle size={22} /> : <Circle size={22} />}
        </button>
        <span 
          className={cn(
            "flex-grow break-all",
            task.isCompleted ? "line-through text-slate-500" : "text-slate-800"
          )}
        >
          {task.title}
        </span>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <Link href="/edit" legacyBehavior>
          <a 
            title="Редактировать список задач"
            className={cn(
              "p-1.5 text-slate-500 hover:text-blue-600 rounded-md hover:bg-blue-100 transition-colors",
              isLoading ? "cursor-not-allowed opacity-50" : ""
            )}
            onClick={(e) => { if (isLoading) e.preventDefault();}}
          >
            <Edit3 size={18} />
          </a>
        </Link>
        <button
          onClick={handleDelete}
          title="Удалить задачу"
          className={cn(
            "p-1.5 text-slate-500 hover:text-red-600 rounded-md hover:bg-red-100 transition-colors",
            isLoading ? "cursor-not-allowed opacity-50" : ""
          )}
          disabled={isLoading}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};