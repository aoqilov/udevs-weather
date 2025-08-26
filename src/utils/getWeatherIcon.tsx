import React from "react";
import SunCloudSvg from "../assets/icons/SunCloudSvg";
import CloudSvg from "../assets/icons/CloudSvg";
import Cloud2xSvg from "../assets/icons/Cloud2xSvg";
import CloudRain from "../assets/icons/CloudRain";
import CloudRainFast from "../assets/icons/CloudRainFast";
import ThunderSvg from "../assets/icons/ThunderSvg";
import SnowSvg from "../assets/icons/SnowSvg";
import Mist from "../assets/icons/Mist";
import Moon from "../assets/icons/Moon";
import SunSvg from "../assets/icons/SunSvg";

interface WeatherIconProps {
  width?: string;
  height?: string;
  fill?: string;
}

export const getWeatherIcon = (
  weatherIcon: string,
  props: WeatherIconProps = { width: "80px", height: "80px", fill: "#fff" }
): React.ReactElement => {
  const iconMap: { [key: string]: React.ReactElement } = {
    "01d": <SunSvg {...props} />, // clear sky day
    "01n": <Moon {...props} />, // clear sky night
    "02d": <SunCloudSvg {...props} />, // few clouds day
    "02n": <SunCloudSvg {...props} />, // few clouds night
    "03d": <CloudSvg {...props} />, // scattered clouds day
    "03n": <CloudSvg {...props} />, // scattered clouds night
    "04d": <Cloud2xSvg {...props} />, // broken clouds day
    "04n": <Cloud2xSvg {...props} />, // broken clouds night
    "09d": <CloudRainFast {...props} />, // shower rain day
    "09n": <CloudRainFast {...props} />, // shower rain night
    "10d": <CloudRain {...props} />, // rain day
    "10n": <CloudRain {...props} />, // rain night
    "11d": <ThunderSvg {...props} />, // thunderstorm day
    "11n": <ThunderSvg {...props} />, // thunderstorm night
    "13d": <SnowSvg {...props} />, // snow day
    "13n": <SnowSvg {...props} />, // snow night
    "50d": <Mist {...props} />, // mist day
    "50n": <Mist {...props} />, // mist night
  };

  return iconMap[weatherIcon] || <SunSvg {...props} />;
};
