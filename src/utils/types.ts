export interface ExtraClassProps {
  className?: string;
}

export interface SuggestionProps {
  id: string;
  displayName: string;
}

export interface WeatherProps {
  name?: string;
  uv?: number;
  weather: string;
  temp: number;
  humidity?: number;
  sunset?: number;
  sunrise?: number;
  visibility?: number;
  windSpeed?: number;
  windDir?: number;
  time: string;
  condition: string;
}

export interface ForecastProps extends WeatherProps {
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
}
