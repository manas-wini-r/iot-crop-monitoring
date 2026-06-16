import pandas as pd
import numpy as np
import warnings
import os
import joblib
import torch
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score
from pytorch_tabnet.tab_model import TabNetClassifier

warnings.filterwarnings("ignore")

def train_and_save_models(dataset_path="data/New_Final_Dataset_With_8_SoilTypes.xlsx"):
    if not os.path.exists(dataset_path):
        print(f"Error: Dataset not found at {dataset_path}")
        return

    print("Loading dataset...")
    data = pd.read_excel(dataset_path, engine="openpyxl")
    data.columns = data.columns.str.strip()

    # --------------------------------
    # 1. Soil Type Prediction Model
    # --------------------------------
    print("\n--- Training Soil Type Model ---")
    soil_features = ['N', 'P', 'K', 'pH', 'Temp(°C)', 'Humidity(%)', 'Moisture(%)', 'Rainfall(cm)']
    soil_target = 'Soil_Type'

    X_soil = data[soil_features].copy()
    y_soil = data[soil_target].copy()

    soil_encoder = LabelEncoder()
    y_soil_encoded = soil_encoder.fit_transform(y_soil)

    soil_scaler = StandardScaler()
    X_soil_scaled = soil_scaler.fit_transform(X_soil)

    X_train_soil, X_test_soil, y_train_soil, y_test_soil = train_test_split(
        X_soil_scaled, y_soil_encoded, test_size=0.2, random_state=42, stratify=y_soil_encoded
    )

    soil_model = TabNetClassifier(
        optimizer_fn=torch.optim.Adam,
        optimizer_params=dict(lr=2e-2),
        scheduler_params={"step_size":50, "gamma":0.9},
        scheduler_fn=torch.optim.lr_scheduler.StepLR,
        mask_type='entmax',
        verbose=1
    )

    soil_model.fit(
        X_train=X_train_soil, y_train=y_train_soil,
        eval_set=[(X_test_soil, y_test_soil)],
        eval_name=['valid'],
        eval_metric=['accuracy'],
        max_epochs=100,
        patience=20,
        batch_size=256,
        virtual_batch_size=128,
        num_workers=0,
        drop_last=False
    )

    # Save artifacts
    print("Saving Soil Model artifacts...")
    os.makedirs("models", exist_ok=True)
    soil_model.save_model("models/soil_tabnet_model")
    joblib.dump(soil_scaler, "models/soil_scaler.joblib")
    joblib.dump(soil_encoder, "models/soil_encoder.joblib")

    # --------------------------------
    # 2. Crop Recommendation Model
    # --------------------------------
    print("\n--- Training Crop Recommendation Model ---")
    data["Soil_Type_Encoded"] = soil_encoder.transform(data["Soil_Type"])
    crop_features = ['N', 'P', 'K', 'pH', 'Temp(°C)', 'Humidity(%)', 'Moisture(%)', 'Rainfall(cm)', 'Soil_Type_Encoded']
    crop_target = "Crop"

    X_crop = data[crop_features].copy()
    y_crop = data[crop_target].copy()

    crop_encoder = LabelEncoder()
    y_crop_encoded = crop_encoder.fit_transform(y_crop)

    crop_scaler = StandardScaler()
    X_crop_scaled = crop_scaler.fit_transform(X_crop)

    X_train_crop, X_test_crop, y_train_crop, y_test_crop = train_test_split(
        X_crop_scaled, y_crop_encoded, test_size=0.2, random_state=42, stratify=y_crop_encoded
    )

    crop_model = TabNetClassifier(
        optimizer_fn=torch.optim.Adam,
        optimizer_params=dict(lr=2e-2),
        scheduler_params={"step_size":50, "gamma":0.9},
        scheduler_fn=torch.optim.lr_scheduler.StepLR,
        mask_type='entmax',
        verbose=1
    )

    crop_model.fit(
        X_train=X_train_crop, y_train=y_train_crop,
        eval_set=[(X_test_crop, y_test_crop)],
        eval_name=['valid'],
        eval_metric=['accuracy'],
        max_epochs=100,
        patience=20,
        batch_size=256,
        virtual_batch_size=128,
        num_workers=0,
        drop_last=False
    )

    # Save artifacts
    print("Saving Crop Model artifacts...")
    crop_model.save_model("models/crop_tabnet_model")
    joblib.dump(crop_scaler, "models/crop_scaler.joblib")
    joblib.dump(crop_encoder, "models/crop_encoder.joblib")

    print("\n✅ All models and artifacts saved successfully in 'models/' directory.")

if __name__ == "__main__":
    train_and_save_models()
