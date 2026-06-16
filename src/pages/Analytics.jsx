import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#8B5CF6", "#14B8A6", "#F43F5E"];

export default function Analytics() {
  const [nodesData, setNodesData] = useState({});
  const [dataHistory, setDataHistory] = useState([]);
  const [usingRandomData, setUsingRandomData] = useState(false);

  const generateRandomData = () => {
    const mockNodes = {};
    for (let i = 1; i <= 8; i++) {
      mockNodes[`node${i}`] = {
        temperature: 20 + Math.random() * 15,
        humidity: 40 + Math.random() * 40,
        moisture: 30 + Math.random() * 30,
        nitrogen: Math.floor(50 + Math.random() * 150),
        phosphorus: Math.floor(30 + Math.random() * 100),
        potassium: Math.floor(40 + Math.random() * 120),
      };
    }
    return mockNodes;
  };

  useEffect(() => {
    const rootRef = ref(database, "sensorData/nodes");
    const unsubscribe = onValue(rootRef, (snapshot) => {
      const data = snapshot.val();
      if (data && Object.keys(data).length > 0) {
        setUsingRandomData(false);
        setNodesData(data);
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setDataHistory(prev => [...prev.slice(-49), { ...data, time: timestamp }]);
      } else {
        setUsingRandomData(true);
      }
    }, () => setUsingRandomData(true));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (usingRandomData) {
      const interval = setInterval(() => {
        const mock = generateRandomData();
        setNodesData(mock);
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setDataHistory(prev => [...prev.slice(-49), { ...mock, time: timestamp }]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [usingRandomData]);

  const getVal = (nodeId, key) => nodesData[nodeId]?.[key] ?? 0;

  return (
    <div className="mt-8 space-y-12 pb-32 px-6">
      {/* Reverting to the cleaner, more vibrant header */}
      <div className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-700 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Live Node Cluster</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-100">{usingRandomData ? 'Simulation active' : 'Live linked'}</span>
            </div>
          </div>
          <h1 className="text-6xl font-black tracking-tighter mb-4">Farm Analytics</h1>
          <p className="text-xl text-green-50 max-w-2xl font-medium opacity-90 leading-relaxed">
            Proprietary visualization engine for multi-node sensor clusters. Analyzing atmospheric and nutrient biometrics in real-time.
          </p>
        </div>
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* 8 Node Grid (Previous favorite) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => {
          const nodeId = `node${n}`;
          return (
            <div key={n} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl bg-green-100 text-green-600`}>
                    {n}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Node {n}</h3>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#10b981]"></div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'TEMP', key: 'temperature', unit: '°C', icon: '🌡️' },
                  { label: 'HUM', key: 'humidity', unit: '%', icon: '💧' },
                  { label: 'MOIST', key: 'moisture', unit: '%', icon: '🌱' }
                ].map(p => (
                  <div key={p.key} className="flex justify-between items-center p-4 bg-gray-50/50 rounded-2xl group-hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.icon}</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.label}</span>
                    </div>
                    <span className="text-xl font-black text-gray-800">
                      {getVal(nodeId, p.key).toFixed(1)}<small className="text-xs ml-1 text-gray-400">{p.unit}</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Graphs Set (Reverted to the set involving Area and Pie) */}
      <div className="space-y-12">
        <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-gray-100">
          <h3 className="text-3xl font-black text-gray-800 tracking-tighter mb-10">Thermal Timeline Pulse</h3>
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="time" hide />
                <YAxis fontSize={10} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" />
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
                  <Line key={n} type="monotone" dataKey={`node${n}.temperature`} name={`Node ${n}`} stroke={COLORS[i]} strokeWidth={4} dot={false} isAnimationActive={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-black text-gray-800 tracking-tight mb-10">Moisture Profile</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataHistory}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="time" hide />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} />
                  {[1, 2, 3, 4].map((n, i) => (
                    <Area key={n} type="monotone" dataKey={`node${n}.moisture`} name={`Node ${n}`} fill={COLORS[i]} stroke={COLORS[i]} fillOpacity={0.05} strokeWidth={4} isAnimationActive={false} />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-black text-gray-800 tracking-tight mb-10">Humidity Distribution</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[1,2,3,4,5,6,7,8].map(n => ({ name: `Node ${n}`, value: getVal(`node${n}`, 'humidity') }))}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[1,2,3,4,5,6,7,8].map((n, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} cornerRadius={10} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100">
          <h3 className="text-3xl font-black text-gray-800 tracking-tight mb-12">NPK Nutrient Synthesis</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[1, 2, 3, 4, 5, 6, 7, 8].map(n => ({
                name: `Node ${n}`,
                N: getVal(`node${n}`, 'nitrogen'),
                P: getVal(`node${n}`, 'phosphorus'),
                K: getVal(`node${n}`, 'potassium')
              }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '24px', border: 'none' }} />
                <Legend />
                <Bar dataKey="N" fill="#3B82F6" radius={[8, 8, 0, 0]} barSize={30} />
                <Bar dataKey="P" fill="#10B981" radius={[8, 8, 0, 0]} barSize={30} />
                <Bar dataKey="K" fill="#F59E0B" radius={[8, 8, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
