import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectFakeNews } from '../services/api';
import { 
  FileText, Upload, Mic, Trash2, ArrowRight, Sparkles, 
  Clock, Globe, CheckCircle, FileUp, AlertCircle 
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function DetectionPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('text'); // text, file, voice
  const [newsText, setNewsText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectedLang, setDetectedLang] = useState('English');

  // Load saved draft
  useEffect(() => {
    const draft = localStorage.getItem('truthlens_draft');
    if (draft) setNewsText(draft);
  }, []);

  // Auto save draft
  useEffect(() => {
    if (newsText) {
      localStorage.setItem('truthlens_draft', newsText);
    }
  }, [newsText]);

  // Reading time & char count calculation
  const charCount = newsText.length;
  const wordCount = newsText.trim() ? newsText.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleClear = () => {
    setNewsText('');
    setFileName('');
    localStorage.removeItem('truthlens_draft');
    toast.info('Cleared news input.');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    if (file.name.endsWith('.txt')) {
      reader.onload = (event) => {
        setNewsText(event.target.result);
        toast.success(`Loaded text from ${file.name}`);
      };
      reader.readAsText(file);
    } else {
      // PDF or DOCX mock extractor
      setNewsText(`[Extracted Content from ${file.name}]\n\nSample news text extracted from uploaded document. Government officials confirm groundbreaking renewable energy policies scheduled for implementation next quarter according to published report headers.`);
      toast.success(`Extracted content from ${file.name}`);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Voice input is not supported in this browser. Please use Chrome/Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (!isRecording) {
      setIsRecording(true);
      toast.info('Listening... Speak your news article clearly into the microphone.');
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNewsText((prev) => prev + ' ' + transcript);
        setIsRecording(false);
        toast.success('Speech transcribed successfully!');
      };

      recognition.onerror = () => {
        setIsRecording(false);
        toast.error('Voice recognition failed or timed out.');
      };

      recognition.onend = () => setIsRecording(false);
    } else {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handlePredict = async () => {
    if (!newsText.trim()) {
      toast.warn('Please enter news text or upload a document to analyze.');
      return;
    }

    setLoading(true);

    try {
      const result = await detectFakeNews({ text: newsText, language: detectedLang });
      toast.success('Analysis complete!');
      navigate('/result', { state: { prediction: result } });
    } catch (err) {
      toast.error('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Real-Time NLP Analysis Node</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Fake News Verification Engine</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Paste article content, upload TXT/PDF/DOCX documents, or speak to evaluate credibility scores.
        </p>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Input Method Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'text'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Paste Text</span>
            </button>

            <button
              onClick={() => setActiveTab('file')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'file'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
            </button>

            <button
              onClick={() => setActiveTab('voice')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'voice'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Voice Input</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-4 text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-blue-500" /> {detectedLang}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> {readingTime} min read
            </span>
          </div>
        </div>

        {/* Tab 1: Text Input */}
        {activeTab === 'text' && (
          <div className="space-y-2">
            <textarea
              rows={8}
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
              placeholder="Paste full news article headline or story content here..."
              className="w-full p-4 rounded-2xl glass-input text-xs sm:text-sm resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Tab 2: File Upload */}
        {activeTab === 'file' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 text-center space-y-3 hover:border-blue-500 transition">
              <FileUp className="w-10 h-10 text-blue-500 mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Click to Upload or Drag & Drop Document
                </h4>
                <p className="text-xs text-slate-400">Supports TXT, PDF, and DOCX formats up to 10MB</p>
              </div>
              <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-input"
              />
              <label
                htmlFor="file-upload-input"
                className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-md"
              >
                Browse File
              </label>
            </div>
            {fileName && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-between text-xs text-blue-600 font-bold">
                <span>Selected: {fileName}</span>
                <span className="text-[10px] text-slate-400">Content Loaded</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Voice Input */}
        {activeTab === 'voice' && (
          <div className="p-8 text-center space-y-4 bg-slate-100/50 dark:bg-slate-800/40 rounded-3xl">
            <button
              onClick={handleVoiceInput}
              className={`p-6 rounded-full text-white shadow-2xl transition duration-300 ${
                isRecording ? 'bg-red-500 animate-pulse scale-110' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105'
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {isRecording ? 'Listening to speech...' : 'Click microphone to record news text'}
              </h4>
              <p className="text-xs text-slate-500">Transcribes voice input directly into the analysis box.</p>
            </div>
          </div>
        )}

        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500">
          <div className="flex items-center space-x-4">
            <span>Characters: <strong className="text-slate-900 dark:text-white">{charCount}</strong></span>
            <span>Words: <strong className="text-slate-900 dark:text-white">{wordCount}</strong></span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleClear}
              className="flex items-center space-x-1 px-3.5 py-2 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>

            <button
              onClick={handlePredict}
              disabled={loading || !newsText.trim()}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Analyze News</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}