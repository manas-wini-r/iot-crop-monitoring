from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import torch
import os
from pytorch_tabnet.tab_model import TabNetClassifier

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Paths to artifacts
MODELS_DIR = "models"
SOIL_MODEL_PATH = os.path.join(MODELS_DIR, "soil_tabnet_model.zip")
SOIL_SCALER_PATH = os.path.join(MODELS_DIR, "soil_scaler.joblib")
SOIL_ENCODER_PATH = os.path.join(MODELS_DIR, "soil_encoder.joblib")

CROP_MODEL_PATH = os.path.join(MODELS_DIR, "crop_tabnet_model.zip")
CROP_SCALER_PATH = os.path.join(MODELS_DIR, "crop_scaler.joblib")
CROP_ENCODER_PATH = os.path.join(MODELS_DIR, "crop_encoder.joblib")

# Global variables for models and processors
soil_model = None
soil_scaler = None
soil_encoder = None
crop_model = None
crop_scaler = None
crop_encoder = None

def load_artifacts():
    global soil_model, soil_scaler, soil_encoder, crop_model, crop_scaler, crop_encoder
    
    try:
        if os.path.exists(SOIL_SCALER_PATH):
            soil_scaler = joblib.load(SOIL_SCALER_PATH)
            soil_encoder = joblib.load(SOIL_ENCODER_PATH)
            soil_model = TabNetClassifier()
            soil_model.load_model(SOIL_MODEL_PATH)
            
            crop_scaler = joblib.load(CROP_SCALER_PATH)
            crop_encoder = joblib.load(CROP_ENCODER_PATH)
            crop_model = TabNetClassifier()
            crop_model.load_model(CROP_MODEL_PATH)
            print("Successfully loaded all models and artifacts.")
        else:
            print("Models not found. Please run 'train_model.py' first.")
    except Exception as e:
        print(f"Error loading models: {e}")

# Load models on startup
load_artifacts()

@app.route('/predict', methods=['POST'])
def predict():
    if soil_model is None:
        return jsonify({"error": "Models are not loaded on server. Contact Administrator."}), 500

    try:
        data = request.get_json()
        
        # Extract features
        N = float(data.get('N'))
        P = float(data.get('P'))
        K = float(data.get('K'))
        pH = float(data.get('pH'))
        temp = float(data.get('temp'))
        humidity = float(data.get('humidity'))
        moisture = float(data.get('moisture'))
        rainfall = float(data.get('rainfall'))

        # 1. Soil Prediction
        soil_input_df = pd.DataFrame([{
            'N': N, 'P': P, 'K': K, 'pH': pH,
            'Temp(°C)': temp, 'Humidity(%)': humidity,
            'Moisture(%)': moisture, 'Rainfall(cm)': rainfall
        }])
        
        soil_input_scaled = soil_scaler.transform(soil_input_df)
        soil_pred_class = soil_model.predict(soil_input_scaled)
        predicted_soil = soil_encoder.inverse_transform(soil_pred_class)[0]
        
        # 2. Crop Recommendation
        soil_encoded = soil_encoder.transform([predicted_soil])[0]
        crop_input_df = pd.DataFrame([{
            'N': N, 'P': P, 'K': K, 'pH': pH,
            'Temp(°C)': temp, 'Humidity(%)': humidity,
            'Moisture(%)': moisture, 'Rainfall(cm)': rainfall,
            'Soil_Type_Encoded': soil_encoded
        }])
        
        crop_input_scaled = crop_scaler.transform(crop_input_df)
        crop_pred_class = crop_model.predict(crop_input_scaled)
        recommended_crop = crop_encoder.inverse_transform(crop_pred_class)[0]

        # Top 3 Suggestions
        crop_probs = crop_model.predict_proba(crop_input_scaled)[0]
        top_3_idx = np.argsort(crop_probs)[-3:][::-1]
        top_3_crops = crop_encoder.inverse_transform(top_3_idx)
        top_3_probs = crop_probs[top_3_idx]
        
        suggestions = []
        for crop, prob in zip(top_3_crops, top_3_probs):
            suggestions.append({"crop": str(crop), "probability": round(float(prob) * 100, 2)})

        return jsonify({
            "predicted_soil": str(predicted_soil),
            "recommended_crop": str(recommended_crop),
            "top_suggestions": suggestions
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "models_loaded": soil_model is not None})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
