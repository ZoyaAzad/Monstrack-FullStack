import { CheckCircle, Circle, Calendar, Tag, Trash2, Edit2 } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
    const { id, title, domain, xp, verified, dueDate, completed } = task;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={clsx(
                "group relative flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-md",
                completed
                    ? "border-gray-200 bg-gray-50 opacity-75 dark:border-gray-800 dark:bg-gray-900/50"
                    : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            )}
        >
            <button
                onClick={() => onToggleComplete(id)}
                className="flex-shrink-0 text-gray-400 hover:text-primary transition-colors"
                aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
            >
                {completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                    <Circle className="h-6 w-6" />
                )}
            </button>

            <div className="flex-grow min-w-0">
                <h4 className={clsx(
                    "truncate text-base font-medium",
                    completed ? "text-gray-500 line-through" : "text-gray-900 dark:text-white"
                )}>
                    {title}
                </h4>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" /> {domain}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {dueDate}
                    </span>
                    {verified && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Verified
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary">+{xp} XP</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1 text-gray-400 hover:text-blue-500"
                        aria-label="Edit task"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                        aria-label="Delete task"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
