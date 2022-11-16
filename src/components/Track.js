import React from "react";
import Spinner from "./layout/Spinner";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Track = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });
  return <div className="container">{isLoaded ? <Spinner /> : <Maps />}</div>;
};

function Maps() {
  const zoom = 14;
  const center = { lat: 12.9471141, lng: 77.6177294 };

  return (
    <GoogleMap center={center} zoom={zoom} mapContainerClassName="mapContainer">
      <Marker position={center} />
    </GoogleMap>
  );
}

export default Track;
