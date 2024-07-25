import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, DatePicker, Select, Button, message, drawer } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const { Option } = Select;

const AddTaskForm = ({ addTask }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

 
  const onFinish = (values) => {

    const startDate = values.startDate ? moment(values.startDate).toDate() : moment().toDate();
    const endDate = values.endDate ? moment(values.endDate).toDate() : null;

    if (endDate && endDate < startDate) {
      message.error('End date cannot be before start date');
      return;
    }

    const newTask = {
      id: uuidv4(),
      name: values.name,
      startDate: values.startDate ? values.startDate.toISOString() : new Date().toISOString(),
      endDate: values.endDate ? values.endDate.toISOString() : null,
      priority: values.priority || 'Default',
      completed: false
    };
    addTask(newTask);
    navigate('/');
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="name" rules={[{ required: true, message: 'Please input the task name!' }]}>
        <Input placeholder="Task Name" />
      </Form.Item>
      <Form.Item name="startDate">
        <DatePicker placeholder="Start Date" />
      </Form.Item>
      <Form.Item name="endDate">
        <DatePicker placeholder="End Date" />
      </Form.Item>
      <Form.Item name="priority">
        <Select placeholder="Priority">
          <Option value="Default">Default</Option>
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Save Task</Button>
        <Button type="default" onClick={() => navigate('/')}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default AddTaskForm;
