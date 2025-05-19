import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Authprovide';
import Bookingdetail from './Bookingdetail';
import Chart from './Chart';
import axios from 'axios';
import Secure from './Secure';

const Bookingdetails = () => {
  const [bookinglists, setBookinglists] = useState([]);
  const [cars, setCars] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = Secure();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user-bookingdetails/${user.email}`, {
          withCredentials: true,
        })
        .then((res) => setBookinglists(res.data));
    }
  }, [user?.email]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cars`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className="pt-12 dark:bg-[#202020] dark:text-white bg-slate-100 text-[#202020] min-h-screen">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-10">
        <h1 className="text-center text-xl md:text-3xl py-10 font-extrabold">My Booking List</h1>

        <div className="overflow-x-auto w-full">
          <table className="table w-full text-sm sm:text-base text-black bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-orange-300 text-black">
              <tr className="text-left">
                <th className="p-3">Car Image</th>
                <th className="p-3">Car Model</th>
                <th className="p-3">Booking Date</th>
                <th className="p-3">Total Price</th>
                <th className="p-3">Booking Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookinglists.map((bcl, idx) => (
                <Bookingdetail key={idx} bcl={bcl} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center pt-16">
          <h2 className="text-xl md:text-3xl font-bold mb-8">Booking Details</h2>
          <Chart cars={cars} />
        </div>
      </div>
    </div>
  );
};

export default Bookingdetails;
