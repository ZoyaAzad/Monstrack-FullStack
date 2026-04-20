import MonsterCard from './MonsterCard';
import ChartXP from './ChartXP';
import { motion } from 'framer-motion';

export default function DashboardPreview({ user }) {
    if (!user) return null;

    const { monsterState, xpHistory } = user;
    const labels = xpHistory.map(h => h.date);
    const data = xpHistory.map(h => h.xp);

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <MonsterCard
                    stage={monsterState.stage}
                    xp={monsterState.xp}
                    level={monsterState.level}
                    name={monsterState.name}
                />
            </div>
            <div className="lg:col-span-2">
                <ChartXP labels={labels} data={data} />
            </div>
        </div>
    );
}
