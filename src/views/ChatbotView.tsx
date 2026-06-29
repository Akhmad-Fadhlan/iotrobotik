import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Link as LinkIcon,
  HelpCircle
} from 'lucide-react';
import { mockDb } from '../services/db';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  link?: { label: string; tab: string };
  externalLink?: string;
  timestamp: string;
}

export default function ChatbotView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Halo! Saya Asisten AI Hub Robotik IDN. Saya dilatih menggunakan dokumen materi, RPPM, SOP, dan inventaris lab. Ada yang bisa saya bantu hari ini?',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'Di mana source code Tinybit Bluetooth?',
    'RPPM Smart Parking ada?',
    'Project apa yang menggunakan ESP32?',
    'Materi setelah Tinybit apa?',
    'Siapa guru yang mengajar Computer Vision?'
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getSystemResponse = (query: string): Omit<Message, 'sender' | 'timestamp'> => {
    const q = query.toLowerCase();
    
    if (q.includes('bluetooth') || q.includes('source code tinybit')) {
      return {
        text: 'Source code untuk **Tinybit Bluetooth Controller** tersedia di repositori Github resmi. Anda dapat langsung mengunduh file Makecode Hex atau melakukan clone menggunakan git command di panel Source Code.',
        link: { label: 'Buka Source Code Repository', tab: 'source-code' }
      };
    }
    
    if (q.includes('parking') || q.includes('rppm smart parking')) {
      return {
        text: 'Ya, dokumen RPPM untuk project **Smart Parking System** tersedia di Project Library. Anda dapat membukanya melalui folder Google Drive yang tersemat pada detail project tersebut.',
        link: { label: 'Lihat Project Library', tab: 'projects' }
      };
    }
    
    if (q.includes('esp32')) {
      // Find projects using ESP32
      const projects = mockDb.getProjects().filter(p => p.hardware.some(h => h.includes('ESP32')));
      const names = projects.map(p => `• **${p.name}** (${p.difficulty})`).join('\n');
      return {
        text: `Berikut adalah proyek di Project Library yang menggunakan microcontroller **ESP32**:\n\n${names}\n\nAnda dapat membuka tab Project Library untuk mengunduh modul instruksi dan rangkaian masing-masing proyek.`,
        link: { label: 'Buka Project Library', tab: 'projects' }
      };
    }
    
    if (q.includes('setelah tinybit') || q.includes('materi setelah tinybit')) {
      return {
        text: 'Berdasarkan **Roadmap Kurikulum Kelas 7**, setelah menyelesaikan materi pemrograman robot **Tinybit**, materi selanjutnya adalah **Microbit Basic** (mengenal pin out, display LED, dan sensor internal) sebelum masuk ke IoT Basic.',
        link: { label: 'Buka Draft Kurikulum', tab: 'kurikulum' }
      };
    }
    
    if (q.includes('computer vision') || q.includes('guru') && q.includes('vision')) {
      // Let's find who teaches CV or check lessons
      const cvTeacher = mockDb.getLessons().find(l => l.topic === 'Computer Vision')?.creator || 'Fajar Nugraha';
      return {
        text: `Guru yang menyusun modul dan mengajarkan materi **Computer Vision** (Kelas 8) adalah **${cvTeacher}**. Anda dapat melihat profil lengkap dan kontak beliau di menu Guru & Teknisi.`,
        link: { label: 'Lihat Profil Guru', tab: 'people' }
      };
    }

    if (q.includes('inventaris') || q.includes('alat') || q.includes('solder') || q.includes('microbit')) {
      const inv = mockDb.getInventory();
      const match = inv.filter(i => q.includes(i.name.toLowerCase()) || q.includes(i.category.toLowerCase()));
      if (match.length > 0) {
        const list = match.map(m => `• **${m.name}** (${m.code}) - Status: *${m.status}* di *${m.location}*`).join('\n');
        return {
          text: `Hasil pencarian inventaris lab terkait query Anda:\n\n${list}\n\nAnda dapat meminjam atau mengupdate statusnya langsung di menu Inventaris.`,
          link: { label: 'Buka Inventaris LAB', tab: 'inventory' }
        };
      }
    }

    // Default reply using mock database query heuristics
    return {
      text: 'Maaf, saya tidak dapat menemukan dokumen spesifik tentang hal itu. Namun, Anda dapat mencari informasi tersebut menggunakan pencarian global di bagian atas website, atau menavigasi ke kategori terkait seperti **Draft Kurikulum** atau **Project Library**.'
    };
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate RAG response delay
    setTimeout(() => {
      const response = getSystemResponse(textToSend);
      const botMsg: Message = {
        sender: 'bot',
        text: response.text,
        link: response.link,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-4 animate-fade-in">
      
      {/* View Header */}
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="text-violet-600 animate-pulse" size={22} />
          Asisten AI Hub Robotik (RAG Simulator)
        </h2>
        <p className="text-[12px] text-slate-500 mt-1">
          Tanyakan apa saja seputar kurikulum, materi ajar, RPPM project, SOP penggunaan robot, dan inventaris lab.
        </p>
      </div>

      {/* Main Chat Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        
        {/* Chat Window (Col 1-3) */}
        <div className="lg:col-span-3 glass-card p-0 rounded-3xl flex flex-col min-h-0 border border-slate-100/50">
          
          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${
                  msg.sender === 'user' ? 'bg-blue-600' : 'bg-violet-600'
                }`}>
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5">
                  <div className={`rounded-3xl px-4 py-3 text-[12.5px] leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                  }`}>
                    {/* Render basic bold formatting for simulator response */}
                    {msg.text.split('\n').map((line, lineIdx) => {
                      // Basic bold matching **text**
                      const parts = line.split('**');
                      return (
                        <p key={lineIdx} className={lineIdx > 0 ? 'mt-1.5' : ''}>
                          {parts.map((part, partIdx) => 
                            partIdx % 2 === 1 ? <strong key={partIdx} className="font-extrabold">{part}</strong> : part
                          )}
                        </p>
                      );
                    })}
                  </div>

                  {/* Recommendation action link inside bot response */}
                  {msg.sender === 'bot' && msg.link && (
                    <button
                      onClick={() => {
                        // We need a way to communicate tab change to parent.
                        // For convenience, we can dispatch a custom event that App.tsx listens to!
                        const event = new CustomEvent('changeTab', { detail: msg.link?.tab });
                        window.dispatchEvent(event);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 px-3 py-1.5 text-[11px] font-bold border border-violet-200/50 transition-colors"
                    >
                      <LinkIcon size={12} />
                      <span>{msg.link.label}</span>
                    </button>
                  )}

                  <span className={`text-[9px] text-slate-400 block px-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
                  <Bot size={14} />
                </div>
                <div className="bg-white border border-slate-100 rounded-3xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-slate-100 bg-white/40 backdrop-blur-md rounded-b-[28px]">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Tanyakan sesuatu... (contoh: 'Project apa yang pakai ESP32?')"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="glass-input flex-1 py-3 text-[13px] rounded-2xl"
              />
              <button
                type="submit"
                className="glass-button bg-violet-600 hover:bg-violet-700 shadow-violet-500/10 hover:shadow-violet-500/20 py-3 rounded-2xl"
              >
                <Send size={15} />
              </button>
            </form>
          </div>

        </div>

        {/* Suggested Questions (Col 4) */}
        <div className="space-y-4">
          <h3 className="font-heading text-[14.5px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <HelpCircle size={15} className="text-violet-500" />
            Rekomendasi Pertanyaan
          </h3>
          <div className="space-y-2.5">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="w-full text-left p-3.5 rounded-2xl border border-slate-200/50 bg-white/60 hover:bg-violet-50/50 hover:border-violet-300 text-[12px] text-slate-700 font-medium transition-all hover:scale-[1.01] hover:shadow-sm"
              >
                "{q}"
              </button>
            ))}
          </div>
          <div className="glass-card p-4 rounded-2xl bg-violet-50/20 border border-violet-100/30 text-[11px] text-slate-500 leading-normal">
            <span className="font-bold text-violet-700 block mb-0.5">Teknologi RAG (Simulasi):</span>
            Asisten ini menyaring database dinamis materi ajar dan daftar guru untuk menjawab pertanyaan Anda secara tepat sasaran.
          </div>
        </div>

      </div>

    </div>
  );
}
