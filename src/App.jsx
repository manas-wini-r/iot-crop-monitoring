import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";
import { MLProvider } from "./context/MLContext";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Sensors from "./pages/Sensors";
import CropRecommendation from "./pages/CropRecommendation";
import Analytics from "./pages/Analytics";
import SoilHealth from "./pages/SoilHealth";
import History from "./pages/History";
import Alerts from "./pages/Alerts";
import FarmMap from "./pages/FarmMap";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();

  }, []);

  return (
    <MLProvider>
      <BrowserRouter>
        {!user ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        ) : (
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-10 bg-gray-50 min-h-screen">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/sensors" element={<Sensors />} />
                <Route path="/crop" element={<CropRecommendation />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/soil" element={<SoilHealth />} />
                <Route path="/history" element={<History />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/farmmap" element={<FarmMap />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        )}
      </BrowserRouter>
    </MLProvider>
  );
}

export default App;