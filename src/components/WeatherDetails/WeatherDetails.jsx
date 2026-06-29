import "./WeatherDetails.css";

import {
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  WiCloud,
  WiSunrise,
  WiSunset,
  WiBarometer,
} from "react-icons/wi";

function WeatherDetails({ weather }) {
  if (!weather) return null;

  const sunrise = new Date(
    weather.sys.sunrise * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(
    weather.sys.sunset * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const cards = [
    {
      title: "Feels Like",
      value: `${Math.round(weather.main.feels_like)}°C`,
      icon: <WiThermometer />,
    },
    {
      title: "Humidity",
      value: `${weather.main.humidity}%`,
      icon: <WiHumidity />,
    },
    {
      title: "Wind",
      value: `${weather.wind.speed} m/s`,
      icon: <WiStrongWind />,
    },
    {
      title: "Visibility",
      value: `${weather.visibility / 1000} km`,
      icon: "👀",
    },
    {
      title: "Sunrise",
      value: sunrise,
      icon: <WiSunrise />,
    },
    {
      title: "Sunset",
      value: sunset,
      icon: <WiSunset />,
    },
    {
      title: "Pressure",
      value: `${weather.main.pressure} hPa`,
      icon: <WiBarometer />,
    },
    {
      title: "Cloudiness",
      value: `${weather.clouds.all}%`,
      icon: <WiCloud />,
    },
  ];

  return (
    <div className="weather-details">
      <h2>Today's Highlights</h2>

      <div className="details-grid">
        {cards.map((card) => (
          <div className="detail-card" key={card.title}>
            <div className="detail-icon">{card.icon}</div>

            <span>{card.title}</span>

            <h3>{card.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetails;