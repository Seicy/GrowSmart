"use client";
import React, { useState, useEffect } from 'react';
import { 
  Droplets, ShieldCheck, Thermometer, Clock, 
  LayoutDashboard, History, Settings, Bell, 
  CheckCircle2, AlertTriangle, Sprout, Save, RefreshCcw, Power
} from 'lucide-react';

export default function BioGuardPro() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({ moisture: 45, temperature: 28, pestDetected: false, lastUpdate: '' });
  const [threshold, setThreshold] = useState(30);

  // Simulasi sinkronisasi data
  useEffect(() => {
    const fetchSensor = async () => {
      try {
        const res = await fetch('/api/sensor');
        const json = await res.json();
        setData(prev => ({ ...prev, ...json }));
      } catch (e) { console.log("Syncing..."); }
    };
    const interval = setInterval(fetchSensor, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col sticky top-0 h-screen p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-[#10B981] p-2 rounded-xl shadow-lg shadow-emerald-100">
            <Sprout className="text-white" size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#0F172A]">BioGuard <span className="text-[#10B981]">IoT</span></span>
        </div>
        
        <nav className="space-y-2">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<History size={18}/>} label="History Log" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
          <NavItem icon={<Settings size={18}/>} label="Configuration" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-auto bg-slate-50 p-4 rounded-3xl border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Connection</p>
          <div className="flex items-center gap-2 text-[#10B981] font-bold text-xs">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            ESP32-STABLE
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#1E293B] capitalize">{activeTab.replace('-', ' ')}</h1>
            <p className="text-slate-400 text-sm font-medium mt-1">Smart Agriculture Monitoring System v1.2</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Node: Batam-01</p>
              <p className="text-xs font-semibold text-slate-500">Wednesday, 1 Apr 2026</p>
            </div>
            <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-emerald-500 transition-all shadow-sm">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* --- TABS RENDERING --- */}
        {activeTab === 'dashboard' && <DashboardTab data={data} />}
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'settings' && <SettingsTab threshold={threshold} setThreshold={setThreshold} />}

      </main>
    </div>
  );
}

