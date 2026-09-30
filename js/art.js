/* =====================================================================
   ART — procedural illustrations used for tiles and project media.
   Each painter draws into a canvas of any size. When a photo exists in
   /assets for a media slot, the photo is shown on top of the drawing.
   ===================================================================== */
(function () {
  const TAU = Math.PI * 2;

  function rng(seed) {
    let a = seed | 0;
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const lin = (g, x0, y0, x1, y1, stops) => {
    const gr = g.createLinearGradient(x0, y0, x1, y1);
    stops.forEach(([o, c]) => gr.addColorStop(o, c));
    return gr;
  };
  const rad = (g, x, y, r0, r1, stops) => {
    const gr = g.createRadialGradient(x, y, r0, x, y, r1);
    stops.forEach(([o, c]) => gr.addColorStop(o, c));
    return gr;
  };
  const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };
  const ridge = (g, W, H, y0, amp, freq, color, seed) => {
    const r = rng(seed);
    const ph = r() * 10;
    g.fillStyle = color; g.beginPath(); g.moveTo(0, H);
    for (let x = 0; x <= W; x += W / 60) {
      const t = x / W;
      g.lineTo(x, y0 - (Math.sin(t * freq + ph) * 0.5 + Math.sin(t * freq * 2.3 + ph * 2) * 0.3 + Math.sin(t * freq * 5.1) * 0.12) * amp);
    }
    g.lineTo(W, H); g.fill();
  };

  /* ---------- ECE World pixel map ---------- */
  function world(c) {
    const g = c.getContext('2d'), cs = Math.max(3, Math.round(c.width / 64)), cols = Math.ceil(c.width / cs), rows = Math.ceil(c.height / cs), r = rng(7);
    g.imageSmoothingEnabled = false;
    const px = (x, y, col) => { g.fillStyle = col; g.fillRect(x * cs, y * cs, cs, cs); };
    const grass = ['#5aa941', '#52a03b', '#62b348', '#4e9a37'];
    const sw = Math.round(cols * 0.24);
    const shore = y => sw + Math.round(Math.sin(y * 0.35) * 1.6 + Math.sin(y * 0.9) * 0.8);
    const midY = Math.round(rows * 0.5), midX = Math.round(cols * 0.6);
    const isPath = (x, y) => (y >= midY && y <= midY + 1 && x > shore(y) + 1) || (x >= midX && x <= midX + 1);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const sx = shore(y);
      if (x < sx) px(x, y, r() < 0.06 ? '#8cc3f3' : (x + y) % 7 === 0 ? '#3886df' : '#2f79d4');
      else if (x === sx) px(x, y, '#e3cf8c');
      else if (isPath(x, y)) px(x, y, r() < 0.15 ? '#c9b375' : '#dac78d');
      else px(x, y, grass[(r() * grass.length) | 0]);
    }
    for (let y = midY - 4; y <= midY + 5; y++) for (let x = midX - 4; x <= midX + 5; x++) px(x, y, (x + y) % 2 ? '#cfc8ae' : '#c3bb9f');
    for (let y = midY - 1; y <= midY + 2; y++) for (let x = midX - 1; x <= midX + 2; x++) px(x, y, '#5aa6ea');
    const house = (hx, hy, roof) => {
      for (let y = 0; y < 3; y++) for (let x = 0; x < 6; x++) px(hx + x, hy + y, roof);
      for (let y = 3; y < 6; y++) for (let x = 0; x < 6; x++) px(hx + x, hy + y, '#efe2c2');
      px(hx + 2, hy + 4, '#7a4b2a'); px(hx + 2, hy + 5, '#7a4b2a'); px(hx + 4, hy + 3, '#79b7ea');
    };
    house(midX + 8, midY - 12, '#c8473b'); house(midX + 12, midY + 7, '#3b6fc8'); house(midX - 13, midY + 7, '#c8473b');
    for (let i = 0; i < cols * rows / 40; i++) {
      const tx = sw + 3 + ((r() * (cols - sw - 4)) | 0), ty = (r() * (rows - 3)) | 0;
      if (isPath(tx, ty) || isPath(tx + 2, ty + 2) || isPath(tx + 1, ty + 3) || (Math.abs(tx - midX) < 7 && Math.abs(ty - midY) < 7)) continue;
      for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) if (!(x !== 1 && y !== 1 && r() < 0.6)) px(tx + x, ty + y, '#1f6a2b');
      px(tx + 1, ty + 1, '#2f8a3a'); px(tx, ty, '#57b04b'); px(tx + 1, ty + 3, '#3a2718');
    }
  }

  /* ---------- Rover in the desert (home tile) ---------- */
  function rover(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height, r = rng(11);
    g.fillStyle = lin(g, 0, 0, 0, H, [[0, '#f7c98a'], [0.4, '#ef9950'], [1, '#b4521d']]); g.fillRect(0, 0, W, H);
    g.fillStyle = rad(g, W * 0.78, H * 0.28, 0, W * 0.5, [[0, 'rgba(255,244,215,.8)'], [1, 'rgba(255,244,215,0)']]); g.fillRect(0, 0, W, H);
    const dune = (y0, amp, col, f) => {
      g.fillStyle = col; g.beginPath(); g.moveTo(0, H);
      for (let x = 0; x <= W; x += 8) g.lineTo(x, y0 + Math.sin(x * f + y0) * amp + Math.sin(x * f * 2.7) * amp * 0.3);
      g.lineTo(W, H); g.fill();
    };
    dune(H * 0.52, H * 0.035, '#e48a45', 12 / W); dune(H * 0.64, H * 0.045, '#cf6a2e', 9 / W); dune(H * 0.8, H * 0.03, '#ad4c1c', 14 / W);
    const cx = W * 0.52, gy = H * 0.9, R = H * 0.115;
    g.fillStyle = 'rgba(60,20,5,.45)'; g.beginPath(); g.ellipse(cx, gy + 6, W * 0.26, H * 0.035, 0, 0, TAU); g.fill();
    g.fillStyle = '#232120'; g.fillRect(cx - W * 0.2, gy - R * 2.4, W * 0.4, R * 1.1);
    g.fillStyle = '#2f7a3b'; g.fillRect(cx - W * 0.16, gy - R * 3.0, W * 0.3, R * 0.6);
    for (let i = 0; i < 9; i++) { g.fillStyle = i % 3 ? '#151515' : '#c9c9c9'; g.fillRect(cx - W * 0.15 + i * W * 0.032, gy - R * 2.95, W * 0.02, R * 0.25); }
    g.lineWidth = Math.max(2, W / 240);
    g.strokeStyle = '#d23c2c'; g.beginPath(); g.moveTo(cx - W * 0.1, gy - R * 2.7); g.bezierCurveTo(cx, gy - R * 4, cx + W * 0.1, gy - R * 3.4, cx + W * 0.06, gy - R * 2.6); g.stroke();
    g.strokeStyle = '#2f5fd0'; g.beginPath(); g.moveTo(cx - W * 0.05, gy - R * 2.7); g.bezierCurveTo(cx, gy - R * 3.6, cx + W * 0.04, gy - R * 3.3, cx + W * 0.1, gy - R * 2.7); g.stroke();
    g.fillStyle = '#1b1a19'; g.fillRect(cx - W * 0.03, gy - R * 5.2, W * 0.018, R * 2.3);
    g.fillStyle = '#111'; g.fillRect(cx - W * 0.07, gy - R * 5.8, W * 0.09, R * 0.75);
    g.fillStyle = '#3a6fd8'; g.beginPath(); g.arc(cx + W * 0.005, gy - R * 5.42, R * 0.2, 0, TAU); g.fill();
    g.strokeStyle = '#1b1a19'; g.lineWidth = W / 100; g.beginPath(); g.moveTo(cx + W * 0.16, gy - R * 2.2); g.lineTo(cx + W * 0.25, gy - R * 3.6); g.lineTo(cx + W * 0.3, gy - R * 2.4); g.stroke();
    for (const k of [-0.15, 0, 0.15]) {
      const wx = cx + W * k;
      g.fillStyle = '#1a1817'; g.beginPath(); g.arc(wx, gy - R, R, 0, TAU); g.fill();
      g.strokeStyle = '#3d3a37'; g.lineWidth = Math.max(2, W / 240);
      for (let a = 0; a < 12; a++) { const an = a / 12 * TAU; g.beginPath(); g.moveTo(wx + Math.cos(an) * R * 0.75, gy - R + Math.sin(an) * R * 0.75); g.lineTo(wx + Math.cos(an) * R, gy - R + Math.sin(an) * R); g.stroke(); }
      g.fillStyle = '#6d6a66'; g.beginPath(); g.arc(wx, gy - R, R * 0.28, 0, TAU); g.fill();
    }
    for (let i = 0; i < 90; i++) { g.fillStyle = `rgba(255,220,180,${r() * 0.25})`; g.beginPath(); g.arc(r() * W, H * 0.6 + r() * H * 0.4, r() * 2.5, 0, TAU); g.fill(); }
  }

  /* ---------- Self-balancing robot ---------- */
  function balancer(g, cx, base, s, body, accent, wheel) {
    // wheels
    for (const dx of [-0.34, 0.34]) {
      g.fillStyle = wheel; g.beginPath(); g.ellipse(cx + dx * s, base - 0.2 * s, 0.1 * s, 0.2 * s, 0, 0, TAU); g.fill();
      g.fillStyle = '#9aa0a6'; g.beginPath(); g.ellipse(cx + dx * s, base - 0.2 * s, 0.035 * s, 0.07 * s, 0, 0, TAU); g.fill();
    }
    // axle & body
    g.fillStyle = '#2a2a2a'; g.fillRect(cx - 0.3 * s, base - 0.23 * s, 0.6 * s, 0.05 * s);
    g.fillStyle = body; rr(g, cx - 0.24 * s, base - 0.62 * s, 0.48 * s, 0.4 * s, 0.04 * s); g.fill();
    g.fillStyle = accent; rr(g, cx - 0.22 * s, base - 0.95 * s, 0.44 * s, 0.3 * s, 0.03 * s); g.fill();
    // PCB details
    g.fillStyle = '#e6e6e6'; g.beginPath(); g.arc(cx, base - 0.44 * s, 0.1 * s, 0, TAU); g.fill();
    g.fillStyle = '#111'; for (let i = 0; i < 6; i++) g.fillRect(cx - 0.18 * s + i * 0.065 * s, base - 0.9 * s, 0.035 * s, 0.05 * s);
    g.fillStyle = '#d4a93a'; g.fillRect(cx - 0.18 * s, base - 0.78 * s, 0.36 * s, 0.03 * s);
  }
  function gyrobotBlue(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.clearRect(0, 0, W, H);
    balancer(g, W / 2, H * 0.92, Math.min(W * 0.9, H * 0.85), '#2359d6', '#1f5fe0', '#161616');
  }
  function gyrobotOrange(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.clearRect(0, 0, W, H);
    g.save(); g.translate(W / 2, H * 0.9); g.rotate(-0.25); g.translate(-W / 2, -H * 0.9);
    balancer(g, W / 2, H * 0.9, Math.min(W * 0.85, H * 0.8), '#e0572b', '#2c2c2c', '#1b1b1b');
    g.restore();
    g.strokeStyle = '#222'; g.lineWidth = Math.max(2, W / 120);
    g.beginPath(); g.moveTo(W * 0.62, H * 0.2); g.bezierCurveTo(W * 0.4, H * 0.05, W * 0.2, H * 0.2, 0, H * 0.1); g.stroke();
  }
  function gyrobotVideo(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.fillStyle = lin(g, 0, 0, W, H, [[0, '#d8d2c6'], [0.6, '#bdb4a6'], [1, '#8f8578']]); g.fillRect(0, 0, W, H);
    g.fillStyle = lin(g, W * 0.72, 0, W, 0, [[0, 'rgba(220,235,245,.2)'], [1, 'rgba(240,250,255,.9)']]); g.fillRect(W * 0.72, 0, W * 0.28, H * 0.8);
    g.fillStyle = '#6d5a47'; g.fillRect(0, H * 0.78, W, H * 0.22);
    g.fillStyle = '#3b3b40'; rr(g, W * 0.12, H * 0.52, W * 0.3, H * 0.28, 8); g.fill();
    g.fillStyle = '#f2f2f2'; rr(g, W * 0.3, H * 0.3, W * 0.2, H * 0.5, 40); g.fill();
    g.fillStyle = '#e4c3a6'; g.beginPath(); g.arc(W * 0.4, H * 0.22, H * 0.1, 0, TAU); g.fill();
    g.fillStyle = '#5a3e2b'; g.beginPath(); g.arc(W * 0.4, H * 0.18, H * 0.09, Math.PI, TAU); g.fill();
    balancer(g, W * 0.64, H * 0.8, H * 0.35, '#2359d6', '#1f5fe0', '#161616');
    g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.arc(W / 2, H / 2, H * 0.13, 0, TAU); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.moveTo(W / 2 - H * 0.04, H / 2 - H * 0.06); g.lineTo(W / 2 + H * 0.06, H / 2); g.lineTo(W / 2 - H * 0.04, H / 2 + H * 0.06); g.fill();
  }
  function gyrobotTile(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.fillStyle = lin(g, 0, 0, W, H, [[0, '#123a78'], [1, '#0a2552']]); g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(160,200,255,.14)'; g.lineWidth = 1;
    for (let x = 0; x < W; x += W / 24) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (let y = 0; y < H; y += W / 24) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.strokeStyle = 'rgba(210,230,255,.55)'; g.lineWidth = Math.max(1, W / 300);
    const cx = W * 0.36, cy = H * 0.62, R = H * 0.3;
    g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.stroke();
    for (let a = 0; a < 16; a++) { const an = a / 16 * TAU; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(an) * R, cy + Math.sin(an) * R); g.stroke(); }
    g.beginPath(); g.moveTo(W * 0.05, cy); g.lineTo(W * 0.95, cy); g.stroke();
    balancer(g, W * 0.72, H * 0.95, H * 0.6, '#7a4a2a', '#5c3a22', '#231a14');
  }

  /* ---------- Rover kit (transparent) & workshop ---------- */
  function roverKit(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height, s = Math.min(W, H * 1.1);
    g.clearRect(0, 0, W, H);
    const cx = W / 2, by = H * 0.86;
    g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(cx, by + s * 0.02, s * 0.45, s * 0.05, 0, 0, TAU); g.fill();
    g.fillStyle = '#1d1d1f'; rr(g, cx - s * 0.36, by - s * 0.26, s * 0.72, s * 0.12, 6); g.fill();
    g.fillStyle = '#2e7d32'; rr(g, cx - s * 0.1, by - s * 0.52, s * 0.4, s * 0.26, 6); g.fill();
    g.fillStyle = '#f2c230'; g.fillRect(cx - s * 0.06, by - s * 0.48, s * 0.32, s * 0.04);
    g.fillStyle = '#c62828'; g.fillRect(cx + s * 0.02, by - s * 0.4, s * 0.12, s * 0.08);
    g.fillStyle = '#222'; rr(g, cx - s * 0.36, by - s * 0.66, s * 0.2, s * 0.16, 6); g.fill();
    g.fillStyle = '#ddd'; g.beginPath(); g.arc(cx - s * 0.31, by - s * 0.58, s * 0.035, 0, TAU); g.arc(cx - s * 0.21, by - s * 0.58, s * 0.035, 0, TAU); g.fill();
    g.fillStyle = '#333'; g.fillRect(cx - s * 0.27, by - s * 0.5, s * 0.03, s * 0.25);
    for (const [dx, sc] of [[-0.3, 1], [0.3, 1], [-0.18, 0.85], [0.42, 0.85]]) {
      const x = cx + dx * s, r = s * 0.1 * sc;
      g.fillStyle = '#1565c0'; g.beginPath(); g.arc(x, by - r * 0.9, r, 0, TAU); g.fill();
      g.fillStyle = '#0d47a1'; g.beginPath(); g.arc(x, by - r * 0.9, r * 0.55, 0, TAU); g.fill();
      g.fillStyle = '#90caf9'; g.beginPath(); g.arc(x, by - r * 0.9, r * 0.18, 0, TAU); g.fill();
    }
  }
  function components(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height, r = rng(5);
    g.fillStyle = '#f4f4f2'; g.fillRect(0, 0, W, H);
    const cols = ['#2e7d32', '#1976d2', '#e53935', '#1565c0', '#fbc02d', '#212121', '#43a047', '#0288d1'];
    for (let i = 0; i < 26; i++) {
      const w = W * (0.06 + r() * 0.16), h = H * (0.05 + r() * 0.14), x = r() * (W - w), y = r() * (H - h);
      g.save(); g.translate(x + w / 2, y + h / 2); g.rotate((r() - 0.5) * 0.6);
      g.fillStyle = 'rgba(0,0,0,.12)'; rr(g, -w / 2 + 3, -h / 2 + 4, w, h, 4); g.fill();
      g.fillStyle = cols[(r() * cols.length) | 0]; rr(g, -w / 2, -h / 2, w, h, 4); g.fill();
      g.fillStyle = 'rgba(255,255,255,.55)';
      for (let k = 0; k < 4; k++) g.fillRect(-w / 2 + w * 0.12 + k * w * 0.2, -h / 2 + h * 0.2, w * 0.08, h * 0.12);
      g.restore();
    }
    // keypad
    const kx = W * 0.62, ky = H * 0.55, ks = H * 0.075;
    g.fillStyle = '#222'; rr(g, kx - 4, ky - 4, ks * 4 + 8, ks * 4 + 8, 6); g.fill();
    for (let i = 0; i < 16; i++) { g.fillStyle = '#eee'; rr(g, kx + (i % 4) * ks, ky + ((i / 4) | 0) * ks, ks * 0.8, ks * 0.8, 3); g.fill(); }
  }
  function workshop(seed) {
    return c => {
      const g = c.getContext('2d'), W = c.width, H = c.height, r = rng(seed);
      g.fillStyle = '#d9dbd6'; g.fillRect(0, 0, W, H);
      g.strokeStyle = 'rgba(40,40,40,.25)'; g.lineWidth = 1;
      for (let x = 0; x < W; x += W / 14) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      for (let y = 0; y < H; y += W / 14) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      for (let i = 0; i < 9; i++) {
        const w = W * (0.12 + r() * 0.35), h = H * (0.04 + r() * 0.12);
        g.save(); g.translate(r() * W, r() * H); g.rotate(r() * 3);
        g.fillStyle = r() < 0.7 ? '#1c1c1c' : '#3a3a3a'; rr(g, -w / 2, -h / 2, w, h, 3); g.fill();
        g.fillStyle = '#777'; for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(-w / 2 + (k + 0.5) * w / 4, 0, h * 0.12, 0, TAU); g.fill(); }
        g.restore();
      }
      g.lineWidth = Math.max(2, W / 120);
      for (let i = 0; i < 5; i++) {
        g.strokeStyle = ['#d32f2f', '#1976d2', '#fbc02d', '#222'][i % 4];
        g.beginPath(); g.moveTo(r() * W, r() * H); g.bezierCurveTo(r() * W, r() * H, r() * W, r() * H, r() * W, r() * H); g.stroke();
      }
    };
  }

  /* ---------- Pac-Man arcade screen (ECE World) ---------- */
  function pacman(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.fillStyle = lin(g, 0, 0, 0, H, [[0, '#1a0633'], [1, '#07020f']]); g.fillRect(0, 0, W, H);
    const t = Math.min(W / 22, H / 15);
    const ox = (W - t * 20) / 2, oy = H * 0.24;
    const maze = [
      '####################',
      '#........##........#',
      '#.##.###.##.###.##.#',
      '#o................o#',
      '#.##.#.######.#.##.#',
      '#....#...##...#....#',
      '####.### ## ###.####',
      '#.......    .......#',
      '#.##.##.####.##.##.#',
      '#o................o#',
      '####################',
    ];
    g.shadowColor = '#c04dff'; g.shadowBlur = t * 0.6;
    g.strokeStyle = '#b347ff'; g.lineWidth = Math.max(1.5, t * 0.18);
    maze.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === '#') { g.strokeRect(ox + x * t + t * 0.15, oy + y * t + t * 0.15, t * 0.7, t * 0.7); }
    }));
    g.shadowBlur = 0;
    maze.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === '.' || ch === 'o') {
        g.fillStyle = ch === 'o' ? '#ffd1f4' : '#ff9be6';
        g.beginPath(); g.arc(ox + (x + 0.5) * t, oy + (y + 0.5) * t, t * (ch === 'o' ? 0.22 : 0.09), 0, TAU); g.fill();
      }
    }));
    const pac = (x, y, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(x, y); g.arc(x, y, t * 0.42, 0.6, TAU - 0.6); g.fill(); };
    pac(ox + 6.5 * t, oy + 3.5 * t, '#ffe23a');
    const ghost = (x, y, col) => {
      g.fillStyle = col; g.beginPath(); g.arc(x, y, t * 0.4, Math.PI, 0); g.lineTo(x + t * 0.4, y + t * 0.4);
      for (let k = 0; k < 3; k++) g.lineTo(x + t * 0.4 - (k + 0.5) * t * 0.8 / 3, y + t * (k % 2 ? 0.4 : 0.25));
      g.lineTo(x - t * 0.4, y + t * 0.4); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(x - t * 0.14, y - t * 0.05, t * 0.11, 0, TAU); g.arc(x + t * 0.14, y - t * 0.05, t * 0.11, 0, TAU); g.fill();
    };
    ghost(ox + 11.5 * t, oy + 7.5 * t, '#ff3b5c'); ghost(ox + 14.5 * t, oy + 3.5 * t, '#44e0ff'); ghost(ox + 3.5 * t, oy + 9.5 * t, '#ff9f1c');
    g.font = `700 ${t * 1.1}px Silkscreen, monospace`; g.textAlign = 'center';
    g.shadowColor = '#ff4fd8'; g.shadowBlur = t * 0.8; g.fillStyle = '#ff7ee6';
    g.fillText('PAC-MAN', W / 2, H * 0.17); g.shadowBlur = 0;
    g.font = `400 ${t * 0.55}px Silkscreen, monospace`; g.fillStyle = '#ffe23a'; g.textAlign = 'left';
    g.fillText('1UP  03450', t * 0.6, t * 0.9); g.textAlign = 'right'; g.fillText('HI 12000', W - t * 0.6, t * 0.9);
  }

  function jackpot(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.fillStyle = lin(g, 0, 0, 0, H, [[0, '#25324a'], [1, '#141a28']]); g.fillRect(0, 0, W, H);
    g.fillStyle = lin(g, 0, 0, 0, H, [[0, '#d2232a'], [1, '#7c0f14']]); rr(g, W * 0.12, H * 0.08, W * 0.76, H * 0.86, 10); g.fill();
    g.fillStyle = '#f7c948'; rr(g, W * 0.18, H * 0.12, W * 0.64, H * 0.18, 6); g.fill();
    g.fillStyle = '#7c0f14'; g.font = `800 ${H * 0.12}px Rubik, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('JACKPOT', W / 2, H * 0.215);
    for (let i = 0; i < 3; i++) {
      const x = W * 0.2 + i * W * 0.205;
      g.fillStyle = '#fbf6ea'; rr(g, x, H * 0.38, W * 0.18, H * 0.3, 5); g.fill();
      g.fillStyle = ['#d2232a', '#1f4fd6', '#d2232a'][i]; g.font = `800 ${H * 0.2}px Rubik, sans-serif`;
      g.fillText(['7', '★', '7'][i], x + W * 0.09, H * 0.535);
    }
    g.fillStyle = '#f7c948'; for (let i = 0; i < 9; i++) { g.beginPath(); g.arc(W * 0.2 + i * W * 0.075, H * 0.78, H * 0.02, 0, TAU); g.fill(); }
    g.fillStyle = '#222'; rr(g, W * 0.3, H * 0.84, W * 0.4, H * 0.06, 4); g.fill();
  }

  /* ---------- University trip vlog ---------- */
  function knu(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H * 0.42, R = Math.min(W * 0.36, H * 0.36);
    g.fillStyle = '#d7141a'; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(cx, cy, R * 0.93, 0, TAU); g.fill();
    g.fillStyle = '#d7141a'; g.beginPath(); g.arc(cx, cy, R * 0.9, 0, TAU); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(cx, cy, R * 0.62, 0, TAU); g.fill();
    g.fillStyle = '#d7141a'; g.beginPath(); g.arc(cx, cy, R * 0.58, 0, TAU); g.fill();
    g.fillStyle = '#fff'; g.font = `700 ${R * 0.13}px Inter, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    const txt = 'KYUNGPOOK NATIONAL UNIVERSITY • 1946 • ';
    [...txt].forEach((ch, i) => {
      const a = -Math.PI / 2 + (i / txt.length) * TAU;
      g.save(); g.translate(cx + Math.cos(a) * R * 0.76, cy + Math.sin(a) * R * 0.76); g.rotate(a + Math.PI / 2); g.fillText(ch, 0, 0); g.restore();
    });
    // seal: stylised gate
    g.strokeStyle = '#fff'; g.lineWidth = R * 0.05;
    g.beginPath(); g.moveTo(cx - R * 0.35, cy - R * 0.1); g.quadraticCurveTo(cx, cy - R * 0.38, cx + R * 0.35, cy - R * 0.1); g.stroke();
    g.strokeRect(cx - R * 0.22, cy - R * 0.08, R * 0.44, R * 0.34);
    g.beginPath(); g.moveTo(cx, cy - R * 0.08); g.lineTo(cx, cy + R * 0.26); g.stroke();
    g.fillStyle = '#d7141a'; g.font = `800 ${R * 0.42}px Rubik, sans-serif`; g.textAlign = 'left';
    g.fillText('KNU', W * 0.08, H * 0.9);
    g.fillStyle = '#6b6b6b'; g.font = `700 ${R * 0.12}px Inter, sans-serif`;
    g.fillText('KYUNGPOOK', W * 0.08 + R * 0.95, H * 0.87); g.fillText('NATIONAL UNIVERSITY', W * 0.08 + R * 0.95, H * 0.93);
  }
  function vlogKorea(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height, r = rng(21);
    g.fillStyle = lin(g, 0, 0, 0, H, [[0, '#7fb6ea'], [0.6, '#cfe3f3'], [1, '#e8eef2']]); g.fillRect(0, 0, W, H);
    g.fillStyle = '#b06b4a'; g.fillRect(0, H * 0.35, W * 0.55, H * 0.5);
    for (let y = H * 0.35; y < H * 0.85; y += H * 0.04) for (let x = (y / (H * 0.04)) % 2 ? 0 : W * 0.03; x < W * 0.55; x += W * 0.06) { g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(x, y, W * 0.055, H * 0.035); }
    g.fillStyle = '#2d3b2f'; g.beginPath(); g.moveTo(-W * 0.02, H * 0.36); g.quadraticCurveTo(W * 0.28, H * 0.22, W * 0.6, H * 0.36); g.lineTo(W * 0.55, H * 0.42); g.lineTo(0, H * 0.42); g.fill();
    g.fillStyle = '#8b2f2a'; g.fillRect(W * 0.18, H * 0.5, W * 0.18, H * 0.35);
    g.fillStyle = '#3a2a1f'; g.beginPath(); g.arc(W * 0.27, H * 0.62, W * 0.07, Math.PI, 0); g.fill(); g.fillRect(W * 0.2, H * 0.62, W * 0.14, H * 0.23);
    g.fillStyle = '#f4f1ea'; g.save(); g.translate(W * 0.82, H * 0.3); g.rotate(-0.3); g.fillRect(-W * 0.15, -H * 0.25, W * 0.3, H * 0.4); g.restore();
    g.fillStyle = '#c63a2c'; g.save(); g.translate(W * 0.88, H * 0.5); g.rotate(-0.3); g.fillRect(-W * 0.12, -H * 0.05, W * 0.28, H * 0.12); g.restore();
    g.fillStyle = '#9a9aa0'; g.fillRect(0, H * 0.85, W, H * 0.15);
    for (let i = 0; i < 40; i++) {
      const x = r() * W, y = H * (0.72 + r() * 0.16), s = H * (0.03 + r() * 0.04);
      g.fillStyle = ['#2b2b2b', '#e95b3a', '#f2f2f2', '#4a64c8', '#c42e5b'][(r() * 5) | 0];
      g.fillRect(x, y, s * 0.6, s * 1.6); g.fillStyle = '#e1b899'; g.beginPath(); g.arc(x + s * 0.3, y - s * 0.3, s * 0.3, 0, TAU); g.fill();
    }
    g.textAlign = 'center'; g.fillStyle = '#ffcf33'; g.shadowColor = 'rgba(0,0,0,.4)'; g.shadowBlur = 6;
    g.font = `800 ${H * 0.2}px Rubik, sans-serif`; g.fillText('VLOG', W * 0.5, H * 0.5);
    g.font = `700 ${H * 0.08}px Rubik, sans-serif`; g.fillText('KOREA', W * 0.5, H * 0.6);
    g.fillStyle = '#ffd9a0'; g.font = `700 ${H * 0.05}px Inter, sans-serif`; g.fillText('ONCE UPON A TIME IN KYUNGPOOK', W * 0.52, H * 0.7);
    g.shadowBlur = 0;
  }

  /* ---------- Nine Peaks trail photos ---------- */
  function trailScene(seed) {
    return c => {
      const g = c.getContext('2d'), W = c.width, H = c.height, r = rng(seed);
      const palettes = [
        ['#9fc3e6', '#dbe9f3', '#5b7b62', '#3f5a45', '#2c3f30'],
        ['#f3c78e', '#fbe5c4', '#7b6a8c', '#4d4466', '#2e2940'],
        ['#a8d0a0', '#e8f2dc', '#4f7a47', '#355a33', '#223b22'],
        ['#1b2238', '#3a4466', '#2c3552', '#1d2540', '#121829'],
      ];
      const p = palettes[seed % palettes.length];
      g.fillStyle = lin(g, 0, 0, 0, H, [[0, p[0]], [0.55, p[1]], [1, p[1]]]); g.fillRect(0, 0, W, H);
      ridge(g, W, H, H * 0.5, H * 0.25, 5, p[2], seed);
      ridge(g, W, H, H * 0.68, H * 0.2, 7, p[3], seed + 1);
      ridge(g, W, H, H * 0.86, H * 0.12, 9, p[4], seed + 2);
      // runner
      const x = W * (0.35 + r() * 0.3), y = H * 0.9, s = H * 0.42;
      g.fillStyle = '#141414';
      g.beginPath(); g.arc(x, y - s * 0.9, s * 0.08, 0, TAU); g.fill();
      rr(g, x - s * 0.1, y - s * 0.8, s * 0.2, s * 0.38, s * 0.06); g.fill();
      g.fillStyle = '#f2f2f2'; g.fillRect(x - s * 0.07, y - s * 0.66, s * 0.14, s * 0.08);
      g.fillStyle = '#141414'; g.lineWidth = s * 0.06; g.strokeStyle = '#141414'; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x, y - s * 0.42); g.lineTo(x - s * 0.14, y - s * 0.18); g.lineTo(x - s * 0.1, y); g.moveTo(x, y - s * 0.42); g.lineTo(x + s * 0.16, y - s * 0.22); g.lineTo(x + s * 0.26, y - s * 0.1); g.stroke();
      g.beginPath(); g.moveTo(x - s * 0.08, y - s * 0.75); g.lineTo(x - s * 0.2, y - s * 0.55); g.moveTo(x + s * 0.08, y - s * 0.75); g.lineTo(x + s * 0.22, y - s * 0.62); g.stroke();
      if (seed % 4 === 3) { g.fillStyle = 'rgba(255,255,255,.85)'; for (let i = 0; i < 30; i++) { g.beginPath(); g.arc(r() * W, r() * H * 0.5, r() * 2, 0, TAU); g.fill(); } }
    };
  }
  function trailTile(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.fillStyle = '#f5c518'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#1f3c88'; g.beginPath(); g.moveTo(W * 0.55, 0); g.lineTo(W, 0); g.lineTo(W, H); g.lineTo(W * 0.4, H); g.fill();
    g.fillStyle = 'rgba(255,255,255,.25)'; for (let i = 0; i < 6; i++) g.fillRect(W * (0.6 + i * 0.06), H * 0.1, 2, H * 0.8);
    const s = H * 0.8, x = W * 0.78, y = H * 0.98;
    g.fillStyle = '#111'; rr(g, x - s * 0.13, y - s * 0.78, s * 0.26, s * 0.42, s * 0.05); g.fill();
    g.fillStyle = '#e8e8e8'; g.fillRect(x - s * 0.1, y - s * 0.6, s * 0.2, s * 0.1);
    g.fillStyle = '#c68b5f'; g.beginPath(); g.arc(x, y - s * 0.88, s * 0.09, 0, TAU); g.fill();
    g.fillStyle = '#111'; g.fillRect(x - s * 0.1, y - s * 0.36, s * 0.2, s * 0.36);
    g.strokeStyle = '#6a3df0'; g.lineWidth = s * 0.05; g.lineCap = 'round';
    g.beginPath(); g.moveTo(W * 0.33, H * 0.55); g.lineTo(W * 0.42, H * 0.72); g.lineTo(W * 0.38, H * 0.92); g.moveTo(W * 0.42, H * 0.72); g.lineTo(W * 0.5, H * 0.85); g.stroke();
    g.fillStyle = '#6a3df0'; g.beginPath(); g.arc(W * 0.32, H * 0.5, s * 0.06, 0, TAU); g.fill();
  }

  /* ---------- Personal photo, career header, contact aurora ---------- */
  function greatWall(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.fillStyle = lin(g, 0, 0, 0, H, [[0, '#28324f'], [0.28, '#e0833a'], [0.36, '#f6b25a'], [0.5, '#5a3a3a'], [1, '#2a1c1c']]); g.fillRect(0, 0, W, H);
    g.fillStyle = rad(g, W * 0.62, H * 0.33, 0, W * 0.4, [[0, 'rgba(255,230,160,1)'], [0.08, 'rgba(255,200,110,.9)'], [1, 'rgba(255,160,80,0)']]); g.fillRect(0, 0, W, H);
    ridge(g, W, H, H * 0.42, H * 0.06, 4, '#6b4a55', 3);
    ridge(g, W, H, H * 0.5, H * 0.08, 6, '#4e343c', 4);
    ridge(g, W, H, H * 0.62, H * 0.1, 5, '#3a2629', 5);
    // wall zigzag
    g.strokeStyle = '#8f7766'; g.lineWidth = H * 0.025; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(0, H * 0.72); g.lineTo(W * 0.25, H * 0.62); g.lineTo(W * 0.45, H * 0.7); g.lineTo(W * 0.7, H * 0.55); g.lineTo(W, H * 0.6); g.stroke();
    g.fillStyle = '#6e5a4d'; g.beginPath(); g.moveTo(0, H); g.lineTo(0, H * 0.72); g.lineTo(W * 0.6, H * 0.88); g.lineTo(W, H * 0.8); g.lineTo(W, H); g.fill();
    for (let i = 0; i < 7; i++) { g.fillStyle = '#5a4a40'; g.fillRect(W * (0.62 + i * 0.05), H * (0.8 - i * 0.012), W * 0.03, H * 0.05); }
    // person in yellow jacket
    const x = W * 0.5, y = H * 0.84, s = H * 0.3;
    g.fillStyle = '#e8b21c'; rr(g, x - s * 0.14, y - s * 0.72, s * 0.28, s * 0.4, s * 0.08); g.fill();
    g.fillStyle = '#1d1d1d'; g.fillRect(x - s * 0.1, y - s * 0.34, s * 0.08, s * 0.34); g.fillRect(x + s * 0.02, y - s * 0.34, s * 0.08, s * 0.34);
    g.fillStyle = '#2b2522'; g.beginPath(); g.arc(x, y - s * 0.82, s * 0.09, 0, TAU); g.fill();
    g.strokeStyle = '#e8b21c'; g.lineWidth = s * 0.07; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + s * 0.1, y - s * 0.62); g.lineTo(x + s * 0.2, y - s * 0.86); g.stroke();
  }
  function room(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height;
    g.fillStyle = lin(g, 0, 0, 0, H, [[0, '#2b2e30'], [1, '#101213']]); g.fillRect(0, 0, W, H);
    g.fillStyle = 'rgba(200,210,215,.14)';
    for (let i = 0; i < 9; i++) g.fillRect(W * (0.3 + i * 0.075), H * 0.05, W * 0.06, H * 0.6);
    g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(0, 0, W, H);
  }
  function aurora(c) {
    const g = c.getContext('2d'), W = c.width, H = c.height, r = rng(9);
    g.fillStyle = lin(g, 0, 0, 0, H, [[0, '#04121a'], [0.45, '#0a3a3a'], [0.7, '#0b2a2a'], [1, '#051312']]); g.fillRect(0, 0, W, H);
    for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(255,255,255,${r() * 0.7})`; g.fillRect(r() * W, r() * H * 0.55, 1.2, 1.2); }
    g.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 5; k++) {
      const y0 = H * (0.25 + k * 0.07), ph = r() * 6;
      for (let x = 0; x < W; x += 3) {
        const y = y0 + Math.sin(x / W * 5 + ph) * H * 0.08 + Math.sin(x / W * 13 + ph) * H * 0.02;
        const h = H * (0.18 + 0.12 * Math.sin(x / W * 7 + ph * 2));
        const a = 0.13 + 0.09 * Math.sin(x / W * 9 + k);
        g.fillStyle = lin(g, 0, y - h, 0, y + H * 0.05, [[0, 'rgba(40,255,140,0)'], [0.7, `rgba(60,255,120,${a})`], [1, 'rgba(160,255,120,0)']]);
        g.fillRect(x, y - h, 3, h + H * 0.05);
      }
    }
    g.fillStyle = rad(g, W * 0.55, H * 0.68, 0, W * 0.45, [[0, 'rgba(120,255,90,.55)'], [0.4, 'rgba(40,200,90,.18)'], [1, 'rgba(0,0,0,0)']]);
    g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = 'source-over';
    ridge(g, W, H, H * 0.66, H * 0.2, 4, '#0d1f22', 12);
    ridge(g, W, H, H * 0.74, H * 0.1, 7, '#081517', 13);
    // lake + reflection
    g.fillStyle = lin(g, 0, H * 0.78, 0, H, [[0, '#0a2c28'], [1, '#03100f']]); g.fillRect(0, H * 0.78, W, H * 0.22);
    g.save(); g.globalAlpha = 0.35; g.translate(0, H * 1.56); g.scale(1, -1);
    g.drawImage(c, 0, H * 0.5, W, H * 0.28, 0, H * 0.5, W, H * 0.28);
    g.restore();
    g.fillStyle = '#020807'; g.fillRect(W * 0.49, H * 0.72, W * 0.006, H * 0.06);
  }

  /* ---------- HTML-based media ---------- */
  const devappCover = () => `
    <div class="art-devcover">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
        <rect width="400" height="240" fill="#040504"/>
        <g stroke="rgba(255,255,255,.18)" stroke-width="1"><path d="M18 14h10M23 9v10M170 14h10M175 9v10M18 226h10M23 221v10"/></g>
        <circle cx="92" cy="96" r="78" fill="none" stroke="#14c01e" stroke-width="38"/>
        <circle cx="92" cy="96" r="99" fill="none" stroke="#0f8f18" stroke-width="3" stroke-dasharray="2 9"/>
        <circle cx="92" cy="96" r="52" fill="#050805"/><circle cx="92" cy="96" r="3" fill="#bfc9bf"/>
        <circle cx="205" cy="262" r="64" fill="none" stroke="#18c724" stroke-width="28"/>
        <circle cx="38" cy="196" r="7" fill="#2f6bff"/><circle cx="160" cy="210" r="5" fill="#2f6bff"/>
        <g transform="translate(212 228) rotate(-38)"><rect x="-22" y="-26" width="44" height="52" rx="8" fill="#c9cdd1"/><rect x="-15" y="-19" width="30" height="38" rx="4" fill="#8b9197"/></g>
      </svg>
      <div class="txt"><h3>Personnal<br>Dev App</h3><span class="year">2025</span></div>
    </div>`;
  const devappScreen = () => {
    const rows = [
      ['Sport', 'Practice stretching', 'Do 10 minutes of stretching to relax your body', true],
      ['Mind', 'Reflect on your values', 'Take 5 minutes to write what matters to you', false],
      ['Study', 'Practice positive self-talk', 'Replace one negative thought with a positive one', false],
      ['Health', 'Drink water right', 'Drink 2 litres of water before the evening', true],
      ['Focus', 'Research a healthy topic', 'Read an article about sleep or nutrition', false],
    ];
    return `<div class="art-devscreen">${rows.map(([tag, t, d, done]) => `
      <div class="task${done ? ' done' : ''}"><div><span class="chip">${tag}</span><span class="xp">+${done ? 20 : 10} XP</span><b>${t}</b><small>${d}</small></div><i></i><i></i></div>`).join('')}
      <div class="fab">+</div></div>`;
  };

  const PAINTERS = {
    world, worldBig: world, rover, gyrobotTile, gyrobotBlue, gyrobotOrange, gyrobotVideo,
    roverKit, components, workshopA: workshop(3), workshopB: workshop(8),
    pacman, jackpot, knu, vlogKorea, trailTile,
    trail1: trailScene(0), trail2: trailScene(1), trail3: trailScene(2), trail4: trailScene(3), trail5: trailScene(4), trail6: trailScene(6),
    greatWall, room, aurora,
  };
  const HTML = { devappCover, devappScreen };

  /* Paint every [data-art] canvas below root, sized to its box. */
  function paint(root) {
    root.querySelectorAll('canvas[data-art]').forEach(cv => {
      const box = cv.parentElement;
      const w = box.clientWidth || cv.width, h = box.clientHeight || cv.height;
      const k = cv.dataset.art === 'world' || cv.dataset.art === 'worldBig' ? 1 : 2;
      cv.width = Math.max(8, Math.round(w * k)); cv.height = Math.max(8, Math.round(h * k));
      const p = PAINTERS[cv.dataset.art];
      if (p) p(cv);
    });
    // photos from /assets replace the drawing once they load
    root.querySelectorAll('[data-img]').forEach(box => {
      if (box.dataset.loaded) return;
      box.dataset.loaded = '1';
      const img = new Image();
      img.onload = () => { img.className = 'photo'; box.appendChild(img); box.classList.add('has-photo'); };
      img.src = box.dataset.img;
    });
  }

  window.ART = { paint, html: k => (HTML[k] ? HTML[k]() : '') };
})();
