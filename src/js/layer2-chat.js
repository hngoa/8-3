/* layer2-chat.js – Falling chat bubbles with 8/3 wishes */

const Layer2_Chat = (() => {
  let intervalId = null;
  let slowMode   = false;

  const WISHES = [
    { icon: 'bi-flower1',            text: 'Chúc mừng ngày Quốc tế Phụ nữ 8/3! Chúc chị luôn rạng rỡ và hạnh phúc' },
    { icon: 'bi-flower3',             text: 'Gửi đến những người phụ nữ tuyệt vời – ngày này là của các bạn!' },
    { icon: 'bi-envelope-heart-fill', text: 'Chúc em ngày 8/3 tràn đầy yêu thương, sắc đẹp và nụ cười' },
    { icon: 'bi-flower2',             text: 'Mỗi ngày đều xứng đáng được yêu thương, nhưng hôm nay đặc biệt hơn!' },
    { icon: 'bi-stars',               text: 'Cảm ơn vì đã là người phụ nữ mạnh mẽ và dịu dàng như vậy' },
    { icon: 'bi-gift-fill',            text: 'Chúc chị/em một ngày 8/3 ngập tràn hoa và tình yêu!' },
    { icon: 'bi-heart-fill',           text: 'Phụ nữ – vẻ đẹp của cuộc sống, ánh sáng của yêu thương' },
    { icon: 'bi-leaf-fill',            text: 'Hôm nay và mãi mãi, em xứng đáng được hạnh phúc nhất' },
    { icon: 'bi-star-fill',            text: 'Gửi ngàn yêu thương đến những người phụ nữ đặc biệt trong cuộc đời!' },
    { icon: 'bi-flower3',              text: 'Chúc ngày 8/3 vui vẻ, rạng ngời như những đóa hoa mùa xuân' },
    { icon: 'bi-balloon-heart-fill',   text: 'Em là bông hoa đẹp nhất trong vườn cuộc sống của anh' },
    { icon: 'bi-gem',                  text: 'Một ngày thật đặc biệt cho những người phụ nữ thật đặc biệt!' },
    { icon: 'bi-trophy-fill',          text: 'Chúc mừng ngày của chúng ta – những người phụ nữ kiên cường!' },
    { icon: 'bi-suit-heart-fill',      text: 'Nụ cười của em là món quà đẹp nhất với anh mỗi ngày' },
    { icon: 'bi-flower1',              text: 'Happy International Women\'s Day! You are loved and appreciated' },
    { icon: 'bi-brightness-high-fill', text: 'Chúc em luôn tỏa sáng như những cánh hoa lily xinh đẹp!' },
    { icon: 'bi-heart-pulse-fill',     text: 'Cảm ơn vì tất cả tình yêu thương và sự hy sinh của bạn' },
    { icon: 'bi-flower2',              text: 'Ngày 8/3 – ngày tôn vinh vẻ đẹp và sức mạnh của phụ nữ!' },
  ];

  const ICON_COLORS = ['#ff89b5','#ffb3cc','#ffdf80','#ff6b9d','#ffd6e7','#f9a8c9'];

  let wishIdx = 0;

  function spawnBubble() {
    const container = document.getElementById('chatBubbles');
    const wish = WISHES[wishIdx % WISHES.length];
    wishIdx++;

    const color = Utils.pick(ICON_COLORS);
    const bubble = Utils.el('div', 'chat-bubble');
    const dur = Utils.rand(7, 13);
    const maxLeft = window.innerWidth < 480 ? 40 : (window.innerWidth < 768 ? 48 : 58);
    bubble.style.left = Utils.rand(2, maxLeft) + '%';
    bubble.style.animationDuration = dur + 's';
    bubble.style.animationDelay = '0s';

    bubble.innerHTML = `
      <div class="bubble-header">
        <div class="bubble-avatar"><i class="bi ${wish.icon}" style="color:${color}"></i></div>
        <span class="bubble-name">${wish.name}</span>
      </div>
      <div class="bubble-text">${wish.text} <i class="bi bi-heart-fill" style="color:#ff89b5;font-size:.75em"></i></div>
    `;

    container.appendChild(bubble);
    setTimeout(() => bubble.remove(), (dur + 1) * 1000);
  }

  function init() {
    const isMobile = window.innerWidth < 768;
    const initCount = isMobile ? 2 : 3;
    const interval  = isMobile ? 3000 : 2200;
    for (let i = 0; i < initCount; i++) setTimeout(spawnBubble, i * 1400);
    intervalId = setInterval(spawnBubble, interval);
  }

  function slowDown() {
    if (slowMode) return;
    slowMode = true;
    clearInterval(intervalId);
    setTimeout(() => {
      const container = document.getElementById('chatBubbles');
      const bubble = Utils.el('div', 'chat-bubble');
      bubble.style.left = '50%';
      bubble.style.transform = 'translateX(-50%)';
      bubble.style.animationDuration = '8s';
      bubble.innerHTML = `
        <div class="bubble-header">
          <div class="bubble-avatar"><i class="bi bi-award-fill" style="color:#ffdf80"></i></div>
          <span class="bubble-name">Tất cả mọi người</span>
        </div>
        <div class="bubble-text">
          Chúc mừng ngày 8/3 tuyệt vời nhất! Bạn thật tuyệt!
          <i class="bi bi-stars" style="color:#ffdf80;font-size:.8em"></i>
          <i class="bi bi-heart-fill" style="color:#ff89b5;font-size:.8em"></i>
        </div>
      `;
      container.appendChild(bubble);
      setTimeout(() => bubble.remove(), 9000);
    }, 800);
  }

  return { init, slowDown };
})();
