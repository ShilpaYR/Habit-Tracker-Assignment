// Algorithmic Motivation Generator (No AI)

/**
 * Generate a motivational message based on weekly completion rate
 * @param {Object} stats - Statistics object from calculateWeeklyStats
 * @returns {string} Motivational message
 */
export const generateMotivation = (stats) => {
    const { weeklyPercentage, totalCompletions, mostConsistent } = stats;

    // High performance (≥80%)
    if (weeklyPercentage >= 80) {
        const messages = [
            `Outstanding work! You've completed ${weeklyPercentage}% of your habits this week. ${mostConsistent ? `Your most consistent habit was "${mostConsistent.title}".` : ''} You're building incredible momentum! Keep crushing it! 🎉`,
            `Wow! ${weeklyPercentage}% completion rate this week! ${mostConsistent ? `"${mostConsistent.title}" has been your strongest habit.` : ''} You're an absolute habit champion! Keep up this amazing energy! ⭐`,
            `Fantastic! You completed ${totalCompletions} habits this week with a ${weeklyPercentage}% success rate! ${mostConsistent ? `"${mostConsistent.title}" is really working for you.` : ''} You're unstoppable! 🚀`
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Medium performance (50-79%)
    if (weeklyPercentage >= 50) {
        const messages = [
            `Great progress! You're at ${weeklyPercentage}% completion this week. ${mostConsistent ? `"${mostConsistent.title}" is going strong!` : ''} Try to maintain consistency tomorrow and you'll hit even higher numbers! 💪`,
            `You're doing well with ${weeklyPercentage}% completion! ${mostConsistent ? `Keep riding the momentum of "${mostConsistent.title}".` : ''} Small daily improvements lead to big results. You've got this! 🌟`,
            `Nice work! ${totalCompletions} completions this week means you're making real progress. ${mostConsistent ? `"${mostConsistent.title}" is proving to be a winner.` : ''} Push a little harder tomorrow and watch your streak grow! 📈`
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Lower performance (<50%)
    const messages = [
        `Every journey starts with small steps. You're at ${weeklyPercentage}% this week, and that's a foundation to build on. ${mostConsistent ? `"${mostConsistent.title}" shows you can do it!` : ''} Focus on completing just one habit tomorrow. You can do this! 💚`,
        `Don't give up! ${weeklyPercentage}% is just the beginning. ${mostConsistent && totalCompletions > 0 ? `You've already shown you can succeed with "${mostConsistent.title}".` : 'Start with the easiest habit tomorrow.'} Small wins create big transformations. Keep going! 🌱`,
        `Remember: progress, not perfection! You're at ${weeklyPercentage}%, and tomorrow is a fresh start. ${mostConsistent ? `Build on the success of "${mostConsistent.title}".` : 'Pick one habit and commit to it.'} You're stronger than you think! 💜`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
};
