import React from 'react';
import { Link } from 'react-router-dom';
import hcars from "../assets/icons8-traffic-jam-64.png"
import price from "../assets/icons8-price-tag-50.png"
import support from "../assets/icons8-online-support-50.png"
import booking from "../assets/icons8-booking-50.png"
const Home = () => {
    return (
        <div className='home pt-4'>
           <section >
           <div>
           <div
  className="hero min-h-screen container mx-auto "
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
            <section className='pt-12 container mx-auto'>
                <h1 className='text-center text-4xl font-extrabold pb-16 '>Why Choose Us</h1>
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
        </div>
    );
};

export default Home;