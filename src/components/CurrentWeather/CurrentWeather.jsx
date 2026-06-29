import "./CurrentWeather.css";
import {
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  WiDaySunny,
} from "react-icons/wi";

function CurrentWeather({ weather }) {
  if (!weather) {
    return <div className="current-weather">Loading...</div>;
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="current-weather">
      <div className="weather-left">
        <div className="top">
          <h1>{Math.round(weather.main.temp)}°</h1>

          <div>
            <h2>{weather.name}</h2>
            <p>{weather.sys.country}</p>
            <span>{today}</span>
          </div>
        </div>

        <div className="condition">
          <h3>{weather.weather[0].main}</h3>
          <p>{weather.weather[0].description}</p>
        </div>
      </div>

      <div className="weather-right">
        <div className="weather-grid">
          <div className="card">
            <WiThermometer />
            <span>Feels Like</span>
            <h4>{Math.round(weather.main.feels_like)}°C</h4>
          </div>

          <div className="card">
            <WiHumidity />
            <span>Humidity</span>
            <h4>{weather.main.humidity}%</h4>
          </div>

          <div className="card">
            <WiStrongWind />
            <span>Wind</span>
            <h4>{weather.wind.speed} m/s</h4>
          </div>

          <div className="card">
            👀
            <span>Visibility</span>
            <h4>{weather.visibility / 1000} km</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
