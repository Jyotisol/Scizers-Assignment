import React from 'react';
import { Form, Input, Button, Select, DatePicker, Switch, notification } from 'antd';
import { Task } from '../types/Task';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const { Option } = Select;

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [form] = Form.useForm();
  const [priority, setPriority] = React.useState<string>('Medium');

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };
  const handleFormSubmit = (values: any) => {
    const newTask: Task = {
      title: values.title,
      priority: values.priority,
      dueDate: values.dueDate ? values.dueDate.format('YYYY_MM_DD') : '',
      status: values.status,
      id: 0
    };
    onAddTask(newTask);
    notification.success({ message: 'Task added successfully' });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      layout="vertical"
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '10px',
        border: '1px solid #d9d9d9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff'
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1890ff' }}>Add New Task</h2>

      <Form.Item
        label={<span style={{ fontWeight: 'bold', color: '#333' }}>Task Title</span>}
        name="title"
        rules={[{ required: true, message: 'Please enter task title' }]}
      >
        <Input style={{ padding: '10px', borderRadius: '4px' }} />
      </Form.Item>

      <Form.Item
        label={<span style={{ fontWeight: 'bold', color: '#333' }}>Priority</span>}
        name="priority"
        rules={[{ required: true, message: 'Please select priority' }]}
      >
        <Select
          defaultValue="Select"
          onChange={handlePriorityChange}
          style={{ width: '100%', padding: '5px', borderRadius: '4px' }}
        >
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={<span style={{ fontWeight: 'bold', color: '#333' }}>Due Date</span>}
        name="dueDate"
        rules={[{ required: true, message: 'Please select due date' }]}
      >
        <DatePicker style={{ width: '100%', padding: '10px', borderRadius: '4px' }} />
      </Form.Item>

      <Form.Item
        label={<span style={{ fontWeight: 'bold', color: '#333' }}>Status</span>}
        name="status"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
