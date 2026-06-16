function Sensors() {
  const sensors = [
    { name: "Temperature Sensor", icon: "🌡" },
    { name: "Humidity Sensor", icon: "💧" },
    { name: "Soil Moisture Sensor", icon: "🌱" },
    { name: "pH Sensor", icon: "⚗" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-green-50 to-gray-100 px-10 py-14">

      {/* Header */}
      <div className="mb-14 text-center">
        <h1 className="text-5xl font-semibold text-gray-800 mb-3">
          Sensors Deployed
        </h1>
        <p className="text-gray-500 text-lg">
          Environmental sensors deployed for smart agriculture monitoring
        </p>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">

        {sensors.map((sensor, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100"
          >
            <div className="text-4xl mb-4">{sensor.icon}</div>

            <h2 className="text-xl font-medium text-gray-700">
              {sensor.name}
            </h2>

            <div className="mt-5 w-16 h-1 bg-green-500 rounded"></div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Sensors;