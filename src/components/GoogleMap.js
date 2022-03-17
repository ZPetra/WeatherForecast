import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "./Map";

const GoogleMap = () => {
  return (
    <Wrapper apiKey={"AIzaSyB8xL-iI2GOjrPFLphwBlarhd4ltVMHWKk"}>
      <Map></Map>
    </Wrapper>
  );
};

export default GoogleMap;
