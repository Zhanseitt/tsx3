"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { Task } from "@/@types/task";

type TasksContextType = {
  tasks: Task[];
  isLoading: boolean; 
  addTask: (title: string) => Promise<void>;
  editTask: (id: number, newTitle: string) => Promise<void>;
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

const LOCAL_STORAGE_KEY = "todo-app-tasks-v1";

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
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
    if (!isLoading && tasks.length >= 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to localStorage:", error);
      }
    }
  }, [tasks, isLoading]);

  const simulateApiCall = <T,>(action: () => T): Promise<T> => {
    return new Promise((resolve) => {
      setIsLoading(true);
      setTimeout(() => {
        const result = action();
        setIsLoading(false);
        resolve(result);
      }, 300); 
    });
  };

  const addTask = useCallback(async (title: string) => {
    await simulateApiCall(() => {
      const newTask: Task = { id: Date.now(), title, isCompleted: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });
  }, []);

  const editTask = useCallback(async (id: number, newTitle: string) => {
    await simulateApiCall(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      );
    });
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    await simulateApiCall(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
  }, []);

  const toggleTaskCompletion = useCallback(async (id: number) => {
    await simulateApiCall(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
    });
  }, []);

  const getTaskById = useCallback((id: number) => {
    return tasks.find(task => task.id === id);
  }, [tasks]);


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