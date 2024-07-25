export const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add the getUniqueId function
export const getUniqueId = () => {
  return `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};


export const updateTaskStatus = () => {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.map(task => {
    if (task.endDate && new Date(task.endDate) < new Date()) {
      return { ...task, completed: false }; // Mark as incomplete if end date is past
    }
    return task;
  });
  saveTasksToLocalStorage(updatedTasks);
};