
import { useContext } from "react";
import { AuthContext } from "./Authprovide";
import { useLocation, useNavigate } from "react-router-dom";
import cpic from "../assets/3d-car-vibrant-city-night.jpg";

const Addcar = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    const navigate = useNavigate();
    const location = useLocation();
    const handleformsubmit=(e)=>{
        e.preventDefault();
        const car_image=e.target.car_image.value;
        const model=e.target.model.value;
        const description=e.target.description.value;
        const availability=e.target.availability.value;
        const rnumber=e.target.rnumber.value;
        const booking_count=e.target.bcount.value;
        const location=e.target.location.value;
        const email=e.target.email.value;
        const displayName = e.target.name.value;
        const date_posted = e.target.date.value;
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
        booking_count: parseInt(booking_count),
        location,
        daily_price,
        email,
        displayName,
        date_posted,
        status,
        features: selectedFeatures, 
    };
        
        fetch(`${import.meta.env.VITE_API_URL}/cars`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newcar)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log('successfully added');
                  
                    e.target.reset();
                }
                navigate(location?.state ? location.stats : "/");
            })

    }
    return (
       <div className="dark:bg-[#202020] dark:text-white bg-slate-100 text-[#202020] pb-10">
         <div className="container mx-auto">
           <h1 className="text-center text-3xl p-8  font-extrabold ">Add Car</h1> 
           <div className="min-h-screen flex justify-center items-center"
           style={{
            backgroundImage: `url(${cpic})`,
            backgroundSize:"cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius:"80px"
           
          }}>
        <div className="card bg-base-100 w-full max-w-lg shrink-0  px-5 rounded-lg
        bg-white/10 backdrop-blur-md shadow-lg ">
         
          <form onSubmit={handleformsubmit} className="card-body border-2 p-4 rounded-lg my-4  ">
           
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Car Model</span>
              </label>
              <input
              name="model"
              type="text"
              placeholder="model name"
              className="input input-bordered text-black bg-white"
              required
            />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Daily Rental Price</span>
              </label>
              <input
              name="daily_price"
              type="text"
              placeholder="price"
              className="input input-bordered text-black bg-white"
              required
            />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Availability</span>
              </label>
              <input
              name="availability"
              type="text"
              placeholder="availability"
              className="input input-bordered text-black bg-white"
              required
            />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Registration No.</span>
              </label>
              <input
              name="rnumber"
              type="text"
              placeholder="registration number"
              className="input input-bordered text-black bg-white"
              required
            />
            </div>
    
            <div className="form-control text-black ">
            <label className="label">
                <span className="label-text text-white">Features</span>
              </label>
              <label class="label cursor-pointer">
     <span class="label-text text-white">GPS</span>
     <input type="checkbox" id="gps" name="features" value="GPS"/> 
  </label>

  <label class="label cursor-pointer">
     <span class="label-text text-white">Air Conditioning</span>
     <input type="checkbox" id="ac" name="features" value="Air Conditioning"/>
  </label>
  <label class="label cursor-pointer">
     <span class="label-text text-white">Bluetooth</span>
     <input type="checkbox" id="bluetooth" name="features" value="Bluetooth"/> 
  </label>
  <label class="label cursor-pointer">
     <span class="label-text text-white">Automatic Transmission </span>
     <input type="checkbox" id="automatic" name="features" value="Automatic Transmission"/>
  </label>
  <label class="label cursor-pointer">
     <span class="label-text text-white">Heated Seats</span>
     <input type="checkbox" id="heatedSeats" name="features" value="Heated Seats"/> 
  </label>
  <label class="label cursor-pointer">
     <span class="label-text text-white">Sunroof</span>
     <input type="checkbox" id="sunroof" name="features" value="Sunroof"/>
  </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Description</span>
              </label>
              <textarea
              name="description"
             placeholder="Description"
             className="input input-bordered text-black bg-white"
               required
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Booking Count</span>
              </label>
              <input
              name="bcount"
              type="number"
              placeholder="Booking number"
              className="input input-bordered text-black bg-white"
              defaultValue={0}
              readOnly
              required
            />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white ">Car Image</span>
              </label>
              <input
              type="text"
              name="car_image"
              placeholder="photo-url"
              className="input input-bordered bg-white"
              required
            />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Location</span>
              </label>
              <input
              name="location"
              type="text"
              placeholder="location"
              className="input input-bordered text-black bg-white"
              required
            />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Booking Date</span>
              </label>
              <input type="date" id="date" name="date" required  className="text-black bg-white input input-bordered"/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Booking Status</span>
              </label>
              <input type="status" id="status" name="status" value="Pending" className="input input-bordered text-black bg-white"/>
            </div>
            
           
       

            

            <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={user.email} 
            readOnly
              className="input input-bordered text-black bg-white"
              required
            />
          </div>

         

            <div className="form-control mt-6">
              <button className="btn bg-orange-500 hover:bg-orange-600 text-white border-none rounded-xl mb-2">Add Car</button>
              
            </div>
          </form>
     
        </div>
      </div>
        </div>
       </div>
    );
};

export default Addcar;