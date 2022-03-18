import { useRef, useEffect, useState } from "react";
import classes from "./MyMapComponent.module.css";

const MyMapComponent = () => {
  let center = {lat: 59.9139, lng: 10.7522};
  let zoom = 5;
  
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" className={classes.map} />;
};

export default MyMapComponent;
