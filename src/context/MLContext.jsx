import React, { createContext, useContext, useState, useEffect } from "react";

const MLContext = createContext();

export const useML = () => {
  const context = useContext(MLContext);
  if (!context) {
    throw new Error("useML must be used within an MLProvider");
  }
  return context;
};

export const MLProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    pH: "",
    temp: "",
    humidity: "",
    moisture: "",
    rainfall: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedPrediction = localStorage.getItem("last_prediction");
    const savedFormData = localStorage.getItem("last_form_data");
    if (savedPrediction) setPrediction(JSON.parse(savedPrediction));
    if (savedFormData) setFormData(JSON.parse(savedFormData));
  }, []);

  const runAnalysis = async (data) => {
    setLoading(true);
    setError(null);
    setFormData(data);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction. Check if the ML backend is running.");
      }

      const result = await response.json();
      setPrediction(result);
      
      // Save to LocalStorage
      localStorage.setItem("last_prediction", JSON.stringify(result));
      localStorage.setItem("last_form_data", JSON.stringify(data));
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setPrediction(null);
    setError(null);
    localStorage.removeItem("last_prediction");
    localStorage.removeItem("last_form_data");
  };

  return (
    <MLContext.Provider
      value={{
        formData,
        prediction,
        loading,
        error,
        runAnalysis,
        resetAnalysis
      }}
    >
      {children}
    </MLContext.Provider>
  );
};
