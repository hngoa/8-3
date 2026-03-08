# 🌸 Happy Women's Day – Interactive 8/3

## Cấu trúc thư mục

```
project/
├── src/                       ← Source code (phát triển)
│   ├── index.html             ← Entry point HTML
│   ├── css/
│   │   ├── base.css           ← CSS variables & global styles
│   │   ├── layer1.css         ← Layer 1: Envelope styles & animations
│   │   └── layer2.css         ← Layer 2: 3D scene, game, chat bubbles
│   └── js/
│       ├── utils.js           ← Shared utilities (rand, lerp, delay...)
│       ├── main.js            ← App orchestrator & scene transitions
│       ├── layer1.js          ← Envelope open logic, hearts, sparkles
│       ├── layer2-3d.js       ← Three.js 3D lily (+ GLB loader hook)
│       ├── layer2-game.js     ← Moving envelope catch game + petals
│       └── layer2-chat.js     ← Falling chat bubbles with 8/3 wishes
├── assets/                    ← Static assets
│   └── lilies.glb             ← (tuỳ chọn) đặt file 3D model vào đây
├── dist/
│   └── happy-womens-day.html  ← Bundled single-file, chạy thẳng
└── README.md
```

## Hướng dẫn sử dụng

### Chạy nhanh (không cần server)
Mở `dist/happy-womens-day.html` trong trình duyệt — xong.

### Chạy từ source
Cần local server do load CDN script. Ví dụ:
```bash
cd src
npx serve .
# hoặc
python3 -m http.server 8080
```

### Thêm model 3D thật (.glb)
1. Đặt `lilies.glb` vào thư mục `assets/`
2. Mở `src/js/layer2-3d.js`
3. Bỏ comment dòng:
   ```js
   // loadGLB('assets/lilies.glb');
   ```
