import React, { useState } from 'react';
import { 
  Cpu, 
  GitFork, 
  Code2, 
  Trash2, 
  FolderGit, 
  Shield, 
  Trophy, 
  Bluetooth, 
  Disc, 
  Brain, 
  Infinity as InfinityIcon, 
  Flame, 
  LineChart, 
  Home, 
  CheckSquare, 
  Check, 
  Square, 
  FileText, 
  ArrowRight, 
  Map, 
  Calendar, 
  History, 
  TrendingUp, 
  Play, 
  Clock, 
  Sparkles,
  Settings,
  Droplet,
  Route,
  Car,
  GraduationCap,
  Package,
  Sprout,
  Hand,
  ChevronLeft,
  ChevronRight,
  Send,
  Bookmark
} from 'lucide-react';

const TrainIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg version="1.1" className={className} viewBox="0 0 65 61" xmlSpace="preserve">
    <title>Train</title>
    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M55,55.9 h7.7L58,42v-8c-0.3-1.1-1-5-1-5v-2h1c1.1,0,1-0.9,1-2v-1c0-1.1,0.1-2-1-2h-7c-1.1,0-1,0.9-1,2v1c0,1.1-0.1,2,1,2h1v5h-7v-3h-4v3h-5 v-3h-4v3h-5v-8h0.9c1.1,0,1-0.9,1-2v-3c0-1.1,0.1-2-1-2H4c-1.1,0-1,0.9-1,2v3c0,1.1-0.1,2,1,2h1v13.9H2c-1.1,0-1,0.9-1,2v9 c0,1.1-0.1,2,1,2h3"/>
    <path fill="none" stroke="currentColor" strokeWidth="2" d="M39.8,54.9h4"/>
    <path fill="none" stroke="currentColor" strokeWidth="2" d="M22.103,54.9H28"/>
    <rect x="9" y="25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" width="5" height="11.9" />
    <rect x="18" y="25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" width="5" height="7" />
    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M21.9,46.9h37.8"/>
    <path fill="none" stroke="currentColor" strokeWidth="2" d="M52.8,11.4h-0.1 c0.1-0.3,0.1-0.6,0.1-0.9c0-1.6-1.1-2.9-2.6-3.2c-0.2-1.8-1.8-3.2-3.8-3.2H46C45.2,2.3,43.3,1,41.1,1c-3,0-5.1,1.8-5.1,4.7 c0,3.7,3,5.1,5.2,5.1c0.6,1.1,1.7,1.8,3.1,1.8c0.7,0,1.4-0.2,2-0.6c0.6,1.1,1.7,1.9,3.1,1.9c0.6,0,1.2-0.1,1.6-0.4 c0.1,0.9,0.9,1.6,1.8,1.6c1,0,1.9-0.8,1.9-1.8C54.6,12.2,53.8,11.4,52.8,11.4L52.8,11.4z"/>
    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M14,42 h44"/>
    <circle fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" cx="14" cy="51" r="9" />
    <circle fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" cx="34" cy="54" r="6" />
    <circle fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" cx="50" cy="54" r="6" />
  </svg>
);

interface SubMateri {
  name: string;
  ref?: string;
  link?: string;
}

interface Subject {
  id: string;
  title: string;
  semester: string;
  icon: string;
  desc: string;
  duration: string;
  level: string;
  type: string;
  status: 'Selesai' | 'Sedang Berjalan' | 'Belum Dimulai';
  subMateri: SubMateri[];
  outputs: string[];
  pic: string;
}

interface GradeTrack {
  grade: string;
  gradeNum: string;
  semester: string;
  subjects: Subject[];
}

const iconMap: Record<string, any> = {
  'cpu': Cpu,
  'git-fork': GitFork,
  'code': Code2,
  'trash': Trash2,
  'briefcase': FolderGit,
  'shield': Shield,
  'trophy': Trophy,
  'bluetooth': Bluetooth,
  'disc': Disc,
  'brain': Brain,
  'infinity': InfinityIcon,
  'flame': Flame,
  'line-chart': LineChart,
  'home': Home,
  'settings': Settings,
  'watering': Droplet,
  'route': Route,
  'parking': Car,
  'graduation': GraduationCap,
  'package': Package,
  'sprout': Sprout,
  'hand': Hand
};

