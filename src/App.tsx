import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import { getTasks } from './api/taskApi';
import { Task } from './types/Task';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks();
      setTasks(tasksData);
    };
    fetchTasks();
  }, []);

  const handleAddTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <TaskTable tasks={tasks} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask} />
    </div>
  );
};

export default App;
