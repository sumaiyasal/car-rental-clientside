import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from './Authprovide';
import trash from"../assets/icons8-trash-24.png"
import calender from "../assets/icons8-calendar-64.png"
import Swal from 'sweetalert2';
const Bookingdetail = ({bcl}) => {
    // console.log(bcl);
    // console.log({_id});
    const {_id,model,car_image,date,daily_price,status}=bcl;
    const [ndate,setNdate]=useState("");
    const[nid,setNid]=useState(0);
    const{user}=useContext(AuthContext);
    const handlemodal=(id)=>{
        // console.log(id);
         setNid(id);
        //  console.log(nid);
        
        document.getElementById('my_modal_1').showModal();
       
    }
    // console.log(nid);
    const handleclick=(e)=>{
      e.preventDefault();
       console.log(nid);
        fetch(`${import.meta.env.VITE_API_URL}/bookingdetails/${nid}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: "Canceled" })
        })
            .then(res => res.json())
            .then(data => {
                console.log('status info updated in db', data);
                Swal.fire({
                  title: 'Canceled!',
                  text: 'Canceled Successfully',
                  icon: 'success',
                  confirmButtonText: 'Ok'
              });
              // setNid("");  
            //   document.getElementById('my_modal_1').close(); 

            }) 
    }
    const handleform=(e)=>{
        e.preventDefault();
        // const date_posted = e.target.date.value;
        console.log(ndate);
     

    }
    return (
      <>
             <tr className='hover:shadow-inner hover:shadow-orange-200'>
                <td><img src={car_image} className='w-48'/></td>
                <td>{model}</td>
                <td>{date}</td>
                <td>{daily_price}</td>
                <td>{status}</td> 
                <td>{_id}</td> 
                <td><button 
        onClick={()=>handlemodal(_id)
        }
        className='btn bg-red-500'><img src={trash} />Cancel</button><br />
                <button onClick={()=>document.getElementById('my_modal_2').showModal()
        } className='btn bg-blue-400'><img src={calender} className='w-8' />Modify Date</button>
                </td> 
                <dialog id="my_modal_1" className="modal">
               <div className="modal-box">
               <h3 className='text-center pb-4 text-lg font-bold'>Booking Summary</h3>
                        <p>Are you sure you want to cancel this booking?</p>
                 <div className="modal-action ">
                   <form method="dialog" className='flex items-center justify-center gap-4'>
                     {/* if there is a button in form, it will close the modal */}
                     <button className='btn items-center bg-orange-500' onClick={handleclick}>Yes</button>
                     <button className="btn bg-red-500">No</button>
                   </form>
                 </div>
               </div>
             </dialog>
             <dialog id="my_modal_2" className="modal">
               <div className="modal-box">
               <h3 className='text-center pb-4 text-lg font-bold'>Modify Booking Date</h3>
               <form>
               <div className="form-control">
                           <label className="label">
                             <span className="label-text">Booking Date</span>
                           </label>
                           <input type="date" id="date" name="date" required  className="input input-bordered"  onChange={(e) =>
                                         setNdate(
                                             e.target.value
                                         )
                                     }/>
                                     <button className='btn items-center bg-orange-500' onClick={()=>handleform(e)}>confirm</button>
                         </div>
                          
                    
                         
               </form>
               
                 <div className="modal-action form-control">
                   <form method="dialog" className='flex items-center justify-center gap-4'>
                     {/* if there is a button in form, it will close the modal */}
                     
                     <button className="btn bg-red-500 ">No</button>
                   </form>
                 </div>
               </div>
             </dialog>
              </tr>
           
             </>
    );
};

export default Bookingdetail;