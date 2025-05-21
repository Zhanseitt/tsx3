"use client";

import { Task } from "@/@types/task";
import { TaskItem } from "@/components/ui/TaskItem";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListTodo } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  emptyListMessage?: string;
  emptyListActionText?: string;
  emptyListActionLink?: string;
}

export const TaskList: React.FC<TaskListProps> = ({ 
    tasks,
    emptyListMessage = "У вас пока нет задач.",
    emptyListActionText = "Добавить первую задачу",
    emptyListActionLink = "/add"
}) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<ListTodo size={48} strokeWidth={1.5}/>}
        title="Список задач пуст"
        message={emptyListMessage}
        actionText={emptyListActionText}
        actionLink={emptyListActionLink}
        className="mt-8"
      />
    );
  }

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};