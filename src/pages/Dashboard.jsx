import AlertNotification from "../components/AlertNotification";
import { useML } from "../context/MLContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { prediction } = useML();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-200 via-emerald-100 to-blue-200 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-extrabold text-green-800">
            🌾 Smart Farm Dashboard
          </h1>
          <p className="text-gray-700 mt-2 text-lg">
            Real-time monitoring of your agricultural environment
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl px-6 py-3">
          <p className="text-gray-500 text-sm">System Status</p>
          <p className="text-green-600 font-bold">Active</p>
        </div>
      </div>

      {/* Latest Analysis Results (Conditional) */}
      {prediction && (
        <div className="mb-10 animate-in fade-in slide-in-from-top duration-500">
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="bg-green-600 text-white p-4 rounded-2xl shadow-lg text-3xl">
                🤖
              </div>
              <div>
                <h2 className="text-sm uppercase font-bold text-green-800 tracking-widest opacity-70">Latest AI Insight</h2>
                <p className="text-2xl font-black text-gray-800">
                  Recommended: <span className="text-green-700">{prediction.recommended_crop}</span>
                </p>
                <p className="text-gray-600">Based on your recent soil analysis</p>
              </div>
            </div>
            <Link 
              to="/crop" 
              className="bg-white text-green-700 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition shadow-md border border-green-100"
            >
              View Full Report →
            </Link>
          </div>
        </div>
      )}

      {/* Alert Section */}
      <div className="mb-8">
        <AlertNotification />
      </div>

      {/* Monitoring Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Soil */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <h2 className="text-xl font-bold text-green-700 mb-3">🌱 Soil Health</h2>
          <p className="text-gray-600">
            {prediction 
              ? `Currently identified as ${prediction.predicted_soil}. Health: Optimal.` 
              : "Monitor soil conductivity and nutrient levels for optimal crop growth."}
          </p>
        </div>

        {/* Humidity */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <h2 className="text-xl font-bold text-blue-700 mb-3">💧 Humidity</h2>
          <p className="text-gray-600">
            Track atmospheric moisture levels affecting plant health.
          </p>
        </div>

        {/* Rainfall */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transition">
          <h2 className="text-xl font-bold text-indigo-700 mb-3">🌧 Rainfall</h2>
          <p className="text-gray-600">
            Measure rainfall data for irrigation planning.
          </p>
        </div>

        {/* Crop Prediction */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:scale-105 transition border-2 border-transparent hover:border-purple-400">
          <h2 className="text-xl font-bold text-purple-700 mb-3">🌾 Crop Prediction</h2>
          <p className="text-gray-600">
            {prediction 
              ? `AI Suggests: ${prediction.recommended_crop}.` 
              : "AI-powered recommendations for the best crops based on soil data."}
          </p>
          {prediction && (
            <div className="mt-3 text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded inline-block">
              UP-TO-DATE
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Live Farm Monitoring
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {prediction ? (
            `Based on your last analysis, the AI model has processed your soil's specific Nitrogen, Phosphorus, and Potassium levels to recommend ${prediction.recommended_crop}. This dashboard now reflects those personalized insights across all monitoring modules.`
          ) : (
            "This dashboard provides real-time insights into farm conditions such as soil conductivity, rainfall levels, humidity, and crop recommendations. By analyzing sensor data, farmers can make informed decisions to improve productivity and sustainability."
          )}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;