import Card from ".././UI/Card";
import { useState, useEffect, useCallback } from "react";
import useHttp from ".././hooks/use-http";
import ImageComponent from "../UI/ImageComponent";
import Button from "@mui/material/Button";

const ProposeTrip = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [weatherList, setWeatherList] = useState([]);

  const applyWeather = useCallback((city, id, saturday, sunday, data) => {

    if (id && city && data.properties.timeseries) {
      const forecast = data.properties.timeseries.filter(
        (ts) => ts.time === saturday.toISOString().slice(0, 10) + "T12:00:00Z"
      );

      const weather = forecast[0].data.next_12_hours.summary.symbol_code;

      setWeatherList((weatherList) => [
        ...weatherList,
        [
          {
            id: id,
            city: city,
            weather: weather,
          },
        ],
      ]);
    }
  }, []);


  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const isWeekend = day === 6 || day === 0; // 6 = Saturday, 0 = Sunday

    //if it's not weekend we must get weekend dates
    const saturday = new Date(currentDate);
    const sunday = new Date(currentDate);

    if (!isWeekend) {
      saturday.setDate(saturday.getDate() + (6 - day));

      sunday.setDate(sunday.getDate() + (7 - day));
    }

    props.places.forEach((place) => {
      //you need to take weather forecast for every place here
      if (place.latitude && place.longitude) {
        sendRequest(
          {
            url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${place.latitude}&lon=${place.longitude}`,
          },
          applyWeather.bind(null, place.city, place.id, saturday, sunday)
        );
      }
    });
  }, [sendRequest, props.places]);

  const proposeTrip = () => {
    const suggestion = [];

    //suggest all the places that doesn't have rain or snow or sleet on Saturday
    weatherList &&
      weatherList.forEach((element) => {
        if (
          !element[0].weather.includes("rain") &&
          !element[0].weather.includes("snow") &&
          !element[0].weather.includes("sleet")
        ) {
          suggestion.push(element[0]);
        }
      });

      console.log("suggestions: " + suggestion);
  };

  return (
    <div>
      <Button
        sx={{ margin: "0 30px" }}
        variant="outlined"
        onClick={proposeTrip}
      >
        Propose Trip
      </Button>
    </div>
  );
};

export default ProposeTrip;
