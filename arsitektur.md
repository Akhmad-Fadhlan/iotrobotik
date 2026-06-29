Kalau targetnya **Google Apps Script sebagai backend**, saya menyarankan **jangan hanya menggunakan 2 file (`Code.gs` dan `Index.html`)**. Karena proyek Anda sudah cukup besar (Materi, Guru, Teknisi, Chatbot, Kurikulum, Project, dll.), akan sulit dipelihara.

Saya biasanya memecah Apps Script berdasarkan **modul**, mirip seperti backend profesional.

## Struktur Backend (Google Apps Script)

```text
📁 backend-appscript
│
├── appsscript.json              // Manifest
│
├── Config.gs                    // Konfigurasi global
├── Router.gs                    // Routing API
├── Auth.gs                      // Login & JWT
├── Middleware.gs                // Security
├── Response.gs                  // Response JSON
├── Utils.gs                     // Helper Function
├── Validator.gs                 // Validasi Request
│
├── Spreadsheet.gs               // Koneksi Spreadsheet
├── Cache.gs                     // CacheService
├── Drive.gs                     // Google Drive Helper
├── Logger.gs                    // Audit Log
│
├── Setup.gs                     // Initialize System
├── Seeder.gs                    // Generate Dummy Data
├── Sync.gs                      // Sinkronisasi Spreadsheet
│
├── Dashboard.gs                 // Dashboard API
│
├── Materials.gs                 // Materi
├── Teachers.gs                  // Guru
├── Technicians.gs               // Teknisi
├── Curriculum.gs                // Draft Kurikulum
├── Projects.gs                  // Project Library
├── SourceCode.gs                // Repository Source Code
├── SOP.gs                       // SOP Robot
├── LMS.gs                       // LMS
│
├── Search.gs                    // Global Search
├── Chatbot.gs                   // AI Chatbot
│
└── Webhook.gs                   // Auto Refresh Cache
```

---

# Penjelasan Setiap File

## Config.gs

Semua konfigurasi.

```javascript
SPREADSHEET_ID

DRIVE_FOLDER_ID

JWT_SECRET

CACHE_TIME

ADMIN_EMAIL

ADMIN_PASSWORD_HASH
```

---

## Router.gs

Semua endpoint masuk ke sini.

Contoh

```text
/api/dashboard

/api/materials

/api/teachers

/api/projects

/api/search

/api/chatbot
```

Router menentukan file mana yang dipanggil.

---

## Auth.gs

Berisi

```
Login

Logout

Generate JWT

Verify JWT

Cookie
```

---

## Middleware.gs

Semua keamanan.

Misalnya

```
Harus Login

Role Admin

Rate Limit

CORS

Header Security
```

---

## Response.gs

Supaya semua response sama.

Contoh

```json
{
    "success": true,
    "message": "",
    "data":[]
}
```

---

## Utils.gs

Helper

Misalnya

```
Generate UUID

Format Date

Slug

Thumbnail

Random String
```

---

## Validator.gs

Validasi data.

Misalnya

```
Email

URL

Drive URL

Spreadsheet ID

Required Field
```

---

# Database Layer

## Spreadsheet.gs

Semua fungsi Spreadsheet.

Misalnya

```
getSheet()

read()

insert()

update()

delete()

find()

paginate()

sort()
```

Seluruh file lain memanggil Spreadsheet.gs.

Jadi tidak ada

```javascript
SpreadsheetApp.openById(...)
```

di file lain.

---

## Cache.gs

Menggunakan

```
CacheService

PropertiesService
```

Misalnya

```
getCache()

setCache()

clearCache()
```

---

## Drive.gs

Semua Google Drive.

Misalnya

```
Create Folder

Upload

Delete

Move

Thumbnail

Permission
```

---

## Logger.gs

Audit Log.

Misalnya

```
Login

Update Guru

Tambah Materi

Generate Dummy

Import Spreadsheet
```

langsung masuk ke Sheet AuditLog.

---

# Setup

## Setup.gs

Pertama kali.

Admin klik

```
Initialize
```

langsung membuat

```
Sheet

Header

Setting

Folder

Permission
```

---

## Seeder.gs

Paling penting.

Berisi

```
Generate Materi

Generate Guru

Generate Teknisi

Generate Kurikulum

Generate SOP

Generate Project

Generate SourceCode

Generate LMS
```

Semuanya otomatis.

---

## Sync.gs

Sinkronisasi.

Misalnya

```
Refresh Cache

Reload Spreadsheet

Refresh Search

Refresh Chatbot
```

---

# Feature Layer

## Dashboard.gs

Menghasilkan

```
Total Materi

Total Guru

Total Teknisi

Total Project

Total Source Code
```

---

## Materials.gs

CRUD Materi.

```
List

Detail

Create

Update

Delete
```

---

## Teachers.gs

CRUD Guru.

Sekaligus upload

```
Foto

TTD
```

---

## Technicians.gs

CRUD Teknisi.

---

## Curriculum.gs

```
Silabus

CP

TP

ATP

Roadmap

Perubahan

Versi
```

---

## Projects.gs

Project Library.

---

## SourceCode.gs

Repository.

---

## SOP.gs

SOP Robot.

---

## LMS.gs

Karena hanya satu URL.

Isinya sederhana.

```
Nama

Deskripsi

URL
```

---

# Search.gs

Global Search.

Cari

```
Materi

Guru

Project

SourceCode

SOP

Kurikulum
```

---

# Chatbot.gs

Kalau nanti memakai OpenAI.

Berisi

```
Create Prompt

Search Context

Call API

Response
```

---

# Webhook.gs

Jika Spreadsheet berubah.

```
Refresh Cache

Refresh Search

Refresh Dashboard
```

---

# Struktur Sheet Spreadsheet

```text
IoT Robotik Database

├── Setting
├── Materi
├── Guru
├── Teknisi
├── Kurikulum
├── Project
├── SourceCode
├── SOP
├── LMS
├── AuditLog
```

---

# Struktur Google Drive

```text
IoT Robotik

├── Materi
│   ├── Kelas 7
│   └── Kelas 8
│
├── RPPM
├── Kurikulum
├── Guru
│   ├── Foto
│   └── TTD
│
├── Teknisi
│   └── Foto
│
├── Project
├── SourceCode
└── SOP
```

## Saran Arsitektur

Karena backend Anda akan menjadi **REST API** untuk website Next.js, saya menyarankan menggunakan pola **3-layer architecture** di setiap modul:

```text
Request
    │
    ▼
Router.gs
    │
    ▼
Materials.gs (Business Logic)
    │
    ▼
Spreadsheet.gs (Data Access Layer)
    │
    ▼
Google Spreadsheet
```

Dengan pola ini:

* **Router** hanya menangani endpoint dan request.
* **Business Logic** berisi aturan aplikasi (validasi, proses data, dll.).
* **Data Access Layer** hanya bertugas membaca/menulis Spreadsheet.

Keuntungannya adalah kode menjadi jauh lebih bersih, mudah diuji, dan jika suatu hari Anda ingin berpindah dari Google Spreadsheet ke database lain, Anda hanya perlu mengganti implementasi di `Spreadsheet.gs` tanpa mengubah logika bisnis pada modul-modul lainnya. Ini adalah pola yang paling saya rekomendasikan untuk proyek sebesar **IDN IoT & Robotics Knowledge Hub**.
