export interface Lesson {
  id: string;
  title: string;
  classLevel: '7' | '8';
  topic: string;
  duration: string;
  driveLink: string;
  creator: string;
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
  schoolName: string;
  chatbotModel: string;
  isInitialized: boolean;
  lmsUrl: string;
}

// Initial Seeds
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
  {id: 'M_1', title: 'Smart Trashbin', classLevel: '7', topic: 'Microbit', duration: '4 Jam', driveLink: 'https://docs.google.com/presentation/d/1yuJzz-Hh4nJzL0BtJeKIWrrAOzg9V2pG/edit?usp=drive_link', creator: 'Mr Fadhlan'},
  {id: 'M_2', title: 'Tinybit Bluetooth Controller', classLevel: '7', topic: 'Tinybit', duration: '4 Jam', driveLink: 'https://drive.google.com/drive/folders/p1_drive', creator: 'Mr Alfi'},
  {id: 'M_3', title: 'Tinybit Hand Gesture', classLevel: '7', topic: 'Tinybit', duration: '4 Jam', driveLink: 'https://drive.google.com/drive/folders/p2_drive', creator: 'Mr Alfi'},
  {id: 'M_4', title: 'Smart Watering Plant', classLevel: '7', topic: 'IoT Basic', duration: '3 Jam', driveLink: 'https://drive.google.com/file/d/18GPMXi9-nlijGMKDGzuXay0cJu6ZIdCD/view', creator: 'Mr Fadhlan'},
  {id: 'M_5', title: 'Tinybit Line Follower', classLevel: '7', topic: 'Tinybit', duration: '4 Jam', driveLink: 'https://drive.google.com/drive/folders/p3_drive', creator: 'Mr Fadhlan'},
  {id: 'M_6', title: 'Smart Parking', classLevel: '7', topic: 'IoT Basic', duration: '3 Jam', driveLink: 'https://drive.google.com/file/d/1hRZ1vqyA_ixJOPkkFh7Ab0oSh8rxUeX4/view', creator: 'Mr Alfi'},
  {id: 'M_7', title: 'Robot Bluetooth Controller', classLevel: '8', topic: 'Python Robot', duration: '4 Jam', driveLink: 'https://drive.google.com/drive/folders/p1_drive', creator: 'Mr. Rahmat Fadlan'},
  {id: 'M_8', title: 'Robot Hand Gesture', classLevel: '8', topic: 'AI Robot', duration: '4 Jam', driveLink: 'https://teachablemachine.withgoogle.com/', creator: 'Mr. Rahmat Fadlan'},
  {id: 'M_9', title: 'Smart Parking AI', classLevel: '8', topic: 'Computer Vision', duration: '4 Jam', driveLink: 'https://drive.google.com/drive/folders/p6_drive', creator: 'Mr. Rahmat Fadlan'},
  {id: 'M_10', title: 'Robot Line Follower', classLevel: '8', topic: 'Python Robot', duration: '4 Jam', driveLink: 'https://drive.google.com/drive/folders/p3_drive', creator: 'Ms. Nadia'},
  {id: 'M_11', title: 'Robot Transporter', classLevel: '8', topic: 'Python Robot', duration: '4 Jam', driveLink: 'https://drive.google.com/drive/folders/p2_drive', creator: 'Ms. Nadia'},
  {id: 'M_12', title: 'Smart home', classLevel: '8', topic: 'ESP32 IoT', duration: '5 Jam', driveLink: 'https://drive.google.com/drive/folders/p7_drive', creator: 'Mr. Rizal'},
  {id: 'M_13', title: 'Smart greenhouse', classLevel: '8', topic: 'ESP32 IoT', duration: '5 Jam', driveLink: 'https://drive.google.com/drive/folders/p7_drive', creator: 'Mr. Rizal'},
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'P_1',
    name: 'Tinybit Bluetooth Controller',
    category: 'Tinybit',
    difficulty: 'Mudah',
    description: 'Mengendalikan robot Tinybit via aplikasi handphone Android menggunakan koneksi Bluetooth.',
    objectives: 'Siswa dapat memprogram modul bluetooth HC-05 pada microbit dan merespon trigger bluetooth di Tinybit.',
    competencies: 'Pemrograman Event-Driven, Konektivitas Bluetooth, Logika Driver Motor.',
    hardware: ['Robot Tinybit', 'Micro:bit V2', 'Smartphone Android'],
    software: ['Makecode Editor', 'Tinybit App'],
    duration: '4 JP',
    driveLink: 'https://drive.google.com/drive/folders/p1_drive',
    githubLink: 'https://github.com/idn-robotics/tinybit-bluetooth',
    author: 'Ahmad Fauzi',
    year: '2025'
  },
  {
    id: 'P_2',
    name: 'Tinybit Hand Gesture Controller',
    category: 'Tinybit',
    difficulty: 'Sedang',
    description: 'Mengendalikan robot Tinybit kedua dengan gerakan tangan (accelerometer) dari microbit transmitter.',
    objectives: 'Siswa dapat menggunakan sensor akselerometer bawaan microbit dan melakukan komunikasi radio wireless.',
    competencies: 'Komunikasi Radio Frekuensi, Analisis Sensor Kemiringan (Tilt), Robot Transmit-Receive.',
    hardware: ['2x Micro:bit V2', 'Robot Tinybit', 'Battery Pack'],
    software: ['Makecode Editor'],
    duration: '6 JP',
    driveLink: 'https://drive.google.com/drive/folders/p2_drive',
    githubLink: 'https://github.com/idn-robotics/tinybit-gesture',
    author: 'Zainal Abidin',
    year: '2025'
  },
  {
    id: 'P_3',
    name: 'Tinybit Line Follower PID',
    category: 'Tinybit',
    difficulty: 'Sedang',
    description: 'Robot Tinybit mengikuti garis hitam dengan algoritma PID agar gerakan lebih presisi dan smooth.',
    objectives: 'Mengenalkan siswa pada logika Kontrol Proporsional-Integral-Derivatif pada sensor line tracking.',
    competencies: 'Algoritma PID, Sensor Kalibrasi, Optimasi Kecepatan Motor.',
    hardware: ['Robot Tinybit', 'Micro:bit V2', 'Track Lomba Line Follower'],
    software: ['Makecode Editor'],
    duration: '6 JP',
    driveLink: 'https://drive.google.com/drive/folders/p3_drive',
    githubLink: 'https://github.com/idn-robotics/tinybit-line-pid',
    author: 'Zainal Abidin',
    year: '2026'
  },
  {
    id: 'P_4',
    name: 'Smart Trash Bin (ESP32)',
    category: 'IoT Smart Project',
    difficulty: 'Mudah',
    description: 'Tempat sampah pintar yang terbuka otomatis saat ada objek mendekat dan mengirim status kepenuhan ke Blynk.',
    objectives: 'Siswa mampu merangkai sensor ultrasonic, servo motor, dan modul WiFi ESP32 menjadi satu sistem IoT terpadu.',
    competencies: 'Servo Motor Control, WiFi Client, Sensor Ultrasonik, Integrasi Blynk Cloud.',
    hardware: ['ESP32 NodeMCU', 'Sensor Ultrasonik HC-SR04', 'Servo SG90', 'Tempat Sampah Mini'],
    software: ['Arduino IDE', 'Blynk App'],
    duration: '4 JP',
    driveLink: 'https://drive.google.com/drive/folders/p4_drive',
    githubLink: 'https://github.com/idn-robotics/smart-trash-esp32',
    author: 'Rizki Maulana',
    year: '2025'
  },
  {
    id: 'P_5',
    name: 'Smart Watering Plant (ESP32)',
    category: 'IoT Smart Project',
    difficulty: 'Sedang',
    description: 'Penyiram tanaman otomatis berbasis kelembaban tanah dengan notifikasi Telegram Bot.',
    objectives: 'Membangun pemahaman tentang sensor analog (Soil Moisture) dan pengoperasian Bot API Telegram.',
    competencies: 'ADC (Analog-to-Digital Conversion), Relay Board Switch, Bot Telegram Integration.',
    hardware: ['ESP32', 'Soil Moisture Sensor', 'Relay 5V', 'Pompa Air Mini 5V', 'Selang Air'],
    software: ['Arduino IDE', 'Blynk Cloud'],
    duration: '6 JP',
    driveLink: 'https://drive.google.com/drive/folders/p5_drive',
    githubLink: 'https://github.com/idn-robotics/smart-watering',
    author: 'Rizki Maulana',
    year: '2025'
  },
  {
    id: 'P_6',
    name: 'Smart Parking System',
    category: 'IoT Smart Project',
    difficulty: 'Sedang',
    description: 'Sistem parkir otomatis menggunakan RFID Reader dan Servo Barrier Gate yang memantau slot parkir via Web Server.',
    objectives: 'Menerapkan komunikasi RFID dan pembuatan local webserver ESP32.',
    competencies: 'RFID SPI Protocol, local HTML Web Server, LCD I2C Display.',
    hardware: ['ESP32', 'RFID RC522', 'Servo SG90', 'Sensor Infrared', 'LCD 16x2 I2C'],
    software: ['Arduino IDE'],
    duration: '8 JP',
    driveLink: 'https://drive.google.com/drive/folders/p6_drive',
    githubLink: 'https://github.com/idn-robotics/smart-parking',
    author: 'Rizki Maulana',
    year: '2026'
  },
  {
    id: 'P_7',
    name: 'Smart Greenhouse',
    category: 'IoT Smart Project',
    difficulty: 'Sulit',
    description: 'Kubah tanaman mandiri yang memantau kelembaban udara, suhu, intensitas cahaya, tanah, serta mengaktifkan kipas dan pompa secara otomatis dengan dashboard web real-time.',
    objectives: 'Membuat project IoT kompleks dengan banyak sensor, aktuator, dan web UI visual.',
    competencies: 'Dashboard Multi-sensor, Logika Histeresis Aktuator, WebSockets ESP32.',
    hardware: ['ESP32 NodeMCU', 'DHT22 Sensor', 'LDR Sensor', 'Soil Moisture', 'Kipas DC 5V', 'Pompa Air', 'Relay 4 Channel'],
    software: ['Arduino IDE', 'HTML/JS Dashboard', 'ThingSpeak API'],
    duration: '10 JP',
    driveLink: 'https://drive.google.com/drive/folders/p7_drive',
    githubLink: 'https://github.com/idn-robotics/smart-greenhouse',
    author: 'Fajar Nugraha',
    year: '2026'
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

  getProjects(): Project[] {
    const data = localStorage.getItem('idn_projects');
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
        if (parsed.lmsUrl === 'https://lms.idn.sch.id') {
          parsed.lmsUrl = 'https://lms.codestechno.com';
          localStorage.setItem('idn_config', JSON.stringify(parsed));
          data = JSON.stringify(parsed);
        }
      } catch (e) {}
    }
    if (!data) {
      const defaultConfig: SystemConfig = {
        spreadsheetId: '1IoT-Robotics-IDN-Spreadsheet-CMS-DemoID',
        driveFolderId: '1IoT-Robotics-IDN-Drive-Storage-DemoID',
        schoolName: 'IDN Boarding School',
        chatbotModel: 'gemini-3.5-flash',
        isInitialized: true,
        lmsUrl: 'https://lms.codestechno.com'
      };
      localStorage.setItem('idn_config', JSON.stringify(defaultConfig));
      return defaultConfig;
    }
    return JSON.parse(data);
  },

  saveConfig(config: SystemConfig) {
    localStorage.setItem('idn_config', JSON.stringify(config));
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
          driveLink: 'https://drive.google.com/drive/folders/seeded_link',
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
    localStorage.removeItem('idn_projects');
    localStorage.removeItem('idn_sops');
    localStorage.removeItem('idn_inventory');
    localStorage.removeItem('idn_config');
    this.clearLogs();
    
    // Trigger getters to rebuild defaults
    this.getTeachers();
    this.getTechnicians();
    this.getLessons();
    this.getProjects();
    this.getSops();
    this.getInventory();
    this.getConfig();
    this.addLog('Admin', 'Database has been reset to defaults', 'Settings');
  }
};
