<?php

declare(strict_types=1);

namespace Controllers;

use App\Core\Database;
use App\Core\Response;

class MicrobitController
{
    private array $materiList = [];
    private Database $db;

    public function __construct()
    {
        // Jalankan session jika belum dimulai (untuk fallback)
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $this->db = Database::getInstance();

        // 13 chapters of Microbit E-Learning divided into categories
        $this->materiList = [
            // Category: Pengenalan Hardware
            [
                'id' => 'hw-intro',
                'kategori' => 'Pengenalan Hardware',
                'judul' => 'Pengenalan Board micro:bit',
                'deskripsi' => '<p>micro:bit adalah komputer saku mini yang dirancang untuk belajar coding dan elektronik. Papan ini memiliki berbagai sensor dan komponen bawaan.</p>
<p><strong>Eksplorasi Interaktif:</strong></p>
<p>Arahkan kursor atau klik pada bagian-bagian papan micro:bit di panel sebelah kanan untuk melihat informasi detail tentang fungsinya secara interaktif!</p>',
                'contoh_kode' => '// Arahkan kursor / klik pada board di sebelah kanan',
                'kode_blok' => ''
            ],
            // Category: Pemrograman Blok
            [
                'id' => 'block-logic',
                'kategori' => 'Pemrograman Blok',
                'judul' => 'Logika & Percabangan (If-Else)',
                'deskripsi' => '<p>Logika percabangan <code>if-else</code> digunakan untuk membuat keputusan dalam program. Misalnya, JIKA suhu lebih dari 30 derajat, tampilkan ikon sedih, JIKA TIDAK, tampilkan ikon senang.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Tarik blok event <code>selamanya</code> dari kategori <strong>Basic</strong>.</li>
  <li>Buka kategori <strong>Logic</strong> (warna oranye), ambil blok <code>jika [true] maka</code> dan masukkan ke dalam blok <code>selamanya</code>. Klik ikon gir pada blok <code>jika</code> untuk menambah cabang <code>selain itu (else)</code>.</li>
  <li>Buka kategori <strong>Logic</strong> lagi, ambil blok perbandingan <code>[0] = [0]</code> dan pasang di slot <code>[true]</code>. Ubah tanda <code>=</code> menjadi <code>&gt;</code>.</li>
  <li>Masukkan blok sensor <code>suhu (°C)</code> dari kategori <strong>Input</strong> ke slot kiri perbandingan, dan isi slot kanan dengan angka <code>30</code>.</li>
  <li>Tarik blok <code>tampilkan ikon [Sad]</code> ke dalam bagian <code>maka</code>, dan <code>tampilkan ikon [Smile]</code> ke dalam bagian <code>selain itu</code>.</li>
</ol>',
                'contoh_kode' => 'await input.runForever(async () => {
    if (input.temperature() > 30) {
        await basic.showIcon("Sad");
    } else {
        await basic.showIcon("Smile");
    }
});',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_forever" x="80" y="80"><statement name="HANDLER"><block type="controls_if"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare"><field name="OP">GT</field><value name="A"><block type="input_temperature"></block></value><value name="B"><block type="math_number"><field name="NUM">30</field></block></value></block></value><statement name="DO0"><block type="basic_show_icon"><field name="ICON">Sad</field></block></statement><statement name="ELSE"><block type="basic_show_icon"><field name="ICON">Smile</field></block></statement></block></statement></block></xml>'
            ],
            [
                'id' => 'block-loops',
                'kategori' => 'Pemrograman Blok',
                'judul' => 'Perulangan (Loops)',
                'deskripsi' => '<p>Perulangan digunakan untuk mengeksekusi instruksi yang sama berulang kali secara efisien. Blok <code>ulangi [4] kali</code> akan menjalankan blok di dalamnya sebanyak 4 kali sebelum lanjut ke baris berikutnya.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Ambil blok kontainer event <code>saat mulai</code> dari kategori <strong>Basic</strong>.</li>
  <li>Buka kategori <strong>Loops</strong> (warna merah), ambil blok <code>ulangi [4] kali</code> dan letakkan di dalam blok <code>saat mulai</code>.</li>
  <li>Buka kategori <strong>Basic</strong>, ambil blok <code>tampilkan string [Hello!]</code> dan masukkan ke dalam perulangan. Ubah teksnya menjadi <code>"Go!"</code>.</li>
  <li>Tambahkan blok <code>jeda (ms) [500]</code> setelah menampilkan teks agar ada jeda waktu antar perulangan.</li>
</ol>',
                'contoh_kode' => '// Perulangan 4 kali saat mulai
for (let i = 0; i < 4; i++) {
    await basic.showString("Go!");
    await basic.pause(500);
}',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_on_start" x="80" y="80"><statement name="HANDLER"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">4</field></block></value><statement name="DO"><block type="basic_show_string"><value name="TEXT"><block type="text"><field name="TEXT">Go!</field></block></value></block></statement></block></statement></block></xml>'
            ],
            [
                'id' => 'block-vars',
                'kategori' => 'Pemrograman Blok',
                'judul' => 'Variabel & Counter (Hitungan)',
                'deskripsi' => '<p>Variabel digunakan untuk menyimpan informasi atau nilai di memori komputer yang bisa berubah-ubah, misalnya skor permainan atau jumlah langkah kaki.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka kategori <strong>Variables</strong> (warna merah tua), klik <strong>Buat Variabel...</strong> dan beri nama <code>"skor"</code>.</li>
  <li>Tarik blok event <code>saat mulai</code> dari <strong>Basic</strong>, lalu masukkan blok <code>atur [skor] ke [0]</code> dari kategori <strong>Variables</strong> untuk inisialisasi skor.</li>
  <li>Tarik blok event <code>ketika tombol [A] ditekan</code> dari <strong>Input</strong>.</li>
  <li>Di dalam event tombol A, masukkan blok <code>ubah [skor] sebesar [1]</code> dari kategori <strong>Variables</strong> untuk menambah skor setiap kali tombol ditekan.</li>
  <li>Tambahkan blok <code>tampilkan angka</code> dari <strong>Basic</strong> dan masukkan variabel <code>[skor]</code> ke dalamnya agar angkanya muncul di LED.</li>
</ol>',
                'contoh_kode' => 'let skor = 0;
input.onButtonPressed(Button.A, async () => {
    skor += 1;
    await basic.showNumber(skor);
});',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_on_start" x="80" y="80"><statement name="HANDLER"><block type="variables_set"><field name="VAR">skor</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value></block></statement></block><block type="input_on_button_pressed" x="80" y="220"><field name="BUTTON">A</field><statement name="HANDLER"><block type="variables_change"><field name="VAR">skor</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block><next><block type="basic_show_number"><value name="NUMBER"><block type="variables_get"><field name="VAR">skor</field></block></value></block></next></statement></block></xml>'
            ],
            [
                'id' => 'block-light-logic',
                'kategori' => 'Pemrograman Blok',
                'judul' => 'Smart Lamp (Sensor Cahaya)',
                'deskripsi' => '<p>micro:bit dapat mendeteksi tingkat cahaya ambient di sekelilingnya menggunakan layar LED. Nilainya berkisar antara 0 (sangat gelap) hingga 255 (sangat terang). Kita bisa membuat program "Smart Lamp" yang menyala otomatis saat gelap.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Tarik blok <code>selamanya</code> dari kategori <strong>Basic</strong>.</li>
  <li>Masukkan blok <code>jika [true] maka ... selain itu</code> dari kategori <strong>Logic</strong>.</li>
  <li>Gunakan blok perbandingan <code>[0] &lt; [0]</code> dari <strong>Logic</strong>, masukkan sensor <code>tingkat cahaya</code> dari <strong>Input</strong> ke sisi kiri dan angka <code>100</code> ke sisi kanan.</li>
  <li>Di dalam bagian <code>maka</code> (kondisi gelap), masukkan blok <code>tampilkan ikon [Sun]</code> untuk menyimulasikan lampu menyala.</li>
  <li>Di dalam bagian <code>selain itu</code> (kondisi terang), gunakan blok <code>bersihkan layar</code> dari <strong>Basic</strong> untuk mematikan lampu.</li>
</ol>',
                'contoh_kode' => 'await input.runForever(async () => {
    if (input.lightLevel() < 100) {
        await basic.showIcon("Sun");
    } else {
        await basic.clearScreen();
    }
});',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_forever" x="80" y="80"><statement name="HANDLER"><block type="controls_if"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare"><field name="OP">LT</field><value name="A"><block type="input_light_level"></block></value><value name="B"><block type="math_number"><field name="NUM">100</field></block></value></block></value><statement name="DO0"><block type="basic_show_icon"><field name="ICON">Sun</field></block></statement><statement name="ELSE"><block type="basic_clear_screen"></block></statement></block></statement></block></xml>'
            ],
            [
                'id' => 'block-functions',
                'kategori' => 'Pemrograman Blok',
                'judul' => 'Fungsi & Animasi Kustom',
                'deskripsi' => '<p>Fungsi (atau Prosedur) digunakan untuk membungkus sekumpulan blok program agar dapat dipanggil berkali-kali dari bagian kode yang berbeda tanpa perlu menduplikasinya.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka kategori <strong>Functions</strong> (warna ungu), klik <strong>Buat Fungsi...</strong> dan beri nama <code>"animasi"</code>.</li>
  <li>Di dalam kontainer fungsi <code>fungsi [animasi]</code>, susun blok animasi: <code>tampilkan ikon [Heart]</code> diikuti oleh <code>jeda (ms) [200]</code>, lalu <code>tampilkan ikon [SmallHeart]</code>, dan <code>jeda (ms) [200]</code>.</li>
  <li>Tarik blok event <code>ketika tombol [A] ditekan</code> dari kategori <strong>Input</strong>.</li>
  <li>Buka kategori <strong>Functions</strong> lagi, tarik blok perintah <code>panggil fungsi [animasi]</code> dan letakkan di dalam event tombol A tersebut.</li>
</ol>',
                'contoh_kode' => 'async function animasi() {
    await basic.showIcon("Heart");
    await basic.pause(200);
    await basic.showIcon("SmallHeart");
    await basic.pause(200);
}
input.onButtonPressed(Button.A, async () => {
    await animasi();
});',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="procedures_defnoreturn" x="80" y="80"><field name="NAME">animasi</field><statement name="STACK"><block type="basic_show_icon"><field name="ICON">Heart</field><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">200</field></block></value><next><block type="basic_show_icon"><field name="ICON">SmallHeart</field><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">200</field></block></value></block></next></block></next></block></next></block></statement></block><block type="input_on_button_pressed" x="80" y="280"><field name="BUTTON">A</field><statement name="HANDLER"><block type="procedures_callnoreturn"><mutation name="animasi"></mutation></block></statement></block></xml>'
            ],
            // Category: Simple Project
            [
                'id' => 'b8a5b28d-19df-4c3e-a89c-851f50a8b981',
                'kategori' => 'Simple Project',
                'judul' => 'LED Display',
                'deskripsi' => '<p>Fungsi <code>basic.showString()</code> menampilkan teks berjalan di LED 5x5. Teks akan muncul satu karakter per karakter dari kiri ke kanan.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka menu laci kategori <strong>Basic</strong> (warna hijau toska).</li>
  <li>Tarik blok <code>tampilkan string [Hello!]</code> dan letakkan di area kerja.</li>
  <li>Ketik teks <code>"Hello World!"</code> di dalam slot teks berwarna putih untuk mengubah pesannya.</li>
</ol>',
                'contoh_kode' => 'basic.showString("Hello World!")',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_show_string" x="80" y="80"><value name="TEXT"><block type="text"><field name="TEXT">Hello!</field></block></value></block></xml>'
            ],
            [
                'id' => 'e3d23192-3023-455b-b9d9-482df79a4052',
                'kategori' => 'Simple Project',
                'judul' => 'Tombol A & B',
                'deskripsi' => '<p>micro:bit memiliki dua tombol input fisik di bagian depan (Tombol A dan Tombol B). Kita bisa mendeteksi ketika tombol ditekan menggunakan blok <code>input.onButtonPressed()</code>.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka kategori <strong>Input</strong> (warna hijau mint).</li>
  <li>Tarik blok event kontainer <code>ketika tombol [A] ditekan</code> ke area kerja.</li>
  <li>Buka kategori <strong>Basic</strong>, ambil blok <code>tampilkan string [Hello!]</code>, lalu masukkan ke dalam blok event tombol tadi.</li>
  <li>Ubah isi teks <code>"Hello!"</code> menjadi <code>"A"</code>.</li>
</ol>',
                'contoh_kode' => 'input.onButtonPressed(Button.A, () => { basic.showString("A"); })',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="input_on_button_pressed" x="80" y="80"><field name="BUTTON">A</field><statement name="HANDLER"><block type="basic_show_string"><value name="TEXT"><block type="text"><field name="TEXT">A</field></block></value></block></statement></block></xml>'
            ],
            [
                'id' => 'a3b1a8d5-1823-481b-a25e-b81b29a1b191',
                'kategori' => 'Simple Project',
                'judul' => 'Sensor Suhu',
                'deskripsi' => '<p>micro:bit memiliki sensor suhu internal di dalam prosesornya. Kita dapat membaca suhu ruangan dalam derajat Celsius menggunakan blok <code>input.temperature()</code>.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka kategori <strong>Basic</strong>, tarik blok <code>tampilkan angka [0]</code> ke area kerja.</li>
  <li>Buka kategori <strong>Input</strong>, cari dan tarik blok bulat/oval <code>suhu (°C)</code>.</li>
  <li>Masukkan blok <code>suhu (°C)</code> ke dalam slot angka <code>[0]</code> pada blok <code>tampilkan angka</code>.</li>
</ol>',
                'contoh_kode' => 'basic.showNumber(input.temperature())',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_show_number" x="80" y="80"><value name="NUMBER"><block type="input_temperature"></block></value></block></xml>'
            ],
            [
                'id' => 'f190e29b-810a-4281-91a0-b81d8213b29c',
                'kategori' => 'Simple Project',
                'judul' => 'Kompas',
                'deskripsi' => '<p>micro:bit memiliki sensor kompas (magnetometer) bawaan untuk mengukur arah hadap dalam derajat (0-359). Utara adalah 0, Timur adalah 90, Selatan adalah 180, dan Barat adalah 270.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka kategori <strong>Basic</strong>, tarik blok <code>tampilkan angka [0]</code> ke area kerja.</li>
  <li>Buka kategori <strong>Input</strong>, cari dan tarik blok bulat/oval <code>arah kompas (°)</code>.</li>
  <li>Masukkan blok <code>arah kompas (°)</code> ke dalam slot angka <code>[0]</code> pada blok <code>tampilkan angka</code>.</li>
</ol>',
                'contoh_kode' => 'basic.showNumber(input.compassHeading())',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_show_number" x="80" y="80"><value name="NUMBER"><block type="input_compass_heading"></block></value></block></xml>'
            ],
            [
                'id' => 'c201d198-3829-4d22-b71a-281b29a391a2',
                'kategori' => 'Simple Project',
                'judul' => 'Radio & Bluetooth',
                'deskripsi' => '<p>micro:bit dapat mengirimkan pesan radio ke micro:bit terdekat menggunakan fitur nirkabel Radio. Kita dapat mengirim angka atau teks secara nirkabel.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka kategori <strong>Radio</strong> (warna biru langit).</li>
  <li>Tarik blok <code>kirim angka radio [0]</code> ke area kerja.</li>
  <li>Ganti angka <code>0</code> menjadi <code>7</code> di dalam slot angka.</li>
</ol>',
                'contoh_kode' => 'radio.sendNumber(7)',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="radio_send_number" x="80" y="80"><value name="NUM"><block type="math_number"><field name="NUM">7</field></block></value></block></xml>'
            ],
            [
                'id' => 'd92a10b9-182d-4299-a9a3-832c382b9e28',
                'kategori' => 'Simple Project',
                'judul' => 'Pin GPIO',
                'deskripsi' => '<p>Papan micro:bit memiliki pin GPIO (General Purpose Input Output) di bagian bawah. Tiga pin besar berlabel 0, 1, dan 2 dapat digunakan untuk membaca input analog/digital atau menulis output.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka kategori <strong>Pins</strong> (warna biru tua).</li>
  <li>Tarik blok <code>tulis pin digital [P0] ke [1]</code> ke area kerja.</li>
  <li>Pastikan pin yang dipilih adalah <code>P0</code> dan nilainya diatur ke <code>1</code>.</li>
</ol>',
                'contoh_kode' => 'pins.digitalWritePin(DigitalPin.P0, 1)',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="pins_digital_write" x="80" y="80"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block></xml>'
            ],
            [
                'id' => 'e819b910-bc2d-42aa-b82b-8a8b29c7162b',
                'kategori' => 'Simple Project',
                'judul' => 'Accelerometer',
                'deskripsi' => '<p>Sensor akselerometer mengukur gerakan papan micro:bit. Kita dapat mendeteksi guncangan (shake) menggunakan blok <code>input.onGesture(Gesture.Shake)</code>.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka kategori <strong>Input</strong>, cari dan tarik blok event kontainer <code>ketika digoyang (shake)</code> ke area kerja.</li>
  <li>Buka kategori <strong>Basic</strong>, tarik blok <code>tampilkan string [Hello!]</code> dan masukkan ke dalam blok event goyang tadi.</li>
  <li>Ubah teks <code>"Hello!"</code> menjadi tanda seru <code>"!"</code>.</li>
</ol>',
                'contoh_kode' => 'input.onGesture(Gesture.Shake, () => { basic.showString("!"); })',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="input_on_gesture" x="80" y="80"><field name="GESTURE">shake</field><statement name="HANDLER"><block type="basic_show_string"><value name="TEXT"><block type="text"><field name="TEXT">!</field></block></value></block></statement></block></xml>'
            ],
            [
                'id' => '7211b819-21b9-4aab-8b9a-f82a937a6b28',
                'kategori' => 'Simple Project',
                'judul' => 'Musik & Sound',
                'deskripsi' => '<p>micro:bit dapat mengeluarkan suara atau nada musik melalui pin 0 (dihubungkan ke buzzer/speaker eksternal) atau speaker internal bawaan.</p>
<p><strong>Langkah Penyusunan Blok (Drag-and-Drop):</strong></p>
<ol>
  <li>Buka kategori <strong>Musik</strong> (warna merah muda/pink).</li>
  <li>Tarik blok <code>bunyikan nada [440] selama (ms) [500]</code> ke area kerja.</li>
  <li>Blok ini akan mengalirkan output nada frekuensi <code>440</code> Hz (nada A) selama <code>500</code> milidetik.</li>
</ol>',
                'contoh_kode' => 'music.playTone(440, 500)',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="music_play_tone" x="80" y="80"><value name="NOTE"><block type="math_number"><field name="NUM">440</field></block></value><value name="DURATION"><block type="math_number"><field name="NUM">500</field></block></value></block></xml>'
            ],
            // Category: Pemrograman Python
            [
                'id' => 'py-led',
                'kategori' => 'Pemrograman Python',
                'judul' => 'Python: LED Display',
                'deskripsi' => '<p>Dalam pemrograman MicroPython untuk micro:bit, kita dapat menggunakan pustaka <code>microbit</code>. Fungsi <code>display.scroll()</code> digunakan untuk menampilkan teks berjalan, dan <code>display.show()</code> untuk menampilkan gambar/ikon bawaan.</p>
<p><strong>Tantangan Mandiri:</strong></p>
<p>Ubah pesan teks di dalam <code>display.scroll()</code> pada editor kode di sebelah kanan menjadi nama Anda sendiri, lalu klik <strong>Play</strong> untuk melihat simulator memproses script Python Anda!</p>',
                'contoh_kode' => 'from microbit import *

while True:
    display.scroll("Hello Python!")
    display.show(Image.HEART)
    sleep(1000)',
                'kode_blok' => ''
            ],
            [
                'id' => 'py-button-sensor',
                'kategori' => 'Pemrograman Python',
                'judul' => 'Python: Tombol & Sensor',
                'deskripsi' => '<p>Kita dapat membaca input sensor dan tombol menggunakan Python. Misalnya, memeriksa tombol A dengan <code>button_a.is_pressed()</code> dan membaca nilai suhu ruangan dengan <code>temperature()</code>.</p>
<p><strong>Tantangan Mandiri:</strong></p>
<p>Jalankan program Python di sebelah kanan, lalu klik tombol **A** virtual pada board micro:bit di simulator, atau geser slider **Sensor Suhu** untuk melihat perubahan output LED secara dinamis!</p>',
                'contoh_kode' => 'from microbit import *

while True:
    if button_a.is_pressed():
        display.show("A")
        sleep(500)
    elif button_b.is_pressed():
        display.show("B")
        sleep(500)
    else:
        display.show(temperature())
        sleep(200)',
                'kode_blok' => ''
            ],
            [
                'id' => 'py-vars-math',
                'kategori' => 'Pemrograman Python',
                'judul' => 'Python: Variabel & Matematika',
                'deskripsi' => '<p>Di Python, kita dapat mendeklarasikan variabel hanya dengan mengetik nama variabel diikuti tanda sama dengan (<code>=</code>). Kita dapat memodifikasi dan melakukan kalkulasi matematika pada nilai variabel tersebut.</p>
<p><strong>Tantangan Mandiri:</strong></p>
<p>Ubah nilai inisialisasi <code>skor = 0</code> menjadi angka awal lainnya, atau ubah langkah penjumlahannya menjadi <code>skor = skor + 5</code>. Jalankan kode dan amati hasilnya di simulator saat tombol A virtual diklik!</p>',
                'contoh_kode' => 'from microbit import *

skor = 0

while True:
    if button_a.is_pressed():
        skor = skor + 1
        display.show(skor)
        sleep(500)
    sleep(100)',
                'kode_blok' => ''
            ],
            [
                'id' => 'py-music',
                'kategori' => 'Pemrograman Python',
                'judul' => 'Python: Musik & Nada Melodi',
                'deskripsi' => '<p>Menggunakan modul <code>music</code> pada Python, kita dapat membunyikan buzzer eksternal/internal dengan nada frekuensi tertentu menggunakan perintah <code>music.play_tone(frekuensi, durasi)</code>.</p>
<p><strong>Tantangan Mandiri:</strong></p>
<p>Ganti frekuensi nada <code>440</code> menjadi <code>880</code> (nada lebih tinggi) atau mainkan durasi yang lebih lama. Tekan **Play** dan pastikan audio/speaker komputer Anda menyala!</p>',
                'contoh_kode' => 'from microbit import *
import music

while True:
    if button_a.is_pressed():
        music.play_tone(440, 500)
    sleep(100)',
                'kode_blok' => ''
            ],
            [
                'id' => 'py-radio',
                'kategori' => 'Pemrograman Python',
                'judul' => 'Python: Komunikasi Radio',
                'deskripsi' => '<p>Modul <code>radio</code> memungkinkan komunikasi data antar papan micro:bit terdekat. Kita perlu mengaktifkan modul radio terlebih dahulu dengan <code>radio.on()</code> sebelum mengirim pesan menggunakan <code>radio.send()</code>.</p>
<p><strong>Tantangan Mandiri:</strong></p>
<p>Ganti pesan teks radio <code>"PING"</code> dengan pesan rahasia pilihan Anda. Jalankan kode, tekan tombol A virtual, dan perhatikan log notifikasi transmisi radio di bagian bawah simulator!</p>',
                'contoh_kode' => 'from microbit import *
import radio

radio.on()

while True:
    if button_a.is_pressed():
        radio.send("PING")
        display.show(Image.YES)
        sleep(1000)
        display.clear()
    sleep(100)',
                'kode_blok' => ''
            ],
            [
                'id' => 'py-lists',
                'kategori' => 'Pemrograman Python',
                'judul' => 'Python: List & Iterasi (Animasi)',
                'deskripsi' => '<p>List pada Python digunakan untuk menyimpan banyak data dalam satu variabel. Kita dapat menggunakan loop <code>for</code> untuk mengiterasi (mengakses satu per satu) elemen di dalam list tersebut.</p>
<p><strong>Tantangan Mandiri:</strong></p>
<p>Tambahkan ikon gambar baru pada list <code>animasi</code> (seperti <code>Image.YES</code> atau <code>Image.NO</code>), jalankan program, dan perhatikan tampilan animasi berjalan berurutan di layar simulator!</p>',
                'contoh_kode' => 'from microbit import *

# Membuat list berisi gambar ikon
animasi = [Image.HEART, Image.HAPPY, Image.SAD]

# Menambahkan ikon baru ke dalam list
animasi.append(Image.CONFUSED)

while True:
    if button_a.is_pressed():
        # Looping untuk setiap gambar di list
        for gbr in animasi:
            display.show(gbr)
            sleep(800)
        display.clear()
    sleep(100)',
                'kode_blok' => ''
            ],
            [
                'id' => 'py-strings',
                'kategori' => 'Pemrograman Python',
                'judul' => 'Python: Metode Manipulasi String',
                'deskripsi' => '<p>String pada Python merupakan barisan karakter. Kita dapat menggunakan metode bawaan seperti <code>.upper()</code> (mengubah huruf kapital), <code>.lower()</code> (huruf kecil), dan fungsi <code>len()</code> untuk mendapatkan panjang teks.</p>
<p><strong>Tantangan Mandiri:</strong></p>
<p>Ubah teks awal pada variabel <code>nama</code>, klik **Play**, dan amati bagaimana simulator menampilkan teks yang diubah menjadi huruf kapital penuh diikuti dengan panjang karakter teks tersebut!</p>',
                'contoh_kode' => 'from microbit import *

nama = "microbit"

while True:
    if button_a.is_pressed():
        # Mengubah teks menjadi huruf kapital
        teks_besar = nama.upper()
        display.scroll(teks_besar)
        
        # Mendapatkan panjang teks
        panjang = len(nama)
        display.scroll(panjang)
        sleep(500)
    sleep(100)',
                'kode_blok' => ''
            ],
            [
                'id' => 'py-functions',
                'kategori' => 'Pemrograman Python',
                'judul' => 'Python: Membuat Fungsi Kustom (def)',
                'deskripsi' => '<p>Kita dapat membungkus sekumpulan perintah Python ke dalam sebuah fungsi kustom menggunakan kata kunci <code>def nama_fungsi():</code>. Fungsi ini dapat dipanggil berkali-kali.</p>
<p><strong>Tantangan Mandiri:</strong></p>
<p>Jalankan kode, klik tombol A virtual untuk memanggil fungsi <code>kedip_led()</code> yang berkedip sebanyak 3 kali, atau ganti parameter perulangan di dalamnya!</p>',
                'contoh_kode' => 'from microbit import *

# Mendefinisikan fungsi kedip
def kedip_led():
    for i in range(3):
        display.show(Image.HEART)
        sleep(300)
        display.clear()
        sleep(200)

while True:
    if button_a.is_pressed():
        kedip_led()
    sleep(100)',
                'kode_blok' => ''
            ],

            // ═══════════════════════════════════════════════════════════
            // KATEGORI: Proyek Smart Trashbin — Bab 1: Fundamental Microbit
            // ═══════════════════════════════════════════════════════════
            [
                'id' => 'st-penjelasan-microbit',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Penjelasan Micro:bit',
                'deskripsi' => '<p>BBC Micro:bit adalah komputer mini seukuran kartu nama yang dibuat khusus untuk mengajarkan coding dan elektronika kepada pelajar.</p>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
<strong>💡 Apa itu BBC Micro:bit?</strong><br>BBC Micro:bit adalah microcontroller edukasi seukuran kartu nama, buatan BBC Inggris. Meski kecil, ia punya LED matrix, akselerometer, kompas, Bluetooth, dan banyak sensor bawaan — sempurna untuk belajar coding dan IoT.
</div>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Mengenal BBC Micro:bit dan fitur-fiturnya</li>
  <li>Membedakan Micro:bit V1 dan V2</li>
  <li>Memahami cara memprogram Micro:bit via Makecode</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Fitur Utama Micro:bit V2</h3>
<ul>
  <li><strong>Display:</strong> 25 LED Matrix (5×5) — Tampilkan teks, angka, ikon, atau animasi.</li>
  <li><strong>Input:</strong> 2 Tombol A &amp; B — Tombol fisik untuk interaksi dan kontrol program.</li>
  <li><strong>Sensor:</strong> Akselerometer &amp; Kompas — Deteksi gerakan, goyangan, dan arah mata angin.</li>
  <li><strong>Wireless:</strong> Bluetooth 5.0 — Komunikasi nirkabel dengan HP dan perangkat lain.</li>
  <li><strong>Audio:</strong> Mikrofon &amp; Speaker (V2) — Rekam suara dan mainkan nada langsung dari board.</li>
  <li><strong>I/O:</strong> 25 Pin Konektor — Hubungkan sensor, servo, LED, dan komponen lainnya.</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Perbandingan Micro:bit V1 vs V2</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);text-align:left;">Spesifikasi</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);text-align:left;">V1</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);text-align:left;">V2</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Prosesor</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">ARM Cortex-M0 32-bit</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">ARM Cortex-M4F 32-bit</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">RAM</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">16 KB</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">512 KB</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Flash</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">256 KB</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">2 MB</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Bluetooth</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">4.0</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">5.0</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Speaker</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">❌</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">✅</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Mikrofon</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">❌</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">✅</td></tr>
