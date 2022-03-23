import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import classes from "./WeatherDetails.module.css";

const WeatherDetails = (props) => {
  const imagepath = require(`../assets/${props.image}.png`);
  return (
    <Box
      cssClass={classes.box}
      sx={{ width: "100%", height: "100%", maxWidth: 500, margin: 3 }}
    >
      <Typography variant="h4" component="div" gutterBottom>
        {props.city}
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Temperature: {props.temperature}
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        Wind: {props.wind}
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
        Precipitation: {props.precipitation}
      </Typography>
      <img src={imagepath} alt="weather" />
    </Box>
  );
};

export default WeatherDetails;
