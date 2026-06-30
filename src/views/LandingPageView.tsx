import { useState } from 'react';
import { mockDb } from '../services/db';
import {
  BookOpen, Code2, FolderGit, GraduationCap,
  Package, Users, FileText, Compass, Search,
  Sparkles, ArrowRight,
  Bot, ChevronRight, Globe
} from 'lucide-react';

interface LandingPageViewProps {
  onNavigate: (tab: string) => void;
  onOpenAiChat: () => void;
}

const galleryItems = [
  { id:1, badge:'Dokumentasi KBM',   badgeColor:'#10B981', title:'', desc:'', img:'/galeri/kbm/7A/IMG_20260116_135517.jpg' },
  { id:2, badge:'Dokumentasi KBM',   badgeColor:'#10B981', title:'', desc:'', img:'/galeri/kbm/7A/IMG_20260116_135532.jpg' },
  { id:3, badge:'Dokumentasi Lomba', badgeColor:'#3B82F6', title:'', desc:'', img:'/galeri/lomba/Jonggol/IMG_20251205_152613.jpg' },
  { id:4, badge:'Dokumentasi Lomba', badgeColor:'#3B82F6', title:'', desc:'', img:'/galeri/lomba/Sentul/7-Grade-23_01_2026.jpg' },
  { id:5, badge:'Dokumentasi KBM',   badgeColor:'#10B981', title:'', desc:'', img:'/galeri/kbm/7A/IMG_20260116_135539.jpg' },
];

