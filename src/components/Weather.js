import Card from ".././UI/Card";
import { useState, useEffect } from "react";
import useHttp from ".././hooks/use-http";
import WeatherDetails from "./WeatherDetails";

const Weather = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const [weatherForTodayList, setWeatherForTodayList] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [location, setCurrentLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const applyWeather = (data) => {
    setWeatherForTodayList(data.properties.timeseries);
  };

  useEffect(() => {
    //YYYY-MM-dd
    var date = new Date().toISOString().slice(0, 10);
    //HH:
    var time = new Date()
      .toTimeString()
      .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
      .slice(0, 3);
    setCurrentDateTime(date + "T" + time);

    //get current location
    navigator.geolocation.getCurrentPosition((position) =>
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
        })
    );
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      sendRequest(
        {
          url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.latitude}&lon=${location.longitude}`,
        },
        applyWeather
      );
    }
  }, [sendRequest, location.latitude, location.longitude]);

  //this is just for testing
  /*  useEffect(() => {
    const wfortoday = weatherForTodayList && currentDateTime && weatherForTodayList
            .filter((f) => f.time.includes(currentDateTime));

    console.log("Weather: " + wfortoday);
  }, [weatherForTodayList, currentDateTime]); */

  return (
    <Card>
      {weatherForTodayList &&
        weatherForTodayList
          .filter((f) => f.time.includes(currentDateTime))
          .map((weather, i) => {
            return (
              <WeatherDetails
                key={i}
                temperature={weather.data.instant.details.air_temperature}
                wind={weather.data.instant.details.wind_speed}
                image={weather.data.next_1_hours.summary.symbol_code}
                precipitation={
                  weather.data.next_1_hours.details.precipitation_amount
                }
              ></WeatherDetails>
            );
          })}
    </Card>
  );
};

export default Weather;
