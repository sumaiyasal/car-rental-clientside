import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
           <div className="flex flex-col justify-center items-center py-40 space-y-4">
           <h1 className='text-3xl font-bold text-black'>Sorry!!! </h1> 
           <h1 className='text-3xl font-bold text-black'>Page Not Found </h1>
           <Link to="/"><button className="btn btn-primary">GO Back Home Page</button></Link>
        </div>  
        </div>
    );
};

export default Error;