</tbody>
</table>
<h3 style="color:#2AC1BC;margin-top:20px;">Cara Memprogram Micro:bit</h3>
<ol>
  <li>Buka browser → <code>https://makecode.microbit.org</code></li>
  <li>Klik "New Project" dan beri nama project-mu</li>
  <li>Drag &amp; drop blok kode dari panel kiri</li>
  <li>Klik tombol Download untuk menghasilkan file <code>.hex</code></li>
  <li>Colokkan Micro:bit via USB → salin file <code>.hex</code> ke drive MICROBIT</li>
  <li>Tunggu LED kuning berkedip → program selesai terinstal!</li>
</ol>',
                'contoh_kode' => '// Micro:bit V2 — Program Pertama
// Upload ke board melalui https://makecode.microbit.org

basic.showString("Hello!")
basic.pause(1000)
basic.showIcon(IconNames.Heart)',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_on_start" x="80" y="80"><statement name="HANDLER"><block type="basic_show_string"><value name="TEXT"><block type="text"><field name="TEXT">Hello!</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">1000</field></block></value><next><block type="basic_show_icon"><field name="ICON">Heart</field></block></next></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-pengenalan-sensor',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Pengenalan Sensor',
                'deskripsi' => '<p>Sensor adalah "panca indera" dari sebuah sistem elektronik — mereka mendeteksi kondisi nyata di dunia dan mengubahnya menjadi sinyal yang bisa dibaca microcontroller.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami fungsi dan jenis sensor</li>
  <li>Membedakan sensor analog dan digital</li>
  <li>Mengetahui sensor yang digunakan dalam proyek Smart Trashbin</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Sensor yang Digunakan</h3>
