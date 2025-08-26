/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  UZBEKISTAN_REGIONS,
  API_CONFIG,
  UI_CONFIG,
  TEXT,
  DEFAULT_RECENT_SEARCHES,
} from "./constants";
import {
  getWeatherBackground,
  getWeatherColor,
  formatTemperature,
  formatDate,
} from "./utils/weather";
import { getWeatherIcon } from "./utils/getWeatherIcon";
import { sky } from "./assets";
import "./App.scss";
import SunCloudSvg from "./assets/icons/SunCloudSvg";
import {
  Clock,
  Cloudy,
  Droplet,
  Search,
  Umbrella,
  UserStar,
  Wind,
} from "lucide-react";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [currentWeather, setCurrentWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>(
    UI_CONFIG.DEFAULT_CITY
  );
  const [recentSearches, setRecentSearches] = useState<string[]>(
    DEFAULT_RECENT_SEARCHES
  );

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}?q=${cityName}&appid=${API_CONFIG.KEY}&units=${API_CONFIG.UNITS}&lang=${API_CONFIG.LANGUAGE}`
      );

      if (!response.ok) {
        throw new Error(TEXT.CITY_NOT_FOUND);
      }

      const data: any = await response.json();
      setWeatherData(data);
      setCurrentWeather(data.list[0]);

      // Add to recent searches
      if (!recentSearches.includes(cityName)) {
        setRecentSearches((prev) => [
          cityName,
          ...prev.slice(0, UI_CONFIG.RECENT_SEARCHES_LIMIT),
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : TEXT.ERROR_OCCURRED);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery.trim());
      setSearchQuery("");
    }
  };

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    fetchWeatherData(cityName);
  };

  const handleRecentSearch = (cityName: string) => {
    fetchWeatherData(cityName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const backgroundImage = currentWeather
    ? getWeatherBackground(currentWeather.weather[0].icon)
    : sky;

  const infoBoxColor = currentWeather
    ? getWeatherColor(currentWeather.weather[0].icon)
    : "rgba(135, 206, 235, 0.8)";

  return (
    <div className="weather-app">
      <div
        className="weather-main"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay" />
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        <div className="weather-info" style={{ backgroundColor: infoBoxColor }}>
          {currentWeather && weatherData && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h1 className="temperature">
                  {formatTemperature(currentWeather.main.temp)}
                </h1>
                <h2 className="city">{weatherData.city.name}</h2>
                <div className="details">
                  <span>{formatDate(currentWeather.dt_txt)}</span>{" "}
                  <span className="status">
                    {currentWeather.weather[0].description}
                  </span>
                </div>
              </div>{" "}
              <div>
                {currentWeather ? (
                  getWeatherIcon(currentWeather.weather[0].icon, {
                    width: "80px",
                    height: "80px",
                    fill: "#fff",
                  })
                ) : (
                  <SunCloudSvg width="80px" height="80px" fill="#fff" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar" style={{ backgroundColor: infoBoxColor }}>
        <div className="locations">
          <div className="search-section">
            {error && <div className="error-message">{error}</div>}

            <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={UI_CONFIG.SEARCH_PLACEHOLDER}
              />
              <button
                onClick={handleSearch}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Search />
              </button>
            </div>

            <select
              className="city-select"
              value={selectedCity}
              onChange={(e) => handleCitySelect(e.target.value)}
            >
              {" "}
              <option value="">{TEXT.SELECT_REGION}</option>
              {UZBEKISTAN_REGIONS.map((region) => (
                <option key={region.name} value={region.name}>
                  {region.nameEn} ({region.nameUz})
                </option>
              ))}
            </select>
          </div>

          <p className="title">{TEXT.RECENT_SEARCHES}</p>
          <ul className="recent-searches">
            {recentSearches.map((city, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
                onClick={() => handleRecentSearch(city)}
              >
                <Clock color="white" size={15} /> {city}
              </li>
            ))}
          </ul>
        </div>{" "}
        <div className="weather-details">
          <h3>{TEXT.WEATHER_DETAILS}</h3>
          {currentWeather && (
            <div className="list">
              <div className="detail-item">
                <span className="label">
                  <Cloudy />
                  {TEXT.WEATHER_LABELS.CLOUDINESS}
                </span>
                <span className="value">{currentWeather.clouds.all}%</span>
              </div>
              <div className="detail-item">
                <span className="label">
                  <Droplet />
                  {TEXT.WEATHER_LABELS.HUMIDITY}
                </span>
                <span className="value">{currentWeather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="label">
                  <Wind />
                  {TEXT.WEATHER_LABELS.WIND}
                </span>
                <span className="value">
                  {Math.round(currentWeather.wind.speed * 3.6)} km/h
                </span>
              </div>
              <div className="detail-item">
                <span className="label">
                  {" "}
                  <Umbrella />
                  {TEXT.WEATHER_LABELS.RAIN}
                </span>
                <span className="value">
                  {currentWeather.rain ? currentWeather.rain["3h"] : 0} mm
                </span>
              </div>
              <div className="detail-item">
                <span className="label">
                  <UserStar />
                  {TEXT.WEATHER_LABELS.FEELS_LIKE}
                </span>
                <span className="value">
                  {formatTemperature(currentWeather.main.feels_like)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
