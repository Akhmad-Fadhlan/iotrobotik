import { useState } from 'react';
import { 
  Users, 
  Wrench, 
  Mail, 
  Phone, 
  MapPin, 
  PenTool 
} from 'lucide-react';
import { mockDb } from '../services/db';
import type { Teacher, Technician } from '../services/db';

export default function PeopleView() {
  const [activeTab, setActiveTab] = useState<'teachers' | 'technicians'>('teachers');
  const [teachers, setTeachers] = useState<Teacher[]>(() => mockDb.getTeachers());
  const [technicians, setTechnicians] = useState<Technician[]>(() => mockDb.getTechnicians());

  const refreshPeople = () => {
    setTeachers(mockDb.getTeachers());
    setTechnicians(mockDb.getTechnicians());
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in" onLoad={refreshPeople}>
      
      {/* Header and Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-800">
            Sumber Daya Manusia (SDM)
          </h2>
          <p className="text-[12px] text-slate-500 mt-1">
            Informasi kontak dan penugasan guru robotik serta teknisi lab di berbagai cabang IDN.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-200/50 p-1 rounded-2xl border border-slate-200/30 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('teachers')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-[12px] font-semibold transition-all ${
              activeTab === 'teachers'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users size={14} />
            Guru Robotik
          </button>
          <button
            onClick={() => setActiveTab('technicians')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-[12px] font-semibold transition-all ${
              activeTab === 'technicians'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench size={14} />
            Teknisi Lab
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      {activeTab === 'teachers' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div 
              key={teacher.id} 
              className="glass-card p-6 rounded-3xl flex flex-col justify-between border hover:border-blue-300 relative group overflow-hidden"
            >
              <div className="absolute right-0 top-0 h-16 w-16 bg-blue-500/5 blur-xl rounded-full" />
              
              <div>
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-5">
                  <img 
                    src={teacher.photo} 
                    alt={teacher.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md shadow-blue-500/10" 
                  />
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-slate-800 leading-tight">
                      {teacher.name}
                    </h3>
                    <span className="badge badge-primary text-[9px] font-extrabold uppercase mt-1">
                      Kelas {teacher.classLevel}
                    </span>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-2 text-[12px] text-slate-500 border-t border-slate-100 pt-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-slate-400" />
                    <span className="font-medium">Cabang: <span className="font-semibold text-slate-700">{teacher.branch}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-slate-400" />
                    <span>{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-slate-400" />
                    <span>{teacher.phone}</span>
                  </div>
                </div>
              </div>

              {/* Tanda Tangan Wrapper */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                <span className="text-[10px] text-slate-400 font-semibold block mb-1">Tanda Tangan Digital</span>
                {teacher.signature ? (
                  <div className="bg-white/50 border border-slate-200/50 rounded-xl p-2 h-14 flex items-center justify-center">
                    <img src={teacher.signature} alt="TTD" className="h-full object-contain max-w-full" />
                  </div>
                ) : (
                  <div className="bg-slate-100/50 border border-dashed border-slate-200 rounded-xl p-2 h-14 flex items-center justify-center text-[10px] text-slate-400 font-semibold gap-1">
                    <PenTool size={11} />
                    <span>Belum Diupload</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicians.map((tech) => (
            <div 
              key={tech.id} 
              className="glass-card p-6 rounded-3xl flex flex-col justify-between border hover:border-blue-300 relative group overflow-hidden"
            >
              <div className="absolute right-0 top-0 h-16 w-16 bg-blue-500/5 blur-xl rounded-full" />
              
              <div>
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-5">
                  <img 
                    src={tech.photo} 
                    alt={tech.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md shadow-blue-500/10" 
                  />
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-slate-800 leading-tight">
                      {tech.name}
                    </h3>
                    <span className="badge badge-secondary text-[9px] font-extrabold uppercase mt-1">
                      Lab Support
                    </span>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-2 text-[12px] text-slate-500 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-slate-400" />
                    <span className="font-medium">Cabang: <span className="font-semibold text-slate-700">{tech.branch}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-slate-400" />
                    <span>{tech.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-slate-400" />
                    <span>{tech.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
