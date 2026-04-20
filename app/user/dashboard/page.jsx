"use client";
import { useGame } from '../../../context/GameContext';
import { useAuth } from '../../../hooks/useAuth';
import ChartXP from '../../../components/dashboard/ChartXP';
import ChartDonut from '../../../components/dashboard/ChartDonut';
import MonsterCard from '../../../components/dashboard/MonsterCard';
import TotalXPIcon from '../../../components/dashboard/icons/TotalXPIcon';
import LevelIcon from '../../../components/dashboard/icons/LevelIcon';
import QuizzesIcon from '../../../components/dashboard/icons/QuizzesIcon';
import ScoreIcon from '../../../components/dashboard/icons/ScoreIcon';
import { levelToStage, xpToStage } from '../../../utils/xpMath';


import { useState, useEffect } from 'react';
import apiClient from '../../../lib/apiClient';

import TasksWidget from '../../../components/dashboard/TasksWidget';

export default function DashboardPage() {
    const { stats } = useGame();
    const { user, setLocalUser } = useAuth(); // Use setLocalUser to sync XP
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);

    const fetchTasks = () => {
        if (user?.id) {
            apiClient.get(`/tasks/${user.id}`).then(res => {
                setTasks(res.data);
                setLoadingTasks(false);
            }).catch(e => console.error(e));
        }
    };

    const xp = user?.xp ?? 0;
    const level = user?.level ?? 1;
    const stage = levelToStage(level);

    // Transform history for ChartXP
    const labels = stats.history.length > 0 ? stats.history.map(h => h.date) : ['No Data'];
    const data = stats.history.length > 0 ? stats.history.map(h => h.xp) : [0];

    useEffect(() => {
        fetchTasks();
    }, [user]);

    const handleAddTask = async (title, type) => {
        try {
            const xpReward = type === 'todo' ? 50 : type === 'daily' ? 30 : 10;
            if (!user?.id) return;
            await apiClient.post(`/tasks/${user.id}`, {
                title,
                type,
                xp: xpReward
            });
            fetchTasks(); // Refresh list
        } catch (error) {
            console.error("Failed to add task", error);
            alert("Could not add task.");
        }
    };

    const handleToggleTask = async (task) => {
        try {
            const res = await apiClient.patch(`/tasks/${task.id}`, { completed: !task.completed });
            // If backend returns updated user with new XP, sync it!
            if (res.data.user) {
                // Determine if we need to merge with existing user data to not lose other fields?
                // The backend likely returns a subset or partial user if logic is complex, 
                // but simpler logic returns full object or just updated fields.
                // Step 862 shows it calls xpService.addXp which usually returns the updated user.

                // We need to match the structure useAuth expects. 
                // backend keys: id, email, xp, level...
                // useAuth expects: { id, email, level, xp, name, averageScore, quizzesTaken, history }
                // So we should merge.
                setLocalUser({ ...user, ...res.data.user });
            }
            fetchTasks();
        } catch (error) {
            console.error("Failed to toggle task", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!confirm("Delete this task?")) return;
        try {
            await apiClient.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    // Transform history for ChartXP to ensure at least 7 data points for a nice line
    let chartLabels = [];
    let chartData = [];

    if (stats.history.length > 0) {
        // If we have history, use it. But if it's just 1 point, let's pad the previous days with 0.
        // Or if it's < 7 points, pad previous days.
        const historyMap = new Map(stats.history.map(h => [h.date, h.xp]));

        // Generate last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString(); // e.g., "12/28/2025" or however it was saved

            // Note: stats.history depends on how it was saved (toLocaleDateString defaults vary by locale).
            // For simplicity, we assume strict string matching or we just show what we have + zeroes.
            // A safer robust way for visual purposes:

            chartLabels.push(dateStr);
            chartData.push(historyMap.get(dateStr) || 0);
        }
    } else {
        // No data at all, show empty flat line for last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            chartLabels.push(d.toLocaleDateString());
            chartData.push(0);
        }
    }

    // Real Data for donuts
    const habitCount = tasks.filter(t => t.type === 'habit').length;
    const dailyCount = tasks.filter(t => t.type === 'daily').length;
    const todoCount = tasks.filter(t => t.type === 'todo').length;

    // Fallback simply so chart isn't empty if user has 0 tasks
    const hasTasks = tasks.length > 0;
    const taskBreakdownData = hasTasks ? [habitCount, dailyCount, todoCount] : [1, 1, 1];
    const taskBreakdownLabels = ['Habits', 'Dailies', 'To-Dos'];

    // Dynamic Mood Data
    // We assume 'Positive' correlates with average score, and 'Needs Focus' is the remainder.
    // Default to 50/50 if no quizzes taken yet to avoid an empty chart or confusing 0/100 split.
    const hasQuizzes = stats.quizzesTaken > 0;
    const moodData = hasQuizzes
        ? [Math.round(stats.averageScore), Math.max(0, 100 - Math.round(stats.averageScore))]
        : [50, 50];
    const moodLabels = ['Positive', 'Needs Focus'];

    return (
        <div className="space-y-6 lg:space-y-8">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 font-bold">{user?.name || 'Hunter'}</span>!
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                    <span className="text-2xl">📅</span>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Today</span>
                        <span className="text-sm font-bold text-gray-900">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>
            </header>

            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total XP" value={user?.xp ?? 0} color="bg-blue-500" Icon={TotalXPIcon} />
                <StatsCard title="Level" value={user?.level ?? 1} color="bg-purple-500" Icon={LevelIcon} />
                <StatsCard title="Quizzes Taken" value={stats.quizzesTaken} color="bg-orange-500" Icon={QuizzesIcon} />
                <StatsCard title="Avg Score" value={Math.round(stats.averageScore) + '%'} color="bg-green-500" Icon={ScoreIcon} />
            </div>

            {/* Donut Charts & Task Manager Section */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="h-[400px]">
                    <ChartDonut
                        title="Task Breakdown"
                        labels={taskBreakdownLabels}
                        data={taskBreakdownData}
                        colors={['#818CF8', '#34D399', '#F472B6']}
                    />
                </div>
                <div className="h-[400px]">
                    <ChartDonut
                        title="Mood Analysis"
                        labels={moodLabels}
                        data={moodData}
                        colors={['#FCD34D', '#F87171']}
                    />
                </div>
                {/* Placeholder for 3rd or filler */}
                <TasksWidget
                    tasks={tasks}
                    onAddTask={handleAddTask}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                />
            </div>

            {/* Main Activity and Monster Section - Moved Below */}
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 min-h-[400px]">
                    <ChartXP labels={chartLabels} data={chartData} />
                </div>
                <div className="lg:col-span-1 h-full">
                    {/* Using Modern Variant for Dashboard */}
                    <MonsterCard
                        stage={stage}
                        level={level}
                        xp={xp}
                        name={
                            stage >= 4
                                ? 'Golden Guardian'
                                : stage >= 3
                                    ? 'Rising Rogue'
                                    : 'Standard Scout'
                        }
                        variant="modern"
                    />

                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, color, Icon }) {
    const colorClasses = {
        'bg-blue-500': 'text-blue-500 bg-blue-50 ring-blue-100',
        'bg-purple-500': 'text-purple-500 bg-purple-50 ring-purple-100',
        'bg-orange-500': 'text-orange-500 bg-orange-50 ring-orange-100',
        'bg-green-500': 'text-green-500 bg-green-50 ring-green-100',
    };
    const theme = colorClasses[color] || 'text-gray-500 bg-gray-50 ring-gray-100';

    return (
        <div className="bg-white p-6 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-between overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
            {/* Decorative Background Blob */}
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 ${theme.split(' ')[1].replace('bg-', 'bg-')}`} />

            <div className="relative z-10">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
            </div>

            {Icon && (
                <div className="h-16 w-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <div className="h-12 w-12">
                        <Icon />
                    </div>
                </div>
            )}

            {!Icon && <div className={`h-12 w-1 bg-gradient-to-b from-transparent ${color} to-transparent rounded-full opacity-50`} />}
        </div>
    );
}
