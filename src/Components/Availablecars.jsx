import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Availablecars = () => {
  
  const[availcars,setAvailcars]=useState([]);
  fetch(`${import.meta.env.VITE_API_URL}/cars`)
  .then(res=>res.json())
  .then(data=>setAvailcars(data))
 
    return (
     <div className="home">
        <div className="container mx-auto">
        <h1 className='text-center text-4xl font-extrabold p-16 '>Latest Cars</h1>
          <div className='grid lg:grid-cols-3 grid-cols-1 gap-8 pl-4'> 
              {  availcars.map(lcar=>
                  <div className=''>
                     <div className="card bg-black w-96  rounded-xl ">
    <figure>
      <img
        src={lcar.car_image} className="w-[300px] h-[300px] pt-10 "
        alt="Shoes" />
    </figure>
    <div className="card-body pl-16">
      <h2 className="card-title">{lcar.model}</h2>
     
      <p>Price : {lcar.daily_price}</p>
      <p>Availability : {lcar.availability}</p>
      <p>Booking_count : {lcar.booking_count}</p>
      <p>Posted on :{lcar.date_posted}</p>

    </div>
  </div> 
                  </div>

              )}
            </div>
        </div>
     </div>
      
    );
};

export default Availablecars;