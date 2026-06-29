import "./other.css";
import {
  FaCloud,
  FaSun,
  FaCloudRain,
  FaBolt,
  FaSnowflake,
} from "react-icons/fa6";
function Other({ cities, onSelect }) {
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
  if (!cities || cities.length === 0) {
    return (
      <div className="other">
        <h2>Other Cities</h2>
        <p className="no-cities">Loading cities...</p>
      </div>
    );
  }

  return (
    <div className="other">
      <h2>Other Cities</h2>

      {cities.map((city) => (
        <div
          key={city.id}
          className="city-card"
          onClick={() => onSelect(city.name)}
        >
          <div className="city-left">
            {getWeatherIcon(city.weather[0].main)}

            <div>
              <h3>{city.name}</h3>
              <p>{city.weather[0].main}</p>
            </div>
          </div>

          <span>{Math.round(city.main.temp)}°</span>
        </div>
      ))}
    </div>
  );
}

export default Other;
