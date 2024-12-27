import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Availablecars from './Components/Availablecars.jsx';
import Home from './Components/Home.jsx';
import AuthProvider from './Components/Authprovide.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
        ,
      },
      {
        path: "/availablecars",
        element: <Availablecars></Availablecars>
        ,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <Signup/>,
      },
    ]
  },

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>,
)
