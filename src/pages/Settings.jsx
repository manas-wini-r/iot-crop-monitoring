function Settings(){

return(

<div className="min-h-screen bg-slate-100 flex items-center justify-center p-10">

<div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">

<h1 className="text-3xl font-semibold text-gray-800 mb-6">
Settings
</h1>

<p className="text-gray-500 mb-6">
Configure sensor threshold values
</p>

<div className="space-y-5">

<div>
<label className="block text-sm text-gray-600 mb-1">
Temperature Threshold (°C)
</label>
<input
type="number"
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
/>
</div>

<div>
<label className="block text-sm text-gray-600 mb-1">
Humidity Threshold (%)
</label>
<input
type="number"
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
/>
</div>

<div>
<label className="block text-sm text-gray-600 mb-1">
Soil Moisture Threshold
</label>
<input
type="number"
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
/>
</div>

</div>

<button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
Save Settings
</button>

</div>

</div>

)

}

export default Settings;