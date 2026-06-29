import { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ExternalLink,
  User
} from 'lucide-react';
import { mockDb } from '../services/db';
import type { Lesson } from '../services/db';

export default function MateriView() {
  const [lessons, setLessons] = useState<Lesson[]>(() => mockDb.getLessons());
  const [searchVal, setSearchVal] = useState('');
  const [selectedClass, setSelectedClass] = useState<'All' | '7' | '8'>('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  // Sync state in case mock DB updates (CRUD / seeder)
  const refreshLessons = () => {
    setLessons(mockDb.getLessons());
  };

  // Get unique topics list
  const topics = ['All', ...Array.from(new Set(lessons.map(l => l.topic)))];

  // Filter lessons
  const filtered = lessons.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchVal.toLowerCase()) || 
                          l.topic.toLowerCase().includes(searchVal.toLowerCase()) ||
                          l.creator.toLowerCase().includes(searchVal.toLowerCase());
    const matchesClass = selectedClass === 'All' || l.classLevel === selectedClass;
    const matchesTopic = selectedTopic === 'All' || l.topic === selectedTopic;
    return matchesSearch && matchesClass && matchesTopic;
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in" onLoad={refreshLessons}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-800">
            Materi Pembelajaran
          </h2>
          <p className="text-[12px] text-slate-500 mt-1">
            Daftar modul modul ajar terstruktur untuk robotika dan IoT IDN Boarding School.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari materi / pembuat..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="glass-input w-full pl-10 text-[12.5px] py-2"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Class level filter */}
        <div className="flex gap-1.5 bg-slate-200/40 p-1 rounded-2xl border border-slate-200/20">
          <button
            onClick={() => setSelectedClass('All')}
            className={`rounded-xl px-3.5 py-1.5 text-[11px] font-bold transition-all ${
              selectedClass === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Kelas
          </button>
          <button
            onClick={() => setSelectedClass('7')}
            className={`rounded-xl px-3.5 py-1.5 text-[11px] font-bold transition-all ${
              selectedClass === '7'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kelas 7 (Junior)
          </button>
          <button
            onClick={() => setSelectedClass('8')}
            className={`rounded-xl px-3.5 py-1.5 text-[11px] font-bold transition-all ${
              selectedClass === '8'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kelas 8 (Senior)
          </button>
        </div>

        {/* Topic filter */}
        <div className="flex flex-wrap gap-1.5 bg-slate-200/40 p-1 rounded-2xl border border-slate-200/20">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                selectedTopic === topic
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Materi list table */}
      <div className="glass-card p-6 rounded-3xl overflow-x-auto">
        <table className="w-full text-left border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3.5 px-4 w-[80px]">Kelas</th>
              <th className="py-3.5 px-4">Judul Materi</th>
              <th className="py-3.5 px-4">Topik</th>
              <th className="py-3.5 px-4 w-[100px]">Estimasi</th>
              <th className="py-3.5 px-4">Penyusun</th>
              <th className="py-3.5 px-4 text-right w-[150px]">Link Aset</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center justify-center rounded-xl h-8 w-8 text-[11.5px] font-extrabold border ${
                    lesson.classLevel === '7'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-violet-50 border-violet-200 text-violet-700'
                  }`}>
                    K{lesson.classLevel}
                  </span>
                </td>
                <td className="py-4 px-4 font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </td>
                <td className="py-4 px-4">
                  <span className="badge badge-secondary font-bold text-[10px]">{lesson.topic}</span>
                </td>
                <td className="py-4 px-4 text-slate-500 font-semibold">{lesson.duration}</td>
                <td className="py-4 px-4 text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-slate-400" />
                    <span>{lesson.creator}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <a
                    href={lesson.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11.5px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <span>Google Drive</span>
                    <ExternalLink size={12} />
                  </a>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-400">
                  <BookOpen className="mx-auto mb-2 opacity-30" size={36} />
                  <p className="text-[12.5px] font-medium">Tidak ada materi yang ditemukan.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
