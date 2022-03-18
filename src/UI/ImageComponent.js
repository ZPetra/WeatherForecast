import * as React from "react";
import Typography from "@mui/material/Typography";
import classes from "./ImageComponent.module.css";

const ImageComponent = (props) => {
  const imagepath = require(`../assets/${props.image}.png`);

  const showPrecipitation = props.precipitation != null;
  const cssClass = showPrecipitation ? "visible" : "not-visible";
  return (
    <div>
      <Typography variant="h6" component="div" gutterBottom>
        {props.title}
      </Typography>
      <img src={imagepath} alt="weather" className={classes["weather-image"]} />
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom
        className={classes[cssClass]}
      >
        Precipitation: {props.precipitation}
      </Typography>
    </div>
  );
};

export default ImageComponent;
