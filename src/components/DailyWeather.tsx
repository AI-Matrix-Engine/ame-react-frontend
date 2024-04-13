import React from "react";

import WeatherIconPicker from "./WeatherIconPicker";
import { weekday } from "utils/constants";

type DailyWeatherProps = {
  hourlyWeather?: [
    {
      temp: number;
      time: string;
    }
  ];
  dailyWeather?: [
    {
      temp: number;
      time: number;
      condition?: string;
    }
  ];
};

const DailyWeather: React.FC<DailyWeatherProps> = ({ dailyWeather }) => {
  return (
    <div className="mb-5 text-center bg-white border border-gray-400 rounded-md">
      <div className="flex flex-wrap items-center justify-around gap-10 p-8">
        {dailyWeather?.map((el: any, index: number) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center rounded-md justify-normal">
              <p className="mb-5 text-2xl text-center text-black">{weekday[new Date(el.time * 1000).getDay() % 7]}</p>
              <WeatherIconPicker condition={el.condition} />
              <p className="mt-5 text-2xl font-bold text-center"> {el.temp + " °C"}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default DailyWeather;
