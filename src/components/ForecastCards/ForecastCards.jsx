import "./ForecastCards.css";
import {
  FaCloud,
  FaSun,
  FaCloudRain,
  FaBolt,
  FaSnowflake,
} from "react-icons/fa6";

function ForecastCards({ forecast }) {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <FaSun className="weather-icon sunny" />;

      case "clouds":
        return <FaCloud className="weather-icon clouds" />;

      case "rain":
        return <FaCloudRain className="weather-icon rain" />;

      case "thunderstorm":
        return <FaBolt className="weather-icon storm" />;

      case "snow":
        return <FaSnowflake className="weather-icon snow" />;

      default:
        return <FaCloud className="weather-icon clouds" />;
    }
  };

  if (!forecast || forecast.length === 0) {
    return (
      <div className="forecast-container">
        <h2>5-Day Forecast</h2>
        <p style={{ color: "white" }}>Loading forecast...</p>
      </div>
    );
  }

  const dailyForecast = forecast.filter((_, index) => index % 8 === 0);

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>

      <div className="forecast-cards">
        {dailyForecast.map((day) => (
          <div className="forecast-card" key={day.dt}>
            <h3>
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h3>

            {getWeatherIcon(day.weather[0].main)}

            <h4>{Math.round(day.main.temp)}°C</h4>

            <p>{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCards;
