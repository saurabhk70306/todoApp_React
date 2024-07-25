// src/utils/taskActions.js
import { message } from 'antd';


// Utility function to add a task
export const addTask = (tasks, task) => {
  return [...tasks, task];
};

// Utility function to edit a task
export const editTask = (tasks, updatedTask) => {
  return tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
};

// Utility function to delete a task
export const deleteTask = (tasks, id) => {
  return tasks.filter(task => task.id !== id);
};

// Utility function to toggle the completion status of a task
export const toggleComplete = (tasks, id) => {
  return tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
};


export const handleDelete = (taskId, deleteTask) => {
  if (window.confirm('Are you sure you want to delete this task?')) {
    deleteTask(taskId);
    message.success('Task deleted successfully');
  }
};
