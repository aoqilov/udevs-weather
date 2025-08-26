// Weather icon to background image mapping
export const getWeatherBackground = (weatherIcon: string): string => {
  const iconMap: { [key: string]: string } = {
    "01d": "/src/assets/sky.jpg", // clear sky day
    "01n": "/src/assets/skynight.jpg", // clear sky night - updated
    "02d": "/src/assets/few-clouds.jpg", // few clouds day
    "02n": "/src/assets/few-clouds-night.jpg", // few clouds night - updated
    "03d": "/src/assets/broken-cloud-day.jpg", // scattered clouds
    "03n": "/src/assets/broken-cloud-night.jpg",
    "04d": "/src/assets/broken-cloud-day.jpg", // broken clouds
    "04n": "/src/assets/broken-cloud-night.jpg",
    "09d": "/src/assets/rain.jpg", // shower rain
    "09n": "/src/assets/shower-rain2.jpg",
    "10d": "/src/assets/rain.jpg", // rain
    "10n": "/src/assets/rain.jpg",
    "11d": "/src/assets/lighting.jpg", // thunderstorm
    "11n": "/src/assets/lighting.jpg",
    "13d": "/src/assets/snow.jpg", // snow
    "13n": "/src/assets/nightsnow.jpg", // night snow - updated
    "50d": "/src/assets/foogy.jpg", // mist/fog
    "50n": "/src/assets/foogy.jpg",
  };

  return iconMap[weatherIcon] || "/src/assets/sky.jpg";
};

// Weather icon to dominant color mapping for info box background
export const getWeatherColor = (weatherIcon: string): string => {
  const colorMap: { [key: string]: string } = {
    "01d": "rgba(35, 95, 31, 0.8)", // clear sky day - sky blue
    "01n": "rgba(25, 25, 112, 0.8)", // clear sky night - midnight blue
    "02d": "rgba(176, 196, 222, 0.8)", // few clouds day - light steel blue
    "02n": "rgba(47, 79, 79, 0.8)", // few clouds night - dark slate gray
    "03d": "rgba(119, 136, 153, 0.8)", // scattered clouds - light slate gray
    "03n": "rgba(105, 105, 105, 0.8)",
    "04d": "rgba(112, 128, 144, 0.8)", // broken clouds - slate gray
    "04n": "rgba(47, 79, 79, 0.8)",
    "09d": "rgba(70, 130, 180, 0.8)", // shower rain - steel blue
    "09n": "rgba(112, 95, 25, 0.8)",
    "10d": "rgba(65, 105, 225, 0.8)", // rain - royal blue
    "10n": "rgba(114, 64, 30, 0.6)",
    "11d": "rgba(72, 61, 139, 0.8)", // thunderstorm - dark slate blue
    "11n": "rgba(47, 47, 79, 0.8)",
    "13d": "rgba(240, 248, 255, 0.8)", // snow - alice blue
    "13n": "rgba(230, 230, 250, 0.8)",
    "50d": "rgba(211, 211, 211, 0.8)", // mist/fog - light gray
    "50n": "rgba(169, 169, 169, 0.8)",
  };

  return colorMap[weatherIcon] || "rgba(135, 206, 235, 0.8)";
};

// Format temperature
export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°`;
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

// Weather description translation to Russian
