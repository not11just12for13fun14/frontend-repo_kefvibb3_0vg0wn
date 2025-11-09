import React from 'react';

const education = [
  { school: 'Tech University', degree: 'B.Sc. in Computer Science', year: '2018 - 2022' },
  { school: 'Design Institute', degree: 'Diploma in UI/UX', year: '2022 - 2023' },
];

export default function EducationSection() {
  return (
    <section className="min-w-[100vw] h-screen snap-start bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Education</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold">{e.school}</div>
              <div className="text-slate-300">{e.degree}</div>
              <div className="text-slate-400 text-sm mt-1">{e.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
