import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import cloudVideo from "../assets/cloudVideo.mp4";
import nightVideo from "../assets/nightVideo.mp4";

function WeatherCard() {
    const location = useLocation();
      const [isDark, setIsDark] = useState(false);
    const city = location.state?.city;

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!city) return;

        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError("");

                const apiKey = "c53950719ae12faa751e411d9fd5baa3";
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

                const res = await fetch(url);
                const data = await res.json();
                if(data.cod!==200){
                    throw new Error("city not found")
                }

                setWeather(data);
            } catch (error) {
                console.log(error);
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);


    if (!city) {
        return (
            <div className="text-center mt-10">
                <h2>No city selected</h2>
            </div>
        );
    }



    // API fail check
    if (loading) {
  return (
    <div className="text-white text-center mt-20">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-white mx-auto"></div>
      <p className="mt-3">Fetching weather...</p>
    </div>
  );
}
if (error) {
  return (
    <div className="text-center mt-20 text-white">
      <h2 className="text-2xl font-bold">
        {error}
      </h2>
    </div>
  );
}

    return (
        <div className="relative w-full h-screen flex items-center justify-center">
             {/*  Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-5 right-5 z-[999] px-5 py-2 rounded-full 
  bg-white/20 backdrop-blur-md border border-white/30 
  text-white font-semibold shadow-lg 
  transition duration-300 hover:scale-105"
      >
        {isDark ? " Light Mode" : "Dark Mode"}
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
            {/* 🌫 Glass Card */}
            <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-80 text-center text-white">
                {/* City */}
                <h2 className="text-3xl text-black font-bold mb-2">
                    {weather.name}
                </h2>
                {/* Weather Icon */}
                <img className="mx-auto w-24 h-24"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                {/* Temperature */}
                <h1 className="text-5xl text-black font-bold mt-2">
                    {Math.round(weather.main.temp)}°C
                </h1>
                {/* Description */}
                <p className="capitalize mt-2 text-black text-lg">
                    {weather.weather[0].description}
                </p>
            </div>
            
        </div>);
}
export default WeatherCard;


