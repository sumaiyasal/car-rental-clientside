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
        <div className='home pt-4'>
           <section >
           <div > 
           <div
  className="hero min-h-[400px] container mx-auto "
  style={{
    backgroundImage: "url(https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=600)",
    backgroundSize:"cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
borderRadius:"80px"
   
  }}>
  <div className="hero-overlay bg-opacity-60 rounded-[80px]"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Drive Your Dreams Today!</h1>
      <Link to='/availablecars'><button className="btn bg-orange-500 hover:bg-orange-600 text-white font-bold ">View Available Cars</button></Link>
      
    </div>
  </div>
</div>
        </div>
            </section> 
            <section className='pt-24 container mx-auto'>
                <h1 className='text-center text-4xl font-extrabold pb-16 '> <span className='border-l-4 border-orange-500 p-2'>Why Choose Us</span></h1>
               <div className='grid lg:grid-cols-2 sm:grid-cols-1 '>
                <div className='flex gap-4 items-start lg:border-b-2 lg:border-r-2 border-orange-500 p-8'>
                    <img src={hcars} alt=""  className='w-10 h-10 '/>
                    <div>
                    <h3 class="text-xl font-semibold">Wide Variety of Cars</h3>
                    <p class="text-gray-400"> Whether you're looking for an affordable city car, a family-friendly SUV, or a luxurious sports car for a special occasion, we have a wide range of vehicles to choose from. Our fleet includes everything from compact, fuel-efficient cars to high-end, premium models, ensuring you can find the perfect vehicle for any need or budget.</p> 
                    </div>
                </div>
                <div className='flex gap-4 items-start lg:border-b-2 border-orange-500 p-8'>
                    <img src={price} alt=""  className='w-10 h-10 '/>
                    <div>
                    <h3 class="text-xl font-semibold">Affordable Prices</h3>
                    <p class="text-gray-400">We offer competitive and transparent pricing with no hidden fees. Our daily rental rates are designed to give you the best value for your money, so you can enjoy a high-quality ride without breaking the bank. Whether you're renting for a day, a week, or longer, you can count on us for affordable and flexible pricing options.</p> 
                    </div>
                </div>
                <div className='flex gap-4 items-start p-8 lg:border-r-2 border-orange-500'>
                    <img src={booking} alt=""  className='w-10 h-10 '/>
                    <div>
                    <h3 class="text-xl font-semibold">Easy Booking Process</h3>
                    <p class="text-gray-400">Booking your rental car has never been easier. With just a few clicks, you can choose the car you want, select your rental period, and reserve it in real-time. Our simple and user-friendly online platform ensures a fast and hassle-free experience, allowing you to focus on your travels, not the details.</p> 
                    </div>
                </div>
                <div className='flex gap-4 items-start p-8 '>
                    <img src={support} alt=""  className='w-10 h-10 '/>
                    <div>
                    <h3 class="text-xl font-semibold">Customer Support</h3>
                    <p class="text-gray-400">We value your satisfaction and are here to assist you 24/7. Whether you have a question about our cars, need help with booking, or require roadside assistance during your rental, our dedicated customer support team is always ready to help. With us, you can feel confident knowing that expert support is just a call or click away.</p> 
                    </div>
                </div>
               </div>
            </section>
            <section className='pt-24 container mx-auto'>
            <h1 className='text-center text-4xl font-extrabold pb-16 '> <span className='border-l-4 border-orange-500 p-2'>Latest Cars</span></h1>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-8 pl-4'> 
              {  latestcar.map(lcar=>
                  <div className=''>
                     <div className="card bg-black w-96  rounded-xl transition ease-in-out  hover:scale-105">
    <figure>
      <img
        src={lcar.car_image} className="w-[300px] h-[300px] pt-10 "
        alt="Car" />
    </figure>
    <div className="card-body pl-16">
      <h2 className="card-title">{lcar.model}</h2>
     
      <p>Price : {lcar.daily_price}</p>
      <p>Availability : {lcar.availability}</p>
      <p>Booking_count : {lcar.booking_count}</p>
      <p>Posted on :{lcar.date_posted}</p>

    </div>
  </div> 
                  </div>

              )}
            </div>
            </section>
            <section className='py-12 container mx-auto'>
            <h1 className='text-center  text-4xl font-extrabold pb-32 pt-20'><span className='border-l-4 border-orange-500 p-2'>Special Offers</span></h1>

            <div className='grid lg:grid-cols-3 grid-cols-1 pl-4 gap-4'>
            <div className="card bg-black w-96  rounded-xl transition ease-in-out   hover:animate-bounce ">
    <figure>
      <img
        src="https://img.freepik.com/free-vector/black-friday-sale-banner-with-discount-offer-details_1017-41262.jpg?uid=R180653337&ga=GA1.1.404924234.1727183298&semt=ais_hybrid" className="w-[300px] h-[300px] pt-10 "
        alt="Shoes" />
    </figure>
    <div className="card-body pl-16">
      <h2 className='text-xl'><strong> Black Friday Sale!!!</strong></h2>
      <p>Grab Your Chance.</p>
      <Link to='/availablecars'><button className='btn bg-orange-500'>Book Now</button></Link>
     

    </div>
  </div>

  <div className="card bg-black w-96  rounded-xl transition ease-in-out   hover:animate-bounce">
    <figure>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBW-s8lr33g7D4YupQ4J0EfgJT_OQ4lJ5jWA&s" className="w-[300px] h-[300px] pt-10 "
        alt="Shoes" />
    </figure>
    <div className="card-body pl-16">
    <h2 className='text-xl'><strong>Exclusive Car For Rent</strong></h2>
      <p>Up to 30% off</p>
      <p>Grab Your Chance.</p>
      <Link to='/availablecars'><button className='btn bg-orange-500'>Book Now</button></Link>
     

    </div>
  </div>

  <div className="card bg-black w-96  rounded-xl transition ease-out  hover:animate-bounce">
    <figure>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kjhk6qJPk3Ehs3QxVeWk5PwCdhdVWy_6Nw&s" className="w-[300px] h-[300px] pt-10 "
        alt="Shoes" />
    </figure>
    <div className="card-body pl-16">
    <h2 className='text-xl'><strong>Weekend Offer</strong></h2>
      <p>Grab Your Chance.</p>
    <Link to='/availablecars'><button className='btn bg-orange-500'>Book Now</button></Link>
     

    </div>
  </div>


            </div>
            
            
            </section>
            <section className='py-12 container mx-auto '>
            <h1 className='text-center text-4xl font-extrabold pb-28 '>
            <span className='border-l-4 border-orange-500 p-2'>Customers Review</span></h1>
            <div>
            <Marquee>

            <div className="card bg-black mr-8 w-96 shadow-xl">
  <div className="card-body">
  <div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input
    type="radio"
    name="rating-2"
    className="mask mask-star-2 bg-orange-400"
    defaultChecked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
    <p className='py-4'>I rented a compact sedan, which was clean, in great condition, and drove smoothly. The vehicle had a full tank of gas, and I was reminded to return it the same way. I really appreciated the option to add a GPS.</p>
    <hr className='' />
    <div className='flex gap-4'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s" alt="" className='w-20 h-20 rounded-full'/>
      <div className='pt-4'>
        <p><strong>Rehana Sultana</strong></p>
        <p>Project Manager</p>
      </div>
    </div>
  </div>
