import React, { useContext, useState } from 'react';
import { AuthContext } from './Authprovide';

import Bookingdetail from './Bookingdetail';
import Chart from './Chart';
const Bookingdetails = () => {
    const [bookinglists,setBookinglists]=useState([]);
    const [cars, setCars] = useState([]);
    const{user}=useContext(AuthContext);
    fetch(`${import.meta.env.VITE_API_URL}/user-bookingdetails/${user?.email}`)
    .then(res=>res.json())
    .then(data=>setBookinglists(data))

    fetch(`${import.meta.env.VITE_API_URL}/cars`)
    .then(res=>res.json())
    .then(data=>setCars(data))
 
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
         <div className='container mx-auto text-center  py-16 font-extrabol '>
      <h1 className='text-3xl font-bold pb-8'>Booking Details</h1>
      <Chart cars={cars} />
 
    </div>

        </div>
       </div>
        </div>
    );
};

export default Bookingdetails;