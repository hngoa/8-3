/* layer2-game.js – Moving envelope catch game */

const Layer2_Game = (() => {
  let x, y, vx, vy;

  /* ── Responsive helpers ── */
  function isMobile()    { return window.innerWidth < 768; }
  function isLandscape() { return window.innerWidth > window.innerHeight && window.innerHeight < 500; }
  function petalCount()  { return isMobile() ? 5 : (isLandscape() ? 3 : 10); }
  function petalInterval(){ return isMobile() ? 1200 : (isLandscape() ? 2000 : 700); }
  function bubbleLeftMax(){ return isMobile() ? 45 : 58; }
  let animId = null;
  let caught = false;

  const SPEED_BASE   = 1.8;
  const SPEED_MAX    = 5.5;
  const EVADE_RADIUS = 180;
  const BOUNCE_DAMP  = 0.98;

  let cursorX = -999, cursorY = -999;
  let envW = 100, envH = 80;

  const BI_BURST  = ['bi-heart-fill','bi-flower1','bi-flower3','bi-stars',
                     'bi-suit-heart-fill','bi-star-fill','bi-balloon-heart-fill','bi-gem'];
  const BI_PETALS = ['bi-flower1','bi-flower2','bi-flower3',
                     'bi-heart-fill','bi-leaf-fill','bi-star-fill'];
  const COLORS    = ['#ff89b5','#e0457b','#ffb3cc','#f9a8c9',
                     '#ff6b9d','#ffd6e7','#ffdf80','#c9006b'];

  /* ── Init position ── */
  function reset() {
    const W = window.innerWidth, H = window.innerHeight;
    x = Utils.rand(envW, W - envW);
    y = Utils.rand(envH, H - envH);
    const angle = Utils.rand(0, Math.PI * 2);
    const speed = Utils.rand(SPEED_BASE, SPEED_BASE + 1.5);
    vx = Math.cos(angle) * speed;
    vy = Math.sin(angle) * speed;
    caught = false;
  }

  /* ── Track cursor ── */
  function trackCursor() {
    document.getElementById('layer2').addEventListener('mousemove', e => {
      cursorX = e.clientX; cursorY = e.clientY;
    });
  }

  /* ── Move loop ── */
  function moveLoop() {
    if (caught) return;
    const W = window.innerWidth, H = window.innerHeight;
    const env = document.getElementById('movingEnv');

    const dx = x - cursorX, dy = y - cursorY;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < EVADE_RADIUS && dist > 1) {
      const evadeForce = (EVADE_RADIUS - dist) / EVADE_RADIUS;
      vx += (dx / dist) * evadeForce * 1.2;
      vy += (dy / dist) * evadeForce * 1.2;
    }

    const speed = Math.sqrt(vx*vx + vy*vy);
    if (speed > SPEED_MAX) { vx = (vx/speed)*SPEED_MAX; vy = (vy/speed)*SPEED_MAX; }
    if (speed < SPEED_BASE * 0.5) { vx *= 1.05; vy *= 1.05; }

    vx *= BOUNCE_DAMP; vy *= BOUNCE_DAMP;
    x += vx; y += vy;

    if (x < envW)     { x = envW;     vx =  Math.abs(vx); }
    if (x > W - envW) { x = W - envW; vx = -Math.abs(vx); }
    if (y < envH)     { y = envH;     vy =  Math.abs(vy); }
    if (y > H - envH) { y = H - envH; vy = -Math.abs(vy); }

    const tilt = Utils.clamp(vx * 3, -25, 25);
    env.style.left = x + 'px';
    env.style.top  = y + 'px';
    env.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`;

    animId = requestAnimationFrame(moveLoop);
  }

  /* ── Click to catch ── */
  function handleCatch() {
    if (caught) return;
    caught = true;
    cancelAnimationFrame(animId);

    const env    = document.getElementById('movingEnv');
    const layer2 = document.getElementById('layer2');
    env.classList.add('caught');

    // BI icon burst
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('span');
      const color = Utils.pick(COLORS);
      s.innerHTML = `<i class="bi ${Utils.pick(BI_BURST)}" style="color:${color}"></i>`;
      const a = (i / 14) * Math.PI * 2;
      const r = Utils.rand(60, 140);
      Object.assign(s.style, {
        position: 'absolute', left: x+'px', top: y+'px',
        fontSize: Utils.rand(18, 32)+'px', zIndex: '60',
        transition: 'transform 0.65s ease, opacity 0.65s ease',
        pointerEvents: 'none', display: 'block'
      });
      layer2.appendChild(s);
      setTimeout(() => {
        s.style.transform = `translate(${Math.cos(a)*r}px,${Math.sin(a)*r}px) scale(0) rotate(180deg)`;
        s.style.opacity = '0';
      }, 20);
      setTimeout(() => s.remove(), 800);
    }

    setTimeout(() => {
      document.getElementById('caughtMsg').classList.add('show');
      setTimeout(() => Layer2_Chat.slowDown(), 1500);
    }, 500);
  }

  /* ── Falling petals (BI icons) ── */
  function spawnPetals() {
    const container = document.getElementById('fallingPetals');

    function spawn() {
      const color = Utils.pick(COLORS);
      const p = document.createElement('div');
      p.className = 'petal';
      p.innerHTML = `<i class="bi ${Utils.pick(BI_PETALS)}" style="color:${color}"></i>`;
      p.style.left = Utils.rand(0, 98) + '%';
      const dur = Utils.rand(5, 12);
      p.style.animationDuration = dur + 's';
      p.style.animationDelay   = Utils.rand(0, 1) + 's';
      p.style.fontSize = Utils.rand(14, 32) + 'px';
      container.appendChild(p);
      setTimeout(() => p.remove(), (dur + 2) * 1000);
    }

    const initCount = petalCount();
    for (let i = 0; i < initCount; i++) setTimeout(spawn, i * 300);
    setInterval(spawn, petalInterval());
    window.addEventListener('resize', () => {}); // re-uses interval
  }

  /* ── Init ── */
  function init() {
    reset();
    trackCursor();
    spawnPetals();

    const env = document.getElementById('movingEnv');
    env.style.left = x + 'px';
    env.style.top  = y + 'px';
    env.addEventListener('click', handleCatch);
    env.addEventListener('touchstart', e => { e.preventDefault(); handleCatch(); }, { passive: false });
    moveLoop();
  }

  return { init };
})();
