import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';

export const AIAssistantModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am TruthLens AI Assistant. Ask me anything about news verification, ML confidence scores, or platform features!' }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let reply = "I analyze news articles using NLP deep learning models to measure linguistic emotional sentiment, keyword triggers, and source credibility.";
      const query = userMsg.toLowerCase();

      if (query.includes('how') || query.includes('work')) {
        reply = "TruthLens AI extracts features using TF-IDF and transformer embeddings, then evaluates credibility through a trained ensemble classifier.";
      } else if (query.includes('accuracy') || query.includes('reliable')) {
        reply = "Our benchmark accuracy is currently 94.8% on standard misinformation datasets (WELFake & LIAR benchmarks).";
      } else if (query.includes('upload') || query.includes('pdf')) {
        reply = "You can upload TXT, PDF, or DOCX documents on the 'Detect News' page for instant batch analysis.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] glass-card rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30 flex flex-col h-[480px] animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-1.5">
              TruthLens AI Copilot
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </h3>
            <span className="text-xs text-blue-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online & Ready
            </span>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
              m.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <button 
          onClick={() => setInput("How accurate is TruthLens?")}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 transition"
        >
          Accuracy?
        </button>
        <button 
          onClick={() => setInput("How to upload a PDF file?")}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200 transition"
        >
          PDF Upload?
        </button>
      </div>

      {/* Input form */}
      <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask TruthLens Copilot..."
          className="flex-1 bg-slate-100 dark:bg-slate-800 text-xs px-3 py-2 rounded-xl outline-none border border-transparent focus:border-blue-500 transition"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
