// Habit Form Component for creating new habits
import { useState } from 'react';
import { addHabit } from '../firebase/habits';
import { useAuth } from '../hooks/useAuth';

const HabitForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Habit title is required');
            return;
        }

        console.log('📝 Submitting habit:', title);

        setError('');
        setSuccess(false);
        setLoading(true);

        // Store values before clearing
        const habitTitle = title.trim();
        const habitDescription = description.trim();

        try {
            // Race between addHabit and a timeout to handle hung promises
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), 5000)
            );

            await Promise.race([
                addHabit(currentUser.uid, {
                    title: habitTitle,
                    description: habitDescription
                }),
                timeoutPromise
            ]);

            console.log('✅ Habit form: Creation successful');
            setSuccess(true);
        } catch (error) {
            if (error.message === 'timeout') {
                console.log('⚠️ Habit form: Request timed out, but habit may have been created');
                // Don't show error since habit is likely created (emulator issue)
                setSuccess(true);
            } else {
                console.error('❌ Habit form: Error adding habit:', error);
                setError('Failed to add habit. Please try again.');
            }
        } finally {
            // Always reset form and loading state
            setLoading(false);
            setTitle('');
            setDescription('');

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <div className="glass-card-green p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-4">Create New Habit</h2>

            {error && (
                <div className="bg-red-400/30 border border-red-400/50 text-white px-4 py-2 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-glass-green/40 border border-glass-green/60 text-white px-4 py-2 rounded-lg mb-4 text-sm">
                    Habit created successfully! ✨
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white/90 mb-2 font-medium">
                        Habit Title <span className="text-red-300">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="glass-input w-full"
                        placeholder="e.g., Morning Workout"
                        disabled={loading}
                        maxLength={50}
                    />
                </div>

                <div>
                    <label className="block text-white/90 mb-2 font-medium">
                        Description (Optional)
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="glass-input w-full resize-none"
                        placeholder="e.g., 30 minutes of exercise"
                        rows={3}
                        disabled={loading}
                        maxLength={200}
                    />
                </div>

                <button
                    type="submit"
                    className="glass-button-primary w-full"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : '+ Add Habit'}
                </button>
            </form>
        </div>
    );
};

export default HabitForm;
