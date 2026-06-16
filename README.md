## Setup & Run

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
API runs at `http://localhost:5000`

### Frontend
```bash
npm install
npm run dev
```

### ESP32
- Open `esp code/sensordht/sensordht.ino` in Arduino IDE
- Update WiFi credentials and Firebase config
- Flash to ESP32

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/predict` | Takes sensor readings, returns soil type + crop recommendation |
| GET | `/health` | Check if models are loaded |

### Sample Request
```json
{
  "N": 120, "P": 80, "K": 100,
  "pH": 6.5, "temp": 28,
  "humidity": 70, "moisture": 60, "rainfall": 150
}
```

### Sample Response
```json
{
  "predicted_soil": "Loamy",
  "recommended_crop": "Rice",
  "top_suggestions": [
    { "crop": "Rice", "probability": 87.4 },
    { "crop": "Wheat", "probability": 8.2 },
    { "crop": "Maize", "probability": 4.4 }
  ]
}
```

## ML Models

- **Algorithm:** TabNet (attention-based deep learning for tabular data)
- **Soil model:** Classifies soil type from sensor readings
- **Crop model:** Recommends crop based on soil type + sensor features
- **Artifacts:** Saved as `.joblib` (scalers/encoders) and `.zip` (TabNet models)

## Author

R Manaswini — [LinkedIn](https://linkedin.com/in/manaswini-ramaswamy) | [GitHub](https://github.com/manas-wini-r)