import React from 'react';
import { Card, Checkbox, Button, Popover } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { handleDelete } from '../utils/taskActions'; 
import moment from 'moment';

const TaskItem = ({ task, toggleComplete, deleteTask, editTask }) => {
  
  // Determine the class name based on task state
  const getCardClassName = () => {
    if (task.completed) return 'task-card complete'; // Complete
    if (!task.endDate || new Date(task.endDate) > new Date()) return 'task-card pending'; // Pending
    return 'task-card incomplete'; // Incomplete
  };

  const calculateDateDifference = (endDate) => {
    if(endDate==null) return "N/A";

    const end = new Date(endDate);

    if(end.getTime() < moment().toDate()) return 0;
    
    const differenceInTime = end.getTime() - moment().toDate(); // Difference in milliseconds
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
    console.log(differenceInDays);
    return differenceInDays;
  };
  const daysRemaining = calculateDateDifference( task.endDate);
  const content = ( 
    <div>
      <p>{daysRemaining} days remaining</p>
    </div>
  );
  return (
    <Popover title ={task.name} content = {content} placement='top' >
    <Card
      className={getCardClassName()}
      title={task.name}
      extra={
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={editTask}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(task.id, deleteTask)}
          />
        </div>
      }
      style={{ marginBottom: 16 }}
    >
      <div>
        <strong>Start Date:</strong> {task.startDate ? new Date(task.startDate).toLocaleDateString() : 'N/A'}
      </div>
      <div>
        <strong>End Date:</strong> {task.endDate ? new Date(task.endDate).toLocaleDateString() : 'N/A'}
      </div>
      <div>
        <strong>Priority:</strong> {task.priority}
      </div>
      <div style={{ marginTop: 16 }}>
        <Checkbox
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        >
          {task.completed ? 'Completed' : 'Mark as Complete'}
        </Checkbox>
      </div>
    </Card>
    </Popover>
  );
};

export default TaskItem;
