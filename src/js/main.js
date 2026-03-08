/* main.js – App orchestrator, transitions */

const App = (() => {

  const BI_BURST = ['bi-flower1','bi-flower2','bi-flower3','bi-heart-fill',
                    'bi-suit-heart-fill','bi-stars','bi-balloon-heart-fill','bi-star-fill'];
  const COLORS   = ['#ff89b5','#ffb3cc','#ffdf80','#ff6b9d','#ffd6e7','#f9a8c9'];

  /* ── Layer transition: Layer1 → Layer2 ── */
  async function transitionToLayer2() {
    const overlay = document.getElementById('transOverlay');
    const layer1  = document.getElementById('layer1');
    const layer2  = document.getElementById('layer2');

    // 1. Overlay xuất hiện
    overlay.classList.add('active');
    await Utils.delay(900);

    // 2. Petal burst
    spawnTransitionPetals();
    await Utils.delay(600);

    // 3. Chuyển layer
    layer1.style.opacity = '0';
    layer1.style.display = 'none';
    layer1.classList.remove('active');

    layer2.style.display = 'flex';
    insertLayer2Title();
    Layer2_3D.startRender();

    await Utils.delay(50);
    layer2.style.opacity = '1';
    layer2.classList.add('active');

    // 4. Fade overlay ra
    await Utils.delay(400);
    overlay.classList.remove('active');

    await Utils.delay(300);

    // 5. Reveal hoa lily + message ngay khi vào layer 2
    Layer2_3D.revealLily();
    const msg = document.getElementById('lilyMessage');
    if (msg) msg.classList.add('revealed');

    // 6. Khởi động game + chat (chạy song song với hoa đang trượt lên)
    Layer2_Chat.init();
  }

  function insertLayer2Title() {
    const layer2 = document.getElementById('layer2');
    if (document.querySelector('.l2-title')) return;
    const div = document.createElement('div');
    div.className = 'l2-title';
    div.innerHTML = `
      <h1>Happy Women's Day <i class="bi bi-flower3" style="color:#ffb3cc"></i></h1>
      <p>Chào mừng ngày 8 tháng 3 <i class="bi bi-hearts" style="color:#ff89b5"></i> Ngày của những người phụ nữ tuyệt vời</p>
    `;
    layer2.appendChild(div);
  }

  function spawnTransitionPetals() {
    const container = document.getElementById('transPetals');
    for (let i = 0; i < 22; i++) {
      const color = Utils.pick(COLORS);
      const p = document.createElement('span');
      p.innerHTML = `<i class="bi ${Utils.pick(BI_BURST)}" style="color:${color}"></i>`;
      p.style.cssText = `
        position: absolute;
        font-size: ${Utils.rand(18, 38)}px;
        left: ${Utils.rand(5, 95)}%;
        top: ${Utils.rand(5, 90)}%;
        opacity: 0;
        transform: scale(0) rotate(0deg);
        transition: all ${Utils.rand(0.4, 0.8)}s ${Utils.rand(0, 0.4)}s ease;
        pointer-events: none;
      `;
      container.appendChild(p);
      setTimeout(() => {
        p.style.opacity = '1';
        p.style.transform = `scale(1) rotate(${Utils.rand(-180, 180)}deg)`;
      }, 20);
      setTimeout(() => {
        p.style.opacity = '0';
        p.style.transform = `scale(0) rotate(${Utils.rand(-360, 360)}deg)`;
      }, 600);
      setTimeout(() => p.remove(), 1400);
    }
  }

  /* ── Boot ── */
  function init() {
    Layer1.init();
    Layer2_3D.init();
  }

  return { init, transitionToLayer2 };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
