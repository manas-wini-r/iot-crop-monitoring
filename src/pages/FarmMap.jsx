import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FarmMap() {
  const position = [11.1271, 78.6569];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-blue-50 p-10">

      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">
          Farm Monitoring Map
        </h1>
        <p className="text-gray-500">
          Visual overview of farm location and deployed sensors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Info Panel */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">

          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Farm Information
          </h2>

          <div className="space-y-4 text-gray-600">

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Location</span>
              <span>Tamil Nadu</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Installed Sensors</span>
              <span>4</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Coverage Area</span>
              <span>5 Acres</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Monitoring</span>
              <span>Soil & Weather</span>
            </div>

          </div>

          <div className="mt-8 text-sm text-gray-500 leading-relaxed">
            This map displays the geographic location of the farm where
            environmental sensors are installed for monitoring soil moisture,
            temperature, humidity, and pH levels.
          </div>

        </div>

        {/* Map Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          <MapContainer
            center={position}
            zoom={7}
            className="h-[520px] w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>
                Farm Sensor Location
              </Popup>
            </Marker>

          </MapContainer>

        </div>

      </div>

    </div>
  );
}

export default FarmMap;