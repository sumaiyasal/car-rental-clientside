import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import  "./navbar.css"
// import { AuthContext } from "./AuthProvider";
import car from "../assets/car.jpg"
import { AuthContext } from "./Authprovide";
// import { Tooltip } from 'react-tooltip'
const Navbar = () => {
  const{user,signout,toggleTheme}=useContext(AuthContext);
  console.log(user);
    
  
 
const links=<>
<li><NavLink to='/'style={({ isActive }) => ({
      backgroundColor: isActive ? '#ff5733' : '#e2e6ea', 
      color: isActive ? 'white' : '#333', 
      marginRight:'8px',
     
    })}  >Home</NavLink></li>
<li><NavLink to='/availablecars'style={({ isActive }) => ({
      backgroundColor: isActive ? '#ff5733' : '#e2e6ea', 
      color: isActive ? 'white' : '#333', 
      marginRight:'8px',
     
    })}>Available Cars</NavLink></li>
    <li><NavLink to='/addcar'style={({ isActive }) => ({
      backgroundColor: isActive ? '#ff5733' : '#e2e6ea', 
      color: isActive ? 'white' : '#333', 
      marginRight:'8px',
    })}>Add Car</NavLink></li>
<li><NavLink to='/mycars'style={({ isActive }) => ({
      backgroundColor: isActive ? '#ff5733' : '#e2e6ea', 
      color: isActive ? 'white' : '#333', 
      marginRight:'8px',
    })}>My Cars</NavLink></li>
<li><NavLink to='/bookingdetails'style={({ isActive }) => ({
      backgroundColor: isActive ? '#ff5733' : '#e2e6ea', 
      color: isActive ? 'white' : '#333', 
      marginRight:'8px',
    })}>My Bookings</NavLink></li>

</>
    
    return (
        <div className="navbarbg">
            <div className="navbar navbarbg container mx-auto  bg-base-100 text-black">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <div className="flex items-center">
      <div className="sm:hidden md:flex">
      <img src={car} alt="" className="w-24"/>
      </div>
    <a className="btn btn-ghost text-3xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">DriveSwiift</a>
    </div>
    
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  {user && user?.email ? (
          <div className="navbar-end flex gap-2">
  
             <button onClick={signout} className="btn bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white font-bold">
            Log-Out
          </button>
            </div>
         
        ) : (
          <div className="navbar-end flex gap-2">
         <NavLink to="/login" className="btn bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white font-bold">Login</NavLink>
        
        <NavLink to="/signup" className="btn bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white">Sign Up</NavLink>
          </div>
        )}

</div>
        </div>
    );
};

export default Navbar;