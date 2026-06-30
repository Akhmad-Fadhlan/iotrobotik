import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Bot, X, Send, Home, BookOpen, Layers, FolderGit2 as FolderGit } from 'lucide-react';

import LandingPageView from './views/LandingPageView';
import DashboardView from './views/DashboardView';
import MateriView from './views/MateriView';
import LmsView from './views/LmsView';
import SourceCodeView from './views/SourceCodeView';
import ProjectsView from './views/ProjectsView';
import CurriculumView from './views/CurriculumView';
import PeopleView from './views/PeopleView';
import SopView from './views/SopView';
import InventoryView from './views/InventoryView';
import ChatbotView from './views/ChatbotView';
import GalleryView from './views/GalleryView';
import AdminView from './views/AdminView';

import { mockDb } from './services/db';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState('beranda');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [dbVersion, setDbVersion] = useState(0);

  // Global Chatbot States
  const [showAiChat, setShowAiChat] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { from: 'ai', text: 'Hai! Ada yang bisa saya bantu hari ini?' }
  ]);

  const handleSendChat = () => {
    if (!chatMsg.trim()) return;
    const userMsg = chatMsg.trim();
    setChatHistory(prev => [
      ...prev,
      { from: 'user', text: userMsg },
      { from: 'ai', text: 'Berikut langkah umum membuat robot line follower:\n1. Siapkan komponen sensor line, mikrokontroler, motor driver, dan motor.\n2. Rangkai sensor line di bagian depan robot.\n3. Program mikrokontroler untuk membaca sensor dan mengatur motor.\n4. Uji coba dan lakukan kalibrasi.' }
    ]);
    setChatMsg('');
  };

  useEffect(() => {
    mockDb.getTeachers();
    mockDb.getTechnicians();
    mockDb.getLessons();
    mockDb.getProjects();
    mockDb.getSops();
    mockDb.getInventory();
    mockDb.getConfig();

    const doSync = async () => {
      const success = await mockDb.syncFromBackend();
      if (success) {
        setDbVersion(v => v + 1);
      }
    };
    doSync();

    const handleForceSync = async () => {
      await mockDb.syncFromBackend();
      setDbVersion(v => v + 1);
    };
    window.addEventListener('forceSyncBackend', handleForceSync);
    return () => window.removeEventListener('forceSyncBackend', handleForceSync);
  }, []);

  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) setTab(customEvent.detail);
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
    setTab('dashboard');
    mockDb.addLog('Admin', 'Administrator logged in', 'Auth');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setTab('beranda');
    mockDb.addLog('Admin', 'Administrator logged out', 'Auth');
  };

  const renderView = (currentTab: string) => {
    const key = `${currentTab}_${dbVersion}`;
    switch (currentTab) {
      case 'beranda': 
        return (
          <LandingPageView 
            key={key}
            onNavigate={setTab} 
            onOpenAiChat={() => setShowAiChat(true)}
          />
        );
      case 'dashboard': return <DashboardView key={key} setTab={setTab} searchQuery={searchQuery} />;
      case 'materi': return <MateriView key={key} />;
      case 'lms': return <LmsView key={key} />;
      case 'source-code': return <SourceCodeView key={key} />;
      case 'projects': return <ProjectsView key={key} />;
      case 'kurikulum': return <CurriculumView key={key} />;
      case 'people': return <PeopleView key={key} />;
      case 'sop': return <SopView key={key} />;
      case 'inventory': return <InventoryView key={key} />;
      case 'chatbot': return <ChatbotView key={key} />;
      case 'tentang': return <GalleryView key={key} />;
      case 'admin': return isAdmin ? <AdminView key={key} /> : null;
      default: 
        return (
          <LandingPageView 
            key={key}
            onNavigate={setTab} 
            onOpenAiChat={() => setShowAiChat(true)}
          />
        );
    }
  };

  /* ==========================================
     A. VISITOR LAYOUT (halaman_awal.png)
  ========================================== */
  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E0EBFF 0%, #E2E7FF 30%, #EADEFF 70%, #F5E3FF 100%)',
        backgroundAttachment: 'fixed',
      }}>
        <div className="visitor-container">
          <Header
            currentTab={tab}
            setTab={setTab}
            isAdmin={false}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onOpenSidebar={() => {}}
            onSearch={setSearchQuery}
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
          <main style={{ paddingTop: '16px' }}>
            {renderView(tab)}
          </main>
        </div>

        {/* Global AI Chat Widget */}
        {showAiChat && (
          <div className="lp-chat-widget">
            {/* header */}
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg,#2563EB,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={20} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>AI Assistant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                  <div className="lp-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#10B981', fontWeight: 500 }}>Online</span>
                </div>
              </div>
              <button onClick={() => setShowAiChat(false)} style={{ background: '#F1F5F9', border: 'none', cursor: 'pointer', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={14} color="#64748b" />
              </button>
            </div>
            {/* messages */}
            <div className="lp-chat-messages">
              {chatHistory.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.from === 'user' ? 'flex-end' : 'flex-start', gap: 4 }}>
                  {msg.from === 'ai' && (
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg,#2563EB,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bot size={13} color="white" />
                    </div>
                  )}
                  <div className={msg.from === 'user' ? 'lp-bubble-user' : 'lp-bubble-ai'}>{msg.text}</div>
                </div>
              ))}
            </div>
            {/* chips */}
            <div style={{ padding: '0 14px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Materi Line Follower', 'Contoh Source Code', 'Project Terkait'].map(s => (
                <button key={s} className="lp-chip" onClick={() => setChatMsg(s)}>{s}</button>
              ))}
            </div>
            {/* input */}
            <div style={{ padding: '10px 14px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                placeholder="Ketik pesan Anda..."
                style={{ flex: 1, border: '1px solid #E2E8F0', borderRadius: '100px', padding: '9px 16px', fontSize: '12.5px', outline: 'none', background: '#F8FAFC', color: '#0F172A', fontFamily: "'Inter',sans-serif" }}
              />
              <button onClick={handleSendChat} style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#3B82F6)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,99,235,0.35)' }}>
                <Send size={14} color="white" />
              </button>
            </div>
          </div>
        )}

        {/* Global Floating FAB Button — desktop only */}
        <button className="lp-fab" onClick={() => setShowAiChat(p => !p)} title="AI Assistant">
          {showAiChat ? <X size={24} /> : <Bot size={28} />}
        </button>

        {/* Global Mobile Bottom Nav — lp-bnav style, visible on all mobile pages */}
        <nav className="lp-bnav">
          {[
            { id: 'beranda',  label: 'Beranda', Icon: Home,      isAI: false },
            { id: 'materi',   label: 'Materi',  Icon: BookOpen,  isAI: false },
            { id: 'ai',       label: 'AI',      Icon: Bot,       isAI: true  },
            { id: 'lms',      label: 'LMS',     Icon: Layers,    isAI: false },
            { id: 'projects', label: 'Project', Icon: FolderGit, isAI: false },
          ].map(item => {
            if (item.isAI) return (
              <button key="ai" className="lp-bnav-ai" onClick={() => setShowAiChat(p => !p)}>
                <Bot size={22} />
              </button>
            );
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                className={`lp-bnav-item${active ? ' active' : ''}`}
                onClick={() => setTab(item.id)}
              >
                <item.Icon size={20} color={active ? '#2563EB' : '#6E7280'} />
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? '#2563EB' : '#6E7280' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  /* ==========================================
     B. ADMIN LAYOUT (halaman_admin.png)
  ========================================== */
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #E8F0FE 0%, #EEF2FF 50%, #F0F4FF 100%)', backgroundAttachment: 'fixed', display: 'flex' }}>

      {/* Always-visible sidebar on desktop */}
      <div style={{ width: '260px', flexShrink: 0, position: 'relative' }} className="sidebar-wrapper">
        <Sidebar
          currentTab={tab}
          setTab={setTab}
          isAdmin={true}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          onLogout={handleLogout}
        />
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '100vh' }}>
        <div style={{ padding: '20px 24px 0', position: 'sticky', top: 0, zIndex: 30, background: 'transparent' }}>
          <Header
            currentTab={tab}
            setTab={setTab}
            isAdmin={true}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onOpenSidebar={() => setSidebarOpen(true)}
            onSearch={setSearchQuery}
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
        </div>
        <main style={{ flex: 1, padding: '20px 24px 40px' }}>
          {renderView(tab)}
        </main>
      </div>
    </div>
  );
}
