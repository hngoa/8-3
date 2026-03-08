/* layer2-3d.js – model-viewer wrapper (thay thế Three.js) */

const Layer2_3D = (() => {

  /* ── Init: tạo model-viewer element ── */
  function init() {
    // model-viewer được tạo động và gắn vào #lily-viewer-wrap
    const wrap = document.getElementById('lilyViewerWrap');
    if (!wrap) return;

    const mv = document.createElement('model-viewer');
    mv.id              = 'lilyViewer';
    mv.setAttribute('src', 'assets/lilies.glb');
    mv.setAttribute('alt', 'Hoa Lily 3D');
    mv.setAttribute('auto-rotate', '');
    mv.setAttribute('camera-controls', '');
    mv.setAttribute('shadow-intensity', '1.2');
    mv.setAttribute('exposure', '1.1');
    mv.setAttribute('auto-rotate-delay', '0');
    mv.setAttribute('rotation-per-second', '30deg');
    wrap.appendChild(mv);
  }

  /* ── Reveal: hiệu ứng slide lên + fade in ── */
  function revealLily() {
    const wrap = document.getElementById('lilyViewerWrap');
    if (!wrap) return;
    // Thêm class để trigger CSS animation
    wrap.classList.add('revealed');
  }

  /* ── startRender / stopRender: giữ interface tương thích với main.js ── */
  function startRender() { /* model-viewer tự render */ }
  function stopRender()  { /* không cần */ }

  return { init, startRender, stopRender, revealLily };
})();
