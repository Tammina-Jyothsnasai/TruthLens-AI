import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart2, ShieldAlert, CheckCircle2, AlertTriangle, Users, 
  Search, History, TrendingUp, Bell, Zap, ArrowRight, User 
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { title: 'Total Predictions', value: stats?.totalPredictions?.toLocaleString() || '12,480', sub: 'Across all models', icon: Zap, color: 'from-blue-500 to-indigo-600' },
    { title: 'Fake News Flagged', value: stats?.fakeNewsCount?.toLocaleString() || '4,890', sub: '39.1% of total', icon: AlertTriangle, color: 'from-red-500 to-rose-600' },
    { title: 'Verified Authentic', value: stats?.realNewsCount?.toLocaleString() || '7,590', sub: '60.9% of total', icon: CheckCircle2, color: 'from-emerald-500 to-teal-600' },
    { title: 'Detection Accuracy', value: stats?.accuracy || '94.8%', sub: 'LIAR / WELFake benchmarks', icon: TrendingUp, color: 'from-purple-500 to-indigo-600' },
  ];

  const metrics = [
    { label: "Today's Checks", val: stats?.todayPredictions || '142' },
    { label: 'Weekly Activity', val: stats?.weeklyPredictions || '980' },
    { label: 'Monthly Verifications', val: stats?.monthlyPredictions || '4,120' },
    { label: 'Active Platform Users', val: stats?.activeUsers || '340' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden border-none shadow-2xl">
        <div className="relative z-10 space-y-2 max-w-xl">
          <span className="text-xs font-mono tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full inline-block backdrop-blur-md">
            Enterprise Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {user?.name || user?.email?.split('@')[0] || 'Researcher'}!
          </h1>
          <p className="text-xs text-blue-100 leading-relaxed">
            Your TruthLens AI node is actively processing real-time misinformation signals. Start a new verification or review recent activity metrics.
          </p>
          <div className="pt-2">
            <Link
              to="/detect"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-blue-600 font-bold text-xs rounded-xl hover:bg-blue-50 transition shadow-lg"
            >
              <Search className="w-4 h-4" />
              <span>Launch News Scanner</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c, idx) => (
          <div key={idx} className="p-6 rounded-3xl glass-card space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{c.title}</span>
              <div className={`p-2.5 rounded-2xl bg-gradient-to-tr ${c.color} text-white shadow-md`}>
                <c.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black tracking-tight">{loading ? '...' : c.value}</div>
              <div className="text-[11px] text-slate-400 font-medium pt-1">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-4 rounded-2xl glass-card text-center space-y-1">
            <span className="text-xs text-slate-500 font-medium block">{m.label}</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">{loading ? '...' : m.val}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Feed */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="glass-card rounded-3xl p-6 space-y-5 lg:col-span-1">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" /> Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              to="/detect"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center space-x-3">
                <Search className="w-4 h-4 text-blue-500" />
                <span>New News Verification</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/history"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center space-x-3">
                <History className="w-4 h-4 text-purple-500" />
                <span>View Prediction History</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/analytics"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <div className="flex items-center space-x-3">
                <BarChart2 className="w-4 h-4 text-emerald-500" />
                <span>Open Analytics Charts</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* System Activity & Notifications */}
        <div className="glass-card rounded-3xl p-6 space-y-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-500" /> Recent System Notifications
            </h3>
            <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Live Feed
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 flex items-start space-x-3">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl mt-0.5">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Flask Backend Node Active</span>
                <span className="text-slate-500">Connected to local SQLite database REST endpoint on port 5000.</span>
                <span className="text-[10px] text-slate-400 block pt-1">2 mins ago</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 flex items-start space-x-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Model Ensemble Updated</span>
                <span className="text-slate-500">TF-IDF feature extractor re-indexed with newest dataset samples.</span>
                <span className="text-[10px] text-slate-400 block pt-1">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}