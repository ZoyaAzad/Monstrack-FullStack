import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, CheckCircle2, Circle } from 'lucide-react';

export default function TasksWidget({ tasks, onAddTask, onToggleTask, onDeleteTask }) {
    const [activeTab, setActiveTab] = useState('todo'); // 'todo', 'daily', 'habit'
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const filteredTasks = tasks.filter(t => t.type === activeTab);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        onAddTask(newTaskTitle, activeTab);
        setNewTaskTitle('');
    };

    const tabs = [
        { id: 'todo', label: 'To-Dos', color: 'text-pink-500 bg-pink-50' },
        { id: 'daily', label: 'Dailies', color: 'text-emerald-500 bg-emerald-50' },
        { id: 'habit', label: 'Habits', color: 'text-indigo-500 bg-indigo-50' },
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-[400px]">
            {/* Header */}
            {/* Header */}
            <div className="flex items-center justify-center mb-6">
                <div className="flex gap-1 bg-gray-50 p-1 rounded-xl w-full">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input */}
            <form onSubmit={handleAdd} className="relative mb-6">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder={`Add a new ${activeTab}...`}
                    className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-4 pr-12 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
                <button
                    type="submit"
                    disabled={!newTaskTitle.trim()}
                    className="absolute right-2 top-2 p-1.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                    <Plus size={16} strokeWidth={3} />
                </button>
            </form>

            {/* List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                <AnimatePresence mode='popLayout'>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`group flex items-center justify-between p-3 rounded-2xl border transition-all ${task.completed
                                    ? 'bg-gray-50 border-transparent opacity-60'
                                    : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => onToggleTask(task)}
                                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${task.completed
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'
                                            }`}
                                    >
                                        {task.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                    </button>
                                    <div>
                                        <p className={`text-sm font-bold transition-all ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                                            }`}>
                                            {task.title}
                                        </p>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${task.completed ? 'text-gray-300' : 'text-indigo-400'
                                            }`}>
                                            +{task.xpReward} XP
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onDeleteTask(task.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </motion.div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-4 opacity-50">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                <Check size={20} className="text-gray-400" />
                            </div>
                            <p className="text-sm font-bold text-gray-400">No active {activeTab}s</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative Background Blob */}
            <div className="absolute -left-6 -bottom-6 h-32 w-32 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        </div>
    );
}
