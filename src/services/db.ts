export interface LessonLink {
  label: string;
  url: string;
}

export interface Lesson {
  id: string;
  title: string;
  classLevel: '7' | '8';
  topic: string;
  duration: string;
  driveLinks: LessonLink[];
  creator: string;
}

export interface CurriculumSubMateri {
  name: string;
  ref?: string;
  link?: string;
}

export interface CurriculumSubject {
  id: string;
  title: string;
  gradeLevel: '7' | '8';
  semester: string;
  icon: string;
  desc: string;
  duration: string;
  level: string;
  type: string;
  status: 'Selesai' | 'Sedang Berjalan' | 'Belum Dimulai';
  subMateri: CurriculumSubMateri[];
  outputs: string[];
  pic: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  description: string;
  objectives: string;
  competencies: string;
  hardware: string[];
  software: string[];
  duration: string;
  driveLink: string;
  githubLink: string;
  author: string;
  year: string;
  screenshot?: string;
  curriculumId?: string; // Menghubungkan ke Kurikulum
}

export interface Teacher {
  id: string;
  name: string;
  branch: 'Sentul' | 'Jonggol' | 'Pamijahan' | 'Solo' | 'Akhwat';
  classLevel: '7' | '8' | '7 & 8';
  email: string;
  phone: string;
  photo: string;
  signature?: string;
}

export interface Technician {
  id: string;
  name: string;
  branch: 'Sentul' | 'Jonggol' | 'Pamijahan' | 'Solo' | 'Akhwat';
  email: string;
  phone: string;
  photo: string;
}

export interface SopRobot {
  id: string;
  title: string;
  robotName: string;
  steps: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  code: string;
  category: 'Sensor' | 'Microcontroller' | 'Robot Kit' | 'Mechanical' | 'Tools';
  status: 'Tersedia' | 'Dipinjam' | 'Perbaikan';
  condition: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  location: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
}

export interface SystemConfig {
  spreadsheetId: string;
  driveFolderId: string;
  appsScriptUrl?: string; // Tautan Deploy Web App Apps Script
  schoolName: string;
  chatbotModel: string;
  isInitialized: boolean;
  lmsUrl: string;
  totalStudents?: string; // Jumlah siswa
}



