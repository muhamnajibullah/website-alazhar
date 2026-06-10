# AGENTS.md

## Project Overview

Project ini adalah **Website Al-Azhar Kelapa Gading - Integrated Islamic Educational School**.

Website ini merupakan website profil sekolah yang menampilkan informasi resmi mengenai Al-Azhar Kelapa Gading, seperti profil sekolah, unit pendidikan, program unggulan, fasilitas, berita, kegiatan, galeri, kontak, dan informasi lain yang berkaitan dengan sekolah.

## Tech Stack

Gunakan tech stack berikut:

* Frontend: HTML, CSS, JavaScript
* Backend: PHP
* Database: MySQL
* Architecture: Modular Monolithic
* Target tampilan: Responsive Web Design

## Main Rules

Ikuti aturan utama berikut dalam setiap pengerjaan:

* Tulis kode dengan prinsip clean code.
* Gunakan struktur folder yang rapi dan terorganisir.
* Gunakan arsitektur modular monolithic.
* Jangan mengubah file yang tidak berkaitan dengan permintaan.
* Jangan mengubah UI yang tidak diminta.
* Jangan melakukan refactor besar tanpa instruksi.
* Jangan menambahkan library, package, atau dependency baru tanpa alasan jelas.
* Setiap fungsi dan logic penting wajib diberi komentar.
* Setiap penambahan fitur atau perubahan wajib dites.
* Setiap selesai mengerjakan task, berikan ringkasan perubahan.
* Jika ada batasan, kendala, atau bagian yang belum selesai, jelaskan dengan jujur.

## Architecture Rules

Gunakan pendekatan **modular monolithic**.

Atur project agar setiap fitur memiliki tanggung jawab yang jelas dan mudah dikembangkan.

Pisahkan bagian berikut:

* Controller
* Model
* Service
* View
* Component
* Helper
* Config
* Asset
* CSS
* JavaScript
* Database file
* Testing checklist

Jangan membuat microservices kecuali diminta secara eksplisit.

## Recommended Folder Structure

Gunakan struktur folder berikut sebagai acuan:

```text
project-root/
├── app/
│   ├── Config/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Helpers/
│   └── Middleware/
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── uploads/
│
├── public/
│   ├── index.php
│   ├── about.php
│   ├── contact.php
│   ├── news.php
│   └── gallery.php
│
├── views/
│   ├── layouts/
│   ├── pages/
│   └── components/
│
├── css/
│   ├── main.css
│   ├── responsive.css
│   ├── components.css
│   └── pages/
│
├── js/
│   ├── main.js
│   └── pages/
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── schema.sql
│
├── tests/
│   ├── manual-test-checklist.md
│   ├── feature-test-checklist.md
│   └── responsive-test-checklist.md
│
├── storage/
│   ├── logs/
│   └── cache/
│
├── .env.example
├── .gitignore
├── README.md
└── AGENTS.md
```

## Module Rules

Setiap fitur harus dibuat secara modular.

Contoh module yang dapat digunakan dalam project:

* Home
* About School
* Education Units
* Programs
* Facilities
* News
* Articles
* Gallery
* Contact
* Admission Information
* Admin Panel
* Authentication
* Settings

Setiap module harus dipisahkan berdasarkan tanggung jawabnya.

Jangan mencampur logic antar module jika tidak diperlukan.

## PHP Rules

Ikuti aturan berikut untuk backend PHP:

* Controller hanya menangani request, memanggil service, dan mengarahkan response.
* Controller tidak boleh berisi query database panjang.
* Controller tidak boleh berisi business logic kompleks.
* Model hanya menangani komunikasi dengan database.
* Service digunakan untuk business logic.
* Helper digunakan untuk function umum yang bisa dipakai ulang.
* Config digunakan untuk konfigurasi aplikasi dan database.
* Gunakan prepared statement untuk semua query database.
* Jangan menulis query SQL langsung dari input user.
* Jangan menampilkan error database mentah ke user.
* Gunakan error handling yang aman.
* Gunakan session dengan aman untuk fitur admin.
* Gunakan validasi input sebelum menyimpan data ke database.

## MySQL Rules

Ikuti aturan berikut untuk database MySQL:

