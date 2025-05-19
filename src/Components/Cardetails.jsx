import React, { useContext } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './Authprovide';
import Swal from 'sweetalert2';

const Cardetails = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const navigate = useNavigate();
  const location = useLocation();

  const {
    _id,
    model,
    daily_price,
    availability,
    features,
    car_image,
    description
  } = useLoaderData();

  const info = {
    model,
    daily_price,
    email,
    availability,
    features,
    car_image,
    description,
    date: getTodaysDate(),
    status: "confirmed",
    carID: _id,
  };

  function getTodaysDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const handleclick = () => {
    fetch(`${import.meta.env.VITE_API_URL}/bookingdetails`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(info)
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: 'Success!',
          text: 'Successfully Booked',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        navigate(location?.state ? location.state : "/");
      });
  };

  return (
    <div className="dark:bg-[#202020] dark:text-white bg-slate-100 text-[#202020] min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-slate-200 dark:bg-[#2d2d2d] rounded-2xl shadow-xl p-6 lg:p-12 flex flex-col lg:flex-row gap-10 items-center">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={car_image}
              alt={model}
              className="rounded-xl shadow-lg max-h-[400px] object-contain w-full"
            />
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 space-y-4 text-black dark:text-white">
            <h1 className="text-4xl font-bold">{model}</h1>
            <p><strong>Price per day:</strong> {daily_price}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Availability:</strong> {availability}</p>

            {features?.length > 0 && (
              <>
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside pl-2">
                  {features.map((fet, index) => (
                    <li key={index}>{fet}</li>
                  ))}
                </ul>
              </>
            )}

            <button
              onClick={() => document.getElementById('my_modal_1').showModal()}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white dark:bg-[#2d2d2d] dark:text-white">
          <h3 className="text-center text-lg font-bold mb-4">Booking Summary</h3>
          <p><strong>Car Model:</strong> {model}</p>
          <p><strong>Price Per Day:</strong> {daily_price}</p>
          <p><strong>Availability:</strong> {availability}</p>
          <p><strong>Features:</strong> {features?.join(', ')}</p>

          <div className="modal-action flex justify-center gap-4 mt-6">
            <form method="dialog" className="flex gap-4">
              <button
                onClick={handleclick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Cardetails;
