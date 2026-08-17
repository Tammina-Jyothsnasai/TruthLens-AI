import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ShieldAlert, LayoutDashboard, Search, History, BarChart3, 
  Info, LogOut, Sun, Moon, Languages, Menu, X, Bot, Sparkles, User
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AIAssistantModal } from '../components/AIAssistantModal';

export const MainLayout = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const navigation = [
    { name: t('dashboard'), href: '/dashboard', icon: LayoutDashboard, protected: true },
    { name: t('detect'), href: '/detect', icon: Search, protected: false },
    { name: t('history'), href: '/history', icon: History, protected: true },
    { name: t('analytics'), href: '/analytics', icon: BarChart3, protected: true },
    { name: t('about'), href: '/about', icon: Info, protected: false },
  ];

  const languages = [
    { code: 'en', label: 'English (EN)' },
    { code: 'te', label: 'తెలుగు (TE)' },
    { code: 'hi', label: 'हिन्दी (HI)' },
    { code: 'ta', label: 'தமிழ் (TA)' },
    { code: 'kn', label: 'ಕನ್ನಡ (KN)' },
    { code: 'ml', label: 'മലയാളം (ML)' },
    { code: 'es', label: 'Español (ES)' },
    { code: 'fr', label: 'Français (FR)' },
    { code: 'de', label: 'Deutsch (DE)' },
    { code: 'ar', label: 'العربية (AR)' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans relative selection:bg-blue-600 selection:text-white">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="p-2 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition duration-300">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
              TruthLens AI
            </span>
            <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
              Enterprise Fact Engine
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            if (item.protected && !isAuthenticated) return null;
            const active = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                  active 
                    ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 font-semibold' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Utility Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-xl px-2.5 py-1.5 border border-slate-200 dark:border-slate-700">
            <Languages className="w-4 h-4 text-blue-500 mr-1.5" />
            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer text-slate-700 dark:text-slate-200"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* User Auth state */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-2 border-l border-slate-200 dark:border-slate-800 pl-3">
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                  {user?.email?.[0].toUpperCase() || 'U'}
                </div>
              </Link>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="p-2 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                title={t('logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition"
              >
                {t('login')}
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/20 transition"
              >
                {t('register')}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navigation.map((item) => {
            if (item.protected && !isAuthenticated) return null;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                <item.icon className="w-4 h-4 text-blue-500" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          {!isAuthenticated ? (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
              <Link 
                to="/login" 
                onClick={() => setMobileOpen(false)}
                className="text-center py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {t('login')}
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileOpen(false)}
                className="text-center py-2 rounded-xl text-xs font-bold text-white bg-blue-600"
              >
                {t('register')}
              </Link>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-2">
              <span className="text-xs font-semibold text-slate-500">{user?.email}</span>
              <button 
                onClick={() => { logout(); setMobileOpen(false); navigate('/login'); }}
                className="text-xs text-red-500 font-bold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Floating AI Copilot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
        >
          <Bot className="w-5 h-5 animate-bounce" />
          <span className="text-xs font-bold tracking-wide">AI Copilot</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </button>
      </div>

      {/* AI Copilot Drawer Modal */}
      <AIAssistantModal 
        isOpen={aiAssistantOpen} 
        onClose={() => setAiAssistantOpen(false)} 
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 py-8 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-slate-700 dark:text-slate-300">TruthLens AI Platform</span>
            <span>— Enterprise-Grade Misinformation Detector</span>
          </div>
          <p>© 2026 TruthLens AI Engine. Flask & Machine Learning Architecture.</p>
        </div>
      </footer>
    </div>
  );
};