<ul>
  <li>🔊 <strong>Sensor Ultrasonik (HC-SR04):</strong> Mengukur jarak dengan gelombang suara. Jangkauan 2–400 cm.</li>
  <li>💡 <strong>Sensor Infrared (IR):</strong> Mendeteksi objek atau garis hitam/putih menggunakan cahaya IR.</li>
  <li>🌱 <strong>Soil Moisture:</strong> Mengukur kadar air dalam tanah. Output analog 0–1023.</li>
  <li>🌡️ <strong>DHT11/22:</strong> Mengukur suhu dan kelembaban udara secara bersamaan.</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Sensor Analog vs Digital</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Aspek</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Sensor Digital</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Sensor Analog</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Output</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">0 atau 1 (HIGH/LOW)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Nilai kontinu (0–1023)</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Contoh</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Tombol, IR sensor</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Sensor cahaya, soil moisture</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Ketelitian</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Rendah (2 state)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Tinggi (banyak nilai)</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Pin Micro:bit</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Pin digital P0–P16</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Pin analog P0, P1, P2</td></tr>
</tbody>
</table>
<h3 style="color:#2AC1BC;margin-top:20px;">Cara Kerja Sensor Ultrasonik HC-SR04</h3>
<ol>
  <li>Micro:bit kirim sinyal HIGH 10µs ke pin TRIG</li>
  <li>Sensor pancarkan 8 pulsa ultrasonik frekuensi 40 kHz</li>
  <li>Gelombang suara merambat di udara (~343 m/s)</li>
  <li>Gelombang memantul dari objek di depannya</li>
  <li>Pin ECHO menjadi HIGH selama waktu tempuh bolak-balik</li>
  <li>Micro:bit hitung jarak: <code>Jarak (cm) = Waktu Echo (µs) ÷ 58</code></li>
</ol>
<div style="background:rgba(255,191,96,0.08);border-left:3px solid #ffbf60;border-radius:4px;padding:14px 16px;margin:16px 0;">
⚠️ <strong>Perhatian!</strong> HC-SR04 bekerja pada 5V, sedangkan pin Micro:bit maksimal 3.3V! Wajib pasang voltage divider (resistor 1kΩ &amp; 2kΩ) di pin ECHO agar Micro:bit tidak rusak.
</div>',
                'contoh_kode' => '// Membaca Sensor Ultrasonik HC-SR04
// Menggunakan ekstensi Sonar dari Makecode

