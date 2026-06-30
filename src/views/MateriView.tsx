import { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ExternalLink,
  User,
  Clock,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Cpu
} from 'lucide-react';
import { mockDb } from '../services/db';
import type { Lesson } from '../services/db';

// Topic → visual theme mapping
const TOPIC_THEMES: Record<string, { gradient: string; badge: string; icon: string }> = {
  'Microbit':         { gradient: 'from-blue-500 to-cyan-500',    badge: 'bg-blue-100 text-blue-700 border-blue-200',    icon: '🎮' },
  'Tinybit':          { gradient: 'from-violet-500 to-purple-600', badge: 'bg-violet-100 text-violet-700 border-violet-200', icon: '🤖' },
  'IoT Basic':        { gradient: 'from-emerald-500 to-teal-500',  badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: '🌐' },
  'Python Robot':     { gradient: 'from-amber-500 to-orange-500',  badge: 'bg-amber-100 text-amber-700 border-amber-200',  icon: '🐍' },
  'AI Robot':         { gradient: 'from-pink-500 to-rose-500',     badge: 'bg-pink-100 text-pink-700 border-pink-200',     icon: '🧠' },
  'Computer Vision':  { gradient: 'from-indigo-500 to-blue-600',   badge: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: '👁️' },
  'ESP32 IoT':        { gradient: 'from-green-500 to-emerald-600', badge: 'bg-green-100 text-green-700 border-green-200',   icon: '📡' },
  'Python Basic':     { gradient: 'from-yellow-500 to-amber-500',  badge: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: '💡' },
};

const DEFAULT_THEME = { gradient: 'from-slate-500 to-slate-600', badge: 'bg-slate-100 text-slate-700 border-slate-200', icon: '📚' };

function getTheme(topic: string) {
  return TOPIC_THEMES[topic] || DEFAULT_THEME;
}

function getDriveLinks(lesson: Lesson) {
  if (lesson.driveLinks && Array.isArray(lesson.driveLinks) && lesson.driveLinks.length > 0) {
    return lesson.driveLinks;
  }
  const legacy = (lesson as any).driveLink as string | undefined;
  if (legacy && legacy.startsWith('http')) return [{ label: 'Google Drive', url: legacy }];
  return [];
}

