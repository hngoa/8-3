/* layer1.js – Envelope scene logic */

const Layer1 = (() => {
  let opened = false;

  /* ── Bootstrap Icon helper ── */
  const BI_HEARTS  = ['bi-heart-fill','bi-flower1','bi-flower2','bi-flower3',
                      'bi-stars','bi-heart-pulse-fill','bi-gem','bi-star-fill',
                      'bi-balloon-heart-fill','bi-suit-heart-fill'];
  const BI_SPARKLE = ['bi-stars','bi-star-fill','bi-heart-fill',
                      'bi-suit-heart-fill','bi-flower3','bi-flower1'];
  const COLORS     = ['#ff89b5','#e0457b','#ffb3cc','#f9a8c9',
                      '#ff6b9d','#ffd6e7','#c9006b','#ff4d94','#ffdf80'];

  function biIcon(cls, color) {
    const el = document.createElement('span');
    el.innerHTML = `<i class="bi ${cls}" style="color:${color || Utils.pick(COLORS)}"></i>`;
    return el.firstElementChild;
  }

  /* ── Spawn floating hearts in background ── */
  function spawnHearts() {
    const container = document.getElementById('heartsBg');

    function spawn() {
      const wrap = Utils.el('div', 'heart-float');
      const icon = biIcon(Utils.pick(BI_HEARTS));
      wrap.appendChild(icon);
      wrap.style.left   = Utils.rand(2, 96) + '%';
      wrap.style.bottom = '-50px';
      wrap.style.fontSize = Utils.rand(14, 34) + 'px';
      const dur = Utils.rand(5, 11);
      wrap.style.animationDuration = dur + 's';
      wrap.style.animationDelay   = Utils.rand(0, 2) + 's';
      wrap.style.opacity = '0';
      container.appendChild(wrap);
      setTimeout(() => wrap.remove(), (dur + 2) * 1000);
    }

    for (let i = 0; i < 14; i++) setTimeout(spawn, i * 400);
    setInterval(spawn, 600);
  }

  /* ── Sparkle burst at position ── */
  function sparkle(x, y, container) {
    for (let i = 0; i < 7; i++) {
      const s = Utils.el('span', 'sparkle');
      const icon = biIcon(Utils.pick(BI_SPARKLE));
      s.appendChild(icon);
      const angle = Utils.rand(0, 360);
      const dist  = Utils.rand(40, 90);
      s.style.position = 'absolute';
      s.style.left = x + 'px';
      s.style.top  = y + 'px';
      s.style.fontSize = Utils.rand(16, 26) + 'px';
      s.style.zIndex = '50';
      s.style.pointerEvents = 'none';
      s.style.animationDelay = Utils.rand(0, 0.2) + 's';
      container.appendChild(s);
      s.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
      setTimeout(() => s.remove(), 700);
    }
  }

  /* ── Open envelope sequence ── */
  async function openEnvelope() {
    if (opened) return;
    opened = true;

    const wrap   = document.getElementById('envelopeWrap');
    const flap   = document.getElementById('envFlap');
    const seal   = document.getElementById('envSeal');
    const letter = document.getElementById('envLetter');
    const layer1 = document.getElementById('layer1');

    document.getElementById('envelope').style.animation = 'none';
    seal.classList.add('popped');

    const sealRect = seal.getBoundingClientRect();
    sparkle(sealRect.left + sealRect.width/2, sealRect.top + sealRect.height/2, layer1);

    await Utils.delay(300);
    flap.classList.add('open');
    await Utils.delay(500);
    letter.classList.add('slide-out');
    await Utils.delay(700);

    const envRect = wrap.getBoundingClientRect();
    sparkle(envRect.left + envRect.width/2, envRect.top + 40, layer1);
    sparkle(envRect.left + 30, envRect.top + envRect.height/2, layer1);
    sparkle(envRect.right - 30, envRect.top + envRect.height/2, layer1);

    await Utils.delay(800);
    App.transitionToLayer2();
  }

  /* ── Init ── */
  function init() {
    spawnHearts();
    const wrap = document.getElementById('envelopeWrap');
    wrap.addEventListener('click', openEnvelope);
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openEnvelope();
    });
  }

  return { init };
})();
