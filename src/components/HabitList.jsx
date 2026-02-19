// Habit List Component
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getHabits } from '../firebase/habits';
import HabitCard from './HabitCard';

const HabitList = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) return;

        // Subscribe to real-time habit updates
        const unsubscribe = getHabits(currentUser.uid, (habitsData) => {
            setHabits(habitsData);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="glass-card p-8 text-center">
                <div className="text-white text-lg animate-pulse">Loading habits...</div>
            </div>
        );
    }

    if (habits.length === 0) {
        return (
            <div className="glass-card p-12 text-center animate-fade-in">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold text-white mb-2">No habits yet</h3>
                <p className="text-white/70">Create your first habit above to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
            ))}
        </div>
    );
};

export default HabitList;
