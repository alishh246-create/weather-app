import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cloudVideo from "../assets/cloudVideo.mp4";
import nightVideo from "../assets/nightVideo.mp4";

function WeatherBackground() {
  const [city, setCity] = useState("");
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!city) return;
    navigate("/weather", { state: { city } });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/*  Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-5 right-5 z-[999] px-5 py-2 rounded-full 
  bg-white/20 backdrop-blur-md border border-white/30 
  text-white font-semibold shadow-lg 
  transition duration-300 hover:scale-105"
      >
        {isDark ? "LIGHT🌝" : "DARK🌚"}
      </button>

      {/*  SINGLE VIDEO ONLY */}
      <video
      key={isDark}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src={isDark ? nightVideo : cloudVideo}
          type="video/mp4"
        />
      </video>

      {/*  UI CARD */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl w-80">

          <h1 className="text-2xl font-bold text-black text-center mb-4">
            Weather App
          </h1>

          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 rounded-lg outline-none mb-4"
          />

          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            Search
          </button>

        </div>
      </div>
    </div>
  );
}

export default WeatherBackground;