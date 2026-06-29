import "./Navbar.css";
import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { WiDaySunny } from "react-icons/wi";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";

function Navbar({ onSearch, onCurrentLocation, darkMode, setDarkMode }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city);

    setCity("");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Monarch Forecast</h2>
      </div>

      <form className="search-box" onSubmit={handleSubmit}>
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </form>

      <div className="nav-actions">
        <button className="location-btn" onClick={onCurrentLocation}>
          <FiMapPin />
          Current Location
        </button>

        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
