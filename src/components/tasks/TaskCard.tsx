"use client";

import { Task } from "@/@types/task";
import { cn } from "@/lib/utils";
import { useTasks } from "@/context/TasksContext";
import { CheckCircle, Circle, Edit3, Trash2, AlertTriangle, CalendarDays, Pin, PinOff } from "lucide-react";
import Link from "next/link";
import { TASK_COLORS, TaskColor } from "@/lib/colors";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, editTask, isLoading: isContextLoading } = useTasks();

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    if (!isContextLoading) toggleTaskCompletion(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isContextLoading && confirm(`Удалить задачу "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  const handleToggleImportant = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isContextLoading) {
      editTask(task.id, { 
        title: task.title, description: task.description, dueDate: task.dueDate,
        color: task.color, isImportant: !task.isImportant 
      });
    }
  };
  
  const defaultColorObject = TASK_COLORS.find(c => c.name === "Yellow") || TASK_COLORS[0];
  const cardColorInfo = TASK_COLORS.find((c: TaskColor) => c.bg === task.color) || defaultColorObject;

  const cardBgClass = cardColorInfo.bg;
  const cardBorderClass = cardColorInfo.border;
  const cardTextClass = cardColorInfo.text; 
  const cardMutedTextClassValue = (cardColorInfo.name === "Default" || cardColorInfo.name === "Slate" || cardColorInfo.name === "Yellow" || cardColorInfo.name === "Lime")
     ? "text-slate-500"
     : `${cardColorInfo.text} opacity-70`;

  const cardDividerClass = cardColorInfo.name === "Default" || cardColorInfo.name === "Slate" 
    ? cardBorderClass 
    : `${cardBorderClass} opacity-40`; 

  let checkIconColorClass = "text-green-600";
  if (!(cardColorInfo.name === "Default" || cardColorInfo.name === "Slate" || cardColorInfo.name === "Yellow" || cardColorInfo.name === "Lime")) {
    checkIconColorClass = cardTextClass.includes("800") || cardTextClass.includes("900") ? "text-white brightness-125" : `${cardTextClass} brightness-125`;
  }


  const formattedDueDate = task.dueDate ? new Date(task.dueDate + 'T00:00:00Z').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
  const today = new Date(); today.setHours(0,0,0,0);
  const dueDateObj = task.dueDate ? new Date(task.dueDate + 'T00:00:00Z') : null;
  if (dueDateObj) dueDateObj.setHours(0,0,0,0);
  const isOverdue = dueDateObj && !task.isCompleted && dueDateObj < today;

  return (
    <Link href={`/edit?taskId=${task.id}`} passHref legacyBehavior>
      <a
        className={cn(
          "p-4 rounded-lg border shadow-subtle transition-all duration-200 ease-in-out cursor-pointer min-h-[160px] flex flex-col justify-between group relative overflow-hidden",
          cardBgClass,
          cardBorderClass, 
          task.isCompleted ? "opacity-70 filter grayscale-[60%]" : "hover:shadow-medium hover:-translate-y-0.5",
          isContextLoading ? "pointer-events-none animate-pulse" : ""
        )}
      >
        
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className={cn(
                "text-base sm:text-lg font-semibold break-words mr-2",
                cardTextClass, 
                task.isCompleted ? "line-through" : ""
            )}>
              {task.title}
            </h3>
            <button
              onClick={handleToggleComplete}
              className={cn(
                "p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ring flex-shrink-0",
                task.isCompleted 
                  ? `${checkIconColorClass} hover:brightness-125`
                  : `${cardMutedTextClassValue} hover:opacity-100`, 
              )}
              title={task.isCompleted ? "Отметить как невыполненную" : "Отметить как выполненную"}
              aria-pressed={task.isCompleted}
            >
              {task.isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
            </button>
          </div>

          {task.description && (
            <p className={cn(
                "text-xs sm:text-sm mt-1 break-words line-clamp-3",
                cardMutedTextClassValue, 
                task.isCompleted ? "line-through" : ""
            )}>
              {task.description}
            </p>
          )}
        </div>

        <div className={cn(
            "mt-3 pt-3 border-t flex items-center justify-between text-xs gap-1 sm:gap-2 flex-wrap", 
            cardDividerClass 
        )}>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {task.isImportant && (
              <span title="Важная задача" className="flex items-center">
                <AlertTriangle size={14} className="text-red-500" />
              </span>
            )}
            {formattedDueDate && (
              <div className={cn(
                  "flex items-center px-1.5 py-0.5 rounded-full text-[11px] sm:text-xs whitespace-nowrap",
                  isOverdue 
                    ? "bg-red-600 text-white" 
                    : "bg-black/5 text-inherit opacity-80", 
                  isOverdue ? "" : `border ${cardBorderClass} border-opacity-50` 
                )} title={`Срок: ${formattedDueDate}`}>
                <CalendarDays size={12} className="mr-1 flex-shrink-0" />
                <span className={isOverdue ? "" : cardMutedTextClassValue}>{formattedDueDate}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            <button 
              onClick={handleToggleImportant}
              title={task.isImportant ? "Убрать из важных" : "Отметить как важное"}
              className={cn(
                "p-1.5 rounded-md transition-colors hover:bg-black/10", 
                task.isImportant ? `text-orange-500` : cardMutedTextClassValue,
              )}
            >
              {task.isImportant ? <PinOff size={16} /> : <Pin size={16} />}
            </button>
            <button 
              onClick={handleDelete} 
              title="Удалить" 
              className={cn("p-1.5 rounded-md transition-colors hover:bg-red-500/20", cardMutedTextClassValue, "hover:text-red-600")}
            >
                <Trash2 size={16} />
            </button>
          </div>
        </div>
      </a>
    </Link>
  );
};