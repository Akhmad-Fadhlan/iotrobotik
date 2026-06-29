Saya setuju dengan perubahan ini. Justru menurut saya PRD menjadi lebih fokus dan tidak terlalu "gemuk". Saya juga menyarankan **Timeline Pembelajaran** dihapus sebagai menu terpisah karena fungsinya sudah tercakup di dalam **Draft Kurikulum** melalui Roadmap Pembelajaran.

Berikut revisi PRD bagian menu dan fitur.

---

# Struktur Menu

```text
Dashboard

Materi

LMS

Repository Source Code

Project Library

Draft Kurikulum

Guru

Teknisi

SOP Penggunaan Robot

Inventaris LAB

Chatbot AI

Tentang
```

---

# Dashboard

Dashboard menampilkan ringkasan informasi.

Widget:

* Total Materi
* Total Source Code
* Total Project
* Total Guru
* Total Teknisi
* Draft Kurikulum Terbaru
* Materi Terbaru
* Project Terbaru

Bagian atas terdapat:

* Global Search
* Quick Access LMS
* Quick Access Inventaris LAB

---

# Draft Kurikulum

Menu ini menjadi pusat seluruh perencanaan pembelajaran.

Tidak hanya menyimpan draft kurikulum, tetapi juga seluruh dokumen pendukung.

## Struktur

```text
Draft Kurikulum

│

├── Silabus

├── Capaian Pembelajaran (CP)

├── Tujuan Pembelajaran (TP)

├── Alur Tujuan Pembelajaran (ATP)

├── Roadmap Pembelajaran

├── Timeline Semester

├── Draft Kurikulum

├── Detail Perubahan

├── Alasan Perubahan

└── Riwayat Revisi
```

---

## Roadmap Pembelajaran

Visual perjalanan pembelajaran siswa.

Contoh

```text
Kelas 7

Python Basic

↓

Tinybit

↓

Microbit

↓

IoT Basic

↓

Project Akhir Semester
```

Sedangkan Kelas 8

```text
ESP32

↓

IoT Cloud

↓

Computer Vision

↓

AI Robot

↓

Smart Project
```

Roadmap dibuat dalam bentuk visual horizontal agar guru baru mudah memahami urutan materi.

---

## Timeline Semester

Menampilkan distribusi materi setiap minggu.

Contoh

```text
Semester 1

Minggu 1

Python Basic

Minggu 2

Variable

Minggu 3

Loop

Minggu 4

Tinybit
```

Timeline ini hanya sebagai referensi implementasi kurikulum.

---

## Draft Kurikulum

Setiap dokumen memiliki informasi:

* Nama Kurikulum
* Tahun Ajaran
* Semester
* Versi
* Status
* Penyusun
* Tanggal Dibuat
* Tanggal Revisi
* Link Google Drive

---

## Detail Perubahan

Setiap revisi memiliki catatan lengkap.

Contoh

```text
Versi 2.3

Materi AI dipindahkan ke Semester 2

Tinybit ditambahkan pada Kelas 7

ESP32 MQTT dipindahkan ke Kelas 8
```

---

## Alasan Perubahan

Setiap perubahan harus memiliki alasan.

Contoh

```text
Tinybit dipindahkan agar siswa memahami logika robot sebelum masuk IoT.

ESP32 MQTT dipindahkan karena membutuhkan dasar jaringan yang lebih matang.
```

---

# Project Library (Menu Baru)

Menu ini menjadi repository seluruh proyek pembelajaran yang pernah dibuat.

Berbeda dengan Source Code Repository.

Satu project dapat memiliki:

* Modul
* Source Code
* Video
* Dokumentasi
* RPPM
* Hardware
* LMS terkait

---

## Contoh Struktur

```text
Project Library

├── Tinybit Bluetooth Controller

├── Tinybit Hand Gesture

├── Tinybit Line Follower

├── Smart Trash Bin

├── Smart Watering Plant

├── Smart Parking

├── Robot Soccer

├── Maze Solving

├── Smart Home

└── Smart Greenhouse
```

---

## Informasi Project

Setiap Project memiliki:

* Nama Project
* Kategori
* Tingkat Kesulitan
* Deskripsi
* Tujuan Pembelajaran
* Kompetensi yang Dilatih
* Hardware yang Digunakan
* Software yang Digunakan
* Estimasi Waktu
* Screenshot
* Video Demo
* Source Code
* Modul
* RPPM
* Link Google Drive
* Link Github
* Guru Penyusun
* Tahun Digunakan

---

# Chatbot AI (Menu Baru)

Menu ini menjadi asisten digital bagi guru.

Chatbot menggunakan teknologi **RAG (Retrieval-Augmented Generation)** dengan basis pengetahuan dari seluruh dokumen yang ada di website.

## Sumber Pengetahuan

Chatbot dapat mencari jawaban dari:

* Materi
* RPPM
* Source Code
* Draft Kurikulum
* SOP Penggunaan Robot
* Data Guru
* Data Teknisi
* Project Library

---

## Contoh Pertanyaan

Guru dapat bertanya:

> "Di mana source code Tinybit Bluetooth?"

↓

Chatbot memberikan link menuju Source Code.

---

> "RPPM Smart Parking ada?"

↓

Chatbot membuka halaman RPPM.

---

> "Project apa yang menggunakan ESP32?"

↓

Menampilkan seluruh Project Library yang menggunakan ESP32.

---

> "Materi setelah Tinybit apa?"

↓

Mengambil jawaban dari Roadmap Kurikulum.

---

> "Siapa guru yang mengajar Computer Vision?"

↓

Mengambil dari Data Guru.

---

## Fitur Chatbot

* Pencarian menggunakan bahasa alami (Natural Language Search).
* Menampilkan jawaban beserta tautan ke halaman terkait.
* Mampu memahami hubungan antar materi, project, dan kurikulum.
* Mengambil referensi langsung dari dokumen yang telah diunggah sehingga jawaban tetap konsisten dengan arsip resmi.

---

## Hasil PRD Akhir

Dengan revisi ini, website menjadi **Knowledge Management System** yang fokus dan mudah digunakan. Menu akhirnya adalah:

```text
Dashboard

Materi

LMS

Repository Source Code

Project Library

Draft Kurikulum

Guru

Teknisi

SOP Penggunaan Robot

Inventaris LAB

Chatbot AI

Tentang
```

Struktur ini tidak berlebihan, tetapi sudah mencakup seluruh kebutuhan guru IoT & Robotik IDN: mulai dari perencanaan (Draft Kurikulum), pelaksanaan (Materi, RPPM, LMS), implementasi (Project Library dan Source Code), operasional (Inventaris LAB dan SOP), hingga pencarian pengetahuan melalui Chatbot AI. Ke depannya, struktur ini juga mudah dikembangkan tanpa perlu mengubah arsitektur utama website.
