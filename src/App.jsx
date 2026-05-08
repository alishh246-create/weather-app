import { Routes, Route } from "react-router-dom";
import WeatherBackground from "./components/WeatherBackground";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WeatherBackground />} />
      <Route path="/weather" element={<WeatherCard />} />
    </Routes>
  );
}

export default App;