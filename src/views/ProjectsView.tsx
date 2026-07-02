import { useState } from 'react';
import {
  FolderGit,
  Search,
  Cpu,
  Terminal,
  Clock,
  ExternalLink,
  CheckSquare,
  Trash2,
  Bluetooth,
  Hand,
  Sprout,
  Route,
  Package,
  Home,
  Layers,
  Award,
  BookOpen,
  Play,
  Square,
  Bot,
  Wifi,
  Zap
} from 'lucide-react';
import { mockDb } from '../services/db';
import type { Project, CurriculumSubject } from '../services/db';

/* ── Icon mapper ── */
const iconMap: Record<string, React.ElementType> = {
  trash: Trash2, bluetooth: Bluetooth, hand: Hand,
  sprout: Sprout, route: Route, parking: Cpu,
  package: Package, home: Home, folder: FolderGit,
};

/* ── Display category resolution (by curriculumId prefix — source of truth) ── */
function resolveDisplayCat(curriculumId: string, fallbackCategory: string): string {
  if (!curriculumId) {
    // fallback from db category field
    if (fallbackCategory === 'Tinybit') return 'Tinybit';
    if (fallbackCategory === 'AI Robotic Project' || fallbackCategory === 'Computer Vision Project') return 'Robot';
    return 'IoT Smart';
  }
  if (curriculumId.startsWith('tinybit-')) return 'Tinybit';
  if (
    curriculumId.startsWith('robot-') ||
    curriculumId === 'parking-ai'
  ) return 'Robot';
  return 'IoT Smart';
}

/* ── Filter tab definitions ── */
interface TabDef {
  id: string;
  label: string;
  Icon: React.ElementType;
  grad: string;
  activeBg: string;
  activeTxt: string;
}
const TABS: TabDef[] = [
  { id: 'All',      label: 'Semua',      Icon: FolderGit, grad: 'from-slate-500  to-slate-700',  activeBg: '#1e293b', activeTxt: '#fff' },
  { id: 'Tinybit',  label: 'Tinybit',    Icon: Bluetooth, grad: 'from-indigo-500 to-violet-600', activeBg: '#4f46e5', activeTxt: '#fff' },
  { id: 'IoT Smart',label: 'IoT Smart',  Icon: Wifi,      grad: 'from-emerald-500 to-teal-600',  activeBg: '#059669', activeTxt: '#fff' },
  { id: 'Robot',    label: 'Robot & AI', Icon: Bot,       grad: 'from-amber-500  to-orange-600', activeBg: '#d97706', activeTxt: '#fff' },
];

/* ── Category accent colours (for track cards) ── */
const CAT_ACCENT: Record<string, { bg: string; text: string; border: string; gradA: string; gradB: string }> = {
  'Tinybit':  { bg:'rgba(99,102,241,0.10)', text:'#4338ca', border:'rgba(99,102,241,0.28)', gradA:'#4f46e5', gradB:'#7c3aed' },
  'IoT Smart':{ bg:'rgba(16,185,129,0.10)', text:'#065f46', border:'rgba(16,185,129,0.28)', gradA:'#059669', gradB:'#0891b2' },
  'Robot':    { bg:'rgba(245,158,11,0.10)', text:'#92400e', border:'rgba(245,158,11,0.28)', gradA:'#d97706', gradB:'#dc2626' },
};

const DIFF_STYLE: Record<string, { dot: string; label: string }> = {
  Mudah:  { dot:'bg-emerald-400', label:'text-emerald-700 bg-emerald-50 border-emerald-200/60' },
  Sedang: { dot:'bg-amber-400',   label:'text-amber-700 bg-amber-50 border-amber-200/60' },
  Sulit:  { dot:'bg-rose-400',    label:'text-rose-700 bg-rose-50 border-rose-200/60' },
};

