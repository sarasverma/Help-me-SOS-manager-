import { React, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const [loc, setLoc] = useState({
    latitude: "",
    longitude: "",
  });

  const handleTrack = async (e) => {
    e.preventDefault();

    await navigator.geolocation.getCurrentPosition((pos) => {
      setLoc({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });

    // console.log("from function", loc);
    try {
      const url = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/track`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longitude: loc.longitude,
          latitude: loc.latitude,
          authtoken: localStorage.getItem("authtoken"),
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.hasOwnProperty("status")) {
        alert("Email and message sent to your emergency contacts.");
        navigate("/track");
      } else {
        alert(json.detail);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="trackContainer">
      <h1 className="mainHeading">Help me !</h1>
      <button className="btn btn-danger" onClick={handleTrack}>
        Track me!
      </button>
    </div>
  );
};

export default Home;
