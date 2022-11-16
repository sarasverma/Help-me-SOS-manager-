import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Setting from "./components/auth/Setting";
import Home from "./components/Home";
import Track from "./components/Track";
import More from "./components/More";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="mainContainer">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/setting" element={<Setting />} />
            <Route exact path="/track" element={<Track />} />
            <Route exact path="/more" element={<More />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
