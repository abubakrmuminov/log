import { useState } from "react";
import { auth, db } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/Auth/AuthSlice";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const useGoogle = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsPending(true);
      const result = await signInWithPopup(auth, provider);

      if (!result.user) throw new Error("Registration failed");

      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          displayName: result.user.displayName,
          photoUrl: result.user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${result.user.uid}`,
          online: true,
          uid: result.user.uid,
        });
      }

      // Сохраняем юзера в Redux
      dispatch(login(result.user));
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { googleLogin, isPending, error };
};
