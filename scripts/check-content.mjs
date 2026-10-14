/**
 * scripts/check-content.mjs
 * 
 * HIMASTI Website - Build-Time Content Guard Script
 * 
 * Deskripsi:
 * Skrip ini melakukan pemindaian (scan) rekursif pada direktori `src/content/` dan `src/pages/`
 * untuk mendeteksi keberadaan konten placeholder seperti `[ISI]` dan `Lorem ipsum`.
 * 
 * Mode Eksekusi:
 * 1. Default (Warn-Only Mode):
 *    - Perintah: `npm run check-content`
 *    - Hanya mencetak daftar placeholder dan peringatan tanpa menggagalkan proses (exit code 0).
 *    - Digunakan selama masa pengembangan (development).
 * 
 * 2. Strict Mode:
 *    - Perintah: `npm run check-content:strict`
 *    - Menghasilkan exit code 1 jika ditemukan placeholder.
 *    - CATATAN CI/CD: Tambahkan `npm run check-content:strict` ke dalam pipeline CI/CD
 *      (misalnya GitHub Actions) sebelum proses deploy ke production (`npm run build`),
 *      agar placeholder konten tidak lolos ke website publik.
 * 
 * 3. Environment Variable Override:
 *    - Jika `ALLOW_PLACEHOLDERS=true` diatur di environment variable, skrip hanya akan
 *      memberikan peringatan tanpa menggagalkan build meskipun dijalankan dengan flag `--strict`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Direktori yang akan dipindai
const TARGET_DIRECTORIES = ['src/content', 'src/pages'];

// Ekstensi file yang didukung
const TARGET_EXTENSIONS = new Set(['.md', '.astro', '.json']);

// Pola teks placeholder yang diperiksa
const PLACEHOLDER_PATTERNS = [
  { name: '[ISI]', regex: /\[isi\]/i },
  { name: 'Lorem ipsum', regex: /lorem\s+ipsum/i },
];

// Opsi konfigurasi dari argumen CLI dan environment variable
const isStrictFlag = process.argv.includes('--strict');
const allowPlaceholders = process.env.ALLOW_PLACEHOLDERS === 'true';
const isStrictMode = isStrictFlag && !allowPlaceholders;

/**
 * Mengumpulkan seluruh file target secara rekursif dari direktori yang ditentukan.
 * @param {string} dirPath
 * @returns {string[]}
 */
function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const filePaths = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      filePaths.push(...scanDirectory(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (TARGET_EXTENSIONS.has(ext)) {
        filePaths.push(fullPath);
      }
    }
  }

  return filePaths;
}

/**
 * Memindai isi sebuah file untuk mencari pola placeholder.
 * @param {string} filePath
 * @returns {Array<{ line: number, pattern: string, preview: string }>}
 */
function checkFileContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  const matches = [];

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.regex.test(line)) {
        matches.push({
          line: lineNumber,
          pattern: pattern.name,
          preview: line.trim(),
        });
      }
    }
  });

  return matches;
}

/**
 * Fungsi utama untuk menjalankan verifikasi konten.
 */
function runContentCheck() {
  console.log('🔍 Memeriksa konten placeholder di src/content/ dan src/pages/...\n');

  let allFiles = [];
  for (const relDir of TARGET_DIRECTORIES) {
    const absoluteDir = path.join(projectRoot, relDir);
    allFiles.push(...scanDirectory(absoluteDir));
  }

  const findings = [];

  for (const filePath of allFiles) {
    const fileMatches = checkFileContent(filePath);
    if (fileMatches.length > 0) {
      const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
      findings.push({
        file: relativePath,
        matches: fileMatches,
      });
    }
  }

  if (findings.length === 0) {
    console.log('✅ Tidak ada konten placeholder ditemukan\n');
    process.exit(0);
  }

  // Tampilkan daftar temuan
  let totalPlaceholders = 0;
  for (const finding of findings) {
    for (const match of finding.matches) {
      totalPlaceholders++;
      const tag = isStrictMode ? '❌ [GAGAL]' : '⚠️ [PERINGATAN]';
      console.log(`${tag} ${finding.file}:${match.line} -> (${match.pattern}) "${match.preview}"`);
    }
  }

  console.log('\n--- Ringkasan Pemeriksaan Konten ---');
  console.log(`${totalPlaceholders} placeholder(s) ditemukan di ${findings.length} file`);

  if (isStrictMode) {
    console.error('\n❌ Build gagal: Konten placeholder masih ditemukan dalam mode ketat (--strict).');
    console.error('Silakan perbarui konten atau jalankan dengan ALLOW_PLACEHOLDERS=true jika ingin mengabaikan.');
    process.exit(1);
  } else {
    if (isStrictFlag && allowPlaceholders) {
      console.log('ℹ️ ALLOW_PLACEHOLDERS=true aktif: Placeholder hanya diperingatkan, build dilanjutkan.');
    } else {
      console.log('ℹ️ Mode peringatan: Jalankan dengan flag --strict untuk validasi ketat pada CI/CD.');
    }
    process.exit(0);
  }
}

runContentCheck();
