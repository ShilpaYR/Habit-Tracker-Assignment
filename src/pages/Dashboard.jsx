// Dashboard Page - Main Application View
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getHabits } from '../firebase/habits';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import WeeklyStats from '../components/WeeklyStats';
import MotivationCard from '../components/MotivationCard';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        if (!currentUser) return;

        // Subscribe to habits for statistics
        const unsubscribe = getHabits(currentUser.uid, (habitsData) => {
            setHabits(habitsData);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="glass-card p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">
                            🌊 HabitFlow
                        </h1>
                        <p className="text-white/70 text-sm">
                            Welcome, {currentUser?.email}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="glass-button"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto space-y-6">
                {/* Habit Form */}
                <HabitForm />

                {/* Statistics and Motivation Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WeeklyStats habits={habits} />
                    <MotivationCard habits={habits} />
                </div>

                {/* Habits List */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Your Habits</h2>
                    <HabitList />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
