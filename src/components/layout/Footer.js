import React from "react";
import "./Footer.css";

const About = () => {
  return (
    <div className="footer navbar-dark bg-dark">
      <ul className="aboutPoints">
        <li>Live Location of the user📍</li>
        <li>Email Message 📧</li>
        <li>SMS to emergency contact🤳</li>
        <li>Video 📷 and audio 🎙️ of the emergency</li>
      </ul>
    </div>
  );
};

export default About;
