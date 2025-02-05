import { ref, remove } from 'firebase/database';
import { db } from './data/firebase';
import { getAuth } from 'firebase/auth';

export const deleteWorkout = async (userId, workoutId) => {
  try {
    const workoutRef = ref(db, `users/${userId}/workouts/${workoutId}`);
    await remove(workoutRef);
    console.log(`Workout with ID ${workoutId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting workout:', error);
  }
};

export const deleteDiet = async (userId, dietId) => {
    try {
      const dietRef = ref(db, `users/${userId}/workouts/${dietId}`);
      await remove(dietRef);
      console.log(`Workout with ID ${dietId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

export const deleteUserAccountAndData = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      // Remove user data from the database
      const userRef = ref(db, `users/${user.uid}`);
      await remove(userRef);

      // Delete user account
      await user.delete();
      console.log('User account and data deleted successfully');
    } catch (error) {
      console.error('Error deleting user account and data:', error);
      // Handle errors such as re-authentication requirement
    }
  } else {
    console.log('No user is currently signed in.');
  }
};
