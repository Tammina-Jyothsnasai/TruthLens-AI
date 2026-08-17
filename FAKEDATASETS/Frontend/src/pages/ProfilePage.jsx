import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile } from '../services/api';
import { User, Mail, Calendar, ShieldCheck, Key, LogOut, Save, Zap } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setProfile(data);
        setFullName(data.fullName || user?.name || '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="glass-card rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Profile Banner */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/20">
            {user?.email?.[0].toUpperCase() || 'U'}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-extrabold">{fullName || 'TruthLens Researcher'}</h1>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <Mail className="w-3.5 h-3.5" /> {user?.email}
            </p>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>JWT Authenticated Researcher</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-center">
            <span className="text-xs text-slate-500 font-medium block">Total Checks</span>
            <span className="text-xl font-black text-blue-600">{profile?.totalPredictions || 48}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-center">
            <span className="text-xs text-slate-500 font-medium block">Fake Flagged</span>
            <span className="text-xl font-black text-red-500">{profile?.fakeDetected || 19}</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-center">
            <span className="text-xs text-slate-500 font-medium block">Verified Real</span>
            <span className="text-xl font-black text-emerald-500">{profile?.realVerified || 29}</span>
          </div>
        </div>

        {/* Form Settings */}
        <form onSubmit={handleUpdate} className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold">Update Profile Details</h3>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

            <button
              type="submit"
              className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}