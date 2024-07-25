import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import TaskList from './components/TaskList';
import { getTasksFromLocalStorage, saveTasksToLocalStorage, updateTaskStatus } from './utils/taskUtils';
import { addTask as addTaskUtil, editTask as editTaskUtil, deleteTask as deleteTaskUtil, toggleComplete as toggleCompleteUtil } from './utils/taskActions';
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState(() => getTasksFromLocalStorage());

  // Function to load tasks from local storage
  useEffect(() => {
    // Initial task status update and load tasks
    updateTaskStatus();
    setTasks(getTasksFromLocalStorage);

    // Set up the timer to update tasks every hour
    const intervalId = setInterval(() => {
      updateTaskStatus();
      setTasks(getTasksFromLocalStorage);
    }, 3600000); // 3600000 ms = 1 hour

    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    saveTasksToLocalStorage(tasks); // Save tasks to local storage whenever tasks change
  }, [tasks]);

  const addTask = (task) => {
    setTasks(prevTasks => addTaskUtil(prevTasks, task));
  };

  const editTask = (updatedTask) => {
    setTasks(prevTasks => editTaskUtil(prevTasks, updatedTask));
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => deleteTaskUtil(prevTasks, id));
  };

  const toggleComplete = (id) => {
    setTasks(prevTasks => toggleCompleteUtil(prevTasks, id));
  };

  return (
      <div className="App">
        <Routes>
          <Route path="/add" element={<AddTaskForm addTask={addTask} />} />
          <Route path="/edit/:id" element={<EditTaskForm tasks={tasks} editTask={editTask} />} />
          <Route path="/" element={<TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />} />
        </Routes>
      </div>
  );
};

export default App;
