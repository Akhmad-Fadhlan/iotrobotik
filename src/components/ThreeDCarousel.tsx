import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselItem {
  id: string;
  title: string;
  desc: string;
  Icon: React.ComponentType<{ size: number; color?: string }>;
  grad: string;
  glow: string;
  url?: string;
  image?: string;
}

interface ThreeDCarouselProps {
  items: CarouselItem[];
  onNavigate: (id: string) => void;
}

export default function ThreeDCarousel({ items, onNavigate }: ThreeDCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [xSpacing, setXSpacing] = useState(250);
  const [cardWidth, setCardWidth] = useState(300);
  const [cardHeight, setCardHeight] = useState(400);
  
  // Track dragging state to prevent click events triggering when drag ends
  const dragStartPos = useRef(0);

  const N = items.length;

  // Handle window resizing to adjust mobile scaling and dynamic spacing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        setCardWidth(200);
        setCardHeight(280);
        setXSpacing(Math.max(105, width / 3.2));
      } else {
        setCardWidth(300);
        setCardHeight(400);
        // Stretches spacing on larger displays to eliminate margins
        setXSpacing(Math.min(380, Math.max(220, width / 4.6)));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic sliding
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % N);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + N) % N);
  };

  const handleCardClick = (index: number, id: string, url?: string) => {
    if (index === currentIndex) {
      // If clicking the active card, navigate to it
      if (url) {
        window.open(url, '_blank');
      } else {
        onNavigate(id);
      }
    } else {
      // If clicking a side card, bring it to center
      setCurrentIndex(index);
    }
  };

  const handleDragStart = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartPos.current = clientX;
  };

  const handleDragEnd = (_e: any, info: any) => {
    const dragDistance = info.offset.x;
    if (dragDistance > 50) {
      handlePrev();
    } else if (dragDistance < -50) {
      handleNext();
    }
  };

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px 0' : '40px 0',
        overflow: 'visible',
      }}
    >
      {/* 3D Stack Viewport */}
      <div 
        className="carousel-viewport"
        style={{
          width: '100%',
          height: isMobile ? '320px' : '440px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: isMobile ? '800px' : '1200px',
          perspectiveOrigin: 'center center',
          overflow: 'visible',
        }}
      >
        <AnimatePresence initial={false}>
          {items.map((item, idx) => {
            // Compute relative offset in a circular fashion
            let offset = (idx - currentIndex) % N;
            if (offset > N / 2) offset -= N;
            if (offset < -N / 2) offset += N;

            // Only render cards that are close to the viewport
            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible) return null;

            // Compute transforms based on offset
            const zDepth = isMobile ? -80 : -180;
            const tiltAngle = isMobile ? 20 : 35;
            const scaleReduction = isMobile ? 0.15 : 0.12;
            const absOffset = Math.abs(offset);

            const x = offset * xSpacing;
            const z = absOffset * zDepth;
            const rotateY = -offset * tiltAngle;
            const scale = Math.max(0.6, 1.15 - absOffset * scaleReduction);
            const opacity = Math.max(0, 0.95 - absOffset * 0.28);
            const zIndex = 10 - absOffset;

            const isActive = offset === 0;

            return (
              <motion.div
                key={item.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={() => handleCardClick(idx, item.id, item.url)}
                style={{
                  position: 'absolute',
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  borderRadius: '28px',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  zIndex: zIndex,
                  boxShadow: isActive 
                    ? `0 24px 60px ${item.glow}, inset 0 1px 0 rgba(255,255,255,0.4)`
                    : '0 8px 32px rgba(0, 0, 0, 0.15)',
                  background: 'white',
                  overflow: 'hidden',
                  userSelect: 'none',
                }}
                animate={{
                  x: x,
                  z: z,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26,
                }}
                whileHover={isActive ? {
                  scale: scale * 1.03,
                  y: -10,
                  transition: { duration: 0.2 }
                } : undefined}
              >
                {/* Card Content Outer */}
                <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  {/* Card Background Gradient */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: item.grad,
                    zIndex: 0,
                  }} />

                  {/* Radial shine overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
                    zIndex: 1,
                  }} />

                  {/* Content Container */}
                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    padding: isMobile ? '20px' : '28px',
                    color: 'white',
                  }}>
                    {/* Top Section */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', height: '24px' }}>
                      {/* Small Active Badge */}
                      {isActive && (
                        <div style={{
                          background: 'rgba(255,255,255,0.25)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          border: '1px solid rgba(255,255,255,0.3)',
                        }}>
                          Fokus
                        </div>
                      )}
                    </div>

                    {/* Center Section: Large Glowing Icon */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                      <motion.div
                        animate={isActive ? {
                          scale: [1, 1.05, 1],
                          y: [0, -6, 0]
                        } : {}}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "easeInOut"
                        }}
                        style={{
                          width: isMobile ? '70px' : '100px',
                          height: isMobile ? '70px' : '100px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.12)',
                          backdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 16px 40px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.15)',
                        }}
                      >
                        <item.Icon size={isMobile ? 32 : 48} color="white" />
                      </motion.div>
                    </div>

                    {/* Bottom Section: Details */}
                    <div>
                      <h3 style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: isMobile ? '16px' : '22px',
                        fontWeight: 800,
                        margin: 0,
                        textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        lineHeight: 1.2,
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: isMobile ? '11px' : '13px',
                        opacity: 0.85,
                        margin: '6px 0 0 0',
                        textShadow: '0 1px 4px rgba(0,0,0,0.15)',
                      }}>
                        {item.desc}
                      </p>

                      {/* Call-to-action button inside the card for center focus */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          style={{
                            marginTop: '16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'white',
                            color: '#1E293B',
                            padding: isMobile ? '6px 14px' : '8px 18px',
                            borderRadius: '12px',
                            fontSize: isMobile ? '10.5px' : '12px',
                            fontWeight: 700,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          }}
                        >
                          Buka Modul
                          <ChevronRight size={isMobile ? 12 : 14} />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Control Panel (Prev/Next, Play/Pause, Indicators) */}
      <div 
        className="carousel-controls"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginTop: isMobile ? '20px' : '30px',
          width: '100%',
        }}
      >
        {/* Navigation buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={handlePrev}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'white', border: '1px solid #E2E8F0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#1E293B',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <button 
            onClick={() => setIsPlaying(p => !p)}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: '#2563EB', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white',
              boxShadow: '0 4px 16px rgba(37,99,235,0.25)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button 
            onClick={handleNext}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'white', border: '1px solid #E2E8F0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#1E293B',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === currentIndex ? '#2563EB' : '#CBD5E1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
