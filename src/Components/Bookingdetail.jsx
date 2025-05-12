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
    const [ndatee,setNdate]=useState("");
    // const[nid,setNid]=useState("");
    const{user}=useContext(AuthContext);
    const handlemodal=(id,model)=>{
        
        
        document.getElementById('my_modal_1').showModal();
        document.getElementById('cancel_nid').value = id;
        document.getElementById('cancel_name').value = model;

       
    }
    const handlemodal2=(id)=>{
        
        
      document.getElementById('my_modal_2').showModal();
      document.getElementById('cancel_nid').value = id;
     
  }
    // console.log(nid);
    const handleclick=(e)=>{
      e.preventDefault();
      const nid = document.getElementById('cancel_nid').value;
      const nmodel=document.getElementById('cancel_name').value;
      // console.log(nid);
        fetch(`${import.meta.env.VITE_API_URL}/bookingdetails/${nid}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: "Canceled",model:nmodel })
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
            document.getElementById('my_modal_1').close();
            document.getElementById('dbtn').disabled = true;



            }) 
    }
    const handleform = (e) => {
      e.preventDefault();  
      const ndate = document.getElementById('date').value;
      console.log("Modified date:", ndate);
      const nid = document.getElementById('cancel_nid').value;
  
      fetch(`${import.meta.env.VITE_API_URL}/bookingdetails/${nid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: ndate }), // Send the modified date to the server
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Booking date updated:', data);
          Swal.fire({
            title: 'Success!',
            text: 'Booking date updated successfully.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          document.getElementById('my_modal_2').close(); // Close the modal
        })
       
    };
  
    return (
      <>
             <tr className='hover:shadow-inner hover:shadow-orange-200'>
                <td><img src={car_image} className='w-48'/></td>
                <td>{model}</td>
                <td>{date}</td>
                <td>{daily_price}</td>
                <td>{status}</td> 
                <td><button 
        onClick={()=>handlemodal(_id,model)
        }
        className='btn bg-red-500' id='dbtn'><img src={trash} className='lg:w-8 w-4'/>Cancel</button><br />
                <button onClick={()=>handlemodal2(_id)
                
        } className='btn   bg-blue-400'><img src={calender} className='lg:w-8 w-3' />Modify Date</button>
                </td> 
                <dialog id="my_modal_1" className="modal">
               <div className="modal-box">
               <h3 className='text-center pb-4 text-lg font-bold'>Booking Summary</h3>
                        <p>Are you sure you want to cancel this booking?</p>
                 <div className="modal-action ">
                   <form method="dialog" className='flex items-center justify-center gap-4'>
                     {/* if there is a button in form, it will close the modal */}
                     <input
                type="hidden"
                id="cancel_nid"
                name="cancel_nid"
                className="cancel_name"
              />
                   <input
                type="hidden"
                id="cancel_name"
                name="cancel_name"
                
              />
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
                           <input
                type="hidden"
                id="cancel_nid"
                name="cancel_nid"
              />
                           <input type="date" id="date" name="date"  className="input input-bordered"  onChange={(e) => {
                  setNdate(e.target.value); 
                  console.log("Selected date:", e.target.value); 
                }}/>
                                     <button className='btn items-center bg-orange-500' onClick={handleform}>confirm</button>
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