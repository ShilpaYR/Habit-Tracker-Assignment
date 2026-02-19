// Firebase Firestore Utilities for Habits
import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    onSnapshot,
    Timestamp,
    arrayUnion,
    arrayRemove,
    query,
    orderBy
} from 'firebase/firestore';
import { db } from './config';

/**
 * Add a new habit for a user
 * @param {string} userId - User's ID
 * @param {Object} habitData - Habit data (title, description)
 * @returns {Promise<DocumentReference>} Reference to the created habit document
 */
export const addHabit = async (userId, habitData) => {
    try {
        const habitsRef = collection(db, 'users', userId, 'habits');
        const newHabit = {
            title: habitData.title,
            description: habitData.description || '',
            createdAt: Timestamp.now(), // Use Timestamp.now() for immediate value
            completions: []
        };
        const docRef = await addDoc(habitsRef, newHabit);
        console.log('✅ Habit created successfully:', docRef.id);
        return docRef;
    } catch (error) {
        console.error('❌ Error adding habit:', error);
        throw error;
    }
};

/**
 * Delete a habit
 * @param {string} userId - User's ID
 * @param {string} habitId - Habit's ID
 * @returns {Promise<void>}
 */
export const deleteHabit = async (userId, habitId) => {
    try {
        const habitRef = doc(db, 'users', userId, 'habits', habitId);
        await deleteDoc(habitRef);
    } catch (error) {
        throw error;
    }
};

/**
 * Toggle habit completion for a specific date
 * @param {string} userId - User's ID
 * @param {string} habitId - Habit's ID
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {boolean} isCompleted - Whether the habit is already completed for this date
 * @returns {Promise<void>}
 */
export const toggleCompletion = async (userId, habitId, dateString, isCompleted) => {
    try {
        const habitRef = doc(db, 'users', userId, 'habits', habitId);

        if (isCompleted) {
            // Remove the date from completions array
            await updateDoc(habitRef, {
                completions: arrayRemove(dateString)
            });
        } else {
            // Add the date to completions array
            await updateDoc(habitRef, {
                completions: arrayUnion(dateString)
            });
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Get all habits for a user with real-time updates
 * @param {string} userId - User's ID
 * @param {Function} callback - Callback function to handle habit updates
 * @returns {Function} Unsubscribe function
 */
export const getHabits = (userId, callback) => {
    try {
        const habitsRef = collection(db, 'users', userId, 'habits');
        const q = query(habitsRef, orderBy('createdAt', 'desc'));

        return onSnapshot(
            q,
            (snapshot) => {
                const habits = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    habits.push({
                        id: doc.id,
                        ...data
                    });
                });
                console.log('📊 Habits updated:', habits.length, 'habits');
                callback(habits);
            },
            (error) => {
                console.error("❌ Error in habits snapshot listener:", error);
                // Still call callback with empty array to prevent UI from getting stuck
                callback([]);
            }
        );
    } catch (error) {
        console.error("❌ Error setting up habits listener:", error);
        return () => { }; // Return empty unsubscribe function
    }
};
