import React, { useState } from "react";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    const apiKey = "3f1482cca0101c13901ac4e521471cbd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    setLoading(true);
    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching the weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-300 p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Weather App</h1>
          <div className="flex justify-center items-center space-x-3 mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchWeather}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>

          {weather && (
            <div className="mt-6">
              <div className="flex justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  className="w-20 h-20"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mt-4">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-gray-500 text-lg capitalize">
                {weather.weather[0].description}
              </p>
              <p className="text-5xl font-bold text-gray-800 mt-2">
                {Math.round(weather.main.temp)}°C
              </p>

              <div className="flex justify-around mt-4 text-gray-600">
                <div>
                  <p className="text-lg">Humidity</p>
                  <p className="text-2xl font-bold">{weather.main.humidity}%</p>
                </div>
                <div>
                  <p className="text-lg">Wind Speed</p>
                  <p className="text-2xl font-bold">{weather.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
