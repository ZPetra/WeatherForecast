import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import classes from "./Map.module.css";
import Card from "../UI/Card";
import { useState } from "react";

 const AddMarkerToClick = (props) => {
  const [marker, setMarker] = useState({ lat: "59.844815", lng: "10.788574" });

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      setMarker(newMarker);
      props.parentCallback(newMarker);
    }, 
  });

  return (
    <Marker position={marker}>
      <Popup>Marker is at</Popup>
    </Marker>
  );
}; 

const Map = (props) => {
  const position = [59.9139, 10.7522];
  return (
    <Card className={classes["map-container"]} width="100%">
      <MapContainer
        center={position}
        zoom={7}
        className={classes["leaflet-container"]}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       <AddMarkerToClick parentCallback={props.parentCallback}></AddMarkerToClick>
      </MapContainer>
    </Card>
  );
};

export default Map;
