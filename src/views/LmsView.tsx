import { GraduationCap, ExternalLink, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { mockDb } from '../services/db';

export default function LmsView() {
  const config = mockDb.getConfig();

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
            <Sparkles size={10} />
            Learning Portals
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            Learning Management System &amp; E-Learning
          </h2>
          <p className="text-[12.5px] text-indigo-200/80 max-w-xl leading-relaxed">
            Akses portal pembelajaran mandiri siswa, simulator coding interaktif, database nilai, serta pengumpulan tugas terpadu untuk ekosistem robotika.
          </p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Main LMS Box */}
        <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          {/* Decorative Corner Glow */}
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
          
          <div className="space-y-6 relative z-10">
            {/* Logo/Icon Row */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100/50 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={28} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-blue-600 font-extrabold uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  LMS Portal
                </span>
                <h3 className="font-heading text-lg font-bold text-slate-800">
                  Portal E-Learning CodesTechno
                </h3>
              </div>
            </div>

            <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
              Sistem manajemen pembelajaran resmi IDN Boarding School. Di sini Anda dapat memeriksa keaktifan kelas, progres kurikulum mingguan santri, nilai ujian robotika, serta mengunduh rekaman video KBM yang terintegrasi.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2 text-[12.5px] text-slate-600">
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
                <span className="font-semibold">Pengumpulan Tugas Praktikum &amp; Quiz</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
                <span className="font-semibold">Gradebook &amp; Nilai Rapor Robotik Santri</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
                <span className="font-semibold">Absensi Harian &amp; Modul Slide Interaktif</span>
              </div>
            </div>
          </div>

          {/* Button CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="text-[11px] text-slate-400 font-medium">
              URL: <a href={config.lmsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{config.lmsUrl}</a>
            </div>
            <a
              href={config.lmsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              }}
            >
              Masuk ke Portal LMS
              <ExternalLink size={14} className="text-white" />
            </a>
          </div>
        </div>

        {/* eLearning Microbit Box */}
        <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          {/* Decorative Corner Glow */}
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
          
          <div className="space-y-6 relative z-10">
            {/* Logo/Icon Row */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/50 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Cpu size={26} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-emerald-600 font-extrabold uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  Microbit Simulator
                </span>
                <h3 className="font-heading text-lg font-bold text-slate-800">
                  E-Learning Microbit
                </h3>
              </div>
            </div>

            <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
              Portal e-learning khusus untuk pemrograman Micro:bit secara interaktif. Pelajari dasar sensor, aktuator, simulator MakeCode, dan proyek sains terapan secara mandiri.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2 text-[12.5px] text-slate-600">
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
                <span className="font-semibold">Pembelajaran Interaktif MakeCode &amp; Python</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
                <span className="font-semibold">Simulasi Hardware Board secara Real-time</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
                <span className="font-semibold">Materi dan Panduan Proyek Robotika Micro:bit</span>
              </div>
            </div>
          </div>

          {/* Button CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="text-[11px] text-slate-400 font-medium">
              URL: <a href="https://elearning.codestechno.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">https://elearning.codestechno.com/</a>
            </div>
            <a
              href="https://elearning.codestechno.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              }}
            >
              Masuk ke eLearning
              <ExternalLink size={14} className="text-white" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
