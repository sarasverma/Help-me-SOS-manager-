import React from "react";
import Spinner from "./layout/Spinner";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Track = () => {
  const zoom = 14;
  const center = { lat: 12.9471141, lng: 77.6177294 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });
  console.log(isLoaded);

  return (
    <div className="container">
      {!isLoaded ? (
        <Spinner />
      ) : (
        <GoogleMap
          center={center}
          zoom={zoom}
          mapContainerClassName="mapContainer"
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Track;