/* --- 1. DASHBOARD TAB --- */
function DashboardTab({ data }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard label="MOISTURE" value={`${data.moisture}%`} icon={<Droplets size={22}/>} iconBg="bg-blue-50 text-blue-500" sub="Soil status: Good" />
        <StatCard label="KEAMANAN" value={data.pestDetected ? "ALERT" : "SAFE"} icon={<ShieldCheck size={22}/>} iconBg="bg-emerald-50 text-emerald-500" sub={data.pestDetected ? "Hama Terdeteksi" : "No intrusion"} />
        <StatCard label="TEMPERATURE" value={`${data.temperature}°C`} icon={<Thermometer size={22}/>} iconBg="bg-orange-50 text-orange-500" sub="Ambient air" />
        <StatCard label="LAST SYNC" value={data.lastUpdate ? new Date(data.lastUpdate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "1:00 PM"} icon={<Clock size={22}/>} iconBg="bg-slate-50 text-slate-400" sub="Sync every 5s" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* REWORKED GRAPHIC (Lebih Pro) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Soil Moisture Analysis</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span> <span className="text-[10px] font-bold text-slate-400 uppercase">Optimal</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-slate-200 rounded-full"></span> <span className="text-[10px] font-bold text-slate-400 uppercase">Average</span></div>
            </div>
          </div>
          <div className="relative h-64 w-full flex items-end justify-between px-2 group">
            {/* Y-Axis Guideline */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 border-l border-b border-slate-200">
              <div className="w-full border-t border-slate-400 border-dashed"></div>
              <div className="w-full border-t border-slate-400 border-dashed"></div>
              <div className="w-full border-t border-slate-400 border-dashed"></div>
            </div>
            {/* Bars */}
            {[42, 35, 58, 82, 65, 45, 30, 48, 72, 60, 55, 68].map((val, i) => (
              <div key={i} className="relative flex-1 mx-1.5 flex flex-col items-center group/bar">
                <div 
                  className={`w-full rounded-t-xl transition-all duration-700 cursor-pointer ${val > 70 ? 'bg-emerald-400 hover:bg-emerald-500' : 'bg-slate-200 hover:bg-blue-400'}`} 
                  style={{ height: `${val}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity font-bold shadow-xl">
                    {val}%
                  </div>
                </div>
                <span className="text-[8px] font-bold text-slate-400 mt-3 uppercase tracking-tighter">{i*2}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* LOG TERAKHIR */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-8 text-lg">Activity Logs</h3>
          <div className="space-y-8 flex-1">
            <LogItem icon={<CheckCircle2 className="text-emerald-500" size={20} />} title="Penyiraman Selesai" time="02:15 PM" />
            <LogItem icon={<AlertTriangle className="text-red-500" size={20} />} title="Hama Terdeteksi" time="01:40 PM" />
            <LogItem icon={<Droplets className="text-blue-500" size={20} />} title="Pompa Aktif" time="01:30 PM" />
            <LogItem icon={<RefreshCcw className="text-slate-400" size={20} />} title="System Reboot" time="08:00 AM" />
          </div>
          <button className="mt-8 text-xs font-bold text-emerald-600 hover:underline uppercase tracking-widest">View Full Report →</button>
        </div>
      </div>
    </div>
  );
}

/* --- 2. HISTORY TAB --- */
function HistoryTab() {
  const historyData = [
    { date: '01 Apr 2026', time: '12:00', moisture: '35%', temp: '28°C', pump: 'OFF', pest: 'No' },
    { date: '01 Apr 2026', time: '10:30', moisture: '22%', temp: '30°C', pump: 'ON', pest: 'No' },
    { date: '31 Mar 2026', time: '22:15', moisture: '65%', temp: '25°C', pump: 'OFF', pest: 'No' },
    { date: '31 Mar 2026', time: '18:00', moisture: '40%', temp: '27°C', pump: 'OFF', pest: 'Yes' },
    { date: '31 Mar 2026', time: '14:20', moisture: '18%', temp: '32°C', pump: 'ON', pest: 'No' },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-lg">Detailed Sensor Logs</h3>
        <button className="text-xs bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all">Download CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Soil Moisture</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Temperature</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pump Status</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pest Detection</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {historyData.map((log, i) => (
              <tr key={i} className="hover:bg-slate-50/30 transition-all group">
                <td className="p-6">
                  <p className="text-sm font-bold text-slate-700">{log.time}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{log.date}</p>
                </td>
                <td className="p-6 text-sm font-black text-blue-500">{log.moisture}</td>
                <td className="p-6 text-sm font-black text-orange-500">{log.temp}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase ${log.pump === 'ON' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {log.pump}
                  </span>
                </td>
                <td className="p-6">
                  <span className={`font-bold text-xs ${log.pest === 'Yes' ? 'text-red-500' : 'text-slate-400'}`}>{log.pest}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* --- 3. CONFIGURATION TAB --- */
function SettingsTab({ threshold, setThreshold }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
      
      {/* THRESHOLD SETTINGS */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-50">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600"><Settings size={24}/></div>
          <div>
            <h3 className="font-bold text-xl text-slate-800">Threshold Config</h3>
            <p className="text-xs text-slate-400 font-medium">Atur batas otomatisasi sistem</p>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <div className="flex justify-between mb-4">
              <label className="text-sm font-bold text-slate-600">Moisture Activation Threshold</label>
              <span className="text-emerald-600 font-black">{threshold}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={threshold} 
              onChange={(e) => setThreshold(e.target.value)}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
            />
            <p className="text-[10px] text-slate-400 mt-3 italic font-medium leading-relaxed text-center">
              Pompa akan menyala secara otomatis jika kelembapan tanah turun di bawah {threshold}%.
            </p>
          </div>

          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
             <div className="flex items-center gap-4 text-slate-700">
                <Power size={20} className="text-red-400" />
                <span className="text-sm font-bold uppercase tracking-widest">Manual Override</span>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
             </label>
          </div>

          <button className="w-full py-5 bg-emerald-500 text-white rounded-[2rem] font-black text-sm shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 group">
            <Save size={18} className="group-hover:scale-110 transition-transform" />
            SAVE & DEPLOY TO ESP32
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- UI COMPONENTS --- */

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-semibold text-sm ${active ? 'bg-[#10B981] text-white shadow-xl shadow-emerald-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
      {icon} <span>{label}</span>
    </button>
  );
}

function StatCard({ label, value, icon, iconBg, sub }: any) {
  return (
    <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-50 group hover:shadow-md transition-all">
      <div className="flex items-center gap-5 mb-4">
        <div className={`p-3 rounded-2xl ${iconBg}`}>{icon}</div>
        <div>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-black text-[#1E293B]">{value}</p>
        </div>
      </div>
      <div className="h-px bg-slate-50 w-full mb-3"></div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{sub}</p>
    </div>
  );
}

function LogItem({ icon, title, time }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-700">{title}</p>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{time}</p>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5">
      <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{label}</span>
      <span className="text-xs font-mono font-bold text-emerald-400">{value}</span>
    </div>
  );
}

function ActivityIcon() {
  return <Activity size={20} className="text-emerald-400" />
}

function Activity({ size, className }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}