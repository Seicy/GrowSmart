"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sprout, 
  Settings2, 
  Save, 
  Droplets, 
  Moon, 
  Sun, // Tambahkan ikon Sun
  LogOut,
  Power
} from 'lucide-react';
import Link from 'next/link';

export default function ConfigurationPage() {
  const [threshold, setThreshold] = useState(30);
  const [isWatering, setIsWatering] = useState(false);
  // Tambahkan state untuk Dark Mode
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

// Load config saat halaman dibuka
useEffect(() => {
  fetch("/api/config")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setThreshold(data.config.soilThreshold);
        setIsWatering(data.config.manualWatering);
      }
    });
}, []);

// Fungsi save
const handleSave = async () => {
  setLoading(true);
  const res = await fetch("/api/config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      soilThreshold: threshold,
      manualWatering: isWatering,
    }),
  });
  const data = await res.json();
  if (data.success) {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }
  setLoading(false);
};

const handleLogout = async () => {
  await fetch("/api/logout", { method: "POST" });
  router.push("/auth/login");
  router.refresh();
};

  return (
    <div className={`min-h-screen p-8 font-sans transition-all duration-500 ${isDark ? 'bg-[#0B0F10]' : 'bg-[#F0F4F4]'}`}>
      
      {/* NAVBAR */}
      <nav className={`max-w-7xl mx-auto rounded-full p-2 pl-6 shadow-sm border transition-all duration-500 flex items-center justify-between mb-10 ${isDark ? 'bg-[#161C1E] border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="flex items-center gap-2">
          <div className="bg-[#00B67A] p-2 rounded-xl text-white">
            <Sprout size={20} />
          </div>
          <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>GrowSmart</span>
        </div>

        <div className={`flex items-center rounded-full px-1 py-1 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
          <Link href="/dashboard" className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}>Monitoring</Link>
          <Link href="/dashboard/config" className={`px-6 py-2 rounded-full text-[11px] font-bold shadow-sm uppercase tracking-wider ${isDark ? 'bg-slate-700 text-white' : 'bg-white text-[#00B67A]'}`}>Configuration</Link>
          <Link href="/dashboard/history" className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}>History Log</Link>
        </div>

        <div className="flex items-center gap-3 pr-2">
          {/* Tombol Toggle Dark Mode */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full transition-all ${isDark ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
<button
  onClick={handleLogout}
  className="bg-[#FF4D12] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-200/20 hover:scale-105 transition-all"
>
  Log out <LogOut size={16} />
</button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className={`max-w-7xl mx-auto rounded-[3rem] p-16 shadow-2xl transition-all duration-500 min-h-[600px] flex flex-col items-center justify-center border ${isDark ? 'bg-[#161C1E] border-slate-800' : 'bg-white border-slate-50'}`}>
        
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#F1FDF9] text-[#00B67A]'}`}>
          <Settings2 size={32} />
        </div>

        <h1 className={`text-4xl font-black mb-2 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Device Configuration</h1>
        <p className={`font-medium mb-16 text-center max-w-md transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Sesuaikan parameter otomatisasi alat ESP32 anda</p>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* SOIL THRESHOLD CARD */}
          <div className={`rounded-[2.5rem] p-10 border transition-all ${isDark ? 'bg-[#1C2426] border-slate-800 shadow-none' : 'bg-white border-slate-50 shadow-[0_15px_40px_rgba(0,0,0,0.03)]'}`}>
            <div className="flex items-center gap-3 mb-10">
              <Droplets className={isDark ? 'text-blue-400' : 'text-blue-500'} size={20} />
              <h3 className={`font-black tracking-tight text-sm uppercase ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Soil Threshold</h3>
            </div>

            <div className="relative">
              <div className="flex justify-between items-end mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>Batas Aktivasi Pompa</span>
                <span className="text-5xl font-black text-[#00B67A]">{threshold}%</span>
              </div>
              
              <input 
                type="range" 
                min="0" max="100" 
                value={threshold} 
                onChange={(e) => setThreshold(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#00B67A] mb-8 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`} 
              />
              
              <p className={`text-[10px] leading-relaxed text-center font-bold italic transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                *Pompa akan otomatis menyala jika kelembapan tanah terdeteksi di bawah angka ini.
              </p>
            </div>
          </div>

          {/* CONTROL SECTION */}
          <div className="flex flex-col gap-6">
            {/* MANUAL WATERING TOGGLE */}
            <div 
              onClick={() => setIsWatering(!isWatering)}
              className={`rounded-[2.5rem] p-10 border flex items-center justify-between group cursor-pointer transition-all active:scale-95 ${isDark ? 'bg-[#1C2426] border-slate-800 hover:bg-[#232d30]' : 'bg-white border-slate-50 shadow-[0_15px_40px_rgba(0,0,0,0.03)]'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isWatering ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-500') : (isDark ? 'bg-slate-800 text-slate-600' : 'bg-slate-50 text-slate-400')}`}>
                  <Power size={22} />
                </div>
                <div>
                  <h4 className={`font-black text-xs uppercase tracking-wider transition-colors ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Manual Watering</h4>
                  <p className={`text-[10px] font-bold transition-colors ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{isWatering ? 'Pompa Sedang Menyala' : 'Paksa pompa menyala'}</p>
                </div>
              </div>
              
              {/* Animated Toggle Switch */}
              <div className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-300 ${isWatering ? 'bg-[#00B67A]' : (isDark ? 'bg-slate-800' : 'bg-slate-200')}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isWatering ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>

            {/* SAVE BUTTON */}
<button
  onClick={handleSave}
  disabled={loading}
  className={`w-full py-6 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${isDark ? 'bg-[#00B67A] hover:bg-[#009e6a] shadow-emerald-900/10' : 'bg-[#00B67A] hover:bg-[#009e6a] shadow-emerald-100'}`}
>
  {loading ? (
    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  ) : (
    <Save size={18} />
  )}
  {saved ? "Tersimpan ✓" : loading ? "Menyimpan..." : "Save Configuration"}
</button>
          </div>

        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-8 text-center">
        <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>GrowSmart Project • Politeknik Negeri Batam</p>
      </footer>
    </div>
  );
}