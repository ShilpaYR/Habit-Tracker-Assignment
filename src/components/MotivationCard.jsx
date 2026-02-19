// Motivation Card Component
import { useState } from 'react';
import { generateMotivation } from '../utils/motivationGenerator';
import { calculateWeeklyStats } from '../utils/statsCalculator';

const MotivationCard = ({ habits }) => {
    const [motivation, setMotivation] = useState('');
    const [showMotivation, setShowMotivation] = useState(false);

    const handleGenerateMotivation = () => {
        const stats = calculateWeeklyStats(habits);
        const message = generateMotivation(stats);
        setMotivation(message);
        setShowMotivation(true);
    };

    return (
        <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-4">💫 Weekly Motivation</h2>

            {!showMotivation ? (
                <div className="text-center py-8">
                    <p className="text-white/70 mb-6">
                        Get personalized encouragement based on your weekly progress!
                    </p>
                    <button
                        onClick={handleGenerateMotivation}
                        className="glass-button-primary text-lg px-8 py-3"
                    >
                        Generate Weekly Motivation
                    </button>
                </div>
            ) : (
                <div className="animate-fade-in">
                    <div className="bg-gradient-to-br from-glass-green/30 to-glass-purple/30 border border-white/30 rounded-xl p-6 mb-4">
                        <p className="text-white text-lg leading-relaxed">{motivation}</p>
                    </div>
                    <button
                        onClick={handleGenerateMotivation}
                        className="glass-button w-full"
                    >
                        Generate New Message
                    </button>
                </div>
            )}
        </div>
    );
};

export default MotivationCard;
