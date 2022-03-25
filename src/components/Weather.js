import Card from ".././UI/Card";
import { useState, useEffect } from "react";
import useHttp from ".././hooks/use-http";
import WeatherDetails from "./WeatherDetails";
import ImageComponent from "../UI/ImageComponent";
import classes from "./Weather.module.css";

const Weather = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [weatherForTodayList, setWeatherForTodayList] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [selectedPlace, setSelectedPlace] = useState({
    latitude: "",
    longitude: "",
  });

  const applyWeather = (data) => {
    setWeatherForTodayList(data.properties.timeseries);
  };

  useEffect(() => {
    setCurrentDateTime(new Date());

    //get current location
    navigator.geolocation.getCurrentPosition((position) =>
      setSelectedPlace({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        city: "Oslo",
      })
    );
  }, []);

  useEffect(() => {
    if (props.city != null) {
      setSelectedPlace(props.city[0]);
    }

    if (selectedPlace.latitude && selectedPlace.longitude) {
      sendRequest(
        {
          url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${selectedPlace.latitude}&lon=${selectedPlace.longitude}`,
        },
        applyWeather
      );
    }
  }, [sendRequest, selectedPlace, props.city]);

  return (
    <div>
      <Card>
        {weatherForTodayList &&
          weatherForTodayList
            .filter(
              (f) =>
                currentDateTime.setHours(currentDateTime.getHours() - 1) <
                  new Date(f.time) &&
                new Date(f.time) <
                  currentDateTime.setHours(currentDateTime.getHours() + 1)
            )
            .map((weather, i) => {
              return (
                <div key={i} className={classes["flex-container"]}>
                  {/* <div key={i} className={classes["grid-container"]}> */}
                  <div>
                    <WeatherDetails
                      timespan={"Now"}
                      city={selectedPlace.city}
                      temperature={weather.data.instant.details.air_temperature}
                      wind={weather.data.instant.details.wind_speed}
                      image={weather.data.next_1_hours.summary.symbol_code}
                      precipitation={
                        weather.data.next_1_hours.details.precipitation_amount
                      }
                    ></WeatherDetails>
                  </div>
                  <div className={classes["grid-container-images"]}>
                    <div>
                      <ImageComponent
                        title={"Next 6 hours: "}
                        image={weather.data.next_6_hours.summary.symbol_code}
                        precipitation={
                          weather.data.next_6_hours.details.precipitation_amount
                        }
                      ></ImageComponent>
                    </div>
                    <div>
                      <ImageComponent
                        title={"Next 12 hours: "}
                        image={weather.data.next_12_hours.summary.symbol_code}
                      ></ImageComponent>
                    </div>
                  </div>
                </div>
              );
            })}
      </Card>
    </div>
  );
};

export default Weather;
