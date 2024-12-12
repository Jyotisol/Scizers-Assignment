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
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
    },
    {
      title: 'Status',
      render: (text: string, record: Task) => (
        <Switch checked={record.status} onChange={(checked) => handleStatusChange(record.id, checked)} />
      ),
    },
    {
      title: 'Actions',
      render: (_: any, record: Task) => (
        <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return <Table columns={columns} dataSource={tasks} rowKey="id" pagination={{ pageSize: 5 }} />;
};

export default TaskTable;
