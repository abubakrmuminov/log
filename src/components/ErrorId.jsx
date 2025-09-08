import { toast } from "react-toastify"

export const formError = (data) => {
    if (!data?.name) {
        return toast.warning("Name is required")
    } else if (!data?.email) {
        return toast.warning("email is required")
    } else if (!data?.password) {
        return toast.warning("password is required" )
    } else {
        return null
    }
}