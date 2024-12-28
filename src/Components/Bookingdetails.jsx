import React, { useContext, useState } from 'react';
import { AuthContext } from './Authprovide';
import trash from"../assets/icons8-trash-24.png"
import calender from "../assets/icons8-calendar-64.png"
import Swal from 'sweetalert2';
import Bookingdetail from './Bookingdetail';
const Bookingdetails = () => {
    const [bookinglists,setBookinglists]=useState([]);
    const{user}=useContext(AuthContext);
    fetch(`${import.meta.env.VITE_API_URL}/user-bookingdetails/${user?.email}`)
    .then(res=>res.json())
    .then(data=>setBookinglists(data))
    return (
        <div>
            <div className="bg-white text-black dark:bg-gray-800 dark:text-white">
         <div className="container mx-auto mb-5 min-h-screen">
         <h1 className="text-center text-4xl py-16 font-extrabold">My BookingList</h1>
         <table className="table table-zebra text-black">

    <thead className="text-black">
      <tr className='text-lg bg-orange-200'>
       
        <th>Car Image</th>
        <th>Car Model</th>
        <th>Bookingh Date</th>
        <th>Total Price</th>
        <th>Booking Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
         {
            bookinglists.map(bcl=><Bookingdetail bcl={bcl}></Bookingdetail> 
            )
         }  
         </tbody> 
         </table>
        </div>
       </div>
        </div>
    );
};

export default Bookingdetails;