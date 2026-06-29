import { useEffect, useState } from "react";
import "./Home.css";

import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates,
  getForecastByCoordinates,
  getMultipleCitiesWeather,
} from "../services/weatherApi";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import ForecastCards from "../components/ForecastCards/ForecastCards";
import RainChart from "../components/RainChart/RainChart";
import WeatherDetails from "../components/WeatherDetails/WeatherDetails";
import OtherCities from "../components/Other/other";

function Home({ darkMode, setDarkMode }) {
  const [city, setCity] = useState("Bangalore");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const loadWeather = async (cityName) => {
    try {
      setLoading(true);

      const currentWeather = await getCurrentWeather(cityName);
      const forecastData = await getForecast(cityName);

      setWeather(currentWeather);
      setForecast(forecastData.list);
      setCity(cityName);
    } catch (error) {
      alert("City not found");
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);

          const { latitude, longitude } = position.coords;

          const current = await getWeatherByCoordinates(latitude, longitude);

          const forecastData = await getForecastByCoordinates(
            latitude,
            longitude,
          );

          setWeather(current);
          setForecast(forecastData.list);
          setCity(current.name);
        } catch (error) {
          alert("Unable to get your location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Location permission denied.");
      },
    );
  };

  useEffect(() => {
    loadWeather(city);

    getMultipleCitiesWeather().then((data) => {
      setCities(data);
    });
  }, []);
  return (
    <div className="home">
      <Navbar
        onSearch={loadWeather}
        onCurrentLocation={loadCurrentLocation}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      {loading ? (
        <h2 style={{ color: "white" }}>Loading...</h2>
      ) : (
        <CurrentWeather weather={weather} />
      )}

      <ForecastCards forecast={forecast} />

      <div className="middle">
        <RainChart forecast={forecast} darkMode={darkMode} />
      </div>

      <div className="bottom">
        <WeatherDetails weather={weather} />
        <OtherCities cities={cities} onSelect={loadWeather} />
      </div>
    </div>
  );
}

export default Home;
