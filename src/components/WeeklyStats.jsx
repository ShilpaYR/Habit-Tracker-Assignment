// Weekly Statistics Component
import { calculateWeeklyStats } from '../utils/statsCalculator';

const WeeklyStats = ({ habits }) => {
    const stats = calculateWeeklyStats(habits);

    return (
        <div className="glass-card p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">📊 Weekly Statistics</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-white/70 text-sm mb-1">Total Habits</div>
                    <div className="text-3xl font-bold text-white">{stats.totalHabits}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-white/70 text-sm mb-1">Completions</div>
                    <div className="text-3xl font-bold text-glass-green">{stats.totalCompletions}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm col-span-2 md:col-span-1">
                    <div className="text-white/70 text-sm mb-1">Success Rate</div>
                    <div className="text-3xl font-bold text-glass-purple">{stats.weeklyPercentage}%</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-white/80 text-sm mb-2">
                    <span>Weekly Progress</span>
                    <span>{stats.weeklyPercentage}%</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                        className="h-full bg-gradient-to-r from-glass-green to-glass-purple transition-all duration-500 rounded-full"
                        style={{ width: `${stats.weeklyPercentage}%` }}
                    />
                </div>
            </div>

            {/* Most/Least Consistent */}
            {stats.mostConsistent && (
                <div className="space-y-3">
                    <div className="bg-glass-green/20 border border-glass-green/40 rounded-lg p-3">
                        <div className="text-white/70 text-xs mb-1">🏆 Most Consistent</div>
                        <div className="text-white font-semibold">{stats.mostConsistent.title}</div>
                    </div>

                    {stats.leastConsistent && stats.totalHabits > 1 && (
                        <div className="bg-white/10 border border-white/20 rounded-lg p-3">
                            <div className="text-white/70 text-xs mb-1">💪 Needs Attention</div>
                            <div className="text-white font-semibold">{stats.leastConsistent.title}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WeeklyStats;
