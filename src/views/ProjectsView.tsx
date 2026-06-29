import { useState } from 'react';
import { 
  FolderGit, 
  Search, 
  Cpu, 
  Terminal, 
  Clock, 
  ExternalLink,
  User,
  Calendar,
  ChevronRight,
  X
} from 'lucide-react';
import { mockDb } from '../services/db';
import type { Project } from '../services/db';

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>(() => mockDb.getProjects());
  const [searchVal, setSearchVal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Sync state if mock DB changes (CRUD/seeder)
  const refreshProjects = () => {
    setProjects(mockDb.getProjects());
  };

  // Categories list
  const categories = ['All', 'Tinybit', 'IoT Smart Project', 'Computer Vision Project', 'AI Robotic Project'];
  
  // Filtered projects
  const filtered = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchVal.toLowerCase()) ||
                          p.hardware.some(h => h.toLowerCase().includes(searchVal.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyBadge = (diff: Project['difficulty']) => {
    switch (diff) {
      case 'Mudah': return 'badge-success';
      case 'Sedang': return 'badge-warning';
      case 'Sulit': return 'badge-danger';
      default: return 'badge-primary';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in" onLoad={refreshProjects}>
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-800">
            Project Library
          </h2>
          <p className="text-[12px] text-slate-500 mt-1">
            Galeri blueprint proyek pembelajaran robotik & IoT yang pernah dikembangkan oleh guru IDN.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama project / hardware..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="glass-input w-full pl-10 text-[12.5px] py-2"
          />
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5 bg-slate-200/40 p-1 rounded-2xl border border-slate-200/20">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex gap-1.5 bg-slate-200/40 p-1 rounded-2xl border border-slate-200/20">
          {['All', 'Mudah', 'Sedang', 'Sulit'].map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all ${
                selectedDifficulty === diff
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div 
            key={project.id}
            onClick={() => setActiveProject(project)}
            className="glass-card flex flex-col justify-between cursor-pointer p-6 hover:border-blue-300 relative group overflow-hidden"
          >
            {/* Hover card glow effect */}
            <div className="absolute right-0 top-0 h-16 w-16 bg-blue-500/5 blur-xl rounded-full group-hover:bg-blue-500/10 transition-colors" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="badge badge-primary text-[10px] font-bold">{project.category}</span>
                <span className={`badge ${getDifficultyBadge(project.difficulty)} text-[10px] font-bold`}>
                  {project.difficulty}
                </span>
              </div>

              <h3 className="font-heading text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {project.name}
              </h3>
              
              <p className="text-[12px] text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Selengkapnya</span>
                <ChevronRight size={12} />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400">
            <FolderGit className="mx-auto mb-3 opacity-30" size={48} />
            <p className="text-[13px] font-medium">Tidak ada project yang cocok dengan filter / pencarian.</p>
          </div>
        )}
      </div>

      {/* Glassmorphic Project Detail Overlay Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-[700px] p-8 border border-white/50 bg-white/80 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => setActiveProject(null)}
              className="absolute right-6 top-6 rounded-full p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Badges and Title */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-primary text-[10px] font-bold">{activeProject.category}</span>
                <span className={`badge ${getDifficultyBadge(activeProject.difficulty)} text-[10px] font-bold`}>
                  {activeProject.difficulty}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold ml-auto mr-12">
                  <Clock size={13} />
                  <span>{activeProject.duration}</span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-800">
                {activeProject.name}
              </h3>
              <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-b border-slate-100 py-6 my-6">
              
              {/* Objectives & Competency */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Tujuan Pembelajaran</h4>
                  <p className="text-[12px] text-slate-700 leading-relaxed">{activeProject.objectives}</p>
                </div>
                <div>
                  <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Kompetensi yang Dilatih</h4>
                  <p className="text-[12px] text-slate-700 leading-relaxed">{activeProject.competencies}</p>
                </div>
              </div>

              {/* Hardware & Software list */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Cpu size={14} className="text-blue-500" />
                    Hardware Yang Digunakan
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.hardware.map((hw, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 rounded-xl px-3 py-1 text-[11px] font-bold border border-slate-200/50">
                        {hw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Terminal size={14} className="text-violet-500" />
                    Software Pendukung
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.software.map((sw, i) => (
                      <span key={i} className="bg-violet-50/70 text-violet-700 rounded-xl px-3 py-1 text-[11px] font-bold border border-violet-100/50">
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Author details */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <User size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Guru Penyusun</span>
                  <span className="text-[12px] font-bold text-slate-700">{activeProject.author}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Tahun Rilis</span>
                  <span className="text-[12px] font-bold text-slate-700">{activeProject.year}</span>
                </div>
              </div>
            </div>

            {/* CTA Links */}
            <div className="mt-8 flex gap-3">
              {activeProject.githubLink && (
                <a
                  href={activeProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button bg-slate-800 hover:bg-slate-900 border-none shadow-slate-900/10 flex-1 justify-center py-3"
                >
                  <Terminal size={16} />
                  <span>Lihat Repository Github</span>
                </a>
              )}
              
              <a
                href={activeProject.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button flex-1 justify-center py-3"
              >
                <ExternalLink size={16} />
                <span>Dokumen Google Drive (RPPM)</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
