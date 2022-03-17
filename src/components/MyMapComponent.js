import { useRef, useEffect } from "react";

const MyMapComponent = () => {
  let center;
  let zoom;
  
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" />;
};

export default MyMapComponent;