export interface Student {
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

export interface SubMateriProgressItem {
  name: string;
  completed: boolean;
  completedAt?: string;
}

export interface TeacherProgress {
  id: string;
  teacherId: string;
  teacherName: string;
  branch: string;
  subjectId: string;
  subjectTitle: string;
  gradeLevel: '7' | '8';
  semester: string;
  subMateriProgress: SubMateriProgressItem[];
}

const INITIAL_TEACHERS: Teacher[] = [
  { id: 'T_1', name: 'Ahmad Fauzi', branch: 'Sentul', classLevel: '7', email: 'ahmad.fauzi@idn.sch.id', phone: '081234567890', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
  { id: 'T_2', name: 'Rizki Maulana', branch: 'Pamijahan', classLevel: '8', email: 'rizki.maulana@idn.sch.id', phone: '082345678901', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 'T_3', name: 'Zainal Abidin', branch: 'Jonggol', classLevel: '7 & 8', email: 'zainal.abidin@idn.sch.id', phone: '083456789012', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
  { id: 'T_4', name: 'Laila Fitriani', branch: 'Akhwat', classLevel: '7', email: 'laila.fitriani@idn.sch.id', phone: '084567890123', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
  { id: 'T_5', name: 'Fajar Nugraha', branch: 'Solo', classLevel: '8', email: 'fajar.nugraha@idn.sch.id', phone: '085678901234', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' }
];

const INITIAL_TECHNICIANS: Technician[] = [
  { id: 'TEC_1', name: 'Dani Kusuma', branch: 'Sentul', email: 'dani.kusuma@idn.sch.id', phone: '086789012345', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
  { id: 'TEC_2', name: 'Hendri Setiawan', branch: 'Jonggol', email: 'hendri.setiawan@idn.sch.id', phone: '087890123456', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' }
];

const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'M_1', title: 'Smart Trashbin', classLevel: '7', topic: 'Microbit',
    duration: '3 Minggu (4 JP)',
    driveLinks: [
      { label: 'Modul Presentasi', url: 'https://docs.google.com/presentation/d/1yuJzz-Hh4nJzL0BtJeKIWrrAOzg9V2pG/edit?usp=drive_link' },
      { label: 'Canva Integrasi', url: 'https://canva.link/fz5kuw9d8j9zdja' }
    ],
    creator: 'Mr Fadhlan'
  },
  {
    id: 'M_2', title: 'Tinybit Bluetooth Controller', classLevel: '7', topic: 'Tinybit',
    duration: '3 Minggu (4 JP)',
    driveLinks: [
      { label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p1_drive' }
    ],
    creator: 'Mr Alfi'
  },
  {
    id: 'M_3', title: 'Tinybit Hand Gesture', classLevel: '7', topic: 'Tinybit',
    duration: '3 Minggu (4 JP)',
    driveLinks: [
      { label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p2_drive' }
    ],
    creator: 'Mr Alfi'
  },
  {
    id: 'M_4', title: 'Smart Watering Plant', classLevel: '7', topic: 'IoT Basic',
    duration: '4 Minggu (6 JP)',
    driveLinks: [
      { label: 'Modul K3', url: 'https://drive.google.com/file/d/18GPMXi9-nlijGMKDGzuXay0cJu6ZIdCD/view' }
    ],
    creator: 'Mr Fadhlan'
  },
  {
    id: 'M_5', title: 'Tinybit Line Follower', classLevel: '7', topic: 'Tinybit',
    duration: '4 Minggu (6 JP)',
    driveLinks: [
      { label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p3_drive' }
    ],
    creator: 'Mr Fadhlan'
  },
  {
    id: 'M_6', title: 'Smart Parking', classLevel: '7', topic: 'IoT Basic',
    duration: '3 Minggu (4 JP)',
    driveLinks: [
      { label: 'Modul K3', url: 'https://drive.google.com/file/d/1hRZ1vqyA_ixJOPkkFh7Ab0oSh8rxUeX4/view' }
    ],
    creator: 'Mr Alfi'
  },
  {
    id: 'M_7', title: 'Robot Bluetooth Controller', classLevel: '8', topic: 'Python Robot',
    duration: '3 Minggu (4 JP)',
    driveLinks: [
      { label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p1_drive' }
    ],
    creator: 'Mr. Rahmat Fadlan'
  },
  {
    id: 'M_8', title: 'Robot Hand Gesture', classLevel: '8', topic: 'AI Robot',
    duration: '3 Minggu (4 JP)',
    driveLinks: [
      { label: 'Teachable Machine', url: 'https://teachablemachine.withgoogle.com/' }
    ],
    creator: 'Mr. Rahmat Fadlan'
  },
  {
    id: 'M_9', title: 'Smart Parking AI', classLevel: '8', topic: 'Computer Vision',
    duration: '3 Minggu (4 JP)',
    driveLinks: [
      { label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p6_drive' }
    ],
    creator: 'Mr. Rahmat Fadlan'
  },
  {
    id: 'M_10', title: 'Robot Line Follower', classLevel: '8', topic: 'Python Robot',
    duration: '4 Minggu (8 JP)',
    driveLinks: [
      { label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p3_drive' }
    ],
    creator: 'Ms. Nadia'
  },
  {
    id: 'M_11', title: 'Robot Transporter', classLevel: '8', topic: 'Python Robot',
    duration: '4 Minggu (6 JP)',
    driveLinks: [
      { label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p2_drive' }
    ],
    creator: 'Ms. Nadia'
  },
  {
    id: 'M_12', title: 'Smart Home', classLevel: '8', topic: 'ESP32 IoT',
    duration: '4 Minggu (8 JP)',
    driveLinks: [
      { label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p7_drive' }
    ],
    creator: 'Mr. Rizal'
  },
  {
    id: 'M_13', title: 'Smart Greenhouse', classLevel: '8', topic: 'ESP32 IoT',
    duration: '4 Minggu (6 JP)',
    driveLinks: [
      { label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p7_drive' }
    ],
    creator: 'Mr. Rizal'
  },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'P_1',
    name: 'Smart Trashbin',
    category: 'IoT Smart Project',
    difficulty: 'Mudah',
    description: 'Proyek tempat sampah pintar berbasis Microbit yang terbuka otomatis menggunakan servo saat mendeteksi objek.',
    objectives: 'Mampu mendeteksi keberadaan objek secara otomatis menggunakan sensor ultrasonik.',
    competencies: 'Pemrograman Makecode, Integrasi Servo SG90, Sensor Ultrasonik.',
    hardware: ['Micro:bit V2', 'Sensor Ultrasonik HC-SR04', 'Servo SG90', 'Battery Pack'],
    software: ['MakeCode', 'ChatGPT', 'Google Lens'],
    duration: '3 Minggu',
    driveLink: 'https://docs.google.com/presentation/d/1yuJzz-Hh4nJzL0BtJeKIWrrAOzg9V2pG/edit?usp=drive_link',
    githubLink: '',
    author: 'Mr Fadhlan',
    year: '2027',
    curriculumId: 'smart-trashbin'
  },
  {
    id: 'P_2',
    name: 'Tinybit Bluetooth Controller',
    category: 'Tinybit',
    difficulty: 'Mudah',
    description: 'Membuat aplikasi web controller dan memprogram Tinybit Robot agar bisa dikendalikan secara nirkabel via Bluetooth.',
    objectives: 'Mampu mengontrol pergerakan robot Tinybit via koneksi Bluetooth.',
    competencies: 'Konektivitas Bluetooth, Pemrograman Event-Driven, Logika Driver Motor.',
    hardware: ['Robot Tinybit', 'Micro:bit V2', 'Smartphone / Laptop'],
    software: ['MakeCode', 'Lovable', 'Vercel', 'ChatGPT'],
    duration: '3 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p1_drive',
    githubLink: 'https://github.com/idn-robotics/tinybit-bluetooth',
    author: 'Mr Alfi',
    year: '2027',
    curriculumId: 'tinybit-bluetooth'
  },
  {
    id: 'P_3',
    name: 'Tinybit Hand Gesture',
    category: 'Tinybit',
    difficulty: 'Mudah',
    description: 'Mengendalikan robot Tinybit kedua dengan gerakan tangan (accelerometer) dari microbit transmitter.',
    objectives: 'Mampu mengklasifikasikan gestur tangan menggunakan Teachable Machine untuk mengendalikan robot.',
    competencies: 'Komunikasi Radio Frekuensi, Analisis Sensor Accelerometer, Deteksi Gestur.',
    hardware: ['2x Micro:bit V2', 'Robot Tinybit', 'Battery Pack'],
    software: ['Teachable Machine (Google)', 'MakeCode', 'ChatGPT'],
    duration: '3 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p2_drive',
    githubLink: 'https://github.com/idn-robotics/tinybit-gesture',
    author: 'Mr Alfi',
    year: '2027',
    curriculumId: 'tinybit-gesture'
  },
  {
    id: 'P_4',
    name: 'Smart Watering Plant',
    category: 'IoT Smart Project',
    difficulty: 'Mudah',
    description: 'Membangun penyiram tanaman otomatis berbasis kelembaban tanah dengan notifikasi telegram.',
    objectives: 'Mampu menyiram tanaman secara otomatis berdasarkan sensor kelembaban tanah.',
    competencies: 'Sensor Soil Moisture, Relay Switch, Pompa Air 5V, Notifikasi Telegram.',
    hardware: ['ESP32 NodeMCU', 'Soil Moisture Sensor', 'Relay 5V', 'Pompa Air Mini 5V'],
    software: ['Arduino IDE', 'Telegram Bot API', 'ChatGPT'],
    duration: '3 Minggu',
    driveLink: 'https://drive.google.com/file/d/18GPMXi9-nlijGMKDGzuXay0cJu6ZIdCD/view',
    githubLink: 'https://github.com/idn-robotics/smart-watering',
    author: 'Mr Fadhlan',
    year: '2027',
    curriculumId: 'smart-watering-plant'
  },
  {
    id: 'P_5',
    name: 'Tinybit Line Follower',
    category: 'Tinybit',
    difficulty: 'Mudah',
    description: 'Robot Tinybit mengikuti garis hitam dengan algoritma PID agar gerakan lebih presisi dan smooth.',
    objectives: 'Mampu memprogram robot Tinybit untuk menyusuri lintasan garis hitam menggunakan sensor inframerah.',
    competencies: 'Algoritma PID, Sensor Kalibrasi, Optimasi Kecepatan Motor.',
    hardware: ['Robot Tinybit', 'Micro:bit V2', 'Track Line Follower'],
    software: ['MakeCode', 'ChatGPT', 'Claude'],
    duration: '3 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p3_drive',
    githubLink: 'https://github.com/idn-robotics/tinybit-line-pid',
    author: 'Mr Fadhlan',
    year: '2027',
    curriculumId: 'tinybit-line'
  },
  {
    id: 'P_6',
    name: 'Smart Parking',
    category: 'IoT Smart Project',
    difficulty: 'Mudah',
    description: 'Sistem palang pintu parkir otomatis menggunakan RFID reader dan sensor infra merah.',
    objectives: 'Mampu merancang pintu gerbang parkir otomatis menggunakan kartu RFID.',
    competencies: 'RFID SPI Protocol, Servo Gate Control, Logika Deteksi Infrared.',
    hardware: ['ESP32', 'RFID RC522 Reader', 'Servo SG90', 'Sensor Infrared Obstacle'],
    software: ['Arduino IDE', 'ChatGPT', 'Claude'],
    duration: '3 Minggu',
    driveLink: 'https://drive.google.com/file/d/1hRZ1vqyA_ixJOPkkFh7Ab0oSh8rxUeX4/view',
    githubLink: 'https://github.com/idn-robotics/smart-parking',
    author: 'Mr Alfi',
    year: '2027',
    curriculumId: 'smart-parking'
  },
  {
    id: 'P_7',
    name: 'Robot Bluetooth Controller',
    category: 'AI Robotic Project',
    difficulty: 'Sedang',
    description: 'Mengendalikan robot beroda 4 berbasis python menggunakan modul Driver L298N dan koneksi Bluetooth.',
    objectives: 'Mampu mengendalikan gerakan robot beroda 4 berbasis Python via Bluetooth.',
    competencies: 'Pemrograman Python, Driver Motor L298N, Serial Bluetooth communication.',
    hardware: ['Robot Car Chassis', 'Raspberry Pi / Jetson Nano', 'Driver Motor L298N', 'Bluetooth Module'],
    software: ['Python 3', 'Lovable', 'Vercel', 'ChatGPT'],
    duration: '5 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p1_drive',
    githubLink: 'https://github.com/idn-robotics/robot-bluetooth',
    author: 'Mr. Rahmat Fadlan',
    year: '2026',
    curriculumId: 'robot-bluetooth-controller'
  },
  {
    id: 'P_8',
    name: 'Robot Hand Gesture',
    category: 'AI Robotic Project',
    difficulty: 'Sedang',
    description: 'Pengembangan web AI Controller berbasis Teachable Machine untuk mengontrol robot beroda menggunakan isyarat kamera.',
    objectives: 'Mampu melatih model machine learning gestur tangan dan menghubungkannya ke kontrol robot Python.',
    competencies: 'Computer Vision, WebSockets Communication, AI Model Training.',
    hardware: ['Robot Car Chassis', 'Webcam', 'PC / Laptop', 'Microcontroller'],
    software: ['Python', 'Teachable Machine', 'WebSockets', 'Lovable'],
    duration: '5 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p2_drive',
    githubLink: 'https://github.com/idn-robotics/robot-gesture',
    author: 'Mr. Rahmat Fadlan',
    year: '2026',
    curriculumId: 'robot-hand-gesture'
  },
  {
    id: 'P_9',
    name: 'Smart Parking AI',
    category: 'Computer Vision Project',
    difficulty: 'Sedang',
    description: 'Otomatisasi palang parkir pintar menggunakan Computer Vision Python dan database.',
    objectives: 'Mampu mendeteksi plat nomor kendaraan atau slot parkir kosong menggunakan OpenCV Python.',
    competencies: 'OpenCV Image Processing, SQLite Database Integration, Python GUI.',
    hardware: ['Camera Module', 'Palang Parkir Prototip', 'ESP32 / Arduino'],
    software: ['Python 3', 'OpenCV', 'SQLite', 'ChatGPT'],
    duration: '5 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p6_drive',
    githubLink: 'https://github.com/idn-robotics/parking-ai',
    author: 'Mr Fadhlan',
    year: '2026',
    curriculumId: 'parking-ai'
  },
  {
    id: 'P_10',
    name: 'Robot Line Follower',
    category: 'AI Robotic Project',
    difficulty: 'Sedang',
    description: 'Pemrograman Python tingkat lanjut pada robot untuk menyusuri track garis hitam dengan algoritma PID.',
    objectives: 'Mampu menerapkan algoritma PID tingkat lanjut menggunakan pemrograman Python pada robot line follower.',
    competencies: 'Algoritma PID, Python Sensor Reading, Motor Speed Calibration.',
    hardware: ['Python Robot Kit', 'IR Sensor Array', 'Chassis & DC Motors'],
    software: ['Python 3', 'ChatGPT', 'Claude'],
    duration: '5 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p3_drive',
    githubLink: 'https://github.com/idn-robotics/robot-line-pid',
    author: 'Ms. Nadia',
    year: '2026',
    curriculumId: 'robot-line-follower'
  },
  {
    id: 'P_11',
    name: 'Robot Transporter',
    category: 'AI Robotic Project',
    difficulty: 'Sedang',
    description: 'Proyek merakit dan memprogram robot pengangkut barang dengan capit servo yang dikendalikan via Web App.',
    objectives: 'Mampu merakit mekanisme capit servo dan memprogramnya untuk memindahkan barang.',
    competencies: 'Mekanika capit servo, Pemrograman Python, Integrasi Web Controller.',
    hardware: ['Robot Car Chassis', 'Capit Robot Metal', 'Servo Motor MG996R', 'Microcontroller'],
    software: ['Python 3', 'Lovable', 'Vercel', 'ChatGPT'],
    duration: '5 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p2_drive',
    githubLink: 'https://github.com/idn-robotics/robot-transporter',
    author: 'Ms. Nadia',
    year: '2026',
    curriculumId: 'robot-transporter'
  },
  {
    id: 'P_12',
    name: 'Smart Home',
    category: 'IoT Smart Project',
    difficulty: 'Sulit',
    description: 'Membangun rumah pintar berbasis ESP32 dengan kendali relay nirkabel dan Firebase database.',
    objectives: 'Mampu menghubungkan ESP32 ke Firebase Realtime Database untuk memantau sensor dan kontrol lampu.',
    competencies: 'ESP32 Wi-Fi Client, Firebase SDK, Web Interface Dashboard, Relay Logic.',
    hardware: ['ESP32 NodeMCU', 'Sensor DHT11 / DHT22', 'Relay Module 4 Ch', 'Sensor Gas MQ2'],
    software: ['Arduino IDE', 'Firebase Console', 'Lovable', 'Vercel'],
    duration: '8 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p7_drive',
    githubLink: 'https://github.com/idn-robotics/smart-home-esp32',
    author: 'Mr. Rizal',
    year: '2027',
    curriculumId: 'smart-home'
  },
  {
    id: 'P_13',
    name: 'Smart Greenhouse',
    category: 'IoT Smart Project',
    difficulty: 'Sulit',
    description: 'Kubah tanaman mandiri dengan dashboard web real-time untuk memantau suhu dan kelembaban.',
    objectives: 'Mampu merancang sistem otomatisasi penyiraman dan sirkulasi udara rumah kaca berbasis WebSockets.',
    competencies: 'WebSockets real-time communication, Hysteresis Controller, Multi-sensor logging.',
    hardware: ['ESP32', 'DHT22 Temp/Humid Sensor', 'LDR Light Sensor', 'Relay Board', 'DC Fan', 'Water Pump'],
    software: ['Arduino IDE', 'WebSockets Server', 'Lovable', 'Vercel'],
    duration: '8 Minggu',
    driveLink: 'https://drive.google.com/drive/folders/p7_drive',
    githubLink: 'https://github.com/idn-robotics/smart-greenhouse',
    author: 'Mr. Rizal',
    year: '2027',
    curriculumId: 'smart-greenhouse'
  }
];

const INITIAL_CURRICULUM: CurriculumSubject[] = [
  {
    id: 'smart-trashbin',
    title: 'Smart Trashbin',
    gradeLevel: '7',
    semester: 'Semester 2',
    icon: 'trash',
    desc: 'Proyek tempat sampah pintar berbasis Microbit yang terbuka otomatis menggunakan servo saat mendeteksi objek.',
    duration: '3 Minggu',
    level: 'Pemula',
    type: 'Praktik Mandiri',
    status: 'Selesai',
    pic: 'Mr Fadhlan',
    subMateri: [
      { name: 'Fundamental Microbit', ref: 'Doc microbit: https://makecode.microbit.org/docs', link: 'fundamental microbit' },
      { name: 'Algoritma, konsep, dan komponen smart trashbin', link: 'algoritma smart trashbin' },
      { name: 'Pemrograman basic Makecode (variable, percabangan, looping, pins)', ref: 'Doc microbit: https://makecode.microbit.org/docs', link: 'https://canva.link/5qgqy3ds7ophpl5' },
      { name: 'Pemrograman Smart trashbin', link: 'https://canva.link/d3fipufedbmgp85' },
      { name: 'K3 dalam bekerja', ref: 'PEDOMAN K3 LAB.docx', link: 'https://docs.google.com/presentation/d/1yuJzz-Hh4nJzL0BtJeKIWrrAOzg9V2pG/edit?usp=drive_link&ouid=104394771420958359917&rtpof=true&sd=true' },
      { name: 'Integrasi hardware dan program smart trashbin', link: 'https://canva.link/fz5kuw9d8j9zdja' },
      { name: 'Chatgpt / Google Lens Sebagai pembantu pengenalan awal komponen', link: 'https://canva.link/qjbfa25g12kg3wn' }
    
    
    ],
    outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio']
  },
  {
    id: 'tinybit-bluetooth',
    title: 'Tinybit BT',
    gradeLevel: '7',
    semester: 'Semester 2',
    icon: 'bluetooth',
    desc: 'Membuat aplikasi web controller dan memprogram Tinybit Robot agar bisa dikendalikan secara nirkabel via Bluetooth.',
    duration: '3 Minggu',
    level: 'Pemula',
    type: 'Teori & Praktik',
    status: 'Selesai',
    pic: 'Mr Alfi',
    subMateri: [
      { name: 'Komunikasi Bluetooth', ref: 'bluetooth: https://www.elecfreaks.com/learn-en', link: 'https://canva.link/qbtjved7t7fae34' },
      { name: 'Fundamental Tinybit', ref: 'tinybit: https://www.yahboom.net/study/Tinybit-Pro', link: 'https://canva.link/7fly21p5sidqe5r' },
      { name: 'Pemrograman basic untuk menggerakkan tinybit', link: 'https://canva.link/rnojs4b9gn7132a' },
      { name: 'Integrasi' },
      { name: 'Pengembangan kontroller pada tinybit bluetooth controller' },
      { name: 'Teknik prompting lovable (chatgpt)' },
      { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', link: 'teknik prompting' }
    
    
    ],
    outputs: ['Aplikasi Web Controller', 'Video Demo']
  },
  {
    id: 'tinybit-gesture',
    title: 'Tinybit Gesture',
    gradeLevel: '7',
    semester: 'Semester 2',
    icon: 'hand',
    desc: 'Mengendalikan robot Tinybit kedua dengan gerakan tangan (accelerometer) dari microbit transmitter.',
    duration: '3 Minggu',
    level: 'Pemula',
    type: 'Teori & Praktik',
    status: 'Belum Dimulai',
    pic: 'Mr Alfi',
    subMateri: [
      { name: 'Sejarah AI', ref: 'Teachable Machine', link: 'Sejarah AI' },
      { name: 'Konsep AI dan cara kerja', ref: 'Buku AI Kemendikbud', link: 'Konsep AI' },
      { name: 'Faktor-faktor yang mempengaruhi pembuatan AI', link: 'Faktor pengaruh AI' },
      { name: 'Teachable machine', ref: 'Apa Itu Machine Learning?', link: 'https://canva.link/7l59t6qrbrpbqo4' },
      { name: 'Faktor yang mempengaruhi kualitas model AI pada teachable machine', link: 'https://canva.link/364c17kqf2sz7d4' },
      { name: 'Integrasi tinybit Hand Gesture', ref: 'Control Robot With Hand Gestures - CARDBOARD ROBOTS' },
      { name: 'Teknik prompting lovable (chatgpt)', ref: 'membuat web dengan ai' },
      { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', ref: '6 Teknik Prompting ChatGPT Agar Hasilnya Setara Kerja Expert - Argia Academy', link: 'https://docs.google.com/presentation/d/1R06DaJtlH_sF1lY-kkjfk2QNPAVU_KR6/edit?slide=id.p1#slide=id.p1' }
    
    
    ],
    outputs: ['Program Transmitter-Receiver', 'Video Demo']
  },
  {
    id: 'tinybit-line',
    title: 'Tinybit Line Follower',
    gradeLevel: '7',
    semester: 'Semester 2',
    icon: 'route',
    desc: 'Robot Tinybit mengikuti garis hitam dengan algoritma PID agar gerakan lebih presisi dan smooth.',
    duration: '3 Minggu',
    level: 'Pemula',
    type: 'Praktik Mandiri',
    status: 'Belum Dimulai',
    pic: 'Mr Fadhlan',
    subMateri: [
      { name: 'Fundamental Line Follower', link: 'fundamental line follower' },
      { name: 'Algoritma Line Follower', link: 'Algoritma Line Follower' },
      { name: 'Pemrograman basic dan lanjutan untuk menggerakkan line follower', link: 'Pemrograman line follower' },
      { name: 'Praktek dengan track sederhana', link: 'Pemrograman line follower' },
      { name: 'Teknik prompting (chatgpt / deepseek / claude)', link: 'teknik prompting' },
      { name: 'Tes dengan track advance (chatgpt / deepseek / claude)', ref: 'track advance dengan ai', link: 'Track advance line follower' }
    
    
    ],
    outputs: ['Robot Line Follower PID', 'Video Demo']
  },
  {
    id: 'smart-watering-plant',
    title: 'Smart Watering',
    gradeLevel: '7',
    semester: 'Semester 2',
    icon: 'sprout',
    desc: 'Membangun penyiram tanaman otomatis berbasis kelembaban tanah dengan notifikasi telegram.',
    duration: '3 Minggu',
    level: 'Pemula',
    type: 'Deploy Project',
    status: 'Selesai',
    pic: 'Mr Fadhlan',
    subMateri: [
      { name: 'Algoritma, konsep, dan komponen smart watering plant', link: 'https://docs.google.com/presentation/d/1IZLBFij0V2aRK15UeLotVumJg1eci6Uo/edit?usp=sharing&ouid=112099463869605700691&rtpof=true&sd=true' },
      { name: 'Pemrograman Smart watering plant', link: 'https://docs.google.com/presentation/d/1LEB59CeHilt6IkwNsXnAz_4BvICL7Qe5/edit?usp=drive_link&ouid=112099463869605700691&rtpof=true&sd=true' },
      { name: 'K3 dalam bekerja', ref: 'PEDOMAN K3 LAB.docx', link: 'https://drive.google.com/file/d/18GPMXi9-nlijGMKDGzuXay0cJu6ZIdCD/view?usp=drive_link' },
      { name: 'Integrasi hardware dan program smart watering plant', link: 'https://docs.google.com/presentation/d/1LEB59CeHilt6IkwNsXnAz_4BvICL7Qe5/edit?usp=drive_link&ouid=112099463869605700691&rtpof=true&sd=true' },
      { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur monitoring', link: 'https://docs.google.com/presentation/d/18ljOfjQpPwaGOj94h3F_uX3ukSTFMLOr/edit?usp=drive_link&ouid=112099463869605700691&rtpof=true&sd=true' }
    
    
    ],
    outputs: ['Hardware Penyiram Tanaman', 'Video Demo']
  },
  {
    id: 'smart-parking',
    title: 'Smart Parking',
    gradeLevel: '7',
    semester: 'Semester 2',
    icon: 'parking',
    desc: 'Sistem palang pintu parkir otomatis menggunakan RFID reader dan sensor infra merah.',
    duration: '3 Minggu',
    level: 'Pemula',
    type: 'Praktik Mandiri',
    status: 'Selesai',
    pic: 'Mr Alfi',
    subMateri: [
      { name: 'Algoritma, konsep, dan komponen smart', link: 'modul smart parking' },
      { name: 'Pemrograman Smart parking', link: 'https://canva.link/85b8zcozo27u4ft' },
      { name: 'K3 dalam bekerja', link: 'https://drive.google.com/file/d/1hRZ1vqyA_ixJOPkkFh7Ab0oSh8rxUeX4/view?usp=sharing' },
      { name: 'Integrasi hardware dan program smart parking', link: 'https://canva.link/wn3pd9uh5musbho' },
      { name: 'Teachable machine', ref: 'Apa Itu Machine Learning?', link: 'https://canva.link/7l59t6qrbrpbqo4' }
    
    
    ],
    outputs: ['Prototip Palang Parkir', 'Flyer Proyek']
  },
  // Kelas 8 Semester 3
  {
    id: 'robot-bluetooth-controller',
    title: 'Robot BT',
    gradeLevel: '8',
    semester: 'Semester 3',
    icon: 'bluetooth',
    desc: 'Mengendalikan robot beroda 4 berbasis python menggunakan modul Driver L298N dan koneksi Bluetooth.',
    duration: '5 Minggu',
    level: 'Menengah',
    type: 'Teori & Praktik',
    status: 'Belum Dimulai',
    pic: 'Mr. Rahmat Fadlan',
    subMateri: [
      { name: 'Komunikasi Bluetooth', ref: 'bluetooth: https://www.elecfreaks.com/learn-en', link: 'https://docs.google.com/presentation/d/17CRQvkqcS5YY2Lk1W_EVlmpTEbkET9JnpdNOatx3pKQ/edit?usp=sharing' },
      { name: 'Fundamental driver l298N', link: 'https://docs.google.com/presentation/d/15Vdbf_ehjL3n6GhVnsiZn9iSMiIZkOnbfmRKGIZojX0/edit?usp=sharing' },
      { name: 'Pemrograman python untuk menggerakkan motor', link: 'https://docs.google.com/presentation/d/1_uzwmtAwEvjc2jt8b1iaAmFAFVRCNdLo2F3EtOKb15E/edit?usp=sharing' },
      { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app controller', ref: 'membuat web dengan ai', link: 'https://docs.google.com/presentation/d/14Bhzum4DBnZHz18ajL2bfeX5-bHvEnE6POe1nyWF3X8/edit?usp=sharing' },
      { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', ref: 'teknik prompting', link: 'https://docs.google.com/presentation/d/1ZNYB5FgyAvQO3Fle6-EWr96qrxjV9Q83oZ1Fi4m3Scw/edit?usp=sharing' },
      { name: 'Integrasi', link: 'https://docs.google.com/presentation/d/1W3atKC3J8z4SorKL120tXboWuhJY640XGllqSQZ032o/edit?usp=sharing' }
    
    
    ],
    outputs: ['Aplikasi Web Controller Vercel', 'Video Demo']
  },
  {
    id: 'robot-hand-gesture',
    title: 'Robot Gesture',
    gradeLevel: '8',
    semester: 'Semester 3',
    icon: 'hand',
    desc: 'Pengembangan web AI Controller berbasis Teachable Machine untuk mengontrol robot beroda menggunakan isyarat kamera.',
    duration: '5 Minggu',
    level: 'Menengah',
    type: 'Praktik AI',
    status: 'Belum Dimulai',
    pic: 'Mr. Rahmat Fadlan',
    subMateri: [
      { name: 'Sejarah AI', ref: 'Robot Hand Gesture.pdf', link: 'https://docs.google.com/presentation/d/1oaC3_iL1vlkVhY-mtLmJm3nOH_xcEvEy/edit?usp=drive_link&ouid=113658299168731582914&rtpof=true&sd=true' },
      { name: 'Konsep AI dan cara kerja', link: 'https://drive.google.com/file/d/1XUkzLStxltnQVqLP2xDGG25oC86jpukC/view?usp=drive_link' },
      { name: 'Faktor-faktor yang mempengaruhi pembuatan AI', link: 'rahasia permodelan ai' },
      { name: 'Teachable machine', link: 'https://drive.google.com/file/d/1SJhXVP8tRxdIBlGibcH-2F-6w-sGr4w7/view?usp=drive_link' },
      { name: 'Faktor yang mempengaruhi kualitas model AI pada teachable machine', link: 'https://docs.google.com/presentation/d/1qEphLthnE9aUvmieQ1yXBntbBekeL05R/edit?usp=drive_link&ouid=113658299168731582914&rtpof=true&sd=true' },
      { name: 'Pemrograman python untuk robot hand gestures', link: 'https://makecode.microbit.org/S62132-14584-63645-60319' },
      { name: 'Integrasi', link: 'https://docs.google.com/presentation/d/1902dOdmDZos7HZK3GFGKSnoVN_lsHVfN/edit?usp=drive_link&ouid=113658299168731582914&rtpof=true&sd=true' },
      { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app AI', link: 'https://docs.google.com/presentation/d/1S4Y2VZpv5CeRhebC5FWNjf4u_7CrzEZO/edit?usp=drive_link&ouid=113658299168731582914&rtpof=true&sd=true' },
      { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', link: 'teknik prompting' }
    
    
    ],
    outputs: ['Model Teachable Machine', 'Video Demo']
  },
  {
    id: 'parking-ai',
    title: 'Parking AI',
    gradeLevel: '8',
    semester: 'Semester 3',
    icon: 'parking',
    desc: 'Otomatisasi palang parkir pintar menggunakan Computer Vision Python dan database.',
    duration: '5 Minggu',
    level: 'Menengah',
    type: 'Praktik database',
    status: 'Belum Dimulai',
    pic: 'Mr. Rahmat Fadlan',
    subMateri: [
      { name: 'Faktor-faktor yang mempengaruhi pembuatan AI', link: 'rahasia permodelan ai' },
      { name: 'Pemrograman python untuk smart parking', link: 'https://makecode.microbit.org/S82659-39430-34315-71540' },
      { name: 'Database', link: 'https://docs.google.com/presentation/d/1p53W65C62q_c3POPJxLl5saD27HMaG3c/edit?usp=drive_link&ouid=113658299168731582914&rtpof=true&sd=true' },
      { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app control dan monitor', ref: 'membuat web dengan ai', link: 'https://docs.google.com/presentation/d/11IlEOH6ISFiEQEOaQK1LcwWB56vOdPJy/edit?usp=drive_link&ouid=113658299168731582914&rtpof=true&sd=true' },
      { name: 'Pemrograman Smart parking', link: 'https://docs.google.com/presentation/d/1YAIlIHVF56Glr1DEz3LfOyUtJU3csruJ/edit?usp=drive_link&ouid=113658299168731582914&rtpof=true&sd=true' },
      { name: 'K3 dalam projek smart parking', link: 'k3' },
      { name: 'Integrasi hardware dan program smart parking AI', link: 'https://docs.google.com/presentation/d/15VPEcRH8diHF0s5alSJUCNrXILxCIgkV/edit?usp=drive_link&ouid=113658299168731582914&rtpof=true&sd=true' },
      { name: 'ChatGPT / Claude: brainstorming ide pengembangan smart parking', link: 'teknik prompting' }
    
    
    ],
    outputs: ['Sistem Smart Parking AI', 'Video Demo']
  },
  {
    id: 'robot-line-follower',
    title: 'Line Follower',
    gradeLevel: '8',
    semester: 'Semester 3',
    icon: 'route',
    desc: 'Pemrograman Python tingkat lanjut pada robot untuk menyusuri track garis hitam dengan algoritma PID.',
    duration: '5 Minggu',
    level: 'Menengah',
    type: 'Praktik Robotika',
    status: 'Belum Dimulai',
    pic: 'Ms. Nadia',
    subMateri: [
      { name: 'Fundamental Line Follower', link: 'https://docs.google.com/presentation/d/1SKlrYPtTg5844ptWnNcLqYPHp2rMT3M5SLFDa-fV3Mo/edit?usp=sharing' },
      { name: 'Algoritma Line Follower', link: 'https://docs.google.com/presentation/d/1ETGLF5zAujqcaxBEK_vA7os2sABlJw8VOmqXiluKOr0/edit?usp=sharing' },
      { name: 'Pemrograman python basic dan lanjutan untuk menggerakkan line follower', link: 'https://docs.google.com/presentation/d/1H0Gu6aJZjRrLf_JjLEhclqgVQf02cgC007Q5IIHnseA/edit?usp=sharing' },
      { name: 'Praktek dengan track sederhana', link: 'https://docs.google.com/presentation/d/1pEvJKqN9yzXjXRQovj3sm7zCfHUZXv_LHzsk-QwR-E8/edit?usp=sharing' },
      { name: 'Teknik prompting (chatgpt / deepseek / claude)', link: 'https://docs.google.com/presentation/d/1RFv5K4sBEk0gfAQDoKi-bcr1LEh8h4SY_RmfFritbyk/edit?usp=sharing' },
      { name: 'Tes dengan track advance (chatgpt / deepseek / claude)', link: 'https://docs.google.com/presentation/d/1sKbtq9lkWCKKnSErwqWryT6qz6T-d1zOcc3WrLkIsZk/edit?usp=sharing' }
    
    
    ],
    outputs: ['Robot Python Line Follower', 'Video Demo']
  },
  {
    id: 'robot-transporter',
    title: 'Transporter',
    gradeLevel: '8',
    semester: 'Semester 3',
    icon: 'package',
    desc: 'Proyek merakit dan memprogram robot pengangkut barang dengan capit servo yang dikendalikan via Web App.',
    duration: '5 Minggu',
    level: 'Menengah',
    type: 'Integrasi Proyek',
    status: 'Belum Dimulai',
    pic: 'Ms. Nadia',
    subMateri: [
      { name: 'Algoritma, konsep, dan komponen robot transporter', link: 'https://docs.google.com/presentation/d/131Kjv4T6P7gteRJ99w_cISCm6G7bbfGz8aB7O21903Q/edit?usp=sharing' },
      { name: 'Pemrograman python untuk robot transporter', link: 'https://docs.google.com/presentation/d/1QBll2G4V7Dxg91M14QL-biUxmcYA1Gmq_VWecj2aWZ8/edit?usp=sharing' },
      { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app controller', ref: 'membuat web dengan ai', link: 'https://docs.google.com/presentation/d/1VOnlUoV3BUoca-zuazToy2PJon0dviTl03dpXRUUEzc/edit?usp=sharing' },
      { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', link: 'https://docs.google.com/presentation/d/1GnXOJ8uIDFaqANCKRsm0T4jo2LmV-WcCzsdz8_qmVRM/edit?usp=sharing' },
      { name: 'Integrasi', link: 'https://docs.google.com/presentation/d/16zxsLnLDufAHGypJq406HjGbiFCAT9ZkY6P6ij_V10o/edit?usp=sharing' }
    
    
    ],
    outputs: ['Robot Transporter dengan Capit', 'Video Demo']
  },
  // Kelas 8 Semester 4
  {
    id: 'smart-home',
    title: 'Smart Home',
    gradeLevel: '8',
    semester: 'Semester 4',
    icon: 'home',
    desc: 'Membangun rumah pintar berbasis ESP32 dengan kendali relay nirkabel dan Firebase database.',
    duration: '8 Minggu',
    level: 'Lanjut',
    type: 'Deploy Project',
    status: 'Belum Dimulai',
    pic: 'Mr. Rizal',
    subMateri: [
      { name: 'Algoritma, konsep, dan komponen smart home', ref: 'https://www.dicoding.com/blog/algoritma-pemrograman-pengertian-fungsi-dan-jenis/', link: 'Blueprint_Logika_Pemrograman' },
      { name: 'Faktor-faktor yang mempengaruhi pembuatan AI' },
      { name: 'Fundamental esp32', link: 'The_ESP32_IoT_Blueprint' },
      { name: 'Pemrograman arduino ide', link: 'Arduino_Code_Anatomy' },
      { name: 'database', ref: 'https://www.youtube.com/watch?v=aO92B-K4TnQ', link: 'ESP32_Firebase_Bridge' },
      { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app control dan monitor', link: 'membuat web dengan ai' },
      { name: 'Pemrograman Smart home' },
      { name: 'K3 dalam bekerja', link: 'Strategic_Safety_Ecosystem' },
      { name: 'Integrasi hardware dan program smart home' },
      { name: 'ChatGPT / Claude: brainstorming ide pengembangan smart parking' }
    
    
    ],
    outputs: ['Prototype Smart Home', 'Video Demo']
  },
  {
    id: 'smart-greenhouse',
    title: 'Smart Greenhouse',
    gradeLevel: '8',
    semester: 'Semester 4',
    icon: 'sprout',
    desc: 'Kubah tanaman mandiri dengan dashboard web real-time untuk memantau suhu dan kelembaban.',
    duration: '8 Minggu',
    level: 'Lanjut',
    type: 'Integrasi IoT',
    status: 'Belum Dimulai',
    pic: 'Mr. Rizal',
    subMateri: [
      { name: 'Algoritma, konsep, dan komponen smart greenhouse', link: 'Blueprint_Logika_Pemrograman' },
      { name: 'Faktor-faktor yang mempengaruhi pembuatan AI' },
      { name: 'Fundamental esp32', link: 'The_ESP32_IoT_Blueprint' },
      { name: 'Pemrograman arduino ide', link: 'Arduino_Code_Anatomy' },
      { name: 'database', link: 'ESP32_Firebase_Bridge' },
      { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app control dan monitor', ref: 'membuat web dengan ai', link: 'membuat web dengan ai' },
      { name: 'Pemrograman Smart greenhouse' },
      { name: 'K3 dalam bekerja', link: 'Strategic_Safety_Ecosystem' },
      { name: 'Integrasi hardware dan program smart greenhouse' },
      { name: 'ChatGPT / Claude: brainstorming ide pengembangan smart greenhouse' }
    
    
    ],
    outputs: ['Dashboard Web Monitoring', 'Video Demo']
  }
];

const INITIAL_SOP: SopRobot[] = [
  {
    id: 'SOP_1',
    title: 'SOP Menyalakan & Memprogram Robot Tinybit',
    robotName: 'Yahboom Tinybit',
    steps: [
      'Pastikan baterai lithium 18650 terpasang dengan polaritas yang benar di bawah sasis robot.',
      'Pasang papan Micro:bit V2 pada slot hitam di bagian tengah robot secara tegak lurus.',
      'Nyalakan saklar power merah di bagian belakang robot. Lampu indikator biru di bawah sasis harus menyala.',
      'Gunakan kabel Micro USB untuk menghubungkan Micro:bit ke port USB Laptop.',
      'Buka browser dan buka makecode.microbit.org, buat proyek baru.',
      'Tambahkan extension Tinybit dengan mencari URL Github Yahboom Tinybit.',
      'Buat program, klik tombol Download, dan copy file .hex hasil download ke Drive MICROBIT di Laptop.',
      'Setelah download selesai, cabut kabel USB dan tes gerakan robot menggunakan baterai.'
    ]
  },
  {
    id: 'SOP_2',
    title: 'SOP Penggunaan ESP32 & Arduino IDE',
    robotName: 'ESP32 NodeMCU',
    steps: [
      'Gunakan kabel Micro USB kualitas data (bukan sekedar charging) untuk menghubungkan ESP32 ke USB Laptop.',
      'Buka Arduino IDE di Laptop, pastikan preferensi URL Board Manager ESP32 sudah terkonfigurasi.',
      'Pilih Board: "ESP32 Dev Module" pada menu Tools > Board.',
      'Pilih Port COM yang sesuai (lihat di Device Manager Device: CP210x atau CH340).',
      'Atur upload speed di 921600 bps agar upload data berjalan cepat.',
      'Saat Arduino IDE mulai bertuliskan "Connecting...", tekan dan tahan tombol BOOT di modul ESP32 hingga proses penulisan flash dimulai.',
      'Setelah proses selesai (100%), tekan tombol EN (Reset) pada ESP32 untuk mulai mengeksekusi program baru.'
    ]
  }
];

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'I_1', name: 'Micro:bit V2 Board', code: 'MCB-001', category: 'Microcontroller', status: 'Tersedia', condition: 'Baik', location: 'Laci A-1' },
  { id: 'I_2', name: 'Robot Kit Tinybit Yahboom', code: 'RBT-010', category: 'Robot Kit', status: 'Tersedia', condition: 'Baik', location: 'Rak Robot B-2' },
  { id: 'I_3', name: 'ESP32 NodeMCU V1', code: 'ESP-004', category: 'Microcontroller', status: 'Tersedia', condition: 'Baik', location: 'Laci A-3' },
  { id: 'I_4', name: 'Sensor Ultrasonic HC-SR04', code: 'SNS-020', category: 'Sensor', status: 'Dipinjam', condition: 'Baik', location: 'Laci B-1' },
  { id: 'I_5', name: 'Servo Motor SG90 9g', code: 'MCH-002', category: 'Mechanical', status: 'Tersedia', condition: 'Baik', location: 'Laci C-2' },
  { id: 'I_6', name: 'DHT11 Temperature Sensor', code: 'SNS-005', category: 'Sensor', status: 'Perbaikan', condition: 'Rusak Ringan', location: 'Meja Servis' },
  { id: 'I_7', name: 'RFID RC522 Module Kit', code: 'SNS-015', category: 'Sensor', status: 'Tersedia', condition: 'Baik', location: 'Laci B-4' },
  { id: 'I_8', name: 'Solder Listrik Goon 40W', code: 'TLS-002', category: 'Tools', status: 'Tersedia', condition: 'Baik', location: 'Lemari Alat 1' }
];

export const mockDb = {
  getTeachers(): Teacher[] {
    const data = localStorage.getItem('idn_teachers');
    if (!data) {
      localStorage.setItem('idn_teachers', JSON.stringify(INITIAL_TEACHERS));
      this.addLog('System', 'Initialized default teachers data', 'Guru');
      return INITIAL_TEACHERS;
    }
    return JSON.parse(data);
  },

  saveTeachers(teachers: Teacher[]) {
    localStorage.setItem('idn_teachers', JSON.stringify(teachers));
  },

  getTechnicians(): Technician[] {
    const data = localStorage.getItem('idn_technicians');
    if (!data) {
      localStorage.setItem('idn_technicians', JSON.stringify(INITIAL_TECHNICIANS));
      this.addLog('System', 'Initialized default technicians data', 'Teknisi');
      return INITIAL_TECHNICIANS;
    }
    return JSON.parse(data);
  },

  saveTechnicians(technicians: Technician[]) {
    localStorage.setItem('idn_technicians', JSON.stringify(technicians));
  },

  getLessons(): Lesson[] {
    let data = localStorage.getItem('idn_lessons');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.length > 0 && (parsed[0].title === 'Pengenalan Python Basic' || parsed[0].id === 'M_1' && parsed[0].title !== 'Smart Trashbin')) {
          localStorage.removeItem('idn_lessons');
          data = null;
        }
      } catch (e) {
        localStorage.removeItem('idn_lessons');
        data = null;
      }
    }
    if (!data) {
      localStorage.setItem('idn_lessons', JSON.stringify(INITIAL_LESSONS));
      this.addLog('System', 'Initialized default lessons data', 'Materi');
      return INITIAL_LESSONS;
    }
    return JSON.parse(data);
  },

  saveLessons(lessons: Lesson[]) {
    localStorage.setItem('idn_lessons', JSON.stringify(lessons));
  },

  getCurriculum(): CurriculumSubject[] {
    let data = localStorage.getItem('idn_curriculum');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const smartWatering = parsed.find((c: any) => c.id === 'smart-watering-plant');
        const robotBt = parsed.find((c: any) => c.id === 'robot-bluetooth-controller');
        const smartHome = parsed.find((c: any) => c.id === 'smart-home');
        // Check if curriculum needs sync with the Excel updates
        const firstSubject = parsed.find((c: any) => c.id === 'smart-trashbin');
        const hasLatestLinks = firstSubject && firstSubject.subMateri && firstSubject.subMateri[6] && firstSubject.subMateri[6].link === 'https://canva.link/qjbfa25g12kg3wn';

        if (!smartWatering || !robotBt || !smartHome || 
            smartWatering.duration !== '3 Minggu' || 
            robotBt.duration !== '5 Minggu' || 
            smartHome.duration !== '8 Minggu' ||
            !robotBt.subMateri || robotBt.subMateri.length !== 6 ||
            !hasLatestLinks) {
          localStorage.removeItem('idn_curriculum');
          data = null;
        }
      } catch (e) {
        localStorage.removeItem('idn_curriculum');
        data = null;
      }
    }
    if (!data) {
      localStorage.setItem('idn_curriculum', JSON.stringify(INITIAL_CURRICULUM));
      this.addLog('System', 'Initialized default curriculum data', 'Curriculum');
      return INITIAL_CURRICULUM;
    }
    return JSON.parse(data);
  },

  saveCurriculum(curriculum: CurriculumSubject[]) {
    localStorage.setItem('idn_curriculum', JSON.stringify(curriculum));
  },

  getProjects(): Project[] {
    let data = localStorage.getItem('idn_projects');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.length !== 13) {
          localStorage.removeItem('idn_projects');
          data = null;
        }
      } catch (e) {
        localStorage.removeItem('idn_projects');
        data = null;
      }
    }
    if (!data) {
      localStorage.setItem('idn_projects', JSON.stringify(INITIAL_PROJECTS));
      this.addLog('System', 'Initialized default projects library', 'Projects');
      return INITIAL_PROJECTS;
    }
    return JSON.parse(data);
  },

  saveProjects(projects: Project[]) {
    localStorage.setItem('idn_projects', JSON.stringify(projects));
  },

  getSops(): SopRobot[] {
    const data = localStorage.getItem('idn_sops');
    if (!data) {
      localStorage.setItem('idn_sops', JSON.stringify(INITIAL_SOP));
      return INITIAL_SOP;
    }
    return JSON.parse(data);
  },

  saveSops(sops: SopRobot[]) {
    localStorage.setItem('idn_sops', JSON.stringify(sops));
  },

  getInventory(): InventoryItem[] {
    const data = localStorage.getItem('idn_inventory');
    if (!data) {
      localStorage.setItem('idn_inventory', JSON.stringify(INITIAL_INVENTORY));
      this.addLog('System', 'Initialized default lab inventory data', 'Inventaris');
      return INITIAL_INVENTORY;
    }
    return JSON.parse(data);
  },

  saveInventory(items: InventoryItem[]) {
    localStorage.setItem('idn_inventory', JSON.stringify(items));
  },

  getLogs(): AuditLog[] {
    const data = localStorage.getItem('idn_audit_logs');
    if (!data) {
      const initialLogs: AuditLog[] = [{
        id: 'L_1',
        timestamp: new Date().toLocaleString('id-ID'),
        user: 'System',
        action: 'System initialized successfully',
        module: 'General'
      }];
      localStorage.setItem('idn_audit_logs', JSON.stringify(initialLogs));
      return initialLogs;
    }
    return JSON.parse(data);
  },

  addLog(user: string, action: string, module: string) {
    const logs = this.getLogs();
    const newLog: AuditLog = {
      id: `L_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user,
      action,
      module
    };
    logs.unshift(newLog); // Put new logs at the beginning
    localStorage.setItem('idn_audit_logs', JSON.stringify(logs.slice(0, 100))); // Keep last 100 logs
  },

  clearLogs() {
    localStorage.removeItem('idn_audit_logs');
  },

  getConfig(): SystemConfig {
    let data = localStorage.getItem('idn_config');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        let changed = false;
        if (parsed.lmsUrl === 'https://lms.idn.sch.id') {
          parsed.lmsUrl = 'https://lms.codestechno.com';
          changed = true;
        }
        if (!parsed.appsScriptUrl || parsed.appsScriptUrl === '') {
          parsed.appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyhFl_jUh9LYX-aJrD_VaZvC1-H_dlH2sNjGlZdn8lHYd2AGsI1i-R_dTqgBRDo6XAO/exec';
          changed = true;
        }
        if (changed) {
          localStorage.setItem('idn_config', JSON.stringify(parsed));
          data = JSON.stringify(parsed);
        }
      } catch (e) {}
    }
    if (!data) {
      const defaultConfig: SystemConfig = {
        spreadsheetId: '1IoT-Robotics-IDN-Spreadsheet-CMS-DemoID',
        driveFolderId: '1IoT-Robotics-IDN-Drive-Storage-DemoID',
        appsScriptUrl: 'https://script.google.com/macros/s/AKfycbyhFl_jUh9LYX-aJrD_VaZvC1-H_dlH2sNjGlZdn8lHYd2AGsI1i-R_dTqgBRDo6XAO/exec',
        schoolName: 'IDN Boarding School',
        chatbotModel: 'gemini-3.5-flash',
        isInitialized: true,
        lmsUrl: 'https://lms.codestechno.com',
        totalStudents: '2.5K+'
      };
      localStorage.setItem('idn_config', JSON.stringify(defaultConfig));
      return defaultConfig;
    }
    return JSON.parse(data);
  },

  saveConfig(config: SystemConfig) {
    localStorage.setItem('idn_config', JSON.stringify(config));
  },

  getStudents(): Student[] {
    const data = localStorage.getItem('idn_students');
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveStudents(students: Student[]) {
    localStorage.setItem('idn_students', JSON.stringify(students));
  },

  getTeacherProgress(): TeacherProgress[] {
    let data = localStorage.getItem('idn_teacher_progress');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const robotBtProgress = parsed.find((p: any) => p.subjectId === 'robot-bluetooth-controller');
        if (robotBtProgress && (!robotBtProgress.subMateriProgress || robotBtProgress.subMateriProgress.length !== 6)) {
          localStorage.removeItem('idn_teacher_progress');
          data = null;
        }
      } catch (e) {
        localStorage.removeItem('idn_teacher_progress');
        data = null;
      }
    }
    if (!data) {
      const teachers = this.getTeachers();
      const curriculum = this.getCurriculum();
      const progressList: TeacherProgress[] = [];

      teachers.forEach(teacher => {
        const matchingSubjects = curriculum.filter(subject => {
          if (teacher.classLevel === '7 & 8') return true;
          return subject.gradeLevel === teacher.classLevel;
        });

        matchingSubjects.forEach(subject => {
          const totalSub = subject.subMateri.length;
          const numCompleted = Math.floor(Math.random() * (totalSub + 1));
          
          const subMateriProgress = subject.subMateri.map((sm, idx) => {
            const completed = idx < numCompleted;
            return {
              name: sm.name,
              completed,
              completedAt: completed ? new Date(2026, 5, 10 + idx).toLocaleDateString('id-ID') : undefined
            };
          });

          progressList.push({
            id: `progress_${teacher.id}_${subject.id}`,
            teacherId: teacher.id,
            teacherName: teacher.name,
            branch: teacher.branch,
            subjectId: subject.id,
            subjectTitle: subject.title,
            gradeLevel: subject.gradeLevel,
            semester: subject.semester,
            subMateriProgress
          });
        });
      });

      localStorage.setItem('idn_teacher_progress', JSON.stringify(progressList));
      return progressList;
    }
    return JSON.parse(data);
  },

  saveTeacherProgress(progressList: TeacherProgress[]) {
    localStorage.setItem('idn_teacher_progress', JSON.stringify(progressList));
    this.addLog('System', 'Updated teacher curriculum delivery progress tracker', 'Curriculum');
  },


  // Dummy Seeder Function
  seedDummyData(counts: { lessons: number; projects: number; teachers: number; inventory: number }) {
    this.addLog('Admin', `Triggered dummy data seeder (Materi: ${counts.lessons}, Projects: ${counts.projects}, Guru: ${counts.teachers}, Inventaris: ${counts.inventory})`, 'Settings');

    // 1. Seed Teachers
    if (counts.teachers > 0) {
      const currentTeachers = this.getTeachers();
      const branches: Teacher['branch'][] = ['Sentul', 'Jonggol', 'Pamijahan', 'Solo', 'Akhwat'];
      const levels: Teacher['classLevel'][] = ['7', '8', '7 & 8'];
      const names = ['Ahmad', 'Budi', 'Chandra', 'Dedi', 'Eko', 'Fajar', 'Guntur', 'Hadi', 'Irfan', 'Joko', 'Kurniawan', 'Lukman', 'Mulyono', 'Novi', 'Oki', 'Prabowo', 'Qomar', 'Roni', 'Setyo', 'Taufik'];
      const lastNames = ['Hidayat', 'Saputra', 'Pratama', 'Kusuma', 'Wijaya', 'Santoso', 'Subagyo', 'Nugroho', 'Siregar', 'Lubis'];

      for (let i = 0; i < counts.teachers; i++) {
        const name = `${names[Math.floor(Math.random() * names.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        const branch = branches[Math.floor(Math.random() * branches.length)];
        const level = levels[Math.floor(Math.random() * levels.length)];
        const email = `${name.toLowerCase().replace(/\s+/g, '.')}@idn.sch.id`;
        const phone = `08${Math.floor(100000000 + Math.random() * 900000000)}`;

        currentTeachers.push({
          id: `T_SEED_${Date.now()}_${i}`,
          name,
          branch,
          classLevel: level,
          email,
          phone,
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
        });
      }
      this.saveTeachers(currentTeachers);
    }

    // 2. Seed Lessons
    if (counts.lessons > 0) {
      const currentLessons = this.getLessons();
      const topics = ['Python Basic', 'Tinybit', 'Microbit', 'IoT Basic', 'ESP32', 'IoT Cloud', 'Computer Vision', 'AI Robot'];
      const titles = [
        'Mengenal Loop Bersarang', 'Membuat Fungsi dengan Argumen', 'Membaca Sensor LDR', 
        'Mengirim Nilai Sensor ke Web Server', 'Dasar Jaringan IoT', 'Konfigurasi MQTT Client', 
        'Pengenalan Algoritma CNN', 'Pengendalian Lengan Robot Servo', 'Koneksi ESP32 ke Firebase',
        'Membaca Data Serial Monitor', 'Integrasi ESP32 dengan RFID Card'
      ];

      for (let i = 0; i < counts.lessons; i++) {
        const classLevel = Math.random() > 0.5 ? '7' : '8';
        const topic = classLevel === '7' 
          ? topics[Math.floor(Math.random() * 4)] // Python, Tinybit, Microbit, IoT Basic
          : topics[4 + Math.floor(Math.random() * 4)]; // ESP32, IoT Cloud, CV, AI Robot
        const title = `${titles[Math.floor(Math.random() * titles.length)]} (${topic})`;
        const creator = this.getTeachers()[Math.floor(Math.random() * this.getTeachers().length)].name;

        currentLessons.push({
          id: `M_SEED_${Date.now()}_${i}`,
          title,
          classLevel,
          topic,
          duration: `${2 + Math.floor(Math.random() * 3) * 2} JP`,
          driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/seeded_link' }],
          creator
        });
      }
      this.saveLessons(currentLessons);
    }

    // 3. Seed Projects
    if (counts.projects > 0) {
      const currentProjects = this.getProjects();
      const categories = ['Tinybit', 'IoT Smart Project', 'Computer Vision Project', 'AI Robotic Project'];
      const names = ['Smart Garage Gate', 'Weather Station IoT', 'Hand Gesture Drone Control', 'Object Tracking Cam', 'Self Balancing Robot', 'AI Mask Detector', 'Autonomous Maze Solver', 'Smart Lamp Google Assistant'];
      const difficulties: Project['difficulty'][] = ['Mudah', 'Sedang', 'Sulit'];

      for (let i = 0; i < counts.projects; i++) {
        const name = names[Math.floor(Math.random() * names.length)] + ' (Seed)';
        const category = categories[Math.floor(Math.random() * categories.length)];
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        const duration = `${4 + Math.floor(Math.random() * 4) * 2} JP`;
        const author = this.getTeachers()[Math.floor(Math.random() * this.getTeachers().length)].name;

        currentProjects.push({
          id: `P_SEED_${Date.now()}_${i}`,
          name,
          category,
          difficulty,
          description: `Deskripsi proyek otomatis untuk ${name}. Proyek ini digunakan untuk melatih kompetensi IoT/Robotics siswa IDN.`,
          objectives: 'Siswa dapat merancang skema hardware dan mengunggah program firmware berbasis IoT.',
          competencies: 'Solder Skill, Logic Flow, Cloud Dashboard Monitoring.',
          hardware: ['ESP32 Board', 'Jumper Wires', 'Sensor LDR', 'Relay Module'],
          software: ['Arduino IDE', 'Blynk app'],
          duration,
          driveLink: 'https://drive.google.com/drive/folders/seeded_project_drive',
          githubLink: 'https://github.com/idn-robotics/seeded-project',
          author,
          year: '2026'
        });
      }
      this.saveProjects(currentProjects);
    }

    // 4. Seed Inventory
    if (counts.inventory > 0) {
      const currentInventory = this.getInventory();
      const itemTypes = [
        { name: 'Kabel Jumper Male-to-Female', cat: 'Tools' },
        { name: 'Sensor DHT22 AM2302', cat: 'Sensor' },
        { name: 'Mini Water Pump 5V', cat: 'Mechanical' },
        { name: 'Lipo Battery 7.4V 2200mAh', cat: 'Tools' },
        { name: 'Wemos D1 Mini board', cat: 'Microcontroller' },
        { name: 'Raspberry Pi 4 Model B', cat: 'Microcontroller' },
        { name: 'IR Obstacle Sensor Module', cat: 'Sensor' },
        { name: 'Motor Driver L298N Shield', cat: 'Mechanical' }
      ] as const;
      const statuses: InventoryItem['status'][] = ['Tersedia', 'Dipinjam', 'Perbaikan'];
      const conditions: InventoryItem['condition'][] = ['Baik', 'Rusak Ringan', 'Rusak Berat'];

      for (let i = 0; i < counts.inventory; i++) {
        const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        const code = `${itemType.cat.substring(0, 3).toUpperCase()}-${100 + Math.floor(Math.random() * 900)}`;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];

        currentInventory.push({
          id: `I_SEED_${Date.now()}_${i}`,
          name: `${itemType.name} (Seed ${i + 1})`,
          code,
          category: itemType.cat,
          status,
          condition,
          location: `Laci D-${1 + Math.floor(Math.random() * 9)}`
        });
      }
      this.saveInventory(currentInventory);
    }
  },

  resetDatabase() {
    localStorage.removeItem('idn_teachers');
    localStorage.removeItem('idn_technicians');
    localStorage.removeItem('idn_lessons');
    localStorage.removeItem('idn_curriculum');
    localStorage.removeItem('idn_projects');
    localStorage.removeItem('idn_sops');
    localStorage.removeItem('idn_inventory');
    localStorage.removeItem('idn_config');
    localStorage.removeItem('idn_teacher_progress');
    this.clearLogs();
    
    // Trigger getters to rebuild defaults
    this.getTeachers();
    this.getTechnicians();
    this.getLessons();
    this.getCurriculum();
    this.getProjects();
    this.getSops();
    this.getInventory();
    this.getConfig();
    this.addLog('Admin', 'Database has been reset to defaults', 'Settings');
  },

  async syncFromBackend(): Promise<boolean> {
    const config = this.getConfig();
    if (!config.appsScriptUrl) return false;
    
    try {
      // 1. Fetch config settings
      const configRes = await fetch(`${config.appsScriptUrl}?route=/api/config`);
      const configData = await configRes.json();
      if (configData.success && configData.data) {
        // preserve the locally set appsScriptUrl since it is stored in localStorage
        const mergedConfig = { ...configData.data, appsScriptUrl: config.appsScriptUrl };
        localStorage.setItem('idn_config', JSON.stringify(mergedConfig));
      }
      
      // 2. Fetch other tables
      const routes = [
        { route: '/api/teachers', key: 'idn_teachers' },
        { route: '/api/technicians', key: 'idn_technicians' },
        { route: '/api/materials', key: 'idn_lessons' },
        { route: '/api/curriculum', key: 'idn_curriculum' },
        { route: '/api/projects', key: 'idn_projects' },
        { route: '/api/inventory', key: 'idn_inventory' },
        { route: '/api/sops', key: 'idn_sops' },
        { route: '/api/logs', key: 'idn_audit_logs' },
        { route: '/api/students', key: 'idn_students' },
        { route: '/api/tracker', key: 'idn_teacher_progress' },
      ];
      
      for (const item of routes) {
        try {
          const res = await fetch(`${config.appsScriptUrl}?route=${item.route}`);
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            localStorage.setItem(item.key, JSON.stringify(json.data));
          }
        } catch (err) {
          console.error(`Failed to fetch ${item.route}:`, err);
        }
      }
      return true;
    } catch (e) {
      console.error('Error syncing from backend:', e);
      return false;
    }
  },

  async postToBackend(route: string, data: any): Promise<any> {
    const config = this.getConfig();
    if (!config.appsScriptUrl) return null;
    try {
      const res = await fetch(`${config.appsScriptUrl}?route=${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      console.error(`Error posting to backend route ${route}:`, e);
      return null;
    }
  }
};
