import { Navigate } from "react-router-dom"


export default function ProtectedRoutes({children, user}) {
 if (!user) {
    return <Navigate to="/login" />; // user yo‘q bo‘lsa redirect qilinadi
  }
  return children;
}

