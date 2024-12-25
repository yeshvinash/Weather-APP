import React, { useEffect, useState } from "react";
import axios from "axios";
const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: "2f52fafd920a8d62cb031fe6f7ef06bf", // Replace with your OpenWeatherMap API key
            units: "metric", // You can use 'imperial' for Fahrenheit
          },
        }
      );
      console.log(response.data);
      setWeather(response.data);
    } catch (err) {
      setError(
        "Failed to fetch weather data. Please check the city name and try again.",
        err
      );
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Weather App</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weather && (
        <div className="weather-info">
          <h3>Weather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Conditions: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
