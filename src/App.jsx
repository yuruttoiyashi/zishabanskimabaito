
import React, { useState, useEffect } from "react";
import { Briefcase, MapPin, Building2, ChevronRight } from "lucide-react";

// ==============================================
// ⚙️ 設定エリア
// ==============================================
const API_URL = "https://script.google.com/macros/s/AKfycbwCrTKs6JtPZf8HJnZA_Dhiq2JDxFJEBjbauPJSKaaZHr4dy1AWqJ3GSCllTmdQsw2K/exec";

// ==============================================
// 📱 コンポーネント
// ==============================================

const Header = ({ activeView, setView }) => (
  <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
    <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
        <span className="p-2 bg-blue-50 rounded-lg">🚀</span>
        SkimaGig
      </h1>
      <nav className="flex gap-1 bg-slate-100 p-1 rounded-full">
        <button
          onClick={() => setView("list")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            activeView === "list"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          募集一覧
        </button>
        <button
          onClick={() => setView("history")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            activeView === "history"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          履歴
        </button>
      </nav>
    </div>
  </header>
);

const JobCard = ({ job, onApply }) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
    <div className="relative h-48 overflow-hidden">
      <img
        src={job.imageUrl || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"}
        alt={job.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3">
        <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-xs font-bold rounded-full text-slate-800 shadow-sm">
          {job.category}
        </span>
      </div>
      <div className="absolute bottom-3 right-3">
        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-lg shadow-lg">
          ¥{job.wage?.toLocaleString()}
          <span className="text-xs ml-1 font-normal opacity-80">/h</span>
        </div>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{job.title}</h3>
      <div className="flex flex-col gap-1 mb-4">
        <p className="text-slate-500 text-sm flex items-center gap-1">
          <Building2 size={14} /> {job.company}
        </p>
        <p className="text-slate-500 text-sm flex items-center gap-1">
          <MapPin size={14} /> {job.location}
        </p>
      </div>
      <button
        onClick={() => onApply(job)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
      >
        今すぐ応募する
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
);

// メインのAppコンポーネント
export default function App() {
  const [view, setView] = useState("list");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("データ取得エラー:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header activeView={view} setView={setView} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} onApply={(j) => alert(`${j.title}に応募しました（デモ）`)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
