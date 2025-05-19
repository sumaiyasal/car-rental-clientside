import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authprovide";
import { useLocation, useNavigate } from "react-router-dom";
import cpic from "../assets/3d-car-vibrant-city-night.jpg";

const Addcar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // State to trigger fade-in animation after mount
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleformsubmit = (e) => {
    e.preventDefault();

    const car_image = e.target.car_image.value;
    const model = e.target.model.value;
    const description = e.target.description.value;
    const availability = e.target.availability.value;
    const rnumber = e.target.rnumber.value;
    const booking_count = e.target.bcount.value;
    const loc = e.target.location.value;
    const email = e.target.email.value;
    const displayName = e.target.name?.value || user?.displayName || "";
    const date_posted = e.target.date.value;
    const status = e.target.status.value;
    const daily_price = e.target.daily_price.value;

    const selectedFeatures = [];
    e.target.querySelectorAll('input[name="features"]:checked').forEach(cb => selectedFeatures.push(cb.value));

    const newcar = {
      car_image,
      model,
      description,
      availability,
      rnumber,
      booking_count: parseInt(booking_count),
      location: loc,
      daily_price,
      email,
      displayName,
      date_posted,
      status,
      features: selectedFeatures,
    };

    fetch(`${import.meta.env.VITE_API_URL}/cars`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newcar),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log("Successfully added");
          e.target.reset();
          navigate(location?.state ? location.state : "/");
        }
      });
  };

  return (
    <div className="dark:bg-[#202020] dark:text-white bg-slate-100 text-[#202020] min-h-screen pb-10 flex flex-col items-center px-4">
      <h1 className="text-3xl font-extrabold pt-8 pb-6 text-center">Add Car</h1>

      <div
        className={`w-full max-w-xl rounded-[40px] shadow-lg overflow-hidden transition-opacity duration-700 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${cpic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white/20 backdrop-blur-md p-8 rounded-[40px]">
          <form onSubmit={handleformsubmit} className="space-y-6">
            {/* Model & Price */}
            <div className="flex flex-col sm:flex-row sm:space-x-6">
              <div className="flex-1">
                <label className="block mb-1 font-semibold text-white">Car Model</label>
                <input
                  name="model"
                  type="text"
                  placeholder="Model name"
                  className="input input-bordered w-full bg-white text-black rounded-lg transform transition-transform duration-300 focus:scale-105"
                  required
                />
              </div>
              <div className="flex-1 mt-4 sm:mt-0">
                <label className="block mb-1 font-semibold text-white">Daily Rental Price</label>
                <input
                  name="daily_price"
                  type="number"
                  placeholder="Price"
                  className="input input-bordered w-full bg-white text-black rounded-lg transform transition-transform duration-300 focus:scale-105"
                  required
                />
              </div>
            </div>

            {/* Availability & Registration Number */}
            <div className="flex flex-col sm:flex-row sm:space-x-6">
              <div className="flex-1">
                <label className="block mb-1 font-semibold text-white">Availability</label>
                <input
                  name="availability"
                  type="text"
                  placeholder="Availability"
                  className="input input-bordered w-full bg-white text-black rounded-lg transform transition-transform duration-300 focus:scale-105"
                  required
                />
              </div>
              <div className="flex-1 mt-4 sm:mt-0">
                <label className="block mb-1 font-semibold text-white">Registration No.</label>
                <input
                  name="rnumber"
                  type="text"
                  placeholder="Registration number"
                  className="input input-bordered w-full bg-white text-black rounded-lg transform transition-transform duration-300 focus:scale-105"
                  required
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block mb-2 font-semibold text-white">Features</label>
              <div className="grid grid-cols-2 gap-4 text-white">
                {[
                  "GPS",
                  "Air Conditioning",
                  "Bluetooth",
                  "Automatic Transmission",
                  "Heated Seats",
                  "Sunroof",
                ].map((feature) => (
                  <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" name="features" value={feature} className="checkbox checkbox-sm" />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-semibold text-white">Description</label>
              <textarea
                name="description"
                placeholder="Description"
                className="input input-bordered w-full bg-white text-black rounded-lg min-h-[80px] transform transition-transform duration-300 focus:scale-105"
                required
              />
            </div>

            {/* Booking Count & Car Image URL */}
            <div className="flex flex-col sm:flex-row sm:space-x-6">
              <div className="flex-1">
                <label className="block mb-1 font-semibold text-white">Booking Count</label>
                <input
                  name="bcount"
                  type="number"
                  placeholder="Booking number"
                  className="input input-bordered w-full bg-white text-black rounded-lg cursor-not-allowed"
                  defaultValue={0}
                  readOnly
                  required
                />
              </div>
              <div className="flex-1 mt-4 sm:mt-0">
                <label className="block mb-1 font-semibold text-white">Car Image URL</label>
                <input
                  name="car_image"
                  type="url"
                  placeholder="Photo URL"
                  className="input input-bordered w-full bg-white text-black rounded-lg transform transition-transform duration-300 focus:scale-105"
                  required
                />
              </div>
            </div>

            {/* Location & Booking Date */}
            <div className="flex flex-col sm:flex-row sm:space-x-6">
              <div className="flex-1">
                <label className="block mb-1 font-semibold text-white">Location</label>
                <input
                  name="location"
                  type="text"
                  placeholder="Location"
                  className="input input-bordered w-full bg-white text-black rounded-lg transform transition-transform duration-300 focus:scale-105"
                  required
                />
              </div>
              <div className="flex-1 mt-4 sm:mt-0">
                <label className="block mb-1 font-semibold text-white">Booking Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="input input-bordered w-full bg-white text-black rounded-lg transform transition-transform duration-300 focus:scale-105"
                  required
                />
              </div>
            </div>

            {/* Booking Status */}
            <div>
              <label className="block mb-1 font-semibold text-white">Booking Status</label>
              <input
                type="text"
                id="status"
                name="status"
                value="Pending"
                readOnly
                className="input input-bordered w-full bg-white text-black rounded-lg cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold text-white">Email</label>
              <input
                name="email"
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-white text-black rounded-lg cursor-not-allowed"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="btn w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl border-none py-3 font-semibold shadow-lg shadow-orange-400/50
                  transform transition-transform duration-300 hover:scale-105"
              >
                Add Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addcar;
