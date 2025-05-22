"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { Task } from "@/@types/task";
import { toast } from "sonner";
import { TASK_COLORS } from "@/lib/colors";

export interface TaskInputData {
  title: string;
  description?: string;
  dueDate?: string;
  isImportant?: boolean;
  color?: string;
}

type TasksContextType = {
  tasks: Task[];
  isLoading: boolean;
  addTask: (taskData: TaskInputData) => Promise<void>;
  editTask: (id: number, taskData: TaskInputData) => Promise<void>;
  error: string | null;
  deleteTask: (id: number) => Promise<void>;
  toggleTaskCompletion: (id: number) => Promise<void>;
  getTaskById: (id: number) => Task | undefined;
  deleteCompletedTasks: () => Promise<void>;
  deleteAllTasks: () => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

interface TasksProviderProps { children: ReactNode; }

const LOCAL_STORAGE_KEY = "todo-app-tasks-v3";

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        const tasksWithDefaults = parsedTasks.map(task => ({
            ...task,
            isCompleted: task.isCompleted || false,
            createdAt: task.createdAt || new Date().toISOString(),
            isImportant: task.isImportant || false,
            color: task.color || TASK_COLORS.find(c => c.name === "Yellow")?.bg || TASK_COLORS[0].bg,
        }));
        setTasks(tasksWithDefaults);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to localStorage:", error);
      }
    }
  }, [tasks, isLoading]);

  const simulateApiCall = <T,>(action: () => T, duration = 300): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = action();
        resolve(result);
      }, duration);
    });
  };

  const addTask = useCallback(async (taskData: TaskInputData) => {
    setIsLoading(true);
    await simulateApiCall(() => {
      const newTask: Task = {
        id: Date.now(),
        title: taskData.title,
        description: taskData.description || "",
        isCompleted: false,
        dueDate: taskData.dueDate || undefined,
        isImportant: taskData.isImportant || false,
        createdAt: new Date().toISOString(),
        color: taskData.color || TASK_COLORS.find(c => c.name === "Yellow")?.bg || TASK_COLORS[0].bg,
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    });
    setIsLoading(false);
    toast.success(`Задача "${taskData.title}" добавлена!`);
  }, []);

  const editTask = useCallback(async (id: number, taskData: TaskInputData) => {
    setIsLoading(true);
    let originalTitle = "";
    await simulateApiCall(() => {
      setTasks((prevTasks) => {
        const taskToEdit = prevTasks.find(task => task.id === id);
        if (taskToEdit) originalTitle = taskToEdit.title;

        return prevTasks.map((task) =>
          task.id === id
            ? { 
                ...task,
                title: taskData.title,
                description: taskData.description !== undefined ? taskData.description : task.description,
                dueDate: taskData.dueDate !== undefined ? (taskData.dueDate || undefined) : task.dueDate,
                isImportant: taskData.isImportant !== undefined ? taskData.isImportant : task.isImportant,
                color: taskData.color !== undefined ? taskData.color : task.color,
              }
            : task
        );
      });
    });
    setIsLoading(false);
    toast.success(`Задача "${originalTitle}" обновлена на "${taskData.title}"!`);
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    setIsLoading(true);
    let deletedTaskTitle = "";
    await simulateApiCall(() => {
      setTasks((prevTasks) => {
        const taskToDelete = prevTasks.find(task => task.id === id);
        if (taskToDelete) deletedTaskTitle = taskToDelete.title;
        return prevTasks.filter((task) => task.id !== id);
      });
    });
    setIsLoading(false);
    if (deletedTaskTitle) toast.success(`Задача "${deletedTaskTitle}" удалена.`);
  }, []);

  const toggleTaskCompletion = useCallback(async (id: number) => {
    setIsLoading(true);
    let taskTitle = "";
    let newStatus = false;
    await simulateApiCall(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            taskTitle = task.title;
            newStatus = !task.isCompleted;
            return { ...task, isCompleted: newStatus };
          }
          return task;
        })
      );
    });
    setIsLoading(false);
    if (taskTitle) toast.info(`Задача "${taskTitle}" отмечена как ${newStatus ? 'выполненная' : 'невыполненная'}.`);
  }, []);

  const getTaskById = useCallback((id: number) => {
    return tasks.find((task) => task.id === id);
  }, [tasks]);

  const deleteCompletedTasks = useCallback(async () => {
    setIsLoading(true);
    let count = 0;
    await simulateApiCall(() => {
      setTasks((prevTasks) => {
        const activeTasks = prevTasks.filter(task => !task.isCompleted);
        count = prevTasks.length - activeTasks.length;
        return activeTasks;
      });
    });
    setIsLoading(false);
    if (count > 0) {
        toast.success(`${count} выполненных задач удалено.`);
    } else {
        toast.info("Нет выполненных задач для удаления.");
    }
  }, []);

  const deleteAllTasks = useCallback(async () => {
    setIsLoading(true);
    const count = tasks.length;
    await simulateApiCall(() => {
      setTasks([]);
    });
    setIsLoading(false);
    if (count > 0) {
        toast.success(`Все ${count} задач удалены.`);
    } else {
        toast.info("Список задач уже пуст.");
    }
  }, [tasks.length]); 

  const value = {
    tasks,
    isLoading,
    error,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    getTaskById,
    deleteCompletedTasks,
    deleteAllTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};