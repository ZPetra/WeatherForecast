import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import useHttp from "./hooks/use-http";
import { useState, useEffect } from "react";


function App() {
  const [citiesInNorway, setCitiesInNorway] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

   //get the 50 biggest places in norway
   const applyCitiesInNorway = (data) => {
    let cities = [];
    data.records.map((c, i) => 
      cities.push({
        id: i,
        city: c.fields.name,
        latitude: c.fields.coordinates[0],
        longitude: c.fields.coordinates[1],
      }));

    setCitiesInNorway(cities);
  };

  useEffect(() => {
    sendRequest(
      {
        url: `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=50&q=&refine.cou_name_en=Norway&sort=population`,
      },
      applyCitiesInNorway
    );
  }, [sendRequest]);

  return (
    <Layout>
    <Routes>
      <Route path="/" element={<Home citiesInNorway={citiesInNorway}></Home>}></Route>
    </Routes>
  </Layout>
  );
}

export default App;
