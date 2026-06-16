#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "DHT.h"

#define WIFI_SSID "YOUR_WIFI"
#define WIFI_PASSWORD "YOUR_PASSWORD"

#define API_KEY "YOUR_FIREBASE_API_KEY"
#define DATABASE_URL "https://yourproject.firebaseio.com/"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// 8 Sensor Nodes with 7 parameters each
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define MOISTURE_PIN 34
#define PH_PIN 35
#define EC_PIN 32
#define NITROGEN_PIN 33
#define PHOSPHORUS_PIN 25
#define POTASSIUM_PIN 26

void setup()
{
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Connected");

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  dht.begin();
  pinMode(MOISTURE_PIN, INPUT);
  pinMode(PH_PIN, INPUT);
  pinMode(EC_PIN, INPUT);
  pinMode(NITROGEN_PIN, INPUT);
  pinMode(PHOSPHORUS_PIN, INPUT);
  pinMode(POTASSIUM_PIN, INPUT);
}

void sendNodeData(int nodeNum, float nitrogen, float phosphorus, float potassium, float ec, float temperature, float humidity, float moisture)
{
  String nodePath = "/sensorData/nodes/node" + String(nodeNum);
  Firebase.RTDB.setFloat(&fbdo, nodePath + "/nitrogen", nitrogen);
  Firebase.RTDB.setFloat(&fbdo, nodePath + "/phosphorus", phosphorus);
  Firebase.RTDB.setFloat(&fbdo, nodePath + "/potassium", potassium);
  Firebase.RTDB.setFloat(&fbdo, nodePath + "/ec", ec);
  Firebase.RTDB.setFloat(&fbdo, nodePath + "/temperature", temperature);
  Firebase.RTDB.setFloat(&fbdo, nodePath + "/humidity", humidity);
  Firebase.RTDB.setFloat(&fbdo, nodePath + "/moisture", moisture);
}

void loop()
{
  // Read base sensor values
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int moistureRaw = analogRead(MOISTURE_PIN);
  int ecRaw = analogRead(EC_PIN);
  int nitrogenRaw = analogRead(NITROGEN_PIN);
  int phosphorusRaw = analogRead(PHOSPHORUS_PIN);
  int potassiumRaw = analogRead(POTASSIUM_PIN);

  // Convert to actual values with some variation for 8 nodes
  float moisture = (moistureRaw / 4095.0) * 100;
  float ec = (ecRaw / 4095.0) * 5.0;
  float nitrogen = (nitrogenRaw / 4095.0) * 500;
  float phosphorus = (phosphorusRaw / 4095.0) * 300;
  float potassium = (potassiumRaw / 4095.0) * 400;

  // Send data for 8 nodes with slight variations
  for (int i = 1; i <= 8; i++)
  {
    float nodeTemp = temperature + (i - 4) * 0.5;          // Slight variation
    float nodeHum = humidity + (i - 4) * 2;                // Slight variation
    float nodeMoisture = moisture + (i - 4) * 3;           // Slight variation
    float nodeN = nitrogen + (i - 4) * 20;
    float nodeP = phosphorus + (i - 4) * 15;
    float nodeK = potassium + (i - 4) * 25;
    float nodeEC = ec + (i - 4) * 0.2;

    sendNodeData(i, nodeN, nodeP, nodeK, nodeEC, nodeTemp, nodeHum, nodeMoisture);
  }

  Serial.println("8 Nodes Data Sent to Firebase");
  delay(5000);
}
