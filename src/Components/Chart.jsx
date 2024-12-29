import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import constant from './../../node_modules/d3-array/src/constant';

const Chart = ({ cars }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    
    if (cars && cars.length > 0) {
      const data = cars.map(car => ({
        name: car.model, 
        price: parseFloat(car.daily_price.replace('$', '')), 
      }));
      setChartData(data);
    }
  }, [cars]);
console.log(chartData)
  return (
    <div style={{ width: '100%', height: 400 }}>
    
      {console.log(chartData)}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`}/>
            <Legend />
            <Bar dataKey="price" fill="#FFA500" />
          </BarChart>
        </ResponsiveContainer> 
    </div>
  );
};

export default Chart;
