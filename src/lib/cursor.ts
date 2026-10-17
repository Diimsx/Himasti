/**
 * Custom round cursor (design.md § 8.6): a navy dot with a white ring that trails the pointer smoothly.
 * - Only for fine pointers (mouse/trackpad) and when motion is allowed; touch devices and
 *   prefers-reduced-motion keep the native cursor untouched.
 * - Grows over interactive elements, shrinks while pressed, and steps aside over text fields
 *   (native I-beam returns there).
 * - Rendered through the Popover API so it stays above the modal <dialog> menu (top layer);
 *   falls back to a plain fixed element when the API is missing.
 * - Decorative: aria-hidden, pointer-events: none. Nothing here affects keyboard or screen-reader use.
 */
const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

if (fine.matches && !reduce.matches) {
  const root = document.documentElement;
  const cursor = document.createElement('div');
  cursor.className = 'site-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<div class="site-cursor__dot"></div>';

  const canPopover = typeof (cursor as HTMLElement & { showPopover?: () => void }).showPopover === 'function';
  if (canPopover) cursor.setAttribute('popover', 'manual');
  document.body.appendChild(cursor);

  // Move to the top layer again (after a modal opens) so the cursor never hides behind it
  const raise = () => {
    if (!canPopover) return;
    try {
      cursor.hidePopover();
      cursor.showPopover();
    } catch {
      /* already in the right state */
    }
  };
  raise();

  const INTERACTIVE = 'a, button, summary, label, [role="button"], [data-cursor="hover"]';
  const TEXTFIELD = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable=""], [contenteditable="true"]';

  let tx = -100, ty = -100; // pointer target
  let x = tx, y = ty;       // rendered position
  let last = performance.now();
  let raf = 0;
  let seen = false;

  const TAU = 70; // ms time constant: higher = floatier

  const frame = (now: number) => {
    const dt = Math.min(64, now - last);
    last = now;
    const k = 1 - Math.exp(-dt / TAU);
    x += (tx - x) * k;
    y += (ty - y) * k;
    cursor.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(frame) : 0;
  };
  const kick = () => {
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  };

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    tx = e.clientX;
    ty = e.clientY;
    if (!seen) { // first move: appear where the pointer is instead of flying in from the corner
      seen = true;
      x = tx; y = ty;
      root.classList.add('has-custom-cursor');
      cursor.classList.add('is-visible');
    }
    const el = e.target instanceof Element ? e.target : null;
    cursor.classList.toggle('is-text', !!el?.closest(TEXTFIELD));
    cursor.classList.toggle('is-hot', !!el?.closest(INTERACTIVE));
    kick();
  }, { passive: true });

  window.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  window.addEventListener('pointerup', () => cursor.classList.remove('is-down'));

  // Hide when the pointer leaves the window
  document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
  document.documentElement.addEventListener('mouseenter', () => seen && cursor.classList.add('is-visible'));

  // Opening the menu puts a <dialog> in the top layer: lift the cursor above it again
  document.addEventListener('click', (e) => {
    if (e.target instanceof Element && e.target.closest('#menu-open')) raise();
  });
}
