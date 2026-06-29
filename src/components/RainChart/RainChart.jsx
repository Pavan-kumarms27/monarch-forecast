import "./RainChart.css";

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

function TemperatureChart({ forecast, darkMode }) {
  if (!forecast || forecast.length === 0) return null;

  const hourly = forecast.slice(0, 8);

  const data = {
    labels: hourly.map((item) =>
      new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "numeric",
      }),
    ),

    datasets: [
      {
        data: hourly.map((item) => item.main.temp),

        borderColor: "#4F9DFF",

        backgroundColor: "rgba(79,157,255,.2)",

        fill: true,

        tension: 0.45,

        pointRadius: 6,

        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: darkMode ? "#ffffff" : "#374151",
        },
        grid: {
          color: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        },
      },

      y: {
        ticks: {
          color: darkMode ? "#ffffff" : "#374151",
        },
        grid: {
          color: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        },
      },
    },
  };

  return (
    <div className="temperature-chart">
      <h2>Hourly Temperature</h2>

      <Line data={data} options={options} />

      <div className="hourly-list">
        {hourly.map((hour) => (
          <div className="hour-card" key={hour.dt}>
            <p className="hour-time">
              {new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: "numeric",
                hour12: true,
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt=""
            />
            <h3>{Math.round(hour.main.temp)}°</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemperatureChart;
