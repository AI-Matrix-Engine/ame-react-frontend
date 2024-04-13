import React, { ReactElement } from "react";

import { BsWind, BsSunrise, BsSunset, BsSun, BsFillArrowUpCircleFill } from "react-icons/bs";

import { convertTime } from "utils/functions";

type StatusProps = {
  humidity: number;
  sunset: number;
  UV: number;
  sunrise: number;
  windDir: number;
  windSpeed: number;
};

type ItemProps = {
  title: string;
  icon: ReactElement;
  value: string;
};

const WeatherStatus: React.FC<StatusProps> = ({ humidity, UV, sunrise, sunset, windDir, windSpeed }) => {
  const weatherData: ItemProps[] = [
    {
      title: "Humidity",
      icon: <BsWind size={40} className="text-sky-500" />,
      value: `${humidity}%`,
    },
    {
      title: "Sunrise",
      icon: <BsSunrise size={40} className="text-sky-500" />,
      value: `${convertTime(sunrise).hours}:${convertTime(sunrise).mins}`,
    },
    {
      title: "UV Index",
      icon: <BsSun size={40} className="text-sky-500" />,
      value: UV.toFixed(2),
    },
    {
      title: "Sunset",
      icon: <BsSunset size={40} className="text-sky-500" />,
      value: `${convertTime(sunset).hours}:${convertTime(sunset).mins}`,
    },
    {
      title: "Wind",
      icon: (
        <BsFillArrowUpCircleFill size={40} style={{ transform: `rotate(${-windDir}deg)` }} className="text-sky-500" />
      ),
      value: `${(windSpeed * 3.6).toFixed(1)} Km/h`,
    },
  ];

  return (
    <div className="mb-5 text-center bg-white border border-gray-400 rounded-md">
      <div className="flex flex-wrap items-center justify-around gap-3 m-5">
        {weatherData.map((item: ItemProps) => {
          return (
            <div className="flex flex-col items-center rounded-md justify-normal" key={`${item.title}`}>
              <p className="mb-5 text-2xl text-center text-black">{item.title}</p>
              {item.icon}
              <p className="mt-5 text-2xl font-bold text-center">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherStatus;