const timelineData: GradeTrack[] = [
  {
    grade: 'Kelas 7',
    gradeNum: '7',
    semester: 'Semester 2',
    subjects: [
      {
        id: 'smart-trashbin',
        title: 'Smart Trashbin',
        semester: 'Semester 2',
        icon: 'trash',
        desc: 'Proyek pembuatan tempat sampah pintar berbasis Microbit yang membuka otomatis menggunakan servo ketika mendeteksi objek di dekatnya.',
        duration: '4 Jam',
        level: 'Pemula',
        type: 'Praktik Mandiri',
        status: 'Selesai',
        pic: 'Mr Fadhlan',
        subMateri: [
          { name: 'Fundamental Microbit', ref: 'Doc microbit: makecode.microbit.org/docs' },
          { name: 'Algoritma, konsep, dan komponen smart trashbin', link: 'algoritma smart trashbin' },
          { name: 'Pemrograman basic Makecode (variable, percabangan, looping, pins)' },
          { name: 'Pemrograman Smart trashbin' },
          { name: 'K3 dalam bekerja', ref: 'PEDOMAN K3 LAB.docx', link: 'https://docs.google.com/presentation/d/1yuJzz-Hh4nJzL0BtJeKIWrrAOzg9V2pG/edit?usp=drive_link' },
          { name: 'Integrasi hardware dan program smart trashbin', link: 'https://canva.link/fz5kuw9d8j9zdja' },
          { name: 'Chatgpt / Google Lens Sebagai pembantu pengenalan awal komponen' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio', 'Kumpulan Deskripsi Komponen']
      },
      {
        id: 'tinybit-bluetooth',
        title: 'Tinybit BT',
        semester: 'Semester 2',
        icon: 'bluetooth',
        desc: 'Membuat aplikasi web controller dan memprogram Tinybit Robot agar bisa dikendalikan secara nirkabel via Bluetooth.',
        duration: '4 Jam',
        level: 'Pemula',
        type: 'Teori & Praktik',
        status: 'Selesai',
        pic: 'Mr Alfi',
        subMateri: [
          { name: 'Komunikasi Bluetooth & Serial Data', ref: 'bluetooth: https://www.elecfreaks.com/learn-en' },
          { name: 'Fundamental Tinybit', ref: 'tinybit: https://www.yahboom.net/study/Tinybit-Pro' },
          { name: 'Pemrograman basic untuk menggerakkan tinybit' },
          { name: 'Integrasi hardware dan modul bluetooth' },
          { name: 'Pengembangan kontroller pada tinybit bluetooth controller' },
          { name: 'Teknik prompting lovable (chatgpt)' },
          { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio', 'Aplikasi Web Controller']
      },
      {
        id: 'tinybit-gesture',
        title: 'Tinybit Gesture',
        semester: 'Semester 2',
        icon: 'hand',
        desc: 'Mengintegrasikan model kecerdasan buatan Teachable Machine dengan robot Tinybit untuk menggerakkan robot lewat isyarat tangan.',
        duration: '4 Jam',
        level: 'Pemula',
        type: 'Praktik AI',
        status: 'Selesai',
        pic: 'Mr Alfi',
        subMateri: [
          { name: 'Sejarah AI & Teachable Machine' },
          { name: 'Konsep AI dan cara kerja (Buku AI Kemendikbud)' },
          { name: 'Faktor-faktor yang mempengaruhi pembuatan AI' },
          { name: 'Teachable machine (Apa Itu Machine Learning?)' },
          { name: 'Faktor yang mempengaruhi kualitas model AI' },
          { name: 'Integrasi AI Model dengan Web Controller' },
          { name: 'Teknik prompting lovable (chatgpt)' },
          { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio', 'Model Teachable Machine']
      },
      {
        id: 'smart-watering',
        title: 'Smart Watering',
        semester: 'Semester 2',
        icon: 'watering',
        desc: 'Sistem penyiraman tanaman otomatis berbasis kelembaban tanah dengan pompa air DC mini.',
        duration: '3 Jam',
        level: 'Pemula',
        type: 'Praktik Mandiri',
        status: 'Sedang Berjalan',
        pic: 'Mr Fadhlan',
        subMateri: [
          { name: 'Algoritma, konsep, dan komponen smart watering plant', link: 'smart watering plant' },
          { name: 'Pemrograman Smart watering plant' },
          { name: 'K3 dalam bekerja', link: 'https://drive.google.com/file/d/18GPMXi9-nlijGMKDGzuXay0cJu6ZIdCD/view' },
          { name: 'Integrasi hardware dan program smart watering' },
          { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio']
      },
      {
        id: 'tinybit-line',
        title: 'Line Follower',
        semester: 'Semester 2',
        icon: 'route',
        desc: 'Pemrograman sensor infra merah pada Tinybit untuk menelusuri garis hitam pada track secara presisi.',
        duration: '4 Jam',
        level: 'Pemula',
        type: 'Praktik Robotika',
        status: 'Belum Dimulai',
        pic: 'Mr Fadhlan',
        subMateri: [
          { name: 'Fundamental Line Follower & Pembacaan Sensor' },
          { name: 'Algoritma Belok Kanan-Kiri & Perempatan' },
          { name: 'Pemrograman basic dan lanjutan untuk menggerakkan line follower' },
          { name: 'Praktek dengan track sederhana' },
          { name: 'Teknik prompting (chatgpt / deepseek / claude) untuk algoritma track advance' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio', 'Kumpulan Algoritma Track (PDF)']
      },
      {
        id: 'smart-parking',
        title: 'Smart Parking',
        semester: 'Semester 2',
        icon: 'parking',
        desc: 'Proyek palang parkir otomatis menggunakan sensor infra merah dan motor servo sebagai penghalang.',
        duration: '3 Jam',
        level: 'Pemula',
        type: 'Praktik Mandiri',
        status: 'Belum Dimulai',
        pic: 'Mr Alfi',
        subMateri: [
          { name: 'Algoritma, konsep, dan komponen smart parking', link: 'modul smart parking' },
          { name: 'Pemrograman Smart parking & Servo Angle Calibration' },
          { name: 'K3 dalam bekerja', link: 'https://drive.google.com/file/d/1hRZ1vqyA_ixJOPkkFh7Ab0oSh8rxUeX4/view' },
          { name: 'Integrasi hardware dan program smart parking' },
          { name: 'Penerapan Teachable Machine untuk deteksi plat nomor / kendaraan' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio']
      },
      {
        id: 'graduation-7',
        title: 'Graduation',
        semester: 'Semester 2',
        icon: 'graduation',
        desc: 'Mencapai kelulusan modul Kelas 7 SMP, siap melangkah ke kurikulum Kelas 8 (Python & AI Robot).',
        duration: '1 Jam',
        level: 'Evaluasi',
        type: 'Kelulusan',
        status: 'Belum Dimulai',
        pic: 'System',
        subMateri: [
          { name: 'Presentasi Portofolio Proyek Terpilih Kelas 7' },
          { name: 'Penilaian Akhir & Penerbitan Sertifikat Kelulusan' }
        ],
        outputs: ['Sertifikat Kompetensi']
      }
    ]
  },
  {
    grade: 'Kelas 8',
    gradeNum: '8',
    semester: 'Semester 3',
    subjects: [
      {
        id: 'robot-bluetooth',
        title: 'Robot BT',
        semester: 'Semester 3',
        icon: 'bluetooth',
        desc: 'Mengendalikan robot beroda 4 berbasis python menggunakan modul Driver L298N dan koneksi Bluetooth.',
        duration: '4 Jam',
        level: 'Menengah',
        type: 'Teori & Praktik',
        status: 'Belum Dimulai',
        pic: 'Mr. Rahmat Fadlan',
        subMateri: [
          { name: 'Komunikasi Bluetooth & Serial Data', ref: 'bluetooth: https://www.elecfreaks.com/learn-en' },
          { name: 'Fundamental driver motor L298N' },
          { name: 'Pemrograman python untuk menggerakkan motor' },
          { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app controller', link: 'membuat web dengan ai' },
          { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', link: 'teknik prompting' },
          { name: 'Integrasi hardware, driver motor, dan bluetooth' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio', 'Aplikasi Web Controller Vercel']
      },
      {
        id: 'robot-gesture',
        title: 'Robot Gesture',
        semester: 'Semester 3',
        icon: 'hand',
        desc: 'Pengembangan web AI Controller berbasis Teachable Machine untuk mengontrol robot beroda menggunakan isyarat kamera.',
        duration: '4 Jam',
        level: 'Menengah',
        type: 'Praktik AI',
        status: 'Belum Dimulai',
        pic: 'Mr. Rahmat Fadlan',
        subMateri: [
          { name: 'Teachable Machine & Sejarah AI' },
          { name: 'Konsep AI dan cara kerja (Buku AI Kemendikbud)' },
          { name: 'Faktor-faktor yang mempengaruhi pembuatan AI' },
          { name: 'Teachable machine & Faktor kualitas model AI' },
          { name: 'Pemrograman python untuk robot hand gestures' },
          { name: 'Integrasi Web AI dengan program Python Robot' },
          { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app AI', link: 'membuat web dengan ai' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio', 'Model Teachable Machine']
      },
      {
        id: 'parking-ai',
        title: 'Parking AI',
        semester: 'Semester 3',
        icon: 'parking',
        desc: 'Otomatisasi palang parkir pintar menggunakan Computer Vision Python dan database.',
        duration: '4 Jam',
        level: 'Menengah',
        type: 'Praktik database',
        status: 'Belum Dimulai',
        pic: 'Mr. Rahmat Fadlan',
        subMateri: [
          { name: 'Faktor-faktor yang mempengaruhi pembuatan AI', link: 'rahasia permodelan ai' },
          { name: 'Pemrograman python untuk smart parking' },
          { name: 'Database setup & integration' },
          { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app control and monitor', link: 'membuat web dengan ai' },
          { name: 'K3 dalam projek smart parking', link: 'k3' },
          { name: 'Integrasi hardware dan program smart parking AI' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio']
      },
      {
        id: 'robot-line',
        title: 'Line Follower',
        semester: 'Semester 3',
        icon: 'route',
        desc: 'Pemrograman Python tingkat lanjut pada robot untuk menyusuri track garis hitam dengan algoritma PID.',
        duration: '4 Jam',
        level: 'Menengah',
        type: 'Praktik Robotika',
        status: 'Belum Dimulai',
        pic: 'Ms. Nadia',
        subMateri: [
          { name: 'Fundamental Line Follower & Sensor reading' },
          { name: 'Algoritma Line Follower' },
          { name: 'Pemrograman python basic dan lanjutan untuk menggerakkan line follower' },
          { name: 'Praktek dengan track sederhana' },
          { name: 'Teknik prompting (chatgpt / deepseek / claude)' },
          { name: 'Tes dengan track advance (chatgpt / deepseek / claude)', link: 'track advance dengan ai' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio']
      },
      {
        id: 'robot-transporter',
        title: 'Transporter',
        semester: 'Semester 3',
        icon: 'package',
        desc: 'Proyek merakit dan memprogram robot pengangkut barang dengan capit servo yang dikendalikan via Web App.',
        duration: '4 Jam',
        level: 'Menengah',
        type: 'Integrasi Proyek',
        status: 'Belum Dimulai',
        pic: 'Ms. Nadia',
        subMateri: [
          { name: 'Algoritma, konsep, dan komponen robot transporter' },
          { name: 'Pemrograman python untuk robot transporter & capit servo' },
          { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app controller', link: 'membuat web dengan ai' },
          { name: 'ChatGPT / Claude: brainstorming ide pengembangan fitur kontroller', link: 'teknik prompting' },
          { name: 'Integrasi mekanikal capit, sasis, dan modul nirkabel' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio']
      },
      {
        id: 'graduation-8',
        title: 'Graduation',
        semester: 'Semester 3',
        icon: 'graduation',
        desc: 'Kelulusan modul Kelas 8 SMP, siap melangkah ke tingkat mahir Kelas 8 (ESP32 IoT & Firebase Cloud).',
        duration: '1 Jam',
        level: 'Evaluasi',
        type: 'Kelulusan',
        status: 'Belum Dimulai',
        pic: 'System',
        subMateri: [
          { name: 'Demo & Presentasi Robot Transporter' },
          { name: 'Sertifikasi Modul Kelas 8' }
        ],
        outputs: ['Sertifikat Kelas 8']
      }
    ]
  },
  {
    grade: 'Kelas 8',
    gradeNum: '8',
    semester: 'Semester 4',
    subjects: [
      {
        id: 'smart-home',
        title: 'Smart Home',
        semester: 'Semester 4',
        icon: 'home',
        desc: 'Membangun rumah pintar berbasis ESP32, dengan kendali relay nirkabel, sensor DHT22, dan Firebase database.',
        duration: '5 Jam',
        level: 'Lanjut',
        type: 'Deploy Project',
        status: 'Belum Dimulai',
        pic: 'Mr. Rizal',
        subMateri: [
          { name: 'Algoritma, konsep, dan komponen smart home', ref: 'https://www.dicoding.com/blog/algoritma-pemrograman-pengertian-fungsi-dan-jenis/', link: 'Blueprint_Logika_Pemrograman' },
          { name: 'Fundamental esp32 & Arduino IDE setup', link: 'The_ESP32_IoT_Blueprint' },
          { name: 'Pemrograman pinout, sensor DHT22, & relay' },
          { name: 'Database integration (Realtime Database)', ref: 'https://www.youtube.com/watch?v=aO92B-K4TnQ', link: 'ESP32_Firebase_Bridge' },
          { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app control and monitor', link: 'membuat web dengan ai' },
          { name: 'K3 dalam bekerja', link: 'Strategic_Safety_Ecosystem' },
          { name: 'Integrasi hardware dan program smart home' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio', 'Dashboard Monitoring Vercel']
      },
      {
        id: 'smart-greenhouse',
        title: 'Greenhouse',
        semester: 'Semester 4',
        icon: 'sprout',
        desc: 'Membangun sistem rumah kaca pintar otomatis berbasis ESP32 yang mendeteksi suhu kelembaban tanah dan mengontrol kipas/pompa.',
        duration: '5 Jam',
        level: 'Lanjut',
        type: 'Deploy Project',
        status: 'Belum Dimulai',
        pic: 'Mr. Rizal',
        subMateri: [
          { name: 'Algoritma, konsep, dan komponen smart greenhouse', link: 'Blueprint_Logika_Pemrograman' },
          { name: 'Fundamental esp32 & Soil Moisture sensor read', link: 'The_ESP32_IoT_Blueprint' },
          { name: 'Pemrograman arduino ide & motor servo ventilasi', link: 'Arduino_Code_Anatomy' },
          { name: 'Database integration (Realtime Database)', link: 'ESP32_Firebase_Bridge' },
          { name: 'Teknik prompting lovable (chatgpt) untuk pembuatan app control and monitor', link: 'membuat web dengan ai' },
          { name: 'K3 dalam bekerja', link: 'Strategic_Safety_Ecosystem' },
          { name: 'Integrasi hardware dan program smart greenhouse' }
        ],
        outputs: ['Video Demo', 'Flyer Proyek', 'Website Portofolio', 'Dashboard Greenhouse Vercel']
      },
      {
        id: 'graduation-9',
        title: 'Graduation',
        semester: 'Semester 4',
        icon: 'graduation',
        desc: 'Kelulusan tertinggi dari seluruh program kurikulum Robotik & IoT IDN. Anda siap menghadapi kompetisi & industri!',
        duration: '2 Jam',
        level: 'Evaluasi Lanjut',
        type: 'Ujian Kelulusan',
        status: 'Belum Dimulai',
        pic: 'System',
        subMateri: [
          { name: 'Presentasi Akhir Proyek Smart Home / Greenhouse' },
          { name: 'Kelulusan Kurikulum Robotik & IoT' }
        ],
        outputs: ['Sertifikat Kelulusan Utama']
      }
    ]
  }
];

interface Cohort {
  id: string;
  name: string;
  grade: string;
  semester: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
}

const cohorts: Cohort[] = [
  { id: 'kelas-8-smt-3', name: 'Kelas 8 - Semester 3 (Juli 2026 - Des 2026)', grade: 'Kelas 8', semester: 'Semester 3', startDate: '8 Jul 2026', endDate: '20 Des 2026', durationWeeks: 24 },
  { id: 'kelas-7-smt-2', name: 'Kelas 7 - Semester 2 (Jan 2027 - Jun 2027)', grade: 'Kelas 7', semester: 'Semester 2', startDate: '6 Jan 2027', endDate: '20 Jun 2027', durationWeeks: 24 },
  { id: 'kelas-8-smt-4', name: 'Kelas 8 - Semester 4 (Jan 2027 - Jun 2027)', grade: 'Kelas 8', semester: 'Semester 4', startDate: '6 Jan 2027', endDate: '20 Jun 2027', durationWeeks: 24 }
];

const getSubjectDates = (cohortId: string, subjectId: string) => {
  if (cohortId === 'kelas-8-smt-3') {
    switch (subjectId) {
      case 'robot-bluetooth': return { start: new Date(2026, 6, 8), end: new Date(2026, 6, 26) };
      case 'robot-gesture': return { start: new Date(2026, 6, 27), end: new Date(2026, 7, 16) };
      case 'parking-ai': return { start: new Date(2026, 7, 17), end: new Date(2026, 8, 13) };
      case 'robot-line': return { start: new Date(2026, 8, 14), end: new Date(2026, 9, 11) };
      case 'robot-transporter': return { start: new Date(2026, 9, 12), end: new Date(2026, 10, 29) };
      case 'graduation-8': return { start: new Date(2026, 10, 30), end: new Date(2026, 11, 20) };
    }
  } else if (cohortId === 'kelas-7-smt-2') {
    switch (subjectId) {
      case 'smart-trashbin': return { start: new Date(2027, 0, 6), end: new Date(2027, 0, 26) };
      case 'tinybit-bluetooth': return { start: new Date(2027, 0, 27), end: new Date(2027, 1, 16) };
      case 'tinybit-gesture': return { start: new Date(2027, 1, 17), end: new Date(2027, 2, 16) };
      case 'smart-watering': return { start: new Date(2027, 2, 17), end: new Date(2027, 3, 13) };
      case 'tinybit-line': return { start: new Date(2027, 3, 14), end: new Date(2027, 4, 11) };
      case 'smart-parking': return { start: new Date(2027, 4, 12), end: new Date(2027, 5, 8) };
      case 'graduation-7': return { start: new Date(2027, 5, 9), end: new Date(2027, 5, 20) };
    }
  } else if (cohortId === 'kelas-8-smt-4') {
    switch (subjectId) {
      case 'smart-home': return { start: new Date(2027, 0, 6), end: new Date(2027, 1, 28) };
      case 'smart-greenhouse': return { start: new Date(2027, 2, 1), end: new Date(2027, 4, 30) };
      case 'graduation-9': return { start: new Date(2027, 4, 31), end: new Date(2027, 5, 20) };
    }
  }
  return { start: new Date(), end: new Date() };
};

const getSubjectMeta = (cohortId: string, subjectId: string) => {
  if (cohortId === 'kelas-8-smt-3') {
    switch (subjectId) {
      case 'robot-bluetooth': return { weeks: 'Minggu 1 - 3', duration: '3 Minggu', color: 'indigo' };
      case 'robot-gesture': return { weeks: 'Minggu 4 - 6', duration: '3 Minggu', color: 'purple' };
      case 'parking-ai': return { weeks: 'Minggu 7 - 10', duration: '4 Minggu', color: 'blue' };
      case 'robot-line': return { weeks: 'Minggu 11 - 14', duration: '4 Minggu', color: 'sky' };
      case 'robot-transporter': return { weeks: 'Minggu 15 - 21', duration: '7 Minggu', color: 'emerald' };
      case 'graduation-8': return { weeks: 'Minggu 22 - 24', duration: '3 Minggu', color: 'red' };
    }
  } else if (cohortId === 'kelas-7-smt-2') {
    switch (subjectId) {
      case 'smart-trashbin': return { weeks: 'Minggu 1 - 3', duration: '3 Minggu', color: 'blue' };
      case 'tinybit-bluetooth': return { weeks: 'Minggu 4 - 6', duration: '3 Minggu', color: 'indigo' };
      case 'tinybit-gesture': return { weeks: 'Minggu 7 - 10', duration: '4 Minggu', color: 'purple' };
      case 'smart-watering': return { weeks: 'Minggu 11 - 14', duration: '4 Minggu', color: 'emerald' };
      case 'tinybit-line': return { weeks: 'Minggu 15 - 18', duration: '4 Minggu', color: 'sky' };
      case 'smart-parking': return { weeks: 'Minggu 19 - 22', duration: '4 Minggu', color: 'amber' };
      case 'graduation-7': return { weeks: 'Minggu 23 - 24', duration: '2 Minggu', color: 'red' };
    }
  } else if (cohortId === 'kelas-8-smt-4') {
    switch (subjectId) {
      case 'smart-home': return { weeks: 'Minggu 1 - 8', duration: '8 Minggu', color: 'blue' };
      case 'smart-greenhouse': return { weeks: 'Minggu 9 - 20', duration: '12 Minggu', color: 'emerald' };
      case 'graduation-9': return { weeks: 'Minggu 21 - 24', duration: '4 Minggu', color: 'red' };
    }
  }
  return { weeks: 'Minggu 1', duration: '1 Minggu', color: 'blue' };
};

// const getMonthYearLabel = (date: Date) => {
//   const months = [
//     'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
//     'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
//   ];
//   return `${months[date.getMonth()]} ${date.getFullYear()}`;
// };

export default function CurriculumView() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'timeline' | 'docs' | 'revisions'>('roadmap');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(timelineData[0].subjects[0]);
  const [showSidebar, setShowSidebar] = useState(false);

  // Timeline calendar state
  const [selectedCalSubject, setSelectedCalSubject] = useState<{ subject: Subject; cohortId: string } | null>(null);

  // Digital Book state
  const [bookSpread, setBookSpread] = useState(2);
  const [activeBookGradeIdx, setActiveBookGradeIdx] = useState(0);
  const [isBookFlipping, setIsBookFlipping] = useState(false);
  const [bookChatInput, setBookChatInput] = useState('');
  const [bookChatHistory, setBookChatHistory] = useState([
    { sender: 'ai', text: 'Hai Fadhlan! 👋\nMau tahu lebih banyak tentang kurikulum dan materi pembelajaran kita?' }
  ]);

  const handleSelectSubject = (sub: Subject) => {
    setSelectedSubject(sub);
    setShowSidebar(true);
  };

  const handleStartStudy = (sub: Subject) => {
    const linkObj = sub.subMateri.find(sm => sm.link);
    if (linkObj && linkObj.link && linkObj.link.startsWith('http')) {
      window.open(linkObj.link, '_blank');
    } else {
      alert(`Memulai pembelajaran modul: ${sub.title}`);
    }
  };

  const isSubMateriCompleted = (sub: Subject, index: number) => {
    if (sub.status === 'Selesai') return true;
    if (sub.status === 'Belum Dimulai') return false;
    if (sub.id === 'smart-watering' && index < 2) return true;
    return false;
  };

  const revisions = [
    {
      version: 'v2.3',
      date: '25 Juni 2026',
      author: 'Ahmad Fauzi',
      changes: [
        'Materi AI Robot dipindahkan dari awal Semester 1 ke akhir Semester 2 Kelas 8.',
        'Penambahan modul praktek Tinybit pada Kelas 7 sebelum masuk ke IoT.',
        'ESP32 MQTT dipindahkan sepenuhnya ke Kelas 8.'
      ],
      reasons: [
        'Kecerdasan Buatan (AI) membutuhkan performa komputasi tinggi dan pemahaman programming tingkat lanjut.',
        'Tinybit membantu melatih logika sekuensial siswa agar lebih siap saat memprogram microcontroller mandiri.',
        'Materi MQTT membutuhkan pengetahuan dasar tentang protokol komunikasi jaringan (TCP/IP) yang diajarkan di Kelas 8.'
      ]
    },
    {
      version: 'v2.2',
      date: '10 Desember 2025',
      author: 'Rizki Maulana',
      changes: [
        'Arduino IDE diupdate menggunakan versi 2.x.',
        'Blynk App diganti menggunakan Blynk IoT Cloud (New Console).'
      ],
      reasons: [
        'Mengikuti standard software terbaru yang memiliki fitur autocomplete lebih baik.',
        'Platform Blynk lama sudah deprecated dan tidak lagi didukung.'
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-5 animate-fade-in curriculum-page-wrap">
      
      {/* Header and Tabs */}
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="font-heading font-bold text-slate-800" style={{ fontSize: 'clamp(15px, 3vw, 20px)' }}>
            Perencanaan &amp; Kurikulum Pembelajaran
          </h2>
          <p className="text-[11.5px] text-slate-500 mt-0.5">
            Pusat penyusunan silabus, capaian pembelajaran (CP), dan roadmap materi robotik.
          </p>
        </div>
        
        {/* Elegant Segmented Tab Bar */}
        <div
          className="curriculum-tab-bar"
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
        >
          {(([
            { id: 'roadmap',   label: 'Roadmap',       Icon: Map      },
            { id: 'timeline',  label: 'Timeline',      Icon: Calendar },
            { id: 'docs',      label: 'Kurikulum',     Icon: FileText },
            { id: 'revisions', label: 'Revisi',        Icon: History  },
          ]) as { id: 'roadmap'|'timeline'|'docs'|'revisions'; label: string; Icon: React.ElementType }[]).map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="curriculum-tab-btn"
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
                <Icon size={13} style={{ color: isActive ? 'rgba(255,255,255,0.92)' : '#6366f1', flexShrink: 0 }} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ====== TAB CONTENT: ROADMAP (Railroad station tracks) ====== */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div
            className="relative rounded-3xl overflow-hidden p-6 md:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(37,99,235,0.07) 0%, rgba(124,58,237,0.08) 50%, rgba(236,72,153,0.05) 100%)',
              border: '1px solid rgba(99,102,241,0.15)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 24px -6px rgba(37,99,235,0.10), inset 0 1px 0 rgba(255,255,255,0.6)'
            }}
          >
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
              <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', boxShadow: '0 8px 24px -6px rgba(37,99,235,0.40), inset 0 1px 0 rgba(255,255,255,0.25)' }}>
                <TrainIcon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))', color: '#4f46e5', border: '1px solid rgba(99,102,241,0.25)' }}>Kurikulum Robotik &amp; IoT</span>
                </div>
                <h3 className="font-heading font-black leading-none tracking-tight" style={{ fontSize: '28px' }}>
                  <span className="text-slate-800">Learning </span>
                  <span style={{ backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #db2777 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Roadmap</span>
                </h3>
                <div className="mt-1.5 mb-2.5 h-[3px] w-24 rounded-full" style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed, #db2777)' }} />
                <p className="text-[12.5px] text-slate-500 leading-relaxed max-w-[520px]">Perjalanan belajar yang terstruktur dari <strong className="text-slate-700">Kelas 7</strong> hingga <strong className="text-slate-700">Kelas 8</strong>. Setiap langkah membawamu lebih dekat ke tujuan akhir.</p>
              </div>
              <div className="flex md:flex-col gap-2 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-blue-700" style={{ background: 'rgba(219,234,254,0.7)', border: '1px solid rgba(147,197,253,0.6)' }}>
                  <Calendar size={11} /><span>2 Semester</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-violet-700" style={{ background: 'rgba(237,233,254,0.7)', border: '1px solid rgba(196,181,253,0.6)' }}>
                  <Sparkles size={11} /><span>13+ Materi</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'start', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {timelineData.map((track, tIdx) => {
                const selectedIdx = track.subjects.findIndex(s => s.id === selectedSubject.id);
                const hasSelectedInTrack = selectedIdx !== -1;
                const trackKey = `${track.grade}-${track.semester}`;
                return (
                  <div key={trackKey}
                    className="lp-timeline-track-card rounded-3xl border transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.72)',
                      backdropFilter: 'blur(20px)',
                      border: hasSelectedInTrack ? '1.5px solid rgba(37,99,235,0.22)' : '1px solid rgba(255,255,255,0.8)',
                      boxShadow: hasSelectedInTrack
                        ? '0 8px 32px -8px rgba(37,99,235,0.14), inset 0 1px 0 rgba(255,255,255,0.8)'
                        : '0 2px 12px -4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                      padding: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div className="flex flex-col items-center justify-center text-white rounded-2xl shrink-0 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', width: '80px', minHeight: '100px', boxShadow: '0 6px 20px -6px rgba(37,99,235,0.45), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 65%)' }} />
                        <div className="relative z-10" style={{ width:'20px', height:'20px', marginBottom:'4px', flexShrink:0 }}><TrainIcon className="w-full h-full" /></div>
                        <span className="relative z-10" style={{ fontSize:'8px', fontWeight:800, letterSpacing:'0.1em', opacity:0.8, textTransform:'uppercase' }}>Kelas</span>
                        <span className="relative z-10" style={{ fontSize:'28px', fontWeight:900, lineHeight:1.1, letterSpacing:'-0.04em', textShadow:'0 2px 4px rgba(0,0,0,0.2)' }}>{track.gradeNum}</span>
                        <span className="relative z-10" style={{ fontSize:'8px', fontWeight:800, letterSpacing:'0.1em', opacity:0.8, textTransform:'uppercase' }}>SMP</span>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
                          <span style={{ fontSize:'9px', fontWeight:800, color:'#2563eb', background:'rgba(219,234,254,0.7)', border:'1px solid rgba(147,197,253,0.6)', padding:'2px 8px', borderRadius:'999px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{track.semester}</span>
                          <h4 className="font-heading" style={{ fontSize:'15px', fontWeight:900, color:'#1e293b', letterSpacing:'-0.02em', margin:0 }}>{track.grade} SMP</h4>
                        </div>
                        <div className="overflow-x-auto scrollbar-none" style={{ paddingBottom:'4px' }}>
                          <div style={{ minWidth: `${Math.max(480, track.subjects.length * 110)}px`, position:'relative', paddingTop:'8px', paddingBottom:'50px', paddingLeft:'16px', paddingRight:'16px' }}>
                            <svg style={{ position:'absolute', left:0, right:0, bottom:'12px', width:'100%', height:'32px', zIndex:1, pointerEvents:'none' }} preserveAspectRatio="none">
                              <defs>
                                <linearGradient id={`mg-${tIdx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                                  <stop offset="4%" stopColor="#fff" stopOpacity="1" />
                                  <stop offset="96%" stopColor="#fff" stopOpacity="1" />
                                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id={`wg-${tIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#7c5c50" />
                                  <stop offset="100%" stopColor="#3d2218" />
                                </linearGradient>
                                <linearGradient id={`rg-${tIdx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#334155" />
                                  <stop offset="35%" stopColor="#e2e8f0" />
                                  <stop offset="65%" stopColor="#94a3b8" />
                                  <stop offset="100%" stopColor="#334155" />
                                </linearGradient>
                                <pattern id={`sp-${tIdx}`} width="22" height="32" patternUnits="userSpaceOnUse">
                                  <rect x="9" y="2" width="4" height="28" rx="1" fill={`url(#wg-${tIdx})`} />
                                  <rect x="8" y="7" width="6" height="1.5" fill="#475569" opacity="0.85" />
                                  <rect x="8" y="22" width="6" height="1.5" fill="#475569" opacity="0.85" />
                                </pattern>
                                <mask id={`fm-${tIdx}`}>
                                  <rect width="100%" height="32" fill={`url(#mg-${tIdx})`} />
                                </mask>
                                {hasSelectedInTrack && (
                                  <linearGradient id={`pg-${tIdx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#7c3aed" />
                                  </linearGradient>
                                )}
                              </defs>
                              <g mask={`url(#fm-${tIdx})`}>
                                <rect x="0" y="5" width="100%" height="22" rx="3" fill="#e2e8f0" />
                                <rect x="0" y="0" width="100%" height="32" fill={`url(#sp-${tIdx})`} />
                                <line x1="0" y1="8" x2="100%" y2="8" stroke={`url(#rg-${tIdx})`} strokeWidth="2.5" />
                                <line x1="0" y1="24" x2="100%" y2="24" stroke={`url(#rg-${tIdx})`} strokeWidth="2.5" />
                                {hasSelectedInTrack && selectedIdx > 0 && (
                                  <>
                                    <line x1={`${(0.5 / track.subjects.length) * 100}%`} y1="8" x2={`${((selectedIdx + 0.5) / track.subjects.length) * 100}%`} y2="8" stroke={`url(#pg-${tIdx})`} strokeWidth="2.5" opacity="0.7" />
                                    <line x1={`${(0.5 / track.subjects.length) * 100}%`} y1="24" x2={`${((selectedIdx + 0.5) / track.subjects.length) * 100}%`} y2="24" stroke={`url(#pg-${tIdx})`} strokeWidth="2.5" opacity="0.7" />
                                  </>
                                )}
                              </g>
                            </svg>
                            {hasSelectedInTrack && (
                              <div style={{ position: 'absolute', bottom: '42px', left: `calc(${((selectedIdx + 0.5) / track.subjects.length) * 100}% - 18px)`, transition: 'left 0.55s cubic-bezier(0.34,1.56,0.64,1)', zIndex: 20, pointerEvents: 'none' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', border: '2.5px solid white', display: 'flex', alignItems: 'center', justifyContent:'center', boxShadow: '0 4px 16px -4px rgba(37,99,235,0.55)', animation: 'trainBounce 0.5s ease' }}>
                                  <div style={{ width:'18px', height:'18px', flexShrink:0 }}><TrainIcon className="w-full h-full text-white" /></div>
                                </div>
                                <div style={{ position:'absolute', inset:'-6px', borderRadius:'50%', background: 'rgba(99,102,241,0.15)', animation: 'ping 1.5s ease-in-out infinite' }} />
                              </div>
                            )}
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', height:'100px', position:'relative', zIndex:10 }}>
                              {track.subjects.map((sub) => {
                                const isSelected = selectedSubject.id === sub.id;
                                const IconComp = iconMap[sub.icon] || Cpu;
                                return (
                                  <div key={sub.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', height:'100%', position:'relative', zIndex:10 }}>
                                    <button
                                      onClick={() => handleSelectSubject(sub)}
                                      style={{ width:'88px', height:'76px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'5px', padding:'8px 4px', borderRadius:'16px', border: isSelected ? '1.5px solid rgba(99,102,241,0.5)' : '1px solid rgba(226,232,240,0.9)', background: isSelected ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', boxShadow: isSelected ? '0 8px 20px -6px rgba(37,99,235,0.40), inset 0 1px 0 rgba(255,255,255,0.25)' : '0 2px 8px -3px rgba(0,0,0,0.08)', transform: isSelected ? 'translateY(-6px) scale(1.04)' : 'none', transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', cursor: 'pointer' }}
                                    >
                                      <div style={{ padding:'5px', borderRadius:'10px', background: isSelected ? 'rgba(255,255,255,0.18)' : 'rgba(239,246,255,0.9)', transition: 'all 0.3s' }}>
                                        <IconComp size={15} style={{ color: isSelected ? 'white' : '#2563eb' }} />
                                      </div>
                                      <span style={{ fontSize:'9.5px', fontWeight:800, textAlign:'center', lineHeight:1.25, color: isSelected ? 'white' : '#334155', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', width:'100%', padding:'0 2px' }}>
                                        {sub.title}
                                      </span>
                                    </button>
                                    <div style={{ width:'2px', height:'22px', marginTop:'4px', marginBottom:'4px', background: isSelected ? 'linear-gradient(to bottom, #6366f1, #7c3aed)' : 'rgba(203,213,225,0.7)', borderRadius:'2px', boxShadow: isSelected ? '0 0 8px rgba(99,102,241,0.4)' : 'none', zIndex:2 }} />
                                    <div style={{ width:'12px', height:'12px', borderRadius:'50%', border: isSelected ? '2.5px solid #6366f1' : '2.5px solid #94a3b8', background: isSelected ? '#ede9fe' : 'white', boxShadow: isSelected ? '0 0 10px rgba(99,102,241,0.35)' : 'none', transition:'all 0.3s', zIndex:5 }} />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginTop:'6px' }}>
                          <Sparkles size={10} style={{ color:'#6366f1' }} />
                          <span style={{ fontSize:'10px', color:'#94a3b8', fontWeight:600 }}>Pilih materi untuk melihat sub materi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Right Column: Sticky Sidebar Detail */}
            <div
              className={`curriculum-sidebar${showSidebar ? ' sidebar-open' : ''}`}
              style={{ width: '300px', minWidth: '280px', flexShrink: 0, position: 'sticky', top: '96px', alignSelf: 'flex-start' }}
            >
              <button onClick={() => setShowSidebar(false)} className="curriculum-sidebar-close" style={{ display:'none', width:'100%', marginBottom:'8px', background:'rgba(255,255,255,0.6)', border:'1px solid rgba(226,232,240,0.8)', borderRadius:'12px', padding:'8px', fontSize:'12px', fontWeight:600, color:'#64748b', cursor:'pointer', backdropFilter:'blur(8px)' }}>✕ Tutup Detail</button>
              <div className="glass-card p-6 rounded-3xl flex flex-col gap-5 border border-slate-200/50 shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">{selectedSubject.semester}</span>
                    <h3 className="font-heading text-lg font-black text-slate-800 mt-1.5">{selectedSubject.title}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                    {(() => { const IconComp = iconMap[selectedSubject.icon] || Cpu; return <IconComp size={22} />; })()}
                  </div>
                </div>
                <p className="text-[12px] text-slate-600 leading-relaxed">{selectedSubject.desc}</p>
                <div className="grid grid-cols-2 gap-3 text-[11px] bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="space-y-1"><span className="text-slate-400 block font-medium">Durasi</span><span className="text-slate-700 font-bold flex items-center gap-1"><Clock size={11} className="text-blue-500" /> {selectedSubject.duration}</span></div>
                  <div className="space-y-1"><span className="text-slate-400 block font-medium">Level</span><span className="text-slate-700 font-bold block">{selectedSubject.level}</span></div>
                  <div className="space-y-1 mt-1"><span className="text-slate-400 block font-medium">Jenis</span><span className="text-slate-700 font-bold block truncate">{selectedSubject.type}</span></div>
                  <div className="space-y-1 mt-1"><span className="text-slate-400 block font-medium">Status</span><span className={`font-bold flex items-center gap-1 ${selectedSubject.status === 'Selesai' ? 'text-emerald-600' : selectedSubject.status === 'Sedang Berjalan' ? 'text-amber-600' : 'text-slate-400'}`}><div className={`w-1.5 h-1.5 rounded-full ${selectedSubject.status === 'Selesai' ? 'bg-emerald-500' : selectedSubject.status === 'Sedang Berjalan' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`} />{selectedSubject.status}</span></div>
                </div>
                {selectedSubject.subMateri.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider">Sub Materi ({selectedSubject.subMateri.length})</h4>
                    <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1 scrollbar-thin">
                      {selectedSubject.subMateri.map((sm, index) => {
                        const isCompleted = isSubMateriCompleted(selectedSubject, index);
                        return (
                          <div key={index} className="flex items-start justify-between gap-2 p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                            <div className="flex items-start gap-2" style={{ minWidth:0, flex:1 }}>
                              <div className={isCompleted ? 'text-blue-600 shrink-0 mt-0.5' : 'text-slate-300 shrink-0 mt-0.5'}>{isCompleted ? <CheckSquare size={13} /> : <Square size={13} />}</div>
                              <span className={`text-[11px] leading-snug ${isCompleted ? 'text-slate-700 font-medium' : 'text-slate-500'}`} style={{ wordBreak:'break-word' }}>{sm.name}</span>
                            </div>
                            {(sm.link || sm.ref) && (<a href={sm.link && sm.link.startsWith('http') ? sm.link : '#'} target={sm.link && sm.link.startsWith('http') ? "_blank" : undefined} rel="noopener noreferrer" title={sm.ref || sm.link} className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg shrink-0 hover:bg-blue-100 transition-colors">Modul</a>)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <h4 className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider">Output Yang Dihasilkan</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubject.outputs.map((out, idx) => (<span key={idx} className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-lg">{out}</span>))}
                  </div>
                </div>
                <button onClick={() => handleStartStudy(selectedSubject)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12.5px] py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 mt-2 hover:-translate-y-0.5 active:translate-y-0">
                  <Play size={13} fill="white" /> Mulai Belajar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====== TAB CONTENT: TIMELINE (1-Year Calendar Juli 2026 - Juni 2027) ====== */}
      {activeTab === 'timeline' && (() => {
        const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'];
        const yearMonths: Date[] = [];
        for (let m = 6; m <= 11; m++) yearMonths.push(new Date(2026, m, 1));
        for (let m = 0; m <= 5; m++) yearMonths.push(new Date(2027, m, 1));

        const cohortColors: Record<string,{bg:string,border:string,text:string,dot:string}> = {
          'kelas-8-smt-3': { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.35)', text:'#4338ca', dot:'#6366f1' },
          'kelas-7-smt-2': { bg:'rgba(16,185,129,0.12)', border:'rgba(16,185,129,0.35)', text:'#065f46', dot:'#10b981' },
          'kelas-8-smt-4': { bg:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.35)', text:'#92400e', dot:'#f59e0b' },
        };
        const subjectColors: Record<string,string> = {
          'robot-bluetooth':'#6366f1','robot-gesture':'#8b5cf6','parking-ai':'#3b82f6','robot-line':'#06b6d4','robot-transporter':'#10b981','graduation-8':'#ef4444',
          'smart-trashbin':'#10b981','tinybit-bluetooth':'#6366f1','tinybit-gesture':'#8b5cf6','smart-watering':'#06b6d4','tinybit-line':'#f59e0b','smart-parking':'#f97316','graduation-7':'#ef4444',
          'smart-home':'#3b82f6','smart-greenhouse':'#10b981','graduation-9':'#ef4444',
        };

        const getBarStyle = (cohortId: string, subjectId: string, year: number, month: number) => {
          const dates = getSubjectDates(cohortId, subjectId);
          if (!dates) return null;
          const { start, end } = dates;
          const monthStart = new Date(year, month, 1);
          const monthEnd = new Date(year, month + 1, 0);
          if (end < monthStart || start > monthEnd) return null;
          const days = monthEnd.getDate();
          const startDay = start < monthStart ? 0 : (start.getDate() - 1) / days;
          const endDay = end > monthEnd ? 1 : end.getDate() / days;
          return { left: `${startDay * 100}%`, width: `${(endDay - startDay) * 100}%` };
        };

        const calDetail = selectedCalSubject ? (() => {
          const { subject, cohortId } = selectedCalSubject;
          const meta = getSubjectMeta(cohortId, subject.id);
          const dates = getSubjectDates(cohortId, subject.id);
          const fmt = (d: Date) => `${d.getDate()} ${SHORT_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
          return { subject, meta, dates, fmt, cohortId };
        })() : null;

        const cohortLabel: Record<string,string> = {
          'kelas-8-smt-3': 'Kelas 8 Smt 3',
          'kelas-7-smt-2': 'Kelas 7 Smt 2',
          'kelas-8-smt-4': 'Kelas 8 Smt 4',
        };

        return (
          <div style={{ display:'flex', gap:'20px', alignItems:'start', flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ background:'linear-gradient(135deg,rgba(37,99,235,0.07),rgba(124,58,237,0.08))', border:'1px solid rgba(99,102,241,0.15)', borderRadius:'20px', padding:'20px 24px', marginBottom:'16px', backdropFilter:'blur(20px)', boxShadow:'0 4px 24px -6px rgba(37,99,235,0.10)' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
                  <div>
                    <h3 style={{ fontFamily:"'Poppins',sans-serif", fontSize:'20px', fontWeight:900, margin:0, color:'#1e293b' }}>
                      Jadwal <span style={{ backgroundImage:'linear-gradient(135deg,#2563eb,#7c3aed)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Pembelajaran</span>
                    </h3>
                    <p style={{ fontSize:'11.5px', color:'#64748b', margin:'4px 0 0', fontFamily:"'Inter',sans-serif" }}>Perjalanan belajar terstruktur dari Juli 2026 sampai Juni 2027</p>
                  </div>
                  <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                    {cohorts.map(c => (
                      <div key={c.id} style={{ display:'flex', alignItems:'center', gap:'5px', background:'rgba(255,255,255,0.7)', border:`1px solid ${cohortColors[c.id].border}`, borderRadius:'10px', padding:'4px 10px' }}>
                        <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:cohortColors[c.id].dot, flexShrink:0 }} />
                        <span style={{ fontSize:'10px', fontWeight:700, color:cohortColors[c.id].text }}>{cohortLabel[c.id]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Year Calendar Grid */}
              <div style={{ background:'rgba(255,255,255,0.75)', backdropFilter:'blur(20px)', borderRadius:'20px', border:'1px solid rgba(226,232,240,0.8)', overflowX:'auto', boxShadow:'0 4px 20px -6px rgba(0,0,0,0.08)' }}>
                <div style={{ display:'grid', gridTemplateColumns:`140px repeat(12,1fr)`, minWidth:'850px', borderBottom:'1px solid rgba(226,232,240,0.7)' }}>
                  <div style={{ padding:'10px 12px', fontSize:'10px', fontWeight:700, color:'#94a3b8', background:'rgba(248,250,252,0.9)', borderRight:'1px solid rgba(226,232,240,0.6)' }}>KELAS / MATERI</div>
                  {yearMonths.map((m, i) => (
                    <div key={i} style={{ padding:'10px 4px', textAlign:'center', fontSize:'10px', fontWeight:700, color: m.getFullYear()===2026?'#2563eb':'#7c3aed', background:'rgba(248,250,252,0.9)', borderRight: i<11?'1px solid rgba(226,232,240,0.4)':undefined }}>
                      {SHORT_MONTHS[m.getMonth()]}<br/><span style={{ fontSize:'9px', fontWeight:500, color:'#94a3b8' }}>{m.getFullYear()}</span>
                    </div>
                  ))}
                </div>

                {cohorts.map((cohort, ci) => {
                  const track = timelineData.find(t => t.grade === cohort.grade && t.semester === cohort.semester);
                  if (!track) return null;
                  const col = cohortColors[cohort.id];
                  return (
                    <div key={cohort.id} style={{ minWidth:'850px' }}>
                      <div style={{ display:'grid', gridTemplateColumns:`140px repeat(12,1fr)`, background:col.bg, borderBottom:'1px solid rgba(226,232,240,0.5)', borderTop: ci>0?'2px solid rgba(226,232,240,0.6)':undefined }}>
                        <div style={{ padding:'8px 12px', display:'flex', alignItems:'center', gap:'6px', borderRight:'1px solid rgba(226,232,240,0.6)' }}>
                          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:col.dot, flexShrink:0 }} />
                          <span style={{ fontSize:'9.5px', fontWeight:800, color:col.text, textTransform:'uppercase', letterSpacing:'0.06em' }}>{cohortLabel[cohort.id]}</span>
                        </div>
                        {yearMonths.map((_, mi) => (
                          <div key={mi} style={{ borderRight: mi<11?'1px solid rgba(226,232,240,0.3)':undefined }} />
                        ))}
                      </div>
                      {track.subjects.map((sub, si) => {
                        const isSelected = selectedCalSubject?.subject.id === sub.id && selectedCalSubject?.cohortId === cohort.id;
                        const IconComp = iconMap[sub.icon] || Cpu;
                        const subColor = subjectColors[sub.id] || col.dot;
                        return (
                          <div
                            key={sub.id}
                            onClick={() => setSelectedCalSubject(isSelected ? null : { subject: sub, cohortId: cohort.id })}
                            style={{ display:'grid', gridTemplateColumns:`140px repeat(12,1fr)`, borderBottom:'1px solid rgba(226,232,240,0.4)', cursor:'pointer', background: isSelected ? 'rgba(37,99,235,0.04)' : (si%2===0?'rgba(255,255,255,0.5)':'rgba(248,250,252,0.4)'), transition:'background 0.15s' }}
                          >
                            <div style={{ padding:'6px 12px', display:'flex', alignItems:'center', gap:'6px', borderRight:'1px solid rgba(226,232,240,0.6)', minHeight:'36px' }}>
                              <div style={{ width:'22px', height:'22px', borderRadius:'7px', background: isSelected?'linear-gradient(135deg,#2563eb,#7c3aed)':col.bg, border:`1px solid ${col.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                <IconComp size={11} style={{ color: isSelected?'white':subColor }} />
                              </div>
                              <span style={{ fontSize:'10px', fontWeight:isSelected?700:600, color: isSelected?'#1e40af':'#334155', lineHeight:1.2, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{sub.title}</span>
                            </div>
                            {yearMonths.map((m, mi) => {
                              const bar = getBarStyle(cohort.id, sub.id, m.getFullYear(), m.getMonth());
                              return (
                                <div key={mi} style={{ position:'relative', borderRight: mi<11?'1px solid rgba(226,232,240,0.3)':undefined, minHeight:'36px' }}>
                                  {bar && (
                                    <div style={{ position:'absolute', top:'50%', transform:'translateY(-50%)', left:bar.left, width:bar.width, height:'14px', borderRadius:'7px', background: isSelected?`linear-gradient(90deg,${subColor},${subColor}cc)`:`${subColor}33`, border:`1.5px solid ${subColor}66`, transition:'all 0.2s', boxShadow: isSelected?`0 2px 6px ${subColor}44`:undefined }} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div style={{ display:'flex', gap:'12px', marginTop:'12px', flexWrap:'wrap' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                  <div style={{ width:'24px', height:'8px', borderRadius:'4px', background:'rgba(99,102,241,0.4)', border:'1.5px solid #6366f1' }} />
                  <span style={{ fontSize:'10px', color:'#64748b', fontWeight:500 }}>Kelas 8 Smt 3 (Jul–Des 2026)</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                  <div style={{ width:'24px', height:'8px', borderRadius:'4px', background:'rgba(16,185,129,0.4)', border:'1.5px solid #10b981' }} />
                  <span style={{ fontSize:'10px', color:'#64748b', fontWeight:500 }}>Kelas 7 Smt 2 (Jan–Jun 2027)</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                  <div style={{ width:'24px', height:'8px', borderRadius:'4px', background:'rgba(245,158,11,0.4)', border:'1.5px solid #f59e0b' }} />
                  <span style={{ fontSize:'10px', color:'#64748b', fontWeight:500 }}>Kelas 8 Smt 4 (Jan–Jun 2027)</span>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar Detail Panel */}
            <div
              className={`curriculum-sidebar${selectedCalSubject ? ' sidebar-open' : ''}`}
              style={{ width: '280px', minWidth: '260px', flexShrink: 0, position: 'sticky', top: '96px', alignSelf: 'flex-start' }}
            >
              <button
                onClick={() => setSelectedCalSubject(null)}
                className="curriculum-sidebar-close"
                style={{ display:'none', width:'100%', marginBottom:'8px', background:'rgba(255,255,255,0.6)', border:'1px solid rgba(226,232,240,0.8)', borderRadius:'12px', padding:'8px', fontSize:'12px', fontWeight:600, color:'#64748b', cursor:'pointer', backdropFilter:'blur(8px)' }}
              >
                ✕ Tutup Detail
              </button>
              <div style={{ background:'rgba(255,255,255,0.85)', backdropFilter:'blur(20px)', borderRadius:'20px', border:'1px solid rgba(226,232,240,0.8)', padding:'20px', boxShadow:'0 4px 20px -6px rgba(0,0,0,0.10)', display:'flex', flexDirection:'column', gap:'14px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', paddingBottom:'12px', borderBottom:'1px solid rgba(226,232,240,0.7)' }}>
                  <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'linear-gradient(135deg,#2563eb,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Calendar size={15} color="white" />
                  </div>
                  <span style={{ fontSize:'12px', fontWeight:800, color:'#1e293b', fontFamily:"'Poppins',sans-serif" }}>Detail Timeline</span>
                </div>

                {calDetail ? (() => {
                  const { subject, meta, dates, fmt, cohortId } = calDetail;
                  const IconComp = iconMap[subject.icon] || Cpu;
                  const col = cohortColors[cohortId];
                  const subColor = subjectColors[subject.id] || col.dot;
                  return (
                    <>
                      <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                        <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:`linear-gradient(135deg,${subColor},${subColor}bb)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 4px 12px ${subColor}44` }}>
                          <IconComp size={18} color="white" />
                        </div>
                        <div>
                          <div style={{ fontSize:'9px', fontWeight:700, color:col.text, background:col.bg, border:`1px solid ${col.border}`, borderRadius:'6px', padding:'2px 7px', display:'inline-block', marginBottom:'4px' }}>{cohortLabel[cohortId]}</div>
                          <h4 style={{ fontSize:'14px', fontWeight:900, color:'#1e293b', margin:0, fontFamily:"'Poppins',sans-serif", lineHeight:1.2 }}>{subject.title}</h4>
                          <span style={{ fontSize:'10px', color:'#64748b', fontWeight:500 }}>{meta.weeks}</span>
                        </div>
                      </div>

                      <p style={{ fontSize:'11.5px', color:'#475569', lineHeight:1.6, margin:0 }}>{subject.desc}</p>

                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                        {[['Durasi', meta.duration],['Topik', `${subject.subMateri.length} Topik`],['Progress', `0 / ${subject.subMateri.length} Topik`],['Status', subject.status]].map(([k,v]) => (
                          <div key={k} style={{ background:'rgba(248,250,252,0.8)', border:'1px solid rgba(226,232,240,0.7)', borderRadius:'10px', padding:'8px 10px' }}>
                            <div style={{ fontSize:'9px', color:'#94a3b8', fontWeight:600, marginBottom:'3px', textTransform:'uppercase', letterSpacing:'0.06em' }}>{k}</div>
                            <div style={{ fontSize:'11px', fontWeight:700, color: k==='Status'?(subject.status==='Selesai'?'#059669':subject.status==='Sedang Berjalan'?'#d97706':'#6366f1'):'#1e293b' }}>
                              {k==='Status'?(
                                <span style={{ background: subject.status==='Selesai'?'rgba(16,185,129,0.12)':subject.status==='Sedang Berjalan'?'rgba(245,158,11,0.12)':'rgba(99,102,241,0.12)', border:`1px solid ${subject.status==='Selesai'?'rgba(16,185,129,0.3)':subject.status==='Sedang Berjalan'?'rgba(245,158,11,0.3)':'rgba(99,102,241,0.3)'}`, borderRadius:'6px', padding:'2px 7px', fontSize:'10px' }}>{v}</span>
                              ):v}
                            </div>
                          </div>
                        ))}
                      </div>

                      {dates && (
                        <div style={{ background:'rgba(37,99,235,0.06)', border:'1px solid rgba(99,102,241,0.2)', borderRadius:'10px', padding:'10px 12px', display:'flex', alignItems:'center', gap:'8px' }}>
                          <Calendar size={13} style={{ color:'#6366f1', flexShrink:0 }} />
                          <span style={{ fontSize:'11px', fontWeight:600, color:'#4338ca' }}>{fmt(dates.start)} — {fmt(dates.end)}</span>
                        </div>
                      )}

                      <div>
                        <h5 style={{ fontSize:'10.5px', fontWeight:800, color:'#334155', textTransform:'uppercase', letterSpacing:'0.06em', margin:'0 0 8px' }}>Sub Materi</h5>
                        <div style={{ display:'flex', flexDirection:'column', gap:'5px', maxHeight:'160px', overflowY:'auto' }}>
                          {subject.subMateri.map((sm, idx) => {
                            const done = isSubMateriCompleted(subject, idx);
                            return (
                              <div key={idx} style={{ display:'flex', alignItems:'flex-start', gap:'7px' }}>
                                <div style={{ width:'14px', height:'14px', borderRadius:'50%', border:`1.5px solid ${done?subColor:'#cbd5e1'}`, background:done?subColor:'transparent', flexShrink:0, marginTop:'1px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                  {done && <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'white' }} />}
                                </div>
                                <span style={{ fontSize:'10.5px', color: done?'#334155':'#94a3b8', fontWeight: done?600:400, lineHeight:1.4 }}>{sm.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h5 style={{ fontSize:'10.5px', fontWeight:800, color:'#334155', textTransform:'uppercase', letterSpacing:'0.06em', margin:'0 0 8px' }}>Output yang Dihasilkan</h5>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
                          {subject.outputs.map((o,i) => (
                            <span key={i} style={{ fontSize:'9.5px', fontWeight:600, background:'rgba(248,250,252,0.9)', border:'1px solid rgba(226,232,240,0.8)', borderRadius:'7px', padding:'3px 8px', color:'#475569' }}>{o}</span>
                          ))}
                        </div>
                      </div>

                      <button onClick={() => handleStartStudy(subject)} style={{ width:'100%', background:'linear-gradient(135deg,#2563eb,#7c3aed)', border:'none', borderRadius:'12px', padding:'11px', color:'white', fontSize:'12px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'7px', boxShadow:'0 4px 14px rgba(37,99,235,0.35)', fontFamily:"'Poppins',sans-serif" }}>
                        <Play size={13} fill="white" /> Mulai Belajar
                      </button>
                    </>
                  );
                })() : (
                  <div style={{ textAlign:'center', padding:'24px 12px' }}>
                    <div style={{ width:'48px', height:'48px', borderRadius:'14px', background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
                      <Calendar size={22} style={{ color:'#6366f1' }} />
                    </div>
                    <p style={{ fontSize:'12px', color:'#94a3b8', fontWeight:500, lineHeight:1.5 }}>Klik baris materi di kalender untuk melihat detail jadwal</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ====== TAB CONTENT: KURIKULUM (Digital Interactive Book) ====== */}
      {activeTab === 'docs' && (() => {
        const track = timelineData[activeBookGradeIdx];

        const getSubjectContent = (id: string) => {
          const contentMap: Record<string, { descLeft: string, descRight: string, cp: string[], tp: string[] }> = {
            'smart-trashbin': {
              descLeft: 'Siswa merakit tempat sampah pintar otomatis menggunakan sensor ultrasonik HC-SR04 untuk mendeteksi objek mendekat dan menggerakkan motor servo untuk membuka tutupnya secara otomatis.',
              descRight: 'Proyek integrasi sensor jarak ultrasonik dengan aktuator servo untuk merancang teknologi ramah lingkungan dan bebas sentuh.',
              cp: [
                'Siswa terampil merangkai hardware lengkap secara mandiri.',
                'Siswa mampu memahami dasar logika percabangan menggunakan input sensor.'
              ],
              tp: [
                'Membuat logika deteksi jarak objek di MakeCode.',
                'Menghubungkan pin Microbit ke servo motor.'
              ]
            },
            'tinybit-bluetooth': {
              descLeft: 'Siswa merancang sistem komunikasi nirkabel antara browser web/aplikasi dengan robot mobil Tinybit melalui modul Bluetooth Serial, memungkinkan pengendalian arah gerakan secara real-time.',
              descRight: 'Mobil robot Tinybit yang dikendalikan dari jarak jauh menggunakan koneksi Bluetooth dengan respons gerakan instan.',
              cp: [
                'Siswa memahami protokol komunikasi data nirkabel Bluetooth.',
                'Siswa mampu membuat antarmuka kontroler sederhana.'
              ],
              tp: [
                'Mengirimkan data serial dari web kontroler ke Microbit.',
                'Memetakan data serial menjadi instruksi motor driver.'
              ]
            },
            'tinybit-gesture': {
              descLeft: 'Mengintegrasikan teknologi kecerdasan buatan (Computer Vision) Teachable Machine dari Google dengan robot Tinybit. Siswa melatih model gerakan tangan melalui webcam untuk mengendalikan jalannya robot.',
              descRight: 'Pengendalian robot cerdas berbasis isyarat tangan menggunakan kamera laptop dan model Machine Learning.',
              cp: [
                'Siswa memahami alur kerja Machine Learning (data, training, testing).',
                'Siswa mampu mengintegrasikan model AI dengan API eksternal.'
              ],
              tp: [
                'Melatih model Teachable Machine dengan akurasi tinggi.',
                'Menerjemahkan hasil klasifikasi model menjadi perintah gerak robot.'
              ]
            },
            'smart-watering': {
              descLeft: 'Membangun sistem penyiraman tanaman otomatis berbasis kelembaban tanah. Pompa air DC mini akan menyala ketika tanah kering dan mati secara otomatis ketika kelembaban tanah telah tercapai.',
              descRight: 'Sistem irigasi otomatis hemat air menggunakan sensor kelembaban tanah dan pompa air DC mini.',
              cp: [
                'Siswa memahami sensor analog dan pembacaan nilai kelembaban tanah.',
                'Siswa mampu mengontrol motor pompa air DC via transistor/relay.'
              ],
              tp: [
                'Membaca nilai sensor kelembaban analog pada Microbit.',
                'Membuat sistem otomasi penyiraman tanaman berdasarkan ambang batas kelembaban.'
              ]
            },
            'tinybit-line': {
              descLeft: 'Memprogram sensor inframerah (line tracking sensor) di bawah Tinybit robot untuk mendeteksi warna track garis hitam, memungkinkannya melintasi sirkuit berliku secara presisi.',
              descRight: 'Robot mobil yang bergerak mandiri menyusuri lintasan garis hitam dengan sensor fototransistor inframerah.',
              cp: [
                'Siswa memahami prinsip pantulan cahaya pada sensor inframerah.',
                'Siswa mampu menerapkan algoritma koreksi arah roda.'
              ],
              tp: [
                'Membaca status logika High/Low dari tracking sensor.',
                'Memprogram robot untuk berbelok merespon posisi garis hitam.'
              ]
            },
            'smart-parking': {
              descLeft: 'Proyek palang pintu parkir otomatis. Sensor inframerah diletakkan di pintu masuk untuk mendeteksi mobil datang, yang kemudian mentrigger servo untuk membuka palang pintu selama beberapa detik.',
              descRight: 'Sistem palang pintu otomatis yang mendeteksi kendaraan menggunakan sensor IR dan aktuator servo.',
              cp: [
                'Siswa memahami penggunaan sensor inframerah pemutus cahaya.',
                'Siswa mampu memprogram sistem delay dan pergerakan servo pembatas.'
              ],
              tp: [
                'Mendeteksi kendaraan yang mendekati gerbang parkir.',
                'Menggerakkan palang servo secara mulus dan menampilkan status pada display LED.'
              ]
            },
            'robot-bluetooth': {
              descLeft: 'Mengembangkan mobil robot beroda 4 berbasis pemrograman Python pada modul driver L298N. Robot dikendalikan secara nirkabel melalui koneksi Bluetooth menggunakan web controller.',
              descRight: 'Robot mobil Python dengan driver motor kuat L298N untuk pergerakan presisi dan stabil.',
              cp: [
                'Siswa memahami pemrograman Python untuk hardware/GPIO.',
                'Siswa mampu mengoperasikan driver motor L298N untuk roda.'
              ],
              tp: [
                'Mengkonfigurasi library serial Python pada perangkat robot.',
                'Memetakan instruksi kontrol arah roda maju/mundur/berputar.'
              ]
            },
            'robot-gesture': {
              descLeft: 'Proyek kendali robot Python menggunakan isyarat tubuh/pose tangan yang ditangkap oleh webcam. Model klasifikasi isyarat tangan Teachable Machine dihubungkan ke skrip Python robot.',
              descRight: 'Sistem robotika canggih yang mengawinkan computer vision dengan robot Python roda 4.',
              cp: [
                'Siswa memahami integrasi API WebSockets/WebRTC untuk kontrol hardware.',
                'Siswa mampu memprogram multithreading sederhana di Python.'
              ],
              tp: [
                'Menghubungkan aplikasi web AI dengan client skrip Python.',
                'Menguji latensi dan akurasi kendali isyarat tangan.'
              ]
            },
            'parking-ai': {
              descLeft: 'Sistem parkir pintar tingkat lanjut dengan Computer Vision Python untuk mendeteksi plat nomor kendaraan dan menyimpannya ke dalam database transaksi parkir.',
              descRight: 'Otomatisasi parkir berbasis AI dengan deteksi plat nomor (ALPR) dan integrasi database.',
              cp: [
                'Siswa memahami pengenalan gambar (OCR) menggunakan OpenCV/Python.',
                'Siswa mampu merancang skema database transaksi sederhana.'
              ],
              tp: [
                'Mendeteksi area plat nomor kendaraan pada gambar kamera.',
                'Menyimpan data waktu masuk dan plat nomor kendaraan ke database.'
              ]
            },
            'robot-line': {
              descLeft: 'Membangun robot pengikut garis tingkat lanjut dengan Python menggunakan algoritma kendali PID (Proportional-Integral-Derivative) untuk pergerakan sirkuit yang mulus dan cepat.',
              descRight: 'Robot pengikut garis presisi tinggi dengan algoritma kendali PID di Python.',
              cp: [
                'Siswa memahami dasar teori kendali feedback kontrol loop tertutup (PID).',
                'Siswa mampu menala parameter Kp, Ki, Kd secara empiris.'
              ],
              tp: [
                'Membaca array sensor analog pengikut garis.',
                'Memprogram perhitungan error posisi dan koreksi kecepatan motor roda.'
              ]
            },
            'robot-transporter': {
              descLeft: 'Robot pengangkut barang dengan capit servo mekanik. Siswa merakit capit mekanis, memprogram motor servo capit, dan mengendalikannya via aplikasi web.',
              descRight: 'Robot capit pemindah barang yang dikendalikan melalui dashboard web kontroler.',
              cp: [
                'Siswa memahami kinematika sederhana dari capit mekanik.',
                'Siswa mampu mengintegrasikan kendali beberapa servo secara simultan.'
              ],
              tp: [
                'Memprogram gerakan capit membuka, menutup, mengangkat, dan menurunkan.',
                'Mengirimkan perintah capit dan kemudi robot dari web dashboard.'
              ]
            },
            'smart-home': {
              descLeft: 'Sistem rumah pintar terintegrasi berbasis mikrokontroler ESP32. Mengontrol lampu (relay) dan memonitor suhu kelembaban (DHT22) secara real-time via database cloud Firebase.',
              descRight: 'Smart Home IoT dengan enkripsi data Firebase Realtime Database dan antarmuka web.',
              cp: [
                'Siswa memahami dasar IoT, protokol Wi-Fi, dan Firebase API.',
                'Siswa mampu merancang rangkaian listrik AC aman menggunakan relay.'
              ],
              tp: [
                'Menghubungkan ESP32 ke jaringan Wi-Fi lokal.',
                'Sinkronisasi data sensor DHT22 ke Firebase Database.'
              ]
            },
            'smart-greenhouse': {
              descLeft: 'Membangun sistem rumah kaca otomatis. Sensor mendeteksi suhu udara, kelembaban, dan cahaya, lalu ESP32 mengontrol ventilasi (servo), kipas, dan pompa air secara otomatis.',
              descRight: 'Rumah kaca pintar IoT untuk otomatisasi pertanian presisi berbasis cloud database.',
              cp: [
                'Siswa memahami automasi tertutup sistem mikroklimat tanaman.',
                'Siswa mampu mengolah data sensor untuk visualisasi grafik web.'
              ],
              tp: [
                'Mengukur kelembaban tanah dan intensitas cahaya matahari secara simultan.',
                'Mengaktifkan kipas DC dan pompa air berdasarkan kondisi iklim tanaman.'
              ]
            }
          };
          return contentMap[id] || {
            descLeft: 'Pada materi ini, siswa akan belajar membangun proyek sains teknologi yang menuntut pemahaman sirkuit fisik dan alur pemrograman yang presisi.',
            descRight: 'Proyek robotika dan IoT mandiri terintegrasi.',
            cp: [
              'Siswa terampil merangkai hardware lengkap secara mandiri.',
              'Siswa memahami logika kendali input-output dari sistem.'
            ],
            tp: [
              'Mengintegrasikan program dengan komponen fisik.',
              'Menguji keandalan sistem dalam berbagai skenario uji coba.'
            ]
          };
        };

        // Base spreads
        const baseSpreads = [
          {
            left: { tag: 'Fase D', title: 'Kurikulum Pembelajaran', subtitle: `Robotik & IoT IDN - ${track.grade}`, desc: 'Panduan lengkap silabus, Capaian Pembelajaran (CP), Alur Tujuan Pembelajaran (ATP), dan proyek sains teknologi siswa SMP.', isCover: true },
            right: { tag: 'PROLOGUE', title: 'Kata Pengantar', content: [
              'Pendidikan berbasis teknologi masa kini menuntut siswa untuk berinovasi sejak dini. Kurikulum Robotik & IoT ini dikembangkan secara holistik guna mempersiapkan siswa menghadapi era otomatisasi.',
              'Melalui integrasi pemrograman blok (MakeCode), sirkuit elektronik, serta platform cloud database, siswa dilatih mengasah logika computational thinking dan problem solving secara sistematis.'
            ]}
          },
          {
            left: { tag: 'STANDAR CP', title: 'Capaian Pembelajaran (CP)', isList: true, items: [
              { title: 'Berpikir Komputasional', text: 'Siswa mampu dekomposisi masalah, abstraksi logika, pengenalan pola, dan merancang algoritma.' },
              { title: 'Teknologi & Mekanika', text: 'Siswa dapat mengidentifikasi komponen elektronik dan merakit kerangka mekanik robot.' }
            ]},
            right: { tag: 'STANDAR TP', title: 'Tujuan Pembelajaran (TP)', isList: true, items: [
              { title: 'Pemahaman Fondasi IoT', text: 'Mengenal sensor input analog/digital dan aktuator penggerak.' },
              { title: 'Keterampilan Coding', text: 'Mampu menyusun program logika sekuensial (looping, condition) di platform MakeCode.' }
            ]}
          }
        ];

        // Dynamic subject spreads from selected track in roadmap
        const subjectSpreads = track.subjects.map((sub, sIdx) => {
          const isGrad = sub.id.startsWith('graduation');
          
          if (isGrad) {
            return {
              left: { 
                tag: 'Bab Akhir', 
                title: 'Evaluasi & Proyek', 
                subtitle: `Penilaian capaian kompetensi ${track.grade} ${track.semester}.`, 
                isList: true, 
                items: sub.subMateri.map((sm, smIdx) => ({
                  title: sm.name,
                  text: smIdx === 0 ? 'Kreativitas sasis, keandalan kode, presentasi demo, dan fungsionalitas.' : 'Wajib membuat portofolio dan video demo proyek.'
                }))
              },
              right: { 
                tag: 'Graduation', 
                title: sub.title, 
                content: [
                  `Selamat! Dengan menyelesaikan seluruh materi Kurikulum Robotik & IoT IDN ${track.grade} - ${track.semester} ini, kamu telah meletakkan pondasi kuat.`,
                  'Langkah selanjutnya adalah melangkah ke tingkat berikutnya dengan tantangan yang lebih seru.'
                ] 
              }
            };
          }

          // Regular subject
          const imagePath = sub.id.includes('trashbin') || sub.id.includes('watering') || sub.id.includes('parking')
            ? '/smart_trashbin.png'
            : (sub.id.includes('tinybit') || sub.id.includes('robot') ? '/robot_character.png' : '/microbit_board.png');

          // Dynamically generate indicator checklist items based on sub-materials!
          // "dan untuk indikator menyesuaikan jumlah sub materinya"
          const checkIndicators = sub.subMateri.map((sm) => {
            const name = sm.name;
            if (name.toLowerCase().includes('k3')) {
              return `Siswa memahami dan menerapkan prinsip ${name}`;
            }
            if (name.toLowerCase().includes('fundamental')) {
              return `Siswa menguasai konsep ${name}`;
            }
            if (name.toLowerCase().includes('pemrograman') || name.toLowerCase().includes('programming')) {
              return `Siswa terampil dalam ${name}`;
            }
            if (name.toLowerCase().includes('integrasi')) {
              return `Siswa mampu melakukan ${name}`;
            }
            return `Siswa mampu memahami & mempraktikkan: ${name}`;
          });

          const cohortIds = ['kelas-7-smt-2', 'kelas-8-smt-3', 'kelas-8-smt-4'];
          const activeCohortId = cohortIds[activeBookGradeIdx];
          const timelineMeta = getSubjectMeta(activeCohortId, sub.id);
          const subContent = getSubjectContent(sub.id);

          return {
            left: {
              tag: `Bab ${sIdx + 1}`,
              title: sub.title,
              subtitle: sub.desc,
              image: imagePath,
              sectionA: {
                title: 'A. Deskripsi Proyek',
                text: subContent.descLeft
              },
              meta: [
                { label: 'Estimasi Waktu', val: timelineMeta ? `${timelineMeta.duration} (${timelineMeta.weeks})` : sub.duration },
                { label: 'Tingkat Kesulitan', val: sub.level },
                { label: 'Tipe Proyek', val: sub.type }
              ]
            },
            right: {
              title: `${sub.title} (Lanjutan)`,
              sections: [
                {
                  title: 'B. Capaian Pembelajaran (CP)',
                  bullet: subContent.cp
                },
                {
                  title: 'C. Tujuan Pembelajaran (TP)',
                  bullet: subContent.tp
                },
                {
                  title: 'D. Indikator Pembelajaran',
                  check: checkIndicators
                },
                {
                  title: 'E. Gambaran Project',
                  project: {
                    title: sub.title,
                    desc: subContent.descRight,
                    image: imagePath
                  }
                }
              ]
            }
          };
        });

        const spreads = [...baseSpreads, ...subjectSpreads];

        const activeSpreadData: any = spreads[bookSpread];

        const handleGoToSpread = (idx: number) => {
          if (idx === bookSpread || idx < 0 || idx > spreads.length - 1) return;
          setIsBookFlipping(true);
          setTimeout(() => {
            setBookSpread(idx);
            setIsBookFlipping(false);
          }, 200);
        };

        const handleSendChat = (text: string) => {
          if (!text.trim()) return;
          const userMsg = text.trim();
          setBookChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
          setBookChatInput('');

          setTimeout(() => {
            let aiText = '';
            if (userMsg.toLowerCase().includes('microbit') || userMsg.toLowerCase().includes('micro:bit')) {
              aiText = 'Micro:bit adalah komputer saku untuk belajar dasar sensor dan logika pemograman. Di bab 5.1 kita akan mempelajari bagian-bagiannya seperti tombol A/B, pin I/O, dan sensor internal!';
            } else if (userMsg.toLowerCase().includes('indikator')) {
              aiText = 'Indikator pembelajaran di bab ini menuntut siswa mampu:\n1. Menyebutkan bagian Microbit\n2. Menjelaskan fungsi pin\n3. Membuat program matrix LED sederhana.';
            } else if (userMsg.toLowerCase().includes('makecode') || userMsg.toLowerCase().includes('led')) {
              aiText = 'Di MakeCode, kamu bisa menyalakan LED menggunakan blok `show leds` or `plot x y`. Blok ini berada di dalam kategori "Basic" dan sangat interaktif!';
            } else {
              aiText = 'Tentu! Kurikulum kita dirancang agar interaktif. Kamu bisa menelusuri sub-bab di daftar isi sebelah kiri untuk mendalami materi!';
            }
            setBookChatHistory(prev => [...prev, { sender: 'ai', text: aiText }]);
          }, 400);
        };

        const daftarIsi = [
          { label: '01. Cover & Kata Pengantar', spread: 0 },
          { label: '02. Standar CP/TP', spread: 1 },
          { label: '03. Materi Pembelajaran', isHeader: true },
          ...track.subjects.map((sub, sIdx) => {
            const isGrad = sub.id.startsWith('graduation');
            if (isGrad) {
              return { label: `04. Evaluasi & Kelulusan`, spread: baseSpreads.length + sIdx };
            }
            return { label: `${sIdx + 1}. ${sub.title}`, spread: baseSpreads.length + sIdx, sub: true };
          })
        ];

        const stickerTags = [
          { id: 'cp', label: 'CP', spread: 1, bg: '#2563eb' },
          { id: 'tp', label: 'TP', spread: 1, bg: '#7c3aed' },
          { id: 'mat', label: 'Materi', spread: 2, bg: '#10b981' },
          { id: 'proj', label: 'Proyek', spread: 2, bg: '#f59e0b' },
          { id: 'eval', label: 'Rubrik', spread: spreads.length - 1, bg: '#ec4899' }
        ];

        return (
          <div style={{ display:'flex', flexDirection:'column', gap:'20px', fontFamily:"'Inter', sans-serif" }}>
            <style>{`
              @keyframes pageFlipLeft {
                0% {
                  transform: rotateY(0deg);
                  transform-origin: right center;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.15), inset 0 0 40px rgba(0,0,0,0.03);
                }
                50% {
                  transform: rotateY(-30deg) scale(0.98);
                  transform-origin: right center;
                  box-shadow: 0 15px 35px rgba(0,0,0,0.25), inset 0 0 40px rgba(0,0,0,0.05);
                }
                100% {
                  transform: rotateY(0deg);
                  transform-origin: right center;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.15), inset 0 0 40px rgba(0,0,0,0.03);
                }
              }
              @keyframes pageFlipRight {
                0% {
                  transform: rotateY(0deg);
                  transform-origin: left center;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.15), inset 0 0 40px rgba(0,0,0,0.03);
                }
                50% {
                  transform: rotateY(30deg) scale(0.98);
                  transform-origin: left center;
                  box-shadow: 0 15px 35px rgba(0,0,0,0.25), inset 0 0 40px rgba(0,0,0,0.05);
                }
                100% {
                  transform: rotateY(0deg);
                  transform-origin: left center;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.15), inset 0 0 40px rgba(0,0,0,0.03);
                }
              }
              .flip-l { animation: pageFlipLeft 0.4s cubic-bezier(0.25, 1, 0.5, 1); z-index: 10; }
              .flip-r { animation: pageFlipRight 0.4s cubic-bezier(0.25, 1, 0.5, 1); z-index: 10; }
              
              .book-container {
                perspective: 1500px;
              }
              
              .book-bg {
                background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
                backdrop-filter: blur(30px);
                -webkit-backdrop-filter: blur(30px);
                border: 1.5px solid rgba(255, 255, 255, 0.12);
                box-shadow: 
                  0 35px 70px -15px rgba(0, 0, 0, 0.55),
                  0 15px 30px -10px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.15);
                border-radius: 28px;
                position: relative;
              }
              
              .book-spine {
                width: 16px;
                background: linear-gradient(90deg, 
                  rgba(0,0,0,0.3) 0%, 
                  rgba(0,0,0,0.08) 25%, 
                  rgba(255,255,255,0.12) 50%, 
                  rgba(0,0,0,0.08) 75%, 
                  rgba(0,0,0,0.3) 100%
                );
                box-shadow: 
                  inset 1px 0 0 rgba(255,255,255,0.05), 
                  inset -1px 0 0 rgba(255,255,255,0.05),
                  0 0 12px rgba(0,0,0,0.3);
                z-index: 5;
                margin-left: -8px;
                margin-right: -8px;
                flex-shrink: 0;
                align-self: stretch;
              }
              
              .book-page {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.94) 100%);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(226, 232, 240, 0.85);
                transition: all 0.3s ease;
              }
              
              /* Stack page thickness effect for left page */
              .book-page-left {
                position: relative;
              }
              .book-page-left::before {
                content: '';
                position: absolute;
                top: 4px;
                left: -4px;
                right: 0px;
                bottom: 4px;
                background: #f8fafc;
                border: 1px solid rgba(226, 232, 240, 0.7);
                border-radius: 20px 4px 4px 20px;
                z-index: -1;
                box-shadow: -2px 2px 4px rgba(0,0,0,0.015);
              }
              .book-page-left::after {
                content: '';
                position: absolute;
                top: 8px;
                left: -8px;
                right: 0px;
                bottom: 8px;
                background: #f1f5f9;
                border: 1px solid rgba(226, 232, 240, 0.5);
                border-radius: 20px 4px 4px 20px;
                z-index: -2;
                box-shadow: -4px 4px 8px rgba(0,0,0,0.025);
              }
              
              /* Stack page thickness effect for right page */
              .book-page-right {
                position: relative;
              }
              .book-page-right::before {
                content: '';
                position: absolute;
                top: 4px;
                left: 0px;
                right: -4px;
                bottom: 4px;
                background: #f8fafc;
                border: 1px solid rgba(226, 232, 240, 0.7);
                border-radius: 4px 20px 20px 4px;
                z-index: -1;
                box-shadow: 2px 2px 4px rgba(0,0,0,0.015);
              }
              .book-page-right::after {
                content: '';
                position: absolute;
                top: 8px;
                left: 0px;
                right: -8px;
                bottom: 8px;
                background: #f1f5f9;
                border: 1px solid rgba(226, 232, 240, 0.5);
                border-radius: 4px 20px 20px 4px;
                z-index: -2;
                box-shadow: 4px 4px 8px rgba(0,0,0,0.025);
              }
              
              .book-page-shadow {
                box-shadow: 
                  0 8px 24px rgba(0,0,0,0.03), 
                  inset 0 0 30px rgba(0,0,0,0.01);
              }
              
              .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(156, 163, 175, 0.4);
                border-radius: 2px;
              }

              @media (max-width: 600px) {
                .curriculum-tab-bar {
                  display: flex !important;
                  width: 100% !important;
                  overflow-x: auto !important;
                  white-space: nowrap !important;
                  flex-wrap: nowrap !important;
                  border-radius: 12px !important;
                  padding: 4px !important;
                  gap: 4px !important;
                  -ms-overflow-style: none !important;
                  scrollbar-width: none !important;
                }
                .curriculum-tab-bar::-webkit-scrollbar {
                  display: none !important;
                }
                .curriculum-tab-btn {
                  flex: 1 0 auto !important;
                  justify-content: center !important;
                  padding: 8px 12px !important;
                  font-size: 11px !important;
                }
              }

              @media (max-width: 1024px) {
                .curriculum-layout {
                  flex-direction: column !important;
                  gap: 16px !important;
                }
                .curriculum-sidebar-left {
                  width: 100% !important;
                }
                .curriculum-sidebar-right {
                  width: 100% !important;
                }
              }

              @media (max-width: 768px) {
                .curriculum-main-area {
                  min-width: 100% !important;
                  width: 100% !important;
                }
                .book-bg {
                  flex-direction: column !important;
                  gap: 20px !important;
                  padding: 16px !important;
                  border-radius: 20px !important;
                }
                .book-spine {
                  display: none !important;
                }
                .book-page {
                  border-radius: 16px !important;
                  min-height: auto !important;
                  padding: 16px !important;
                  border-right: 1px solid rgba(226,232,240,0.85) !important;
                }
                .book-page-left::before,
                .book-page-left::after,
                .book-page-right::before,
                .book-page-right::after {
                  display: none !important;
                }
                
                .curriculum-preview-container {
                  flex-direction: column !important;
                  align-items: stretch !important;
                  gap: 6px !important;
                }
                .curriculum-preview-label {
                  writing-mode: horizontal-tb !important;
                  border-right: none !important;
                  border-bottom: 1px solid rgba(226,232,240,0.6) !important;
                  padding-right: 0 !important;
                  padding-bottom: 4px !important;
                  margin-bottom: 4px !important;
                  display: block !important;
                }
              }
            `}</style>

            <div className="curriculum-layout" style={{ display:'flex', gap:'24px', alignItems:'stretch', flexWrap:'wrap' }}>
              
              {/* 1. Left Sidebar: Daftar Isi */}
              <div className="curriculum-sidebar-left" style={{ width:'240px', background:'rgba(255, 255, 255, 0.4)', border:'1px solid rgba(255, 255, 255, 0.6)', borderRadius:'24px', padding:'20px 16px', display:'flex', flexDirection:'column', gap:'16px', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.04)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', paddingBottom:'12px', borderBottom:'1px solid rgba(37,99,235,0.15)' }}>
                  <Bookmark size={16} style={{ color:'#2563eb' }} />
                  <span style={{ fontSize:'13.5px', fontWeight:800, color:'#1e293b', fontFamily:"'Poppins',sans-serif" }}>Daftar Isi</span>
                </div>

                {/* Selector Dropdown */}
                <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                  <label style={{ fontSize:'9.5px', fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.03em' }}>Pilih Kelas/Smt</label>
                  <select
                    value={activeBookGradeIdx}
                    onChange={(e) => {
                      setActiveBookGradeIdx(Number(e.target.value));
                      setBookSpread(2); // reset to first chapter page
                    }}
                    style={{
                      width:'100%',
                      padding:'8px 10px',
                      borderRadius:'12px',
                      border:'1.5px solid rgba(37,99,235,0.2)',
                      background:'white',
                      fontSize:'11px',
                      fontWeight:700,
                      color:'#1e293b',
                      cursor:'pointer',
                      outline:'none',
                      boxShadow:'0 2px 6px rgba(0,0,0,0.03)'
                    }}
                  >
                    {timelineData.map((t, idx) => (
                      <option key={idx} value={idx}>
                        {t.grade} - {t.semester}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="custom-scrollbar" style={{ display:'flex', flexDirection:'column', gap:'3px', overflowY:'auto', maxHeight:'360px' }}>
                  {daftarIsi.map((item: any, idx) => {
                    if (item.isHeader) {
                      return (
                        <div key={idx} style={{ fontSize:'10px', fontWeight:800, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', padding:'8px 8px 4px' }}>
                          {item.label}
                        </div>
                      );
                    }
                    const isSelected = bookSpread === item.spread;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleGoToSpread(item.spread!)}
                        style={{
                          display:'flex',
                          alignItems:'center',
                          gap:'8px',
                          width:'100%',
                          textAlign:'left',
                          border:'none',
                          borderRadius:'10px',
                          padding: item.sub ? '6px 8px 6px 16px' : '8px 10px',
                          fontSize: item.sub ? '11px' : '12px',
                          fontWeight: isSelected ? 800 : 500,
                          color: isSelected ? '#2563eb' : '#475569',
                          background: isSelected ? 'rgba(37,99,235,0.08)' : 'transparent',
                          cursor:'pointer',
                          transition:'all 0.2s'
                        }}
                      >
                        <div style={{ width:'4px', height:'4px', borderRadius:'50%', background: isSelected ? '#2563eb' : '#cbd5e1' }} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop:'auto', background:'linear-gradient(135deg,rgba(37,99,235,0.06),rgba(124,58,237,0.06))', border:'1px solid rgba(99,102,241,0.2)', borderRadius:'16px', padding:'12px 14px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'6px' }}>
                    <Sparkles size={12} style={{ color:'#6366f1' }} />
                    <span style={{ fontSize:'10.5px', fontWeight:700, color:'#4f46e5' }}>Terus Belajar!</span>
                  </div>
                  <p style={{ fontSize:'9.5px', color:'#64748b', lineHeight:1.3, margin:'0 0 6px' }}>Kamu sudah menyelesaikan 32% dari seluruh kurikulum semester ini.</p>
                  <div style={{ width:'100%', height:'5px', borderRadius:'99px', background:'#e2e8f0', overflow:'hidden' }}>
                    <div style={{ width:'32%', height:'100%', borderRadius:'99px', background:'linear-gradient(90deg,#2563eb,#7c3aed)' }} />
                  </div>
                </div>
              </div>

              {/* 2. Main Open Book Area */}
              <div className="curriculum-main-area" style={{ flex:1, minWidth:'460px', display:'flex', flexDirection:'column', gap:'16px' }}>
                
                <div className="book-container" style={{ position:'relative', display:'flex', alignItems:'stretch', width:'100%' }}>
                  
                  <div className="book-bg" style={{ flex:1, padding: '16px 18px 16px 16px', display:'flex', gap:'4px' }}>
                    
                    <div className={`book-page book-page-left book-page-shadow ${isBookFlipping ? 'flip-l' : ''}`} style={{ flex:1, borderRadius:'20px 6px 6px 20px', padding:'24px', position:'relative', minHeight:'500px', display:'flex', flexDirection:'column', borderRight:'1px solid rgba(226,232,240,0.85)' }}>
                      <div style={{ position:'absolute', top:0, right:0, bottom:0, width:'35px', background:'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 100%)', pointerEvents:'none' }} />

                      {/* Header Band */}
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(226,232,240,0.5)', paddingBottom:'6px', marginBottom:'14px' }}>
                        <span style={{ fontSize:'8px', fontWeight:800, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Kurikulum Robotik &amp; IoT</span>
                        <span style={{ fontSize:'8px', fontWeight:800, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>SMP IDN BOARDING SCHOOL</span>
                      </div>

                      {activeSpreadData.left.tag && (
                        <div style={{ display:'inline-block', alignSelf:'flex-start', background:'rgba(37,99,235,0.08)', border:'1px solid rgba(37,99,235,0.2)', borderRadius:'6px', padding:'2px 8px', fontSize:'9px', fontWeight:800, color:'#2563eb', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px' }}>
                          {activeSpreadData.left.tag}
                        </div>
                      )}

                      <h3 style={{ fontFamily:"'Poppins',sans-serif", fontSize:'20px', fontWeight:950, backgroundImage:'linear-gradient(135deg, #0f172a 0%, #334155 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', margin:'0 0 10px', letterSpacing:'-0.02em', lineHeight:1.2 }}>
                        {activeSpreadData.left.title}
                      </h3>

                      {activeSpreadData.left.isCover ? (
                        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', flex:1, textAlign:'center', gap:'16px', padding:'10px' }}>
                          <div style={{ width:'70px', height:'70px', borderRadius:'20px', background:'linear-gradient(135deg,#2563eb,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 10px 20px -5px rgba(37,99,235,0.3)' }}>
                            <Cpu size={32} color="white" />
                          </div>
                          <h4 style={{ fontFamily:"'Poppins',sans-serif", fontSize:'15px', fontWeight:800, color:'#4338ca', margin:0 }}>{activeSpreadData.left.subtitle}</h4>
                          <p style={{ fontSize:'11.5px', color:'#64748b', lineHeight:1.6, maxWidth:'280px', margin:0 }}>{activeSpreadData.left.desc}</p>
                        </div>
                      ) : (
                        <div style={{ display:'flex', flexDirection:'column', flex:1, gap:'12px' }}>
                          {activeSpreadData.left.subtitle && (
                            <p style={{ fontSize:'11px', color:'#475569', lineHeight:1.5, margin:0 }}>{activeSpreadData.left.subtitle}</p>
                          )}

                          {activeSpreadData.left.image && (
                            <div style={{ display:'flex', justifyContent:'center', padding:'8px 0' }}>
                              <div style={{ position:'relative', background:'linear-gradient(135deg,rgba(37,99,235,0.03),rgba(124,58,237,0.03))', border:'1px solid rgba(226,232,240,0.8)', borderRadius:'16px', padding:'10px', display:'flex', alignItems:'center', justifyContent:'center', width:'100%', maxWidth:'260px', height:'130px', boxShadow:'0 4px 12px rgba(0,0,0,0.03)' }}>
                                <img src={activeSpreadData.left.image} alt="board image" style={{ maxHeight:'100%', maxWidth:'100%', objectFit:'contain' }} />
                              </div>
                            </div>
                          )}

                          {activeSpreadData.left.isList && activeSpreadData.left.items && (
                            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                              {activeSpreadData.left.items.map((item: any, i: number) => (
                                <div key={i} style={{ background:'rgba(248,250,252,0.8)', border:'1px solid rgba(226,232,240,0.7)', borderRadius:'12px', padding:'10px 12px' }}>
                                  <span style={{ fontSize:'10.5px', fontWeight:800, color:'#1e293b', display:'block', marginBottom:'2px' }}>{item.title}</span>
                                  <p style={{ fontSize:'10px', color:'#64748b', lineHeight:1.4, margin:0 }}>{item.text}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {activeSpreadData.left.sectionA && (
                            <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                              <span style={{ fontSize:'11.5px', fontWeight:800, color:'#1e293b' }}>{activeSpreadData.left.sectionA.title}</span>
                              <p style={{ fontSize:'10.5px', color:'#475569', lineHeight:1.5, margin:0 }}>{activeSpreadData.left.sectionA.text}</p>
                            </div>
                          )}

                          {activeSpreadData.left.meta && (
                            <div style={{ marginTop:'auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'6px' }}>
                              {activeSpreadData.left.meta.map((m: any, i: number) => (
                                <div key={i} style={{ background:'rgba(255, 255, 255, 0.5)', backdropFilter:'blur(4px)', border:'1px solid rgba(226, 232, 240, 0.6)', borderRadius:'10px', padding:'6px 8px', textAlign:'center', boxShadow:'0 2px 6px rgba(0,0,0,0.02)' }}>
                                  <span style={{ fontSize:'8px', color:'#94a3b8', fontWeight:600, display:'block', textTransform:'uppercase' }}>{m.label}</span>
                                  <span style={{ fontSize:'9.5px', color:'#334155', fontWeight:700, display:'block', marginTop:'1px' }}>{m.val}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div style={{ marginTop:'auto', paddingTop:'16px', display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid rgba(226,232,240,0.6)' }}>
                        <button
                          onClick={() => handleGoToSpread(bookSpread - 1)}
                          disabled={bookSpread === 0}
                          style={{ border:'none', background: bookSpread === 0 ? 'transparent' : 'rgba(241,245,249,0.8)', cursor: bookSpread === 0 ? 'default' : 'pointer', borderRadius:'50%', width:'24px', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', color:'#475569' }}
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <span style={{ fontSize:'9.5px', color:'#94a3b8', fontWeight:600 }}>{(bookSpread * 2) + 1} / {spreads.length * 2}</span>
                      </div>
                    </div>

                    {/* Book Spine Divider */}
                    <div className="book-spine" />

                    {/* RIGHT PAGE */}
                    <div className={`book-page book-page-right book-page-shadow ${isBookFlipping ? 'flip-r' : ''}`} style={{ flex:1, borderRadius:'6px 20px 20px 6px', padding:'24px', position:'relative', minHeight:'500px', display:'flex', flexDirection:'column' }}>
                      <div style={{ position:'absolute', top:0, left:0, bottom:0, width:'35px', background:'linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 100%)', pointerEvents:'none' }} />

                      {/* Header Band */}
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(226,232,240,0.5)', paddingBottom:'6px', marginBottom:'14px' }}>
                        <span style={{ fontSize:'8px', fontWeight:800, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Dokumentasi &amp; Penilaian</span>
                        <span style={{ fontSize:'8px', fontWeight:800, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em' }}>Fase D</span>
                      </div>

                      {activeSpreadData.right.tag && (
                        <div style={{ display:'inline-block', alignSelf:'flex-start', background:'rgba(124,58,237,0.08)', border:'1px solid rgba(124,58,237,0.2)', borderRadius:'6px', padding:'2px 8px', fontSize:'9px', fontWeight:800, color:'#7c3aed', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px' }}>
                          {activeSpreadData.right.tag}
                        </div>
                      )}

                      <h3 style={{ fontFamily:"'Poppins',sans-serif", fontSize:'18px', fontWeight:950, backgroundImage:'linear-gradient(135deg, #0f172a 0%, #334155 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', margin:'0 0 12px', letterSpacing:'-0.01em', lineHeight:1.2 }}>
                        {activeSpreadData.right.title}
                      </h3>

                      <div className="custom-scrollbar" style={{ display:'flex', flexDirection:'column', flex:1, gap:'12px', overflowY:'auto', maxHeight:'360px', paddingRight:'4px' }}>
                        {activeSpreadData.right.content && activeSpreadData.right.content.map((p: any, i: number) => (
                          <p key={i} style={{ fontSize:'11px', color:'#475569', lineHeight:1.6, margin:0 }}>{p}</p>
                        ))}

                        {activeSpreadData.right.isList && activeSpreadData.right.items && (
                          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                            {activeSpreadData.right.items.map((item: any, i: number) => (
                              <div key={i} style={{ background:'rgba(248,250,252,0.8)', border:'1px solid rgba(226,232,240,0.7)', borderRadius:'12px', padding:'10px 12px' }}>
                                <span style={{ fontSize:'10.5px', fontWeight:800, color:'#1e293b', display:'block', marginBottom:'2px' }}>{item.title}</span>
                                <p style={{ fontSize:'10px', color:'#64748b', lineHeight:1.4, margin:0 }}>{item.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {(() => {
                          const sections = activeSpreadData.right.sections;
                          if (!sections) return null;
                          return sections.map((sec: any, idx: number) => (
                            <div key={idx} style={{ display:'flex', flexDirection:'column', gap:'6px', background:'rgba(255, 255, 255, 0.45)', border:'1px solid rgba(226, 232, 240, 0.65)', borderRadius:'14px', padding:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.01)', marginBottom:'4px' }}>
                              <span style={{ fontSize:'11.5px', fontWeight:800, color:'#1e293b', borderBottom:'1px solid rgba(226,232,240,0.5)', paddingBottom:'4px', marginBottom:'4px', display:'block' }}>{sec.title}</span>
                              
                              {sec.bullet && (
                                <ul style={{ display:'flex', flexDirection:'column', gap:'3.5px', margin:0, paddingLeft:'16px' }}>
                                  {sec.bullet.map((b: any, bi: number) => (
                                    <li key={bi} style={{ fontSize:'10.5px', color:'#475569', lineHeight:1.4 }}>{b}</li>
                                  ))}
                                </ul>
                              )}

                              {sec.check && (
                                <div style={{ display:'flex', flexDirection:'column', gap:'3.5px' }}>
                                  {sec.check.map((c: any, ci: number) => (
                                    <div key={ci} style={{ display:'flex', alignItems:'flex-start', gap:'6px' }}>
                                      <div style={{ width:'13px', height:'13px', borderRadius:'50%', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'2px' }}>
                                        <Check size={8} style={{ color:'#10b981' }} />
                                      </div>
                                      <span style={{ fontSize:'10.5px', color:'#475569', lineHeight:1.4 }}>{c}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {sec.project && (
                                <div style={{ display:'flex', gap:'10px', background:'rgba(255,255,255,0.55)', backdropFilter:'blur(4px)', border:'1px solid rgba(37,99,235,0.12)', borderRadius:'12px', padding:'10px', alignItems:'center', marginTop:'4px', boxShadow:'0 2px 8px rgba(0,0,0,0.02)' }}>
                                  <div style={{ width:'44px', height:'44px', borderRadius:'8px', background:'white', border:'1px solid rgba(226,232,240,0.8)', padding:'3px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                    <img src={sec.project.image} alt={sec.project.title} style={{ maxHeight:'100%', maxWidth:'100%', objectFit:'contain' }} />
                                  </div>
                                  <div style={{ flex:1, minWidth:0 }}>
                                    <span style={{ fontSize:'11px', fontWeight:800, color:'#1e293b', display:'block' }}>{sec.project.title}</span>
                                    <p style={{ fontSize:'9.5px', color:'#64748b', margin:0, lineHeight:1.3, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{sec.project.desc}</p>
                                  </div>
                                  <button
                                    onClick={() => alert(`Detail Proyek: ${sec.project?.title}`)}
                                    style={{ border:'none', background:'#2563eb', color:'white', borderRadius:'8px', fontSize:'9px', fontWeight:700, padding:'6px 10px', cursor:'pointer', flexShrink:0, transition:'opacity 0.2s' }}
                                  >
                                    Detail
                                  </button>
                                </div>
                              )}
                            </div>
                          ));
                        })()}
                      </div>

                      <div style={{ marginTop:'auto', paddingTop:'16px', display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid rgba(226,232,240,0.6)' }}>
                        <span style={{ fontSize:'9.5px', color:'#94a3b8', fontWeight:600 }}>{(bookSpread * 2) + 2} / {spreads.length * 2}</span>
                        <button
                          onClick={() => handleGoToSpread(bookSpread + 1)}
                          disabled={bookSpread === spreads.length - 1}
                          style={{ border:'none', background: bookSpread === spreads.length - 1 ? 'transparent' : 'rgba(241,245,249,0.8)', cursor: bookSpread === spreads.length - 1 ? 'default' : 'pointer', borderRadius:'50%', width:'24px', height:'24px', display:'flex', alignItems:'center', justifyContent:'center', color:'#475569' }}
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Sticker tags */}
                  <div style={{ position:'absolute', top:'40px', right:'-22px', display:'flex', flexDirection:'column', gap:'10px', zIndex:50 }}>
                    {stickerTags.map(tag => {
                      const isTargetSpread = bookSpread === tag.spread;
                      return (
                        <button
                          key={tag.id}
                          onClick={() => handleGoToSpread(tag.spread)}
                          style={{
                            border:'none',
                            background: tag.bg,
                            color:'white',
                            fontSize:'9px',
                            fontWeight:800,
                            padding:'6px 8px',
                            borderRadius:'0 8px 8px 0',
                            cursor:'pointer',
                            writingMode:'vertical-rl',
                            textOrientation:'mixed',
                            boxShadow:'2px 4px 10px rgba(0,0,0,0.15)',
                            transform: isTargetSpread ? 'translateX(3px)' : 'none',
                            transition:'transform 0.2s',
                            opacity: isTargetSpread ? 1 : 0.8
                          }}
                        >
                          {tag.label}
                        </button>
                      );
                    })}
                  </div>

                </div>

                {/* Bottom Preview */}
                <div className="curriculum-preview-container" style={{ background:'rgba(255, 255, 255, 0.45)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.6)', borderRadius:'20px', padding:'12px', display:'flex', alignItems:'center', gap:'10px', boxShadow:'0 8px 32px rgba(31,38,135,0.03)' }}>
                  <span className="curriculum-preview-label" style={{ fontSize:'10px', fontWeight:800, color:'#94a3b8', writingMode:'vertical-lr', textTransform:'uppercase', letterSpacing:'0.04em', borderRight:'1px solid rgba(226,232,240,0.6)', paddingRight:'6px' }}>PREVIEW</span>
                  
                  <div className="custom-scrollbar" style={{ flex:1, display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'2px' }}>
                    {spreads.map((spread, idx) => {
                      const isActive = bookSpread === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleGoToSpread(idx)}
                          style={{
                            flex:'0 0 auto',
                            width:'90px',
                            height:'60px',
                            background: isActive ? 'white' : 'rgba(255, 255, 255, 0.55)',
                            backdropFilter: 'blur(5px)',
                            border: isActive ? '2px solid #2563eb' : '1px solid rgba(255,255,255,0.6)',
                            borderRadius:'10px',
                            padding:'4px',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'space-between',
                            cursor:'pointer',
                            boxShadow: isActive ? '0 4px 10px rgba(37,99,235,0.15)' : 'none',
                            transition:'all 0.2s',
                            transform: isActive ? 'scale(1.02)' : 'none'
                          }}
                        >
                          <span style={{ fontSize:'7.5px', fontWeight:800, color:'#94a3b8', display:'block', textAlign:'left' }}>{spread.left.tag || `Page ${idx*2+1}`}</span>
                          <span style={{ fontSize:'8.5px', fontWeight:700, color:'#334155', display:'block', textAlign:'left', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', width:'100%' }}>{spread.left.title}</span>
                          <span style={{ fontSize:'7px', fontWeight:500, color:'#cbd5e1', textAlign:'right', display:'block', width:'100%' }}>{(idx*2)+1}-{(idx*2)+2}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Sidebar AI Chat */}
              <div className="curriculum-sidebar-right" style={{ width:'280px', display:'flex', flexDirection:'column', gap:'16px' }}>
                <div style={{ background:'rgba(255,255,255,0.85)', backdropFilter:'blur(20px)', borderRadius:'24px', border:'1px solid rgba(226,232,240,0.8)', padding:'16px 20px', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', boxShadow:'0 10px 25px -5px rgba(0,0,0,0.05)', position:'relative' }}>
                  <div style={{ position:'absolute', top:'-10px', width:'60px', height:'60px', borderRadius:'50%', background:'rgba(37,99,235,0.2)', filter:'blur(15px)', zIndex:-1 }} />
                  <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'linear-gradient(135deg, #2563eb, #7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 20px -4px rgba(37,99,235,0.4)', border:'2.5px solid white' }}>
                    <Bot size={28} color="white" />
                  </div>
                  <span style={{ fontSize:'10.5px', fontWeight:800, color:'#2563eb', background:'rgba(219,234,254,0.7)', border:'1px solid rgba(147,197,253,0.5)', padding:'2px 8px', borderRadius:'999px', textTransform:'uppercase', letterSpacing:'0.06em' }}>Virtual Tutor</span>
                  <p style={{ fontSize:'11px', color:'#64748b', textAlign:'center', lineHeight:1.4, margin:0 }}>Chat dengan asisten AI kami untuk mendalami materi pembelajaran secara instan.</p>
                </div>

                <div style={{ background:'rgba(255,255,255,0.85)', backdropFilter:'blur(20px)', borderRadius:'24px', border:'1px solid rgba(226,232,240,0.8)', padding:'16px', display:'flex', flexDirection:'column', gap:'12px', boxShadow:'0 10px 25px -5px rgba(0,0,0,0.05)', flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', paddingBottom:'10px', borderBottom:'1px solid rgba(226,232,240,0.7)' }}>
                    <Bot size={14} style={{ color:'#2563eb' }} />
                    <span style={{ fontSize:'11.5px', fontWeight:800, color:'#1e293b' }}>Tanya Asisten AI</span>
                    <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#10b981', marginLeft:'auto' }} />
                    <span style={{ fontSize:'9.5px', color:'#10b981', fontWeight:700 }}>Online</span>
                  </div>

                  <div className="custom-scrollbar" style={{ display:'flex', flexDirection:'column', gap:'8px', overflowY:'auto', maxHeight:'200px', flex:1 }}>
                    {bookChatHistory.map((msg, i) => {
                      const isAi = msg.sender === 'ai';
                      return (
                        <div key={i} style={{ alignSelf: isAi ? 'flex-start' : 'flex-end', maxWidth:'85%', background: isAi ? 'rgba(241,245,249,0.9)' : 'linear-gradient(135deg,#2563eb,#3b82f6)', color: isAi ? '#334155' : 'white', borderRadius: isAi ? '14px 14px 14px 4px' : '14px 14px 4px 14px', padding:'8px 10px', fontSize:'10.5px', lineHeight:1.4, whiteSpace:'pre-wrap' }}>
                          {msg.text}
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display:'flex', flexDirection:'column', gap:'5px', paddingTop:'4px' }}>
                    <span style={{ fontSize:'9px', fontWeight:800, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.04em' }}>Pertanyaan Rekomendasi</span>
                    {['Komponen Utama Microbit', 'Indikator Bab Ini', 'Contoh Program LED'].map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendChat(`Jelaskan tentang ${chip}`)}
                        style={{ border:'1px solid rgba(226,232,240,0.8)', background:'#ffffff', color:'#2563eb', padding:'5px 8px', borderRadius:'10px', fontSize:'10px', fontWeight:600, cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  <div style={{ display:'flex', gap:'6px', alignItems:'center', borderTop:'1px solid rgba(226,232,240,0.7)', paddingTop:'10px' }}>
                    <input
                      type="text"
                      placeholder="Ketik pertanyaanmu..."
                      value={bookChatInput}
                      onChange={e => setBookChatInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendChat(bookChatInput)}
                      style={{ flex:1, border:'1px solid #e2e8f0', borderRadius:'100px', padding:'6px 12px', fontSize:'10.5px', outline:'none', background:'#f8fafc' }}
                    />
                    <button
                      onClick={() => handleSendChat(bookChatInput)}
                      style={{ width:'28px', height:'28px', borderRadius:'50%', background:'#2563eb', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'white', boxShadow:'0 3px 8px rgba(37,99,235,0.3)' }}
                    >
                      <Send size={11} fill="white" />
                    </button>
                  </div>
                </div>

                <div style={{ background:'rgba(255,255,255,0.85)', backdropFilter:'blur(20px)', borderRadius:'24px', border:'1px solid rgba(226,232,240,0.8)', padding:'16px', display:'flex', gap:'12px', alignItems:'center', boxShadow:'0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                  <div style={{ position:'relative', width:'54px', height:'54px', flexShrink:0 }}>
                    <svg width="54" height="54" viewBox="0 0 54 54" style={{ transform:'rotate(-90deg)' }}>
                      <circle cx="27" cy="27" r="23" fill="transparent" stroke="#e2e8f0" strokeWidth="4.5" />
                      <circle cx="27" cy="27" r="23" fill="transparent" stroke="url(#progGradient)" strokeWidth="4.5" strokeDasharray={`${2 * Math.PI * 23}`} strokeDashoffset={`${2 * Math.PI * 23 * (1 - 0.32)}`} strokeLinecap="round" />
                      <defs>
                        <linearGradient id="progGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop offset="100%" stopColor="#7c3aed" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11.5px', fontWeight:800, color:'#1e293b' }}>32%</div>
                  </div>
                  <div>
                    <span style={{ fontSize:'8px', color:'#94a3b8', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.04em', display:'block' }}>PROGRESS BELAJAR</span>
                    <span style={{ fontSize:'11px', fontWeight:800, color:'#334155', display:'block' }}>12 / 38 Materi Selesai</span>
                    <button
                      onClick={() => handleGoToSpread(8)}
                      style={{ border:'none', background:'transparent', color:'#2563eb', padding:0, fontSize:'9.5px', fontWeight:700, cursor:'pointer', marginTop:'2px', display:'flex', alignItems:'center', gap:'2px' }}
                    >
                      Lihat Progress <ArrowRight size={10} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* ====== TAB CONTENT: REVISI (Log of revisions) ====== */}
      {activeTab === 'revisions' && (
        <div className="space-y-6">
          {revisions.map((rev, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-blue-600 px-3 py-0.5 text-[10.5px] font-bold text-white uppercase tracking-wider">
                    Versi {rev.version}
                  </span>
                  <span className="text-[12px] text-slate-500 font-semibold">{rev.date}</span>
                </div>
                <span className="text-[11.5px] text-slate-400 font-medium">Penyusun: {rev.author}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-800 mb-2 flex items-center gap-1">
                    <TrendingUp size={14} className="text-blue-500" />
                    Detail Perubahan
                  </h4>
                  <ul className="space-y-2 text-[12px] text-slate-600">
                    {rev.changes.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-800 mb-2 flex items-center gap-1">
                    <FileText size={14} className="text-emerald-500" />
                    Alasan Perubahan
                  </h4>
                  <ul className="space-y-2 text-[12px] text-slate-600">
                    {rev.reasons.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-2">
                        <span className="text-emerald-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Extra mock components for Bot if not directly imported from lucide-react
const Bot = ({ size, color, className, style }: { size?: number, color?: string, className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={{ width: size, height: size, color: color, ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);
