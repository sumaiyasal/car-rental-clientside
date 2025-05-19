import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from './Authprovide';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



const Cardetails = () => {
    const{user}=useContext(AuthContext);
    const email=user?.email;
    const navigate = useNavigate();
const location = useLocation();
    const {_id,model,
   
       daily_price,
        availability,
        features,
        car_image,
        description
        }=useLoaderData();
        const info={
            model,
       daily_price,
       email,
        availability,
        features,
        car_image,
        description,
        date: getTodaysDate(),
        status:"confirmed",
        carID:_id,
      

        }
        function getTodaysDate() {
            const today = new Date();
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
            const day = today.getDate().toString().padStart(2, '0');
            const year = today.getFullYear();
            return `${month}/${day}/${year}`; 
        }
        const handleclick=()=>{
            fetch(`${import.meta.env.VITE_API_URL}/bookingdetails`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(info)
            })
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                   
                        Swal.fire({
                          title: 'Success!',
                          text: 'Successfully Booked ',
                          icon: 'success',
                          confirmButtonText: 'Ok'
                      });
                      
                        // e.target.reset();
                
                   
                    navigate(location?.state ? location.stats : "/");
                })
        }
    return (
        <div className='dark:bg-[#202020] dark:text-white bg-slate-100 text-[#202020]'>
            <div className="w-[80%]  mx-auto py-4">
            <div className="hero dark:bg-slate-200 bg-slate-200 shadow-slate-700 shadow-md min-h-screen ">
  <div className="hero-content flex-col text-black lg:flex-row gap-24 justify-between items-center ">
    <div className="border-4">
    <img
      src={car_image}
      className="max-w-lg rounded-lg shadow-2xl " />
    </div>
    <div className="space-y-4">
      <h1 className="text-5xl font-bold">{model}</h1>
      <p className="">
        Price:{daily_price}
      </p>
      <p>
         {description}
      </p>
      <p>
        {availability}
      </p>
      <p>{features?'Features:':''}</p>
      <p> {features?.map(fet=><li>{fet}</li>)}</p>
      
      <button onClick={()=>document.getElementById('my_modal_1').showModal()
        } className='bg-orange-500 hover:bg-orange-600 text-white border-none btn'>Book Now</button>
           <dialog id="my_modal_1" className="modal">
  <div className="modal-box bg-white">
  <h3 className='text-center pb-4 text-lg font-bold'>Booking Summary</h3>
            <p><strong>Car Model:</strong> {model}</p>
            <p><strong>Price Per Day:</strong> {daily_price}</p>
            <p><strong>Availability:</strong> {availability}</p>
           
            <p><strong>Features:</strong> {features?.join(', ')}</p>
            
    <div className="modal-action  ">
      <form method="dialog" className='flex items-center justify-center gap-4  '>
        {/* if there is a button in form, it will close the modal */}
        <button className='btn items-center bg-orange-500 hover:bg-orange-600 text-white border-none' onClick={handleclick}>Confirm</button>
        <button className="btn bg-red-500 hover:bg-red-600 border-none text-white">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  </div>
</div>
             
            </div>
        </div>
    );
};

export default Cardetails;