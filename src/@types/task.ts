export interface Subtask {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: string;    
  isImportant?: boolean;
  createdAt: string;   
  color?: string;
}