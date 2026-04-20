export const demoUser = {
    id: 'demo-user-123',
    name: 'Monster Tamer',
    email: 'tamer@monstrack.demo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    xpHistory: [
        { date: '2025-11-01', xp: 30 },
        { date: '2025-11-08', xp: 70 },
        { date: '2025-11-15', xp: 110 },
        { date: '2025-11-22', xp: 160 },
        { date: '2025-11-29', xp: 220 },
    ],
    tasks: [
        {
            id: 't1',
            title: 'Read 30 mins',
            domain: 'Learning',
            xp: 50,
            verified: true,
            dueDate: '2025-12-05',
            completed: false,
        },
        {
            id: 't2',
            title: 'Morning Jog',
            domain: 'Fitness',
            xp: 100,
            verified: false,
            dueDate: '2025-12-03',
            completed: true,
        },
        {
            id: 't3',
            title: 'Complete Project Module',
            domain: 'Work',
            xp: 150,
            verified: true,
            dueDate: '2025-12-10',
            completed: false,
        },
    ],
    monsterState: {
        stage: 2,
        xp: 220,
        level: 3,
        name: 'Standard Scout',
    },
};

export const domains = ['Fitness', 'Learning', 'Work', 'Health', 'Creativity'];
