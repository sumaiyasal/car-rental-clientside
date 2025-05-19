import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import hcars from "../assets/icons8-traffic-jam-64.png"
import price from "../assets/icons8-price-tag-50.png"
import support from "../assets/icons8-online-support-50.png"
import booking from "../assets/icons8-booking-50.png"
import 'animate.css';
import Marquee from "react-fast-marquee";
import axios from 'axios';
import Secure from './Secure';
import car2 from "../assets/car-headlight-buildings-reflecting-headlight-car.jpg"
const Home = () => {
    const[latestcar,setLatestcar]=useState([]);
  // fetch(`${import.meta.env.VITE_API_URL}/latestcars`)
  // .then(res=>res.json())
  // .then(data=>setLatestcar(data))
  const axiosSecure = Secure();
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/latestcars`,
      {withCredentials:true}
    )
    .then(res => setLatestcar(res.data));
  })
    return (
        <div className='dark:bg-[#202020] dark:text-white bg-slate-100 text-[#202020] pt-4'>
        <section className="pt-16 px-4 ">
  <div className="container mx-auto">
    <div
      className="hero min-h-[400px] rounded-[40px] sm:rounded-[60px] lg:rounded-[80px] overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=600)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60" />
      <div className="hero-content text-neutral-content text-center px-4">
        <div className="max-w-lg mx-auto">
          <h1 className="mb-6 text-3xl md:text-5xl font-bold leading-tight">
            Drive Your Dreams Today!
          </h1>
          <Link to="/availablecars">
            <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white font-bold">
              View Available Cars
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

            <section className='pt-16 pb-6 container mx-auto'>
                <h1 className='text-center text-4xl font-extrabold pb-16 '> <span className='border-l-4 border-orange-500 p-2'>Why Choose Us</span></h1>
               <div className='grid lg:grid-cols-2 sm:grid-cols-1 '>
                <div className='flex gap-4 items-start lg:border-b-2 lg:border-r-2 border-orange-500 p-8'>
                    <img src={hcars} alt=""  className='w-10 h-10 '/>
                    <div>
                    <h3 class="text-xl font-semibold">Wide Variety of Cars</h3>
                    <p class="dark:text-gray-400 text-gray-500"> Whether you're looking for an affordable city car, a family-friendly SUV, or a luxurious sports car for a special occasion, we have a wide range of vehicles to choose from. Our fleet includes everything from compact, fuel-efficient cars to high-end, premium models, ensuring you can find the perfect vehicle for any need or budget.</p> 
                    </div>
                </div>
                <div className='flex gap-4 items-start lg:border-b-2 border-orange-500 p-8'>
                    <img src={price} alt=""  className='w-10 h-10 '/>
                    <div>
                    <h3 class="text-xl font-semibold">Affordable Prices</h3>
                    <p class="dark:text-gray-400 text-gray-500">We offer competitive and transparent pricing with no hidden fees. Our daily rental rates are designed to give you the best value for your money, so you can enjoy a high-quality ride without breaking the bank. Whether you're renting for a day, a week, or longer, you can count on us for affordable and flexible pricing options.</p> 
                    </div>
                </div>
                <div className='flex gap-4 items-start p-8 lg:border-r-2 border-orange-500'>
                    <img src={booking} alt=""  className='w-10 h-10 '/>
                    <div>
                    <h3 class="text-xl font-semibold">Easy Booking Process</h3>
                    <p class="dark:text-gray-400 text-gray-500">Booking your rental car has never been easier. With just a few clicks, you can choose the car you want, select your rental period, and reserve it in real-time. Our simple and user-friendly online platform ensures a fast and hassle-free experience, allowing you to focus on your travels, not the details.</p> 
                    </div>
                </div>
                <div className='flex gap-4 items-start p-8 '>
                    <img src={support} alt=""  className='w-10 h-10 '/>
                    <div>
                    <h3 class="text-xl font-semibold">Customer Support</h3>
                    <p class="dark:text-gray-400 text-gray-500">We value your satisfaction and are here to assist you 24/7. Whether you have a question about our cars, need help with booking, or require roadside assistance during your rental, our dedicated customer support team is always ready to help. With us, you can feel confident knowing that expert support is just a call or click away.</p> 
                    </div>
                </div>
               </div>
            </section>
           <section className="lg:py-12 py-2 container mx-auto px-4">
  <h1 className="text-center text-4xl font-extrabold pb-16">
    <span className="border-l-4 border-orange-500 p-2">Latest Cars</span>
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {latestcar.map((lcar, index) => (
      <div key={index} className="flex justify-center">
        <div className="card bg-black text-white w-full max-w-xs rounded-xl transition ease-in-out hover:scale-105">
          <figure>
            <img
              src={lcar.car_image}
              alt="Car"
              className="w-[250px] h-[200px] object-cover pt-10 mx-auto"
            />
          </figure>
          <div className="card-body text-left px-6">
            <h2 className="card-title">{lcar.model}</h2>
            <p>Price: {lcar.daily_price}</p>
            <p>Availability: {lcar.availability}</p>
            <p>Booking Count: {lcar.booking_count}</p>
            <p>Posted on: {lcar.date_posted}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

           <section className="lg:py-12 py-2 container mx-auto px-4">
  <h1 className="text-center text-4xl font-extrabold pb-28 pt-10">
    <span className="border-l-4 border-orange-500 p-2">Special Offers</span>
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
    {/* Card 1 */}
    <div className="card bg-black w-full max-w-xs mx-auto rounded-xl transition ease-in-out hover:animate-bounce">
      <figure>
        <img
          src="https://img.freepik.com/free-vector/black-friday-sale-banner-with-discount-offer-details_1017-41262.jpg?uid=R180653337&ga=GA1.1.404924234.1727183298&semt=ais_hybrid"
          alt="Sale"
          className="w-full h-[250px] object-cover pt-6 px-4"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-xl font-bold">Black Friday Sale!!!</h2>
        <p>Grab Your Chance.</p>
        <Link to="/availablecars">
          <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white">
            Book Now
          </button>
        </Link>
      </div>
    </div>

    {/* Card 2 */}
    <div className="card bg-black w-full max-w-xs mx-auto rounded-xl transition ease-in-out hover:animate-bounce">
      <figure>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBW-s8lr33g7D4YupQ4J0EfgJT_OQ4lJ5jWA&s"
          alt="Discount"
          className="w-full h-[250px] object-cover pt-6 px-4"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-xl font-bold">Exclusive Car For Rent</h2>
        <p>Up to 30% off</p>
        <p>Grab Your Chance.</p>
        <Link to="/availablecars">
          <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white">
            Book Now
          </button>
        </Link>
      </div>
    </div>

    {/* Card 3 */}
    <div className="card bg-black w-full max-w-xs mx-auto rounded-xl transition ease-in-out hover:animate-bounce">
      <figure>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kjhk6qJPk3Ehs3QxVeWk5PwCdhdVWy_6Nw&s"
          alt="Weekend"
          className="w-full h-[250px] object-cover pt-6 px-4"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-xl font-bold">Weekend Offer</h2>
        <p>Grab Your Chance.</p>
        <Link to="/availablecars">
          <button className="btn bg-orange-500 hover:bg-orange-600 border-none text-white">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  </div>
</section>

           <section className="lg:py-12 py-4 container mx-auto px-4">
  <h1 className="text-center text-4xl font-extrabold pb-24 pt-10">
    <span className="border-l-4 border-orange-500 p-2">Contact Us</span>
  </h1>

  <div
    className="hero min-h-[400px] rounded-[40px] overflow-hidden"
    style={{
      backgroundImage: `url(${car2})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="hero-overlay bg-opacity-60"></div>

    <div className="text-neutral-content text-center w-full px-4 py-10">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10 lg:px-10">

        {/* Contact Info */}
        <div className="text-left w-full lg:w-1/2 space-y-6">
          <div>
            <h1 className="text-lg font-semibold text-orange-500">Address</h1>
            <p>2126 Nasirabad, Chattogram</p>
          </div>
          <hr className="border-gray-400" />
          <div>
            <h1 className="text-lg font-semibold text-orange-500">Phone</h1>
            <p>01356172945</p>
          </div>
          <hr className="border-gray-400" />
          <div>
            <h1 className="text-lg font-semibold text-orange-500">Email</h1>
            <p>driveswift@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/15 p-6 rounded-xl w-full lg:w-1/2 max-w-md">
          <h1 className="font-bold pb-4 text-lg text-white">Send Message</h1>
          <label className="input input-bordered flex items-center gap-2 mb-3 w-full">
            <input type="text" className="grow text-white" placeholder="Email" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3 w-full">
            <input type="text" className="grow text-white" placeholder="Username" />
          </label>
          <textarea className="textarea textarea-bordered w-full mb-3 text-white" placeholder="Message"></textarea>
          <button className="btn w-full bg-orange-500 hover:bg-orange-600 border-none text-white font-bold">
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</section>


            <section className="lg:py-12 py-6 px-4">
  <div className="container mx-auto">
    <h1 className="text-center text-3xl md:text-4xl font-extrabold pb-16">
      <span className="border-l-4 border-orange-500 p-2">Customers Review</span>
    </h1>

    <div className="overflow-hidden">
      <Marquee pauseOnHover speed={50} className="text-white">
        {/* Review 1 */}
        <div className="card bg-black mr-8 w-[90%] sm:w-80 md:w-96 shadow-xl">
          <div className="card-body">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <input
                  key={`star1-${i}`}
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked={i === 1}
                />
              ))}
            </div>
            <p className="py-4">
              I rented a compact sedan, which was clean, in great condition, and
              drove smoothly. I really appreciated the option to add a GPS.
            </p>
            <hr />
            <div className="flex gap-4 pt-4 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s"
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">Rehana Sultana</p>
                <p className="text-sm">Project Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Review 2 */}
        <div className="card bg-black mr-8 w-[90%] sm:w-80 md:w-96 shadow-xl">
          <div className="card-body">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <input
                  key={`star2-${i}`}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked={i === 1}
                />
              ))}
            </div>
            <p className="py-4">
              I rented a compact car for a short trip. Fuel-efficient, easy to
              park, and comfortable. Staff was helpful.
            </p>
            <hr />
            <div className="flex gap-4 pt-4 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&s"
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">Akib Rahman</p>
                <p className="text-sm">Project Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Review 3 */}
        <div className="card bg-black mr-8 w-[90%] sm:w-80 md:w-96 shadow-xl">
          <div className="card-body">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <input
                  key={`star3-${i}`}
                  type="radio"
                  name="rating-3"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked={i === 1}
                />
              ))}
            </div>
            <p className="py-4">
              I rented a mid-size SUV. Great condition and smooth pickup. No
              issues during rental. Highly recommend.
            </p>
            <hr />
            <div className="flex gap-4 pt-4 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&s"
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">Nishi Akter</p>
                <p className="text-sm">Manager</p>
              </div>
            </div>
          </div>
        </div>
      </Marquee>
    </div>
  </div>
</section>

        </div>
    );
};

export default Home;