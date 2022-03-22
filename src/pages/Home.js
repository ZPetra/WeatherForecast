import Weather from ".././components/Weather";
import SelectComponent from ".././UI/SelectComponent";
import Map from ".././UI/Map";
import { useState } from "react";
import ProposeTrip from "../components/ProposeTrip";

const Home = () => {
  const PLACES = [
    { id: "1", city: "Oslo", latitude: "59.911491", longitude: "10.757933" },
    { id: "2", city: "Drammen", latitude: "59.74389", longitude: "10.20449" },
    { id: "3", city: "Stavanger/Sandnes", latitude: "58.969975", longitude: "5.733107" },
    { id: "4", city: "Bergen", latitude: "60.39299", longitude: "5.32415" },
    { id: "5", city: "Trondheim", latitude: "63.446827", longitude: "10.421906" },
    {
      id: "6",
      city: "Fredrikstad/Sarpsborg",
      latitude: "59.284073",
      longitude: "11.109403",
    },
    { id: "7", city: "Kristiansand", latitude: "58.14671", longitude: "7.9956" },
    { id: "8", city: "Ålesund", latitude: "62.47225", longitude: "6.15492" },
    { id: "9", city: "Tønsberg", latitude: "59.26754", longitude: "10.40762" },
  ];

  const [city, setcity] = useState(null);

  const searchWeather = (search) => {
    var place = PLACES.filter((p) => p.id === search);
    setcity(place);
  };

  const handleCallback = (childData) =>{
    console.log("Sent data:" + childData);
  }

  return (
    <div>
      <SelectComponent
        filterName={"Cities"}
        items={PLACES}
        searchWeather={searchWeather}
      ></SelectComponent>
      <Map parentCallback={handleCallback}></Map>
      <ProposeTrip places={PLACES}></ProposeTrip>
      <Weather city={city}></Weather>
    </div>
  );
};

export default Home;
