function History() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-gray-100 p-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">
          Sensor History
        </h1>
        <p className="text-gray-600">
          Historical readings from farm sensors
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

        <table className="w-full text-left">

          {/* Table Header */}
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium">Temperature (°C)</th>
              <th className="px-6 py-4 font-medium">Humidity (%)</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700">

            <tr className="border-t hover:bg-green-50 transition">
              <td className="px-6 py-4">10:00</td>
              <td className="px-6 py-4">28</td>
              <td className="px-6 py-4">65</td>
            </tr>

            <tr className="border-t hover:bg-green-50 transition">
              <td className="px-6 py-4">10:05</td>
              <td className="px-6 py-4">29</td>
              <td className="px-6 py-4">66</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default History;