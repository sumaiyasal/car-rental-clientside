import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Authprovide';
import Swal from 'sweetalert2';
import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
const Mycar = ({car}) => {
    const {user} = useContext(AuthContext);
    const{car_image,model,daily_price,booking_count,availability,date_posted,rnumber,features,location,_id,description}=car;
  const handleSubmit=(e)=>{
    console.log("okk");
    e.preventDefault();
    //   console.log(e.target.car_image.value);
        const car_image=e.target.car_image.value;
        const model=e.target.model.value;
        const description=e.target.description.value;
        const availability=e.target.availability.value;
        const rnumber=e.target.rnumber.value;
        const booking_count=e.target.bcount.value;
        const location=e.target.location.value;
        const email=e.target.email.value;
        const displayName = e.target.name.value;
        // const date_posted = e.target.date.value;
        const status = e.target.status.value;
        const daily_price = e.target.daily_price.value;


        const selectedFeatures = [];
    const featureCheckboxes = e.target.querySelectorAll('input[name="features"]:checked');
    featureCheckboxes.forEach((checkbox) => {
        selectedFeatures.push(checkbox.value);
    });
    const newcar = {
        car_image,
        model,
        description,
        availability,
        rnumber,
        booking_count,
        location,
        daily_price,
        email,
        displayName,
        date_posted,
        status,
        features: selectedFeatures, 
    };
    console.log(newcar);
    fetch(`${import.meta.env.VITE_API_URL}/cars/${_id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newcar)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount) {

                            console.log('successfully updated');
                            Swal.fire({
                                title: 'Success!',
                                text: 'Updated successfully',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            });
                            e.target.reset();
                            
                        }
                        // navigate(location?.state ? location.stats : "/");
            })
  }
    return (
       
            <tr>
       <td><img src={car_image} alt="" className='w-40' /></td>
       <td>{model}</td>
       <td>{daily_price}</td>
       <td>{booking_count}</td>
       <td>{availability}</td>
       <td>{date_posted}</td>
       <td><button type="btn" className="btn bg-lime-300"  onClick={()=>document.getElementById('my_modal_1').showModal()
        }>Update</button></td>
       {/* <td><button type="btn" className="btn bg-red-300" onClick={()=>handledelete(_id)}>Delete</button></td> */}
       <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
  <div className="container mx-auto ">
           <h1 className="text-center text-3xl p-8  font-extrabold text-white ">Add Car</h1> 
           <div className="min-h-screen flex justify-center items-center">
        <div className="card bg-base-100 w-full max-w-lg shrink-0  px-5 rounded-lg">
         
          <form onSubmit={handleSubmit} className="card-body border-2 p-4 rounded-lg my-4">
           
            <div className="form-control">
              <label className="label">
                <span className="label-text">Car Model</span>
              </label>
              <input
              name="model"
              defaultValue={model}
              type="text"
              placeholder="model name"
              className="input input-bordered"
              required
            />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Daily Rental Price</span>
              </label>
              <input
              name="daily_price"
              type="text"
              placeholder="price"
              defaultValue={daily_price}
              className="input input-bordered"
              required
            />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <input
              name="availability"
              type="text"
              placeholder="availability"
              className="input input-bordered"
              defaultValue={availability}
              required
            />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Registration No.</span>
              </label>
              <input
              name="rnumber"
              type="text"
              placeholder="registration number"
              defaultValue={rnumber}
              className="input input-bordered"
              required
            />
            </div>
    
            <div className="form-control text-black">
            <label className="label">
                <span className="label-text">Features</span>
              </label>
              
              <label class="label cursor-pointer">
     <span class="label-text">GPS</span>
     <input type="checkbox" id="gps" name="features" value="GPS"/> 
  </label>

  <label class="label cursor-pointer">
     <span class="label-text">Air Conditioning</span>
     <input type="checkbox" id="ac" name="features" value="Air Conditioning"/>
  </label>
  <label class="label cursor-pointer">
     <span class="label-text">Bluetooth</span>
     <input type="checkbox" id="bluetooth" name="features" value="Bluetooth"/> 
  </label>
  <label class="label cursor-pointer">
     <span class="label-text">Automatic Transmission </span>
     <input type="checkbox" id="automatic" name="features" value="Automatic Transmission"/>
  </label>
  <label class="label cursor-pointer">
     <span class="label-text">Heated Seats</span>
     <input type="checkbox" id="heatedSeats" name="features" value="Heated Seats"/> 
  </label>
  <label class="label cursor-pointer">
     <span class="label-text">Sunroof</span>
     <input type="checkbox" id="sunroof" name="features" value="Sunroof"/>
  </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
              name="description"
              defaultValue={description}
             placeholder="Enter your review"
             className="input input-bordered"
               required
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Booking Count</span>
              </label>
              <input
              name="bcount"
              type="text"
              placeholder="Booking number"
              className="input input-bordered"
              defaultValue={booking_count}
              required
            />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Car Image</span>
              </label>
              <input
              type="text"
              name="car_image"
              placeholder="photo-url"
              defaultValue={car_image}
              className="input input-bordered"
              required
            />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
              name="location"
              type="text"
              placeholder="location"
              className="input input-bordered"
              defaultValue={location}
              required
            />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Booking Status</span>
              </label>
              <input type="status" id="status" name="status" value="Pending" className="input input-bordered"/>
            </div>
            <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={user.email} 
            readOnly
              className="input input-bordered"
              required
            />
          </div>


            <div className="form-control mt-6 modal-action ">
              <button className="btn btn-neutral rounded-xl mb-2">Update</button>
            </div>
          </form>
     
        </div>
      </div>
        </div>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        
         <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
     </tr>
     
    );
};

export default Mycar;