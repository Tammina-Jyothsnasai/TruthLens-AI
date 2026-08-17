import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, Download, Printer, 
  Share2, Copy, ArrowLeft, Brain, Sparkles, Clock, Globe, BarChart2 
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { toast } from 'react-toastify';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const prediction = location.state?.prediction || {
    label: 'FAKE',
    confidence: 94.2,
    credibilityScore: 18,
    text: 'Sample analyzed headline for preview demonstration.',
    fullText: 'Full article text analyzed by TruthLens AI ensemble classifier.',
    explanation: {
      summary: 'The article exhibits emotional sensationalism, alarmist phrasing, and lacks verifiable primary references.',
      triggers: ['Sensational Claim', 'Unverified Source', 'Emotional Manipulation'],
      sentiment: 'Negative / Alarmist',
      readingTime: '1 min read',
      detectedLanguage: 'English (Detected)',
    },
    timestamp: new Date().toISOString(),
  };

  const isFake = prediction.label === 'FAKE';

  const chartData = [
    { name: isFake ? 'Fake Probability' : 'Real Probability', value: prediction.confidence, color: isFake ? '#ef4444' : '#10b981' },
    { name: 'Uncertainty', value: Math.max(0, 100 - prediction.confidence), color: '#64748b' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`TruthLens AI Result:\nVerdict: ${prediction.label}\nCredibility Score: ${prediction.credibilityScore}/100\nConfidence: ${prediction.confidence}%`);
    toast.success('Result copied to clipboard!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'TruthLens AI News Verification Result',
        text: `Verdict: ${prediction.label} (Credibility Score: ${prediction.credibilityScore}/100)`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={() => navigate('/detect')}
          className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze Another Article</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Banner Badge */}
        <div className={`p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border ${
          isFake 
            ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400' 
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl ${isFake ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
              {isFake ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest block opacity-75">Analysis Verdict</span>
              <h2 className="text-2xl sm:text-3xl font-black">
                {isFake ? 'FLAGGED AS FAKE NEWS' : 'VERIFIED AUTHENTIC NEWS'}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold block opacity-75">AI Model Confidence</span>
            <span className="text-3xl font-black">{prediction.confidence}%</span>
          </div>
        </div>

        {/* Scores & Graphs Row */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Credibility Gauge */}
          <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 text-center space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">AI Credibility Score</span>
            <div className="text-4xl font-black text-slate-900 dark:text-white">
              {prediction.credibilityScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${isFake ? 'bg-red-500' : 'bg-emerald-500'}`} 
                style={{ width: `${prediction.credibilityScore}%` }} 
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {isFake ? 'Low credibility rating due to unverified claims.' : 'High credibility score matching verified news index.'}
            </p>
          </div>

          {/* Recharts Pie Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 text-center space-y-2 flex flex-col justify-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Probability Gauge</span>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={35} outerRadius={50} paddingAngle={4} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {prediction.confidence}% {isFake ? 'Fake' : 'Real'} Probability
            </span>
          </div>

          {/* Metadata Specs */}
          <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 space-y-3 text-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Metadata Summary</span>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                <span className="text-slate-500">Detected Language:</span>
                <span className="font-bold">{prediction.explanation?.detectedLanguage || 'English'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                <span className="text-slate-500">Reading Time:</span>
                <span className="font-bold">{prediction.explanation?.readingTime || '1 min read'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                <span className="text-slate-500">Sentiment Profile:</span>
                <span className="font-bold">{prediction.explanation?.sentiment || 'Neutral'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explainable AI Breakdown */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-500" /> Explainable AI (XAI) Rationale
          </h3>
          <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
            {prediction.explanation?.summary || 'The model evaluated key syntactic structures and domain authority metrics to classify this article.'}
          </div>

          {/* Key Triggers Tag List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Identified Keyword Triggers:</span>
            <div className="flex flex-wrap gap-2">
              {(prediction.explanation?.triggers || ['Sensationalism', 'Unverified Source']).map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 font-bold text-xs">
                  ⚠️ {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Analyzed Article Snippet */}
        <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Analyzed Article Excerpt</span>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300 font-mono leading-relaxed max-h-40 overflow-y-auto">
            {prediction.fullText || prediction.text}
          </div>
        </div>
      </div>
    </div>
  );
}