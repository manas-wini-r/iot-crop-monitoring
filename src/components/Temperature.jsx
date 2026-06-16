import React from "react";
import { Thermometer } from "lucide-react";

export default function TemperatureCard({ value }) {
  return (
    <div className="bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 
    text-white rounded-3xl shadow-xl p-6 
    hover:scale-105 hover:shadow-2xl transition duration-300">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="bg-white/30 p-3 rounded-xl backdrop-blur-md">
          <Thermometer size={26} />
        </div>

        <h3 className="text-lg font-semibold tracking-wide">
          Temperature
        </h3>

      </div>

      {/* Value */}
      <h1 className="text-4xl font-bold">
        {value}
        <span className="text-lg ml-2">°C</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm opacity-90 mt-2">
        Current temperature level
      </p>

    </div>
  );
}