import { useState } from 'react';
import { 
  Image as ImageIcon, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download, 
  Info
} from 'lucide-react';
import galleryData from '../data/gallery.json';

interface GalleryItem {
  id: string;
  src: string;
  name: string;
  type: string;
  category: string;
  tag: string;
  size: number;
  colSpan: number;
  rowSpan: number;
}

export default function GalleryView() {
  const [items] = useState<GalleryItem[]>(galleryData as GalleryItem[]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'kbm' | 'lomba'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Derive unique tags based on category
  const tags = ['All', ...Array.from(new Set(
    items
      .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
      .map(item => item.tag)
  ))];

  // Filter items
  const filtered = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesTag = selectedTag === 'All' || item.tag === selectedTag;
    return matchesCategory && matchesTag;
  });

  const handleCategoryChange = (cat: 'all' | 'kbm' | 'lomba') => {
    setSelectedCategory(cat);
    setSelectedTag('All'); // Reset tag filter on main category change
  };

  const openLightbox = (item: GalleryItem) => {
    const idx = filtered.findIndex(f => f.id === item.id);
    if (idx !== -1) {
      setActiveItemIndex(idx);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null && activeItemIndex > 0) {
      setActiveItemIndex(activeItemIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null && activeItemIndex < filtered.length - 1) {
      setActiveItemIndex(activeItemIndex + 1);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const getBentoSpanClass = (item: GalleryItem) => {
    if (item.colSpan === 2 && item.rowSpan === 2) return 'span-2-2';
    if (item.colSpan === 2 && item.rowSpan === 1) return 'span-2-1';
    if (item.colSpan === 1 && item.rowSpan === 2) return 'span-1-2';
    return 'span-1-1';
  };

  const activeItem = activeItemIndex !== null ? filtered[activeItemIndex] : null;

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-[15px] font-bold text-slate-800">
            Galeri Dokumentasi & Media
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Dokumentasi foto KBM kelas 7A/7B dan rekaman perlombaan di berbagai cabang IDN.
          </p>
        </div>

        {/* Category filters (Styled like Curriculum Tab Bar) */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(226,232,240,0.85)',
            boxShadow: '0 2px 16px -4px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.95)',
            gap: '2px',
            flexWrap: 'wrap'
          }}
          className="shrink-0"
        >
          {((['all', 'kbm', 'lomba'] as const).map((cat) => {
            const isActive = selectedCategory === cat;
            const label = cat === 'all' ? 'Semua Aset' : cat === 'kbm' ? 'Galeri KBM' : 'Galeri Lomba';
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '7px 13px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                  background: isActive
                    ? 'linear-gradient(135deg, #2563eb, #7c3aed)'
                    : 'transparent',
                  color: isActive ? 'white' : '#64748b',
                  boxShadow: isActive
                    ? '0 4px 12px -4px rgba(37,99,235,0.45), inset 0 1px 0 rgba(255,255,255,0.18)'
                    : 'none',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {label}
              </button>
            );
          }))}
        </div>
      </div>

      {/* Subfolder tag filters (Styled similarly like Curriculum Tab Bar but smaller/subtle) */}
      {tags.length > 2 && (
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(226,232,240,0.6)',
            gap: '2px',
            flexWrap: 'wrap',
            alignSelf: 'flex-start'
          }}
        >
          {tags.map(tag => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: isActive ? 700 : 500,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: isActive
                    ? 'linear-gradient(135deg, #2563eb, #7c3aed)'
                    : 'transparent',
                  color: isActive ? 'white' : '#64748b',
                  whiteSpace: 'nowrap'
                }}
              >
                {tag === 'All' ? 'Semua Sub-Kategori' : tag}
              </button>
            );
          })}
        </div>
      )}

      {/* Bento Grid */}
      <div className="bento-grid">
        {filtered.map((item) => (
          <div 
            key={item.id}
            onClick={() => openLightbox(item)}
            className={`bento-item glass-panel group ${getBentoSpanClass(item)}`}
          >
            {/* Media content */}
            {item.type === 'image' ? (
              <img src={item.src} alt={item.name} loading="lazy" />
            ) : (
              <div className="relative w-full h-full bg-slate-900">
                <video src={item.src} muted playsInline className="opacity-90" />
                <div className="video-badge">
                  <Play size={10} fill="white" />
                  <span>VIDEO</span>
                </div>
              </div>
            )}

            {/* Hover details overlay */}
            <div className="bento-item-content">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200 bg-blue-500/30 px-2 py-0.5 rounded-full self-start mb-2">
                {item.tag}
              </span>
              <h4 className="font-heading text-[13px] font-bold text-white leading-snug truncate">
                {item.name}
              </h4>
              <p className="text-[10px] text-slate-300 font-medium mt-0.5">
                Size: {formatSize(item.size)}
              </p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <ImageIcon className="mx-auto mb-3 opacity-30" size={56} />
            <p className="text-[13px] font-medium">Tidak ada foto/video yang cocok dengan filter ini.</p>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {activeItemIndex !== null && activeItem && (
        <div 
          className="fixed inset-0 z-50 flex flex-col justify-between bg-slate-950/90 p-6 backdrop-blur-md animate-fade-in text-white"
          onClick={() => setActiveItemIndex(null)}
        >
          {/* Header toolbar */}
          <div className="flex items-center justify-between w-full z-10">
            <div className="flex items-center gap-3">
              <span className="badge badge-purple text-[10px] font-bold uppercase">
                {activeItem.tag}
              </span>
              <h3 className="font-heading text-[14.5px] font-bold truncate max-w-[280px] sm:max-w-md">
                {activeItem.name}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={activeItem.src}
                download
                onClick={(e) => e.stopPropagation()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Download file"
              >
                <Download size={16} />
              </a>
              <button 
                onClick={() => setActiveItemIndex(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Central Media Viewer */}
          <div className="flex-1 flex items-center justify-center relative w-full my-6 min-h-0 select-none">
            {/* Prev Button */}
            {activeItemIndex !== null && activeItemIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Main Object */}
            <div 
              className="max-h-full max-w-[90%] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl bg-black/20"
              onClick={(e) => e.stopPropagation()}
            >
              {activeItem.type === 'image' ? (
                <img 
                  src={activeItem.src} 
                  alt={activeItem.name} 
                  className="max-h-[72vh] object-contain rounded-2xl" 
                />
              ) : (
                <video 
                  src={activeItem.src} 
                  controls 
                  autoPlay
                  className="max-h-[72vh] object-contain rounded-2xl" 
                />
              )}
            </div>

            {/* Next Button */}
            {activeItemIndex !== null && activeItemIndex < filtered.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Footer details */}
          <div className="text-center text-[11px] text-slate-400 z-10 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <Info size={12} />
              <span>Format: {activeItem.type.toUpperCase()} • Size: {formatSize(activeItem.size)}</span>
            </div>
            <span>Slide {activeItemIndex + 1} dari {filtered.length}</span>
          </div>

        </div>
      )}

    </div>
  );
}
