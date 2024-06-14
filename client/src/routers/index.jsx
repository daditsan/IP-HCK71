import { createBrowserRouter, redirect } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import GamePage from "../pages/GamePage/GamePage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      loader: () => {
        if (localStorage.getItem("access_token")) {
          return redirect('/game')
        }
        return null
      }
    },
    {
      path: "/register",
      element: <RegisterPage />,

    },
    {
      path: "/game",
      element: <GamePage />,
      loader: () => {
        if (!localStorage.getItem("access_token")) {
          return redirect('/login')
        }
        return null
      }
    },
])

export default router;