</div>
<div className="card bg-black mr-8 w-96 shadow-xl">
  <div className="card-body">
  <div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input
    type="radio"
    name="rating-2"
    className="mask mask-star-2 bg-orange-400"
    defaultChecked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
    <p className='py-4'>I rented a compact car for a short trip to a nearby city. The car was just what I needed—fuel-efficient, easy to park, and comfortable for driving around town. The pickup process was simple, and the staff was helpful.</p>
    <hr className='' />
    <div className='flex gap-4'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&s" alt="" className='w-20 h-20 rounded-full'/>
      <div className='pt-4'>
        <p><strong>Akib Rahman</strong></p>
        <p>Project Manager</p>
      </div>
    </div>
  </div>
</div>
<div className="card bg-black mr-8 w-96 shadow-xl">
  <div className="card-body">
  <div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input
    type="radio"
    name="rating-2"
    className="mask mask-star-2 bg-orange-400"
    defaultChecked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
    <p className='py-4'>I rented a mid-size SUV  during a recent trip. The car was great, and the pick-up process was smooth. The staff was friendly, and the vehicle was in good condition, with no issues during my rental.</p>
    <hr className='' />
    <div className='flex gap-4'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&s" alt="" className='w-20 h-20 rounded-full'/>
      <div className='pt-4'>
        <p><strong>Nishi Akter</strong></p>
        <p>Manager</p>
      </div>
    </div>
  </div>
</div>
            </Marquee>
            
            </div>
            </section>
        </div>
    );
};

export default Home;