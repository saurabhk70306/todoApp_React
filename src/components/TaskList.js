import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import { Button, Select, Progress} from 'antd';
import TaskItem from './TaskItem';

const { Option } = Select;

const TaskList = ({ tasks, toggleComplete, deleteTask }) => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('priority');
  const navigate = useNavigate();  // Get the navigate function from useNavigate

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed && (!task.endDate || new Date(task.endDate) > new Date());
    if (filter === 'incomplete') return !task.completed && task.endDate && new Date(task.endDate) < new Date();
    return false;
  });

  // Sort tasks based on the selected sort option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Default': 3, 'Low': 4 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sort === 'endDate') {
      if (!a.endDate) return 1;
      if (!b.endDate) return -1;
      return new Date(a.endDate) - new Date(b.endDate);
    }
    if (sort === 'startDate') {
      if (!a.startDate) return 1;
      if (!b.startDate) return -1;
      return new Date(a.startDate) - new Date(b.startDate);
    }
    return 0;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed && (!task.endDate || new Date(task.endDate) > new Date())).length;
  const incompleteTasks = tasks.filter(task => !task.completed && task.endDate && new Date(task.endDate) < new Date()).length;
  const completionPercentage = totalTasks === 0 ? 0 : (completedTasks/totalTasks)*100;
  const pendingPercentage = totalTasks === 0 ? 0 : (pendingTasks / totalTasks) * 100;
  const incompletePercentage = totalTasks === 0 ? 0 : (incompleteTasks / totalTasks) * 100;


  return (
    <div>
      <Button id="add-task-button" type="primary" onClick={() => navigate('/add')}>Add Task</Button>
      <div className ="stats">
        <div>
        Total Tasks: {totalTasks}
        </div>
        <div>
        Completed Tasks: {completedTasks} ({completedTasks}/{totalTasks})
        <Progress
        percent = {completionPercentage + pendingPercentage}
        success = {{percent:completionPercentage}}
        strokeColor={[
          {color : '#52b788', percent: completionPercentage},
          {color : '#00b4d8', percent: pendingPercentage},
          {color : '#c9c9c9', percent: incompletePercentage },
        ]}
        showInfo={false}
      />
        </div>
      </div>
      <div className= "arrange-items">
        <div className="filter-task">
        <Select defaultValue="all" onChange={(value) => setFilter(value)}>
          <Option value="all">Show All</Option>
          <Option value="completed">Completed</Option>
          <Option value="pending">Pending</Option>
          <Option value="incomplete">Incomplete</Option>
        </Select>
        </div>
        <div className="sort-task">
        <Select defaultValue="startDate" onChange={(value) => setSort(value)}>
          <Option value="priority">Sort by Priority</Option>
          <Option value="endDate">Sort by End Date</Option>
          <Option value="startDate">Sort by Start Date</Option>
        </Select>
        </div>
      </div>
      <div className="task-list">
        {sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            editTask={() => navigate(`/edit/${task.id}`)} 
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
