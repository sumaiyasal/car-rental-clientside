import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Availablecars = () => {
  const [sortOption, setSortOption] = useState('dateAddedDesc');
  const[availcars,setAvailcars]=useState([]);
  useEffect(() => {
    
      fetch(`${import.meta.env.VITE_API_URL}/availcars?sortOption=${sortOption}`)
      .then(res=>res.json())
      .then(data=>setAvailcars(data))
    

  }, [sortOption]);
const handleSortChange = (e) => {
    setSortOption(e.target.value);  
  };
    return (
     <div className="home">
        <div className="container mx-auto">
        <h1 className='text-center text-4xl font-extrabold p-16 '>Latest Cars</h1>
        <div className="sorting-options text-black pb-4">
        <label className="text-white">Sort By: </label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="dateAddedDesc">Date (Newest First)</option>
          <option value="dateAddedAsc">Date (Oldest First)</option>
        </select>
      </div>
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
       <Link to='/cardetails'><button className="btn bg-orange-500">Book Now</button></Link>
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