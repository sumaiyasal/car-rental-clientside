import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authprovide";
import Mycar from "./Mycar";
import { Link } from "react-router-dom";
import axios from "axios";
import Secure from "./Secure";

const Mycars = () => {
  const [mycars, setMycars] = useState([]);
  const [sortOption, setSortOption] = useState("dateAddedDesc");
  const { user } = useContext(AuthContext);
  const axiosSecure = Secure();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user-cars/${user.email}?sortOption=${sortOption}`, {
          withCredentials: true,
        })
        .then((res) => setMycars(res.data));
    }
  }, [sortOption, user?.email]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="dark:bg-[#202020] dark:text-white bg-slate-100 text-[#202020] min-h-screen px-4 py-8">
      {mycars.length === 0 ? (
        <div className="flex flex-col pt-32 items-center justify-center pb-24">
          <p className="text-2xl md:text-3xl mb-4">No cars added.</p>
          <Link to="/addcar">
            <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white">Add a car</button>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-center text-2xl md:text-4xl font-extrabold mb-8">My Cars</h1>

          {/* Sort control */}
          <div className="mb-6 font-semibold text-sm md:text-base">
            <label htmlFor="sort" className="mr-2">Sort By:</label>
            <select
              id="sort"
              onChange={handleSortChange}
              value={sortOption}
              className="bg-white shadow text-black px-2 py-1 rounded"
            >
              <option value="dateAddedDesc">Date (Newest First)</option>
              <option value="dateAddedAsc">Date (Oldest First)</option>
              <option value="priceLowToHigh">Price (Highest First)</option>
              <option value="priceHighToLow">Price (Lowest First)</option>
            </select>
          </div>

          {/* Responsive table wrapper */}
          <div className="overflow-x-auto">
            <table className="table text-black bg-white w-full">
              <thead className="text-black">
                <tr>
                  <th>Car Image</th>
                  <th>Car Model</th>
                  <th>Daily Rental Price</th>
                  <th>Booking Count</th>
                  <th>Availability</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {mycars.map((car) => (
                  <Mycar key={car._id} car={car} setMycars={setMycars} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mycars;
