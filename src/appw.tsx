/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

import { UZBEKISTAN_REGIONS, API_KEY, API_BASE_URL } from "./constants";
import {
  getWeatherBackground,
  formatTemperature,
  formatDate,
  translateWeatherDescription,
} from "./utils/weather";
import "./App.scss";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [currentWeather, setCurrentWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("Tashkent");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Tashkent",
    "Samarkand",
    "Bukhara",
  ]);

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`
      );

      if (!response.ok) {
        throw new Error("Город не найден");
      }

      const data: any = await response.json();
      setWeatherData(data);
      setCurrentWeather(data.list[0]);

      // Add to recent searches
      if (!recentSearches.includes(cityName)) {
        setRecentSearches((prev) => [cityName, ...prev.slice(0, 3)]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
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
  }, []);

  const backgroundImage = currentWeather
    ? getWeatherBackground(currentWeather.weather[0].icon)
    : "/src/assets/sky.jpg";

  return (
    <div className="weather-app">
      {/* Left side - Main Weather */}
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

        <div className="weather-info">
          {currentWeather && weatherData && (
            <>
              <h1 className="temperature">
                {formatTemperature(currentWeather.main.temp)}
              </h1>
              <h2 className="city">{weatherData.city.name}</h2>
              <div className="details">
                <span>{formatDate(currentWeather.dt_txt)}</span>
                <span className="status">
                  {translateWeatherDescription(
                    currentWeather.weather[0].description
                  )}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right side - Sidebar */}
      <div className="sidebar">
        {/* Search + Locations */}
        <div className="locations">
          <div className="search-section">
            {error && <div className="error-message">{error}</div>}

            <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Поиск города..."
              />
              <button onClick={handleSearch}>🔍</button>
            </div>

            <select
              className="city-select"
              value={selectedCity}
              onChange={(e) => handleCitySelect(e.target.value)}
            >
              <option value="">Выберите область Узбекистана</option>
              {UZBEKISTAN_REGIONS.map((region) => (
                <option key={region.name} value={region.name}>
                  {region.nameRu} ({region.nameUz})
                </option>
              ))}
            </select>
          </div>

          <p className="title">Недавние поиски</p>
          <ul className="recent-searches">
            {recentSearches.map((city, index) => (
              <li key={index} onClick={() => handleRecentSearch(city)}>
                {city}
              </li>
            ))}
          </ul>
        </div>

        {/* Weather Details */}
        <div className="weather-details">
          <h3>Детали погоды</h3>
          {currentWeather && (
            <div className="list">
              <div className="detail-item">
                <span className="label">Облачность</span>
                <span className="value">{currentWeather.clouds.all}%</span>
              </div>
              <div className="detail-item">
                <span className="label">Влажность</span>
                <span className="value">{currentWeather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="label">Ветер</span>
                <span className="value">
                  {Math.round(currentWeather.wind.speed * 3.6)} км/ч
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Дождь</span>
                <span className="value">
                  {currentWeather.rain ? currentWeather.rain["3h"] : 0} мм
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Ощущается как</span>
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
