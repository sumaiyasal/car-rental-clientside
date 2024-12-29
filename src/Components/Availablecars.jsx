import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import list from "../assets/list.png"
import grid from "../assets/icons8-grid-50.png"
const Availablecars = () => {
  const [sortOption, setSortOption] = useState('dateAddedDesc');
  const[availcars,setAvailcars]=useState([]);
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    
      fetch(`${import.meta.env.VITE_API_URL}/availcars?sortOption=${sortOption}&search=${searchQuery}`)
      .then(res=>res.json())
      .then(data=>setAvailcars(data))
    

  }, [sortOption, searchQuery]);
const handleSortChange = (e) => {
    setSortOption(e.target.value);  
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleViewToggle = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };
    return (
     <div className="home">
        <div className="container mx-auto pb-6">
        <h1 className='text-center text-4xl font-extrabold p-16 '>Available Cars</h1>
        <div className="flex  justify-between items-center p-4">
        <div className="sorting-options text-black pb-4">
        <label className="text-white">Sort By: </label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="dateAddedDesc">Date (Newest First)</option>
          <option value="dateAddedAsc">Date (Oldest First)</option>
        </select>
      </div>

      <div className="search-bar p-4 text-black">
          <input 
            type="text" 
            placeholder="Search by model" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            className="p-2 rounded-md"
          />
        </div>

      <div className="view-toggle lg:flex hidden">
        <button onClick={handleViewToggle}>
          {view === 'grid' ? <img src={list} className="w-10"/> : <img src={grid} className="w-10"/>}
        </button>
      </div>
        </div>
      
          <div className={view=='grid'?'grid lg:grid-cols-3 grid-cols-1 gap-8 pl-4':'grid grid-cols-1 gap-8 pl-4'}> 
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
       <Link to={`/cardetails/${lcar._id}`}><button className="btn bg-orange-500">Book Now</button></Link>
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