basic.forever(function () {
    let jarak = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)
    basic.showNumber(jarak)
    basic.pause(500)
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_forever" x="80" y="80"><statement name="HANDLER"><block type="variables_set"><field name="VAR">jarak</field><value name="VALUE"><block type="sonar_ping"><field name="TRIG">P1</field><field name="ECHO">P2</field></block></value><next><block type="basic_show_number"><value name="NUMBER"><block type="variables_get"><field name="VAR">jarak</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">500</field></block></value></block></next></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-input-output',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Input & Output',
                'deskripsi' => '<p>Semua sistem elektronik bekerja dengan pola sederhana: <strong>Input → Proses → Output</strong>. Memahami konsep ini adalah kunci untuk merancang proyek apapun.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami model IPO (Input–Proses–Output)</li>
  <li>Mengenal pin I/O pada Micro:bit</li>
  <li>Menulis kode dasar untuk membaca input dan menghasilkan output</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Model IPO</h3>
<ul>
  <li>📥 <strong>INPUT:</strong> Sensor membaca kondisi lingkungan: jarak, cahaya, suhu, tekanan tombol.</li>
  <li>⚙️ <strong>PROSES:</strong> Micro:bit menjalankan logika: membandingkan nilai, menghitung, dan mengambil keputusan.</li>
  <li>📤 <strong>OUTPUT:</strong> Aktuator bereaksi: servo bergerak, LED menyala, buzzer berbunyi.</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Pin I/O pada Micro:bit</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Tipe Pin</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Deskripsi</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Contoh Penggunaan</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Digital Output</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Keluarkan HIGH (3.3V) atau LOW (0V)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Menyalakan LED</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Digital Input</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Baca nilai HIGH atau LOW</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Membaca sensor digital, tombol</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Analog Output (PWM)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Sinyal variabel untuk aktuator</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Kontrol servo, kecepatan motor</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Analog Input</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Baca nilai 0–1023</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Sensor cahaya, soil moisture</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">3V &amp; GND</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Sumber tegangan dan ground</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Power untuk semua komponen</td></tr>
</tbody>
</table>',
                'contoh_kode' => '// Kode Dasar I/O di Makecode

// Digital Output — nyalakan LED
pins.digitalWritePin(DigitalPin.P3, 1)  // HIGH = ON
pins.digitalWritePin(DigitalPin.P3, 0)  // LOW = OFF

// Analog Output (PWM) — kontrol servo
pins.servoWritePin(AnalogPin.P0, 90)  // Putar ke 90°

// Analog Input — baca sensor cahaya/soil
let nilaiSensor = pins.analogReadPin(AnalogPin.P0)  // 0–1023

// Tampilkan nilai ke LED matrix
basic.showNumber(nilaiSensor)',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_on_start" x="80" y="80"><statement name="HANDLER"><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="variables_set"><field name="VAR">nilaiSensor</field><value name="VALUE"><block type="pins_analog_read"><field name="PIN">P0</field></block></value><next><block type="basic_show_number"><value name="NUMBER"><block type="variables_get"><field name="VAR">nilaiSensor</field></block></value></block></next></block></next></block></next></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-komponen-trashbin',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Komponen Proyek',
                'deskripsi' => '<p>Sebelum mulai merakit, penting untuk mengenal setiap komponen: fungsinya, cara kerjanya, dan bagaimana mereka bekerja sama membentuk Smart Trashbin.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Mengenali komponen Smart Trashbin beserta fungsinya</li>
  <li>Memahami peran setiap komponen dalam sistem</li>
  <li>Menyiapkan Bill of Materials (BOM) proyek</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Bill of Materials (BOM)</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">No</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Komponen</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Fungsi</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Qty</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">1</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">BBC Micro:bit V2</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Controller/otak utama sistem</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">2</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Sensor Ultrasonik HC-SR04</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Mendeteksi tangan/objek di depan trashbin</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">3</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Servo Motor SG90</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Membuka dan menutup tutup trashbin</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">4</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">LED Hijau</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Indikator: tangan terdeteksi / siap</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">5</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">LED Merah</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Indikator: trashbin penuh</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">6</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Buzzer Pasif</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Notifikasi suara saat buka/penuh</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">7</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Resistor 330Ω</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Pelindung LED dari arus berlebih</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">2</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">8</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Resistor 1kΩ &amp; 2kΩ</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Voltage divider untuk pin ECHO HC-SR04</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">1 each</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">9</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Breadboard</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Papan rangkaian tanpa solder</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">1</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">10</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Kabel Jumper</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Menghubungkan semua komponen</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">15+</td></tr>
</tbody>
</table>
<h3 style="color:#2AC1BC;margin-top:20px;">Peran Setiap Komponen</h3>
<ul>
  <li>🧠 <strong>Micro:bit (Controller):</strong> Membaca sensor, menjalankan logika program, mengontrol semua output. Diibaratkan sebagai "otak" trashbin.</li>
  <li>👁️ <strong>HC-SR04 (Mata):</strong> Ditempatkan di depan tutup. Saat tangan mendekat (&lt;20 cm), sensor mengirim sinyal ke Micro:bit.</li>
  <li>💪 <strong>Servo SG90 (Tangan):</strong> Berputar 0°→90° untuk membuka tutup, dan kembali ke 0° untuk menutup. Torsi 1.8 kg/cm.</li>
  <li>🚦 <strong>LED + Buzzer (Indikator):</strong> LED hijau = siap digunakan. LED merah + buzzer = trashbin penuh, perlu dikosongkan.</li>
</ul>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
💰 <strong>Estimasi Biaya:</strong> Total komponen diperkirakan sekitar Rp 150.000 – Rp 250.000 tergantung toko dan kualitas komponen.
</div>',
                'contoh_kode' => '// Test komponen — LED + Servo sederhana
// Upload ke Micro:bit, perhatikan LED menyala dan servo bergerak!

input.onButtonPressed(Button.A, function () {
    // Nyalakan LED hijau di pin P3
    pins.digitalWritePin(DigitalPin.P3, 1)
    // Buka servo ke 90 derajat
    pins.servoWritePin(AnalogPin.P0, 90)
    basic.pause(2000)
    // Tutup servo
    pins.servoWritePin(AnalogPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P3, 0)
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="input_on_button_pressed" x="80" y="80"><field name="BUTTON">A</field><statement name="HANDLER"><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">2000</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value></block></next></block></next></block></next></block></next></block></statement></block></xml>'
            ],

            // ─────────────────────────────────────────────────────────
            // Bab 2: Algoritma & Konsep
            // ─────────────────────────────────────────────────────────
            [
                'id' => 'st-flowchart',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Flowchart Sistem',
                'deskripsi' => '<p>Flowchart adalah peta jalan program kita. Sebelum menulis satu baris kode pun, membuat flowchart membantu kita berpikir sistematis dan menghindari bug.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami simbol-simbol standar flowchart</li>
  <li>Membuat flowchart sistem Smart Trashbin</li>
  <li>Menggunakan flowchart sebagai panduan penulisan kode</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Simbol Flowchart Standar</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Simbol</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Nama</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Fungsi</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">⬭ Oval</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Terminal</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Titik Mulai dan Selesai program</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">▭ Persegi</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Proses</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Aksi atau operasi (mis. buka servo)</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">◇ Wajik</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Keputusan</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Kondisi if/else — percabangan</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">▱ Jajaran genjang</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">I/O</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Membaca input atau menampilkan output</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">→ Panah</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Alur</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Arah jalannya program</td></tr>
</tbody>
</table>
<h3 style="color:#2AC1BC;margin-top:20px;">Flowchart Smart Trashbin</h3>
<pre style="background:#040810;border:1px solid rgba(42,193,188,0.2);border-radius:8px;padding:16px;color:#4df9cc;font-size:12px;overflow-x:auto;">           [MULAI]
               ↓
   [Inisialisasi: Servo = 0°, LED mati]
               ↓
      [Baca Sensor Ultrasonik]
               ↓
      ◇ Jarak &lt; 20 cm? ◇
       YA ↙         ↘ TIDAK
          ↓               ↓
 [Nyalakan LED Hijau]  [Matikan LED]
          ↓               ↓
 [Buka Tutup: 90°]    [Servo = 0°]
          ↓               ↑
  [Tunggu 3 detik]        │
          ↓               │
 [Tutup: Servo = 0°] ─────┘
          ↓
    [Kembali ke Baca Sensor]</pre>
<p><strong>Langkah membuat flowchart yang baik:</strong></p>
<ol>
  <li>Mulai dari terminal "MULAI"</li>
  <li>Identifikasi semua kondisi input yang mungkin terjadi</li>
  <li>Gambar proses langkah per langkah secara berurutan</li>
  <li>Tambahkan wajik keputusan di setiap percabangan logika</li>
  <li>Pastikan semua jalur memiliki akhir atau kembali ke loop</li>
  <li>Review: apakah ada skenario yang belum ditangani?</li>
</ol>',
                'contoh_kode' => '// Implementasi Flowchart Smart Trashbin
basic.forever(function () {
    let jarak = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)

    if (jarak > 0 && jarak < 20) {
        // Buka tutup
        pins.servoWritePin(AnalogPin.P0, 90)
        pins.digitalWritePin(DigitalPin.P3, 1)  // LED hijau
        basic.pause(3000)                        // Tunggu 3 detik
        pins.servoWritePin(AnalogPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P3, 0)
    }

    basic.pause(200)
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_forever" x="80" y="80"><statement name="HANDLER"><block type="variables_set"><field name="VAR">jarak</field><value name="VALUE"><block type="sonar_ping"><field name="TRIG">P1</field><field name="ECHO">P2</field></block></value><next><block type="controls_if"><value name="IF0"><block type="logic_operation"><field name="OP">AND</field><value name="A"><block type="logic_compare"><field name="OP">GT</field><value name="A"><block type="variables_get"><field name="VAR">jarak</field></block></value><value name="B"><block type="math_number"><field name="NUM">0</field></block></value></block></value><value name="B"><block type="logic_compare"><field name="OP">LT</field><value name="A"><block type="variables_get"><field name="VAR">jarak</field></block></value><value name="B"><block type="math_number"><field name="NUM">20</field></block></value></block></value></block></value><statement name="DO0"><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">3000</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value></block></next></block></next></block></next></block></next></block></statement><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">200</field></block></value></block></next></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-cara-kerja-sensor',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Cara Kerja Sensor Ultrasonik',
                'deskripsi' => '<p>Memahami cara kerja sensor ultrasonik secara mendalam membantu kita men-debug masalah dan mengoptimalkan performa Smart Trashbin.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Menjelaskan prinsip kerja sonar pada HC-SR04</li>
  <li>Menghitung jarak menggunakan rumus waktu tempuh</li>
  <li>Memahami cara wiring sensor aman ke Micro:bit</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Prinsip Kerja HC-SR04</h3>
<ol>
  <li>Micro:bit kirim sinyal HIGH 10 µs ke pin TRIG sensor</li>
  <li>Sensor memancarkan 8 pulsa ultrasonik pada frekuensi 40 kHz</li>
  <li>Gelombang suara merambat di udara dengan kecepatan ~343 m/s</li>
  <li>Gelombang memantul dari objek (tangan, sampah, dinding)</li>
  <li>Sensor menerima pantulan → pin ECHO menjadi HIGH</li>
  <li>Micro:bit ukur durasi ECHO → hitung jarak dengan rumus</li>
</ol>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
📐 <strong>Rumus Jarak:</strong><br>
<code>Jarak (cm) = Waktu Echo (µs) ÷ 58</code><br>
Contoh: Waktu echo = 1160 µs → Jarak = 1160 ÷ 58 = <strong>20 cm</strong>
</div>
<h3 style="color:#2AC1BC;margin-top:20px;">Wiring Aman HC-SR04 ke Micro:bit</h3>
<pre style="background:#040810;border:1px solid rgba(42,193,188,0.2);border-radius:8px;padding:16px;color:#4df9cc;font-size:12px;">HC-SR04          Micro:bit
  VCC    ──────►  3V
  TRIG   ──────►  P1
  ECHO   ──┐
           ├── 1kΩ ──► P2 (Micro:bit)
           │
          2kΩ
           │
          GND

Voltage divider di ECHO:
V_P2 = 5V × (2kΩ / (1kΩ+2kΩ)) = 3.3V ✅</pre>
<div style="background:rgba(255,191,96,0.08);border-left:3px solid #ffbf60;border-radius:4px;padding:14px 16px;margin:16px 0;">
⚠️ Tanpa voltage divider, tegangan 5V dari ECHO akan merusak pin Micro:bit yang hanya tahan 3.3V. Selalu pasang resistor 1kΩ dan 2kΩ!
</div>
<h3 style="color:#2AC1BC;margin-top:20px;">Tabel Troubleshooting Sensor</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Masalah</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Penyebab</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Solusi</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Nilai selalu 0</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Pin TRIG/ECHO terbalik</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Cek wiring: TRIG→P1, ECHO→P2</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Nilai sangat besar (999+)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Tidak ada objek terdeteksi</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Normal jika tidak ada benda di depan</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Nilai tidak stabil</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Permukaan tidak rata / interferensi</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Ambil rata-rata 5 sampel</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Micro:bit panas / crash</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Tegangan berlebih tanpa divider</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Pasang voltage divider!</td></tr>
</tbody>
</table>',
                'contoh_kode' => '// Baca Sensor dengan Filter Rata-rata (5 Sampel)
// Lebih stabil dibanding membaca sekali saja!

function bacaSensorStabil(): number {
    let total = 0
    let valid = 0

    for (let i = 0; i < 5; i++) {
        let nilai = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)
        if (nilai > 0 && nilai <= 400) {
            total += nilai
            valid++
        }
        basic.pause(20)  // 20ms antar sampel
    }

    if (valid > 0) {
        return Math.round(total / valid)
    }
    return 999  // Error: tidak ada objek
}

basic.forever(function () {
    let jarak = bacaSensorStabil()
    basic.showNumber(jarak)
    basic.pause(500)
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_forever" x="80" y="80"><statement name="HANDLER"><block type="variables_set"><field name="VAR">total</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="variables_set"><field name="VAR">valid</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">5</field></block></value><statement name="DO"><block type="variables_set"><field name="VAR">nilai</field><value name="VALUE"><block type="sonar_ping"><field name="TRIG">P1</field><field name="ECHO">P2</field></block></value><next><block type="controls_if"><value name="IF0"><block type="logic_operation"><field name="OP">AND</field><value name="A"><block type="logic_compare"><field name="OP">GT</field><value name="A"><block type="variables_get"><field name="VAR">nilai</field></block></value><value name="B"><block type="math_number"><field name="NUM">0</field></block></value></block></value><value name="B"><block type="logic_compare"><field name="OP">LTE</field><value name="A"><block type="variables_get"><field name="VAR">nilai</field></block></value><value name="B"><block type="math_number"><field name="NUM">400</field></block></value></block></value></block></value><statement name="DO0"><block type="variables_change"><field name="VAR">total</field><value name="VALUE"><block type="variables_get"><field name="VAR">nilai</field></block></value><next><block type="variables_change"><field name="VAR">valid</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block></next></block></statement><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">20</field></block></value></block></next></block></next></block></statement><next><block type="variables_set"><field name="VAR">jarak</field><value name="VALUE"><block type="math_arithmetic"><field name="OP">DIVIDE</field><value name="A"><block type="variables_get"><field name="VAR">total</field></block></value><value name="B"><block type="variables_get"><field name="VAR">valid</field></block></value></block></value><next><block type="basic_show_number"><value name="NUMBER"><block type="variables_get"><field name="VAR">jarak</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">500</field></block></value></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-logika-buka-tutup',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Logika Buka–Tutup Otomatis',
                'deskripsi' => '<p>Logika buka–tutup otomatis adalah jantung dari Smart Trashbin. Di sini kita menggabungkan pembacaan sensor dengan aksi servo menggunakan percabangan if-else.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami logika boolean dalam pemrograman</li>
  <li>Menulis kondisi buka-tutup yang tepat</li>
  <li>Mengimplementasikan multi-kondisi (termasuk sensor penuh)</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Tabel Kondisi Logika</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Kondisi Sensor</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Aksi Sistem</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Jarak luar &lt; 20 cm (tangan dekat)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Servo buka (90°) + LED hijau ON</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Jarak luar ≥ 20 cm</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Servo tutup (0°) + LED hijau OFF</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Jarak dalam &lt; 5 cm (penuh)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">LED merah + buzzer peringatan</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Jarak dalam ≥ 5 cm</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Normal, tidak ada aksi khusus</td></tr>
</tbody>
</table>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
📚 <strong>Operator Logika:</strong><br>
<code>&lt;</code> lebih kecil | <code>&gt;</code> lebih besar | <code>&lt;=</code> kurang dari/sama | <code>&gt;=</code> lebih dari/sama | <code>==</code> sama | <code>!=</code> tidak sama | <code>&amp;&amp;</code> DAN | <code>||</code> ATAU
</div>',
                'contoh_kode' => '// Logika Lengkap: Buka-Tutup + Sensor Penuh

basic.forever(function () {
    let jarak = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)

    // Kondisi 1: Tangan mendekat
    if (jarak < 20) {
        pins.servoWritePin(AnalogPin.P0, 90)       // buka servo
        pins.digitalWritePin(DigitalPin.P3, 1)     // LED hijau
        basic.pause(3000)                           // tunggu 3 detik
        pins.servoWritePin(AnalogPin.P0, 0)        // tutup servo
        pins.digitalWritePin(DigitalPin.P3, 0)     // matikan LED
    }

    // Buka HANYA jika tangan dekat DAN tempat sampah tidak penuh
    // if (jarakLuar < 20 && jarakDalam > 10) { ... }

    basic.pause(200)
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_forever" x="80" y="80"><statement name="HANDLER"><block type="variables_set"><field name="VAR">jarak</field><value name="VALUE"><block type="sonar_ping"><field name="TRIG">P1</field><field name="ECHO">P2</field></block></value><next><block type="controls_if"><value name="IF0"><block type="logic_compare"><field name="OP">LT</field><value name="A"><block type="variables_get"><field name="VAR">jarak</field></block></value><value name="B"><block type="math_number"><field name="NUM">20</field></block></value></block></value><statement name="DO0"><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">3000</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value></block></next></block></next></block></next></block></next></block></statement><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">200</field></block></value></block></next></block></next></block></statement></block></xml>'
            ],

            // ─────────────────────────────────────────────────────────
            // Bab 3: Pemrograman Basic Makecode
            // ─────────────────────────────────────────────────────────
            [
                'id' => 'st-variable',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Variable dalam Makecode',
                'deskripsi' => '<p>Variabel adalah "kotak penyimpanan" di memori yang menyimpan data sementara. Memahami variabel adalah fondasi dari semua pemrograman.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami konsep dan fungsi variabel</li>
  <li>Membuat dan menggunakan variabel di Makecode</li>
  <li>Menerapkan aturan penamaan variabel yang baik</li>
</ul>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
📦 <strong>Analogi Variabel:</strong> Bayangkan variabel seperti loker sekolah. Setiap loker punya nomor unik (nama variabel) dan bisa diisi barang berbeda-beda (nilai/value) kapanpun kamu mau.
</div>
<h3 style="color:#2AC1BC;margin-top:20px;">Tipe Data Variabel</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Tipe Data</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Contoh Nilai</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Contoh Deklarasi</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Number (angka)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">0, 20, -5, 3.14</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);"><code>let jarak = 0</code></td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">String (teks)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">"Halo", "BUKA"</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);"><code>let pesan = "Siap"</code></td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Boolean (benar/salah)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">true, false</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);"><code>let tutupTerbuka = false</code></td></tr>
</tbody>
</table>
<h3 style="color:#2AC1BC;margin-top:20px;">Aturan Penamaan Variabel</h3>
<ul>
  <li>✅ Gunakan nama deskriptif: <code>jarakSensor</code> bukan <code>x</code> atau <code>a</code></li>
  <li>✅ Mulai dengan huruf kecil: <code>jarakSensor</code> bukan <code>JarakSensor</code></li>
  <li>✅ Gunakan camelCase: <code>statusPintu</code> bukan <code>status_pintu</code></li>
  <li>❌ Tidak boleh ada spasi: <code>jarakSensor</code> bukan <code>jarak sensor</code></li>
  <li>❌ Tidak boleh mulai dengan angka: bukan <code>1sensor</code></li>
</ul>',
                'contoh_kode' => '// Deklarasi variabel untuk Smart Trashbin
let jarak = 0
let tutupTerbuka = false
let hitunganBuka = 0
let pesanStatus = "Siap"

// Tampilkan jumlah berapa kali terbuka
input.onButtonPressed(Button.A, function () {
    jarak = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)
    basic.showNumber(jarak)

    if (jarak < 20) {
        hitunganBuka += 1
        basic.showString("N:" + hitunganBuka)
    }
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="variables_set" x="80" y="80"><field name="VAR">jarak</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value></block><block type="input_on_button_pressed" x="80" y="180"><field name="BUTTON">A</field><statement name="HANDLER"><block type="variables_set"><field name="VAR">jarak</field><value name="VALUE"><block type="math_number"><field name="NUM">20</field></block></value><next><block type="basic_show_number"><value name="NUMBER"><block type="variables_get"><field name="VAR">jarak</field></block></value></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-percabangan',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Percabangan (If-Else)',
                'deskripsi' => '<p>Percabangan memungkinkan program mengambil keputusan yang berbeda berdasarkan kondisi. Tanpa percabangan, program hanya bisa menjalankan instruksi secara lurus.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami struktur if, if-else, dan if-else if</li>
  <li>Menerapkan percabangan pada logika Smart Trashbin</li>
  <li>Menggabungkan beberapa kondisi dengan operator logika</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Bentuk-bentuk Percabangan</h3>
<ul>
  <li><strong>if tunggal:</strong> Jalankan kode hanya jika kondisi benar</li>
  <li><strong>if-else:</strong> Pilih antara dua jalur (benar atau salah)</li>
  <li><strong>if-else if-else:</strong> Pilih dari tiga atau lebih jalur</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Penerapan pada Smart Trashbin</h3>
<p>Sistem menggunakan <strong>3 level kondisi</strong> berdasarkan nilai sensor:</p>
<ul>
  <li>Jarak &lt; 10 cm → "SANGAT DEKAT" → buka lebih cepat</li>
  <li>Jarak &lt; 20 cm → "DEKAT" → buka normal</li>
  <li>Jarak ≥ 20 cm → "JAUH" → tutup/standby</li>
</ul>',
                'contoh_kode' => '// Contoh Percabangan Multi-Level pada Smart Trashbin
basic.forever(function () {
    let jarak = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)

    // Multi kondisi berdasarkan jarak
    if (jarak < 10) {
        basic.showString("!!!")     // Sangat dekat
        pins.servoWritePin(AnalogPin.P0, 90)
        pins.digitalWritePin(DigitalPin.P3, 1)
    } else if (jarak < 20) {
        basic.showString("OK")      // Dekat – buka normal
        pins.servoWritePin(AnalogPin.P0, 60)
    } else {
        basic.showString("-")       // Jauh – tutup
        pins.servoWritePin(AnalogPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P3, 0)
    }

    basic.pause(200)
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_forever" x="80" y="80"><statement name="HANDLER"><block type="controls_if"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare"><field name="OP">LT</field><value name="A"><block type="math_number"><field name="NUM">20</field></block></value><value name="B"><block type="math_number"><field name="NUM">20</field></block></value></block></value><statement name="DO0"><block type="basic_show_string"><value name="TEXT"><block type="text"><field name="TEXT">BUKA</field></block></value></block></statement><statement name="ELSE"><block type="basic_show_string"><value name="TEXT"><block type="text"><field name="TEXT">TUTUP</field></block></value></block></statement></block></statement></block></xml>'
            ],
            [
                'id' => 'st-looping',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Looping (Perulangan)',
                'deskripsi' => '<p>Looping (pengulangan) memungkinkan program menjalankan blok kode berulang kali — dasar dari hampir semua program yang terus berjalan seperti sistem sensor.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami jenis-jenis loop: forever, for, while</li>
  <li>Memilih jenis loop yang tepat untuk setiap situasi</li>
  <li>Membuat animasi dan efek berulang menggunakan loop</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Jenis-jenis Loop</h3>
<ul>
  <li>🔄 <strong>forever:</strong> Berjalan terus-menerus. Cocok untuk membaca sensor dan monitoring berkelanjutan.</li>
  <li>🔢 <strong>for:</strong> Ulangi tepat N kali. Cocok untuk animasi, blink LED, atau tugas yang sudah diketahui jumlahnya.</li>
  <li>⏳ <strong>while:</strong> Terus berjalan selama kondisi terpenuhi. Cocok untuk menunggu suatu kejadian.</li>
</ul>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
💡 <strong>Kapan pakai mana?</strong><br>
<code>forever</code> → tugas terus-menerus (baca sensor) |
<code>for</code> → ulangi N kali yang sudah diketahui |
<code>while</code> → ulangi sampai kondisi terpenuhi
</div>',
                'contoh_kode' => '// Berbagai Jenis Loop

// forever — baca sensor terus-menerus
basic.forever(function () {
    let jarak = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)
    basic.showNumber(jarak)
    basic.pause(200)
})

// for — LED merah berkedip 3x saat penuh
input.onButtonPressed(Button.B, function () {
    for (let i = 0; i < 3; i++) {
        pins.digitalWritePin(DigitalPin.P4, 1)  // LED merah ON
        basic.pause(300)
        pins.digitalWritePin(DigitalPin.P4, 0)  // LED merah OFF
        basic.pause(300)
    }
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_forever" x="80" y="80"><statement name="HANDLER"><block type="basic_show_number"><value name="NUMBER"><block type="math_number"><field name="NUM">42</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">500</field></block></value></block></next></block></statement></block><block type="input_on_button_pressed" x="80" y="280"><field name="BUTTON">B</field><statement name="HANDLER"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">3</field></block></value><statement name="DO"><block type="basic_show_icon"><field name="ICON">Heart</field><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">300</field></block></value></block></next></block></statement></block></statement></block></xml>'
            ],
            [
                'id' => 'st-pins',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Kontrol Pin GPIO',
                'deskripsi' => '<p>Pin adalah jembatan antara Micro:bit dan dunia nyata. Memahami cara kerja dan keterbatasan setiap pin sangat penting untuk wiring yang benar dan aman.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Mengenal layout pin pada Micro:bit</li>
  <li>Menggunakan kode untuk membaca dan menulis pin</li>
  <li>Menerapkan prinsip keamanan dalam penggunaan pin</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Layout Pin Micro:bit</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Pin</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Fungsi</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Keterangan</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">P0, P1, P2</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Analog &amp; Digital, PWM</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Pin "besar" dengan ring — mudah pakai krokodil clip</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">P3–P16</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Digital I/O</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Pin tambahan via edge connector</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">3V</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Sumber tegangan 3.3V</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Maks 90mA — jangan untuk motor besar</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">GND</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Ground (0V)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Referensi negatif untuk semua komponen</td></tr>
</tbody>
</table>
<div style="background:rgba(255,191,96,0.08);border-left:3px solid #ffbf60;border-radius:4px;padding:14px 16px;margin:16px 0;">
⚠️ <strong>Batas Kemampuan Pin!</strong> Pin Micro:bit maksimal toleransi 3.3V dan 5mA per pin. Selalu gunakan resistor untuk LED dan voltage divider untuk sensor 5V. Short circuit dapat merusak Micro:bit secara permanen!
</div>',
                'contoh_kode' => '// Kontrol Pin untuk Smart Trashbin

// ── Servo (PWM) ──────────────────────────────
pins.servoWritePin(AnalogPin.P0, 0)    // 0° = tertutup
pins.servoWritePin(AnalogPin.P0, 90)   // 90° = terbuka

// ── LED Digital Output ───────────────────────
pins.digitalWritePin(DigitalPin.P3, 1)  // LED Hijau ON
pins.digitalWritePin(DigitalPin.P4, 1)  // LED Merah ON
pins.digitalWritePin(DigitalPin.P3, 0)  // LED Hijau OFF

// ── Baca Analog (Sensor Cahaya Simulasi) ──────
let nilaiCahaya = pins.analogReadPin(AnalogPin.P0)  // 0–1023
basic.showNumber(nilaiCahaya)',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_on_start" x="80" y="80"><statement name="HANDLER"><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="pins_digital_write"><field name="PIN">P4</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="variables_set"><field name="VAR">nilaiCahaya</field><value name="VALUE"><block type="pins_analog_read"><field name="PIN">P0</field></block></value><next><block type="basic_show_number"><value name="NUMBER"><block type="variables_get"><field name="VAR">nilaiCahaya</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>'
            ],

            // ─────────────────────────────────────────────────────────
            // Bab 4: Pemrograman Smart Trashbin — Program Utama
            // ─────────────────────────────────────────────────────────
            [
                'id' => 'st-coding-lengkap',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Program Lengkap',
                'deskripsi' => '<p>Inilah momen yang ditunggu-tunggu! Kita akan menulis program Smart Trashbin secara lengkap dan menyeluruh, menggabungkan semua konsep yang telah dipelajari.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Menulis program Smart Trashbin secara lengkap</li>
  <li>Memahami struktur kode yang baik dengan fungsi dan komentar</li>
  <li>Men-download dan mengujikan program ke Micro:bit</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Langkah Upload Program</h3>
<ol>
  <li>Buka Makecode → New Project → beri nama "SmartTrashbin"</li>
  <li>Klik Extensions → cari "Sonar" → tambahkan ekstensi</li>
  <li>Beralih ke mode JavaScript → paste kode contoh di atas</li>
  <li>Klik tombol Download → simpan file <code>.hex</code></li>
  <li>Colokkan Micro:bit ke komputer → salin file ke drive MICROBIT</li>
  <li>Tunggu LED kuning selesai berkedip → uji coba!</li>
</ol>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
🔧 <strong>Konfigurasi Pin:</strong><br>
• P0 = Servo Motor SG90<br>
• P1 = TRIG Sensor Ultrasonik<br>
• P2 = ECHO Sensor Ultrasonik (via voltage divider)<br>
• P3 = LED Hijau (330Ω)<br>
• P4 = LED Merah (330Ω)<br>
• P5 = Buzzer Pasif
</div>',
                'contoh_kode' => '// ══════════════════════════════════════════
// SMART TRASHBIN — Micro:bit + HC-SR04
// ══════════════════════════════════════════

// ── Konfigurasi ──────────────────────────
const JARAK_BUKA = 20      // cm: jarak untuk buka
const SUDUT_BUKA = 90      // derajat: servo saat terbuka
const SUDUT_TUTUP = 0      // derajat: servo saat tertutup
const DELAY_TUTUP = 3000   // ms: jeda sebelum menutup

// ── Variabel Global ───────────────────────
let tutupTerbuka = false
let hitunganBuka = 0

// ── Fungsi: Buka Tutup ────────────────────
function bukaTutup() {
    if (!tutupTerbuka) {
        pins.servoWritePin(AnalogPin.P0, SUDUT_BUKA)
        pins.digitalWritePin(DigitalPin.P3, 1)
        music.playTone(523, 100)
        tutupTerbuka = true
        hitunganBuka += 1
    }
}

// ── Fungsi: Tutup Kembali ─────────────────
function tutupKembali() {
    pins.servoWritePin(AnalogPin.P0, SUDUT_TUTUP)
    pins.digitalWritePin(DigitalPin.P3, 0)
    tutupTerbuka = false
}

// ── Tombol A: lihat statistik ─────────────
input.onButtonPressed(Button.A, function () {
    basic.showString("N:" + hitunganBuka)
})

// ── Program Utama ─────────────────────────
basic.forever(function () {
    let jarak = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)

    if (jarak > 0 && jarak < JARAK_BUKA) {
        bukaTutup()
        basic.pause(DELAY_TUTUP)
        tutupKembali()
    }

    basic.pause(200)
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_on_start" x="80" y="80"><statement name="HANDLER"><block type="variables_set"><field name="VAR">tutupTerbuka</field><value name="VALUE"><block type="logic_boolean"><field name="BOOL">FALSE</field></block></value><next><block type="variables_set"><field name="VAR">hitunganBuka</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value></block></next></block></statement></block><block type="procedures_defnoreturn" x="80" y="280"><field name="NAME">bukaTutup</field><statement name="STACK"><block type="controls_if"><value name="IF0"><block type="logic_negate"><value name="BOOL"><block type="variables_get"><field name="VAR">tutupTerbuka</field></block></value></block></value><statement name="DO0"><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="music_play_tone"><value name="NOTE"><block type="math_number"><field name="NUM">523</field></block></value><value name="DURATION"><block type="math_number"><field name="NUM">100</field></block></value><next><block type="variables_set"><field name="VAR">tutupTerbuka</field><value name="VALUE"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value><next><block type="variables_change"><field name="VAR">hitunganBuka</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value></block></next></block></next></block></next></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" x="80" y="480"><field name="NAME">tutupKembali</field><statement name="STACK"><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="variables_set"><field name="VAR">tutupTerbuka</field><value name="VALUE"><block type="logic_boolean"><field name="BOOL">FALSE</field></block></value></block></next></block></next></block></statement></block><block type="input_on_button_pressed" x="80" y="660"><field name="BUTTON">A</field><statement name="HANDLER"><block type="basic_show_number"><value name="NUMBER"><block type="variables_get"><field name="VAR">hitunganBuka</field></block></value></block></statement></block><block type="basic_forever" x="80" y="840"><statement name="HANDLER"><block type="variables_set"><field name="VAR">jarak</field><value name="VALUE"><block type="sonar_ping"><field name="TRIG">P1</field><field name="ECHO">P2</field></block></value><next><block type="controls_if"><value name="IF0"><block type="logic_operation"><field name="OP">AND</field><value name="A"><block type="logic_compare"><field name="OP">GT</field><value name="A"><block type="variables_get"><field name="VAR">jarak</field></block></value><value name="B"><block type="math_number"><field name="NUM">0</field></block></value></block></value><value name="B"><block type="logic_compare"><field name="OP">LT</field><value name="A"><block type="variables_get"><field name="VAR">jarak</field></block></value><value name="B"><block type="math_number"><field name="NUM">20</field></block></value></block></value></block></value><statement name="DO0"><block type="procedures_callnoreturn"><mutation name="bukaTutup" /><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">3000</field></block></value><next><block type="procedures_callnoreturn"><mutation name="tutupKembali" /></block></next></block></next></block></statement><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">200</field></block></value></block></next></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-servo',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Kontrol Servo Motor',
                'deskripsi' => '<p>Servo motor adalah aktuator presisi yang bisa berputar ke sudut tertentu. Memahami cara kerjanya membantu kita membuat gerakan tutup trashbin yang mulus dan andal.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami cara kerja servo motor dan sinyal PWM</li>
  <li>Mengontrol servo dengan Makecode</li>
  <li>Membuat animasi gerakan servo yang halus</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Kabel Servo SG90</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Kabel</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Warna</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Fungsi</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Signal</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Oranye / Kuning</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Sinyal PWM kontrol sudut → hubungkan ke P0</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">VCC</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Merah</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Tegangan (4.8–6V) → hubungkan ke 3V</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">GND</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Coklat / Hitam</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Ground → hubungkan ke GND</td></tr>
</tbody>
</table>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
⚙️ <strong>Cara Kerja PWM pada Servo:</strong> Servo dikendalikan sinyal PWM 20ms (50Hz). Lebar pulsa menentukan sudut: 1ms→0°, 1.5ms→90°, 2ms→180°. Makecode menyederhanakan ini dengan <code>pins.servoWritePin(pin, sudut)</code>.
</div>',
                'contoh_kode' => '// Kontrol Servo — Gerakan Halus (Smooth Sweep)

// Buka tutup secara halus (0° → 90°)
function bukaHalus() {
    for (let sudut = 0; sudut <= 90; sudut += 3) {
        pins.servoWritePin(AnalogPin.P0, sudut)
        basic.pause(15)  // 15ms per derajat = gerakan mulus
    }
}

// Tutup secara halus (90° → 0°)
function tutupHalus() {
    for (let sudut = 90; sudut >= 0; sudut -= 3) {
        pins.servoWritePin(AnalogPin.P0, sudut)
        basic.pause(15)
    }
}

// Jalankan sekali untuk uji coba
input.onButtonPressed(Button.A, function () {
    bukaHalus()
    basic.pause(2000)
    tutupHalus()
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="procedures_defnoreturn" x="80" y="80"><field name="NAME">bukaHalus</field><statement name="STACK"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">30</field></block></value><statement name="DO"><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">15</field></block></value></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" x="80" y="300"><field name="NAME">tutupHalus</field><statement name="STACK"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">30</field></block></value><statement name="DO"><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">15</field></block></value></block></next></block></statement></block></statement></block><block type="input_on_button_pressed" x="80" y="520"><field name="BUTTON">A</field><statement name="HANDLER"><block type="procedures_callnoreturn"><mutation name="bukaHalus" /><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">2000</field></block></value><next><block type="procedures_callnoreturn"><mutation name="tutupHalus" /></block></next></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-led-buzzer',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: LED Indikator & Buzzer',
                'deskripsi' => '<p>LED dan buzzer adalah komponen output paling dasar dan paling sering digunakan. Bersama, mereka memberikan feedback visual dan audio yang jelas kepada pengguna.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami cara kerja LED dan cara menghitung resistor</li>
  <li>Membedakan buzzer aktif dan pasif</li>
  <li>Membuat pola LED dan melodi buzzer untuk indikator Smart Trashbin</li>
</ul>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
📐 <strong>Rumus Resistor LED:</strong><br>
R = (VCC − V_LED) ÷ I_LED = (3.3V − 2V) ÷ 0.02A = <strong>65Ω → gunakan 330Ω</strong> (nilai standar terdekat yang aman)
</div>
<h3 style="color:#2AC1BC;margin-top:20px;">Buzzer Aktif vs Pasif</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Aspek</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Buzzer Aktif</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Buzzer Pasif</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Osilator</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Built-in (internal)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Tidak ada — butuh PWM</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Cara pakai</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">digitalWritePin (HIGH/LOW)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">music.playTone()</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Nada</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Hanya satu frekuensi</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Bisa berbagai nada ✅</td></tr>
</tbody>
</table>',
                'contoh_kode' => '// LED + Buzzer untuk Smart Trashbin

// Indikator buka tutup (LED hijau + nada)
function indikatorBuka() {
    pins.digitalWritePin(DigitalPin.P3, 1)   // LED hijau ON
    music.playTone(523, 80)   // Do
    basic.pause(40)
    music.playTone(659, 80)   // Mi
}

// Peringatan penuh (LED merah kedip 3x + bunyi)
function peringatanPenuh() {
    for (let n = 0; n < 3; n++) {
        pins.digitalWritePin(DigitalPin.P4, 1)   // LED merah ON
        music.playTone(262, 250)                  // Nada rendah
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P4, 0)   // LED merah OFF
        basic.pause(150)
    }
}

// Tekan A untuk test indikator buka
input.onButtonPressed(Button.A, function () { indikatorBuka() })
// Tekan B untuk test peringatan penuh
input.onButtonPressed(Button.B, function () { peringatanPenuh() })',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="procedures_defnoreturn" x="80" y="80"><field name="NAME">indikatorBuka</field><statement name="STACK"><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="music_play_tone"><value name="NOTE"><block type="math_number"><field name="NUM">523</field></block></value><value name="DURATION"><block type="math_number"><field name="NUM">80</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">40</field></block></value><next><block type="music_play_tone"><value name="NOTE"><block type="math_number"><field name="NUM">659</field></block></value><value name="DURATION"><block type="math_number"><field name="NUM">80</field></block></value></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" x="80" y="280"><field name="NAME">peringatanPenuh</field><statement name="STACK"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">3</field></block></value><statement name="DO"><block type="pins_digital_write"><field name="PIN">P4</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="music_play_tone"><value name="NOTE"><block type="math_number"><field name="NUM">262</field></block></value><value name="DURATION"><block type="math_number"><field name="NUM">250</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">100</field></block></value><next><block type="pins_digital_write"><field name="PIN">P4</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">150</field></block></value></block></next></block></next></block></next></block></next></block></statement></block></statement></block><block type="input_on_button_pressed" x="80" y="480"><field name="BUTTON">A</field><statement name="HANDLER"><block type="procedures_callnoreturn"><mutation name="indikatorBuka" /></block></statement></block><block type="input_on_button_pressed" x="80" y="600"><field name="BUTTON">B</field><statement name="HANDLER"><block type="procedures_callnoreturn"><mutation name="peringatanPenuh" /></block></statement></block></xml>'
            ],

            // ─────────────────────────────────────────────────────────
            // Bab 5: K3 dalam Bekerja
            // ─────────────────────────────────────────────────────────
            [
                'id' => 'st-keselamatan',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: K3 – Keselamatan Kerja Elektronik',
                'deskripsi' => '<p>Keselamatan Kerja bukan hanya aturan — ini adalah kebiasaan yang melindungi dirimu, teman, dan peralatan lab. Setiap insiden bisa dicegah dengan persiapan yang baik.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Mengidentifikasi bahaya umum dalam proyek elektronik</li>
  <li>Menerapkan prosedur keselamatan dasar</li>
  <li>Mengetahui cara merespons insiden di lab</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Bahaya Umum di Lab Elektronik</h3>
<ul>
  <li>⚡ <strong>Sengatan Listrik:</strong> Bahkan tegangan rendah bisa berbahaya jika ada luka terbuka. Selalu matikan daya saat modifikasi wiring.</li>
  <li>🔥 <strong>Panas Berlebih:</strong> Komponen salah pasang bisa sangat panas. Short circuit bisa membakar komponen.</li>
  <li>💨 <strong>Asap Solder:</strong> Asap solder mengandung zat berbahaya. Selalu solder di tempat berventilasi baik.</li>
  <li>🔌 <strong>Short Circuit:</strong> Koneksi VCC langsung ke GND menyebabkan arus tak terhingga. Selalu periksa wiring sebelum menghidupkan daya.</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Checklist Keselamatan</h3>
<ul>
  <li>☑️ Periksa wiring sebelum menyalakan daya</li>
  <li>☑️ Gunakan tegangan sesuai spesifikasi komponen</li>
  <li>☑️ Pasang resistor pada LED dan komponen sensitif</li>
  <li>☑️ Matikan daya saat memodifikasi rangkaian</li>
  <li>☑️ Cuci tangan setelah bekerja dengan komponen elektronik</li>
  <li>☑️ Jangan menyentuh komponen yang sedang beroperasi</li>
  <li>☑️ Laporkan segera jika ada komponen yang panas berlebih</li>
</ul>',
                'contoh_kode' => '// Program Test Keamanan — Cek kondisi sebelum beroperasi
// Selalu test komponen satu per satu!

// Test 1: LED menyala
pins.digitalWritePin(DigitalPin.P3, 1)
basic.pause(1000)
pins.digitalWritePin(DigitalPin.P3, 0)

// Test 2: Servo gerak
pins.servoWritePin(AnalogPin.P0, 90)
basic.pause(1000)
pins.servoWritePin(AnalogPin.P0, 0)

// Test 3: Buzzer bunyi
music.playTone(440, 500)

// Tampilkan "OK" jika semua berjalan
basic.showString("OK")',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_on_start" x="80" y="80"><statement name="HANDLER"><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">1000</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">1000</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="music_play_tone"><value name="NOTE"><block type="math_number"><field name="NUM">440</field></block></value><value name="DURATION"><block type="math_number"><field name="NUM">500</field></block></value><next><block type="basic_show_string"><value name="TEXT"><block type="text"><field name="TEXT">OK</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-tegangan',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Tegangan Listrik & Hukum Ohm',
                'deskripsi' => '<p>Memahami konsep dasar listrik — tegangan, arus, dan hambatan — adalah fondasi yang wajib dikuasai sebelum bekerja dengan komponen elektronik apapun.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Memahami Hukum Ohm (V = I × R)</li>
  <li>Mengenal level tegangan yang digunakan dalam proyek</li>
  <li>Menerapkan konsep voltage divider untuk keamanan Micro:bit</li>
</ul>
<div style="background:rgba(42,193,188,0.08);border-left:3px solid #2AC1BC;border-radius:4px;padding:14px 16px;margin:16px 0;">
⚡ <strong>Hukum Ohm: V = I × R</strong><br>
• <strong>V (Volt)</strong> = Tegangan — tekanan yang mendorong elektron<br>
• <strong>I (Ampere)</strong> = Arus — banyaknya elektron yang mengalir<br>
• <strong>R (Ohm)</strong> = Hambatan — perlawanan terhadap aliran arus
</div>
<h3 style="color:#2AC1BC;margin-top:20px;">Level Tegangan dalam Proyek Smart Trashbin</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Sumber</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Tegangan</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Penggunaan</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Micro:bit (USB)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">5V → diregulasi 3.3V</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Power seluruh sistem</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Pin I/O Micro:bit</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Maks 3.3V, 5mA</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Sensor digital/analog, LED</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Servo SG90</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">4.8–6V</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Butuh sumber eksternal atau regulator</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">HC-SR04</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">5V</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Butuh voltage divider ke Micro:bit</td></tr>
</tbody>
</table>
<pre style="background:#040810;border:1px solid rgba(42,193,188,0.2);border-radius:8px;padding:16px;color:#4df9cc;font-size:12px;">Voltage Divider untuk ECHO HC-SR04:

  ECHO (5V) ──── 1kΩ ──── Node A ──── 2kΩ ──── GND
                               │
                            P2 Micro:bit

  V_A = 5V × (2kΩ / (1kΩ + 2kΩ))
      = 5V × (2/3)
      = 3.33V ✅ (aman untuk Micro:bit)</pre>',
                'contoh_kode' => '// Tidak ada kode khusus untuk materi ini.
// Gunakan waktu ini untuk merakit voltage divider:
//   ECHO (5V) → 1kΩ → [node] → 2kΩ → GND
//                          ↓
//                       P2 Micro:bit
//
// Verifikasi: ukur tegangan di node dengan multimeter
// Harus ≈ 3.3V sebelum disambungkan ke Micro:bit!

basic.showString("V OK")',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_on_start" x="80" y="80"><statement name="HANDLER"><block type="basic_show_string"><value name="TEXT"><block type="text"><field name="TEXT">V OK</field></block></value></block></statement></block></xml>'
            ],

            // ─────────────────────────────────────────────────────────
            // Bab 6: Integrasi Hardware & Program
            // ─────────────────────────────────────────────────────────
            [
                'id' => 'st-wiring',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Wiring Diagram Lengkap',
                'deskripsi' => '<p>Wiring diagram adalah panduan koneksi fisik antara semua komponen. Wiring yang salah bisa merusak komponen, jadi selalu verifikasi sebelum menghidupkan daya.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Membaca dan membuat wiring diagram</li>
  <li>Merakit rangkaian Smart Trashbin secara lengkap</li>
  <li>Melakukan verifikasi wiring sebelum power-on</li>
</ul>
<pre style="background:#040810;border:1px solid rgba(42,193,188,0.2);border-radius:8px;padding:16px;color:#4df9cc;font-size:12px;">══════ WIRING DIAGRAM SMART TRASHBIN ══════

[HC-SR04]              [Micro:bit]
  VCC  ──────────────►  3V
  TRIG ──────────────►  P1
  ECHO ──┬── 1kΩ ──►  P2
         └── 2kΩ ──►  GND
  GND  ──────────────►  GND

[Servo SG90]
  Signal (Oranye) ──►  P0
  VCC    (Merah)  ──►  3V
  GND    (Coklat) ──►  GND

[LED Hijau]
  P3 ── 330Ω ── LED(+) ── LED(-) ── GND

[LED Merah]
  P4 ── 330Ω ── LED(+) ── LED(-) ── GND

[Buzzer Pasif]
  P5 ── Buzzer(+) ── Buzzer(-) ── GND</pre>
<h3 style="color:#2AC1BC;margin-top:20px;">Checklist Verifikasi Wiring</h3>
<ul>
  <li>☑️ HC-SR04 VCC → 3V Micro:bit</li>
  <li>☑️ HC-SR04 TRIG → P1</li>
  <li>☑️ HC-SR04 ECHO → voltage divider (1kΩ+2kΩ) → P2</li>
  <li>☑️ HC-SR04 GND → GND Micro:bit</li>
  <li>☑️ Servo signal (oranye) → P0</li>
  <li>☑️ Servo VCC (merah) → 3V</li>
  <li>☑️ Servo GND (coklat) → GND</li>
  <li>☑️ LED hijau → 330Ω → P3, GND</li>
  <li>☑️ LED merah → 330Ω → P4, GND</li>
  <li>☑️ Buzzer → P5, GND</li>
</ul>
<div style="background:rgba(255,191,96,0.08);border-left:3px solid #ffbf60;border-radius:4px;padding:14px 16px;margin:16px 0;">
⚠️ Sebelum menghidupkan daya: periksa ulang semua koneksi GND. Pastikan tidak ada kabel VCC dan GND yang terhubung langsung (short circuit)!
</div>',
                'contoh_kode' => '// Program Smart Trashbin FINAL — setelah wiring selesai
// Pastikan semua komponen terhubung sesuai diagram

const JARAK_BUKA = 20
let tutupTerbuka = false

basic.forever(function () {
    let jarak = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)

    if (jarak > 0 && jarak < JARAK_BUKA && !tutupTerbuka) {
        // Buka
        pins.servoWritePin(AnalogPin.P0, 90)
        pins.digitalWritePin(DigitalPin.P3, 1)
        music.playTone(523, 100)
        tutupTerbuka = true
        basic.pause(3000)

        // Tutup
        pins.servoWritePin(AnalogPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P3, 0)
        tutupTerbuka = false
    }

    basic.pause(200)
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="basic_on_start" x="80" y="80"><statement name="HANDLER"><block type="variables_set"><field name="VAR">tutupTerbuka</field><value name="VALUE"><block type="logic_boolean"><field name="BOOL">FALSE</field></block></value></block></statement></block><block type="basic_forever" x="80" y="260"><statement name="HANDLER"><block type="variables_set"><field name="VAR">jarak</field><value name="VALUE"><block type="sonar_ping"><field name="TRIG">P1</field><field name="ECHO">P2</field></block></value><next><block type="controls_if"><value name="IF0"><block type="logic_operation"><field name="OP">AND</field><value name="A"><block type="logic_operation"><field name="OP">AND</field><value name="A"><block type="logic_compare"><field name="OP">GT</field><value name="A"><block type="variables_get"><field name="VAR">jarak</field></block></value><value name="B"><block type="math_number"><field name="NUM">0</field></block></value></block></value><value name="B"><block type="logic_compare"><field name="OP">LT</field><value name="A"><block type="variables_get"><field name="VAR">jarak</field></block></value><value name="B"><block type="math_number"><field name="NUM">20</field></block></value></block></value></block></value><value name="B"><block type="logic_negate"><value name="BOOL"><block type="variables_get"><field name="VAR">tutupTerbuka</field></block></value></block></value></block></value><statement name="DO0"><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="music_play_tone"><value name="NOTE"><block type="math_number"><field name="NUM">523</field></block></value><value name="DURATION"><block type="math_number"><field name="NUM">100</field></block></value><next><block type="variables_set"><field name="VAR">tutupTerbuka</field><value name="VALUE"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">3000</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="variables_set"><field name="VAR">tutupTerbuka</field><value name="VALUE"><block type="logic_boolean"><field name="BOOL">FALSE</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">200</field></block></value></block></next></block></next></block></statement></block></xml>'
            ],
            [
                'id' => 'st-pengujian',
                'kategori' => 'Proyek: Smart Trashbin',
                'judul' => 'Smart Trashbin: Pengujian & Troubleshooting',
                'deskripsi' => '<p>Pengujian sistematis memastikan setiap komponen dan sistem secara keseluruhan bekerja sesuai desain sebelum proyek dinyatakan selesai.</p>
<p><strong>🎯 Tujuan Pembelajaran:</strong></p>
<ul>
  <li>Melakukan pengujian per komponen</li>
  <li>Melakukan pengujian integrasi</li>
  <li>Mendokumentasikan hasil pengujian</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Tahap 1: Pengujian Komponen</h3>
<ul>
  <li>☑️ LED hijau menyala saat pin P3 = HIGH</li>
  <li>☑️ LED merah menyala saat pin P4 = HIGH</li>
  <li>☑️ Buzzer berbunyi saat <code>music.playTone()</code> dipanggil</li>
  <li>☑️ Servo bergerak dari 0° ke 90° dan kembali</li>
  <li>☑️ Sensor menunjukkan nilai berubah saat ada objek</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Tahap 2: Pengujian Integrasi</h3>
<ul>
  <li>☑️ Dekatkan tangan → tutup terbuka dalam &lt; 1 detik</li>
  <li>☑️ Tangan terus ada → tutup tetap terbuka 3 detik</li>
  <li>☑️ Jauhkan tangan → tutup menutup dalam &lt; 4 detik</li>
  <li>☑️ Uji 10 siklus berturut-turut tanpa error</li>
</ul>
<h3 style="color:#2AC1BC;margin-top:20px;">Troubleshooting Umum</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<thead><tr style="background:rgba(42,193,188,0.15);">
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Masalah</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Kemungkinan Penyebab</th>
  <th style="padding:8px;border:1px solid rgba(42,193,188,0.3);">Solusi</th>
</tr></thead>
<tbody>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Sensor nilai selalu 0</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">TRIG/ECHO terbalik / ekstensi Sonar belum install</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Cek wiring, install ekstensi Sonar di Makecode</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Servo bergetar terus</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Arus tidak cukup dari Micro:bit</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Gunakan sumber daya eksternal untuk servo</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">LED tidak menyala</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Polaritas terbalik (kaki panjang=+)</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Balik LED, cek resistor 330Ω</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Buzzer tidak bunyi</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Buzzer aktif dihubungkan ke PWM</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Gunakan buzzer pasif untuk music.playTone()</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Program tidak ter-upload</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Kabel USB hanya charging</td><td style="padding:8px;border:1px solid rgba(255,255,255,0.08);">Ganti kabel data, gunakan Chrome</td></tr>
</tbody>
</table>',
                'contoh_kode' => '// Program Test — Uji Semua Komponen Satu Per Satu
// Tekan tombol yang sesuai untuk test masing-masing komponen

// Tombol A: Test LED + Servo
input.onButtonPressed(Button.A, function () {
    basic.showString("LED")
    pins.digitalWritePin(DigitalPin.P3, 1)   // LED hijau
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P4, 1)   // LED merah
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P3, 0)
    pins.digitalWritePin(DigitalPin.P4, 0)
    pins.servoWritePin(AnalogPin.P0, 90)     // Buka servo
    basic.pause(1000)
    pins.servoWritePin(AnalogPin.P0, 0)      // Tutup servo
})

// Tombol B: Test Sensor + Buzzer
input.onButtonPressed(Button.B, function () {
    let jarak = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)
    basic.showNumber(jarak)
    music.playTone(440, 300)
})',
                'kode_blok' => '<xml xmlns="https://developers.google.com/blockly/xml"><block type="input_on_button_pressed" x="80" y="80"><field name="BUTTON">A</field><statement name="HANDLER"><block type="basic_show_string"><value name="TEXT"><block type="text"><field name="TEXT">LED</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">500</field></block></value><next><block type="pins_digital_write"><field name="PIN">P4</field><value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">500</field></block></value><next><block type="pins_digital_write"><field name="PIN">P3</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_digital_write"><field name="PIN">P4</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">90</field></block></value><next><block type="basic_pause"><value name="MS"><block type="math_number"><field name="NUM">1000</field></block></value><next><block type="pins_servo_write"><field name="PIN">P0</field><value name="VALUE"><block type="math_number"><field name="NUM">0</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="input_on_button_pressed" x="80" y="320"><field name="BUTTON">B</field><statement name="HANDLER"><block type="variables_set"><field name="VAR">jarak</field><value name="VALUE"><block type="sonar_ping"><field name="TRIG">P1</field><field name="ECHO">P2</field></block></value><next><block type="basic_show_number"><value name="NUMBER"><block type="variables_get"><field name="VAR">jarak</field></block></value><next><block type="music_play_tone"><value name="NOTE"><block type="math_number"><field name="NUM">440</field></block></value><value name="DURATION"><block type="math_number"><field name="NUM">300</field></block></value></block></next></block></next></block></statement></block></xml>'
            ]
        ];
    }

    public function index(string $id = null): void
    {
        // Temukan materi aktif
        $activeMateri = null;
        if ($id !== null) {
            foreach ($this->materiList as $materi) {
                if ($materi['id'] === $id) {
                    $activeMateri = $materi;
                    break;
                }
            }
        }

        if ($activeMateri === null) {
            $activeMateri = $this->materiList[0];
        }

        // Ambil nama siswa dari query string, default 'Siswa Default'
        $siswaNama = isset($_GET['siswa_nama']) ? trim(strip_tags($_GET['siswa_nama'])) : 'Siswa Default';
        if (empty($siswaNama)) {
            $siswaNama = 'Siswa Default';
        }

        // Ambil daftar progress selesai
        $completedIds = [];
        $dbConnected = false;
        $dbError = '';

        // Cek secara aman apakah class Database mendukung method isConnected (untuk backward-compatibility server)
        if (method_exists($this->db, 'isConnected')) {
            $dbConnected = $this->db->isConnected();
            $dbError = $this->db->getErrorMessage();
        } else {
            // Jika class Database versi lama, tapi constructor berhasil terlewati tanpa exception,
            // itu berarti database terhubung!
            $dbConnected = true;
        }

        if ($dbConnected) {
            try {
                $progress = $this->db->fetchAll(
                    'SELECT materi_id FROM microbit_progress WHERE siswa_nama = ?',
                    [$siswaNama]
                );
                $completedIds = array_column($progress, 'materi_id');
            } catch (\Exception $e) {
                $dbConnected = false;
                $dbError = $e->getMessage();
            }
        }

        // Fallback ke Session jika DB offline atau datanya kosong
        if (!$dbConnected || empty($completedIds)) {
            if (!isset($_SESSION['completed_materi'])) {
                $_SESSION['completed_materi'] = [];
            }
            $completedIds = $_SESSION['completed_materi'][$siswaNama] ?? [];
        }

        // Hitung progress rate
        $totalMateri = count($this->materiList);
        $completedCount = count(array_intersect($completedIds, array_column($this->materiList, 'id')));
        $progressPercent = $totalMateri > 0 ? (int) (($completedCount / $totalMateri) * 100) : 0;

        // Path SVG microbit
        $svgPath = dirname(__DIR__) . '/views/microbit.simplified.svg';
        $microbitSvg = '';
        if (file_exists($svgPath)) {
            $microbitSvg = file_get_contents($svgPath);
            $microbitSvg = preg_replace('/<\?xml[^>]*\?>/i', '', $microbitSvg);
        }

        Response::view('index', [
            'materiList' => $this->materiList,
            'activeMateri' => $activeMateri,
            'completedIds' => $completedIds,
            'progressPercent' => $progressPercent,
            'completedCount' => $completedCount,
            'totalMateri' => $totalMateri,
            'microbitSvg' => $microbitSvg,
            'siswaNama' => $siswaNama,
            'dbConnected' => $dbConnected,
            'dbError' => $dbError
        ]);
    }

    public function complete(string $id): void
    {
        // Validasi ID materi
        $isValid = false;
        foreach ($this->materiList as $materi) {
            if ($materi['id'] === $id) {
                $isValid = true;
                break;
            }
        }

        if (!$isValid) {
            Response::json(['success' => false, 'message' => 'ID Materi tidak valid.'], 400);
        }

        // Baca data input
        $input = json_decode(file_get_contents('php://input'), true);
        $siswaNama = $input['siswa_nama'] ?? $_POST['siswa_nama'] ?? 'Siswa Default';
        $siswaNama = trim(strip_tags($siswaNama));
        if (empty($siswaNama)) {
            $siswaNama = 'Siswa Default';
        }

        $dbConnected = false;
        if (method_exists($this->db, 'isConnected')) {
            $dbConnected = $this->db->isConnected();
        } else {
            $dbConnected = true; // Asumsi true untuk Database versi lama
        }
        
        $savedToDb = false;

        if ($dbConnected) {
            try {
                // Cek apakah progress sudah tercatat di MySQL
                $exists = $this->db->fetchOne(
                    'SELECT id FROM microbit_progress WHERE materi_id = ? AND siswa_nama = ?',
                    [$id, $siswaNama]
                );

                if (!$exists) {
                    $uuid = sprintf(
                        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
                        mt_rand(0, 0xffff),
                        mt_rand(0, 0x0fff) | 0x4000,
                        mt_rand(0, 0x3fff) | 0x8000,
                        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
                    );

                    $stmt = $this->db->pdo()->prepare(
                        'INSERT INTO microbit_progress (id, materi_id, siswa_nama, completed_at) VALUES (?, ?, ?, NOW())'
                    );
                    $stmt->execute([$uuid, $id, $siswaNama]);
                }
                $savedToDb = true;
            } catch (\Exception $e) {
                $dbConnected = false;
            }
        }

        // Selalu simpan ke session juga sebagai fallback/cache
        if (!isset($_SESSION['completed_materi'])) {
            $_SESSION['completed_materi'] = [];
        }
        if (!isset($_SESSION['completed_materi'][$siswaNama])) {
            $_SESSION['completed_materi'][$siswaNama] = [];
        }
        if (!in_array($id, $_SESSION['completed_materi'][$siswaNama], true)) {
            $_SESSION['completed_materi'][$siswaNama][] = $id;
        }

        if ($savedToDb) {
            Response::json(['success' => true, 'message' => 'Progress berhasil disimpan ke MySQL!']);
        } else {
            Response::json(['success' => true, 'message' => 'MySQL Offline. Progress disimpan di Session lokal.']);
        }
    }
}