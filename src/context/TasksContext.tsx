"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { Task } from "@/@types/task"; 

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
  deleteTask: (id: number) => Promise<void>;
  toggleTaskCompletion: (id: number) => Promise<void>;
  getTaskById: (id: number) => Task | undefined;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

interface TasksProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = "todo-app-tasks-v3"; 

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
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
            color: task.color || "bg-white",
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

  const simulateApiCall = <T,>(action: () => T): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = action();
        resolve(result);
      }, 300);
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
        color: taskData.color || "bg-yellow-100",
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });
    setIsLoading(false);
  }, []);

  const editTask = useCallback(async (id: number, taskData: TaskInputData) => {
    setIsLoading(true);
    await simulateApiCall(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { 
                ...task,
                title: taskData.title,
                description: taskData.description || task.description, 
                dueDate: taskData.dueDate || task.dueDate,
                isImportant: taskData.isImportant !== undefined ? taskData.isImportant : task.isImportant,
              }
            : task
        )
      );
    });
    setIsLoading(false);
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    setIsLoading(true);
    await simulateApiCall(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
    setIsLoading(false);
  }, []);

  const toggleTaskCompletion = useCallback(async (id: number) => {
    setIsLoading(true);
    await simulateApiCall(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
    });
    setIsLoading(false);
  }, []);

  const getTaskById = useCallback(
    (id: number) => {
      return tasks.find((task) => task.id === id);
    },
    [tasks] 
  );

  const value = {
    tasks,
    isLoading,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    getTaskById,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};