import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authprovide"
import Mycar from "./Mycar";
import { Link } from "react-router-dom";
import axios from "axios";
import Secure from "./Secure";
const Mycars = () => {
    const [mycars,setMycars]=useState([]);
    const [sortOption, setSortOption] = useState('dateAddedDesc');
    const{user}=useContext(AuthContext);
    const axiosSecure = Secure();
    useEffect(() => {
        if (user?.email) {
          // fetch(`${import.meta.env.VITE_API_URL}/user-cars/${user.email}?sortOption=${sortOption}`)
          //   .then(res => res.json())
          //   .then(data => setMycars(data))
          // axios.get(`${import.meta.env.VITE_API_URL}/user-cars/${user.email}?sortOption=${sortOption}`,
          //   {
          //    withCredentials:true,
          //   })
          // .then(res=>setMycars(res.data))
          axios.get(`${import.meta.env.VITE_API_URL}/user-cars/${user.email}?sortOption=${sortOption}`,
            {withCredentials:true}
          )
          .then(res => setMycars(res.data));
        
        }
      }, [sortOption, user?.email]);
    const handleSortChange = (e) => {
        setSortOption(e.target.value);  
      };
    return (
       
        <div className="">
            {mycars.length === 0 ? (
                <div className="flex flex-col pt-48 items-center justify-center pb-24">
                <p className="text-3xl">No cars added.</p>
                <Link to='/addcar'><button className="btn bg-orange-500">Add a car</button></Link>
                
                </div>
        
      ) : (
        <div className="container mx-auto">
     <h1 className="text-center text-4xl py-16 font-extrabold">My Cars</h1>

     <div className="sorting-options">
        <label>Sort By: </label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="dateAddedDesc">Date (Newest First)</option>
          <option value="dateAddedAsc">Date (Oldest First)</option>
          <option value="priceLowToHigh">Price (Highest First)</option>
          <option value="priceHighToLow">Price (Lowest First)</option>
        </select>
      </div>

     <table className="table table-zebra text-black">
{/* head */}
<thead className="text-black" >
  <tr>
   
    <th>Car Image</th>
    <th>Car Model</th>
    <th>Daily Rental Price</th>
    <th>Booking Count</th>
    <th>Availabilty</th>
    <th>Date Added</th>
  </tr>
</thead>
<tbody>
{
            mycars.map(car=><Mycar car={car} setMycars={setMycars}></Mycar>)
         }  
     </tbody> 
     </table>
    </div>)}
    </div>
    );
};

export default Mycars;