import { useState, useEffect, useMemo } from 'react';
import {
  Users, Search, MapPin, Globe, RefreshCw, ChevronDown,
  AlertCircle, UserCheck, UserX, Filter, X
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface StudentRow {
  nama: string;
  email: string;
  nis: string;
  gender: string;
  birth_date: string;
  phone: string;
  personal_website: string;
  photo_drive_url: string;
  is_active: string;
  cabang: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const SPREADSHEET_ID = '108t5BSVX-v5o8_X2s88VGk4-9osvcwD0k4dI6T6wGMI';
const SHEET_GID = '0';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

const BRANCH_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Pamijahan: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  Solo:       { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  '7A-AKW':   { bg: '#FDF4FF', text: '#7E22CE', border: '#E9D5FF' },
  '7B-AKW':   { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  '7A-Jgl':   { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' },
  '7B-Jgl':   { bg: '#FFF1F2', text: '#BE123C', border: '#FECDD3' },
  '7C-Jgl':   { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' },
  DEFAULT:    { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0' },
};

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#667EEA,#764BA2)',
  'linear-gradient(135deg,#F093FB,#F5576C)',
  'linear-gradient(135deg,#4FACFE,#00F2FE)',
  'linear-gradient(135deg,#43E97B,#38F9D7)',
  'linear-gradient(135deg,#FA709A,#FEE140)',
  'linear-gradient(135deg,#A18CD1,#FBC2EB)',
  'linear-gradient(135deg,#FD746C,#FF9068)',
  'linear-gradient(135deg,#30CFD0,#330867)',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseCSV(raw: string): StudentRow[] {
  const lines = raw.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/\r/g, '').toLowerCase());
  const rows: StudentRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim().replace(/\r/g, ''));
    if (cols.length < 2 || !cols[0]) continue;
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] ?? '';
    });
    rows.push({
      nama: obj['nama'] ?? '',
      email: obj['email'] ?? '',
      nis: obj['nis'] ?? '',
      gender: obj['gender'] ?? '',
      birth_date: obj['birth_date'] ?? '',
      phone: obj['phone'] ?? '',
      personal_website: obj['personal_website'] ?? '',
      photo_drive_url: obj['photo_drive_url'] ?? '',
      is_active: obj['is_active'] ?? '1',
      cabang: obj['cabang'] ?? '',
    });
  }
  return rows;
}

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getGradient(name: string): string {
  const idx = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[idx];
}

function getBranchStyle(branch: string) {
  return BRANCH_COLORS[branch] ?? BRANCH_COLORS.DEFAULT;
}

// ─── Avatar Component ─────────────────────────────────────────────────────────
function AvatarInitials({ name, size = 48 }: { name: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: getGradient(name),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.3, fontWeight: 800, color: 'white',
      border: '2px solid rgba(255,255,255,0.9)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
      letterSpacing: '0.02em',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {getInitials(name)}
    </div>
  );
}

