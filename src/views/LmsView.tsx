import { GraduationCap, ExternalLink, CheckCircle2, Cpu } from 'lucide-react';
import { mockDb } from '../services/db';

export default function LmsView() {
  const config = mockDb.getConfig();

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Header */}
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-800">
          Learning Management System (LMS) &amp; E-Learning
        </h2>
        <p className="text-[12px] text-slate-500 mt-1">
          Akses portal pembelajaran mandiri siswa, simulator coding, dan pengumpulan tugas terpadu.
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-2xl">
        {/* Main LMS Box */}
        <div className="glass-card p-8 rounded-3xl border border-white/50 bg-white/70 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/5 blur-lg" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="font-heading text-[16px] font-bold text-slate-800">
                  Portal E-Learning CodesTechno
                </h3>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                  LMS.CODESTECHNO.COM
                </span>
              </div>
            </div>
            
            <p className="text-[13px] text-slate-600 leading-relaxed">
              Sistem manajemen pembelajaran resmi IDN Boarding School. Di sini Anda dapat memeriksa keaktifan kelas, progres kurikulum mingguan santri, nilai ujian robotika, serta mengunduh rekaman video KBM yang terintegrasi.
            </p>

            <div className="space-y-2 pt-2 text-[12px] text-slate-500 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Pengumpulan Tugas Praktikum &amp; Quiz</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Gradebook &amp; Nilai Rapor Robotik Santri</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Absensi Harian &amp; Modul Slide Interaktif</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3">
            <a
              href={config.lmsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button w-full justify-center rounded-2xl py-3.5 shadow-md"
            >
              Masuk ke Portal LMS
              <ExternalLink size={15} />
            </a>
            <div className="text-center text-[10px] text-slate-400 font-medium">
              URL: {config.lmsUrl}
            </div>
          </div>
        </div>

        {/* eLearning Microbit Box */}
        <div className="glass-card p-8 rounded-3xl border border-white/50 bg-white/70 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/5 blur-lg" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Cpu size={22} />
              </div>
              <div>
                <h3 className="font-heading text-[16px] font-bold text-slate-800">
                  E-Learning Microbit
                </h3>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                  ELEARNING.CODESTECHNO.COM
                </span>
              </div>
            </div>
            
            <p className="text-[13px] text-slate-600 leading-relaxed">
              Portal e-learning khusus untuk pemrograman Micro:bit secara interaktif. Pelajari dasar sensor, aktuator, simulator MakeCode, dan proyek sains terapan secara mandiri.
            </p>

            <div className="space-y-2 pt-2 text-[12px] text-slate-500 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Pembelajaran Interaktif Berbasis MakeCode &amp; Python</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Simulasi Hardware Board secara Real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Materi dan Panduan Proyek Robotika Micro:bit</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3">
            <a
              href="https://elearning.codestechno.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button w-full justify-center rounded-2xl py-3.5 shadow-md"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                border: 'none',
              }}
            >
              Masuk ke eLearning
              <ExternalLink size={15} className="text-white" />
            </a>
            <div className="text-center text-[10px] text-slate-400 font-medium">
              URL: https://elearning.codestechno.com/
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
