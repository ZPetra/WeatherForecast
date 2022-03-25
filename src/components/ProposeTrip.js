import React from "react";
import { useState, useEffect, useCallback } from "react";
import useHttp from "../hooks/use-http";
import classes from "./ProposeTrip.module.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ProposeTrip = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [weatherListSaturday, setWeatherListSaturday] = useState([]);
  const [weatherListSunday, setWeatherListSunday] = useState([]);
  const [suggestion, setSuggestion] = useState([]);

  const applyWeather = useCallback((city, id, saturday, sunday, data) => {
    if (id && city && data.properties.timeseries) {
      let weather = getWeatherForTheWeekday(
        saturday,
        data.properties.timeseries
      );

      setWeatherListSaturday((weatherListSaturday) => [
        ...weatherListSaturday,
        [
          {
            id: id,
            city: city,
            weather: weather, //list of objects that represent temperature, wind and clouds every hour
          },
        ],
      ]);

      weather = getWeatherForTheWeekday(sunday, data.properties.timeseries);

      setWeatherListSunday((weatherListSunday) => [
        ...weatherListSunday,
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

  const getWeatherForTheWeekday = (weekday, timeseries) => {
    let weather = [];
    let forecast = [];
    const array = Array.from(Array(24).keys());

    array?.map((i) =>
      forecast.push(
        timeseries.filter((ts) =>
          ts.time === weekday.toISOString().slice(0, 10) + (i < 10)
            ? "T0"
            : "T" + i + ":00:00Z"
        )
      )
    );

    forecast.map((f) =>
      weather.push({
        temperature: f[0].data.instant.details.air_temperature,
        wind: f[0].data.instant.details.wind_speed,
        clouds: f[0].data.instant.details.cloud_area_fraction,
        summary: f[0].data.next_12_hours.summary.symbol_code,
      })
    );

    return weather;
  };

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const isWeekend = day === 6 || day === 0; // 6 = Saturday, 0 = Sunday

    //if it's not weekend we must get weekend dates
    let saturday = new Date(currentDate);
    let sunday = new Date(currentDate);

    //if it's not weekend, get the dates for saturday and sunday
    if (!isWeekend) {
      saturday.setDate(saturday.getDate() + (6 - day));

      sunday.setDate(sunday.getDate() + (7 - day));
    }
    //if it is, then get the dates for next weekend
    //if today is saturday
    else if (day === 6) {
      saturday.setDate(saturday.getDate() + 7);
      sunday.setDate(sunday.getDate() + 8);
    }
    //if it is, then get the dates for next weekend
    //if today is sunday
    else if (day === 0) {
      saturday.setDate(saturday.getDate() + 6);
      sunday.setDate(sunday.getDate() + 7);
    }

    props.places.forEach((place) => {
      //take weather forecast for every place
      if (place.latitude && place.longitude) {
        sendRequest(
          {
            url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${place.latitude}&lon=${place.longitude}`,
          },
          //applyweather just for next saturday and sunday
          applyWeather.bind(null, place.city, place.id, saturday, sunday)
        );
      }
    });
  }, [sendRequest, props.places, applyWeather]);

  const proposeTrip = () => {
    let suggestionSaturday = [];
    let suggestionSunday = [];

    //suggest all the places that doesn't have rain or snow or sleet on Saturday
    weatherListSaturday &&
      weatherListSaturday.forEach((element) => {
        if (
          !element[0].weather.includes("rain") &&
          !element[0].weather.includes("snow") &&
          !element[0].weather.includes("sleet")
        ) {
          suggestionSaturday.push(element[0]);
        }
      });

    //suggest all the places that doesn't have rain or snow or sleet on Sunday
    weatherListSunday &&
      weatherListSunday.forEach((element) => {
        if (
          !element[0].weather.includes("rain") &&
          !element[0].weather.includes("snow") &&
          !element[0].weather.includes("sleet")
        ) {
          suggestionSunday.push(element[0]);
        }
      });

    //make intersection array of those two arrays
    let finalSuggestion = suggestionSaturday.filter((sat) =>
      suggestionSunday.some((sun) => sat.city === sun.city)
    );

    //if final suggestion has more than 5 suggestions, filter those based on temperature and wind
    if (finalSuggestion.length > 5) {
      let temp = [];
      //let wind = [];

      finalSuggestion.map((fs) => {
        let totalTemp = 0;
        //let totalWind = 0;
        fs.weather.forEach((w) => {
          totalTemp = totalTemp + w.temperature;
          //totalWind = totalWind + w.wind
        });

        //get average temperature and wind for every city
        temp.push({ id: fs.id, city: fs.city, weather: totalTemp / 48 });
        //wind.push({id: fs.id, city: fs.city, wind: totalWind/48});

        return temp;
      });

      finalSuggestion =
        temp &&
        temp.sort(function (a, b) {
          return b.weather - a.weather;
        });
      finalSuggestion = finalSuggestion.slice(0, 5);
    }

    setSuggestion(finalSuggestion);
  };

  return (
    <div className={classes.trips}>
      <Tooltip
        disableFocusListener
        title="Note: Propose is based on 10 biggest places in Norway"
      >
        <Button variant="contained" onClick={proposeTrip}>
          Propose Weekend Trip
        </Button>
      </Tooltip>
      {suggestion && (
        <Demo>
          <List>
            {suggestion.map((value) => (
              <ListItem key={value.id}>
                <ListItemText
                  primary={value.city}
                  //secondary={value.weather}
                />
              </ListItem>
            ))}
          </List>
        </Demo>
      )}
    </div>
  );
};

export default ProposeTrip;
