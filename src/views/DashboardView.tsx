import { 
  BookOpen, Code2, FolderGit, Users, Wrench,
  ArrowRight, Clock, Sparkles, TrendingUp
} from 'lucide-react';
import { mockDb } from '../services/db';

interface DashboardViewProps {
  setTab: (tab: string) => void;
  searchQuery: string;
}

const S = {
  card: {
    background: 'white',
    borderRadius: '24px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    padding: '24px',
  } as React.CSSProperties,
};

const statItems = [
  { name: 'Materi', value: '248', growth: '+12 minggu ini', Icon: BookOpen, tab: 'materi', bg: '#EEF5FF', iconBg: 'linear-gradient(135deg,#2563EB,#3B82F6)', color: '#2563EB' },
  { name: 'Source Code', value: '186', growth: '+8 minggu ini', Icon: Code2, tab: 'source-code', bg: '#F5F3FF', iconBg: 'linear-gradient(135deg,#7C3AED,#A78BFA)', color: '#7C3AED' },
  { name: 'Project', value: '92', growth: '+6 minggu ini', Icon: FolderGit, tab: 'projects', bg: '#ECFDF5', iconBg: 'linear-gradient(135deg,#059669,#34D399)', color: '#059669' },
  { name: 'Guru', value: '28', growth: '+2 minggu ini', Icon: Users, tab: 'people', bg: '#FFFBEB', iconBg: 'linear-gradient(135deg,#D97706,#FCD34D)', color: '#D97706' },
  { name: 'Teknisi', value: '8', growth: '+1 minggu ini', Icon: Wrench, tab: 'people', bg: '#FDF2F8', iconBg: 'linear-gradient(135deg,#DB2777,#F472B6)', color: '#DB2777' },
  { name: 'Inventaris LAB', value: '156', growth: '+5 minggu ini', Icon: Wrench, tab: 'inventory', bg: '#ECFEFF', iconBg: 'linear-gradient(135deg,#0891B2,#67E8F9)', color: '#0891B2' },
];

const latestMateri = [
  { title: 'Python Function', category: 'Pemrograman • Kelas 7' },
  { title: 'Micro:bit - Display', category: 'Micro:bit • Kelas 7' },
  { title: 'IoT - MQTT Protocol', category: 'IoT • Kelas 8' },
];

