import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

import axios from "axios";

import Container from "components/Container";
import type { ForecastProps } from "utils/types";

const WeatherForecast = dynamic(() => import("components/WeatherForecast"));
const WeatherStatus = dynamic(() => import("components/WeatherStatus"));
const DailyWeather = dynamic(() => import("components/DailyWeather"));

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  let x = {} as ForecastProps;
  let error = false;

  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${params!.city}&units=metric&appid=${
        process.env.OPEN_WEATHER_API
      }`
    )
    .then(async (res) => {
      await axios
        .get(
          `https://api.openuv.io/api/v1/uv?lat=${res.data.city.coord.lat.toFixed(
            2
          )}&lng=${res.data.city.coord.lon.toFixed(2)}`,
          {
            headers: {
              "x-access-token": `${process.env.OPEN_UV_API}`,
            },
          }
        )
        .then((res) => {
          x = { ...x, uv: res.data.result.uv };
        })
        .catch(() => (x = { ...x, uv: -1 }));
      const now = new Date();
      const offset = now.getTimezoneOffset();
      x = {
        ...x,
        name: res.data.city.name,
        weather: res.data.list[0].weather[0].main,
        temp: res.data.list[0].main.temp,
        humidity: res.data.list[0].main.humidity,
        sunset: res.data.city.sunset,
        sunrise: res.data.city.sunrise,
        visibility: res.data.list[0].visibility,
        windDir: res.data.list[0].wind.deg,
        windSpeed: res.data.list[0].wind.speed,
        time: JSON.stringify(new Date(now.getTime() + offset * 60 * 1000 + res.data.city.timezone * 1000)),
        condition: res.data.list[0].weather[0].main,

        dailyWeather: res.data.list
          .filter((el: any) => el.dt_txt.includes("12:00:00"))
          .map((el: any) => {
            return {
              time: el.dt,
              temp: el.main.temp.toFixed(0),
              condition: el.weather[0].main,
            };
          }),
      };
    })
    .catch(async () => {
      error = true;
    });
  if (error)
    return {
      notFound: true,
    };
  else
    return {
      props: {
        ...(x ? x : {}),
      },
    };
};

const CityPage: NextPage<ForecastProps> = ({
  humidity,
  name,
  sunrise,
  sunset,
  temp,
  uv,
  time,
  dailyWeather,
  windDir,
  windSpeed,
  condition,
}) => {
  return (
    <Container>
      <Head>
        <title>Weather | {name}</title>
      </Head>
      <div className="flex flex-col space-y-4 p-10 tablet:p-4 tablet:pt-0">
        <WeatherForecast time={time} temperature={temp} location={name} condition={condition} />
        <WeatherStatus
          sunrise={sunrise!}
          sunset={sunset!}
          humidity={humidity!}
          UV={uv!}
          windDir={windDir!}
          windSpeed={windSpeed!}
        />
        <DailyWeather dailyWeather={dailyWeather!} />
      </div>
    </Container>
  );
};

export default CityPage;
