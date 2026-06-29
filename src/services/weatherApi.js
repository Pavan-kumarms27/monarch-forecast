const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
  );
  if (!response.ok) {
    throw new Error("City not found");
  }
  return await response.json();
};

export const getForecast = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
  );
  if (!response.ok) {
    throw new Error("Forecast not found");
  }
  return await response.json();
};

export const getWeatherByCoordinates = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
  if (!response.ok) {
    throw new Error("Unable to fetch location weather");
  }
  return await response.json();
};

export const getForecastByCoordinates = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
  if (!response.ok) {
    throw new Error("Unable to fetch forecast");
  }
  return await response.json();
};

export const getMultipleCitiesWeather = async () => {
  const cities = ["New York", "London", "Tokyo", "Dubai", "Bengaluru"];

  const weather = await Promise.all(
    cities.map(async (city) => {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );

      return response.json();
    }),
  );

  return weather;
};
