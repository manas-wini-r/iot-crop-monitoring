import React, { useEffect, useState } from "react";
import Navbar from "./components/Sidebar";

import ConductivityCard from "./components/ConductivityCard";
import CropCard from "./components/Crop";
import HistoryTable from "./components/History";
import HumidityCard from "./components/Humidity";
import RainfallCard from "./components/Rainfall";
import TemperatureCard from "./components/Temperature";

import { database } from "./firebase";
import { ref, onValue } from "firebase/database";

function App() {

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [moisture, setMoisture] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [crop, setCrop] = useState("Loading...");

  useEffect(() => {

    const sensorRef = ref(database, "sensorData");

    onValue(sensorRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {
        setTemperature(data.temperature);
        setHumidity(data.humidity);
        setMoisture(data.moisture);
        setRainfall(data.rainfall);
        setCrop(data.crop);
      }

    });

  }, []);

  return (

    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 min-h-screen">

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="p-10">

        {/* Dashboard Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Smart Agriculture Dashboard 🌱
          </h1>
          <p className="text-gray-500 mt-2">
            Monitor your farm sensors in real-time
          </p>
        </div>

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <TemperatureCard value={temperature} />

          <HumidityCard value={humidity} />

          <RainfallCard value={rainfall} />

          <ConductivityCard value={moisture} />

          <CropCard crop={crop} />

        </div>

        {/* History Table */}
        <div className="mt-12">
          <HistoryTable />
        </div>

      </div>

    </div>

  );
}

export default App;