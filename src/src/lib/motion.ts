/**
 * Scroll-linked motion (design.md § 8). Progressive enhancement only:
 * - Without JS, or with prefers-reduced-motion, nothing here runs and every text stays in its final (readable) state.
 * - The `js-motion` class on <html> is set by an inline script in BaseLayout (only when motion is allowed).
 */
const root = document.documentElement;
const motionOK = root.classList.contains('js-motion');

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

// § 8.4 — navbar shrinks slightly after scrolling
const nav = document.getElementById('site-nav');
function updateNav() {
  nav?.setAttribute('data-scrolled', String(window.scrollY > 80));
}

// § 8.2 — words light up (dim -> white) following scroll progress
const litBlocks = motionOK ? Array.from(document.querySelectorAll<HTMLElement>('[data-lit]')) : [];
function updateLit() {
  const vh = window.innerHeight;
  for (const block of litBlocks) {
    const words = block.querySelectorAll<HTMLElement>('.lit-word');
    if (!words.length) continue;
    const rect = block.getBoundingClientRect();
    const p = clamp((vh * 0.9 - rect.top) / (rect.height + vh * 0.35));
    const count = Math.ceil(p * words.length);
    words.forEach((w, i) => w.classList.toggle('is-lit', i < count));
  }
}

// § 8.3 — the timeline line fills down to the viewport centre; every item the line has passed stays lit
const timelines = motionOK ? Array.from(document.querySelectorAll<HTMLElement>('[data-timeline]')) : [];
function updateTimeline() {
  const mid = window.innerHeight / 2;
  for (const tl of timelines) {
    const r = tl.getBoundingClientRect();
    const inView = r.top < window.innerHeight && r.bottom > 0;
    tl.toggleAttribute('data-live', inView);
    if (!inView) continue;

    const spine = tl.querySelector<HTMLElement>('[data-timeline-spine]');
    if (spine) {
      const sr = spine.getBoundingClientRect();
      tl.style.setProperty('--tl-progress', clamp((mid - sr.top) / sr.height).toFixed(4));
    }

    tl.querySelectorAll<HTMLElement>('.tl-item').forEach((item) => {
      const dot = item.querySelector<HTMLElement>('.tl-dot');
      const y = dot ? dot.getBoundingClientRect().top + dot.offsetHeight / 2 : item.getBoundingClientRect().top;
      item.classList.toggle('is-reached', y <= mid);
    });
  }
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateNav();
    updateLit();
    updateTimeline();
    ticking = false;
  });
}

updateNav();
updateLit();
updateTimeline();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
