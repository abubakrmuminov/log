import { useState } from "react";
import { auth, db } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/Auth/AuthSlice";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const useGoogle = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setIsPending(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);

      if (!result.user) throw new Error("Google login failed");

      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);

      // Если пользователя нет в Firestore, создаем нового
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          displayName: result.user.displayName || "No Name",
          email: result.user.email || "no-email@example.com",
          photoUrl: result.user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${result.user.uid}`,
          uid: result.user.uid,
          online: true,
          createdAt: serverTimestamp(),
        });
      } else {
        // Обновляем онлайн статус существующего пользователя
        await setDoc(userRef, { online: true }, { merge: true });
      }

      // Сохраняем пользователя в Redux
      dispatch(
        login({
          displayName: result.user.displayName || "No Name",
          email: result.user.email || "no-email@example.com",
          photoUrl: result.user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${result.user.uid}`,
          uid: result.user.uid,
          online: true,
        })
      );
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { googleLogin, isPending, error };
};