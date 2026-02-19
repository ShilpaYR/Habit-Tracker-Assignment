// Statistics Calculator Utilities

/**
 * Get the last 7 days as an array of date strings
 * @returns {string[]} Array of date strings in YYYY-MM-DD format
 */
export const getLast7Days = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        dates.push(dateString);
    }

    return dates;
};

/**
 * Calculate weekly statistics for all habits
 * @param {Array} habits - Array of habit objects
 * @returns {Object} Statistics object containing total habits, completions, percentage, most/least consistent habits
 */
export const calculateWeeklyStats = (habits) => {
    if (!habits || habits.length === 0) {
        return {
            totalHabits: 0,
            totalCompletions: 0,
            weeklyPercentage: 0,
            mostConsistent: null,
            leastConsistent: null
        };
    }

    const last7Days = getLast7Days();
    let totalCompletions = 0;
    let maxCompletions = 0;
    let minCompletions = 7;
    let mostConsistentHabit = null;
    let leastConsistentHabit = null;

    habits.forEach(habit => {
        const completions = habit.completions || [];

        // Count completions in the last 7 days
        const weeklyCompletions = completions.filter(date =>
            last7Days.includes(date)
        ).length;

        totalCompletions += weeklyCompletions;

        // Track most and least consistent habits
        if (weeklyCompletions > maxCompletions) {
            maxCompletions = weeklyCompletions;
            mostConsistentHabit = habit;
        }

        if (weeklyCompletions < minCompletions) {
            minCompletions = weeklyCompletions;
            leastConsistentHabit = habit;
        }
    });

    // Calculate overall weekly completion percentage
    const totalPossibleCompletions = habits.length * 7;
    const weeklyPercentage = totalPossibleCompletions > 0
        ? Math.round((totalCompletions / totalPossibleCompletions) * 100)
        : 0;

    return {
        totalHabits: habits.length,
        totalCompletions,
        weeklyPercentage,
        mostConsistent: mostConsistentHabit,
        leastConsistent: leastConsistentHabit
    };
};

/**
 * Count completions for a specific habit in the last 7 days
 * @param {Object} habit - Habit object
 * @returns {number} Number of completions in last 7 days
 */
export const getWeeklyCompletionCount = (habit) => {
    if (!habit || !habit.completions) return 0;

    const last7Days = getLast7Days();
    return habit.completions.filter(date => last7Days.includes(date)).length;
};

/**
 * Get today's date as a string in YYYY-MM-DD format
 * @returns {string} Today's date string
 */
export const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
};

/**
 * Check if a habit is completed today
 * @param {Object} habit - Habit object
 * @returns {boolean} True if completed today
 */
export const isCompletedToday = (habit) => {
    if (!habit || !habit.completions) return false;
    const today = getTodayString();
    return habit.completions.includes(today);
};
