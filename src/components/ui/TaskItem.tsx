"use client";

import { Task } from "@/@types/task";
import { useTasks } from "@/context/TasksContext";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Edit3, Trash2, AlertTriangle, CalendarDays } from "lucide-react";
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
    if (!isContextLoading && confirm(`Удалить задачу "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  const formattedDueDate = task.dueDate 
    ? new Date(task.dueDate + 'T00:00:00Z').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
    : null;
  
  const today = new Date();
  today.setHours(0,0,0,0);
  const dueDateObj = task.dueDate ? new Date(task.dueDate + 'T00:00:00Z') : null;
  if (dueDateObj) dueDateObj.setHours(0,0,0,0);

  const isOverdue = dueDateObj && !task.isCompleted && dueDateObj < today;


  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border rounded-lg transition-all duration-150 group relative",
        task.isCompleted 
          ? "bg-slate-100/70 border-slate-300 hover:bg-slate-200/60" 
          : "bg-card border-border hover:shadow-medium",
        isContextLoading ? "opacity-60 pointer-events-none" : "",
        isOverdue ? "border-destructive/50 ring-1 ring-destructive/30" : ""
      )}
    >
      <div className="flex items-start sm:items-center flex-grow mb-2 sm:mb-0 pr-2">
        <button
          onClick={handleToggle}
          className={cn(
            "mr-3 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ring",
            task.isCompleted 
              ? "text-green-600 hover:text-green-700" 
              : "text-muted-foreground/70 hover:text-foreground/90" 
          )}
          title={task.isCompleted ? "Отметить как невыполненную" : "Отметить как выполненную"}
          aria-pressed={task.isCompleted}
          disabled={isContextLoading}
        >
          {task.isCompleted ? <CheckCircle size={22} strokeWidth={2.5} /> : <Circle size={22} strokeWidth={2.5} />}
        </button>

        <div className="ml-1 flex-grow min-w-0">
          <p
            className={cn(
              "text-base font-medium break-words",
              task.isCompleted ? "line-through text-muted-foreground" : "text-foreground"
            )}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-muted-foreground mt-0.5 break-words truncate max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
              {task.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 self-start sm:self-center mt-2 sm:mt-0 pl-2 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0"> {/* Добавил разделитель для мобильных */}
        {task.isImportant && (
          <span title="Важная задача">
            <AlertTriangle size={16} className="text-destructive" />
          </span>
        )}
        {formattedDueDate && (
          <div className={cn(
                "flex items-center text-xs px-2 py-0.5 rounded-full whitespace-nowrap",
                isOverdue ? "bg-destructive/10 text-red-700 border border-destructive/30" : "bg-muted/70 text-muted-foreground"
            )} title={`Срок: ${formattedDueDate}`}>
            <CalendarDays size={14} className="mr-1 flex-shrink-0" />
            {formattedDueDate}
          </div>
        )}
        <Link href={`/edit?taskId=${task.id}`} passHref legacyBehavior>
           <a title="Редактировать" className={cn("p-1.5 text-muted-foreground hover:text-primary rounded-md hover:bg-primary/10")}>
            <Edit3 size={18} />
          </a>
        </Link>
        <button onClick={handleDelete} title="Удалить" className={cn("p-1.5 text-muted-foreground hover:text-destructive rounded-md hover:bg-destructive/10")}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};