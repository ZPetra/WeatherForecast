import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import classes from "./Map.module.css";
import Card from "../UI/Card";
import { useState, useEffect } from "react";

const AddMarkerToClick = (props) => {
  //const [marker, setMarker] = useState({ lat: "59.844815", lng: "10.788574" });
  const [marker, setMarker] = useState(props.position);

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      setMarker(newMarker);
      //props.parentCallback(newMarker);
    },
  });

  useEffect(() => {
    if (props.position.lat && props.position.lng) {
      const newMarker = props.position;
      setMarker(newMarker);
      //props.parentCallback(newMarker);
    }
  }, [props]);

  return (
    <Marker position={marker}>
      <Popup>Latitude: {marker.lat}, Longitude: {marker.lng}</Popup>
    </Marker>
  );
};

const Map = (props) => {
  const [position, setPosition] = useState();

  //if city is selected set marker there
  //you get sity from props.city
  useEffect(() => {
    if (props.city != null) {
      setPosition({
        lat: props.city[0].latitude,
        lng: props.city[0].longitude,
      });
    } else {
      navigator.geolocation.getCurrentPosition((position) =>
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    }
  }, [props.city]);

  return (
    <Card className={classes["map-container"]} width="100%">
      <MapContainer
        center={
          position != null ? position : { lat: "59.844815", lng: "10.788574" }
        }
        zoom={5}
        className={classes["leaflet-container"]}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkerToClick
          //parentCallback={props.parentCallback}
          position={
            position != null ? position : { lat: "59.844815", lng: "10.788574" }
          }
        ></AddMarkerToClick>
      </MapContainer>
    </Card>
  );
};

export default Map;
