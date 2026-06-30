import { 
  LayoutDashboard, BookOpen, GraduationCap, Code2,
  FolderGit, FileText, Users, Wrench,
  ClipboardList, Boxes, Info, X, LogOut, UserRound
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  isAdmin: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', Icon: LayoutDashboard },
  { id: 'materi', name: 'Materi', Icon: BookOpen },
  { id: 'lms', name: 'LMS', Icon: GraduationCap },
  { id: 'source-code', name: 'Repository Source Code', Icon: Code2 },
  { id: 'projects', name: 'Project Library', Icon: FolderGit },
  { id: 'kurikulum', name: 'Draft Kurikulum', Icon: FileText },
  { id: 'people', name: 'Guru', Icon: Users },
  { id: 'people-tech', name: 'Teknisi', Icon: Wrench },
  { id: 'students', name: 'Data Siswa', Icon: UserRound },
  { id: 'sop', name: 'SOP Penggunaan Robot', Icon: ClipboardList },
  { id: 'inventory', name: 'Inventaris LAB', Icon: Boxes },
  { id: 'tentang', name: 'Tentang', Icon: Info },
];

export default function Sidebar({ currentTab, setTab, isOpen, setIsOpen, onLogout }: SidebarProps) {

  const handleNav = (id: string) => {
    if (id === 'people-tech') {
      setTab('people');
    } else {
      setTab(id);
    }
    setIsOpen(false);
  };

  const isActive = (id: string) => {
    if (id === 'people-tech') return false;
    if (id === 'people') return currentTab === 'people';
    return currentTab === id;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position:'fixed', inset:0, zIndex:40,
            background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)',
          }}
        />
      )}

      <aside style={{
        position:'fixed', top:0, left:0, bottom:0, zIndex:50,
        width:'260px',
        background:'linear-gradient(180deg,#0D1B3E 0%,#0B1429 100%)',
        borderRight:'1px solid rgba(255,255,255,0.06)',
        display:'flex', flexDirection:'column',
        padding:'24px 16px',
        transition:'transform 0.3s ease',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
      className="sidebar-panel"
      >
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'32px', padding:'0 8px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{
              width:'40px', height:'40px', borderRadius:'12px',
              background:'white', padding:'6px', flexShrink:0,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <img src="/logo.png" alt="IDN" style={{ width:'100%', objectFit:'contain' }} />
            </div>
            <div>
              <div style={{ fontSize:'13px', fontWeight:800, color:'white', lineHeight:1.2 }}>IDN Robotics</div>
              <div style={{ fontSize:'9px', fontWeight:600, color:'#60A5FA', letterSpacing:'0.06em', textTransform:'uppercase', marginTop:'2px' }}>
                Knowledge Management System
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background:'rgba(255,255,255,0.08)', border:'none', cursor:'pointer',
              borderRadius:'8px', padding:'6px', display:'flex',
            }}
          >
            <X size={16} color="#94a3b8" />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:'4px', overflowY:'auto' }}>
          {menuItems.map(({ id, name, Icon }) => {
            const active = isActive(id);
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                style={{
                  display:'flex', alignItems:'center', gap:'12px',
                  padding:'11px 14px', borderRadius:'14px',
                  background: active ? 'linear-gradient(135deg,#2563EB,#3B82F6)' : 'transparent',
                  border:'none', cursor:'pointer', width:'100%', textAlign:'left',
                  transition:'all 0.2s',
                  boxShadow: active ? '0 4px 16px rgba(37,99,235,0.3)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                <Icon size={17} color={active ? 'white' : '#94a3b8'} />
                <span style={{
                  fontSize:'12.5px', fontWeight: active ? 700 : 500,
                  color: active ? 'white' : '#94a3b8',
                }}>
                  {name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Profile footer */}
        <div style={{
          marginTop:'16px', paddingTop:'16px',
          borderTop:'1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            background:'rgba(255,255,255,0.06)', borderRadius:'14px',
            padding:'12px 14px', border:'1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <div style={{
                width:'34px', height:'34px', borderRadius:'50%',
                background:'linear-gradient(135deg,#2563EB,#60A5FA)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'white', fontSize:'11px', fontWeight:800, flexShrink:0,
              }}>FS</div>
              <div>
                <div style={{ fontSize:'12px', fontWeight:700, color:'white', lineHeight:1.2 }}>Fadhlan S.</div>
                <div style={{ fontSize:'10px', color:'#60A5FA', fontWeight:500 }}>Administrator</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Logout"
              style={{
                background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.2)',
                borderRadius:'8px', padding:'6px', cursor:'pointer',
                display:'flex', alignItems:'center',
              }}
            >
              <LogOut size={14} color="#ef4444" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
