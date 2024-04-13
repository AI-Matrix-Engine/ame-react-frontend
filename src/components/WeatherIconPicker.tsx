import React, { ReactNode } from "react";

import {
  BsBrightnessHigh,
  BsCloudFog2,
  BsCloudHaze,
  BsCloudLightningRain,
  BsCloudRainHeavy,
  BsClouds,
  BsCloudSnow,
  BsTornado,
} from "react-icons/bs";

interface IconProps {
  condition: string;
}

const WeatherIconPicker: React.FC<IconProps> = ({ condition }) => {
  let weather: ReactNode;
  switch (condition) {
    case "Thunderstorm":
      weather = <BsCloudLightningRain size={40} className="text-sky-500" />;
      break;
    case "Rain":
      weather = <BsCloudRainHeavy size={40} className="text-sky-500" />;
      break;
    case "Snow":
      weather = <BsCloudSnow size={40} className="text-sky-500" />;
      break;
    case "Clear":
      weather = <BsBrightnessHigh size={40} className="text-sky-500" />;
      break;
    case "Clouds":
      weather = <BsClouds size={40} className="text-sky-500" />;
      break;
    case "Fog":
      weather = <BsCloudFog2 size={40} className="text-sky-500" />;
      break;
    case "Tornado":
      weather = <BsTornado size={40} className="text-sky-500" />;
      break;
    case "Haze":
      weather = <BsCloudHaze size={40} className="text-sky-500" />;
      break;
    default:
      weather = <BsBrightnessHigh size={40} className="text-sky-500" />;
      break;
  }
  return weather;
};

export default WeatherIconPicker;
