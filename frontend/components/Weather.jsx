import React, { useState } from 'react';
import Image from 'next/image';
import { FiRefreshCw } from "react-icons/fi";

const Weather = ({ data, forecast }) => {
  // State for Temperature Unit (Celsius/Fahrenheit)
  const [unit, setUnit] = useState('metric');
  const toggleUnit = () => setUnit(unit === 'metric' ? 'imperial' : 'metric');

  
  return (
    <div className='relative flex flex-col max-w-[1280px] w-full m-auto p-4 text-gray-300 z-10'>
      {/* Top */}
      <div className='flex justify-center items-center text-4xl text-gray-400 text-center pb-8'>
        <p className='mr-2'>Weather in {data.name}</p>
        <button onClick={(e) => refreshData(e)} className='mr-4'>
          <FiRefreshCw />
        </button>
        <button onClick={toggleUnit} className='flex bg-blue-500 text-white px-4 py-2 rounded-md'>
          <span className={`px-2 ${unit === 'metric' ? 'font-bold text-black' : 'text-gray-200'}`}>°C</span>
          <span className='px-1'>|</span>
          <span className={`px-2 ${unit === 'imperial' ? 'font-bold text-black' : 'text-gray-200'}`}>°F</span>
        </button>
      </div>

      {/* Current Weather */}
      <div className='relative flex flex-wrap max-[600px]:justify-center justify-between items-center'>
        {/* Current Weather Icon */}
        <div className='bg-black/50 p-8 rounded-md w-[250px] h-[250px] mt-4 text-center'>
          <Image src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='icon' width='100' height='100' unoptimized />
        </div>

        {/* Temp */}
        <div className='bg-black/50 p-8 rounded-md w-[250px] h-[250px] mt-4'>
          <p className='text-2xl font-bold text-center'>TEMP</p>
          <div className='relative flex justify-between items-center'>
            <div className='flex flex-col items-center mr-2'>
              <p className='mt-[-10px] font-bold'>{data.weather[0].main}</p>
            </div>
            <p className='text-5xl font-bold '>{data.main.temp.toFixed(0)}&#176;{unit === 'metric' ? 'C' : 'F'}</p>
          </div>
          <p className='text-xl mt-2 text-center'>(Feels Like {data.main.feels_like.toFixed(0)}&#176;{unit === 'metric' ? 'C' : 'F'})</p>
        </div>

        {/* Date and Location */}
        <div className='bg-black/50 p-8 rounded-md w-[250px] h-[250px] mt-4 text-center'>
          <p className='text-2xl font-bold text-center'>Date & Location</p>
          <p className='font-bold'>{new Date().toLocaleDateString()}</p>
          <p className='text-xl'>{data.name}, {data.sys.country}</p>
        </div>

        {/* Humidity */}
        <div className='bg-black/50 p-8 rounded-md w-[250px] h-[250px] mt-4 text-center'>
          <p className='text-2xl font-bold text-center'>HUMIDITY</p>
          <p className='font-bold text-6xl p-2'>{data.main.humidity}%</p>
          <div className='relative pt-1'>
            <div className='overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200'>
              <div style={{ width: `${data.main.humidity}%` }} className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500'></div>
            </div>
          </div>
          <p className='text-xl'>{data.weather[0].description}</p>
        </div>

        {/* Wind Speed */}
        <div className='bg-black/50 p-8 rounded-md w-[250px] h-[250px] mt-4 text-center'>
          <p className='text-2xl font-bold text-center'>WIND SPEED</p>
          <p className='font-bold text-4xl p-2'>{data.wind.speed} {unit === 'metric' ? 'M/S' : 'MPH'}</p>
          <p className='text-lg'>Angle: {data.wind.deg}&#176;</p>
        </div>
      </div>

      {/* Forecast */}
      <div className='relative flex flex-wrap max-[600px]:justify-center justify-between items-center'>
        {Object.values(forecast).map(day => (
          <div key={day.date} className='bg-black/50 p-8 rounded-md w-[250px] h-[250px] mt-4'>
            <p className='text-2xl font-bold text-center'>{day.date}</p>
            <div className='flex flex-col items-center'>
              <Image src={day.icon} alt='weather icon' width='100' height='100' unoptimized />
              <p className='mt-[-10px] font-bold'>{day.description}</p>
              <p className='text-xl'>Min: {day.temp_min.toFixed(0)}&#176;{unit === 'metric' ? 'C' : 'F'} / Max: {day.temp_max.toFixed(0)}&#176;{unit === 'metric' ? 'C' : 'F'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