// ─── Student Card ─────────────────────────────────────────────────────────────
function StudentCard({ student }: { student: StudentRow }) {
  const isActive = student.is_active === '1';
  const branchStyle = getBranchStyle(student.cabang);
  const rawWebsite = student.personal_website ?? '';
  const website = rawWebsite
    ? (rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`)
    : '';

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 20,
        border: '1px solid #F1F5F9',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: '0 2px 16px rgba(15,23,42,0.05)',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-3px)';
        el.style.boxShadow = '0 10px 36px rgba(37,99,235,0.13)';
        el.style.borderColor = '#BFDBFE';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 2px 16px rgba(15,23,42,0.05)';
        el.style.borderColor = '#F1F5F9';
      }}
    >
      {/* Decorative glow */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 90, height: 90,
        background: `radial-gradient(circle, ${branchStyle.bg} 0%, transparent 70%)`,
        opacity: 0.6,
      }} />

      {/* Avatar + name row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <AvatarInitials name={student.nama} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13.5, fontWeight: 700, color: '#0F172A',
            lineHeight: 1.3,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {student.nama}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 5 }}>
            {/* Branch badge */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              fontSize: 10, fontWeight: 700, padding: '2px 7px',
              borderRadius: 100,
              background: branchStyle.bg, color: branchStyle.text, border: `1px solid ${branchStyle.border}`,
            }}>
              <MapPin size={8} />
              {student.cabang || '—'}
            </span>
            {/* Status badge */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 100,
              background: isActive ? '#F0FDF4' : '#FFF1F2',
              color: isActive ? '#15803D' : '#BE123C',
              border: `1px solid ${isActive ? '#BBF7D0' : '#FECDD3'}`,
            }}>
              {isActive ? <UserCheck size={8} /> : <UserX size={8} />}
              {isActive ? 'Aktif' : 'Nonaktif'}
            </span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div style={{ height: 1, background: '#F1F5F9' }} />

      {/* Website */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Globe size={13} color="#94A3B8" style={{ flexShrink: 0 }} />
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11.5, color: '#2563EB', textDecoration: 'none',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              fontWeight: 500, flex: 1,
            }}
            title={website}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'; }}
          >
            {rawWebsite.replace(/^https?:\/\//, '')}
          </a>
        ) : (
          <span style={{ fontSize: 11.5, color: '#CBD5E1', fontStyle: 'italic' }}>
            Belum ada website
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────
export default function StudentsView() {
  const [students, setStudents]     = useState<StudentRow[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  // Filters
  const [search, setSearch]               = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [activeFilter, setActiveFilter]   = useState<'all' | 'active' | 'inactive'>('all');
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(CSV_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const parsed = parseCSV(text);
      setStudents(parsed);
      setLastFetched(new Date());
    } catch (e: unknown) {
      setError('Gagal memuat data siswa. Pastikan spreadsheet dapat diakses publik dan koneksi internet stabil.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  // Close branch menu on outside click
  useEffect(() => {
    if (!showBranchMenu) return;
    const handler = () => setShowBranchMenu(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [showBranchMenu]);

  // Unique branches (sorted)
  const branches = useMemo(() => {
    const set = new Set(students.map(s => s.cabang).filter(Boolean));
    return Array.from(set).sort();
  }, [students]);

  // Filtered list
  const filtered = useMemo(() => {
    let list = students;
    if (activeFilter === 'active')   list = list.filter(s => s.is_active === '1');
    if (activeFilter === 'inactive') list = list.filter(s => s.is_active !== '1');
    if (selectedBranch) list = list.filter(s => s.cabang === selectedBranch);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.nama.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.cabang.toLowerCase().includes(q) ||
        s.personal_website.toLowerCase().includes(q)
      );
    }
    return list;
  }, [students, search, selectedBranch, activeFilter]);

  // Stats
  const totalActive   = students.filter(s => s.is_active === '1').length;
  const totalInactive = students.filter(s => s.is_active !== '1').length;
  const branchCount   = new Set(students.map(s => s.cabang).filter(Boolean)).size;

  const hasFilters = search || selectedBranch || activeFilter !== 'all';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* ── Page Header ── */}
      <div>
        <h2 style={{
          fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0,
          fontFamily: "'Poppins','Inter',sans-serif",
        }}>
          Data Siswa
        </h2>
        <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0' }}>
          Daftar siswa robotik IDN dari Google Spreadsheet (real-time).
          {lastFetched && (
            <span style={{ color: '#94A3B8', marginLeft: 6 }}>
              · Diperbarui {lastFetched.toLocaleTimeString('id-ID')}
            </span>
          )}
        </p>
      </div>

      {/* ── Stats ── */}
      {!loading && !error && students.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 12,
        }}>
          {([
            { label: 'Total Siswa', value: students.length, color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
            { label: 'Aktif',       value: totalActive,     color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
            { label: 'Nonaktif',    value: totalInactive,   color: '#DC2626', bg: '#FFF1F2', border: '#FECDD3' },
            { label: 'Cabang',      value: branchCount,     color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
          ] as const).map(stat => (
            <div key={stat.label} style={{
              background: stat.bg,
              borderRadius: 16,
              padding: '14px 18px',
              border: `1px solid ${stat.border}`,
            }}>
              <div style={{
                fontSize: 26, fontWeight: 800, color: stat.color,
                fontFamily: "'Poppins','Inter',sans-serif", lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Filters Row ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>

        {/* Search */}
        <div style={{
          flex: '1 1 200px',
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'white', border: '1px solid #E2E8F0', borderRadius: 14,
          padding: '9px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <Search size={14} color="#94A3B8" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama, email, website…"
            style={{
              border: 'none', outline: 'none', fontSize: 12.5,
              flex: 1, color: '#0F172A', background: 'transparent',
              fontFamily: "'Inter',sans-serif",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
            >
              <X size={13} color="#94A3B8" />
            </button>
          )}
        </div>

        {/* Active filter pills */}
        <div style={{
          display: 'flex', background: '#F1F5F9', borderRadius: 12, padding: 3, gap: 2,
        }}>
          {([
            ['all', 'Semua'],
            ['active', 'Aktif'],
            ['inactive', 'Nonaktif'],
          ] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setActiveFilter(val)}
              style={{
                padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 11.5, fontWeight: 600, transition: 'all 0.15s',
                background: activeFilter === val ? 'white' : 'transparent',
                color: activeFilter === val ? '#2563EB' : '#64748B',
                boxShadow: activeFilter === val ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Branch dropdown */}
        <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => setShowBranchMenu(p => !p)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: selectedBranch ? '#2563EB' : 'white',
              color: selectedBranch ? 'white' : '#475569',
              border: `1px solid ${selectedBranch ? '#2563EB' : '#E2E8F0'}`,
              borderRadius: 12, padding: '8px 12px', cursor: 'pointer',
              fontSize: 12, fontWeight: 600,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <Filter size={13} />
            {selectedBranch || 'Semua Cabang'}
            <ChevronDown size={13} style={{ opacity: 0.7 }} />
          </button>
          {showBranchMenu && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 200,
              background: 'white', borderRadius: 14, border: '1px solid #E2E8F0',
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)', padding: 6, minWidth: 160,
            }}>
              {/* All option */}
              <button
                onClick={() => { setSelectedBranch(''); setShowBranchMenu(false); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', border: 'none', borderRadius: 10, cursor: 'pointer',
                  fontSize: 12, fontWeight: 600,
                  background: selectedBranch === '' ? '#EFF6FF' : 'transparent',
                  color: selectedBranch === '' ? '#2563EB' : '#475569',
                }}
              >
                Semua Cabang
              </button>
              {branches.map(b => (
                <button
                  key={b}
                  onClick={() => { setSelectedBranch(b); setShowBranchMenu(false); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '8px 12px', border: 'none', borderRadius: 10, cursor: 'pointer',
                    fontSize: 12, fontWeight: 600,
                    background: selectedBranch === b ? '#EFF6FF' : 'transparent',
                    color: selectedBranch === b ? '#2563EB' : '#475569',
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh */}
        <button
          onClick={fetchStudents}
          disabled={loading}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'white', border: '1px solid #E2E8F0', borderRadius: 12,
            padding: '8px 12px', cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: 12, fontWeight: 600, color: '#475569',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            opacity: loading ? 0.6 : 1,
          }}
        >
          <RefreshCw size={13} style={{ animation: loading ? 'spin 0.8s linear infinite' : 'none' }} />
          Refresh
        </button>
      </div>

      {/* Result label */}
      {!loading && !error && (
        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: -8 }}>
          Menampilkan{' '}
          <strong style={{ color: '#0F172A' }}>{filtered.length}</strong>
          {' '}dari{' '}
          <strong style={{ color: '#0F172A' }}>{students.length}</strong>{' '}siswa
          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setSelectedBranch(''); setActiveFilter('all'); }}
              style={{
                marginLeft: 8, fontSize: 11, color: '#2563EB',
                background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: 600, textDecoration: 'underline', padding: 0,
              }}
            >
              Reset filter
            </button>
          )}
        </div>
      )}

      {/* ── Loading State ── */}
      {loading && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 16, padding: '80px 20px',
        }}>
          <div style={{
            width: 48, height: 48,
            border: '3px solid #E2E8F0',
            borderTop: '3px solid #2563EB',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>
            Memuat data dari Google Spreadsheet…
          </div>
        </div>
      )}

      {/* ── Error State ── */}
      {error && !loading && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 12, padding: '60px 20px', textAlign: 'center',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%', background: '#FFF1F2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <AlertCircle size={28} color="#DC2626" />
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Gagal Memuat Data</div>
          <div style={{ fontSize: 12, color: '#64748B', maxWidth: 380 }}>{error}</div>
          <button
            onClick={fetchStudents}
            style={{
              marginTop: 4, background: 'linear-gradient(135deg,#2563EB,#3B82F6)',
              color: 'white', border: 'none',
              borderRadius: 12, padding: '10px 22px', cursor: 'pointer',
              fontSize: 12.5, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
            }}
          >
            <RefreshCw size={13} /> Coba Lagi
          </button>
        </div>
      )}

      {/* ── Cards Grid ── */}
      {!loading && !error && (
        filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: 14,
          }}>
            {filtered.map((student, idx) => (
              <StudentCard
                key={`${student.email || student.nama}_${idx}`}
                student={student}
              />
            ))}
          </div>
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 12, padding: '60px 20px', textAlign: 'center',
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%', background: '#F1F5F9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Users size={28} color="#94A3B8" />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
              Tidak Ada Siswa Ditemukan
            </div>
            <div style={{ fontSize: 12, color: '#64748B' }}>
              Coba ubah kata kunci atau filter yang digunakan.
            </div>
          </div>
        )
      )}

      {/* Keyframe for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
