import { useContext, useState } from "react";
import { AuthContext } from "./Authprovide"
import Mycar from "./Mycar";
const Mycars = () => {
    const [mycars,setMycars]=useState([]);
    const{user}=useContext(AuthContext)
    fetch(`${import.meta.env.VITE_API_URL}/user-cars/${user?.email}`)
    .then(res=>res.json())
    .then(data=>setMycars(data))
    return (
       
        <div className="">
        <div className="container mx-auto">
     <h1 className="text-center text-4xl py-16 font-extrabold">My Cars</h1>
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
            mycars.map(car=><Mycar car={car}></Mycar>)
         }  
     </tbody> 
     </table>
    </div>
    </div>
    );
};

export default Mycars;