export default function ProjectsView() {
  const [projects]   = useState<Project[]>(() => mockDb.getProjects());
  const [curriculum] = useState<CurriculumSubject[]>(() => mockDb.getCurriculum());
  const [searchVal, setSearchVal] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  /* ── Enrich projects with curriculum data + display category ── */
  const synced = projects.map(p => {
    const sub = curriculum.find(s => s.id === p.curriculumId);
    // curriculumId is the authoritative source for which group this project belongs to
    const displayCat = resolveDisplayCat(p.curriculumId ?? '', p.category);
    if (!sub) return { ...p, subMateri: [] as any[], outputsList: [] as string[], icon: 'folder', semester: '', displayCat };
    return {
      ...p,
      name:        sub.title,
      description: sub.desc,
      duration:    sub.duration,
      difficulty:  (sub.level === 'Pemula' ? 'Mudah' : sub.level === 'Menengah' ? 'Sedang' : 'Sulit') as Project['difficulty'],
      author:      sub.pic,
      subMateri:   sub.subMateri,
      outputsList: sub.outputs,
      icon:        sub.icon,
      semester:    sub.semester,
      displayCat,
    };
  });

  /* ── Filter ── */
  const filtered = synced.filter(p => {
    const ms = !searchVal ||
      p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      p.description.toLowerCase().includes(searchVal.toLowerCase()) ||
      (p.hardware || []).some(h => h.toLowerCase().includes(searchVal.toLowerCase()));
    const mc = activeTab === 'All' || p.displayCat === activeTab;
    return ms && mc;
  });

  /* ── Group for track cards ── */
  const GROUP_ORDER = ['Tinybit', 'IoT Smart', 'Robot'];
  const groups = GROUP_ORDER.map(cat => ({
    cat,
    items: filtered.filter(p => p.displayCat === cat),
  })).filter(g => g.items.length > 0);

  /* ── Active project ── */
  const activeProject = synced.find(p => p.id === activeId) || synced[0] || null;

  const handleSelect = (id: string) => {
    setActiveId(id);
    setShowSidebar(true);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">

      {/* ── Hero Header ── */}
      <div
        className="rounded-3xl border relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.70)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 8px 32px -8px rgba(37,99,235,0.10), inset 0 1px 0 rgba(255,255,255,0.8)',
          padding: '28px 28px 24px',
        }}
      >
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)' }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
          <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', boxShadow: '0 8px 24px -6px rgba(37,99,235,0.40), inset 0 1px 0 rgba(255,255,255,0.25)' }}>
            <FolderGit className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))', color: '#4f46e5', border: '1px solid rgba(99,102,241,0.25)' }}>
                IoT Robotik Blueprint
              </span>
            </div>
            <h2 className="font-heading font-black leading-none tracking-tight" style={{ fontSize: '28px' }}>
              <span className="text-slate-800">Project </span>
              <span style={{ backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Library</span>
            </h2>
            <div className="mt-1.5 mb-2.5 h-[3px] w-24 rounded-full" style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed, #db2777)' }} />
            <p className="text-[12.5px] text-slate-500 leading-relaxed max-w-[520px]">
              Blueprint proyek robotik & IoT yang disinkronkan dengan <strong className="text-slate-700">kurikulum</strong>. Klik proyek untuk melihat detail, TP, dan CP.
            </p>
          </div>
          <div className="flex md:flex-col gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-blue-700" style={{ background: 'rgba(219,234,254,0.7)', border: '1px solid rgba(147,197,253,0.6)' }}>
              <Zap size={11} /><span>{synced.length} Proyek</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-violet-700" style={{ background: 'rgba(237,233,254,0.7)', border: '1px solid rgba(196,181,253,0.6)' }}>
              <Layers size={11} /><span>3 Kategori</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Elegant Tab Filters + Search ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

        {/* Search */}
        <div className="relative w-full sm:w-[260px] shrink-0">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, hardware..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[12.5px] bg-white border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-sm"
          />
        </div>

        {/* Elegant gradient pill tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            const IC = tab.Icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '999px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                  border: isActive ? 'none' : '1.5px solid rgba(226,232,240,0.9)',
                  background: isActive
                    ? `linear-gradient(135deg, ${tab.activeBg}, ${tab.activeBg}dd)`
                    : 'rgba(255,255,255,0.85)',
                  color: isActive ? tab.activeTxt : '#64748b',
                  boxShadow: isActive
                    ? `0 4px 14px -4px ${tab.activeBg}88, 0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.2)`
                    : '0 1px 4px rgba(0,0,0,0.05)',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                }}
              >
                <IC size={13} />
                {tab.label}
                {/* active count badge */}
                {isActive && (
                  <span style={{
                    fontSize: '9px', fontWeight: 900,
                    background: 'rgba(255,255,255,0.25)',
                    padding: '1px 6px', borderRadius: '999px',
                    letterSpacing: '0.03em',
                  }}>
                    {tab.id === 'All' ? synced.length : synced.filter(p => p.displayCat === tab.id).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main two-column body ── */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'start', flexWrap: 'wrap' }}>

        {/* ══ Left: Track cards ══ */}
        <div style={{ flex: '1', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-slate-50/50 border border-dashed border-slate-200 rounded-[28px]">
              <FolderGit className="mx-auto mb-3 opacity-25 text-slate-400" size={52} />
              <p className="text-[13px] font-bold text-slate-500">Tidak ada proyek yang cocok.</p>
              <p className="text-[11.5px] text-slate-400 mt-1">Coba ubah filter pencarian atau kategori.</p>
            </div>
          )}

          {groups.map(({ cat, items }) => {
            const acc = CAT_ACCENT[cat] || CAT_ACCENT['Robot'];
            const hasActive = items.some(p => p.id === activeId);
            const CatIcon = cat === 'Tinybit' ? Bluetooth : cat === 'IoT Smart' ? Wifi : Bot;
            return (
              <div
                key={cat}
                className="lp-timeline-track-card rounded-3xl border transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(20px)',
                  border: hasActive ? `1.5px solid ${acc.border}` : '1px solid rgba(255,255,255,0.8)',
                  boxShadow: hasActive
                    ? `0 8px 32px -8px ${acc.border}, inset 0 1px 0 rgba(255,255,255,0.8)`
                    : '0 2px 12px -4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  {/* Category gradient block */}
                  <div
                    className="flex flex-col items-center justify-center text-white rounded-2xl shrink-0 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${acc.gradA}, ${acc.gradB})`,
                      width: '80px',
                      minHeight: '100px',
                      boxShadow: `0 6px 20px -6px ${acc.gradA}88, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    }}
                  >
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 65%)' }} />
                    <CatIcon size={20} className="relative z-10 mb-1" />
                    <span className="relative z-10 text-center px-1" style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.06em', opacity: 0.9, textTransform: 'uppercase', lineHeight: 1.3 }}>
                      {cat}
                    </span>
                  </div>

                  {/* Project buttons */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, color: acc.text, background: acc.bg, border: `1px solid ${acc.border}`, padding: '2px 8px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {cat}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>{items.length} proyek</span>
                    </div>

                    <div className="overflow-x-auto scrollbar-none" style={{ paddingBottom: '4px' }}>
                      <div style={{ display: 'flex', gap: '10px', minWidth: 'max-content', padding: '4px 4px 8px' }}>
                        {items.map(proj => {
                          const isActive = proj.id === activeId;
                          const IC = iconMap[proj.icon] || FolderGit;
                          const diff = DIFF_STYLE[proj.difficulty] || DIFF_STYLE.Mudah;
                          return (
                            <button
                              key={proj.id}
                              onClick={() => handleSelect(proj.id)}
                              style={{
                                width: '96px',
                                minHeight: '82px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px',
                                padding: '10px 6px',
                                borderRadius: '16px',
                                border: isActive ? `1.5px solid ${acc.gradA}88` : '1px solid rgba(226,232,240,0.9)',
                                background: isActive
                                  ? `linear-gradient(135deg, ${acc.gradA}, ${acc.gradB})`
                                  : 'rgba(255,255,255,0.85)',
                                backdropFilter: 'blur(12px)',
                                boxShadow: isActive
                                  ? `0 8px 20px -6px ${acc.gradA}66, inset 0 1px 0 rgba(255,255,255,0.25)`
                                  : '0 2px 8px -3px rgba(0,0,0,0.08)',
                                transform: isActive ? 'translateY(-6px) scale(1.04)' : 'none',
                                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                                cursor: 'pointer',
                                flexShrink: 0,
                              }}
                            >
                              <div style={{ padding: '5px', borderRadius: '10px', background: isActive ? 'rgba(255,255,255,0.18)' : acc.bg, transition: 'all 0.3s' }}>
                                <IC size={15} style={{ color: isActive ? 'white' : acc.gradA }} />
                              </div>
                              <span style={{ fontSize: '9.5px', fontWeight: 800, textAlign: 'center', lineHeight: 1.25, color: isActive ? 'white' : '#334155', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', width: '100%', padding: '0 2px' }}>
                                {proj.name}
                              </span>
                              <span className={`inline-block w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white/60' : diff.dot}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                      <Play size={9} style={{ color: acc.gradA }} />
                      <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Klik proyek untuk melihat detail materi</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══ Right: Sticky detail sidebar ══ */}
        <div
          className={`curriculum-sidebar${showSidebar ? ' sidebar-open' : ''}`}
          style={{ width: '300px', minWidth: '280px', flexShrink: 0, position: 'sticky', top: '96px', alignSelf: 'flex-start' }}
        >
          <button
            onClick={() => setShowSidebar(false)}
            className="curriculum-sidebar-close"
            style={{ display: 'none', width: '100%', marginBottom: '8px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(226,232,240,0.8)', borderRadius: '12px', padding: '8px', fontSize: '12px', fontWeight: 600, color: '#64748b', cursor: 'pointer', backdropFilter: 'blur(8px)' }}
          >
            ✕ Tutup Detail
          </button>

          {activeProject ? (
            <div className="glass-card p-6 rounded-3xl flex flex-col gap-5 border border-slate-200/50 shadow-md" style={{ background: 'rgba(255,255,255,0.97)' }}>

              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(219,234,254,0.8)', color: '#1d4ed8', border: '1px solid rgba(147,197,253,0.6)', padding: '2px 8px', borderRadius: '6px', letterSpacing: '0.06em', display: 'inline-block' }}>
                    {activeProject.semester || activeProject.displayCat || activeProject.category}
                  </span>
                  <h3 className="font-heading text-lg font-black text-slate-800 mt-1.5">{activeProject.name}</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  {(() => { const IC = iconMap[activeProject.icon] || FolderGit; return <IC size={22} />; })()}
                </div>
              </div>

              {/* Description */}
              <p className="text-[12px] text-slate-600 leading-relaxed">{activeProject.description}</p>

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-3 text-[11px] bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <span className="text-slate-400 block font-medium">Durasi</span>
                  <span className="text-slate-700 font-bold flex items-center gap-1"><Clock size={11} className="text-blue-500" /> {activeProject.duration}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block font-medium">Level</span>
                  <span className={`font-bold text-[10px] px-2 py-0.5 rounded border ${(DIFF_STYLE[activeProject.difficulty] || DIFF_STYLE.Mudah).label}`}>{activeProject.difficulty}</span>
                </div>
                <div className="space-y-1 mt-1">
                  <span className="text-slate-400 block font-medium">Kategori</span>
                  <span className="text-slate-700 font-bold block truncate">{activeProject.displayCat || activeProject.category}</span>
                </div>
                <div className="space-y-1 mt-1">
                  <span className="text-slate-400 block font-medium">PIC / Guru</span>
                  <span className="text-slate-700 font-bold block truncate">{activeProject.author}</span>
                </div>
              </div>

              {/* TP */}
              <div className="space-y-2">
                <h4 className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Award size={13} className="text-blue-500" /> Tujuan Pembelajaran (TP)
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/60">
                  {activeProject.objectives || activeProject.description}
                </p>
              </div>

              {/* CP */}
              <div className="space-y-2">
                <h4 className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={13} className="text-indigo-500" /> Capaian Pembelajaran (CP)
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100/60">
                  {activeProject.competencies || (activeProject.subMateri?.map((s: any) => s.name).join(', ')) || '-'}
                </p>
              </div>

              {/* Sub Materi */}
              {activeProject.subMateri && activeProject.subMateri.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen size={13} className="text-emerald-500" /> Sub Materi ({activeProject.subMateri.length})
                  </h4>
                  <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1 scrollbar-thin">
                    {activeProject.subMateri.map((sm: any, i: number) => (
                      <div key={i} className="flex items-start justify-between gap-2 p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                        <div className="flex items-start gap-2" style={{ minWidth: 0, flex: 1 }}>
                          <div className="text-slate-300 shrink-0 mt-0.5"><Square size={13} /></div>
                          <span className="text-[11px] leading-snug text-slate-500" style={{ wordBreak: 'break-word' }}>{sm.name}</span>
                        </div>
                        {sm.link && (
                          <a href={sm.link.startsWith('http') ? sm.link : '#'} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg shrink-0 hover:bg-blue-100 transition-colors">
                            Modul
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outputs */}
              {activeProject.outputsList && activeProject.outputsList.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare size={13} className="text-rose-500" /> Output Yang Dihasilkan
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.outputsList.map((out: string, i: number) => (
                      <span key={i} className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-lg">{out}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={activeProject.driveLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12.5px] py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ExternalLink size={13} /> Lihat Dokumen Drive
                </a>
                {activeProject.githubLink && (
                  <a
                    href={activeProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-[12.5px] py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Terminal size={13} /> Lihat Source Code Github
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-card p-6 rounded-3xl flex flex-col items-center justify-center gap-3 text-center border border-slate-200/50" style={{ minHeight: '220px', background: 'rgba(255,255,255,0.97)' }}>
              <FolderGit className="opacity-20 text-slate-400" size={48} />
              <p className="text-[13px] font-bold text-slate-500">Pilih proyek di sebelah kiri</p>
              <p className="text-[11px] text-slate-400">Detail materi akan muncul di sini</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
