import React, { useState } from 'react';
import { 
  Search, 
  GraduationCap, 
  Boxes, 
  Menu, 
  X, 
  Bell, 
  ChevronDown, 
  ShieldAlert,
  LogOut,
  Cpu
} from 'lucide-react';
import { mockDb } from '../services/db';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onOpenSidebar: () => void;
  onSearch: (query: string) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

export default function Header({ 
  currentTab,
  setTab, 
  isAdmin, 
  onLogin, 
  onLogout, 
  onOpenSidebar,
  onSearch,
  showLoginModal,
  setShowLoginModal
}: HeaderProps) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const config = mockDb.getConfig();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch(e.target.value);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@idn.sch.id' && password === 'admin123') {
      onLogin();
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Email atau password salah!');
    }
  };

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang Kami' },
    { id: 'kurikulum', label: 'Kurikulum' },
    { id: 'projects', label: 'Project' },
    { id: 'source-code', label: 'Repository' },
    { id: 'students', label: 'Siswa' },
    { id: 'inventory', label: 'SOP & Inventaris' },
  ];

  return (
    <>
      {/* ===================== VISITOR HEADER ===================== */}
      {!isAdmin && (
        <header
          className="hidden-mobile"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(24px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
            padding: '0 28px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: '16px',
            zIndex: 40,
            marginBottom: '8px',
          }}
        >
          {/* Logo */}
          <div 
            style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', flexShrink:0 }} 
            onClick={() => setTab('beranda')}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: '#EEF5FF', border: '1px solid #DBEAFE',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', padding: '4px', flexShrink: 0,
            }}>
              <img src="/logo.png" alt="IDN" style={{ width:'100%', height:'100%', objectFit:'contain' }} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', lineHeight: 1.1, whiteSpace: 'nowrap' }}>IDN Robotics</div>
              <div className="header-logo-text" style={{ fontSize: '9px', fontWeight: 700, color: '#3b82f6', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Knowledge Management System</div>
            </div>
          </div>

          {/* Nav links - Desktop */}
          <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }} className="hidden-mobile">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setTab(link.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: currentTab === link.id ? 700 : 600,
                  color: currentTab === link.id ? '#2563EB' : '#475569',
                  padding: '4px 0',
                  borderBottom: currentTab === link.id ? '2px solid #2563EB' : '2px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Masuk button + mobile menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setShowLoginModal(true)}
              style={{
                background: '#2563EB', color: 'white', border: 'none', cursor: 'pointer',
                borderRadius: '12px', padding: '10px 22px',
                fontSize: '13px', fontWeight: 700,
                boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
                transition: 'all 0.2s',
              }}
            >
              Masuk
            </button>
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              style={{
                background: '#f1f5f9', border: 'none', cursor: 'pointer',
                borderRadius: '10px', padding: '8px',
                display: 'none',
              }}
              className="show-mobile"
            >
              <Menu size={20} color="#475569" />
            </button>
          </div>
        </header>
      )}

      {/* ===================== ADMIN HEADER ===================== */}
      {isAdmin && (
        <header style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 4px 24px rgba(37,99,235,0.07)',
          padding: '0 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: '16px',
          zIndex: 40,
          gap: '16px',
        }}>
          {/* Mobile sidebar toggle */}
          <button
            onClick={onOpenSidebar}
            style={{
              background: '#f1f5f9', border: 'none', cursor: 'pointer',
              borderRadius: '10px', padding: '8px', flexShrink: 0,
            }}
            className="show-tablet-hidden-desktop"
          >
            <Menu size={20} color="#475569" />
          </button>

          {/* Search bar */}
          <div style={{ flex: 1, maxWidth: '480px', position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Cari materi, project, guru, source code..."
              value={searchVal}
              onChange={handleSearchChange}
              style={{
                width: '100%', borderRadius: '14px',
                border: '1px solid #e2e8f0', background: '#f8fafc',
                padding: '11px 48px 11px 42px', fontSize: '13px',
                outline: 'none', color: '#334155',
                boxSizing: 'border-box',
              }}
            />
            <span style={{
              position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
              fontSize:'10px', fontWeight:700, color:'#94a3b8',
              background:'#e2e8f0', padding:'2px 6px', borderRadius:'6px',
            }}>⌘K</span>
          </div>

          {/* Right actions */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>
            <a
              href={config.lmsUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display:'flex', alignItems:'center', gap:'6px',
                background:'#EEF5FF', border:'1px solid #DBEAFE',
                borderRadius:'12px', padding:'8px 16px',
                fontSize:'12px', fontWeight:700, color:'#2563EB',
                textDecoration:'none',
              }}
            >
              <GraduationCap size={15} />
              LMS
            </a>
            <a
              href="https://elearning.codestechno.com/" target="_blank" rel="noopener noreferrer"
              style={{
                display:'flex', alignItems:'center', gap:'6px',
                background:'#ECFDF5', border:'1px solid #A7F3D0',
                borderRadius:'12px', padding:'8px 16px',
                fontSize:'12px', fontWeight:700, color:'#047857',
                textDecoration:'none',
                transition:'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#D1FAE5';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#ECFDF5';
              }}
            >
              <Cpu size={15} />
              eLearning Microbit
            </a>
            <button
              onClick={() => setTab('inventory')}
              style={{
                display:'flex', alignItems:'center', gap:'6px',
                background:'#f1f5f9', border:'1px solid #e2e8f0',
                borderRadius:'12px', padding:'8px 16px',
                fontSize:'12px', fontWeight:700, color:'#475569',
                cursor:'pointer',
              }}
            >
              <Boxes size={15} />
              Inventaris LAB
            </button>

            {/* Notification bell */}
            <div style={{ position:'relative' }}>
              <button style={{
                background:'#f1f5f9', border:'1px solid #e2e8f0',
                borderRadius:'12px', padding:'9px', cursor:'pointer',
                display:'flex', alignItems:'center',
              }}>
                <Bell size={17} color="#475569" />
              </button>
              <span style={{
                position:'absolute', top:'-4px', right:'-4px',
                background:'#ef4444', color:'white',
                borderRadius:'50%', width:'18px', height:'18px',
                fontSize:'9px', fontWeight:800,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>3</span>
            </div>

            {/* Profile */}
            <div style={{ position:'relative' }}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                style={{
                  display:'flex', alignItems:'center', gap:'8px',
                  background:'#f8fafc', border:'1px solid #e2e8f0',
                  borderRadius:'14px', padding:'6px 12px 6px 6px',
                  cursor:'pointer',
                }}
              >
                <div style={{
                  width:'32px', height:'32px', borderRadius:'50%',
                  background:'linear-gradient(135deg,#2563EB,#60A5FA)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'white', fontSize:'11px', fontWeight:800,
                }}>FS</div>
                <ChevronDown size={14} color="#94a3b8" />
              </button>
              {showProfileDropdown && (
                <div style={{
                  position:'absolute', right:0, top:'calc(100% + 8px)',
                  background:'white', borderRadius:'16px',
                  border:'1px solid #e2e8f0', boxShadow:'0 8px 32px rgba(0,0,0,0.12)',
                  padding:'8px', minWidth:'180px', zIndex:100,
                }}>
                  <div style={{ padding:'10px 14px 8px', borderBottom:'1px solid #f1f5f9' }}>
                    <div style={{ fontSize:'12px', fontWeight:700, color:'#1e293b' }}>Fadhlan S.</div>
                    <div style={{ fontSize:'11px', color:'#94a3b8', fontWeight:500 }}>Administrator</div>
                  </div>
                  <button
                    onClick={() => { setShowProfileDropdown(false); onLogout(); }}
                    style={{
                      width:'100%', textAlign:'left', padding:'10px 14px',
                      background:'none', border:'none', cursor:'pointer',
                      fontSize:'12px', fontWeight:600, color:'#ef4444',
                      display:'flex', alignItems:'center', gap:'8px',
                      borderRadius:'10px', marginTop:'4px',
                    }}
                  >
                    <LogOut size={14} />
                    Log Out Mode Admin
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Mobile Nav Dropdown (Visitor) */}
      {!isAdmin && showMobileNav && (
        <div style={{
          background:'white', borderRadius:'16px',
          border:'1px solid #e2e8f0', boxShadow:'0 8px 32px rgba(0,0,0,0.1)',
          padding:'16px', zIndex:50, marginTop:'4px',
        }}>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { setTab(link.id); setShowMobileNav(false); }}
              style={{
                display:'block', width:'100%', textAlign:'left',
                padding:'12px 16px', background:'none', border:'none',
                cursor:'pointer', fontSize:'14px', fontWeight:600, color:'#334155',
                borderRadius:'10px',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setShowLoginModal(true); setShowMobileNav(false); }}
            style={{
              display:'block', width:'100%', textAlign:'center',
              padding:'12px', background:'#2563EB', color:'white',
              border:'none', cursor:'pointer', borderRadius:'12px',
              fontSize:'14px', fontWeight:700, marginTop:'8px',
            }}
          >
            Masuk
          </button>
        </div>
      )}

      {/* ===================== LOGIN MODAL ===================== */}
      {showLoginModal && (
        <div style={{
          position:'fixed', inset:0, zIndex:9999,
          background:'rgba(15,23,42,0.5)',
          backdropFilter:'blur(8px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          padding:'16px',
        }}>
          <div style={{
            background:'white', borderRadius:'24px',
            border:'1px solid #e2e8f0', boxShadow:'0 24px 64px rgba(0,0,0,0.15)',
            padding:'40px', width:'100%', maxWidth:'420px',
            position:'relative',
          }}>
            <button
              onClick={() => { setShowLoginModal(false); setLoginError(''); }}
              style={{
                position:'absolute', top:'20px', right:'20px',
                background:'#f1f5f9', border:'none', cursor:'pointer',
                borderRadius:'50%', padding:'6px',
                display:'flex', alignItems:'center',
              }}
            >
              <X size={18} color="#64748b" />
            </button>

            <div style={{ textAlign:'center', marginBottom:'28px' }}>
              <div style={{
                width:'52px', height:'52px', borderRadius:'16px',
                background:'#EEF5FF', border:'1px solid #DBEAFE',
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 16px',
              }}>
                <ShieldAlert size={24} color="#2563EB" />
              </div>
              <h3 style={{ fontSize:'20px', fontWeight:800, color:'#1e293b', margin:0 }}>Dashboard CMS Admin</h3>
              <p style={{ fontSize:'13px', color:'#64748b', marginTop:'8px' }}>
                Login untuk mengelola database kurikulum & inventaris lab
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <div>
                <label style={{ fontSize:'12px', fontWeight:700, color:'#374151', display:'block', marginBottom:'6px' }}>Email Admin</label>
                <input
                  type="email" placeholder="admin@idn.sch.id"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width:'100%', borderRadius:'12px', border:'1px solid #e2e8f0',
                    padding:'12px 16px', fontSize:'14px', outline:'none',
                    boxSizing:'border-box', background:'#f8fafc',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize:'12px', fontWeight:700, color:'#374151', display:'block', marginBottom:'6px' }}>Password</label>
                <input
                  type="password" placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width:'100%', borderRadius:'12px', border:'1px solid #e2e8f0',
                    padding:'12px 16px', fontSize:'14px', outline:'none',
                    boxSizing:'border-box', background:'#f8fafc',
                  }}
                />
              </div>
              {loginError && (
                <div style={{
                  background:'#FEF2F2', border:'1px solid #FECACA',
                  borderRadius:'10px', padding:'12px',
                  fontSize:'12px', color:'#DC2626', fontWeight:600,
                }}>
                  {loginError}
                </div>
              )}
              <div style={{
                background:'#F8FAFC', border:'1px solid #E2E8F0',
                borderRadius:'10px', padding:'12px',
                fontSize:'11px', color:'#64748b',
              }}>
                <strong style={{ color:'#334155' }}>Demo login:</strong><br />
                Email: <code style={{ background:'white', padding:'1px 6px', borderRadius:'4px' }}>admin@idn.sch.id</code><br />
                Password: <code style={{ background:'white', padding:'1px 6px', borderRadius:'4px' }}>admin123</code>
              </div>
              <button
                type="submit"
                style={{
                  background:'linear-gradient(135deg,#2563EB,#3B82F6)',
                  color:'white', border:'none', cursor:'pointer',
                  borderRadius:'14px', padding:'14px',
                  fontSize:'15px', fontWeight:700,
                  boxShadow:'0 8px 20px rgba(37,99,235,0.35)',
                  marginTop:'4px',
                }}
              >
                Sign In ke Admin Panel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
