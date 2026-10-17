# Website Resmi HIMASTI Cyber University

Website company profile statis modern untuk **HIMASTI (Himpunan Mahasiswa Sistem & Teknologi Informasi)** Cyber University, periode kepengurusan 2026/2027 (Kabinet Arthasena).

[![Astro v7](https://img.shields.io/badge/Astro-v7.3.8-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.12.0-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Copyright_%C2%A9_2026_HIMASTI-blue?style=flat)](#lisensi)

---

## Daftar Isi

1. [Tech Stack](#tech-stack)
2. [Prasyarat](#prasyarat)
3. [Memulai (Quick Start)](#memulai-quick-start)
4. [Struktur Proyek](#struktur-proyek)
5. [Panduan Admin CMS (Sveltia CMS)](#panduan-admin-cms-sveltia-cms)
6. [Cara Menambah Konten via Git (Manual)](#cara-menambah-konten-via-git-manual)
7. [Prosedur Pergantian Periode](#prosedur-pergantian-periode)
8. [Panduan Deployment](#panduan-deployment)
9. [Konfigurasi Wajib Sebelum Live](#konfigurasi-wajib-sebelum-live)
10. [Dokumen Pendamping](#dokumen-pendamping)
11. [Lisensi](#lisensi)

---

## Tech Stack

Proyek ini dibangun menggunakan arsitektur statis modern (Jamstack) yang cepat, aman, dan mudah dipelihara:

- **[Astro v7](https://astro.build/)**: Static Site Generator berkinerja tinggi dengan arsitektur zero-JS by default dan integrasi sitemap otomatis.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework via `@tailwindcss/vite` dengan konfigurasi modern berbasis file CSS.
- **[TypeScript](https://www.typescriptlang.org/)**: Skrip bertipe ketat (*strict mode*) untuk keandalan kode maksimal.
- **Astro Content Collections**: Pengelolaan konten berbasis Markdown dan JSON dengan validasi skema skrip Zod pada tahap kompilasi.
- **[Sveltia CMS](https://sveltiacms.app/)**: Panel admin headless CMS berbasis Git yang berjalan di sisi klien browser (SPA) tanpa perlu server basis data terpisah.

---

## Prasyarat

Sebelum menjalankan atau mengembangkan website ini di komputer lokal, pastikan telah memasang:

- **Node.js**: Versi `≥ 22.12.0` (disarankan LTS genap terbaru; lihat file `.nvmrc`).
- **npm**: Versi `10.x` ke atas (terpasang otomatis bersama Node.js).
- **Git**: Untuk version control dan sinkronisasi konten dengan GitHub.

---

## Memulai (Quick Start)

Ikuti langkah-langkah berikut untuk menjalankan website di komputer lokal:

```bash
# 1. Clone repositori ke komputer Anda
git clone https://github.com/owner/himasti-website.git
cd himasti-website

# 2. Pasang seluruh dependensi proyek
npm install

# 3. Jalankan server pengembangan lokal (hot reload aktif)
npm run dev
```

Buka peramban (*browser*) Anda dan akses:
```
http://localhost:4321
```

### Perintah Penting Lainnya

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan development server pada port `4321` |
| `npm run build` | Melakukan build produksi statis ke direktori `dist/` |
| `npm run preview` | Menjalankan server lokal untuk menguji hasil build `dist/` |
| `npm run check` | Memeriksa validitas tipe TypeScript dan skema Content Collections |
| `npm run astro` | Menjalankan antarmuka CLI Astro |

> [!NOTE]
> Selalu jalankan `npm run check` sebelum melakukan commit kode baru untuk memastikan tidak ada kesalahan tipe atau skema frontmatter konten.

---

## Struktur Proyek

Susunan direktori website HIMASTI diatur secara modular dan terstruktur:

```
himasti-website/
├── public/                       # Berkas statis publik langsung disajikan apa adanya
│   ├── admin/
│   │   └── config.yml            # Konfigurasi skema dan koleksi Sveltia CMS
│   ├── favicon.ico               # Favicon klasik
│   ├── favicon.svg               # Favicon modern berbasis vektor
│   └── robots.txt                # Aturan perayapan mesin pencari (SEO)
├── src/
│   ├── assets/                   # Aset gambar yang dioptimasi oleh Astro
│   │   ├── logo-cyber-university.png
│   │   ├── logo-himasti.png
│   │   ├── logo-kabinet-arthasena.png
│   │   └── uploads/              # Direktori target unggahan media dari CMS
│   ├── components/               # Komponen antarmuka Astro yang dapat digunakan ulang
│   │   ├── layout/               # Komponen struktural (Navbar, Footer, BaseHead, SEO)
│   │   ├── sections/             # Seksi halaman (Hero, DivisiGrid, ProkerList, dll.)
│   │   └── ui/                   # Komponen primitif (Button, Badge, Card, dll.)
│   ├── content/                  # Berkas konten (Markdown dan JSON)
│   │   ├── berita/               # Artikel, warta kegiatan, dan dokumentasi tulisan
│   │   ├── divisi/               # Data divisi di bawah HIMASTI
│   │   ├── galeri/               # Dokumentasi foto kegiatan
│   │   ├── pengurus/             # Biodata dan susunan pengurus (per periode)
│   │   ├── prestasi/             # Catatan prestasi akademik dan non-akademik
│   │   ├── proker/               # Daftar program kerja organisasi
│   │   └── settings.json         # Pengaturan global situs (kontak dan sosmed)
│   ├── content.config.ts         # Skema validasi Content Collections (Zod)
│   ├── layouts/                  # Layout pembungkus utama (BaseLayout.astro)
│   ├── lib/                      # Utilitas pembantu (format tanggal, sorting, dll.)
│   ├── pages/                    # Routing berbasis file
│   │   ├── admin/                # Antarmuka panel admin CMS (/admin)
│   │   ├── berita/               # Halaman indeks berita dan detail (/berita/[slug])
│   │   ├── program-kerja/        # Halaman indeks dan detail (/program-kerja/[slug])
│   │   ├── styleguide/           # Halaman panduan desain internal
│   │   ├── 404.astro             # Halaman error 404
│   │   ├── divisi.astro          # Halaman pengenalan divisi
│   │   ├── galeri.astro          # Halaman galeri kegiatan
│   │   ├── index.astro           # Halaman beranda utama
│   │   ├── kontak.astro          # Halaman kontak dan FAQ
│   │   ├── prestasi.astro        # Halaman daftar prestasi
│   │   ├── struktur.astro        # Halaman bagan struktur organisasi
│   │   └── tentang.astro         # Halaman visi, misi, dan sejarah organisasi
│   └── styles/                   # File gaya global (CSS) dan integrasi font
├── astro.config.mjs              # Berkas konfigurasi utama Astro
├── package.json                  # Konfigurasi dependensi dan skrip proyek
├── tsconfig.json                 # Konfigurasi kompilator TypeScript
├── PRD.md                        # Product Requirements Document
├── design.md                     # Panduan Design System
├── plan.md                       # Rencana & tahapan pengembangan
└── CLAUDE.md                     # Panduan AI Coding Assistant
```

---

## Panduan Admin CMS (Sveltia CMS)

Situs ini dilengkapi dengan panel administrasi **Sveltia CMS** yang ramah pengguna, memungkinkan pengurus memperbarui konten tanpa harus menyentuh kode program.

### 1. Cara Mengakses Panel Admin

1. Buka peramban dan akses alamat:
   ```
   https://domain-anda.com/admin
   ```
   *(Untuk pengujian lokal, gunakan `http://localhost:4321/admin`)*
2. Halaman admin akan memuat antarmuka Sveltia CMS.

### 2. Login via GitHub

Sveltia CMS terhubung langsung dengan repositori GitHub proyek:

- Klik tombol **Login with GitHub** atau masukkan GitHub Personal Access Token yang memiliki izin akses ke repositori.
- **Syarat Akses**: Pengguna **wajib memiliki akses sebagai Collaborator (izin Tulis / Write access)** pada repositori GitHub HIMASTI. Jika akun Anda belum ditambahkan oleh pengelola teknis, Anda tidak dapat menyimpan perubahan.

---

### 3. Mengelola Konten per Koleksi

Berikut adalah daftar koleksi yang tersedia di CMS beserta panduan field-nya:

#### A. Pengurus (`src/content/pengurus/`)
Data anggota pengurus organisasi per periode.

| Nama Field | Tipe / Widget | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `nama` | String | **Wajib** | Nama lengkap pengurus |
| `jabatan` | String | **Wajib** | Contoh: *"Ketua Umum"*, *"Kepala Divisi"*, *"Staf Ahli"* |
| `divisi` | String | Opsional | Nama divisi. **Kosongkan** untuk Pengurus Inti / BPH |
| `angkatan` | String | Opsional | Tahun angkatan kuliah, contoh: *"2024"* |
| `periode` | String | **Wajib** | Format: *"2026-2027"* (sesuai periode kepengurusan) |
| `foto` | Image | Opsional | Foto profil formal pengurus |
| `urutan` | Number (Int) | **Wajib** | Urutan tampilan kartu (angka lebih kecil tampil lebih awal) |

#### B. Divisi (`src/content/divisi/`)
Informasi divisi struktural di bawah HIMASTI.

| Nama Field | Tipe / Widget | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `nama` | String | **Wajib** | Nama lengkap divisi, contoh: *"Pendidikan & Riset"* |
| `slug` | String | **Wajib** | Pengenal URL unik berupa huruf kecil dan tanda hubung, contoh: `"pendidikan-riset"` |
| `ringkasan` | Text | Opsional | Deskripsi singkat peran dan fungsi divisi |
| `tugas` | List | Opsional | Daftar butir rincian tugas/tanggung jawab divisi |
| `kepala` | String | **Wajib** | Nama kepala divisi yang memimpin |
| `urutan` | Number (Int) | **Wajib** | Urutan tata letak divisi pada halaman struktur |

#### C. Program Kerja (`src/content/proker/`)
Daftar kegiatan, workshop, seminar, dan agenda kerja organisasi.

| Nama Field | Tipe / Widget | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `judul` | String | **Wajib** | Nama program kerja |
| `slug` | String | **Wajib** | Pengenal URL unik, contoh: `"company-visit-2026"` |
| `waktu` | String | **Wajib** | Periode pelaksanaan, contoh: *"Q2 2026"*, *"15 November 2026"* |
| `kategori` | Select | **Wajib** | Pilihan: `kunjungan`, `pelatihan`, `kebersamaan`, atau `seminar` |
| `sasaran` | String | Opsional | Target peserta proker |
| `tujuan` | String | Opsional | Hasil yang ingin dicapai melalui kegiatan |
| `status` | Select | **Wajib** | Pilihan: `akan-datang`, `berlangsung`, atau `selesai` |
| `sampul` | Image | Opsional | Gambar poster atau spanduk utama |
| `ringkasan` | Text | **Wajib** | Cuplikan singkat proker untuk kartu beranda |
| `periode` | String | Opsional | Periode pelaksanaan (default: `"2026-2027"`) |
| `body` | Markdown | Opsional | Deskripsi komprehensif, agenda acara, dan rincian teknis |

#### D. Berita (`src/content/berita/`)
Artikel pengumuman, siaran pers, dan liputan kegiatan himpunan.

| Nama Field | Tipe / Widget | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `judul` | String | **Wajib** | Judul utama artikel berita |
| `slug` | String | **Wajib** | URL artikel, contoh: `"pelantikan-pengurus-2026"` |
| `tanggal` | DateTime | **Wajib** | Tanggal publikasi (format: `YYYY-MM-DD`) |
| `penulis` | String | **Wajib** | Nama penulis atau redaksi, contoh: *"Humas HIMASTI"* |
| `kategori` | String | Opsional | Tag kategori (contoh: *"Kegiatan"*, *"Prestasi"*, *"Akademik"*) |
| `sampul` | Image | Opsional | Foto utama artikel |
| `ringkasan` | Text | **Wajib** | Ringkasan isi berita untuk pratinjau kartu berita |
| `body` | Markdown | Opsional | Teks lengkap berita dengan dukungan format Markdown |

#### E. Prestasi (`src/content/prestasi/`)
Kompilasi capaian membanggakan mahasiswa Sistem & Teknologi Informasi.

| Nama Field | Tipe / Widget | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `nama` | String | **Wajib** | Nama kompetisi / penghargaan yang diraih |
| `penerima` | String | **Wajib** | Nama mahasiswa atau nama tim pemenang |
| `tingkat` | String | **Wajib** | Skala prestasi: *"Regional"*, *"Nasional"*, atau *"Internasional"* |
| `tahun` | Number (Int) | **Wajib** | Tahun perolehan prestasi (contoh: `2026`) |
| `foto` | Image | Opsional | Dokumentasi penyerahan trofi/sertifikat |

#### F. Galeri (`src/content/galeri/`)
Arsip visual kegiatan dan momen kebersamaan himpunan.

| Nama Field | Tipe / Widget | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `gambar` | Image | **Wajib** | Berkas foto kegiatan |
| `keterangan` | String | **Wajib** | Judul atau takarir (*caption*) foto |
| `kategori` | String | Opsional | Contoh: *"Kegiatan"*, *"Internal"*, *"Kunjungan"* |
| `tahun` | Number (Int) | Opsional | Tahun pengambilan dokumentasi |

#### G. Pengaturan Situs (`src/content/settings.json`)
Data umum organisasi yang tampil di bagian *footer*, header, dan narahubung:
- `email`: Alamat email resmi sekretariat (misal: `himasti@cyber-univ.ac.id`).
- `alamat`: Lokasi fisik sekretariat di kampus Cyber University.
- `instagram`: Tautan profil akun Instagram resmi.
- `linkedin`: Tautan profil laman LinkedIn resmi.

---

### 4. Panduan Unggah Media & Gambar

- **Direktori Penyimpanan**: Semua media yang diunggah otomatis tersimpan di folder `src/assets/uploads/`.
- **Batas Ukuran Berkas**: Disarankan **maksimal 500 KB per gambar** (ideal antara 100 KB – 300 KB). Gambar berukuran besar akan memperlambat waktu muat situs dan membebani kuota build.
- **Format yang Didukung**: `.webp` (sangat direkomendasikan), `.jpg`/`.jpeg`, atau `.png`.
- Gunakan alat bantu kompresi seperti [TinyPNG](https://tinypng.com/) atau [Squoosh](https://squoosh.app/) sebelum mengunggah.

### 5. Alur Publikasi Konten

1. Saat Anda menekan tombol **Save** / **Publish** di panel admin Sveltia CMS:
   - Sveltia CMS secara otomatis membuat *Git Commit* langsung ke branch `main` repositori GitHub Anda.
2. Webhook pada penyedia hosting (Vercel / Netlify / Cloudflare Pages) akan mendeteksi commit baru tersebut.
3. Proses build otomatis dijalankan oleh server hosting (`npm run build`).
4. Situs publik akan terbarui secara otomatis dalam waktu **1 hingga 3 menit**.

### 6. Pemecahan Masalah (Troubleshooting) Build CMS

Jika setelah menyimpan konten situs tidak kunjung terbarui atau notifikasi build hosting gagal:
- **Periksa Isian Wajib (*Required Fields*)**: Pastikan tidak ada kolom bertanda wajib yang dibiarkan kosong.
- **Format Tanggal**: Pastikan format tanggal pada artikel berita tepat mengikuti pola `YYYY-MM-DD` (contoh: `2026-10-15`).
- **Validasi Slug**: Pastikan karakter slug hanya terdiri dari huruf kecil dan strip (tidak memuat spasi atau karakter khusus `@, #, $, /, \`).
- **Pilihan Dropdown/Enum**: Pada Program Kerja, pastikan kolom kategori dan status dipilih dari opsi yang telah ditentukan.

---

## Cara Menambah Konten via Git (Manual)

Bagi pengembang yang bekerja secara langsung pada repositori lokal, konten dapat ditambahkan secara manual melalui berkas Markdown.

### Menambah Berita
Buat berkas `.md` baru di direktori `src/content/berita/<slug-berita>.md`:

```markdown
---
judul: "Pelatihan Web Modern HIMASTI 2026"
slug: "pelatihan-web-modern-2026"
tanggal: 2026-11-20
penulis: "Divisi Pendidikan & Riset"
kategori: "Pelatihan"
sampul: "../../assets/uploads/workshop-web.jpg"
ringkasan: "HIMASTI mengadakan pelatihan pengembangan website modern menggunakan Astro dan Tailwind CSS."
---

Isi lengkap artikel berita ditulis di sini menggunakan sintaks Markdown biasa.

## Agenda Pelatihan
- Pengenalan Web Statis
- Praktik Komponen Astro
```

### Menambah Program Kerja
Buat berkas `.md` baru di direktori `src/content/proker/<slug-proker>.md`:

```markdown
---
judul: "Study Banding Himpunan"
slug: "study-banding-2026"
waktu: "Q3 2026"
kategori: "kunjungan"
sasaran: "Pengurus HIMASTI"
tujuan: "Mempererat relasi dan bertukar wawasan tata kelola organisasi mahasiswa teknologi."
status: "akan-datang"
ringkasan: "Kegiatan kunjungan studi banding antar universitas di wilayah Jabodetabek."
periode: "2026-2027"
---

Rincian rancangan operasional program kerja dituliskan di sini.
```

### Menambah Pengurus Baru
Buat berkas `.md` baru di `src/content/pengurus/<nama-pengurus>.md`:

```markdown
---
nama: "Nama Anggota Lengkap"
jabatan: "Staf Ahli"
divisi: "Media & Informasi"
angkatan: "2025"
periode: "2026-2027"
urutan: 45
---
```

> [!CAUTION]
> **JANGAN PERNAH MENIMPA DATA PENGURUS PERIODE LAMA!**
> Data pengurus lama berfungsi sebagai arsip sejarah organisasi. Buat berkas baru untuk pengurus yang berbeda dan gunakan field `periode` sebagai pembeda.

### Menambah Dokumentasi Galeri
Buat berkas `.md` di `src/content/galeri/<nama-momen>.md`:

```markdown
---
gambar: "../../assets/uploads/makrab-2026.jpg"
keterangan: "Malam Keakraban Mahasiswa Baru Sistem Informasi 2026"
kategori: "Internal"
tahun: 2026
---
```

> [!IMPORTANT]
> Pastikan berkas gambar fisik telah diletakkan di `src/assets/uploads/` atau `src/assets/` sebelum merujuknya di dalam frontmatter.

---

## Prosedur Pergantian Periode

Saat masa bakti kepengurusan berakhir dan terjadi pergantian kabinet baru, ikuti panduan berikut agar situs tetap tertib:

1. **Pengarsipan Data Pengurus**:
   - Jangan menghapus atau menimpa berkas pengurus lama.
   - Tambahkan berkas pengurus baru untuk periode mendatang (contoh: `periode: "2027-2028"`).
2. **Pembaruan Halaman Struktur**:
   - Sesuaikan visual bagan struktur organisasi di `src/pages/struktur.astro` jika terdapat pemekaran divisi.
3. **Pembaruan Program Kerja**:
   - Ubah status proker periode lama menjadi `selesai`.
   - Masukkan daftar program kerja periode baru dengan status `akan-datang`.
4. **Pembaruan Pengaturan Kontak & Media Sosial**:
   - Perbarui `src/content/settings.json` bila ada perubahan email humas atau nomor sekretariat.
5. **Serah Terima Kredensial & Hak Akses (Handover Teknis)**:
   > [!WARNING]
   > Lakukan serah terima kredensial teknis **SEBELUM** kepengurusan lama resmi demisioner!
   - Tambahkan akun GitHub pengurus baru sebagai Collaborator (Admin/Write).
   - Berikan hak akses dashboard hosting (Vercel/Netlify/Cloudflare) kepada pengurus baru.
   - Serahkan akses manajemen domain/DNS kampus.
   - Hapus hak akses pengurus lama setelah masa transisi selesai.
6. **Pembaruan Dokumentasi**:
   - Perbarui `README.md` jika terdapat perubahan dependensi atau alur kerja.

---

## Panduan Deployment

Situs statis ini dapat dideploy dengan mudah di berbagai platform hosting modern berbasis Jamstack:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: `22.x` (atau `≥ 22.12.0`)

### 1. Vercel
1. Hubungkan akun Vercel dengan repositori GitHub HIMASTI.
2. Vercel akan otomatis mengenali framework **Astro**.
3. Pastikan konfigurasi Build Command bernilai `npm run build` dan Output Directory bernilai `dist`.
4. Tambahkan Environment Variable jika diperlukan.

### 2. Netlify
1. Pilih **Add new site** > **Import an existing project**.
2. Pilih repositori GitHub.
3. Atur build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy site.

### 3. Cloudflare Pages
1. Masuk ke dashboard Cloudflare > **Workers & Pages** > **Create application** > **Pages**.
2. Sambungkan ke repositori GitHub.
3. Pilih preset **Astro** (Build command: `npm run build`, Output: `dist`).
4. Atur Environment Variable `NODE_VERSION` bernilai `22`.

---

## Konfigurasi Wajib Sebelum Live

Sebelum website diluncurkan ke publik dan digunakan secara resmi, pengembang **wajib** mengubah 3 placeholder berikut:

1. **Domain Situs di Astro Config** (`astro.config.mjs`):
   ```javascript
   // Ganti dari domain contoh:
   site: 'https://himasti.example.com',
   // Menjadi domain resmi kampus, contoh:
   site: 'https://himasti.cyber-univ.ac.id',
   ```
2. **Repositori GitHub di CMS Config** (`public/admin/config.yml`):
   ```yaml
   backend:
     name: github
     # Ganti placeholder berikut dengan path repo GitHub asli:
     repo: owner/himasti-website # -> ganti ke misal: himasti-cu/himasti-website
     branch: main
   ```
3. **URL Sitemap di Robots.txt** (`public/robots.txt`):
   ```txt
   # Sesuaikan URL sitemap dengan domain sebenarnya:
   Sitemap: https://himasti.cyber-univ.ac.id/sitemap-index.xml
   ```

---

## Dokumen Pendamping

Dokumen arsitektur dan spesifikasi teknis pelengkap yang wajib dipelajari oleh tim pengembang:

- 📄 [`PRD.md`](./PRD.md) — *Product Requirements Document*: Penjelasan kebutuhan produk, target audiens, dan batasan fungsionalitas.
- 🎨 [`design.md`](./design.md) — *Design System*: Panduan token warna, tipografi, grid responsif, dan prinsip tata letak visual.
- 📋 [`plan.md`](./plan.md) — *Project Plan*: Rencana bertahap, pembagian sprint, dan daftar pencapaian rilis.
- 🤖 [`CLAUDE.md`](./CLAUDE.md) — *AI Assistant Guidelines*: Konvensi penulisan kode, alur Git, dan batasan implementasi.

---

## Lisensi

Hak cipta © 2026 **HIMASTI Cyber University**. Seluruh hak dilindungi undang-undang (*All rights reserved*).
Dikelola oleh Divisi Komunikasi, Media & Teknologi Informasi HIMASTI Cyber University.
