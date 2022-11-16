import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./layout/Spinner";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const Track = () => {
  const { id } = useParams();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  let json = {};
  let response = {};
  const url = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/location`;

  useEffect(() => {
    // api call for getting lat and longitude
    if (Object.keys(response).length === 0) {
      response = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: id,
        }),
      });
    }
    if (Object.keys(json).length === 0) {
      json = response.json();
      setCenter({ lat: json.longitude, lng: json.latitude });
    }
  }, [json, response]);

  const zoom = 14;
  // const center = { lat: 12.9471141, lng: 77.6177294 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

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
          <MarkerF position={center} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Track;
