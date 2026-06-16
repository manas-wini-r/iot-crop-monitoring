import React from "react";
import { Droplets } from "lucide-react";

export default function HumidityCard({ value }) {
  return (
    <div className="bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 
    text-white rounded-3xl shadow-xl p-6 
    hover:scale-105 hover:shadow-2xl transition duration-300">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="bg-white/30 p-3 rounded-xl backdrop-blur-md">
          <Droplets size={26} />
        </div>

        <h3 className="text-lg font-semibold tracking-wide">
          Humidity
        </h3>

      </div>

      {/* Value */}
      <h1 className="text-4xl font-bold">
        {value}
        <span className="text-lg ml-1">%</span>
      </h1>

      {/* Small indicator */}
      <p className="text-sm opacity-90 mt-2">
        Soil moisture level
      </p>

    </div>
  );
}