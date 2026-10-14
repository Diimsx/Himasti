// src/content.config.ts — Astro Content Collections schema
// Matches model from PRD.md § 7 and CMS collections from PRD.md § 5.4

import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ---------- Pengurus ----------
const pengurus = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/pengurus' }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      nama: z.string(),
      jabatan: z.string(),
      divisi: z.string().optional(), // Pengurus inti tidak punya divisi
      angkatan: z.string().optional(),
      periode: z.string(), // e.g. "2026-2027"
      foto: image().optional(),
      urutan: z.number().int().default(0),
    }),
});

// ---------- Divisi ----------
const divisi = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/divisi' }),
  schema: z.object({
    nama: z.string(),
    slug: z.string(),
    ringkasan: z.string().optional(), // [ISI] — to be filled by division heads
    tugas: z.array(z.string()).default([]),
    kepala: z.string(),
    urutan: z.number().int().default(0),
  }),
});

// ---------- Program Kerja ----------
const proker = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/proker' }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      judul: z.string(),
      slug: z.string(),
      waktu: z.string(), // e.g. "Q2 2026", "Sepanjang periode"
      kategori: z.enum(['kunjungan', 'pelatihan', 'kebersamaan', 'seminar']),
      sasaran: z.string().optional(),
      tujuan: z.string().optional(),
      status: z.enum(['akan-datang', 'berlangsung', 'selesai']).default('akan-datang'),
      sampul: image().optional(),
      ringkasan: z.string(),
      periode: z.string().default('2026-2027'),
    }),
});

// ---------- Berita ----------
const berita = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/berita' }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      judul: z.string(),
      slug: z.string(),
      tanggal: z.coerce.date(),
      penulis: z.string(),
      kategori: z.string().optional(),
      sampul: image().optional(),
      ringkasan: z.string(),
    }),
});

// ---------- Prestasi ----------
const prestasi = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/prestasi' }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      nama: z.string(),
      penerima: z.string(),
      tingkat: z.string(), // e.g. "Nasional", "Regional"
      tahun: z.number().int(),
      foto: image().optional(),
    }),
});

// ---------- Galeri ----------
const galeri = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/galeri' }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      gambar: image(),
      keterangan: z.string(),
      kategori: z.string().optional(),
      tahun: z.number().int().optional(),
    }),
});

export const collections = {
  pengurus,
  divisi,
  proker,
  berita,
  prestasi,
  galeri,
};
