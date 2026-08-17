import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Zap, Brain, Sparkles, ArrowRight, CheckCircle2, 
  BarChart2, Lock, Cpu, Globe, Database, FileText, HelpCircle, 
  Send, Users, Award, ChevronDown 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { label: 'Detection Accuracy', value: '94.8%', icon: ShieldCheck, color: 'text-emerald-500' },
    { label: 'Articles Processed', value: '124,800+', icon: Zap, color: 'text-blue-500' },
    { label: 'Active Researchers', value: '3,400+', icon: Users, color: 'text-purple-500' },
    { label: 'Avg Analysis Speed', value: '0.4 sec', icon: Cpu, color: 'text-indigo-500' },
  ];

  const features = [
    {
      title: 'Explainable AI (XAI)',
      desc: 'Get granular breakdown of why an article is flagged, highlighting suspicious linguistic patterns & trigger phrases.',
      icon: Brain,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Multi-Format Input Support',
      desc: 'Analyze raw text, paste links, or upload documents in TXT, PDF, or DOCX format effortlessly.',
      icon: FileText,
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'Real-Time Credibility Rating',
      desc: 'Instant 0–100 credibility score with confidence percentage and detailed probability distribution charts.',
      icon: BarChart2,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Flask REST API Integration',
      desc: 'Seamlessly powered by python Flask backend and trained machine learning ensemble classifiers.',
      icon: Database,
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  const workflowSteps = [
    { step: '01', title: 'Input News Article', desc: 'Paste news text, upload TXT/PDF/DOCX, or record voice input.' },
    { step: '02', title: 'NLP Feature Extraction', desc: 'TF-IDF vectorization & transformer linguistic feature parsing.' },
    { step: '03', title: 'ML Model Classification', desc: 'Ensemble model evaluates authenticity against trained datasets.' },
    { step: '04', title: 'Explainable Insights', desc: 'Visual probability distribution, credibility score, and exportable PDF report.' },
  ];

  const faqs = [
    { q: 'How does TruthLens AI detect fake news?', a: 'TruthLens AI uses Natural Language Processing (NLP) and Machine Learning models trained on thousands of verified news items to spot emotional bias, sensationalism, and factual discrepancies.' },
    { q: 'Can I upload PDF or DOCX files for batch analysis?', a: 'Yes! Our document parser extracts text directly from PDF, TXT, and DOCX files for instant detection.' },
    { q: 'Does TruthLens AI store my personal data?', a: 'No, all prediction history is protected by JWT authentication and stored securely in SQLite through our Flask REST backend.' },
    { q: 'Is multi-language news analysis supported?', a: 'Yes, TruthLens AI supports 10 global & regional languages including English, Telugu, Hindi, Tamil, Kannada, Malayalam, and more.' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Next-Gen Misinformation Countermeasure Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Detect Misinformation with <span className="gradient-text">Explainable AI</span> Precision
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal">
              Empower journalists, researchers, and citizens to analyze articles, documents, and news feeds in real-time with machine-learning accuracy.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                to="/detect" 
                className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center space-x-2 group transition duration-300"
              >
                <span>Analyze News Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 rounded-2xl border border-slate-200 dark:border-slate-700 transition"
              >
                Architecture & Demo
              </Link>
            </div>

            {/* Quick stats pills */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl glass-card text-center lg:text-left">
                  <s.icon className={`w-5 h-5 ${s.color} mb-1 mx-auto lg:mx-0`} />
                  <div className="text-lg font-black text-slate-900 dark:text-white">{s.value}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md glass-card rounded-3xl p-6 relative shadow-2xl border border-blue-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-slate-400">Live AI Classifier</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-100 dark:bg-slate-800/90 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-300">
                  "Breaking: Miracle herb cures all viral illnesses in 24 hours without doctor visits!"
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider block">Verdict</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">FAKE NEWS DETECTED</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400">Confidence</span>
                    <span className="text-sm font-black text-red-500 block">97.4%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Credibility Score</span>
                  <span className="text-red-500">12 / 100</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full w-[12%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">Enterprise Features Built for Accuracy</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Everything you need for major engineering project presentations, portfolio showcases, and real-world fact verification.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="p-6 rounded-3xl glass-card hover:-translate-y-1 transition duration-300 space-y-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.gradient} flex items-center justify-center text-white shadow-lg`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Workflow Section */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">How TruthLens AI Operates</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">End-to-end pipeline from user input to explainable insights.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {workflowSteps.map((s, idx) => (
              <div key={idx} className="p-6 rounded-3xl glass-card relative space-y-3">
                <span className="text-3xl font-black text-blue-500/20 block">{s.step}</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{s.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Everything about TruthLens AI platform architecture and usage.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-800/50 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}