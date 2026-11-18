# Project Setup Planning: ElysiaJS + Drizzle ORM + MySQL with Bun

Dokumen perencanaan high-level ini dirancang sebagai panduan implementasi untuk developer atau AI model dalam membangun fondasi proyek backend di direktori ini.

---

## 1. Ringkasan Proyek (Overview)
Membangun template/fondasi backend API modern berbasis TypeScript yang cepat dan ringan dengan menggunakan **Bun runtime**, framework **ElysiaJS**, ORM **Drizzle**, dan basis data **MySQL**.

---

## 2. Tech Stack & Dependencies
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Web Framework**: [ElysiaJS](https://elysiajs.com/)
- **ORM & Migration Tool**: [Drizzle ORM](https://orm.drizzle.team/) & `drizzle-kit`
- **Database Driver**: `mysql2`
- **Language**: TypeScript

---

## 3. Rencana Implementasi (High-Level Steps)

### Fase 1: Inisialisasi Proyek & Instalasi Dependency
- Inisialisasi proyek baru berbasis Bun di root folder.
- Tambahkan dependensi utama:
  - `elysia`
  - `drizzle-orm`
  - `mysql2`
- Tambahkan dependensi development:
  - `drizzle-kit`
  - `@types/bun` (bila diperlukan)

### Fase 2: Konfigurasi Environment & Konfigurasi Tooling
- Buat template konfigurasi environment (`.env.example` dan `.env` lokal):
  - Konfigurasi variabel koneksi MySQL (`DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`, atau `DATABASE_URL`).
- Siapkan file konfigurasi `drizzle.config.ts`:
  - Tentukan dialect `mysql`.
  - Atur path untuk file schema (`./src/db/schema.ts`) dan output migrasi (`./drizzle`).
- Siapkan `tsconfig.json` yang sesuai untuk lingkungan Bun dan Elysia.

### Fase 3: Struktur Direktori & Basis Data (Drizzle + MySQL)
- Bangun struktur folder modular sederhana, misalnya:
  ```text
  src/
  ├── db/
  │   ├── index.ts       # Inisialisasi koneksi Drizzle dengan mysql2
  │   └── schema.ts      # Definisi schema/tabel database
  └── index.ts           # Entry point server Elysia
  ```
- Definisikan tabel contoh pada `schema.ts` (misal: tabel sederhana `users` atau `items`) untuk memvalidasi setup ORM.
- Tambahkan npm scripts di `package.json` untuk manajemen database:
  - Script generate migrasi (`drizzle-kit generate`).
  - Script eksekusi migrasi / push schema (`drizzle-kit push` / `drizzle-kit migrate`).
  - Script Drizzle Studio (`drizzle-kit studio`).

### Fase 4: Server Setup (ElysiaJS)
- Buat entry point server di `src/index.ts`.
- Inisialisasi instance Elysia app:
  - Tambahkan route dasar / health check (`GET /` atau `GET /health`).
  - Buat contoh route yang berinteraksi dengan database menggunakan Drizzle.
- Konfigurasikan listener port (default `3000` atau via `process.env.PORT`).
- Tambahkan script dev di `package.json` (misalnya: `bun run --watch src/index.ts`).

### Fase 5: Verifikasi & Testing
- Pastikan server dapat berjalan dengan lancar via `bun run dev`.
- Verifikasi endpoint health check merespons dengan benar.
- Verifikasi koneksi ke instance MySQL dan pastikan script migrasi Drizzle dapat dieksekusi tanpa error.

---

## 4. Kriteria Keberhasilan (Acceptance Criteria)
1. Proyek terinisialisasi bersih menggunakan Bun di direktori ini.
2. Seluruh dependensi (`elysia`, `drizzle-orm`, `mysql2`, `drizzle-kit`) terpasang di `package.json`.
3. File konfigurasi `.env.example`, `drizzle.config.ts`, dan `tsconfig.json` tersedia dan terkonfigurasi.
4. Koneksi database via Drizzle ORM terstruktur rapi dan siap pakai.
5. Server Elysia berjalan normal dan dapat merespons request HTTP.