* Gunakan nama table dalam format snake_case.
* Gunakan nama column yang jelas dan deskriptif.
* Setiap table utama wajib memiliki id.
* Setiap table utama sebaiknya memiliki created_at dan updated_at.
* Gunakan deleted_at jika membutuhkan soft delete.
* Gunakan foreign key jika data saling berhubungan.
* Gunakan index pada column yang sering digunakan untuk pencarian, filter, atau relasi.
* Jangan mengubah struktur database jika tidak diminta.
* Jangan menghapus column atau table tanpa instruksi.
* Selalu pertimbangkan keamanan dan integritas data.

## HTML Rules

Ikuti aturan berikut untuk HTML:

* Gunakan semantic HTML.
* Gunakan struktur heading yang rapi.
* Setiap halaman utama idealnya hanya memiliki satu h1.
* Gunakan h2, h3, dan seterusnya secara berurutan.
* Semua gambar harus memiliki atribut alt.
* Gunakan struktur HTML yang mudah dibaca.
* Jangan menggunakan terlalu banyak div jika ada tag semantic yang lebih sesuai.
* Jangan mengubah struktur HTML yang tidak berkaitan dengan request.

## CSS Rules

Ikuti aturan berikut untuk CSS:

* Pisahkan CSS global, component, dan page-specific.
* Gunakan nama class yang jelas dan deskriptif.
* Hindari penggunaan !important kecuali benar-benar diperlukan.
* Jangan mengubah style global jika perubahan hanya dibutuhkan pada satu section.
* Jangan mengubah warna, font, spacing, layout, atau komponen UI tanpa instruksi.
* Gunakan responsive CSS untuk desktop, tablet, dan mobile.
* Pastikan tampilan mobile tetap rapi dan tidak menyebabkan horizontal scroll.
* Gunakan max-width pada gambar agar tidak keluar dari layar.
* Pastikan text panjang bisa wrap dengan baik.
* Pastikan button nyaman ditekan pada mobile.

## JavaScript Rules

Ikuti aturan berikut untuk JavaScript:

* Gunakan JavaScript hanya jika memang diperlukan.
* Pisahkan logic JavaScript berdasarkan halaman atau fitur.
* Jangan menulis semua logic dalam satu file besar.
* Gunakan function yang jelas dan reusable.
* Setiap function wajib diberi komentar singkat.
* Hindari manipulasi DOM yang terlalu kompleks jika tidak diperlukan.
* Jangan mengubah behavior UI yang tidak diminta.
* Pastikan tidak ada error di browser console setelah perubahan.

## Responsive Design Rules

Website wajib responsive pada ukuran layar berikut:

* Desktop: 1440px
* Laptop: 1024px
* Tablet: 768px
* Mobile: 576px
* Small Mobile: 375px

Pastikan hal berikut:

* Tidak ada horizontal scroll yang tidak diperlukan.
* Text tetap terbaca dengan jelas.
* Gambar tidak pecah dan tidak keluar layar.
* Navbar mobile mudah digunakan.
* Section tidak terlalu padat di layar kecil.
* Button dan link mudah ditekan di mobile.
* Layout tetap rapi di desktop, tablet, dan mobile.
* Informasi penting tidak hilang di mobile.

## UI Rules

Ikuti aturan berikut untuk UI:

* Jangan mengubah UI yang tidak diminta.
* Jangan mengganti warna utama tanpa instruksi.
* Jangan mengganti font tanpa instruksi.
* Jangan mengubah spacing tanpa kebutuhan.
* Jangan mengubah layout section lain yang tidak berkaitan.
* Pertahankan desain yang formal, modern, bersih, dan sesuai identitas sekolah Islam terpadu.
* Jika perubahan UI diperlukan karena alasan teknis, jelaskan alasannya terlebih dahulu.

## File Change Rules

Ikuti aturan berikut sebelum mengubah file:

* Pahami permintaan user terlebih dahulu.
* Identifikasi file yang benar-benar berkaitan.
* Ubah hanya file yang diperlukan.
* Jangan mengubah file lain tanpa alasan jelas.
* Jangan menghapus kode yang masih digunakan.
* Jangan mengganti nama file atau folder tanpa instruksi.
* Jangan mengubah struktur folder utama tanpa kebutuhan.
* Jangan mengubah database schema jika request tidak membutuhkan perubahan database.
* Jika membuat file baru, tempatkan di folder yang sesuai.

