"use client";
import React from 'react';
import { Sprout, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    // Menggunakan h-screen dan overflow-hidden agar tidak ada scrollbar
    <div className="h-screen w-full bg-[#F0F4F4] flex items-center justify-center p-6 font-sans overflow-hidden">
      
      {/* MAIN CARD CONTAINER - max-h dikunci agar tidak meluber */}
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-emerald-900/5">
        
        {/* LEFT SIDE: GREEN PANEL */}
        <div className="bg-[#00B67A] md:w-2/5 p-12 flex flex-col justify-between text-white relative">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-12">
              <Sprout size={24} />
              <span className="font-bold text-xl tracking-tight">GrowSmart</span>
            </div>
            
            <h1 className="text-4xl font-black leading-tight mb-6">
              Welcome Back to Your Garden!
            </h1>
            <p className="text-emerald-50/80 text-sm leading-relaxed font-medium">
              Monitor and control your IoT Greenhouse systems from anywhere at any time.
            </p>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 z-10">
            GrowSmart Project 2026
          </div>

          {/* Decorative circle */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="md:w-3/5 p-12 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Sign In</h2>
            <p className="text-xs font-bold text-slate-400 mb-10">
              Belum punya akun? <Link href="/register" className="text-[#00B67A] hover:underline">Daftar Sekarang</Link>
            </p>

            <form className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#00B67A] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="rafif@gmail.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#00B67A]/30 focus:ring-4 focus:ring-[#00B67A]/5 transition-all text-slate-700"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#00B67A] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#00B67A]/30 focus:ring-4 focus:ring-[#00B67A]/5 transition-all text-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-1">
                <button type="button" className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#00B67A] hover:bg-[#009e6a] text-white rounded-2xl py-4 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 transition-all active:scale-95 mt-4"
              >
                Login <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}