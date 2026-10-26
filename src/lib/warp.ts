/**
 * Gerak berbasis kecepatan scroll (halaman Tentang).
 *
 * Mengukur kecepatan scroll per frame, menghaluskannya (naik cepat, turun pelan), lalu menulis nilainya
 * ke variabel CSS `--v` (−1…1) pada elemen `[data-warp]` yang sedang terlihat. CSS-lah yang mengubah `--v`
 * menjadi transform (huruf bergelombang, ubin miring, angka miring). Saat scroll berhenti `--v` kembali ke 0,
 * sehingga teks selalu berakhir di keadaan yang terbaca.
 *
 * - Hanya berjalan bila kelas `js-motion` aktif di <html> (diset BaseLayout hanya jika motion diizinkan).
 * - Hanya elemen yang terlihat di layar yang ditulis; loop berhenti sendiri saat diam (tanpa rAF menganggur).
 * - Hanya menyentuh custom property; tidak membaca layout, jadi tidak memicu reflow.
 */
export {};

const root = document.documentElement;
const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-warp]'));

if (root.classList.contains('js-motion') && targets.length > 0) {
  const FULL_SPEED = 60; // px per frame yang dianggap v = 1
  const ATTACK = 0.22; // seberapa cepat v mengikuti saat scroll mempercepat
  const RELEASE = 0.07; // seberapa pelan v kembali ke 0 saat melambat
  const EPS = 0.002;

  const visible = new Set<HTMLElement>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          visible.add(el);
        } else {
          visible.delete(el);
          el.style.removeProperty('--v');
          el.removeAttribute('data-warping');
        }
      }
    },
    { rootMargin: '15% 0px' }
  );
  targets.forEach((el) => io.observe(el));

  const write = (value: number) => {
    const text = value.toFixed(3);
    const moving = Math.abs(value) > 0.01;
    visible.forEach((el) => {
      el.style.setProperty('--v', text);
      el.toggleAttribute('data-warping', moving); // will-change hanya selama bergerak
    });
  };

  // Selisih scroll dikumpulkan di event `scroll`, lalu dikonsumsi satu kali per frame.
  // (Jangan membaca scrollY ulang di awal loop: itu membuat selisih selalu 0 dan efeknya mati.)
  let prevY = window.scrollY;
  let pending = 0;
  let v = 0;
  let running = false;

  const frame = () => {
    const dy = pending;
    pending = 0;

    const target = Math.max(-1, Math.min(1, dy / FULL_SPEED));
    v += (target - v) * (Math.abs(target) > Math.abs(v) ? ATTACK : RELEASE);

    if (Math.abs(v) < EPS && Math.abs(target) < EPS) {
      v = 0;
      write(0);
      running = false;
      return;
    }
    write(v);
    requestAnimationFrame(frame);
  };

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      pending += y - prevY;
      prevY = y;
      if (running) return;
      running = true;
      requestAnimationFrame(frame);
    },
    { passive: true }
  );
}
