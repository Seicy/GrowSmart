"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sprout, 
  Settings2, 
  Save, 
  Droplets, 
  Moon, 
  Sun, 
  LogOut,
  Power,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export default function ConfigurationPage() {
  const router = useRouter();

  // State utama
  const [threshold, setThreshold] = useState(30);
  const [isWatering, setIsWatering] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // State manajemen perubahan & loading
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalThreshold, setOriginalThreshold] = useState(30);
  const [originalWatering, setOriginalWatering] = useState(false);

  // Load konfigurasi saat pertama kali halaman dibuka
  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setThreshold(data.config.soilThreshold);
          setIsWatering(data.config.manualWatering);

          // Simpan nilai awal untuk perbandingan
          setOriginalThreshold(data.config.soilThreshold);
          setOriginalWatering(data.config.manualWatering);
        }
      })
      .catch((err) => console.error("Gagal mengambil konfigurasi:", err));
  }, []);

  // Cek apakah ada perubahan dibanding data original
  useEffect(() => {
    if (threshold !== originalThreshold || isWatering !== originalWatering) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [threshold, isWatering, originalThreshold, originalWatering]);

  // Fungsi untuk menyimpan konfigurasi
  const handleSave = async () => {
    setLoading(true);
    try {
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
        // Perbarui nilai original ke nilai yang baru saja disimpan
        setOriginalThreshold(threshold);
        setOriginalWatering(isWatering);

        setTimeout(() => {
          setSaved(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Gagal menyimpan konfigurasi:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi logout
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/auth/login");
    router.refresh();
  };

  // Klasifikasi warna berdasarkan nilai threshold
  const thresholdColor =
    threshold < 30
      ? "text-blue-500"
      : threshold <= 60
      ? "text-green-500"
      : "text-red-500";

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
          <Link href="/dashboard" className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}>
            Monitoring
          </Link>
          <Link href="/dashboard/config" className={`px-6 py-2 rounded-full text-[11px] font-bold shadow-sm uppercase tracking-wider ${isDark ? 'bg-slate-700 text-white' : 'bg-white text-[#00B67A]'}`}>
            Configuration
          </Link>
          <Link href="/dashboard/history" className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}>
            History Log
          </Link>
        </div>

        <div className="flex items-center gap-3 pr-2">
          {/* Toggle Dark Mode */}
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
      <main className={`max-w-7xl mx-auto rounded-[3rem] p-12 shadow-2xl transition-all duration-500 border ${isDark ? 'bg-[#161C1E] border-slate-800' : 'bg-white border-slate-50'}`}>

        {/* HEADER */}
        <div className="flex flex-col items-center mb-12">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-colors ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#F1FDF9] text-[#00B67A]'}`}>
            <Settings2 size={32} />
          </div>

          <h1 className={`text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Device Configuration
          </h1>

          <p className={`font-medium text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Sesuaikan parameter otomatisasi ESP32
          </p>
        </div>

        {/* TWO COLUMN CONTENT */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ================= SOIL THRESHOLD ================= */}
          <div className={`rounded-[2.5rem] p-10 border transition-all ${isDark ? 'bg-[#1C2426] border-slate-800' : 'bg-white border-slate-50 shadow-[0_15px_40px_rgba(0,0,0,0.03)]'}`}>
            
            <div className="flex items-center gap-3 mb-10">
              <Droplets className={isDark ? 'text-blue-400' : 'text-blue-500'} size={20} />
              <h3 className={`font-black tracking-tight text-sm uppercase ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Soil Threshold
              </h3>
            </div>

            <div className="mb-4">
              {threshold < 30 && (
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold animate-bounce">
                  💧 Wet
                </div>
              )}

              {threshold >= 30 && threshold <= 60 && (
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold animate-pulse">
                  🌱 Ideal
                </div>
              )}

              {threshold > 60 && (
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold animate-bounce">
                  🔥 Dry
                </div>
              )}
            </div>

            <div className="relative">
              <div className="flex justify-between items-end mb-6">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>
                  Soil Moisture Threshold
                </span>

                <div className="flex items-center gap-3">
                  <span className={`text-5xl font-black transition-all duration-300 ${thresholdColor} ${hasChanges ? "scale-110" : "scale-100"}`}>
                    {threshold}%
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#00B67A] mb-8 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}
              />

              <div className={`rounded-2xl p-5 ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-100'}`}>
                <p className="text-[#00B67A] font-bold text-sm mb-2">
                  Automatic Watering Rule
                </p>
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Pump will turn ON when soil moisture
                  <span className="text-[#00B67A] font-bold">
                    {" < "}{threshold}%
                  </span>
                </p>
              </div>
            </div>

          </div>

          {/* ================= CONTROL & STATUS ================= */}
          <div className="flex flex-col gap-6">

            {/* MANUAL WATERING */}
            <div
              onClick={() => setIsWatering(!isWatering)}
              className={`rounded-[2.5rem] p-10 border flex items-center justify-between cursor-pointer transition-all active:scale-95 ${isDark ? 'bg-[#1C2426] border-slate-800 hover:bg-[#232d30]' : 'bg-white border-slate-50 shadow-[0_15px_40px_rgba(0,0,0,0.03)]'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isWatering ? 'bg-blue-50 text-blue-500 scale-110' : 'bg-slate-50 text-slate-400'}`}>
                  <Power size={22}/>
                </div>
                <div>
                  <h4 className={`font-black text-xs uppercase tracking-wider transition-colors ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    Manual Watering
                  </h4>
                </div>
              </div>

              <div className={`w-12 h-6 rounded-full relative p-1 transition-colors ${isWatering ? 'bg-[#00B67A]' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isWatering ? 'translate-x-6' : ''}`} />
              </div>
            </div>

            {/* STATUS */}
            {hasChanges ? (
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 flex items-center gap-3 animate-pulse">
                <AlertTriangle className="text-yellow-600" size={22} />
                <div>
                  <p className="font-bold text-yellow-700">
                    Configuration Changed
                  </p>
                  <p className="text-xs text-yellow-600">
                    Please save the new configuration.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-sm font-semibold text-green-700">
                    Configuration Saved
                  </span>
                </div>
                <p className="text-xs text-green-600">
                  Last saved : Just now
                </p>
                <p className="mt-4 text-sm font-bold text-slate-700">
                  Pump Status : {isWatering ? "ON" : "OFF"}
                </p>
              </div>
            )}

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              disabled={loading || !hasChanges}
              className={`w-full py-6 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${hasChanges ? "bg-[#00B67A] hover:bg-[#009e6a] animate-pulse shadow-emerald-200" : "bg-[#00B67A] hover:bg-[#009e6a] shadow-emerald-100"}`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : saved ? (
                <>
                  <CheckCircle size={18} />
                  Tersimpan ✓
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Configuration
                </>
              )}
            </button>

          </div>

        </div>

      </main>

      <footer className="max-w-7xl mx-auto mt-8 text-center">
        <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>
          GrowSmart Project • Politeknik Negeri Batam
        </p>
      </footer>
    </div>
  );
}