// src/components/TaskTable.tsx
import React from 'react';
import { Table, Button, Switch, Popconfirm, notification } from 'antd';
import { Task } from '../types/Task';
import { deleteTask, updateTask } from '../api/taskApi';

interface TaskTableProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onUpdateTask: (id: number, task: Partial<Task>) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onDeleteTask, onUpdateTask }) => {
  console.log(tasks)
  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      onDeleteTask(id);
      notification.success({ message: 'Task deleted successfully!' });
    } catch (error) {
      notification.error({ message: 'Failed to delete task' });
    }
  };

  const handleStatusChange = async (id: number, checked: boolean) => {
    try {
      const updatedTask = await updateTask(id, { status: checked });
      onUpdateTask(id, updatedTask);
      notification.success({ message: 'Task status updated' });
    } catch (error) {
      notification.error({ message: 'Failed to update task status' });
    }
  };

  const columns = [
    {
      title: 'Task Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <span style={{ fontWeight: '600', color: '#333' }}>{text}</span>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text: string) => (
        <span style={{ color: text === 'High' ? '#e74c3c' : text === 'Medium' ? '#f39c12' : '#2ecc71' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (text: string) => (
        <span style={{ color: '#555' }}>{new Date(text).toLocaleDateString()}</span>
      ),
    },
    {
      title: 'Status',
      render: (text: string, record: Task) => (
        <Switch
          checked={record.status}
          onChange={(checked) => handleStatusChange(record.id, checked)}
          style={{
            backgroundColor: record.status ? '#4caf50' : '#f44336',
            borderColor: record.status ? '#4caf50' : '#f44336',
          }}
        />
      ),
    },
    {
      title: 'Actions',
      render: (_: any, record: Task) => (
        <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
          <Button
            danger
            style={{
              backgroundColor: '#e74c3c',
              borderColor: '#e74c3c',
              color: '#fff',
              padding: '6px 12px',
              fontSize: '14px',
            }}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
      }}
    />
  );
};

export default TaskTable;