## Comment Rules

Setiap function dan logic penting wajib diberi komentar.

Komentar harus menjelaskan:

* Fungsi kode tersebut.
* Tujuan function.
* Parameter penting jika ada.
* Return value jika ada.
* Alasan logic tertentu jika tidak langsung mudah dipahami.

Komentar harus membantu dokumentasi dan pemahaman kode.

Jangan membuat komentar yang terlalu berlebihan atau menjelaskan hal yang sudah sangat jelas.

## Security Rules

Ikuti aturan keamanan berikut:

* Gunakan prepared statement untuk semua query.
* Validasi semua input dari user.
* Sanitasi output sebelum ditampilkan ke HTML.
* Jangan menyimpan password dalam plain text.
* Gunakan password_hash untuk menyimpan password.
* Gunakan password_verify untuk memverifikasi password.
* Jangan menampilkan error teknis ke user.
* Jangan commit file .env asli.
* Gunakan .env.example untuk contoh konfigurasi.
* Batasi upload file berdasarkan extension, MIME type, dan ukuran file.
* Rename file upload agar tidak menggunakan nama asli user.
* Jangan izinkan upload file PHP ke folder public.
* Gunakan CSRF protection untuk form penting.
* Gunakan session yang aman untuk fitur admin.
* Pastikan route admin tidak bisa diakses tanpa login.

## Testing Rules

Setiap penambahan fitur atau perubahan wajib dites.

Minimal testing yang harus dilakukan:

* Functional test
* Responsive test
* Browser test
* Database test jika ada perubahan database
* Security basic test jika ada input form atau upload file

Pastikan hal berikut setelah perubahan:

* Fitur berjalan sesuai request.
* Tidak ada error di browser console.
* Tidak ada error PHP.
* Tidak ada error query database.
* Tampilan desktop rapi.
* Tampilan tablet rapi.
* Tampilan mobile rapi.
* Tidak ada UI lain yang berubah tanpa diminta.
* File yang diubah hanya file yang berkaitan.

## Functional Testing Rules

Lakukan functional testing untuk memastikan fitur berjalan sesuai permintaan.

Pastikan:

* Fitur bisa digunakan.
* Validasi berjalan.
* Data tersimpan jika ada proses simpan.
* Data tampil dengan benar jika ada proses tampil.
* Error message muncul dengan tepat jika input salah.
* Tidak ada flow yang rusak setelah perubahan.

## Responsive Testing Rules

Lakukan responsive testing pada ukuran:

* 1440px
* 1024px
* 768px
* 576px
* 375px

Pastikan layout tetap rapi di semua ukuran layar.

## Browser Testing Rules

Minimal cek website di:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Mobile browser

Pastikan tampilan dan fungsi utama berjalan konsisten.

## Database Testing Rules

Jika ada perubahan database, pastikan:

* Insert data berhasil.
* Update data berhasil.
* Delete data berhasil jika fitur membutuhkan.
* Data tampil sesuai query.
* Relasi table benar.
* Tidak ada query error.
* Tidak ada SQL injection dari input user.

## Admin Panel Rules

Jika nanti dibuat admin panel, ikuti aturan berikut:

* Pisahkan halaman public website dan admin panel.
* Gunakan authentication.
* Gunakan session login yang aman.
* Admin route tidak boleh bisa diakses tanpa login.
* Validasi semua input admin.
* Sanitasi semua output.
* Gunakan role jika ada lebih dari satu jenis admin.
* Upload gambar harus aman.
* Jangan tampilkan error teknis secara mentah ke admin.
* Jangan membuat admin panel jika user hanya meminta halaman public.

## Git Rules

Gunakan commit message yang jelas dan profesional.

Gunakan prefix seperti:

* feat
* fix
* style
* refactor
* docs
* test
* chore

Jangan commit file berikut:

* .env
* vendor
* node_modules
* file log
* database backup pribadi
* file upload testing
* file sementara
* file credential
* file rahasia

## Performance Rules

Ikuti aturan performa berikut:

