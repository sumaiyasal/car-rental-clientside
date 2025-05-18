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
import Addcar from './Components/Addcar';
import Mycars from './Components/Mycars.jsx';
import Cardetails from './Components/Cardetails.jsx';
import Bookingdetails from './Components/Bookingdetails.jsx';
import Error from './Error.jsx';
import Privateroutes from './Components/Privateroutes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
        ,
      },
      {
        path: "/availablecars",
        element: <Availablecars></Availablecars>,
       
        
      },
      {
        path: "/bookingdetails",
        element: <Privateroutes>
            <Bookingdetails></Bookingdetails>
        </Privateroutes>
      ,
        loader:()=>fetch(`${import.meta.env.VITE_API_URL}/bookingdetails`)
        ,
      },
      {
        path: "/cardetails/:id",
        element:<Privateroutes>
        <Cardetails></Cardetails>
        </Privateroutes>
        ,
        loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/cars/${params.id}`)
      },
      {
        path: "/mycars",
        element:
        <Privateroutes>
          <Mycars></Mycars>
        </Privateroutes>

        ,
      },
      {
        path: "/addcar",
        element: <Privateroutes>
          <Addcar></Addcar>
        </Privateroutes>
        
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
