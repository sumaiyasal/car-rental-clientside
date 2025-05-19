import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import list from "../assets/list.png";
import grid from "../assets/icons8-grid-50.png";

const Availablecars = () => {
  const [sortOption, setSortOption] = useState("dateAddedDesc");
  const [availcars, setAvailcars] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/availcars?sortOption=${sortOption}&search=${searchQuery}`
    )
      .then((res) => res.json())
      .then((data) => setAvailcars(data));
  }, [sortOption, searchQuery]);

  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleViewToggle = () => setView(view === "grid" ? "list" : "grid");

  return (
    <div className="dark:bg-[#202020] dark:text-white bg-slate-100 text-[#202020] min-h-screen">
      <div className="container mx-auto px-4 pb-16">
        {/* Heading */}
        <h1 className="text-center text-4xl font-bold py-16">Available Cars</h1>

        {/* Filters & Toggle */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
          {/* Sort Dropdown */}
          <div className="text-black dark:text-white">
            <label className="font-semibold mr-2">Sort By:</label>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="bg-white dark:bg-[#333] dark:text-white p-2 rounded-md shadow"
            >
              <option value="dateAddedDesc">Date (Newest First)</option>
              <option value="dateAddedAsc">Date (Oldest First)</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="w-full lg:w-1/3">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by model"
              className="w-full p-3 rounded-md bg-white dark:bg-[#333] dark:text-white shadow"
            />
          </div>

          {/* Toggle View */}
          <div className="hidden lg:block">
            <button onClick={handleViewToggle}>
              <img
                src={view === "grid" ? list : grid}
                alt="Toggle View"
                className="w-8"
              />
            </button>
          </div>
        </div>

        {/* Cars */}
        <div
          className={
            view === "grid"
              ? "grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid gap-6 grid-cols-1"
          }
        >
          {availcars.map((car) => (
            <div key={car._id} className="bg-white dark:bg-black rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="h-[220px] bg-white flex justify-center items-center rounded-t-2xl overflow-hidden">
                <img
                  src={car.car_image}
                  alt={car.model}
                  className="object-contain h-full w-full p-4"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{car.model}</h2>
                <p><span className="font-semibold">Price:</span> {car.daily_price}</p>
                <p><span className="font-semibold">Availability:</span> {car.availability}</p>
                <p><span className="font-semibold">Bookings:</span> {car.booking_count}</p>
                <p><span className="font-semibold">Posted:</span> {car.date_posted}</p>
                <Link to={`/cardetails/${car._id}`}>
                  <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Availablecars;
