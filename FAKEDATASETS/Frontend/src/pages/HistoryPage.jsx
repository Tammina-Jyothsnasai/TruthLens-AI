import React, { useEffect, useState } from 'react';
import { getPredictionHistory, deleteHistoryItem, clearAllHistory } from '../services/api';
import { 
  Search, Trash2, Download, Filter, ArrowUpDown, Calendar, 
  Bookmark, CheckCircle2, AlertTriangle, FileSpreadsheet, Eye 
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL'); // ALL, FAKE, REAL
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setLoading(true);
    getPredictionHistory()
      .then((data) => setHistory(data))
      .catch(() => toast.error('Failed to load prediction history.'))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this prediction record?')) return;
    try {
      await deleteHistoryItem(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
      toast.success('Record deleted.');
    } catch {
      toast.error('Failed to delete record.');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to delete ALL prediction history?')) return;
    try {
      await clearAllHistory();
      setHistory([]);
      toast.success('All history cleared.');
    } catch {
      toast.error('Failed to clear history.');
    }
  };

  const handleExportCSV = () => {
    if (!history.length) return toast.info('No records to export.');
    const headers = ['ID,Verdict,Confidence,CredibilityScore,Text,Timestamp\n'];
    const rows = history.map(h => `"${h.id}","${h.label}","${h.confidence}","${h.credibilityScore}","${h.text.replace(/"/g, '""')}","${h.timestamp}"`);
    const blob = new Blob([headers + rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TruthLens_History_${Date.now()}.csv`;
    a.click();
    toast.success('CSV exported successfully!');
  };

  const toggleBookmark = (id) => {
    setHistory((prev) => prev.map(item => item.id === id ? { ...item, bookmarked: !item.bookmarked } : item));
    toast.info('Bookmark updated.');
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.text.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'ALL' || item.label === filter;
    const matchesBookmark = !bookmarkedOnly || item.bookmarked;
    return matchesSearch && matchesFilter && matchesBookmark;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Prediction History</h1>
          <p className="text-xs text-slate-500">Manage and export past news verification results</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold transition"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prediction history..."
            className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition ${filter === 'ALL' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
            >
              All ({history.length})
            </button>
            <button
              onClick={() => setFilter('FAKE')}
              className={`px-3 py-1.5 rounded-lg transition ${filter === 'FAKE' ? 'bg-red-500 text-white shadow-sm' : 'text-slate-500'}`}
            >
              Fake News
            </button>
            <button
              onClick={() => setFilter('REAL')}
              className={`px-3 py-1.5 rounded-lg transition ${filter === 'REAL' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500'}`}
            >
              Verified Real
            </button>
          </div>

          <button
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`p-2 rounded-xl border transition ${bookmarkedOnly ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}
            title="Bookmarked records"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-bold">
                <th className="p-4">Bookmark</th>
                <th className="p-4">Verdict</th>
                <th className="p-4">Credibility</th>
                <th className="p-4">Article Content Excerpt</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">Loading history records...</td>
                </tr>
              ) : filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">No matching history records found.</td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    <td className="p-4">
                      <button onClick={() => toggleBookmark(item.id)} className="text-slate-400 hover:text-amber-500">
                        <Bookmark className={`w-4 h-4 ${item.bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
                      </button>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        item.label === 'FAKE' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {item.label === 'FAKE' ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        <span>{item.label} ({item.confidence}%)</span>
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      {item.credibilityScore} / 100
                    </td>
                    <td className="p-4 max-w-md truncate text-slate-600 dark:text-slate-300 font-medium">
                      {item.text}
                    </td>
                    <td className="p-4 text-slate-400 whitespace-nowrap">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => navigate('/result', { state: { prediction: item } })}
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition"
                        title="View result"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}