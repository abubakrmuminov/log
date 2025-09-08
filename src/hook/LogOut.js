import { signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logOut } from "../app/Auth/AuthSlice";
import { auth, db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export function useLogOut() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setIsPending(true);
    try {
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          online: false,
          lastLogout: new Date(), // Oxirgi chiqish vaqtini saqlash
        });
        await signOut(auth);
        dispatch(logOut());
        toast.success("Successfully logged out");
      } else {
        throw new Error("No user is logged in");
      }
    } catch (error) {
      setError(error.message);
      console.error("Logout error:", error.message);
      toast.error(`Logout failed: ${error.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
}