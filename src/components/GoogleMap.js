import { Wrapper } from "@googlemaps/react-wrapper";
import MyMapComponent from "./MyMapComponent";

const GoogleMap = () => {
  return (
    <Wrapper apiKey={"AIzaSyB8xL-iI2GOjrPFLphwBlarhd4ltVMHWKk"}>
      <MyMapComponent></MyMapComponent>
    </Wrapper>
  );
};

export default GoogleMap;
