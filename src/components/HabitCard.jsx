// Individual Habit Card Component
import { useState } from 'react';
import { deleteHabit, toggleCompletion } from '../firebase/habits';
import { useAuth } from '../hooks/useAuth';
import { getWeeklyCompletionCount, isCompletedToday, getTodayString } from '../utils/statsCalculator';

const HabitCard = ({ habit }) => {
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    const completedToday = isCompletedToday(habit);
    const weeklyCount = getWeeklyCompletionCount(habit);

    const handleToggleComplete = async () => {
        try {
            setLoading(true);
            const today = getTodayString();
            await toggleCompletion(currentUser.uid, habit.id, today, completedToday);
        } catch (error) {
            console.error('Error toggling completion:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete "${habit.title}"?`)) {
            return;
        }

        try {
            setLoading(true);
            await deleteHabit(currentUser.uid, habit.id);
        } catch (error) {
            console.error('Error deleting habit:', error);
            alert('Failed to delete habit. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="glass-card-purple p-6 animate-fade-in hover:scale-[1.02] transition-transform duration-200">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{habit.title}</h3>
                    {habit.description && (
                        <p className="text-white/70 text-sm">{habit.description}</p>
                    )}
                </div>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="glass-button-danger text-xs px-3 py-1 ml-2"
                    title="Delete habit"
                >
                    Delete
                </button>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="text-white/80 text-sm">
                    <span className="font-semibold text-glass-purple-dark">{weeklyCount}/7</span> this week
                </div>

                <button
                    onClick={handleToggleComplete}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${completedToday
                            ? 'bg-glass-green/50 border border-glass-green text-white'
                            : 'glass-button-primary'
                        }`}
                >
                    {loading ? '...' : completedToday ? '✓ Completed' : 'Mark Complete'}
                </button>
            </div>
        </div>
    );
};

export default HabitCard;
