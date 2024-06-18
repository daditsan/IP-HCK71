import { createBrowserRouter, redirect } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import GamePage from "../pages/GamePage/GamePage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import UserEditProfilePage from "../pages/EditProfile/UserEditProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {  
    return localStorage.getItem('access_token') ? redirect("/") : null;
    },
  },

  {
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/game",
        element: <GamePage />,
      },
      {
        path: "/profile",
        element: <UserProfilePage />,
      },
      {
        path: "/editProfile",
        element: <UserEditProfilePage />,
      },
    ],
  },
]);

export default router;
