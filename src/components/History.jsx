import React from "react";
import { Clock } from "lucide-react";

export default function HistoryTable(){

 const rows=[
  {time:"10:30",n:32,p:170,k:154},
  {time:"11:30",n:28,p:160,k:140},
  {time:"12:30",n:25,p:150,k:134}
 ];

 return(

  <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300">

    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-md">
        <Clock className="text-white" size={20}/>
      </div>

      <h2 className="text-xl font-bold text-gray-800">
        Sensor History
      </h2>
    </div>

    {/* Table */}
    <div className="overflow-hidden rounded-xl border border-gray-200">

      <table className="w-full text-left">

        {/* Table Header */}
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Time</th>
            <th className="px-4 py-3 font-semibold">Nitrogen</th>
            <th className="px-4 py-3 font-semibold">Phosphorus</th>
            <th className="px-4 py-3 font-semibold">Potassium</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y">

          {rows.map((r,i)=>(
            <tr
              key={i}
              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
            >

              <td className="px-4 py-3 font-medium text-gray-700">
                {r.time}
              </td>

              <td className="px-4 py-3 font-semibold text-green-600 hover:text-green-700">
                {r.n}
              </td>

              <td className="px-4 py-3 font-semibold text-blue-600 hover:text-blue-700">
                {r.p}
              </td>

              <td className="px-4 py-3 font-semibold text-purple-600 hover:text-purple-700">
                {r.k}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  </div>

 )
}