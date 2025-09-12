import { useState } from "react";
import { auth, db } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/Auth/AuthSlice"
import { doc, setDoc } from "firebase/firestore";

export const useGoogle = () => {
    const dispatch = useDispatch()
    const [isPending, SetIspending] = useState(false)
    const [error, Seterror] = useState()
    const  googleProvider = async () =>{
        const provider = new GoogleAuthProvider()
        try {
            SetIspending(true)
            const req  = await signInWithPopup(auth, provider)
            if (!req.user) {
                throw new Error("Regestration failed");
            }
            await setDoc(doc(db))
        } catch (error) {
            
        }

    }
}