const latestProjects = [
  { title: 'Smart Trash Bin', category: 'IoT • Intermediate', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=120&auto=format&fit=crop&q=60' },
  { title: 'Line Follower Robot', category: 'Robotik • Beginner', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&auto=format&fit=crop&q=60' },
  { title: 'Smart Greenhouse', category: 'IoT • Advanced', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=120&auto=format&fit=crop&q=60' },
];

const activityLogs = [
  { user: 'Budi Santoso', action: 'mengunggah materi baru Python Function', time: '2 jam yang lalu', initials: 'BS', color: '#2563EB' },
  { user: 'Siti Aisyah', action: 'menambahkan project baru Smart Parking System', time: '5 jam yang lalu', initials: 'SA', color: '#059669' },
  { user: 'Ahmad Fauzi', action: 'mengupdate draft kurikulum Kelas 8 Semester 2', time: '1 hari yang lalu', initials: 'AF', color: '#D97706' },
  { user: 'Rina Marlina', action: 'menambahkan inventaris baru ESP32 DevKit', time: '2 hari yang lalu', initials: 'RM', color: '#DB2777' },
];

export default function DashboardView({ setTab, searchQuery }: DashboardViewProps) {
  const lessons = mockDb.getLessons();
  const projects = mockDb.getProjects();

  const filteredLessons = lessons.filter(l =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="admin-main">

      {/* Search Result Overlay */}
      {searchQuery && (
        <div style={{ ...S.card, background: '#EEF5FF', border: '1px solid #DBEAFE' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>
            Hasil Pencarian: "{searchQuery}"
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Materi ({filteredLessons.length})</div>
              {filteredLessons.slice(0, 5).map(l => (
                <div key={l.id} onClick={() => setTab('materi')}
                  style={{ fontSize: '12px', color: '#2563EB', cursor: 'pointer', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
                  • [{l.topic}] {l.title}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Project ({filteredProjects.length})</div>
              {filteredProjects.slice(0, 5).map(p => (
                <div key={p.id} onClick={() => setTab('projects')}
                  style={{ fontSize: '12px', color: '#2563EB', cursor: 'pointer', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
                  • [{p.category}] {p.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ ROW 1: WELCOME BANNER + PROGRESS KURIKULUM ═══ */}
      <div className="dash-top">

        {/* Welcome Banner */}
        <div style={{
          background: 'linear-gradient(135deg,#1d4ed8 0%,#2563eb 50%,#3b82f6 100%)',
          borderRadius: '28px',
          padding: '36px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '24px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(37,99,235,0.35)',
        }}>
          {/* Glow orbs */}
          <div style={{ position:'absolute', top:'-60px', right:'240px', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,0.08)', filter:'blur(40px)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:'-40px', left:'40%', width:'160px', height:'160px', borderRadius:'50%', background:'rgba(96,165,250,0.2)', filter:'blur(40px)', pointerEvents:'none' }} />

          {/* Text */}
          <div style={{ zIndex: 1 }}>
            <div style={{
              display: 'inline-block', background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px',
              padding: '4px 14px', marginBottom: '12px',
              fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em',
            }}>
              Selamat Datang Kembali,
            </div>
            <h2 style={{ fontSize: '34px', fontWeight: 900, color: 'white', margin: '0 0 10px', lineHeight: 1.1 }}>
              Fadhlan S.
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '0 0 24px', lineHeight: 1.6, maxWidth: '340px' }}>
              Kelola pengetahuan Robotik & IoT terpusat, terstruktur, dan mudah diakses.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setTab('lms')}
                style={{
                  background: 'white', color: '#2563EB', border: 'none', cursor: 'pointer',
                  borderRadius: '14px', padding: '12px 24px',
                  fontSize: '13px', fontWeight: 800,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
              >
                Lihat LMS
              </button>
              <button
                onClick={() => setTab('chatbot')}
                style={{
                  background: 'rgba(0,0,0,0.2)', color: 'white',
                  border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer',
                  borderRadius: '14px', padding: '12px 24px',
                  fontSize: '13px', fontWeight: 800,
                }}
              >
                Akses Chat AI
              </button>
            </div>
          </div>

          {/* Robot image — bottom-aligned */}
          <div style={{ width: '180px', flexShrink: 0, alignSelf: 'flex-end', zIndex: 1, marginBottom: '-36px' }}>
            <img
              src="/robot_character.png"
              alt="Robot"
              style={{
                width: '100%', objectFit: 'contain',
                filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.25))',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        </div>

        {/* Progress Kurikulum Card */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8' }}>Progress Kurikulum</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginTop: '4px' }}>Semester Genap 2024/2025</div>
          </div>

          {/* Circular Progress SVG */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', margin: '20px 0' }}>
            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="50" stroke="#EEF5FF" strokeWidth="10" fill="transparent" />
              <circle
                cx="60" cy="60" r="50"
                stroke="url(#blueGrad)" strokeWidth="10" fill="transparent"
                strokeDasharray="314.16"
                strokeDashoffset={314.16 - (314.16 * 68) / 100}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', textAlign: 'center',
              fontSize: '24px', fontWeight: 900, color: '#1e293b',
            }}>68%</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', marginBottom: '12px' }}>34 / 50 Topik Selesai</div>
            <button
              onClick={() => setTab('kurikulum')}
              style={{
                width: '100%', background: '#EEF5FF', border: '1px solid #DBEAFE',
                borderRadius: '12px', padding: '10px', cursor: 'pointer',
                fontSize: '12px', fontWeight: 700, color: '#2563EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
              }}
            >
              Lihat Detail <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══ ROW 2: STATS 6 COLUMN ═══ */}
      <div className="dash-stats">
        {statItems.map(({ name, value, growth, Icon, tab, iconBg }) => (
          <div
            key={name}
            onClick={() => setTab(tab)}
            style={{
              ...S.card, padding: '20px', cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(37,99,235,0.12)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
            }}
          >
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '16px',
            }}>
              <Icon size={20} color="white" />
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{name}</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#1e293b', lineHeight: 1.2, margin: '4px 0' }}>{value}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#22c55e', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <TrendingUp size={10} /> {growth}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ ROW 3: MATERI, PROJECT, ACTIVITY ═══ */}
      <div className="dash-bottom">

        {/* Materi Terbaru */}
        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>
              <BookOpen size={16} color="#2563EB" /> Materi Terbaru
            </div>
            <button onClick={() => setTab('materi')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: '#2563EB' }}>Lihat Semua</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {latestMateri.map((item, i) => (
              <div key={i} onClick={() => setTab('materi')} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px', borderRadius: '14px', cursor: 'pointer',
                background: '#f8fafc', border: '1px solid #f1f5f9', transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#EEF5FF'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EEF5FF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={16} color="#2563EB" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                  <div style={{ fontSize: '10.5px', color: '#94a3b8', marginTop: '2px' }}>{item.category}</div>
                </div>
                <span style={{ background: '#EEF5FF', color: '#2563EB', fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '100px', flexShrink: 0 }}>Baru</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Terbaru */}
        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>
              <FolderGit size={16} color="#059669" /> Project Terbaru
            </div>
            <button onClick={() => setTab('projects')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: '#059669' }}>Lihat Semua</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {latestProjects.map((item, i) => (
              <div key={i} onClick={() => setTab('projects')} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px', borderRadius: '14px', cursor: 'pointer',
                background: '#f8fafc', border: '1px solid #f1f5f9', transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#ECFDF5'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'}
              >
                <img src={item.img} alt={item.title} style={{ width: '36px', height: '36px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                  <div style={{ fontSize: '10.5px', color: '#94a3b8', marginTop: '2px' }}>{item.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div style={{ ...S.card, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>
              <Clock size={16} color="#64748b" /> Aktivitas Terbaru
            </div>
            <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '100px' }}>LOGS</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
            {activityLogs.map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: log.color + '1A', border: `1px solid ${log.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: 800, color: log.color,
                }}>{log.initials}</div>
                <div>
                  <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700 }}>{log.user}</span> {log.action}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{log.time}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setTab('admin')}
            style={{
              marginTop: '16px', width: '100%', background: '#f8fafc',
              border: '1px solid #f1f5f9', borderRadius: '12px', padding: '10px',
              fontSize: '12px', fontWeight: 700, color: '#2563EB', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            }}
          >
            Lihat Semua <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Floating AI button */}
      <div
        onClick={() => setTab('chatbot')}
        className="mobile-fab"
        style={{
          position: 'fixed', bottom: '96px', right: '24px', zIndex: 90,
          width: '56px', height: '56px', borderRadius: '18px',
          background: 'linear-gradient(135deg,#1B5DD4,#7C4DFF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 6px 24px rgba(27,93,212,0.4)',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <Sparkles size={24} color="white" />
      </div>

      {/* ═══ MOBILE BOTTOM NAVIGATION (Admin) ═══ */}
      <nav className="mobile-bottom-nav">
        {[
          { id: 'dashboard', label: 'Beranda', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
          { id: 'materi',    label: 'Materi',  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
          { id: 'projects',  label: 'Project', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
          { id: 'lms',       label: 'LMS',     icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
        ].map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px 14px', borderRadius: '16px', minWidth: '56px',
                color: '#6E7280',
              }}
            >
              {item.icon}
              <span style={{ fontSize: '10px', fontWeight: 500 }}>{item.label}</span>
            </button>
          ))}
      </nav>
    </div>
  );
}