function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const theme = getTheme(lesson.topic);
  const links = getDriveLinks(lesson);
  const isClass7 = lesson.classLevel === '7';

  return (
    <div
      className="glass-card rounded-3xl overflow-hidden border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group flex flex-col"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Coloured top stripe */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.gradient}`} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Top row: class badge + topic icon */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-extrabold border ${
            isClass7
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-violet-50 border-violet-200 text-violet-700'
          }`}>
            <GraduationCap size={10} />
            Kelas {lesson.classLevel} {isClass7 ? '— Junior' : '— Senior'}
          </span>

          <div className={`h-9 w-9 rounded-2xl flex items-center justify-center text-lg bg-gradient-to-br ${theme.gradient} shadow-sm`}>
            {theme.icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-[15px] font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors">
          {lesson.title}
        </h3>

        {/* Topic badge */}
        <span className={`inline-flex items-center gap-1 self-start px-2.5 py-0.5 rounded-lg text-[10.5px] font-bold border ${theme.badge}`}>
          <Cpu size={9} />
          {lesson.topic}
        </span>

        {/* Duration + creator */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-slate-500">
          <span className="flex items-center gap-1 font-semibold">
            <Clock size={11} className="text-slate-400" />
            {lesson.duration}
          </span>
          <span className="flex items-center gap-1">
            <User size={11} className="text-slate-400" />
            {lesson.creator}
          </span>
        </div>

        {/* Drive links section */}
        {links.length > 0 && (
          <div className="mt-auto pt-3 border-t border-slate-100">
            {/* Show first link always */}
            <div className="flex flex-wrap gap-1.5">
              {links.slice(0, expanded ? links.length : 2).map((lnk, idx) => (
                <a
                  key={idx}
                  href={lnk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={lnk.url}
                  onClick={e => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border border-blue-200 bg-white text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm whitespace-nowrap"
                >
                  <ExternalLink size={10} />
                  {lnk.label}
                </a>
              ))}
            </div>

            {/* Toggle if >2 links */}
            {links.length > 2 && (
              <button
                onClick={() => setExpanded(v => !v)}
                className="mt-1.5 flex items-center gap-0.5 text-[10.5px] text-blue-500 font-semibold hover:text-blue-700 transition-colors"
              >
                {expanded ? (
                  <><ChevronUp size={12} /> Sembunyikan</>
                ) : (
                  <><ChevronDown size={12} /> +{links.length - 2} link lagi</>
                )}
              </button>
            )}
          </div>
        )}

        {links.length === 0 && (
          <div className="mt-auto pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-300 italic">Belum ada link aset</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MateriView() {
  const [lessons, setLessons] = useState<Lesson[]>(() => mockDb.getLessons());
  const [searchVal, setSearchVal] = useState('');
  const [selectedClass, setSelectedClass] = useState<'All' | '7' | '8'>('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const refreshLessons = () => setLessons(mockDb.getLessons());

  const topics = ['All', ...Array.from(new Set(lessons.map(l => l.topic)))];

  const filtered = lessons.filter(l => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchVal.toLowerCase()) ||
      l.topic.toLowerCase().includes(searchVal.toLowerCase()) ||
      l.creator.toLowerCase().includes(searchVal.toLowerCase());
    const matchesClass = selectedClass === 'All' || l.classLevel === selectedClass;
    const matchesTopic = selectedTopic === 'All' || l.topic === selectedTopic;
    return matchesSearch && matchesClass && matchesTopic;
  });

  const class7Count = filtered.filter(l => l.classLevel === '7').length;
  const class8Count = filtered.filter(l => l.classLevel === '8').length;

  return (
    <div className="flex flex-col gap-6 animate-fade-in" onLoad={refreshLessons}>

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shrink-0">
            <BookOpen className="text-white" size={18} />
          </div>
          <div>
            <h2 className="font-heading text-[18px] font-extrabold text-slate-800 leading-tight tracking-tight">
              Materi Pembelajaran
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
              {filtered.length} modul &nbsp;·&nbsp; {class7Count} Junior &nbsp;·&nbsp; {class8Count} Senior
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul, topik, pembuat..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="glass-input w-full pl-10 text-[12.5px] py-2"
          />
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Class level */}
        <div className="flex gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/50 shadow-inner">
          {(['All', '7', '8'] as const).map(cls => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`rounded-xl px-4 py-1.5 text-[11px] font-bold transition-all ${
                selectedClass === cls
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/70'
              }`}
            >
              {cls === 'All' ? 'Semua' : cls === '7' ? '🎓 Kelas 7' : '🚀 Kelas 8'}
            </button>
          ))}
        </div>

        {/* Topic chips */}
        <div className="flex flex-wrap gap-1.5">
          {topics.map(topic => {
            const th = topic === 'All' ? null : getTheme(topic);
            const active = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`flex items-center gap-1 rounded-2xl px-3 py-1.5 text-[10.5px] font-bold border transition-all ${
                  active
                    ? th
                      ? `bg-gradient-to-r ${th.gradient} text-white border-transparent shadow-md`
                      : 'bg-blue-600 text-white border-transparent shadow-md'
                    : 'bg-white/60 border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-white'
                }`}
              >
                {topic !== 'All' && th && <span className="text-[11px]">{th.icon}</span>}
                {topic === 'All' ? '📋 Semua Topik' : topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Cards Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} index={i} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-center">
          <div className="text-5xl opacity-30">📚</div>
          <p className="font-heading text-[14px] font-bold text-slate-500">Tidak ada materi yang ditemukan</p>
          <p className="text-[12px] text-slate-400">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}

    </div>
  );
}
