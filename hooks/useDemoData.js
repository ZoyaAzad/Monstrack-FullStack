import { useState, useEffect } from 'react';
import { demoUser } from '../lib/mockData';

export function useDemoData() {
    const [data, setData] = useState(demoUser);

    // Simulate data fetching or updates
    const updateTask = (taskId, updates) => {
        setData(prev => ({
            ...prev,
            tasks: prev.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
        }));
    };

    const addTask = (task) => {
        setData(prev => ({
            ...prev,
            tasks: [...prev.tasks, { ...task, id: `new-${Date.now()}` }]
        }));
    };

    const deleteTask = (taskId) => {
        setData(prev => ({
            ...prev,
            tasks: prev.tasks.filter(t => t.id !== taskId)
        }));
    };
    
    const toggleComplete = (task) => {
    updateTask(task.id, { completed: !task.completed });
    };

    return {
        user: data,
        tasks: data.tasks,
        xpHistory: data.xpHistory,
        monster: data.monsterState,
        updateTask,
        addTask,
        deleteTask,
        toggleComplete
    };
}
