
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase/config"
import { formError } from "../components/ErrorId"

export const useResetPassword = () => {
    const resetPassword = async (email) => {
        try {
             await sendPasswordResetEmail(auth, email)
             alert("checked your email")
        } catch (error) {
         const errorcode = error.code
         const errormessage = error.message   
         formError(errormessage)
        }
    }
    return { resetPassword }
}