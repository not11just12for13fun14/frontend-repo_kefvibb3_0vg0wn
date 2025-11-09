import React from 'react';

const projects = [
  {
    title: 'Interactive 3D Portfolio',
    desc: 'A playful WebGL/Spline powered portfolio site with horizontal storytelling.',
    tags: ['React', 'Spline', 'Tailwind'],
    link: '#',
  },
  {
    title: 'E-commerce UI Kit',
    desc: 'Reusable, accessible components for storefronts with dark/light themes.',
    tags: ['React', 'Radix', 'shadcn/ui'],
    link: '#',
  },
  {
    title: 'Realtime Chat',
    desc: 'Lightweight chat with typing indicators and message reactions.',
    tags: ['WebSocket', 'FastAPI', 'MongoDB'],
    link: '#',
  },
  {
    title: 'Motion Gallery',
    desc: 'Framer Motion powered gallery with buttery animations.',
    tags: ['Framer Motion', 'React'],
    link: '#',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="min-w-[100vw] h-screen snap-start bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.link}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 hover:from-white/10 hover:to-white/5 p-5 transition shadow-lg hover:shadow-xl"
            >
              <div className="h-32 mb-4 rounded-xl bg-gradient-to-tr from-indigo-500/30 via-fuchsia-500/20 to-emerald-500/30 group-hover:from-indigo-500/40 group-hover:to-emerald-500/40 transition" />
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-slate-300 text-sm mt-1">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
