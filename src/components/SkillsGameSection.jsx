import React, { useEffect, useRef, useState } from 'react';

// A tiny, fun mini-game: collect stars with arrow keys to reveal skills
export default function SkillsGameSection() {
  const canvasRef = useRef(null);
  const [collected, setCollected] = useState(0);
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Tailwind', 'FastAPI', 'MongoDB', 'Framer Motion']);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
    }
    resize();
    const onResize = () => { resize(); };
    window.addEventListener('resize', onResize);

    const player = { x: 50, y: 50, r: 10 * DPR, speed: 2 * DPR, vx: 0, vy: 0 };
    const stars = Array.from({ length: 6 }, (_, i) => ({
      x: 80 * DPR + i * 60 * DPR,
      y: 60 * DPR + ((i % 2) * 40) * DPR,
      r: 6 * DPR,
      got: false,
    }));

    const keys = new Set();
    const onKey = (e) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
        e.preventDefault();
      }
      if (e.type === 'keydown') keys.add(e.key);
      else keys.delete(e.key);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);

    function step() {
      // controls
      player.vx = (keys.has('ArrowRight') ? 1 : 0) - (keys.has('ArrowLeft') ? 1 : 0);
      player.vy = (keys.has('ArrowDown') ? 1 : 0) - (keys.has('ArrowUp') ? 1 : 0);
      const len = Math.hypot(player.vx, player.vy) || 1;
      player.x += (player.vx / len) * player.speed;
      player.y += (player.vy / len) * player.speed;
      // bounds
      player.x = Math.max(player.r, Math.min(canvas.width - player.r, player.x));
      player.y = Math.max(player.r, Math.min(canvas.height - player.r, player.y));

      // collisions
      stars.forEach((s, idx) => {
        if (!s.got && Math.hypot(player.x - s.x, player.y - s.y) < player.r + s.r) {
          s.got = true;
          setCollected((c) => Math.min(c + 1, stars.length));
        }
      });

      // draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // bg grid
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40 * DPR) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 40 * DPR) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
      }

      // stars
      stars.forEach((s) => {
        if (s.got) return;
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // player
      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="min-w-[100vw] h-screen snap-start bg-gradient-to-br from-slate-900 to-slate-800 text-white grid md:grid-cols-2">
      <div className="p-8 flex flex-col justify-center gap-4">
        <h2 className="text-3xl md:text-5xl font-bold">Play to reveal my skills</h2>
        <p className="text-slate-300">Use arrow keys to collect the glowing orbs. Each one reveals a skill.</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={`px-3 py-1 rounded-full border ${i < collected ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-white/5 border-white/10 text-slate-300'}`}>
              {i < collected ? ['React', 'TypeScript', 'Tailwind', 'FastAPI', 'MongoDB', 'Framer Motion'][i] : 'Locked'}
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </section>
  );
}
