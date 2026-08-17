import React from 'react';
import { ShieldAlert, Cpu, Database, Server, Code, Sparkles, Layers, Globe, Users, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const stack = [
    { name: 'React + Vite', desc: 'Client-side rendering UI with fast module replacement', icon: Code, color: 'text-blue-500' },
    { name: 'Tailwind CSS', desc: 'Custom glassmorphism aesthetic & responsive design', icon: Layers, color: 'text-cyan-500' },
    { name: 'Flask REST API', desc: 'Python backend handling machine learning inference & SQLite storage', icon: Server, color: 'text-emerald-500' },
    { name: 'SQLite Database', desc: 'Relational data engine storing user accounts & prediction logs', icon: Database, color: 'text-purple-500' },
    { name: 'NLP & ML Ensemble', desc: 'TF-IDF vectorizers & Logistic/PassiveAggressive ML classifiers', icon: Cpu, color: 'text-indigo-500' },
    { name: 'React-i18next', desc: 'Instant multilingual support for 10 regional & global languages', icon: Globe, color: 'text-amber-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <ShieldAlert className="w-4 h-4" />
          <span>Major Engineering Project Showcase</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">About TruthLens AI</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          An enterprise-level AI fact-verification system designed to combat digital misinformation through explainable machine learning classifiers.
        </p>
      </div>

      {/* Mission / Vision Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-8 space-y-3">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">Our Mission</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            To provide journalists, researchers, and everyday citizens with accessible, transparent, and accurate AI tools to verify news authenticity in real-time.
          </p>
        </div>
        <div className="glass-card rounded-3xl p-8 space-y-3">
          <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Our Architecture</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Strictly decoupled Client-Server architecture. The React frontend interacts with the Flask REST API via Axios JWT requests, ensuring zero direct database access.
          </p>
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-center">Technology Stack</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((item, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 space-y-3 hover:-translate-y-1 transition">
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <h4 className="text-base font-bold">{item.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}