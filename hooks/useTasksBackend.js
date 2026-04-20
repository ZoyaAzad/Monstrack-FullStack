"use client";
import { useEffect, useState } from 'react';
import apiClient from '../lib/apiClient';

export function useTasksBackend(userId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    apiClient.get(`/tasks/${userId}`)
      .then(res => setTasks(res.data))
      .finally(() => setLoading(false));
  }, [userId]);

  const addTask = async (taskData) => {
    const res = await apiClient.post(`/tasks/${userId}`, taskData);
    setTasks(prev => [...prev, res.data]);
  };

  const updateTask = async (id, updates) => {
  try {
    const res = await apiClient.patch(`/tasks/${id}`, updates);

    setTasks(prev =>
      prev.map(t =>
        t.id === id ? res.data.task : t
      )
    );

    return { success: true };
  } catch (err) {
    if (err.response?.status === 400) {
      return {
        success: false,
        message: err.response.data.message,
      };
    }

    return {
      success: false,
      message: 'Something went wrong. Try again.',
    };
  }
};


  const toggleComplete = async (task, onUserUpdate) => {
  const res = await apiClient.patch(`/tasks/${task.id}`, {
    completed: !task.completed,
  });

  setTasks(prev =>
    prev.map(t =>
      t.id === res.data.task.id ? res.data.task : t
    )
  );

  // sync XP into auth state
  if (res.data.user && onUserUpdate) {
    onUserUpdate(res.data.user);
  }
};

  const deleteTask = async (id) => {
    await apiClient.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, loading, addTask, toggleComplete, deleteTask,updateTask };
}