* Optimalkan ukuran gambar sebelum digunakan.
* Gunakan format gambar modern jika memungkinkan.
* Jangan load JavaScript yang tidak digunakan.
* Jangan membuat CSS terlalu besar tanpa kebutuhan.
* Gunakan lazy loading untuk gambar galeri atau berita.
* Hindari query database berulang dalam loop.
* Gunakan pagination untuk data yang banyak.
* Minimalkan asset yang tidak diperlukan.
* Pastikan halaman utama tetap ringan.

## Accessibility Rules

Ikuti aturan accessibility berikut:

* Semua gambar harus memiliki alt.
* Button harus memiliki text yang jelas.
* Link harus deskriptif.
* Form input harus memiliki label.
* Warna text dan background harus memiliki kontras yang cukup.
* Jangan hanya mengandalkan warna untuk membedakan status.
* Pastikan website mudah digunakan di mobile.
* Pastikan elemen interaktif mudah diklik atau ditekan.

## Environment Rules

Ikuti aturan environment berikut:

* Gunakan .env.example sebagai contoh konfigurasi.
* Jangan commit file .env asli.
* Simpan konfigurasi database di file config.
* Jangan hardcode credential database di banyak file.
* Pisahkan konfigurasi local dan production.
* Jangan menampilkan credential di frontend.

## Error Handling Rules

Ikuti aturan error handling berikut:

* Jangan tampilkan error database mentah ke user.
* Tampilkan pesan error yang mudah dipahami user.
* Simpan error teknis ke log.
* Gunakan try-catch jika diperlukan.
* Pastikan proses database memiliki error handling.
* Pastikan form tetap aman saat terjadi error.
* Jangan membocorkan path server, query SQL, atau credential.

## Content Rules

Karena website ini adalah website profil sekolah Islam terpadu:

* Gunakan bahasa yang formal, sopan, dan profesional.
* Pertahankan identitas Al-Azhar Kelapa Gading.
* Hindari kalimat yang terlalu informal.
* Gunakan tone yang modern, terpercaya, dan ramah.
* Pastikan konten mudah dipahami oleh orang tua, calon siswa, siswa, guru, dan masyarakat umum.

## Important Restrictions

Jangan lakukan hal berikut kecuali diminta:

* Jangan mengubah UI yang tidak diminta.
* Jangan mengganti warna utama website.
* Jangan mengganti font utama website.
* Jangan mengganti struktur folder utama.
* Jangan menghapus fitur yang sudah ada.
* Jangan mengubah database schema.
* Jangan mengubah semua file untuk perubahan kecil.
* Jangan menambahkan library besar.
* Jangan membuat fitur admin jika tidak diminta.
* Jangan membuat autentikasi jika tidak diminta.
* Jangan membuat API baru jika halaman biasa sudah cukup.
* Jangan membuat microservices.
* Jangan menghapus komentar penting.
* Jangan menghapus validasi keamanan.
* Jangan mengubah flow user tanpa instruksi.

## Development Flow

Setiap mengerjakan task, ikuti alur berikut:

1. Pahami request user.
2. Identifikasi file yang berkaitan.
3. Tentukan apakah perubahan membutuhkan frontend, backend, database, atau semuanya.
4. Ubah hanya file yang relevan.
5. Tulis kode dengan clean code.
6. Tambahkan komentar pada function dan logic penting.
7. Pastikan tampilan responsive.
8. Jalankan testing.
9. Pastikan tidak ada UI lain yang berubah.
10. Berikan ringkasan hasil pekerjaan.

## Final Response Rules

Setelah selesai mengerjakan task, selalu berikan response dengan format:

```text
Selesai.

Ringkasan:
- ...
- ...

File yang diubah:
- ...

Testing:
- ...

Catatan:
- ...
```

Jika task belum selesai sepenuhnya, gunakan format:

```text
Belum selesai sepenuhnya.

Yang sudah dilakukan:
- ...

Kendala:
- ...

Yang perlu dilakukan berikutnya:
- ...
```

## Final Reminder

Kerjakan project ini seperti senior developer:

* Rapi.
* Aman.
* Modular.
* Mudah dikembangkan.
* Mudah dibaca.
* Responsive.
* Tidak mengubah hal yang tidak diminta.
* Selalu testing.
* Selalu dokumentasikan function dan logic penting.
* Selalu beri ringkasan setelah selesai.
