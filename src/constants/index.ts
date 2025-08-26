// API Configuration
export const API_CONFIG = {
  KEY: "6d533f48c1a82724d9624fcf0765d929",
  BASE_URL: "https://api.openweathermap.org/data/2.5/forecast",
  UNITS: "metric",
  LANGUAGE: "en", // Changed to English
} as const;

// UI Configuration
export const UI_CONFIG = {
  SIDEBAR_WIDTH: "33%",
  RECENT_SEARCHES_LIMIT: 2,
  SEARCH_PLACEHOLDER: "Search city...",
  DEFAULT_CITY: "Tashkent",
} as const;

// Weather Configuration
export const WEATHER_CONFIG = {
  DEFAULT_BACKGROUND: "/src/assets/sky.jpg",
  WIND_CONVERSION_FACTOR: 3.6, // m/s to km/h
} as const;

// Uzbekistan Regions
export const UZBEKISTAN_REGIONS = [
  { name: "Tashkent", nameUz: "Toshkent", nameEn: "Tashkent" },
  { name: "Samarkand", nameUz: "Samarqand", nameEn: "Samarkand" },
  { name: "Bukhara", nameUz: "Buxoro", nameEn: "Bukhara" },
  { name: "Andijan", nameUz: "Andijon", nameEn: "Andijan" },
  { name: "Fergana", nameUz: "Farg'ona", nameEn: "Fergana" },
  { name: "Namangan", nameUz: "Namangan", nameEn: "Namangan" },
  { name: "Nukus", nameUz: "Nukus", nameEn: "Nukus" },
  { name: "Urgench", nameUz: "Urganch", nameEn: "Urgench" },
  { name: "Qarshi", nameUz: "Qarshi", nameEn: "Qarshi" },
  { name: "Termez", nameUz: "Termiz", nameEn: "Termez" },
  { name: "Jizzakh", nameUz: "Jizzax", nameEn: "Jizzakh" },
  { name: "Gulistan", nameUz: "Guliston", nameEn: "Gulistan" },
];

// Default Recent Searches
export const DEFAULT_RECENT_SEARCHES = ["Tashkent", "Samarkand", "Bukhara"];

// Text Constants in English
export const TEXT = {
  RECENT_SEARCHES: "Recent Searches",
  WEATHER_DETAILS: "Weather Details",
  SELECT_REGION: "Select Uzbekistan Region",
  CITY_NOT_FOUND: "City not found",
  ERROR_OCCURRED: "An error occurred",
  WEATHER_LABELS: {
    CLOUDINESS: "Cloudiness",
    HUMIDITY: "Humidity",
    WIND: "Wind",
    RAIN: "Rain",
    FEELS_LIKE: "Feels like",
  },
} as const;

// Keep old exports for backward compatibility
export const API_KEY = API_CONFIG.KEY;
export const API_BASE_URL = API_CONFIG.BASE_URL;
