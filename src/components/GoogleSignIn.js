import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth, db } from "./data/firebase";
import { ref, set, get } from 'firebase/database';
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = ref(db, 'users/' + user.uid);
      const snapshot = await get(userRef)
  
      if (!snapshot.exists()) {
        await set(userRef, {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
        });
      }
  
      return user;
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  return (
    <button
      className="flex space-x-3 items-center mx-auto py-2.5 pl-3.5 lg:pr-12 pr-7 sm:pr-12 md:pr-7 lg:ml-14 shadow-lg text-indigo-700 bg-white rounded-sm"
      onClick={signInWithGoogle}
    >
      <FcGoogle className="w-6 h-6"/>
      <p className="text-sm font-semibold">Sign in with Google</p>
    </button>
  );
};

export default GoogleSignIn;
