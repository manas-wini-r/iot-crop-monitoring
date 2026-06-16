import { useState, useEffect } from "react";
import { useML } from "../context/MLContext";

function CropRecommendation() {
  const { formData, prediction, loading, error, runAnalysis } = useML();
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...localFormData, [name]: value });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    try {
      await runAnalysis(localFormData);
    } catch (err) {
      console.error("Prediction error:", err);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-emerald-200 to-yellow-200 flex items-center justify-center p-8">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-green-800 mb-2">
            🌾 Crop Recommendation
          </h1>
          <p className="text-gray-600 text-lg">
            Smart farming insights based on soil conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form Section */}
          <div className="bg-white/50 p-8 rounded-2xl shadow-inner border border-green-100">
            <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
              <span className="mr-2">📝</span> Enter Soil Parameters
            </h2>
            <form onSubmit={handlePredict} className="grid grid-cols-2 gap-4">
              {[
                { label: "Nitrogen (N)", name: "N", placeholder: "e.g. 90", unit: "mg/kg" },
                { label: "Phosphorus (P)", name: "P", placeholder: "e.g. 42", unit: "mg/kg" },
                { label: "Potassium (K)", name: "K", placeholder: "e.g. 43", unit: "mg/kg" },
                { label: "pH Level", name: "pH", placeholder: "e.g. 6.5", unit: "0-14" },
                { label: "Temp (°C)", name: "temp", placeholder: "e.g. 28", unit: "°C" },
                { label: "Humidity (%)", name: "humidity", placeholder: "e.g. 65", unit: "%" },
                { label: "Moisture (%)", name: "moisture", placeholder: "e.g. 40", unit: "%" },
                { label: "Rainfall (cm)", name: "rainfall", placeholder: "e.g. 15", unit: "cm" },
              ].map((input) => (
                <div key={input.name} className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1 ml-1">
                    {input.label}
                  </label>
                  <input
                    type="number"
                    step="any"
                    name={input.name}
                    value={localFormData[input.name]}
                    onChange={handleInputChange}
                    placeholder={input.placeholder}
                    required
                    className="px-4 py-2 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition bg-white/70"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 ml-1">{input.unit}</span>
                </div>
              ))}
              <button
                type="submit"
                disabled={loading}
                className={`col-span-2 mt-6 py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition active:scale-95 ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                    Analyzing Soil...
                  </div>
                ) : (
                  "Predict Best Crop ✨"
                )}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="flex flex-col justify-center">
            {!prediction && !loading && !error && (
              <div className="text-center p-10 bg-green-50/50 border-2 border-dashed border-green-200 rounded-3xl">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-green-800">Ready for Analysis</h3>
                <p className="text-gray-500 mt-2">
                  Enter the soil parameters on the left to get AI-powered crop recommendations.
                </p>
              </div>
            )}

            {prediction && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700">
                {/* Soil Type Card */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-xl">
                  <h3 className="text-sm uppercase font-bold tracking-widest opacity-80">Predicted Soil Type</h3>
                  <p className="text-4xl font-extrabold mt-1">{prediction.predicted_soil} 🌍</p>
                </div>

                {/* Best Crop Card */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl italic">AI</div>
                  <h3 className="text-lg font-bold tracking-wider opacity-90">🏆 Recommended Best Crop</h3>
                  <p className="text-6xl font-black mt-2 tracking-tight">
                    {prediction.recommended_crop}
                  </p>
                  <p className="mt-4 text-green-100 flex items-center">
                    <span className="mr-2">ℹ️</span>
                    Optimized for your current soil texture and nutrient levels.
                  </p>
                </div>

                {/* Suggestions List */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-gray-700 font-bold mb-4 flex items-center">
                    <span className="mr-2">📊</span> Top Alternatives
                  </h3>
                  <div className="space-y-3">
                    {prediction.top_suggestions?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="font-semibold text-gray-700">{item.crop}</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${item.probability}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-green-600">{item.probability}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropRecommendation;
