"use client";

import { Task } from "@/@types/task";
import { useTasks } from "@/context/TasksContext";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Edit3, Trash2, MoreVertical, GripVertical } from "lucide-react";
import Link from "next/link";


interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, isLoading: isContextLoading } = useTasks();

  const handleToggle = () => {
    if (!isContextLoading) {
      toggleTaskCompletion(task.id);
    }
  };

  const handleDelete = () => {
    if (!isContextLoading && confirm(`Вы уверены, что хотите удалить задачу: "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center p-3 pl-2 border rounded-lg transition-all duration-150 group",
        task.isCompleted 
          ? "bg-slate-100 border-slate-300 hover:bg-slate-200/70" 
          : "bg-card border-border hover:shadow-subtle",
        isContextLoading ? "opacity-60 pointer-events-none" : ""
      )}
    >
      
      <button
        onClick={handleToggle}
        className={cn(
          "mr-3 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ring",
          task.isCompleted 
            ? "text-green-600 hover:text-green-700" 
            : "text-muted-foreground/70 hover:text-foreground/90",
        )}
        title={task.isCompleted ? "Отметить как невыполненную" : "Отметить как выполненную"}
        aria-pressed={task.isCompleted}
      >
        {task.isCompleted ? <CheckCircle size={22} strokeWidth={2.5} /> : <Circle size={22} strokeWidth={2.5} />}
      </button>

      <span
        className={cn(
          "flex-grow text-sm sm:text-base break-words pr-2",
          task.isCompleted ? "line-through text-muted-foreground" : "text-foreground"
        )}
      >
        {task.title}
      </span>

      <div className="flex items-center space-x-1 flex-shrink-0 ml-auto">
        <Link href={`/edit?taskId=${task.id}`} passHref legacyBehavior>
           <a 
            title="Редактировать задачу"
            className={cn(
              "p-1.5 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
            )}
          >
            <Edit3 size={18} />
          </a>
        </Link>
        <button
          onClick={handleDelete}
          title="Удалить задачу"
          className={cn(
            "p-1.5 text-muted-foreground hover:text-destructive rounded-md hover:bg-destructive/10 transition-colors"
          )}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};