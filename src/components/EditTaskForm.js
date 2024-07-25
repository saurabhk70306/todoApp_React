import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, DatePicker, Select, Button, message } from 'antd';
import moment from 'moment';

const { Option } = Select;

const EditTaskForm = ({ tasks, editTask }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTask(taskToEdit);
      form.setFieldsValue({
        name: taskToEdit.name,
        startDate: taskToEdit.startDate ? moment(taskToEdit.startDate) : null,
        endDate: taskToEdit.endDate ? moment(taskToEdit.endDate) : null,
        priority: taskToEdit.priority
      });
    }
  }, [id, tasks, form]);

  const onFinish = (values) => {

    const startDate = values.startDate ? moment(values.startDate).toDate() : moment().toDate();
    const endDate = values.endDate ? values.endDate : null;

    if (endDate && endDate < startDate) {
      message.error('End date cannot be before start date');
      return;
    }

    const updatedTask = {
      ...task,
      name: values.name,
      startDate: values.startDate ? values.startDate.toISOString() : new Date().toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
      priority: values.priority || task.priority
    };
    editTask(updatedTask);
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

export default EditTaskForm;
