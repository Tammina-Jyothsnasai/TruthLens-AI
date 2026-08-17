import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity, Sparkles, Download, Layers } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AnalyticsPage() {
  const barData = [
    { category: 'Politics', Fake: 420, Real: 680 },
    { category: 'Health', Fake: 530, Real: 310 },
    { category: 'Technology', Fake: 180, Real: 840 },
    { category: 'Finance', Fake: 290, Real: 610 },
    { category: 'Entertainment', Fake: 610, Real: 390 },
  ];

  const lineData = [
    { day: 'Mon', Predictions: 120 },
    { day: 'Tue', Predictions: 180 },
    { day: 'Wed', Predictions: 240 },
    { day: 'Thu', Predictions: 310 },
    { day: 'Fri', Predictions: 290 },
    { day: 'Sat', Predictions: 190 },
    { day: 'Sun', Predictions: 230 },
  ];

  const pieData = [
    { name: 'Fake News', value: 39, color: '#ef4444' },
    { name: 'Real News', value: 61, color: '#10b981' },
  ];

  const areaData = [
    { week: 'W1', Activity: 1200 },
    { week: 'W2', Activity: 1900 },
    { week: 'W3', Activity: 2400 },
    { week: 'W4', Activity: 3100 },
  ];

  const trendingKeywords = [
    'Election', 'Miracle Cure', 'Cryptocurrency', 'Government Policy', 
    'Climate Crisis', 'AI Breakthrough', 'Breaking News', 'Vaccine'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deep Insights Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Platform Analytics & Intelligence</h1>
          <p className="text-xs text-slate-500">Comprehensive Machine Learning classification trends & distribution charts</p>
        </div>

        <button
          onClick={() => toast.success('Analytics Report PDF generated!')}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics PDF</span>
        </button>
      </div>

      {/* Chart Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 1. Bar Chart: Fake vs Real by Category */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" /> Fake vs Real News by Category
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Bar Chart</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="Fake" fill="#ef4444" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Real" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Line Chart: Predictions Over Time */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" /> Predictions Over Time (Daily)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Line Chart</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="Predictions" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Pie Chart: Overall Distribution */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-500" /> Overall Classification Distribution
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Pie Chart</span>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Area Chart: Weekly Activity Trend */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" /> Weekly Activity Growth
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Area Chart</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="Activity" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Keywords & Word Cloud Tags */}
      <div className="glass-card rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-500" /> Trending Misinformation Keywords & Word Cloud
        </h3>
        <div className="flex flex-wrap gap-2 pt-2">
          {trendingKeywords.map((kw, idx) => (
            <span 
              key={idx} 
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
                idx % 2 === 0 
                  ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' 
                  : 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
              }`}
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}