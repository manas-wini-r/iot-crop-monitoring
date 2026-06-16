function Alerts() {
  return (
    <div className="min-h-screen bg-slate-100 p-10">

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        System Alerts
      </h1>

      {/* Alert Card */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl">

        <ul className="space-y-4">

          <li className="flex items-center justify-between bg-yellow-50 border-l-4 border-yellow-500 px-4 py-3 rounded">
            <span className="text-gray-700 font-medium">
              ⚠ Low Soil Moisture
            </span>
            <span className="text-sm text-gray-500">Warning</span>
          </li>

          <li className="flex items-center justify-between bg-red-50 border-l-4 border-red-500 px-4 py-3 rounded">
            <span className="text-gray-700 font-medium">
              ⚠ High Temperature
            </span>
            <span className="text-sm text-gray-500">Critical</span>
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Alerts;