import React from "react";

import {
  BsSunFill,
  BsSnow,
  BsFillCloudRainHeavyFill,
  BsCloudDrizzleFill,
  BsFillCloudLightningRainFill,
  BsCloudsFill,
} from "react-icons/bs";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

import { formatTime } from "utils/functions";
import { weekday } from "utils/constants";

interface ForecastProps {
  temperature: number;
  location?: string;
  time?: string;
  condition: string;
}

const WeatherForecast: React.FC<ForecastProps> = ({ temperature, location, time, condition = "" }) => {
  const date = new Date(JSON.parse(time!));
  const dayName = weekday[date.getDay() % 7];
  const hours = formatTime(date.getHours());
  const mins = formatTime(date.getMinutes());
  let src = "";
  let icon: ReactJSXElement;
  if (condition.toLowerCase().includes("rain")) {
    src = "bg-rain";
    icon = <BsFillCloudRainHeavyFill color="white" size={55} />;
  } else if (condition.toLowerCase().includes("drizzle")) {
    src = "bg-drizzle";
    icon = <BsCloudDrizzleFill color="white" size={55} />;
  } else if (condition.toLowerCase().includes("snow")) {
    src = "bg-snow";
    icon = <BsSnow color="white" size={55} />;
  } else if (condition.toLowerCase().includes("sunny") || condition.toLowerCase().includes("clear")) {
    src = "bg-sunny";
    icon = <BsSunFill color="white" size={55} />;
  } else if (condition.toLowerCase().includes("thunderstorm")) {
    src = "bg-thunderstorm";
    icon = <BsFillCloudLightningRainFill color="white" size={55} />;
  } else if (condition.toLowerCase().includes("cloud")) {
    src = "bg-cloud";
    icon = <BsCloudsFill color="white" size={55} />;
  } else {
    src = "bg-cloud";
    icon = <BsCloudsFill color="white" size={55} />;
  }

  return (
    <div
      className={`relative bg-blue-400 bg-center bg-no-repeat bg-cover rounded-md tablet:rounded-none min-h-[350px] max-h-[600px] tablet:-mx-4 ${src}`}
    >
      <div className="absolute bottom-0 flex flex-row justify-between w-full font-bold text-white">
        <div className="absolute bottom-5 left-10">
          {icon}
          <p className="text-5xl"> {Math.round(temperature)}</p>
          <p className="text-2xl"> {location}</p>
        </div>
        <div className="absolute bottom-5 right-10">
          <p className="w-full text-2xl">
            {hours}:{mins}
          </p>
          <p className="text-2xl"> {dayName}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
