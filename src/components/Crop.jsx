import React from "react";
import { Sprout } from "lucide-react";
import { motion } from "framer-motion";

export default function CropCard({ crop }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-green-50 via-white to-emerald-100 
                 rounded-3xl shadow-xl p-6 border border-green-100 
                 flex flex-col items-center justify-center text-center"
    >

      
      <div className="p-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg mb-4">
        <Sprout className="text-white" size={30} />
      </div>

      {/* Title */}
      <h3 className="text-gray-600 font-semibold text-lg mb-2">
        Recommended Crop
      </h3>

      {/* Crop Name */}
      <h1 className="text-3xl font-bold text-green-700 tracking-wide">
        {crop}
      </h1>

    </motion.div>
  );
}