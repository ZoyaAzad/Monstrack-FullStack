'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useDemoData } from '../../hooks/useDemoData';
import TaskCard from '../../components/dashboard/TaskCard';
import TaskModal from '../../components/dashboard/TaskModal';
import { Plus } from 'lucide-react';
import { useTasksBackend } from '../../hooks/useTasksBackend';

export default function TasksPage() {
    const { user, loading, isDemo,updateUser } = useAuth();

    const demo = useDemoData();
    const real = useTasksBackend(user?.id);

    const {
    tasks,
    addTask,
    deleteTask,
    toggleComplete,
    updateTask
    } = isDemo ? demo : real;

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('all'); // all, active, completed

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const handleSaveTask = async (taskData) => {
        if (editingTask) {
            updateTask(editingTask.id, taskData);
        } else {
            addTask(taskData);
        }

        setEditingTask(null);
        setIsModalOpen(false);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            deleteTask(id);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    return (
        <div className="container-center py-12">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your daily quests.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                    <Plus className="h-5 w-5" /> New Task
                </button>
            </div>

            <div className="mb-6 flex gap-2 border-b border-gray-200 pb-1 dark:border-gray-700">
                {['all', 'active', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${filter === f
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">No tasks found. Create one to get started!</div>
                ) : (
                    filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggleComplete={() =>
                                isDemo
                                ? demo.updateTask(task.id, { completed: !task.completed })
                                : toggleComplete(task, updateUser)
                            }
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />


                    ))
                )}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveTask}
                initialData={editingTask}
            />
        </div>
    );
}
