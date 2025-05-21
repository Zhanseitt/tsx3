"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Task } from "@/@types/task"; 

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  editTask: (id: number, newTitle: string, newIsCompleted?: boolean) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number) => void; 
  isLoading: boolean; 
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

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("TasksProvider: Попытка загрузки задач из localStorage");
    try {
      const storedTasks = localStorage.getItem("todo-app-tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
        console.log("TasksProvider: Задачи загружены из localStorage", JSON.parse(storedTasks));
      } else {
        console.log("TasksProvider: Задачи в localStorage не найдены, инициализация пустым списком.");
        setTasks([]); 
      }
    } catch (error) {
      console.error("TasksProvider: Ошибка при чтении из localStorage", error);
      setTasks([]); 
    } finally {
      setIsLoading(false); 
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        console.log("TasksProvider: Сохранение задач в localStorage", tasks);
        localStorage.setItem("todo-app-tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("TasksProvider: Ошибка при записи в localStorage", error);
      }
    }
  }, [tasks, isLoading]);


  const addTask = (title: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newTask: Task = { 
        id: Date.now(), 
        title,
        isCompleted: false
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setIsLoading(false);
      alert("Задача добавлена!");
    }, 300);
  };

  const editTask = (id: number, newTitle: string, newIsCompleted?: boolean) => {
    setIsLoading(true);
    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, title: newTitle, isCompleted: newIsCompleted !== undefined ? newIsCompleted : task.isCompleted } : task
        )
      );
      setIsLoading(false);
      alert("Задача обновлена!");
    }, 300);
  };

  const deleteTask = (id: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setIsLoading(false);
    }, 300);
  };

  const toggleTaskCompletion = (id: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
      setIsLoading(false);
    }, 300);
  };

  const value = {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    isLoading,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};