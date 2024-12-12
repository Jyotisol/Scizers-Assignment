// src/components/TaskList.tsx
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/TaskTable';
import { getTasks } from '../api/taskApi';
import { Task } from '../types/Task';
import { notification } from 'antd';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from the mock API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        notification.error({ message: 'Failed to load tasks' });
      }
    };
    fetchTasks();
  }, []);

  // Add a new task to the list
  const handleAddTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Delete a task by filtering out the deleted task from the list
  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Update task status or other fields
  const handleUpdateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        Task Management
      </h1>
      <div
        style={{
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #e6e6e6',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
        }}
      >
        <TaskForm onAddTask={handleAddTask} />
      </div>
      <div
        style={{
          padding: '10px',
          border: '1px solid #e6e6e6',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
        }}
      >
        <TaskTable
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  );
};

export default TaskList;
