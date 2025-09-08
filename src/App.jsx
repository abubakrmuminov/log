import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayouts from "./Layouts/MainLayouts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { action as actionReducer } from "./pages/Register";
import { action as actionReducer2 } from "./pages//Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { isAuthReady, login } from "./app/Auth/AuthSlice";
import { auth } from "./firebase/config";
import CreateTask from "./pages/CreateTask";


export default function App() {
  const dispatch = useDispatch()
  const { user, authReady } = useSelector((store) => store.user)
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (<ProtectedRoutes user={user}>
        <MainLayouts />
      </ProtectedRoutes>),
      children: [
        {
          index: true,
          element: <Home />,
          
          
        },
        {
          path: "/create",
          element: <CreateTask/>
        }
      ]
    },
    {
      path: "/login",
      element: user ? <Navigate to={"/"} /> : <Login />,
      action: actionReducer2
    },

    {
      path: "/register",
      element: user ? <Navigate to={"/"} /> : <Register />,
      action: actionReducer
    }
  ])

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      dispatch(login(user))
      dispatch(isAuthReady())
    })
  },[])

  return <> { authReady &&  <RouterProvider router={routes} />} </>
}
