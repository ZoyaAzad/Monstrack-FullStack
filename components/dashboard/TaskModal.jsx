import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { domains } from '../../lib/mockData';

export default function TaskModal({ isOpen, onClose, onSave, initialData }) {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        domain: domains[0],
        xp: 50,
        dueDate: '',
        verified: false,
    });
    
    useEffect(() => {
    if (initialData) {
        setFormData({
            title: initialData.title ?? '',
            domain: initialData.domain ?? domains[0],
            xp: initialData.xpReward ?? 50,
            dueDate: initialData.dueDate
                ? initialData.dueDate.split('T')[0]
                : new Date().toISOString().split('T')[0],
            verified: initialData.verified ?? false,
        });
    } else {
        setFormData({
            title: '',
            domain: domains[0],
            xp: 50,
            dueDate: new Date().toISOString().split('T')[0],
            verified: false,
        });
    }
}, [initialData, isOpen]);


    if (!isOpen) return null;

    const handleSubmit = async () => {
        setError(null);

        try {
            await updateTask(task.id, formData);
            onClose();
        } catch (err) {
            if (err.response?.status === 400) {
            setError(err.response.data.message);
            } else {
            setError("Something went wrong. Try again.");
            }
        }
};


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {initialData ? 'Edit Task' : 'New Task'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                     {error && (
                        <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
                            {error}
                        </div>
                        )}

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            disabled={initialData?.completed}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g. Read 30 mins"
                        />
                        {initialData?.completed && (
                            <p className="text-xs text-gray-400 mt-1">
                                XP cannot be changed after task completion
                            </p>
                         )}

                    </div>
                        
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Domain</label>
                            <select
                                value={formData.domain}
                                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                {domains.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">XP Reward</label>
                            <input
                                type="number"
                                min="10"
                                max="500"
                                step="10"
                                value={formData.xp}
                                onChange={(e) => setFormData({ ...formData, xp: Number(e.target.value) })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                        <input
                            type="date"
                            required
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="verified"
                            checked={formData.verified}
                            onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="verified" className="text-sm text-gray-700 dark:text-gray-300">
                            Verified Task (Requires proof)
                        </label>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
