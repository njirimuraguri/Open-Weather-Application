import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Weather from '../components/Weather';

const Home = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/weather/?city=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      setErrorMessage('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Open Weather App</title>
        <meta name="description" content="Weather app using Next.js and Django" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl text-center mt-8">Open Weather App</h1>

      {/* Search Box */}
      <form onSubmit={fetchWeather} className="flex justify-center mt-8">
        <input
          type="text"
          placeholder="Search city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mr-4"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Go
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="text-center mt-4">Loading...</p>}

      {/* Error Message */}
      {errorMessage && <p className="text-center text-red-500 mt-4">{errorMessage &&  "Sorry, no records for city."}</p>}

      {/* Weather Data */}
      {weatherData && <Weather data={weatherData.weather} forecast={weatherData.forecast} />}
    </div>
  );
};

export default Home;

