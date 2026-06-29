import { useState } from 'react';
import { 
  Code2, 
  Search, 
  Copy, 
  Check, 
  ExternalLink,
  Cpu
} from 'lucide-react';

interface RepoCode {
  id: string;
  title: string;
  category: string;
  board: 'ESP32 NodeMCU' | 'Micro:bit V2' | 'Jetson Nano' | 'Python PC';
  description: string;
  githubUrl: string;
  cloneCmd: string;
}

export default function SourceCodeView() {
  const [searchVal, setSearchVal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const repos: RepoCode[] = [
    {
      id: 'RC_1',
      title: 'Tinybit Bluetooth Gamepad Controller',
      category: 'Tinybit',
      board: 'Micro:bit V2',
      description: 'Makecode blocks and javascript code to decode gamepad commands from bluetooth HC-05 serial signals.',
      githubUrl: 'https://github.com/idn-robotics/tinybit-bluetooth',
      cloneCmd: 'git clone https://github.com/idn-robotics/tinybit-bluetooth.git'
    },
    {
      id: 'RC_2',
      title: 'Tinybit Hand Gesture Controller Sender/Receiver',
      category: 'Tinybit',
      board: 'Micro:bit V2',
      description: 'Radio transmission code mapping accelerometer angles (pitch & roll) into motor speeds for receiver car.',
      githubUrl: 'https://github.com/idn-robotics/tinybit-gesture',
      cloneCmd: 'git clone https://github.com/idn-robotics/tinybit-gesture.git'
    },
    {
      id: 'RC_3',
      title: 'Tinybit PID Line Follower Sketch',
      category: 'Tinybit',
      board: 'Micro:bit V2',
      description: 'Mathematical PID control implementation using reflectance sensor feedback to smoothly steer motors.',
      githubUrl: 'https://github.com/idn-robotics/tinybit-line-pid',
      cloneCmd: 'git clone https://github.com/idn-robotics/tinybit-line-pid.git'
    },
    {
      id: 'RC_4',
      title: 'ESP32 Blynk Smart Trash Bin Firmware',
      category: 'IoT Smart Project',
      board: 'ESP32 NodeMCU',
      description: 'C++ Arduino code reading HC-SR04 sonar and updating Blynk cloud slider for trash depth monitoring.',
      githubUrl: 'https://github.com/idn-robotics/smart-trash-esp32',
      cloneCmd: 'git clone https://github.com/idn-robotics/smart-trash-esp32.git'
    },
    {
      id: 'RC_5',
      title: 'ESP32 Soil Moisture Telegram Bot Relay',
      category: 'IoT Smart Project',
      board: 'ESP32 NodeMCU',
      description: 'Arduino sketch connecting Bot API to trigger water pumps via relay when kelembaban tanah drops.',
      githubUrl: 'https://github.com/idn-robotics/smart-watering',
      cloneCmd: 'git clone https://github.com/idn-robotics/smart-watering.git'
    },
    {
      id: 'RC_6',
      title: 'OpenCV Camera HSV Color Tracker',
      category: 'Computer Vision',
      board: 'Python PC',
      description: 'Python script for webcam HSV color masking, erosion/dilation filter, and drawing object center tracking overlay.',
      githubUrl: 'https://github.com/idn-robotics/opencv-color-track',
      cloneCmd: 'git clone https://github.com/idn-robotics/opencv-color-track.git'
    },
    {
      id: 'RC_7',
      title: 'ESP32 Local RFID Barrier Web Server',
      category: 'IoT Smart Project',
      board: 'ESP32 NodeMCU',
      description: 'Firmware containing ESPAsyncWebServer, handling RFID tag scans and updating a local status page in real time.',
      githubUrl: 'https://github.com/idn-robotics/smart-parking',
      cloneCmd: 'git clone https://github.com/idn-robotics/smart-parking.git'
    }
  ];

  const handleCopy = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = repos.filter(r => 
    r.title.toLowerCase().includes(searchVal.toLowerCase()) ||
    r.board.toLowerCase().includes(searchVal.toLowerCase()) ||
    r.category.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-800">
            Repository Source Code
          </h2>
          <p className="text-[12px] text-slate-500 mt-1">
            Repositori kode dan firmware proyek pembelajaran robotik siap pakai (ready-to-flash).
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari board atau nama repo..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="glass-input w-full pl-10 text-[12.5px] py-2"
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((repo) => (
          <div key={repo.id} className="glass-card p-6 rounded-3xl flex flex-col justify-between border hover:border-blue-300">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="badge badge-primary text-[10px] font-bold">{repo.category}</span>
                <span className="badge badge-purple text-[10px] font-bold flex items-center gap-1">
                  <Cpu size={10} />
                  {repo.board}
                </span>
              </div>

              <h3 className="font-heading text-[14.5px] font-bold text-slate-800">
                {repo.title}
              </h3>
              <p className="text-[12px] text-slate-500 mt-2 leading-relaxed">
                {repo.description}
              </p>
            </div>

            {/* Git Clone Box */}
            <div className="mt-5 space-y-4">
              <div className="relative flex items-center bg-slate-950 text-slate-200 p-3 rounded-2xl border border-slate-800 font-mono text-[11px] overflow-hidden select-all">
                <div className="flex-1 overflow-x-auto whitespace-nowrap pr-8 scrollbar-thin">
                  {repo.cloneCmd}
                </div>
                <button
                  onClick={() => handleCopy(repo.cloneCmd, repo.id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy command"
                >
                  {copiedId === repo.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                <a
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Code2 size={14} />
                  <span>GitHub Repository</span>
                </a>

                <a
                  href={`${repo.githubUrl}/archive/refs/heads/main.zip`}
                  className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline"
                >
                  Download .ZIP
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