export default function LandingPageView({ onNavigate, onOpenAiChat }: LandingPageViewProps) {
  const [searchVal,   setSearchVal]   = useState('');

  // Hitung jumlah materi, proyek, source code, dan siswa dinamis dari database
  const lessonsCount = mockDb.getLessons().length;
  const projectsCount = mockDb.getProjects().length;
  const reposCount = mockDb.getProjects().filter(p => p.githubLink).length;
  const totalSiswa = mockDb.getConfig().totalStudents || '2.5K+';

  const quickItems = [
    { id: 'materi',       title: 'Materi',         desc: `${lessonsCount} Materi`,       Icon: BookOpen,      grad: 'linear-gradient(135deg,#3B82F6,#2563EB)', glow: 'rgba(37,99,235,0.28)' },
    { id: 'projects',    title: 'Project Library', desc: `${projectsCount} Project`,     Icon: FolderGit,     grad: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', glow: 'rgba(124,58,237,0.28)' },
    { id: 'source-code', title: 'Source Code',     desc: `${reposCount} Repository`,     Icon: Code2,         grad: 'linear-gradient(135deg,#10B981,#059669)', glow: 'rgba(16,185,129,0.28)' },
    { id: 'lms',         title: 'LMS',             desc: 'Akses Pembelajaran',   Icon: GraduationCap, grad: 'linear-gradient(135deg,#F59E0B,#D97706)', glow: 'rgba(245,158,11,0.28)' },
    { id: 'inventory',   title: 'Inventaris LAB',  desc: 'Kelola Inventaris',    Icon: Package,       grad: 'linear-gradient(135deg,#06B6D4,#0891B2)', glow: 'rgba(6,182,212,0.28)' },
    { id: 'people',      title: 'Guru & Teknisi',  desc: 'Kelola Data',          Icon: Users,         grad: 'linear-gradient(135deg,#EC4899,#DB2777)', glow: 'rgba(236,72,153,0.28)' },
    { id: 'sop',         title: 'SOP Robot',       desc: 'Dokumentasi',          Icon: FileText,      grad: 'linear-gradient(135deg,#A78BFA,#8B5CF6)', glow: 'rgba(167,139,250,0.28)' },
    { id: 'kurikulum',   title: 'Kurikulum',       desc: 'Rencana Pembelajaran', Icon: Compass,       grad: 'linear-gradient(135deg,#FB923C,#EF4444)', glow: 'rgba(251,146,60,0.28)' },
  ];

  const statItems = [
    { count: `${lessonsCount}+`, label: 'Materi',      sub: 'Modul belajar',   Icon: BookOpen,     c: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
    { count: `${projectsCount}+`, label: 'Project',     sub: 'Alat & IoT',      Icon: FolderGit,    c: '#7C3AED', bg: 'rgba(124,58,237,0.1)' },
    { count: `${reposCount}+`, label: 'Source Code', sub: 'Repository Git',  Icon: Code2,        c: '#059669', bg: 'rgba(16,185,129,0.1)' },
    { count: totalSiswa,       label: 'Siswa Aktif', sub: 'Belajar bersama', Icon: Users,        c: '#D97706', bg: 'rgba(245,158,11,0.1)' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) onNavigate('materi');
  };

  return (
    <>
      {/* ════════════════════ STYLES ════════════════════ */}
      <style>{`
        /* reset */
        * { box-sizing: border-box; }

        /* ── PAGE WRAP ── */
        .lp-wrap {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 100px;
        }

        /* ════════════════ HERO ════════════════ */
        .lp-hero-outer {
          border-radius: 28px;
          background: linear-gradient(135deg, #EBF0FC 0%, #CCD8F9 35%, #B5B9D8 65%, #384EC1 100%);
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 56px rgba(37,99,235,0.12);
          min-height: 440px;
        }

        /* hero eyebrow */
        .lp-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.18);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 16px;
          color: #2563EB;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
        }

        /* glow orbs */
        .lp-hero-glow1 {
          position:absolute; top:-40px; left:38%; width:420px; height:420px;
          border-radius:50%; pointer-events:none;
          background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
          filter: blur(40px);
        }
        .lp-hero-glow2 {
          position:absolute; bottom:0; left:5%; width:200px; height:200px;
          border-radius:50%; pointer-events:none;
          background: radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%);
          filter: blur(24px);
        }
        .lp-hero-glow3 {
          position:absolute; top:0; right:0; width:180px; height:180px;
          border-radius:50%; pointer-events:none;
          background: radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%);
          filter: blur(24px);
        }

        /* deco icons */
        .lp-deco {
          position:absolute; display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,0.08); backdrop-filter:blur(8px);
          border:1px solid rgba(255,255,255,0.14); border-radius:14px;
          color:rgba(255,255,255,0.7);
        }

        /* hero inner grid – desktop 2 col */
        .lp-hero-grid {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          min-height: 400px;
          padding: 44px;
          gap: 40px;
          align-items: center;
        }

        /* col 1 – text */
        .lp-hero-text {
          width: 100%;
        }

        /* col 2 – photo card */
        .lp-hero-photo-card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          padding: 8px 8px 10px;
          box-shadow: 0 12px 40px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          display: none;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          align-self: center;
        }
        .lp-hero-photo-img {
          width: 100%;
          height: 250px;
          border-radius: 16px;
          object-fit: cover;
        }
        .lp-hero-photo-caption {
          font-size: 11px;
          color: #475569;
          font-weight: 600;
          text-align: center;
        }

        /* hero h1 */
        .lp-h1 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(28px, 3.2vw, 46px);
          font-weight: 900;
          color: #0F172A;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 14px;
        }
        .lp-h1-grad {
          background: linear-gradient(135deg, #2563EB, #7C3AED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lp-hero-sub {
          font-size: 13.5px;
          color: #334155;
          line-height: 1.7;
          margin: 0 0 24px;
          max-width: 380px;
        }

        /* search bar */
        .lp-search-wrap {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.95);
          border-radius: 100px;
          padding: 6px 6px 6px 18px;
          max-width: 420px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.28);
          gap: 8px;
        }
        .lp-search-input {
          flex: 1; border: none; outline: none; background: transparent;
          font-size: 13px; color: #0F172A; min-width: 0;
          font-family: 'Inter', sans-serif;
        }
        .lp-search-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          border: none; cursor: pointer; color: white;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(37,99,235,0.4);
        }

        /* dark glass widget */
        .lp-widget {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px;
          padding: 16px 18px;
          color: white;
        }

        /* ════════════════ STATS ════════════════ */
        .lp-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .lp-hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          width: 100%;
        }
        .lp-stats-mobile-only {
          display: none;
        }
        .lp-stat-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 22px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          padding: 18px 20px;
          display: flex; align-items: center; gap: 14px;
          transition: transform 220ms ease, box-shadow 220ms ease;
          cursor: default;
        }
        .lp-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(37,99,235,0.1);
        }
        .lp-stat-icon {
          width: 46px; height: 46px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .lp-stat-count {
          font-family: 'Poppins', sans-serif;
          font-size: 22px; font-weight: 800;
          color: #0F172A; line-height: 1;
        }
        .lp-stat-label {
          font-size: 12px; font-weight: 700; color: #334155; margin-top: 3px;
        }
        .lp-stat-sub {
          font-size: 10.5px; color: #94A3B8; margin-top: 1px;
        }

        /* ════════════════ SECTION HEADER ════════════════ */
        .lp-sec-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 14px; gap: 12px;
        }
        .lp-sec-title {
          font-family: 'Poppins', sans-serif;
          font-size: 18px; font-weight: 800; color: #0F172A; margin: 0;
        }
        .lp-sec-sub {
          font-size: 12.5px; color: #64748B; margin: 3px 0 0;
        }
        .lp-see-all {
          display: flex; align-items: center; gap: 4px;
          background: none; border: none; cursor: pointer;
          font-size: 12.5px; font-weight: 600; color: #2563EB;
          white-space: nowrap; padding: 0; flex-shrink: 0;
          margin-top: 2px;
        }

        /* ════════════════ QUICK ACCESS ════════════════ */
        .lp-quick {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .lp-quick-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 22px;
          padding: 18px 14px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
          cursor: pointer; text-align: left; width: 100%;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          transition: transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms ease, background 200ms ease;
        }
        .lp-quick-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.6) !important;
          box-shadow: 0 16px 36px rgba(31, 38, 135, 0.08) !important;
        }
        .lp-quick-icon {
          width: 46px; height: 46px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .lp-quick-title {
          font-family: 'Poppins', sans-serif;
          font-size: 12.5px; font-weight: 700; color: #0F172A; line-height: 1.3;
        }
        .lp-quick-desc {
          font-size: 11px; color: #64748B; margin-top: 2px;
        }

        /* ════════════════ GALLERY BENTO ════════════════ */
        .lp-bento {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 210px 210px;
          gap: 12px;
        }
        .lp-bento-featured {
          grid-row: span 2;
        }
        .lp-gal {
          position: relative; border-radius: 18px; overflow: hidden;
          cursor: pointer; background: #0F172A;
        }
        .lp-gal img {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
          transition: transform 500ms ease;
        }
        .lp-gal:hover img { transform: scale(1.07); }
        .lp-gal-ov {
          position: absolute; inset: 0; padding: 14px;
          display: flex; flex-direction: column; justify-content: flex-end;
          background: linear-gradient(to top, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.18) 60%, transparent 100%);
          color: white; transition: background 300ms ease;
        }
        .lp-gal:hover .lp-gal-ov {
          background: linear-gradient(to top, rgba(37,99,235,0.88) 0%, rgba(37,99,235,0.3) 65%, transparent 100%);
        }
        .lp-gal-badge {
          display: inline-block; padding: 2px 9px; border-radius: 100px;
          font-size: 9.5px; font-weight: 700; color: white; margin-bottom: 6px;
        }
        .lp-gal-title-lg {
          font-family: 'Poppins', sans-serif;
          font-size: 18px; font-weight: 800; margin-bottom: 6px;
        }
        .lp-gal-title-sm {
          font-family: 'Poppins', sans-serif;
          font-size: 13px; font-weight: 700; margin-bottom: 3px;
        }
        .lp-gal-desc {
          font-size: 11.5px; color: rgba(255,255,255,0.8); line-height: 1.45;
        }
        .lp-gal-desc-sm {
          font-size: 10.5px; color: rgba(255,255,255,0.78); line-height: 1.4;
        }

        /* Gallery list – mobile */
        .lp-gal-list { display: none; flex-direction: column; gap: 10px; }
        .lp-gal-list-item {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 18px; overflow: hidden;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          transition: transform 200ms ease;
        }
        .lp-gal-list-item:hover { transform: translateX(4px); background: rgba(255, 255, 255, 0.6) !important; }
        .lp-gal-list-thumb {
          width: 90px; height: 90px; object-fit: cover; flex-shrink: 0;
        }
        .lp-gal-list-info { flex: 1; padding: 12px 14px 12px 0; min-width: 0; }
        .lp-gal-list-badge {
          display: inline-block; padding: 2px 8px; border-radius: 100px;
          font-size: 9px; font-weight: 700; color: white; margin-bottom: 5px;
        }
        .lp-gal-list-title {
          font-family: 'Poppins', sans-serif;
          font-size: 13px; font-weight: 700; color: #0F172A;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .lp-gal-list-desc {
          font-size: 11px; color: #64748B; margin-top: 2px;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .lp-gal-list-arr {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
          background: rgba(37,99,235,0.08);
          display: flex; align-items: center; justify-content: center;
          margin-right: 14px;
        }

        /* Gallery mobile see-all banner */
        .lp-gal-banner {
          background: linear-gradient(135deg, #2563EB, #6366F1);
          border-radius: 18px; padding: 18px 20px;
          display: flex; align-items: center; gap: 14px;
          cursor: pointer;
        }

        /* ════════════════ AI BANNER ════════════════ */
        .lp-ai-banner {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px; padding: 24px 28px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }
        .lp-ai-banner-glow {
          position: absolute; top: -30px; right: 28%;
          width: 160px; height: 160px; border-radius: 50%;
          background: rgba(99,102,241,0.06); filter: blur(28px);
          pointer-events: none;
        }
        .lp-ai-icon {
          width: 54px; height: 54px; border-radius: 16px; flex-shrink: 0;
          background: linear-gradient(135deg, #2563EB, #6366F1);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(37,99,235,0.25);
        }
        .lp-ai-chat-btn {
          background: linear-gradient(135deg, #2563EB, #6366F1);
          color: white; border: none; cursor: pointer; border-radius: 100px;
          padding: 11px 22px; font-size: 13px; font-weight: 700;
          box-shadow: 0 6px 20px rgba(37,99,235,0.3);
          display: flex; align-items: center; gap: 6px; white-space: nowrap;
          transition: all 200ms ease;
        }
        .lp-ai-chat-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }

        /* ════════════════ FEATURES ════════════════ */
        .lp-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .lp-feat-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 22px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          padding: 22px 18px;
          display: flex; flex-direction: column; gap: 12px;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }
        .lp-feat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(37,99,235,0.10);
        }
        .lp-feat-icon {
          width: 48px; height: 48px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        .lp-feat-title {
          font-family: 'Poppins', sans-serif;
          font-size: 13.5px; font-weight: 700; color: #0F172A; margin-bottom: 6px;
        }
        .lp-feat-desc {
          font-size: 12.5px; color: #64748B; line-height: 1.65; margin: 0;
        }

        /* ════════════════ CTA ════════════════ */
        .lp-cta {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 28px; padding: 52px 40px; text-align: center;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          position: relative; overflow: hidden;
        }
        .lp-cta-glow {
          position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
          filter: blur(20px); pointer-events: none;
        }
        .lp-cta-btn {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white; border: none; cursor: pointer; border-radius: 100px;
          padding: 14px 36px; font-size: 14px; font-weight: 700;
          box-shadow: 0 8px 24px rgba(37,99,235,0.35);
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 220ms ease;
          position: relative;
        }
        .lp-cta-btn:hover { transform: translateY(-2px); filter: brightness(1.06); }

        /* ════════════════ FOOTER ════════════════ */
        .lp-footer {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          padding: 40px 36px 28px; color: #475569;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.35);
        }
        .lp-footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 40px; margin-bottom: 28px;
        }
        .lp-footer-divider {
          border: none; border-top: 1px solid rgba(0,0,0,0.08); margin: 0;
        }
        .lp-footer-link {
          font-size: 12px; color: #475569; margin-bottom: 10px;
          cursor: pointer; transition: color 150ms ease; display: block;
        }
        .lp-footer-link:hover { color: #2563EB; }
        .lp-footer-soc {
          width: 32px; height: 32px; border-radius: 9px; cursor: pointer;
          background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.08);
          display: flex; align-items: center; justify-content: center;
          transition: background 180ms ease;
        }
        .lp-footer-soc:hover { background: rgba(37,99,235,0.08); }

        /* ════════════════ AI CHAT WIDGET ════════════════ */
        .lp-chat-widget {
          position: fixed; bottom: 104px; right: 36px; z-index: 200;
          width: 390px; background: white; border-radius: 22px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(37,99,235,0.12);
          border: 1px solid rgba(226,232,240,0.8);
          overflow: hidden; display: flex; flex-direction: column;
          animation: lpChatIn 0.32s cubic-bezier(0.16,1,0.3,1);
        }
        .lp-chat-messages {
          overflow-y: auto; padding: 14px 16px;
          display: flex; flex-direction: column; gap: 10px;
          max-height: 380px; min-height: 200px;
        }
        .lp-bubble-ai {
          padding: 10px 14px; background: #F8FAFC; border-radius: 4px 16px 16px 16px;
          font-size: 12.5px; line-height: 1.6; color: #0F172A;
          max-width: 82%; white-space: pre-line;
        }
        .lp-bubble-user {
          padding: 10px 14px;
          background: linear-gradient(135deg, #2563EB, #3B82F6);
          border-radius: 16px 4px 16px 16px;
          font-size: 12.5px; color: white; max-width: 82%;
          align-self: flex-end;
        }
        .lp-chip {
          padding: 5px 12px; border: 1px solid rgba(37,99,235,0.2);
          border-radius: 100px; font-size: 11px; font-weight: 500;
          color: #2563EB; background: rgba(37,99,235,0.05); cursor: pointer;
          white-space: nowrap; transition: background 150ms ease;
        }
        .lp-chip:hover { background: rgba(37,99,235,0.12); }

        /* FAB */
        .lp-fab {
          position: fixed; bottom: 32px; right: 36px; z-index: 199;
          width: 60px; height: 60px; border-radius: 50%;
          background: linear-gradient(135deg, #2563EB, #6366F1);
          border: 3px solid rgba(255,255,255,0.4); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 28px rgba(37,99,235,0.35);
          transition: transform 250ms cubic-bezier(0.16,1,0.3,1);
          color: white;
        }
        .lp-fab:hover { transform: scale(1.1); }



        /* animations */
        @keyframes lpChatIn {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes lpFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-11px); }
        }
        @keyframes lpPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50%      { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .lp-float { animation: lpFloat 3.5s ease-in-out infinite; }
        .lp-pulse { animation: lpPulse 2s ease infinite; }

        /* ════════════════ RESPONSIVE ════════════════ */

        /* Tablet 768–1023 */
        @media (max-width: 1023px) {
          .lp-hero-grid {
            grid-template-columns: 1.2fr 1fr;
            padding: 36px 32px;
            gap: 24px;
            align-items: center;
          }
          .lp-hero-text { grid-column: auto; grid-row: auto; }
          .lp-hero-photo-card {
            width: 100% !important;
            height: 220px !important;
          }
          .lp-hero-photo-img {
            height: 100% !important;
          }
          .lp-hero-stats-grid {
            display: none !important;
          }
          .lp-stats-mobile-only {
            display: block !important;
          }
          .lp-stats  { grid-template-columns: repeat(2,1fr); }
          .lp-quick  { grid-template-columns: repeat(4,1fr); gap: 10px; }
          .lp-bento  { grid-template-columns: 1fr 1fr; grid-template-rows: 200px 200px 200px; }
          .lp-bento-featured { grid-row: span 2; }
          .lp-features { grid-template-columns: repeat(2,1fr); }
          .lp-footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .lp-wrap { padding-bottom: 100px; }
        }

        /* Mobile < 768 */
        @media (max-width: 767px) {
          .lp-hero-outer { min-height: auto; }
          .lp-hero-grid {
            display: flex !important;
            flex-direction: column !important;
            padding: 22px 18px 22px !important;
            gap: 16px !important;
            min-height: auto !important;
          }
          .lp-hero-text {
            width: 100% !important;
            padding-right: 0 !important;
            padding-bottom: 0 !important;
          }
          .lp-hero-photo-card {
            display: none !important;
          }
          .lp-h1 { font-size: 22px !important; margin-bottom: 6px !important; }
          .lp-hero-sub { font-size: 11.5px !important; margin-bottom: 12px !important; }
          .lp-search-wrap {
            max-width: 100% !important;
            width: 100% !important;
            margin-right: 0 !important;
            margin-top: 0 !important;
          }
          .lp-stats {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 12px !important;
            padding: 8px 4px 14px !important;
            margin-right: -18px !important;
            margin-left: -4px !important;
            scrollbar-width: none !important;
          }
          .lp-stats::-webkit-scrollbar { display: none !important; }
          .lp-stat-card {
            flex: 0 0 170px !important;
            scroll-snap-align: start !important;
            box-shadow: 0 8px 24px rgba(31, 38, 135, 0.04) !important;
          }
          .lp-quick {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 12px !important;
            padding: 8px 4px 14px !important;
            margin-right: -18px !important;
            margin-left: -4px !important;
            scrollbar-width: none !important;
          }
          .lp-quick::-webkit-scrollbar { display: none !important; }
          .lp-quick-card {
            flex: 0 0 145px !important;
            scroll-snap-align: start !important;
            box-shadow: 0 8px 24px rgba(31, 38, 135, 0.04) !important;
          }
          .lp-bento  { display: none !important; }
          .lp-gal-list { display: flex !important; }
          .lp-features { grid-template-columns: 1fr !important; gap: 12px !important; }
          .lp-footer-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .lp-ai-banner { flex-direction: column !important; align-items: flex-start !important; }
          .lp-see-all { display: none; }
          .lp-cta { padding: 36px 24px !important; }
          .lp-footer { padding: 24px 20px !important; }
          .lp-chat-widget { left: 18px !important; right: 18px !important; width: auto !important; bottom: 94px !important; }
          .lp-wrap { padding-bottom: 100px !important; }
        }

        @media (max-width: 480px) {
          .lp-hero-robot-wrap { width: 110px; }
          .lp-h1 { font-size: 23px !important; }
        }
      `}</style>

      {/* ════════════════════ PAGE ════════════════════ */}
      <div className="lp-wrap">

        {/* ══════════════ 1. HERO ══════════════ */}
        <div className="lp-hero-outer">
          {/* glow */}
          <div className="lp-hero-glow1" />
          <div className="lp-hero-glow2" />
          <div className="lp-hero-glow3" />

          {/* decorative floating icon tiles */}
          <div className="lp-deco" style={{ top:'15%', left:'40%',   width:38, height:38, fontSize:14, animationName:'lpFloat', animationDuration:'3.8s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }}>
            <Code2 size={17} color="rgba(255,255,255,0.75)" />
          </div>
          <div className="lp-deco" style={{ top:'10%', left:'52%',   width:34, height:34, animationName:'lpFloat', animationDuration:'4.4s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.5s' }}>
            <Globe size={15} color="rgba(255,255,255,0.7)" />
          </div>
          <div className="lp-deco" style={{ top:'26%', left:'60%',   width:32, height:32, animationName:'lpFloat', animationDuration:'3.2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'1s' }}>
            <BookOpen size={14} color="rgba(255,255,255,0.7)" />
          </div>

          {/* grid */}
          <div className="lp-hero-grid">

            {/* col 1 – text */}
            <div className="lp-hero-text">
              {/* eyebrow */}
              <div className="lp-hero-eyebrow">
                <span>KELOLA, BELAJAR, KEMBANGKAN</span>
              </div>

              <h1 className="lp-h1">
                Robotik &amp; IoT<br />
                <span className="lp-h1-grad">Lebih Mudah</span>
              </h1>

              <p className="lp-hero-sub">
                Platform terintegrasi untuk guru, siswa, dan teknisi. Semua materi, project, source code, hingga kurikulum dalam satu tempat.
              </p>

              <form onSubmit={handleSearchSubmit} className="lp-search-wrap">
                <Search size={14} color="#94a3b8" style={{ flexShrink:0 }} />
                <input
                  type="text"
                  className="lp-search-input"
                  placeholder="Cari materi, project, guru, dan lainnya..."
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                />
                <button type="submit" className="lp-search-btn">
                  <Search size={14} />
                </button>
              </form>
            </div>

            {/* col 2 – laptop stats / tablet photo */}
            <div>
              {/* 2x2 Stats Grid for Laptop/Desktop */}
              <div className="lp-hero-stats-grid">
                {statItems.map(s => (
                  <div key={s.label} className="lp-stat-card">
                    <div className="lp-stat-icon" style={{ background: s.bg }}>
                      <s.Icon size={22} color={s.c} />
                    </div>
                    <div>
                      <div className="lp-stat-count">{s.count}</div>
                      <div className="lp-stat-label">{s.label}</div>
                      <div className="lp-stat-sub">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* KBM Photo Card for Tablet */}
              <div className="lp-hero-photo-card">
                <img
                  src="/galeri/kbm/7 B/Projek 1/IMG20260114111004_BURST001_COVER.jpg"
                  alt="Kegiatan Belajar Mengajar Robotik"
                  className="lp-hero-photo-img"
                />
                <div className="lp-hero-photo-caption">Kegiatan Belajar Mengajar Robotik IDN</div>
              </div>
            </div>

          </div>{/* /lp-hero-grid */}
        </div>{/* /lp-hero-outer */}

        {/* ══════════════ 2. STATS (mobile/tablet only) ══════════════ */}
        <div className="lp-stats-mobile-only">
          <div className="lp-stats">
            {statItems.map(s => (
              <div key={s.label} className="lp-stat-card">
                <div className="lp-stat-icon" style={{ background: s.bg }}>
                  <s.Icon size={22} color={s.c} />
                </div>
                <div>
                  <div className="lp-stat-count">{s.count}</div>
                  <div className="lp-stat-label">{s.label}</div>
                  <div className="lp-stat-sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════ 3. AKSES CEPAT ══════════════ */}
        <div>
          <div className="lp-sec-head">
            <div>
              <h2 className="lp-sec-title">Akses Cepat</h2>
              <p className="lp-sec-sub">Pilih modul yang ingin Anda telusuri</p>
            </div>
            <button className="lp-see-all" onClick={() => onNavigate('materi')}>
              Lihat Semua <ArrowRight size={13} />
            </button>
          </div>
          <div className="lp-quick">
            {quickItems.map(({ id, title, desc, Icon, grad, glow }) => (
              <button key={id} onClick={() => onNavigate(id)} className="lp-quick-card"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 28px ${glow}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(37,99,235,0.06)'; }}
              >
                <div className="lp-quick-icon" style={{ background: grad, boxShadow: `0 4px 14px ${glow}` }}>
                  <Icon size={22} color="white" />
                </div>
                <div>
                  <div className="lp-quick-title">{title}</div>
                  <div className="lp-quick-desc">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════ 4. GALERI ══════════════ */}
        <div>
          <div className="lp-sec-head">
            <h2 className="lp-sec-title">Galeri Kegiatan &amp; Project</h2>
            <button className="lp-see-all" onClick={() => onNavigate('tentang')}>
              Lihat Semua <ArrowRight size={13} />
            </button>
          </div>

          {/* Desktop Bento */}
          <div className="lp-bento">
            <div className="lp-gal lp-bento-featured" onClick={() => onNavigate('tentang')}>
              <img src={galleryItems[0].img} alt={galleryItems[0].title}
                onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x440/1E3A8A/white?text=Foto'; }} />
              <div className="lp-gal-ov">
                <span className="lp-gal-badge" style={{ background: galleryItems[0].badgeColor }}>{galleryItems[0].badge}</span>
                {galleryItems[0].title && <div className="lp-gal-title-lg">{galleryItems[0].title}</div>}
                {galleryItems[0].desc && <div className="lp-gal-desc">{galleryItems[0].desc}</div>}
              </div>
            </div>
            {galleryItems.slice(1).map(item => (
              <div key={item.id} className="lp-gal" onClick={() => onNavigate('tentang')}>
                <img src={item.img} alt={item.title}
                  onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/400x210/1E3A8A/white?text=Foto`; }} />
                <div className="lp-gal-ov">
                  <span className="lp-gal-badge" style={{ background: item.badgeColor }}>{item.badge}</span>
                  {item.title && <div className="lp-gal-title-sm">{item.title}</div>}
                  {item.desc && <div className="lp-gal-desc-sm">{item.desc}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile List */}
          <div className="lp-gal-list">
            {galleryItems.map(item => (
              <div key={item.id} className="lp-gal-list-item" onClick={() => onNavigate('tentang')}>
                <img src={item.img} alt={item.title} className="lp-gal-list-thumb"
                  onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/90x90/1E3A8A/white?text=Foto`; }} />
                <div className="lp-gal-list-info">
                  <span className="lp-gal-list-badge" style={{ background: item.badgeColor }}>{item.badge}</span>
                  {item.title && <div className="lp-gal-list-title">{item.title}</div>}
                  {item.desc && <div className="lp-gal-list-desc">{item.desc}</div>}
                </div>
                <div className="lp-gal-list-arr">
                  <ChevronRight size={15} color="#2563EB" />
                </div>
              </div>
            ))}
            {/* see-all banner */}
            <div className="lp-gal-banner" onClick={() => onNavigate('tentang')}>
              <div style={{ width:44, height:44, borderRadius:13, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Globe size={20} color="white" />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:'14px', fontWeight:700, color:'white', marginBottom:2 }}>Lihat Semua Galeri</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.78)' }}>Jelajahi momen dan project inspiratif.</div>
              </div>
              <ChevronRight size={18} color="rgba(255,255,255,0.75)" />
            </div>
          </div>
        </div>

        {/* ══════════════ 5. AI BANNER ══════════════ */}
        <div className="lp-ai-banner">
          <div className="lp-ai-banner-glow" />
          <div style={{ display:'flex', alignItems:'center', gap:16, zIndex:1, flex:1, minWidth:0 }}>
            <div className="lp-ai-icon"><Bot size={26} color="white" /></div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:'16px', fontWeight:800, color:'#0F172A', marginBottom:4 }}>AI Assistant</div>
              <div style={{ fontSize:'12.5px', color:'#475569', lineHeight:1.55 }}>
                Butuh informasi cepat? Tanya AI Assistant kami, semua jawaban dari seluruh pengetahuan.
              </div>
            </div>
          </div>
          <div style={{ zIndex:1, flexShrink:0 }}>
            <button className="lp-ai-chat-btn" onClick={onOpenAiChat}>
              <Sparkles size={14} /> Mulai Chat <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* ══════════════ 6. FOOTER ══════════════ */}
        <footer className="lp-footer" style={{ padding: '24px 36px' }}>
          <div style={{ textAlign:'center' }}>
            <span style={{ fontSize:11, color:'#475569', fontWeight: 500 }}>© 2024 IDN Robotics. All rights reserved.</span>
          </div>
        </footer>
      </div>{/* /lp-wrap */}

    </>
  );
}
