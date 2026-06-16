import React from "react";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ConductivityCard({ value }) {

  const max = 1000;
  const percent = (value / max) * 100;

  const getGradient = () => {
    if (value < 300) return "from-green-400 via-emerald-500 to-teal-500";
    if (value < 700) return "from-yellow-400 via-orange-500 to-red-400";
    return "from-red-500 via-pink-500 to-purple-500";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-blue-50 via-white to-purple-100 
                 rounded-3xl shadow-2xl p-6 border border-gray-200 overflow-hidden"
    >

      {/* Decorative gradient circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">

        <motion.div
          whileHover={{ rotate: 10 }}
          className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
        >
          <Zap className="text-white" size={26} />
        </motion.div>

        <h3 className="text-gray-700 font-semibold text-lg">
          Electric Conductivity
        </h3>

      </div>

      {/* Value */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 relative z-10">
        {value}
        <span className="text-base font-medium text-gray-600 ml-2">
          µS/cm
        </span>
      </h1>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden relative z-10">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2 }}
          className={`h-4 rounded-full bg-gradient-to-r ${getGradient()} shadow-lg`}
        />

      </div>

      {/* Scale */}
      <div className="flex justify-between text-xs mt-3 font-medium relative z-10">
        <span className="text-green-600">0</span>
        <span className="text-orange-500">500</span>
        <span className="text-red-500">1000</span>
      </div>

    </motion.div>
  );
}