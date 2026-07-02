/**
 * Google Apps Script Seeder for IDN IoT & Robotics Database
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Clear any existing code in the editor and paste this code.
 * 4. Select the function 'setupAndSeedSpreadsheet' and click 'Run'.
 * 5. Grant permissions if prompted.
 * 6. The script will create all necessary sheets, headers, and seed them with the frontend data.
 */

function setupAndSeedSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Helper to create or reset a sheet
  function getOrCreateSheet(name) {
    var sheet = ss.getSheetByName(name);
    if (sheet) {
      sheet.clear();
    } else {
      sheet = ss.insertSheet(name);
    }
    return sheet;
  }

  // ==========================================
  // 1. SEED SETTING SHEET
  // ==========================================
  var settingSheet = getOrCreateSheet("Setting");
  settingSheet.appendRow(["key", "value", "description"]);
  settingSheet.appendRow(["appsScriptUrl", "", "Tautan Web App Google Apps Script"]);
  settingSheet.appendRow(["lmsUrl", "https://lms.codestechno.com", "Portal E-Learning LMS utama"]);
  settingSheet.appendRow(["microbitLmsUrl", "https://elearning.codestechno.com", "Portal E-Learning Microbit"]);

  // ==========================================
  // 2. SEED GURU (TEACHERS)
  // ==========================================
  var teachersData = [
    { id: 'T_1', name: 'Ahmad Fauzi', branch: 'Sentul', classLevel: '7', email: 'ahmad.fauzi@idn.sch.id', phone: '081234567890', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
    { id: 'T_2', name: 'Rizki Maulana', branch: 'Pamijahan', classLevel: '8', email: 'rizki.maulana@idn.sch.id', phone: '082345678901', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { id: 'T_3', name: 'Zainal Abidin', branch: 'Jonggol', classLevel: '7 & 8', email: 'zainal.abidin@idn.sch.id', phone: '083456789012', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    { id: 'T_4', name: 'Laila Fitriani', branch: 'Akhwat', classLevel: '7', email: 'laila.fitriani@idn.sch.id', phone: '084567890123', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
    { id: 'T_5', name: 'Fajar Nugraha', branch: 'Solo', classLevel: '8', email: 'fajar.nugraha@idn.sch.id', phone: '085678901234', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' }
  ];
  var teachersSheet = getOrCreateSheet("Guru");
  teachersSheet.appendRow(["id", "name", "branch", "classLevel", "email", "phone", "photo"]);
  teachersData.forEach(function(t) {
    teachersSheet.appendRow([t.id, t.name, t.branch, t.classLevel, t.email, t.phone, t.photo]);
  });

  // ==========================================
  // 3. SEED TEKNISI (TECHNICIANS)
  // ==========================================
  var techniciansData = [
    { id: 'TEC_1', name: 'Dani Kusuma', branch: 'Sentul', email: 'dani.kusuma@idn.sch.id', phone: '086789012345', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
    { id: 'TEC_2', name: 'Hendri Setiawan', branch: 'Jonggol', email: 'hendri.setiawan@idn.sch.id', phone: '087890123456', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' }
  ];
  var techSheet = getOrCreateSheet("Teknisi");
  techSheet.appendRow(["id", "name", "branch", "email", "phone", "photo"]);
  techniciansData.forEach(function(tec) {
    techSheet.appendRow([tec.id, tec.name, tec.branch, tec.email, tec.phone, tec.photo]);
  });

  // ==========================================
  // 4. SEED MATERI (LESSONS)
  // ==========================================
  var lessonsData = [
    { id: 'M_1', title: 'Smart Trashbin', classLevel: '7', topic: 'Microbit', duration: '3 Minggu (4 JP)', driveLinks: [{ label: 'Modul Presentasi', url: 'https://docs.google.com/presentation/d/1yuJzz-Hh4nJzL0BtJeKIWrrAOzg9V2pG/edit?usp=drive_link' }, { label: 'Canva Integrasi', url: 'https://canva.link/fz5kuw9d8j9zdja' }], creator: 'Mr Fadhlan' },
    { id: 'M_2', title: 'Tinybit Bluetooth Controller', classLevel: '7', topic: 'Tinybit', duration: '3 Minggu (4 JP)', driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p1_drive' }], creator: 'Mr Alfi' },
    { id: 'M_3', title: 'Tinybit Hand Gesture', classLevel: '7', topic: 'Tinybit', duration: '3 Minggu (4 JP)', driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p2_drive' }], creator: 'Mr Alfi' },
    { id: 'M_4', title: 'Smart Watering Plant', classLevel: '7', topic: 'IoT Basic', duration: '4 Minggu (6 JP)', driveLinks: [{ label: 'Modul K3', url: 'https://drive.google.com/file/d/18GPMXi9-nlijGMKDGzuXay0cJu6ZIdCD/view' }], creator: 'Mr Fadhlan' },
    { id: 'M_5', title: 'Tinybit Line Follower', classLevel: '7', topic: 'Tinybit', duration: '4 Minggu (6 JP)', driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p3_drive' }], creator: 'Mr Fadhlan' },
    { id: 'M_6', title: 'Smart Parking', classLevel: '7', topic: 'IoT Basic', duration: '3 Minggu (4 JP)', driveLinks: [{ label: 'Modul K3', url: 'https://drive.google.com/file/d/1hRZ1vqyA_ixJOPkkFh7Ab0oSh8rxUeX4/view' }], creator: 'Mr Alfi' },
    { id: 'M_7', title: 'Robot Bluetooth Controller', classLevel: '8', topic: 'Python Robot', duration: '3 Minggu (4 JP)', driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p1_drive' }], creator: 'Mr. Rahmat Fadlan' },
    { id: 'M_8', title: 'Robot Hand Gesture', classLevel: '8', topic: 'AI Robot', duration: '3 Minggu (4 JP)', driveLinks: [{ label: 'Teachable Machine', url: 'https://teachablemachine.withgoogle.com/' }], creator: 'Mr. Rahmat Fadlan' },
    { id: 'M_9', title: 'Smart Parking AI', classLevel: '8', topic: 'Computer Vision', duration: '3 Minggu (4 JP)', driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p6_drive' }], creator: 'Mr. Rahmat Fadlan' },
    { id: 'M_10', title: 'Robot Line Follower', classLevel: '8', topic: 'Python Robot', duration: '4 Minggu (8 JP)', driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p3_drive' }], creator: 'Ms. Nadia' },
    { id: 'M_11', title: 'Robot Transporter', classLevel: '8', topic: 'Python Robot', duration: '4 Minggu (6 JP)', driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p2_drive' }], creator: 'Ms. Nadia' },
    { id: 'M_12', title: 'Smart Home', classLevel: '8', topic: 'ESP32 IoT', duration: '4 Minggu (8 JP)', driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p7_drive' }], creator: 'Mr. Rizal' },
    { id: 'M_13', title: 'Smart Greenhouse', classLevel: '8', topic: 'ESP32 IoT', duration: '4 Minggu (6 JP)', driveLinks: [{ label: 'Folder Drive', url: 'https://drive.google.com/drive/folders/p7_drive' }], creator: 'Mr. Rizal' }
  ];
  var materiSheet = getOrCreateSheet("Materi");
  materiSheet.appendRow(["id", "title", "classLevel", "topic", "duration", "driveLinks", "creator"]);
  lessonsData.forEach(function(l) {
    materiSheet.appendRow([l.id, l.title, l.classLevel, l.topic, l.duration, JSON.stringify(l.driveLinks), l.creator]);
  });

  // ==========================================
  // 5. SEED KURIKULUM (CURRICULUM)
  // ==========================================
  var curriculumData = [
    {
      id: 'smart-trashbin', title: 'Smart Trashbin', gradeLevel: '7', semester: 'Semester 2', icon: 'trash',
      desc: 'Proyek tempat sampah pintar berbasis Microbit yang terbuka otomatis menggunakan servo saat mendeteksi objek.',
      duration: '3 Minggu', level: 'Pemula', type: 'Praktik Mandiri', status: 'Selesai', pic: 'Mr Fadhlan',
      subMateri: [
        { name: 'Fundamental Microbit', ref: 'Doc microbit: https://makecode.microbit.org/docs', link: 'fundamental microbit' },
        { name: 'Algoritma, konsep, dan komponen smart trashbin', link: 'algoritma smart trashbin' },
        { name: 'Pemrograman basic Makecode (variable, percabangan, looping, pins)', ref: 'Doc microbit: https://makecode.microbit.org/docs' },
        { name: 'Pemrograman Smart trashbin' },
        { name: 'K3 dalam bekerja', ref: 'PEDOMAN K3 LAB.docx', link: 'https://docs.google.com/presentation/d/1yuJzz-Hh4nJzL0BtJeKIWrrAOzg9V2pG/edit?usp=drive_link&ouid=104394771420958359917&rtpof=true&sd=true' },
        { name: 'Integrasi hardware dan program smart trashbin', link: 'https://canva.link/fz5kuw9d8j9zdja' },
        { name: 'Chatgpt / Google Lens Sebagai pembantu pengenalan awal komponen' }
      ],
      outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio']
    },
    {
      id: 'tinybit-bluetooth', title: 'Tinybit BT', gradeLevel: '7', semester: 'Semester 2', icon: 'bluetooth',
      desc: 'Membuat aplikasi web controller dan memprogram Tinybit Robot agar bisa dikendalikan secara nirkabel via Bluetooth.',
      duration: '3 Minggu', level: 'Pemula', type: 'Teori & Praktik', status: 'Selesai', pic: 'Mr Alfi',
      subMateri: [
        { name: 'Komunikasi Bluetooth', ref: 'bluetooth: https://www.elecfreaks.com/learn-en' },
        { name: 'Fundamental Tinybit', ref: 'tinybit: https://www.yahboom.net/study/Tinybit-Pro' },
        { name: 'Pemrograman basic untuk menggerakkan tinybit' },
        { name: 'Integrasi' },
        { name: 'Pengembangan kontroller pada tinybit bluetooth controller' },
        { name: 'Teknik prompting lovable (chatgpt)' },
        { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', link: 'teknik prompting' }
      ],
      outputs: ['Aplikasi Web Controller', 'Video Demo']
    },
    {
      id: 'tinybit-gesture', title: 'Tinybit Gesture', gradeLevel: '7', semester: 'Semester 2', icon: 'hand',
      desc: 'Mengendalikan robot Tinybit kedua dengan gerakan tangan (accelerometer) dari microbit transmitter.',
      duration: '3 Minggu', level: 'Pemula', type: 'Teori & Praktik', status: 'Belum Dimulai', pic: 'Mr Alfi',
      subMateri: [
        { name: 'Sejarah AI', ref: 'Teachable Machine', link: 'Sejarah AI' },
        { name: 'Konsep AI dan cara kerja', ref: 'Buku AI Kemendikbud', link: 'Konsep AI' },
        { name: 'Faktor-faktor yang mempengaruhi pembuatan AI', link: 'Faktor pengaruh AI' },
        { name: 'Teachable machine', ref: 'Apa Itu Machine Learning?' },
        { name: 'Faktor yang mempengaruhi kualitas model AI pada teachable machine' },
        { name: 'Integrasi', ref: 'Control Robot With Hand Gestures - CARDBOARD ROBOTS' },
        { name: 'Teknik prompting lovable (chatgpt)', ref: 'membuat web dengan ai' },
        { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', ref: '6 Teknik Prompting ChatGPT Agar Hasilnya Setara Kerja Expert - Argia Academy' }
      ],
      outputs: ['Program Transmitter-Receiver', 'Video Demo']
    },
    {
      id: 'tinybit-line', title: 'Tinybit Line Follower', gradeLevel: '7', semester: 'Semester 2', icon: 'route',
      desc: 'Robot Tinybit mengikuti garis hitam dengan algoritma PID agar gerakan lebih presisi dan smooth.',
      duration: '3 Minggu', level: 'Pemula', type: 'Praktik Mandiri', status: 'Belum Dimulai', pic: 'Mr Fadhlan',
      subMateri: [
        { name: 'Fundamental Line Follower' },
        { name: 'Algoritma Line Follower' },
        { name: 'Pemrograman basic dan lanjutan untuk menggerakkan line follower' },
        { name: 'Praktek dengan track sederhana' },
        { name: 'Teknik prompting (chatgpt / deepseek / claude)', link: 'teknik prompting' },
        { name: 'Tes dengan track advance (chatgpt / deepseek / claude)', link: 'track advance dengan ai' }
      ],
      outputs: ['Robot Line Follower PID', 'Video Demo']
    },
    {
      id: 'smart-watering-plant', title: 'Smart Watering', gradeLevel: '7', semester: 'Semester 2', icon: 'sprout',
      desc: 'Membangun penyiram tanaman otomatis berbasis kelembaban tanah dengan notifikasi telegram.',
      duration: '3 Minggu', level: 'Pemula', type: 'Deploy Project', status: 'Selesai', pic: 'Mr Fadhlan',
      subMateri: [
        { name: 'Algoritma, konsep, dan komponen smart watering plant', link: 'smart watering plant' },
        { name: 'Pemrograman Smart watering plant', link: 'smart watering plant' },
        { name: 'K3 dalam bekerja', ref: 'PEDOMAN K3 LAB.docx', link: 'https://drive.google.com/file/d/18GPMXi9-nlijGMKDGzuXay0cJu6ZIdCD/view?usp=drive_link' },
        { name: 'Integrasi hardware dan program smart watering plant', link: 'smart watering plant' },
        { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', link: 'teknik prompting' }
      ],
      outputs: ['Hardware Penyiram Tanaman', 'Video Demo']
    },
    {
      id: 'smart-parking', title: 'Smart Parking', gradeLevel: '7', semester: 'Semester 2', icon: 'parking',
      desc: 'Sistem palang pintu parkir otomatis menggunakan RFID reader dan sensor infra merah.',
      duration: '3 Minggu', level: 'Pemula', type: 'Praktik Mandiri', status: 'Selesai', pic: 'Mr Alfi',
      subMateri: [
        { name: 'Algoritma, konsep, dan komponen smart', link: 'modul smart parking' },
        { name: 'Pemrograman Smart parking' },
        { name: 'K3 dalam bekerja', link: 'https://drive.google.com/file/d/1hRZ1vqyA_ixJOPkkFh7Ab0oSh8rxUeX4/view?usp=sharing' },
        { name: 'Integrasi hardware dan program smart parking' },
        { name: 'Teachable machine', ref: 'Apa Itu Machine Learning?' }
      ],
      outputs: ['Prototip Palang Parkir', 'Flyer Proyek']
    },
    {
      id: 'robot-bluetooth-controller', title: 'Robot BT', gradeLevel: '8', semester: 'Semester 3', icon: 'bluetooth',
      desc: 'Mengendalikan robot beroda 4 berbasis python menggunakan modul Driver L298N dan koneksi Bluetooth.',
      duration: '5 Minggu', level: 'Menengah', type: 'Teori & Praktik', status: 'Belum Dimulai', pic: 'Mr. Rahmat Fadlan',
      subMateri: [
        { name: 'Komunikasi Bluetooth' }, { name: 'Fundamental driver l298N' }, { name: 'Pemrograman python untuk menggerakkan motor' },
        { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app controller' }, { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller' },
        { name: 'Integrasi' }
      ],
      outputs: ['Aplikasi Web Controller Vercel', 'Video Demo']
    },
    {
      id: 'robot-hand-gesture', title: 'Robot Gesture', gradeLevel: '8', semester: 'Semester 3', icon: 'hand',
      desc: 'Pengembangan web AI Controller berbasis Teachable Machine untuk mengontrol robot beroda menggunakan isyarat kamera.',
      duration: '5 Minggu', level: 'Menengah', type: 'Praktik AI', status: 'Belum Dimulai', pic: 'Mr. Rahmat Fadlan',
      subMateri: [
        { name: 'Sejarah AI' }, { name: 'Konsep AI dan cara kerja' }, { name: 'Faktor-faktor yang mempengaruhi pembuatan AI' },
        { name: 'Teachable machine' }, { name: 'Faktor yang mempengaruhi kualitas model AI pada teachable machine' },
        { name: 'Pemrograman python untuk robot hand gestures' }, { name: 'Integrasi' }, { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app AI' },
        { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller' }
      ],
      outputs: ['Model Teachable Machine', 'Video Demo']
    },
    {
      id: 'parking-ai', title: 'Parking AI', gradeLevel: '8', semester: 'Semester 3', icon: 'parking',
      desc: 'Otomatisasi palang parkir pintar menggunakan Computer Vision Python dan database.',
      duration: '5 Minggu', level: 'Menengah', type: 'Praktik database', status: 'Belum Dimulai', pic: 'Mr. Rahmat Fadlan',
      subMateri: [
        { name: 'Faktor-faktor yang mempengaruhi pembuatan AI' }, { name: 'Pemrograman python untuk smart parking' }, { name: 'database' },
        { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app control dan monitor' }, { name: 'Pemrograman Smart parking' },
        { name: 'K3 dalam projek smart parking' }, { name: 'Integrasi hardware dan program smart parking AI' },
        { name: 'ChatGPT / Claude: brainstorming ide pengembangan smart parking' }
      ],
      outputs: ['Sistem Smart Parking AI', 'Video Demo']
    },
    {
      id: 'robot-line-follower', title: 'Line Follower', gradeLevel: '8', semester: 'Semester 3', icon: 'route',
      desc: 'Pemrograman Python tingkat lanjut pada robot untuk menyusuri track garis hitam dengan algoritma PID.',
      duration: '5 Minggu', level: 'Menengah', type: 'Praktik Robotika', status: 'Belum Dimulai', pic: 'Ms. Nadia',
      subMateri: [
        { name: 'Fundamental Line Follower' }, { name: 'Algoritma Line Follower' }, { name: 'Pemrograman python basic dan lanjutan untuk menggerakkan line follower' },
        { name: 'Praktek dengan track sederhana' }, { name: 'Teknik prompting (chatgpt / deepseek / claude)' }, { name: 'Tes dengan track advance (chatgpt / deepseek / claude)' }
      ],
      outputs: ['Robot Python Line Follower', 'Video Demo']
    },
    {
      id: 'robot-transporter', title: 'Transporter', gradeLevel: '8', semester: 'Semester 3', icon: 'package',
      desc: 'Proyek merakit dan memprogram robot pengangkut barang dengan capit servo yang dikendalikan via Web App.',
      duration: '5 Minggu', level: 'Menengah', type: 'Integrasi Proyek', status: 'Belum Dimulai', pic: 'Ms. Nadia',
      subMateri: [
        { name: 'Algoritma, konsep, dan komponen robot transporter' }, { name: 'Pemrograman python untuk robot transporter' },
        { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app controller' }, { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller' },
        { name: 'Integrasi' }
      ],
      outputs: ['Robot Transporter dengan Capit', 'Video Demo']
    },
    {
      id: 'smart-home', title: 'Smart Home', gradeLevel: '8', semester: 'Semester 4', icon: 'home',
      desc: 'Membangun rumah pintar berbasis ESP32 dengan kendali relay nirkabel dan Firebase database.',
      duration: '6 Minggu', level: 'Lanjut', type: 'Deploy Project', status: 'Belum Dimulai', pic: 'Mr. Rizal',
      subMateri: [
        { name: 'Algoritma, konsep, dan komponen smart parking' }, { name: 'Faktor-faktor yang mempengaruhi pembuatan AI' },
        { name: 'Fundamental esp32' }, { name: 'Pemrograman arduino ide' }, { name: 'database' },
        { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app control dan monitor' }, { name: 'Pemrograman Smart home' },
        { name: 'K3 dalam bekerja' }, { name: 'Integrasi hardware dan program smart home' }, { name: 'ChatGPT / Claude: brainstorming ide pengembangan smart parking' }
      ],
      outputs: ['Prototype Smart Home', 'Video Demo']
    },
    {
      id: 'smart-greenhouse', title: 'Smart Greenhouse', gradeLevel: '8', semester: 'Semester 4', icon: 'sprout',
      desc: 'Kubah tanaman mandiri dengan dashboard web real-time untuk memantau suhu dan kelembaban.',
      duration: '6 Minggu', level: 'Lanjut', type: 'Integrasi IoT', status: 'Belum Dimulai', pic: 'Mr. Rizal',
      subMateri: [
        { name: 'Algoritma, konsep, dan komponen smart parking' }, { name: 'Faktor-faktor yang mempengaruhi pembuatan AI' },
        { name: 'Fundamental esp32' }, { name: 'Pemrograman arduino ide' }, { name: 'database' },
        { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app control dan monitor' }, { name: 'Pemrograman Smart greenhouse' },
        { name: 'K3 dalam bekerja' }, { name: 'Integrasi hardware dan program smart greenhouse' }, { name: 'ChatGPT / Claude: brainstorming ide pengembangan smart greenhouse' }
      ],
      outputs: ['Dashboard Web Monitoring', 'Video Demo']
    }
  ];
  var curriculumSheet = getOrCreateSheet("Kurikulum");
  curriculumSheet.appendRow(["id", "title", "gradeLevel", "semester", "icon", "desc", "duration", "level", "type", "status", "pic", "subMateri", "outputs"]);
  curriculumData.forEach(function(s) {
    curriculumSheet.appendRow([s.id, s.title, s.gradeLevel, s.semester, s.icon, s.desc, s.duration, s.level, s.type, s.status, s.pic, JSON.stringify(s.subMateri), JSON.stringify(s.outputs)]);
  });

  // ==========================================
  // 6. SEED PROJECTS (PROJECT LIBRARY)
  // ==========================================
  var projectsData = [
    { id: 'P_1', name: 'Smart Trashbin', category: 'IoT Smart Project', difficulty: 'Mudah', description: 'Proyek tempat sampah pintar berbasis Microbit yang terbuka otomatis menggunakan servo saat mendeteksi objek.', objectives: 'Mampu mendeteksi keberadaan objek secara otomatis menggunakan sensor ultrasonik.', competencies: 'Pemrograman Makecode, Integrasi Servo SG90, Sensor Ultrasonik.', hardware: ['Micro:bit V2', 'Sensor Ultrasonik HC-SR04', 'Servo SG90', 'Battery Pack'], software: ['MakeCode', 'ChatGPT', 'Google Lens'], duration: '3 Minggu', driveLink: 'https://docs.google.com/presentation/d/1yuJzz-Hh4nJzL0BtJeKIWrrAOzg9V2pG/edit?usp=drive_link', githubLink: '', author: 'Mr Fadhlan', year: '2027', curriculumId: 'smart-trashbin' },
    { id: 'P_2', name: 'Tinybit Bluetooth Controller', category: 'Tinybit', difficulty: 'Mudah', description: 'Membuat aplikasi web controller dan memprogram Tinybit Robot agar bisa dikendalikan secara nirkabel via Bluetooth.', objectives: 'Mampu mengontrol pergerakan robot Tinybit via koneksi Bluetooth.', competencies: 'Konektivitas Bluetooth, Pemrograman Event-Driven, Logika Driver Motor.', hardware: ['Robot Tinybit', 'Micro:bit V2', 'Smartphone / Laptop'], software: ['MakeCode', 'Lovable', 'Vercel', 'ChatGPT'], duration: '3 Minggu', driveLink: 'https://drive.google.com/drive/folders/p1_drive', githubLink: 'https://github.com/idn-robotics/tinybit-bluetooth', author: 'Mr Alfi', year: '2027', curriculumId: 'tinybit-bluetooth' },
    { id: 'P_3', name: 'Tinybit Hand Gesture', category: 'Tinybit', difficulty: 'Mudah', description: 'Mengendalikan robot Tinybit kedua dengan gerakan tangan (accelerometer) dari microbit transmitter.', objectives: 'Mampu mengklasifikasikan gestur tangan menggunakan Teachable Machine untuk mengendalikan robot.', competencies: 'Komunikasi Radio Frekuensi, Analisis Sensor Accelerometer, Deteksi Gestur.', hardware: ['2x Micro:bit V2', 'Robot Tinybit', 'Battery Pack'], software: ['Teachable Machine (Google)', 'MakeCode', 'ChatGPT'], duration: '3 Minggu', driveLink: 'https://drive.google.com/drive/folders/p2_drive', githubLink: 'https://github.com/idn-robotics/tinybit-gesture', author: 'Mr Alfi', year: '2027', curriculumId: 'tinybit-gesture' },
    { id: 'P_4', name: 'Smart Watering Plant', category: 'IoT Smart Project', difficulty: 'Mudah', description: 'Membangun penyiram tanaman otomatis berbasis kelembaban tanah dengan notifikasi telegram.', objectives: 'Mampu menyiram tanaman secara otomatis berdasarkan sensor kelembaban tanah.', competencies: 'Sensor Soil Moisture, Relay Switch, Pompa Air 5V, Notifikasi Telegram.', hardware: ['ESP32 NodeMCU', 'Soil Moisture Sensor', 'Relay 5V', 'Pompa Air Mini 5V'], software: ['Arduino IDE', 'Telegram Bot API', 'ChatGPT'], duration: '3 Minggu', driveLink: 'https://drive.google.com/file/d/18GPMXi9-nlijGMKDGzuXay0cJu6ZIdCD/view', githubLink: 'https://github.com/idn-robotics/smart-watering', author: 'Mr Fadhlan', year: '2027', curriculumId: 'smart-watering-plant' },
    { id: 'P_5', name: 'Tinybit Line Follower', category: 'Tinybit', difficulty: 'Mudah', description: 'Robot Tinybit mengikuti garis hitam dengan algoritma PID agar gerakan lebih presisi and smooth.', objectives: 'Mampu memprogram robot Tinybit untuk menyusuri lintasan garis hitam menggunakan sensor inframerah.', competencies: 'Algoritma PID, Sensor Kalibrasi, Optimasi Kecepatan Motor.', hardware: ['Robot Tinybit', 'Micro:bit V2', 'Track Line Follower'], software: ['MakeCode', 'ChatGPT', 'Claude'], duration: '3 Minggu', driveLink: 'https://drive.google.com/drive/folders/p3_drive', githubLink: 'https://github.com/idn-robotics/tinybit-line-pid', author: 'Mr Fadhlan', year: '2027', curriculumId: 'tinybit-line' },
    { id: 'P_6', name: 'Smart Parking', category: 'IoT Smart Project', difficulty: 'Mudah', description: 'Sistem palang pintu parkir otomatis menggunakan RFID reader dan sensor infra merah.', objectives: 'Mampu merancang pintu gerbang parkir otomatis menggunakan kartu RFID.', competencies: 'RFID SPI Protocol, Servo Gate Control, Logika Deteksi Infrared.', hardware: ['ESP32', 'RFID RC522 Reader', 'Servo SG90', 'Sensor Infrared Obstacle'], software: ['Arduino IDE', 'ChatGPT', 'Claude'], duration: '3 Minggu', driveLink: 'https://drive.google.com/file/d/1hRZ1vqyA_ixJOPkkFh7Ab0oSh8rxUeX4/view', githubLink: 'https://github.com/idn-robotics/smart-parking', author: 'Mr Alfi', year: '2027', curriculumId: 'smart-parking' },
    { id: 'P_7', name: 'Robot Bluetooth Controller', category: 'AI Robotic Project', difficulty: 'Sedang', description: 'Mengendalikan robot beroda 4 berbasis python menggunakan modul Driver L298N and koneksi Bluetooth.', objectives: 'Mampu mengendalikan gerakan robot beroda 4 berbasis Python via Bluetooth.', competencies: 'Pemrograman Python, Driver Motor L298N, Serial Bluetooth communication.', hardware: ['Robot Car Chassis', 'Raspberry Pi / Jetson Nano', 'Driver Motor L298N', 'Bluetooth Module'], software: ['Python 3', 'Lovable', 'Vercel', 'ChatGPT'], duration: '5 Minggu', driveLink: 'https://drive.google.com/drive/folders/p1_drive', githubLink: 'https://github.com/idn-robotics/robot-bluetooth', author: 'Mr. Rahmat Fadlan', year: '2026', curriculumId: 'robot-bluetooth-controller' },
    { id: 'P_8', name: 'Robot Hand Gesture', category: 'AI Robotic Project', difficulty: 'Sedang', description: 'Pengembangan web AI Controller berbasis Teachable Machine untuk mengontrol robot beroda menggunakan isyarat kamera.', objectives: 'Mampu melatih model machine learning gestur tangan dan menghubungkannya ke kontrol robot Python.', competencies: 'Computer Vision, WebSockets Communication, AI Model Training.', hardware: ['Robot Car Chassis', 'Webcam', 'PC / Laptop', 'Microcontroller'], software: ['Python', 'Teachable Machine', 'WebSockets', 'Lovable'], duration: '5 Minggu', driveLink: 'https://drive.google.com/drive/folders/p2_drive', githubLink: 'https://github.com/idn-robotics/robot-gesture', author: 'Mr. Rahmat Fadlan', year: '2026', curriculumId: 'robot-hand-gesture' },
    { id: 'P_9', name: 'Smart Parking AI', category: 'Computer Vision Project', difficulty: 'Sedang', description: 'Otomatisasi palang parkir pintar menggunakan Computer Vision Python and database.', objectives: 'Mampu mendeteksi plat nomor kendaraan atau slot parkir kosong menggunakan OpenCV Python.', competencies: 'OpenCV Image Processing, SQLite Database Integration, Python GUI.', hardware: ['Camera Module', 'Palang Parkir Prototip', 'ESP32 / Arduino'], software: ['Python 3', 'OpenCV', 'SQLite', 'ChatGPT'], duration: '5 Minggu', driveLink: 'https://drive.google.com/drive/folders/p6_drive', githubLink: 'https://github.com/idn-robotics/parking-ai', author: 'Mr Fadhlan', year: '2026', curriculumId: 'parking-ai' },
    { id: 'P_10', name: 'Robot Line Follower', category: 'AI Robotic Project', difficulty: 'Sedang', description: 'Pemrograman Python tingkat lanjut pada robot untuk menyusuri track garis hitam dengan algoritma PID.', objectives: 'Mampu menerapkan algoritma PID tingkat lanjut menggunakan pemrograman Python pada robot line follower.', competencies: 'Algoritma PID, Python Sensor Reading, Motor Speed Calibration.', hardware: ['Python Robot Kit', 'IR Sensor Array', 'Chassis & DC Motors'], software: ['Python 3', 'ChatGPT', 'Claude'], duration: '5 Minggu', driveLink: 'https://drive.google.com/drive/folders/p3_drive', githubLink: 'https://github.com/idn-robotics/robot-line-pid', author: 'Ms. Nadia', year: '2026', curriculumId: 'robot-line-follower' },
    { id: 'P_11', name: 'Robot Transporter', category: 'AI Robotic Project', difficulty: 'Sedang', description: 'Proyek merakit dan memprogram robot pengangkut barang dengan capit servo yang dikendalikan via Web App.', objectives: 'Mampu merakit mekanisme capit servo dan memprogramnya untuk memindahkan barang.', competencies: 'Mekanika capit servo, Pemrograman Python, Integrasi Web Controller.', hardware: ['Robot Car Chassis', 'Capit Robot Metal', 'Servo Motor MG996R', 'Microcontroller'], software: ['Python 3', 'Lovable', 'Vercel', 'ChatGPT'], duration: '5 Minggu', driveLink: 'https://drive.google.com/drive/folders/p2_drive', githubLink: 'https://github.com/idn-robotics/robot-transporter', author: 'Ms. Nadia', year: '2026', curriculumId: 'robot-transporter' },
    { id: 'P_12', name: 'Smart Home', category: 'IoT Smart Project', difficulty: 'Sulit', description: 'Membangun rumah pintar berbasis ESP32 dengan kendali relay nirkabel dan Firebase database.', objectives: 'Mampu menghubungkan ESP32 ke Firebase Realtime Database untuk memantau sensor dan kontrol lampu.', competencies: 'ESP32 Wi-Fi Client, Firebase SDK, Web Interface Dashboard, Relay Logic.', hardware: ['ESP32 NodeMCU', 'Sensor DHT11 / DHT22', 'Relay Module 4 Ch', 'Sensor Gas MQ2'], software: ['Arduino IDE', 'Firebase Console', 'Lovable', 'Vercel'], duration: '6 Minggu', driveLink: 'https://drive.google.com/drive/folders/p7_drive', githubLink: 'https://github.com/idn-robotics/smart-home-esp32', author: 'Mr. Rizal', year: '2027', curriculumId: 'smart-home' },
    { id: 'P_13', name: 'Smart Greenhouse', category: 'IoT Smart Project', difficulty: 'Sulit', description: 'Kubah tanaman mandiri dengan dashboard web real-time untuk memantau suhu dan kelembaban.', objectives: 'Mampu merancang sistem otomatisasi penyiraman dan sirkulasi udara rumah kaca berbasis WebSockets.', competencies: 'WebSockets real-time communication, Hysteresis Controller, Multi-sensor logging.', hardware: ['ESP32', 'DHT22 Temp/Humid Sensor', 'LDR Light Sensor', 'Relay Board', 'DC Fan', 'Water Pump'], software: ['Arduino IDE', 'WebSockets Server', 'Lovable', 'Vercel'], duration: '6 Minggu', driveLink: 'https://drive.google.com/drive/folders/p7_drive', githubLink: 'https://github.com/idn-robotics/smart-greenhouse', author: 'Mr. Rizal', year: '2027', curriculumId: 'smart-greenhouse' }
  ];
  var projectSheet = getOrCreateSheet("Project");
  projectSheet.appendRow(["id", "name", "category", "difficulty", "description", "objectives", "competencies", "hardware", "software", "duration", "driveLink", "githubLink", "author", "year", "curriculumId"]);
  projectsData.forEach(function(p) {
    projectSheet.appendRow([p.id, p.name, p.category, p.difficulty, p.description, p.objectives, p.competencies, JSON.stringify(p.hardware), JSON.stringify(p.software), p.duration, p.driveLink, p.githubLink, p.author, p.year, p.curriculumId]);
  });

  // ==========================================
  // 7. SEED SOP SHEET
  // ==========================================
  var sopData = [
    {
      id: 'SOP_1', title: 'SOP Menyalakan & Memprogram Robot Tinybit', robotName: 'Yahboom Tinybit',
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
      id: 'SOP_2', title: 'SOP Penggunaan ESP32 & Arduino IDE', robotName: 'ESP32 NodeMCU',
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
  var sopSheet = getOrCreateSheet("SOP");
  sopSheet.appendRow(["id", "title", "robotName", "steps"]);
  sopData.forEach(function(s) {
    sopSheet.appendRow([s.id, s.title, s.robotName, JSON.stringify(s.steps)]);
  });

  // ==========================================
  // 8. SEED INVENTORY
  // ==========================================
  var inventoryData = [
    { id: 'I_1', name: 'Micro:bit V2 Board', code: 'MCB-001', category: 'Microcontroller', status: 'Tersedia', condition: 'Baik', location: 'Laci A-1' },
    { id: 'I_2', name: 'Robot Kit Tinybit Yahboom', code: 'RBT-010', category: 'Robot Kit', status: 'Tersedia', condition: 'Baik', location: 'Rak Robot B-2' },
    { id: 'I_3', name: 'ESP32 NodeMCU V1', code: 'ESP-004', category: 'Microcontroller', status: 'Tersedia', condition: 'Baik', location: 'Laci A-3' },
    { id: 'I_4', name: 'Sensor Ultrasonic HC-SR04', code: 'SNS-020', category: 'Sensor', status: 'Dipinjam', condition: 'Baik', location: 'Laci B-1' },
    { id: 'I_5', name: 'Servo Motor SG90 9g', code: 'MCH-002', category: 'Mechanical', status: 'Tersedia', condition: 'Baik', location: 'Laci C-2' },
    { id: 'I_6', name: 'DHT11 Temperature Sensor', code: 'SNS-005', category: 'Sensor', status: 'Perbaikan', condition: 'Rusak Ringan', location: 'Meja Servis' },
    { id: 'I_7', name: 'RFID RC522 Module Kit', code: 'SNS-015', category: 'Sensor', status: 'Tersedia', condition: 'Baik', location: 'Laci B-4' },
    { id: 'I_8', name: 'Solder Listrik Goon 40W', code: 'TLS-002', category: 'Tools', status: 'Tersedia', condition: 'Baik', location: 'Lemari Alat 1' }
  ];
  var invSheet = getOrCreateSheet("Inventaris");
  invSheet.appendRow(["id", "name", "code", "category", "status", "condition", "location"]);
  inventoryData.forEach(function(i) {
    invSheet.appendRow([i.id, i.name, i.code, i.category, i.status, i.condition, i.location]);
  });

  // ==========================================
  // 9. AUDIT LOG SHEET
  // ==========================================
  var logSheet = getOrCreateSheet("AuditLog");
  logSheet.appendRow(["timestamp", "user", "action", "module"]);
  logSheet.appendRow([new Date().toLocaleString(), "System", "Initialized synced database tables and dummy datasets", "System"]);

  Browser.msgBox("Success", "Spreadsheet database has been successfully seeded with synchronized frontend data!", Browser.Buttons.OK);
}
