import { useML } from "../context/MLContext";
import { Link } from "react-router-dom";

function SoilHealth() {
  const { prediction, formData } = useML();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-yellow-50 p-10">
      {/* Header */}
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800 mb-2">
            Soil Health Overview
          </h1>
          <p className="text-gray-500">
            Key indicators describing the current condition of the soil
          </p>
        </div>
        {!prediction && (
          <Link 
            to="/crop" 
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition shadow-lg font-semibold"
          >
            Run AI Analysis 🚀
          </Link>
        )}
      </div>

      {/* Soil Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* pH Card */}
        <div className="bg-white rounded-2xl shadow-md border-t-4 border-green-500 p-8 hover:shadow-xl hover:-translate-y-1 transition">
          <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">
            pH Level
          </h2>
          <p className="text-3xl font-semibold text-gray-800">
            {prediction ? formData.pH : "6.7"}
          </p>
          <p className={`${prediction ? "text-blue-600" : "text-green-600"} mt-2 text-sm`}>
            {prediction ? "User Input Value" : "Optimal Range"}
          </p>
        </div>

        {/* Soil Type Card */}
        <div className="bg-white rounded-2xl shadow-md border-t-4 border-blue-500 p-8 hover:shadow-xl hover:-translate-y-1 transition">
          <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">
            Soil Type
          </h2>
          <p className="text-3xl font-semibold text-gray-800">
            {prediction ? prediction.predicted_soil : "Loamy"}
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            {prediction ? "AI Predicted Texture" : "Balanced texture"}
          </p>
        </div>

        {/* Fertility Card */}
        <div className="bg-white rounded-2xl shadow-md border-t-4 border-yellow-500 p-8 hover:shadow-xl hover:-translate-y-1 transition">
          <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">
            Confidence Score
          </h2>
          <p className="text-3xl font-semibold text-gray-800 mb-3">
            {prediction ? "High" : "100%"}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
              style={{ width: prediction ? "94%" : "82%" }}
            ></div>
          </div>

          <p className="text-green-600 mt-2 text-sm">
            {prediction ? "Based on 8 parameters" : "Healthy Condition"}
          </p>
        </div>
      </div>

      {/* Information Panel */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Soil Condition Summary
        </h2>
        {prediction ? (
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              Your soil has been identified as <span className="font-bold text-green-700">{prediction.predicted_soil}</span>. 
              The current pH level is {formData.pH}, which is a critical factor for nutrient availability.
            </p>
            <p>
              Our AI recommends <span className="font-bold text-emerald-700">{prediction.recommended_crop}</span> as the 
              optimal choice for your current soil conditions (N:{formData.N}, P:{formData.P}, K:{formData.K}).
            </p>
          </div>
        ) : (
          <p className="text-gray-600 leading-relaxed">
            The soil currently shows a healthy balance of nutrients and structure.
            The pH level falls within the optimal range for most crops, while the
            loamy texture supports proper drainage and root growth. A fertility
            score of 100% indicates that the soil is suitable for productive
            cultivation with minimal amendments. Run an AI analysis to see custom insights.
          </p>
        )}
      </div>
    </div>
  );
}

export default SoilHealth;