import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative min-w-[100vw] h-screen snap-start flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* overlay content */}
      <div className="relative z-10 max-w-xl mx-auto p-6 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Hi, I'm Your Name</h1>
        <p className="text-slate-300 md:text-lg">Creative developer crafting playful, modern web experiences. Scroll to explore my work, skills, and story.</p>
        <div className="flex items-center justify-center gap-3">
          <a href="#projects" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 transition">View Projects</a>
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-600 transition">Contact</a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </section>
  );
}
