"use strict";

/* ============================================================
   STATE
   ============================================================ */
const S = {
  cash: 1000, bet: 100, game: 'plinko', skillPoints: 0,
  history: { plinko:{w:[],l:[]}, dice:{w:[],l:[]}, slots:{w:[],l:[]}, mines:{w:[],l:[]}, blackjack:{w:[],l:[]}, roulette:{w:[],l:[]}, drills:{w:[],l:[]}, pump:{w:[],l:[]}, scratch:{w:[],l:[]}, pachinko:{w:[],l:[]}, limbo:{w:[],l:[]}, crash:{w:[],l:[]}, coinflip:{w:[],l:[]}, keno:{w:[],l:[]}, tower:{w:[],l:[]}, videoPoker:{w:[],l:[]}, hilo:{w:[],l:[]}, baccarat:{w:[],l:[]} },
  cashback: 0, interestRate: 0, maxBetBonus: 0,
  plEdge: 0, plCenter: 0, plLucky: 0, plMega: 0, plPin: 0,
  diceEdge: 0, diceBonus: 0, diceCrit: 0,
  slBonus: 0, slFree: 0, slPity: 0,
  mnSafe: 0, mnBonus: 0, mnInsurance: 0,
  bjBonus: 0, bjPayout: 0,
  rlBonus: 0, rlLucky: 0,
};
let lossesStreak = 0, minesCount = 5;
let activeBuffs = [];
const $ = id => document.getElementById(id);
function fmt(n) {
  if (n < 0) return '-$' + Math.abs(n).toLocaleString();
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return '$' + (n / 1e3).toFixed(1) + 'K';
  return '$' + n.toLocaleString();
}

/* ============================================================
   TOAST (clickable to dismiss)
   ============================================================ */
function toast(text, type) {
  type = type || 'info';
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = text;
  el.onclick = function() { this.style.animation = 'none'; this.style.opacity = '0'; setTimeout(() => this.remove(), 150); };
  $('toast-container').appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, 3200);
}

/* ============================================================
   localStorage
   ============================================================ */
function saveGame() {
  const data = { S: { ...S }, minesCount, activeBuffs, ts: Date.now() };
  try { localStorage.setItem('lucky_save', JSON.stringify(data)); } catch(e) {}
}
function loadGame() {
  try {
    const raw = localStorage.getItem('lucky_save');
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data && data.S) {
      Object.assign(S, data.S);
      S.history = data.S.history || S.history;
      minesCount = data.minesCount || 5;
      activeBuffs = data.activeBuffs || [];
      return true;
    }
  } catch(e) {}
  return false;
}
function clearGameData() { try { localStorage.removeItem('lucky_save'); } catch(e) {} }
function checkDisclaimer() { try { return localStorage.getItem('lucky_disclaimer') === '1'; } catch(e) { return false; } }
function acceptDisclaimer() {
  if (!$('disclaimer-cb').checked) return;
  try { localStorage.setItem('lucky_disclaimer', '1'); } catch(e) {}
  $('disclaimer-overlay').style.display = 'none';
}
function resetDisclaimer() { try { localStorage.removeItem('lucky_disclaimer'); } catch(e) {} location.reload(); }

/* ============================================================
   SETTINGS / CONFIRM
   ============================================================ */
let confirmCallback = null;
function openSettings() { $('settings-overlay').classList.add('open'); }
function closeSettings() { $('settings-overlay').classList.remove('open'); }
function confirmClearData() {
  confirmCallback = () => { clearGameData(); location.reload(); };
  $('confirm-title').textContent = 'CLEAR ALL DATA?';
  $('confirm-msg').textContent = 'This will reset all progress, skills, and history. This cannot be undone.';
  $('confirm-overlay').classList.add('open');
}
function confirmYes() { $('confirm-overlay').classList.remove('open'); if (confirmCallback) confirmCallback(); confirmCallback = null; }
function confirmNo() { $('confirm-overlay').classList.remove('open'); confirmCallback = null; }
function showPrivacy() { $('privacy-overlay').classList.add('open'); }
function closePrivacy() { $('privacy-overlay').classList.remove('open'); }

/* ============================================================
   SHOP (with dynamic SP pricing)
   ============================================================ */
let spBasePrice = 2000;
let spPriceHistory = [2000];

function getSPPrice(amount) {
  const mult = amount === 1 ? 1 : amount === 3 ? 2.3 : 3.5;
  return Math.round(spBasePrice * mult);
}
function shiftSPPrice() {
  const cashFactor = S.cash / 5000;
  const baseTarget = 1500 + cashFactor * 2000;
  const noise = (Math.random() - 0.5) * 800;
  spBasePrice = Math.round(Math.max(800, Math.min(8000, baseTarget + noise)));
  spPriceHistory.push(spBasePrice);
  if (spPriceHistory.length > 20) spPriceHistory.shift();
  updateSPPrices();
}
function updateSPPrices() {
  const p1 = $('se-price'), p3 = $('se-price3'), p5 = $('se-price5');
  if (p1) p1.textContent = fmt(getSPPrice(1));
  if (p3) p3.textContent = fmt(getSPPrice(3));
  if (p5) p5.textContent = fmt(getSPPrice(5));
  const hist = $('se-history');
  if (hist && spPriceHistory.length > 1) {
    const last = spPriceHistory[spPriceHistory.length - 1];
    const prev = spPriceHistory[spPriceHistory.length - 2];
    const arrow = last > prev ? '▲' : last < prev ? '▼' : '─';
    const color = last > prev ? 'var(--green)' : last < prev ? 'var(--red)' : 'var(--dim)';
    let html = '<span style="color:' + color + '">' + arrow + ' Base: ' + fmt(Math.round(spBasePrice)) + '</span>';
    const w = 320, h = 48, pad = 4;
    const mn = Math.min(...spPriceHistory), mx = Math.max(...spPriceHistory);
    const range = Math.max(1, mx - mn);
    let svg = '<svg width="' + w + '" height="' + h + '" style="display:block;margin:8px auto 0">';
    svg += '<rect width="' + w + '" height="' + h + '" fill="rgba(20,20,42,.6)" rx="4"/>';
    const step = (w - pad * 2) / Math.max(1, spPriceHistory.length - 1);
    let pts = spPriceHistory.map((v, i) => (pad + i * step) + ',' + (h - pad - ((v - mn) / range) * (h - pad * 2)));
    const lineColor = last > prev ? '#00cc66' : '#ff3344';
    svg += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + lineColor + '" stroke-width="1.5"/>';
    const lx = pad + (spPriceHistory.length - 1) * step;
    const ly = h - pad - ((last - mn) / range) * (h - pad * 2);
    svg += '<circle cx="' + lx + '" cy="' + ly + '" r="3" fill="' + lineColor + '"/>';
    svg += '<text x="' + (pad + 4) + '" y="12" fill="#555577" font-family="Orbitron,monospace" font-size="8">' + fmt(mn) + '</text>';
    svg += '<text x="' + (pad + 4) + '" y="' + (h - 4) + '" fill="#555577" font-family="Orbitron,monospace" font-size="8">' + fmt(mx) + '</text>';
    svg += '</svg>';
    html += svg;
    hist.innerHTML = html;
  }
}

function openShop() {
  $('shop-overlay').classList.add('open');
  shiftSPPrice();
  updateShopBuffs();
  updateSPPrices();
}
function closeShop() { $('shop-overlay').classList.remove('open'); }
function switchShopTab(tab) {
  document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.shop-content').forEach(c => c.classList.remove('active'));
  if (tab === 'powerups') { document.querySelectorAll('.shop-tab')[0].classList.add('active'); $('shop-powerups').classList.add('active'); }
  else { document.querySelectorAll('.shop-tab')[1].classList.add('active'); $('shop-sp').classList.add('active'); }
}
function buyPowerup(type) {
  const costs = { luckycharm: 500, insurance: 750, doubletrouble: 1000, cashbackboost: 300 };
  const names = { luckycharm: 'Lucky Charm', insurance: 'Insurance', doubletrouble: 'Double Trouble', cashbackboost: 'Cashback Boost' };
  const cost = costs[type];
  if (S.cash < cost) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= cost;
  activeBuffs.push(type);
  toast('Bought ' + names[type] + '!', 'gold');
  updUI(); updateShopBuffs();
}
function buySP(amount) {
  const cost = getSPPrice(amount);
  if (S.cash < cost) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= cost;
  S.skillPoints += amount;
  shiftSPPrice();
  toast('+' + amount + ' SP! (' + fmt(cost) + ')', 'gold');
  updUI(); updSP(); updateShopBuffs();
}
function useBuff(type) {
  const idx = activeBuffs.indexOf(type);
  if (idx === -1) return false;
  activeBuffs.splice(idx, 1);
  return true;
}
function hasBuff(type) { return activeBuffs.includes(type); }
function updateShopBuffs() {
  const el = $('top-buffs'); if (!el) return;
  const names = { luckycharm: '🍀 Lucky', insurance: '🛡️ Insurance', doubletrouble: '🔥 2x Win', cashbackboost: '💰 50% Back' };
  el.innerHTML = activeBuffs.map(b => '<span class="top-buff">' + (names[b] || b) + '</span>').join('');
  const shopEl = $('shop-active-buffs');
  if (shopEl) shopEl.textContent = activeBuffs.length ? 'Active: ' + activeBuffs.map(b => names[b] || b).join(', ') : '';
}

/* ============================================================
   UI HELPERS
   ============================================================ */
function updUI() {
  const cashEl = $('s-cash');
  const old = cashEl.textContent;
  const nw = fmt(S.cash);
  cashEl.textContent = nw;
  if (old !== nw) { cashEl.classList.remove('bump'); void cashEl.offsetWidth; cashEl.classList.add('bump'); }

  // Game-specific stats
  const hist = S.history[S.game];
  const totalW = hist.w.reduce((a, b) => a + b, 0);
  const totalL = hist.l.reduce((a, b) => a + b, 0);
  $('s-won').textContent = fmt(totalW);
  $('s-lost').textContent = '-' + fmt(totalL);
  const net = totalW - totalL;
  $('s-net').textContent = fmt(net);
  $('s-net').style.color = net >= 0 ? 'var(--green)' : 'var(--red)';
  $('s-rounds').textContent = hist.w.length + hist.l.length;

  if ($('bet-input')) $('bet-input').value = S.bet;
  drawMiniGraph();
  saveGame();
}
function adjBet(d) {
  if (d === 0) S.bet = S.cash >= 200 ? Math.floor(S.cash / 2) : 10;
  else S.bet = Math.max(10, Math.min(S.cash + S.maxBetBonus, S.bet + d));
  updUI();
  if (S.game === 'dice') updDiceMult();
}
function setBetMin() { S.bet = 10; updUI(); if (S.game === 'dice') updDiceMult(); }
function setBetHalf() { S.bet = Math.max(10, Math.floor(S.cash / 2)); updUI(); if (S.game === 'dice') updDiceMult(); }
function setBetX2() { S.bet = Math.min(S.cash + S.maxBetBonus, S.bet * 2); updUI(); if (S.game === 'dice') updDiceMult(); }
function setBetClear() { S.bet = 100; updUI(); if (S.game === 'dice') updDiceMult(); }
function setBetMax() { S.bet = Math.max(10, S.cash + S.maxBetBonus); updUI(); if (S.game === 'dice') updDiceMult(); }
function switchGame(g) {
  S.game = g;
  document.querySelectorAll('.gi').forEach(el => el.classList.toggle('active', el.dataset.g === g));
  document.querySelectorAll('.game-view').forEach(v => v.classList.remove('active'));
  $(g + '-view').classList.add('active');
  const flash = document.createElement('div');
  flash.className = 'game-flash';
  $('game-area').appendChild(flash);
  setTimeout(() => flash.remove(), 350);
  if (g === 'plinko') initPlinko();
  if (g === 'mines') { initMinesGrid(); updMinesInfo(); }
  if (g === 'drills') {
    updDrillsInfo();
    $('drills-start').disabled = false;
    $('drills-cashout').disabled = true;
    drAnimating = false;
    if (drAnimatingTimer) { clearTimeout(drAnimatingTimer); drAnimatingTimer = null; }
  }
  if (g === 'pump') updPumpInfo();
  if (g === 'scratch') {
    $('scratch-tickets').style.display = scratchState ? 'none' : 'flex';
    $('scratch-play').style.display = scratchState ? 'flex' : 'none';
    if (!scratchState) initScratchCanvas();
  }
  if (g === 'pachinko') { initPachinko(); updPachinkoBalls(); }
  if (g === 'dice') updDiceMult();
  if (g === 'roulette') drawRouletteWheel();
  if (g === 'keno') initKenoGrid();
  if (g === 'tower') initTowerGrid();
  if (g === 'videoPoker') { vpRenderHand(); }
  if (g === 'limbo') { limboAnimating = false; updLimboBar(); }
  if (g === 'crash') { initCrashCanvas(); crashAnimating = false; crashHistory = []; crashParticles = []; drawCrashGraph(); if (crashState) { crashState.alive = false; } $('crash-start').disabled = false; $('crash-cashout').disabled = true; $('crash-mult').textContent = '—'; $('crash-mult').style.color = ''; $('crash-mult').classList.remove('pulse','crashed'); $('crash-mult').style.textShadow = ''; $('crash-result').textContent = ''; $('crash-info').textContent = 'Place bet and BET!'; }
  if (g === 'coinflip') { cfAnimating = false; }
  if (g === 'hilo') { hlState = null; $('hl-higher').style.display = 'none'; $('hl-lower').style.display = 'none'; $('hl-start').style.display = ''; $('hl-cashout').disabled = true; $('hl-new').style.display = 'none'; $('hl-result').textContent = ''; $('hl-mult').textContent = '1.00x'; $('hl-info').textContent = 'Will next card be higher or lower?'; hlRenderCard('hl-current', hlNewCard()); hlRenderCard('hl-next', hlNewCard()); }
  if (g === 'baccarat') { baccState = null; $('bacc-deal').disabled = false; $('bacc-result').textContent = ''; $('bacc-info').textContent = 'Bet on Player, Banker, or Tie!'; $('bacc-player-cards').innerHTML = ''; $('bacc-banker-cards').innerHTML = ''; $('bacc-player-total').textContent = ''; $('bacc-banker-total').textContent = ''; }
  if (g === 'tower') { towerState = null; $('tower-cashout').disabled = true; $('tower-cashout').style.display = ''; $('tower-start').style.display = ''; $('tower-new').style.display = 'none'; $('tower-result').textContent = ''; $('tower-mult').textContent = '1.00x'; $('tower-info').textContent = 'Select difficulty and START!'; initTowerGrid(); }
  const labels = { plinko:'DROP', dice:'ROLL', slots:'SPIN', mines:'', blackjack:'', roulette:'', drills:'', pump:'', scratch:'', pachinko:'DROP', limbo:'ROLL', crash:'', coinflip:'', keno:'DRAW', tower:'', videoPoker:'', hilo:'', baccarat:'' };
  const pb = $('play-btn');
  if (pb) { pb.textContent = labels[g] || 'PLAY'; pb.style.display = labels[g] ? '' : 'none'; }
  updUI();
}
function playAction() {
  if (S.game === 'plinko') dropPlinko();
  else if (S.game === 'dice') rollDice();
  else if (S.game === 'slots') spinSlots();
  else if (S.game === 'pachinko') dropPachinko();
  else if (S.game === 'limbo') startLimbo();
  else if (S.game === 'crash') startCrash();
  else if (S.game === 'keno') startKeno();
  else if (S.game === 'tower') startTower();
  else if (S.game === 'videoPoker') vpDeal();
  else if (S.game === 'hilo') startHiLo();
  else if (S.game === 'baccarat') baccDeal();
}
function recordResult(game, won, amount) {
  if (won) S.history[game].w.push(amount);
  else S.history[game].l.push(amount);
}
function endRound(won, amount) {
  try {
    if (won) {
      lossesStreak = 0;
      if (hasBuff('doubletrouble')) { amount = Math.round(amount * 2); useBuff('doubletrouble'); toast('DOUBLE TROUBLE! 2x!', 'gold'); }
      if (hasBuff('luckycharm')) { amount = Math.round(amount * 2); useBuff('luckycharm'); toast('LUCKY CHARM! 2x!', 'gold'); }
      S.cash += amount;
      recordResult(S.game, true, amount);
    } else {
      lossesStreak++;
      recordResult(S.game, false, S.bet);
      if (hasBuff('cashbackboost')) { const cb = Math.round(S.bet * 0.5); S.cash += cb; useBuff('cashbackboost'); toast('+' + fmt(cb) + ' cashback boost!', 'info'); }
      else if (S.cashback > 0) { const cb = Math.floor(S.bet * S.cashback); if (cb > 0) { S.cash += cb; toast('+' + fmt(cb) + ' cashback', 'info'); } }
    }
    if (S.cash <= 0) {
      S.cash = 0;
      const totalW = Object.values(S.history).reduce((s,h) => s + h.w.reduce((a,b)=>a+b,0), 0);
      const totalL = Object.values(S.history).reduce((s,h) => s + h.l.reduce((a,b)=>a+b,0), 0);
      $('go-score').textContent = 'Final: ' + fmt(totalW - totalL);
      $('go-overlay').classList.add('open');
    }
  } catch(e) { console.error('endRound error', e); }
  updUI();
}
function restartGame() {
  $('go-overlay').classList.remove('open');
  Object.assign(S, {
    cash: 1000, bet: 100, skillPoints: 0,
    cashback: 0, interestRate: 0, maxBetBonus: 0,
    plEdge: 0, plCenter: 0, plLucky: 0, plMega: 0, plPin: 0,
    diceEdge: 0, diceBonus: 0, diceCrit: 0,
    slBonus: 0, slFree: 0, slPity: 0,
    mnSafe: 0, mnBonus: 0, mnInsurance: 0,
    bjBonus: 0, bjPayout: 0, rlBonus: 0, rlLucky: 0,
  });
  lossesStreak = 0; activeBuffs = [];
  for (const k in S.history) S.history[k] = { w: [], l: [] };
  resetST(); minesCount = 5; spBasePrice = 2000; spPriceHistory = [2000];
  drState = null; drAnimating = false;
  if (drAnimatingTimer) { clearTimeout(drAnimatingTimer); drAnimatingTimer = null; }
  if ($('mines-count-display')) $('mines-count-display').textContent = 5;
  if ($('drills-target')) $('drills-target').value = '2.00';
  if ($('scratch-tickets')) $('scratch-tickets').style.display = 'flex';
  if ($('scratch-play')) $('scratch-play').style.display = 'none';
  scratchState = null;
  crashState = null; crashAnimating = false;
  limboState = null; limboAnimating = false;
  hlState = null; baccState = null; towerState = null; kenoState = null;
  vpHand = []; vpHeld = []; vpState = 'idle'; pumpState = null; cfAnimating = false;
  initPlinko(); initMinesGrid(); initPachinko(); updUI();
  toast('New game started!', 'info');
}
function showFloat(x, y, text, color) {
  const el = document.createElement('div');
  el.className = 'float'; el.textContent = text; el.style.color = color;
  el.style.left = x + 'px'; el.style.top = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 850);
}

/* ============================================================
   MINE / DIAMOND VFX
   ============================================================ */
function spawnMineExplosion(cell) {
  const rect = cell.getBoundingClientRect();
  const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
  const colors = ['#ff3344', '#ff6600', '#ff9900', '#ffcc00'];
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.className = 'mine-particle';
    const angle = (i / 14) * Math.PI * 2 + (Math.random() - .5) * .6;
    const dist = 25 + Math.random() * 55;
    p.style.left = cx + 'px'; p.style.top = cy + 'px';
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.background = colors[i % 4];
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }
  document.body.classList.add('screen-shake');
  setTimeout(() => document.body.classList.remove('screen-shake'), 300);
}
function spawnDiamondSparkle(cell) {
  const rect = cell.getBoundingClientRect();
  const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'diamond-sparkle';
    const angle = (i / 10) * Math.PI * 2;
    const dist = 18 + Math.random() * 28;
    p.style.left = cx + 'px'; p.style.top = cy + 'px';
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 550);
  }
}
function spawnInsuredPop(cell) {
  const rect = cell.getBoundingClientRect();
  const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'insured-particle';
    const angle = (i / 8) * Math.PI * 2;
    const dist = 20 + Math.random() * 30;
    p.style.left = cx + 'px'; p.style.top = cy + 'px';
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.background = '#00ffcc';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 650);
  }
}

/* ============================================================
   MINI GRAPH
   ============================================================ */
function drawMiniGraph() {
  const c = $('graph-mini-c');
  if (!c) return;
  const ctx = c.getContext('2d');
  const w = c.width = 130, h = c.height = 28;
  ctx.clearRect(0, 0, w, h);
  const hist = S.history[S.game];
  let wi = 0, li = 0, running = 0;
  const combined = [];
  while (wi < hist.w.length || li < hist.l.length) {
    if (wi < hist.w.length) { running += hist.w[wi]; combined.push(running); wi++; }
    if (li < hist.l.length) { running -= hist.l[li]; combined.push(running); li++; }
  }
  if (combined.length === 0) return;
  const mn = Math.min(0, ...combined), mx = Math.max(0, ...combined);
  const range = Math.max(1, mx - mn);
  const step = w / Math.max(1, combined.length - 1);
  const zy = h - ((0 - mn) / range) * (h - 4) - 2;
  ctx.strokeStyle = 'rgba(80,80,120,.3)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, zy); ctx.lineTo(w, zy); ctx.stroke();
  ctx.beginPath();
  combined.forEach((v, i) => {
    const x = i * step, y = h - ((v - mn) / range) * (h - 4) - 2;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  const lastVal = combined[combined.length - 1];
  ctx.strokeStyle = lastVal >= 0 ? '#00cc66' : '#ff3344';
  ctx.lineWidth = 1.5; ctx.stroke();
  const lastX = (combined.length - 1) * step;
  ctx.lineTo(lastX, zy); ctx.lineTo(0, zy); ctx.closePath();
  ctx.fillStyle = lastVal >= 0 ? 'rgba(0,204,102,.08)' : 'rgba(255,51,68,.08)';
  ctx.fill();
}
function openGraph() { $('graph-overlay').classList.add('open'); drawBigGraph(); }
function closeGraph() { $('graph-overlay').classList.remove('open'); }
function drawBigGraph() {
  const c = $('graph-big-c');
  if (!c) return;
  const ctx = c.getContext('2d');
  c.width = 580; c.height = 220;
  const w = c.width, h = c.height;
  ctx.clearRect(0, 0, w, h);
  const hist = S.history[S.game];
  let wi = 0, li = 0, running = 0;
  const combined = [];
  while (wi < hist.w.length || li < hist.l.length) {
    if (wi < hist.w.length) { running += hist.w[wi]; combined.push({ v: running, type: 'w' }); wi++; }
    if (li < hist.l.length) { running -= hist.l[li]; combined.push({ v: running, type: 'l' }); li++; }
  }
  if (combined.length === 0) {
    ctx.fillStyle = '#555577'; ctx.font = '12px Orbitron,monospace'; ctx.textAlign = 'center';
    ctx.fillText('No data yet — play some rounds!', w / 2, h / 2);
    $('graph-detail').innerHTML = '';
    return;
  }
  const vals = combined.map(c => c.v);
  const mn = Math.min(0, ...vals), mx = Math.max(0, ...vals);
  const range = Math.max(1, mx - mn);
  const pad = 24, gw = w - pad * 2, gh = h - pad * 2;
  const step = gw / Math.max(1, combined.length - 1);
  ctx.strokeStyle = 'rgba(50,50,80,.2)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad + (gh / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke();
    const val = mx - (mx - mn) * (i / 4);
    ctx.fillStyle = '#444466'; ctx.font = '9px Orbitron,monospace'; ctx.textAlign = 'right';
    ctx.fillText(fmt(Math.round(val)), pad - 4, y + 3);
  }
  const zy = pad + gh - ((0 - mn) / range) * gh;
  ctx.strokeStyle = 'rgba(100,100,150,.4)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad, zy); ctx.lineTo(w - pad, zy); ctx.stroke();
  ctx.save();
  ctx.shadowColor = '#00cc66'; ctx.shadowBlur = 8;
  ctx.beginPath();
  combined.forEach((pt, i) => {
    const x = pad + i * step, y = pad + gh - ((pt.v - mn) / range) * gh;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#00cc66'; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();
  combined.forEach((pt, i) => {
    const x = pad + i * step, y = pad + gh - ((pt.v - mn) / range) * gh;
    ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = pt.type === 'w' ? '#00cc66' : '#ff3344'; ctx.fill();
    if (pt.type === 'w') { ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,204,102,.1)'; ctx.fill(); }
  });
  const lastVal2 = combined[combined.length - 1].v;
  const lx = pad + (combined.length - 1) * step;
  ctx.beginPath();
  combined.forEach((pt, i) => {
    const x = pad + i * step, y = pad + gh - ((pt.v - mn) / range) * gh;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo(lx, zy); ctx.lineTo(pad, zy); ctx.closePath();
  ctx.fillStyle = lastVal2 >= 0 ? 'rgba(0,204,102,.06)' : 'rgba(255,51,68,.06)';
  ctx.fill();
  const totalW = hist.w.reduce((a, b) => a + b, 0);
  const totalL = hist.l.reduce((a, b) => a + b, 0);
  const net = totalW - totalL;
  $('graph-detail').innerHTML =
    `<span style="color:var(--green)">Wins: ${hist.w.length} (${fmt(totalW)})</span> &nbsp;|&nbsp; ` +
    `<span style="color:var(--red)">Losses: ${hist.l.length} (${fmt(totalL)})</span> &nbsp;|&nbsp; ` +
    `Net: <span style="color:${net >= 0 ? 'var(--green)' : 'var(--red)'}">${fmt(net)}</span>`;
}

/* ============================================================
   PLINKO (triangle formation, multipliers on sides)
   ============================================================ */
const PW = 500, PH = 620;
const PPR = 4, PBR = 5;
const PROWS = 14;
const PDX = 32, PDY = 38;
const PY0 = 55;
const PGRAV = .28, PFRIC = .992, PBNC = .52, PWAL = .45;
const PMULTS = [20, 5, 2, 1, 0.5, 0.3, 0.2, 0.3, 0.5, 1, 2, 5, 20];
const PBUCKETY = PH - 50;
const PLEFT = (PW - (PROWS + 4) * PDX) / 2;
let pCanvas, pCtx, pPins = [], pBalls = [], pParts = [];
let pBGlows = new Float32Array(PMULTS.length), pShake = 0;

function initPlinko() {
  pCanvas = $('plinko-c');
  if (!pCanvas) return;
  pCtx = pCanvas.getContext('2d');
  const area = $('plinko-view');
  const w = area.clientWidth, h = area.clientHeight;
  const scale = Math.min(w / PW, h / PH, .95);
  pCanvas.width = PW; pCanvas.height = PH;
  pCanvas.style.width = (PW * scale) + 'px';
  pCanvas.style.height = (PH * scale) + 'px';
  pPins = [];
  for (let r = 0; r < PROWS; r++) {
    const cols = r + 3;
    const ox = PW / 2 - ((cols - 1) * PDX) / 2;
    for (let c = 0; c < cols; c++) pPins.push({ x: ox + c * PDX, y: PY0 + r * PDY, glow: 0 });
  }
  pBalls = []; pParts = [];
}
function dropPlinko() {
  if (S.cash < S.bet) return;
  S.cash -= S.bet;
  const x = PW / 2 + (Math.random() - .5) * 26;
  pBalls.push({ x, y: 12, vx: (Math.random() - .5) * 1.2, vy: 0, alive: true, age: 0, hue: Math.random() * 360, processed: false, trail: [] });
  updUI();
}
function tickPlinko() {
  for (let i = pBalls.length - 1; i >= 0; i--) {
    const b = pBalls[i];
    if (!b.alive) { if (b.age > 12) pBalls.splice(i, 1); else b.age++; continue; }
    b.vy += PGRAV; b.x += b.vx; b.y += b.vy; b.vx *= PFRIC; b.age++;
    if (b.x < PBR + 4) { b.x = PBR + 4; b.vx = Math.abs(b.vx) * PWAL; }
    if (b.x > PW - PBR - 4) { b.x = PW - PBR - 4; b.vx = -Math.abs(b.vx) * PWAL; }
    for (const p of pPins) {
      const dx = b.x - p.x, dy = b.y - p.y, d2 = dx * dx + dy * dy, md = PBR + PPR;
      if (d2 < md * md && d2 > 0) {
        const d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
        b.x = p.x + nx * md; b.y = p.y + ny * md;
        const dot = b.vx * nx + b.vy * ny;
        b.vx = (b.vx - 2 * dot * nx) * PBNC + (Math.random() - .5) * .5;
        b.vy = (b.vy - 2 * dot * ny) * PBNC;
        if (S.plPin > 0) b.vy -= S.plPin * .015;
        p.glow = 1;
        for (let j = 0; j < 3; j++) {
          const a = Math.random() * Math.PI * 2, sp = .6 + Math.random() * 2;
          pParts.push([p.x, p.y, Math.cos(a) * sp, Math.sin(a) * sp, 1, .04 + Math.random() * .02, .8 + Math.random() * 1.2, b.hue + (Math.random() - .5) * 15]);
        }
      }
    }
    if (b.age % 3 === 0) b.trail.push(b.x, b.y);
    if (b.trail.length > 20) { b.trail.shift(); b.trail.shift(); }
    if (b.y >= PBUCKETY) {
      b.alive = false;
      if (b.x < PLEFT) b.x = PLEFT;
      if (b.x > PW - PLEFT) b.x = PW - PLEFT;
      const bw = (PW - 2 * PLEFT) / PMULTS.length;
      const bi = Math.max(0, Math.min(PMULTS.length - 1, Math.floor((b.x - PLEFT) / bw)));
      let mult = PMULTS[bi];
      const ci = Math.floor(PMULTS.length / 2), dist = Math.abs(bi - ci);
      if (S.plEdge > 0 && dist >= ci - 1) mult += S.plEdge;
      if (S.plCenter > 0 && dist <= 1) mult += S.plCenter;
      if (S.plLucky > 0 && Math.random() < S.plLucky) mult *= 2;
      if (S.plMega > 0 && Math.random() < S.plMega) mult *= 3;
      const win = Math.round(S.bet * mult);
      pBGlows[bi] = 1;
      for (let j = 0; j < 10; j++) {
        const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 3;
        pParts.push([b.x, PBUCKETY - 8, Math.cos(a) * sp, Math.sin(a) * sp - 1, 1, .02, 1 + Math.random() * 2, 0, 0, 255, 200]);
      }
      pShake = 1.5;
      const rect = pCanvas.getBoundingClientRect();
      showFloat(rect.left + b.x * (rect.width / PW), rect.top + PBUCKETY * (rect.height / PH) - 15, '+' + fmt(win), mult >= 10 ? '#ffd700' : '#00ffcc');
      toast('+' + fmt(win) + ' (' + mult.toFixed(1) + 'x)', mult >= 10 ? 'gold' : 'win');
      endRound(true, win);
    }
  }
  for (let i = pParts.length - 1; i >= 0; i--) {
    const p = pParts[i]; p[0] += p[2]; p[1] += p[3]; p[2] *= .95; p[3] *= .95; p[4] -= p[5];
    if (p[4] <= 0) pParts.splice(i, 1);
  }
}
function drawPlinko() {
  const c = pCtx; if (!c) return;
  c.clearRect(0, 0, PW, PH);
  c.save();
  if (pShake > .08) { c.translate((Math.random() - .5) * pShake * 2, (Math.random() - .5) * pShake * 2); pShake *= .82; } else pShake = 0;
  const rg = c.createRadialGradient(PW / 2, 50, 0, PW / 2, 50, PH * .7);
  rg.addColorStop(0, '#12122a'); rg.addColorStop(1, '#08080f');
  c.fillStyle = rg; c.fillRect(0, 0, PW, PH);
  c.strokeStyle = 'rgba(28,28,48,.15)'; c.lineWidth = 1;
  for (let x = 0; x < PW; x += 36) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, PH); c.stroke(); }
  for (let y = 0; y < PH; y += 36) { c.beginPath(); c.moveTo(0, y); c.lineTo(PW, y); c.stroke(); }
  c.strokeStyle = 'rgba(120,120,180,.25)'; c.lineWidth = 3;
  c.beginPath(); c.moveTo(4, PY0 - 10); c.lineTo(4, PBUCKETY + 30); c.stroke();
  c.beginPath(); c.moveTo(PW - 4, PY0 - 10); c.lineTo(PW - 4, PBUCKETY + 30); c.stroke();
  c.strokeStyle = 'rgba(120,120,180,.12)'; c.lineWidth = 1;
  c.setLineDash([4, 4]);
  const lastRow = PROWS - 1;
  const lastCols = lastRow + 3;
  const lox = PW / 2 - ((lastCols - 1) * PDX) / 2;
  c.beginPath(); c.moveTo(lox - PDX, PY0 + lastRow * PDY + PDY / 2); c.lineTo(PLEFT - 4, PBUCKETY); c.stroke();
  c.beginPath(); c.moveTo(lox + (lastCols) * PDX, PY0 + lastRow * PDY + PDY / 2); c.lineTo(PW - PLEFT + 4, PBUCKETY); c.stroke();
  c.setLineDash([]);
  const bw = (PW - 2 * PLEFT) / PMULTS.length;
  for (let i = 0; i < PMULTS.length; i++) {
    const x = PLEFT + i * bw, m = PMULTS[i], g = pBGlows[i];
    const isEdge = i <= 1 || i >= PMULTS.length - 2;
    const isCenter = Math.abs(i - Math.floor(PMULTS.length / 2)) <= 1;
    let bg;
    if (m >= 30) bg = 'rgba(255,51,102,.12)';
    else if (m >= 10) bg = 'rgba(255,100,50,.08)';
    else if (m >= 3) bg = 'rgba(255,215,0,.06)';
    else if (m >= 1) bg = 'rgba(123,45,255,.04)';
    else bg = 'rgba(50,50,75,.03)';
    if (g > .01) { c.fillStyle = `rgba(255,255,255,${g * .15})`; c.fillRect(x, PBUCKETY - 8, bw, 38); pBGlows[i] *= .88; }
    c.fillStyle = bg; c.fillRect(x, PBUCKETY - 8, bw, 38);
    c.strokeStyle = 'rgba(60,60,90,.3)'; c.lineWidth = 1; c.strokeRect(x, PBUCKETY - 8, bw, 38);
    c.font = 'bold ' + (m >= 30 ? 11 : m >= 10 ? 10 : m >= 3 ? 9 : 8) + 'px Orbitron,monospace';
    c.fillStyle = m >= 30 ? '#ff3366' : m >= 10 ? '#ff6644' : m >= 3 ? '#ffd700' : m >= 1 ? '#7b2dff' : '#3a3a55';
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(m + 'x', x + bw / 2, PBUCKETY + 10);
  }
  for (const p of pPins) {
    if (p.glow > .02) { c.beginPath(); c.arc(p.x, p.y, PPR + 6, 0, Math.PI * 2); c.fillStyle = `rgba(255,120,200,${p.glow * .2})`; c.fill(); p.glow *= .85; }
    c.beginPath(); c.arc(p.x, p.y, PPR, 0, Math.PI * 2);
    const pg = c.createRadialGradient(p.x - .5, p.y - 1, 0, p.x, p.y, PPR);
    pg.addColorStop(0, `rgba(160,160,210,${.5 + p.glow * .3})`); pg.addColorStop(1, `rgba(70,70,110,${.5 + p.glow * .3})`);
    c.fillStyle = pg; c.fill();
  }
  for (const b of pBalls) {
    if (!b.alive) continue;
    const tl = b.trail.length;
    for (let j = 0; j < tl; j += 2) {
      const a = (1 - j / tl) * .2, s = PBR * (1 - j / tl) * .3;
      if (a < .01) continue;
      c.beginPath(); c.arc(b.trail[j], b.trail[j + 1], s, 0, Math.PI * 2);
      c.fillStyle = `hsla(${b.hue + j * 3},100%,60%,${a})`; c.fill();
    }
    const bg2 = c.createRadialGradient(b.x - 1, b.y - 1.5, 0, b.x, b.y, PBR);
    bg2.addColorStop(0, '#d0d0ff'); bg2.addColorStop(1, '#6060bb');
    c.beginPath(); c.arc(b.x, b.y, PBR, 0, Math.PI * 2); c.fillStyle = bg2; c.fill();
    c.beginPath(); c.arc(b.x - 1, b.y - 1.5, 1.2, 0, Math.PI * 2); c.fillStyle = 'rgba(255,255,255,.5)'; c.fill();
  }
  for (const p of pParts) {
    const sz = p[6] * p[4]; if (sz < .2) continue;
    c.beginPath(); c.arc(p[0], p[1], sz, 0, Math.PI * 2);
    c.fillStyle = p.length > 8 ? `rgba(${p[8]},${p[9]},${p[10]},${p[4]})` : `hsla(${p[7]},100%,60%,${p[4]})`;
    c.fill();
  }
  c.restore();
}
function plinkoLoop() { if (S.game === 'plinko') { tickPlinko(); drawPlinko(); } requestAnimationFrame(plinkoLoop); }

/* ============================================================
   DICE
   ============================================================ */
let diceTarget = 50, diceVisual = 50, diceChoice = 'over', diceDragging = false;

function updDiceMult() {
  const t = diceTarget;
  let prob = diceChoice === 'over' ? (100 - t) / 100 : t / 100;
  prob = Math.max(.01, Math.min(.99, prob));
  const edge = .02 - S.diceEdge;
  const mult = Math.max(1.01, ((1 - edge) / prob) + S.diceBonus);
  $('dice-mult-info').textContent = mult.toFixed(2) + 'x  •  Win ' + fmt(Math.round(S.bet * mult));
}
function updDiceSliderVisual() {
  const handle = $('dice-handle');
  const fillOver = $('dice-fill-over');
  const fillUnder = $('dice-fill-under');
  if (handle) handle.style.left = `calc(${diceVisual}% - 11px)`;
  if (diceChoice === 'over') { if (fillOver) fillOver.style.width = (100 - diceVisual) + '%'; if (fillUnder) fillUnder.style.width = '0%'; }
  else { if (fillUnder) fillUnder.style.width = diceVisual + '%'; if (fillOver) fillOver.style.width = '0%'; }
}
function setDiceChoice(c) {
  diceChoice = c;
  $('dch-over').className = 'dChoice' + (c === 'over' ? ' sel-over' : '');
  $('dch-under').className = 'dChoice' + (c === 'under' ? ' sel-under' : '');
  updDiceMult();
}
function initDiceSlider() {
  const handle = $('dice-handle');
  const track = $('dice-track');
  if (!handle || !track) return;
  const startDrag = e => { e.preventDefault(); diceDragging = true; moveDice(e); };
  handle.addEventListener('mousedown', startDrag);
  handle.addEventListener('touchstart', startDrag, { passive: false });
  window.addEventListener('mousemove', e => { if (diceDragging) moveDice(e); });
  window.addEventListener('touchmove', e => { if (diceDragging) moveDice(e.touches[0]); }, { passive: false });
  window.addEventListener('mouseup', () => { diceDragging = false; });
  window.addEventListener('touchend', () => { diceDragging = false; });
  track.addEventListener('click', e => { moveDice(e); });
  function moveDice(e) {
    const rect = track.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    diceTarget = Math.max(0, Math.min(100, Math.round(((clientX - rect.left) / rect.width) * 100)));
    updDiceMult();
  }
}
function animateDiceSlider() {
  diceVisual += (diceTarget - diceVisual) * 0.14;
  if (Math.abs(diceVisual - diceTarget) < 0.15) diceVisual = diceTarget;
  updDiceSliderVisual();
  requestAnimationFrame(animateDiceSlider);
}
function rollDice() {
  if (S.cash < S.bet) return;
  S.cash -= S.bet;
  const target = diceTarget, result = Math.floor(Math.random() * 101);
  const won = diceChoice === 'over' ? result > target : result < target;
  const num = $('dice-num');
  const ball = $('dice-ball');
  num.className = 'rolling';
  if (ball) { ball.classList.add('active'); ball.style.left = '10%'; }
  const duration = 1400, startTime = performance.now();
  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    if (progress < 0.65) {
      num.textContent = Math.floor(Math.random() * 101);
      num.style.textShadow = `0 0 ${15 + progress * 35}px var(--accent2)`;
      num.style.color = 'var(--text)';
      if (ball) {
        const ease = 1 - Math.pow(1 - progress / 0.65, 3);
        ball.style.left = (10 + ease * 80) + '%';
      }
    } else {
      const dp = (progress - 0.65) / 0.35;
      if (Math.random() < 1 - dp * 0.6) num.textContent = Math.floor(Math.random() * 101);
      num.style.textShadow = `0 0 ${38 + dp * 22}px ${won ? 'var(--green)' : 'var(--red)'}`;
      if (ball) {
        const bounceEase = 1 - Math.pow(1 - dp, 2);
        ball.style.left = (90 + bounceEase * 5) + '%';
      }
      if (progress >= 1) {
        num.textContent = result;
        num.className = won ? 'win' : 'lose';
        num.style.textShadow = won ? '0 0 30px rgba(0,204,102,.4)' : '0 0 30px rgba(255,51,68,.4)';
        if (ball) { ball.style.left = '92%'; ball.style.boxShadow = won ? '0 0 16px rgba(0,204,102,.7),0 0 32px rgba(0,204,102,.4)' : '0 0 16px rgba(255,51,68,.7),0 0 32px rgba(255,51,68,.4)'; setTimeout(() => { ball.classList.remove('active'); ball.style.boxShadow = ''; }, 800); }
        if (won) {
          let prob = diceChoice === 'over' ? (100 - target) / 100 : target / 100;
          prob = Math.max(.01, Math.min(.99, prob));
          let mult = Math.max(1.01, ((.98 + S.diceEdge) / prob) + S.diceBonus);
          let win = Math.round(S.bet * mult);
          if (S.diceCrit > 0 && Math.random() < S.diceCrit) { win *= 2; toast('CRIT 2x!', 'gold'); }
          toast('+' + fmt(win), 'win');
          endRound(true, win);
        } else { toast('Lost ' + fmt(S.bet), 'loss'); endRound(false, 0); }
        return;
      }
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ============================================================
   SLOTS (with BAR symbol and win lines)
   ============================================================ */
const SYMS = ['🍒', '🍋', '🍊', '💎', '7️⃣', '⭐', 'BAR'];
const SWEIGHTS = [25, 22, 18, 4, 8, 8, 15];
const STOTAL = SWEIGHTS.reduce((a, b) => a + b, 0);
function randSym() { let r = Math.floor(Math.random() * STOTAL); for (let i = 0; i < SWEIGHTS.length; i++) { r -= SWEIGHTS[i]; if (r < 0) return i; } return 0; }
let slotsMode = 'classic', slotsSpinning = false;

function toggleSlotsMode() {
  if (slotsSpinning) return;
  slotsMode = slotsMode === 'classic' ? 'modern' : 'classic';
  $('slots-mode-btn').textContent = slotsMode === 'classic' ? 'CLASSIC 3×1' : 'MODERN 5×3';
  const machine = $('slots-machine');
  machine.classList.add('mode-swap');
  setTimeout(() => machine.classList.remove('mode-swap'), 400);
  rebuildSlotsMachine();
}
function rebuildSlotsMachine() {
  const reels = $('slots-reels');
  if (slotsMode === 'classic') {
    reels.innerHTML = `
      <div class="slot-reel" id="reel0"><span class="slot-sym">🍒</span></div>
      <div class="slot-reel" id="reel1"><span class="slot-sym">🍋</span></div>
      <div class="slot-reel" id="reel2"><span class="slot-sym">🍊</span></div>`;
  } else {
    let html = '';
    for (let c = 0; c < 5; c++) {
      html += `<div class="slot-col" id="scol${c}">`;
      for (let r = 0; r < 3; r++) html += `<div class="slot-cell" id="sc${c}r${r}"><span class="slot-sym">🍒</span></div>`;
      html += '</div>';
    }
    reels.innerHTML = html;
  }
}
function spinSlots() {
  if (slotsSpinning) return;
  if (S.cash < S.bet) return;
  slotsSpinning = true;
  const lever = $('slot-lever');
  if (lever) {
    lever.classList.remove('spring');
    lever.classList.add('pulled');
    setTimeout(() => { lever.classList.remove('pulled'); lever.classList.add('spring'); }, 150);
    setTimeout(() => lever.classList.remove('spring'), 500);
  }
  $('slots-win-lines').textContent = '';
  if (slotsMode === 'classic') spinSlotsClassic(); else spinSlots3x5();
}
function spinSlotsClassic() {
  S.cash -= S.bet;
  $('slots-result').textContent = '';
  const results = [randSym(), randSym(), randSym()];
  const reels = [$('reel0'), $('reel1'), $('reel2')];
  const syms = reels.map(r => r.querySelector('.slot-sym'));
  const DURATIONS = [600, 900, 1200];
  const phases = [0, 0, 0];
  const startTimes = performance.now();
  reels.forEach((r, i) => { r.classList.remove('landed'); });
  function tick() {
    let allDone = true;
    const now = performance.now();
    for (let i = 0; i < 3; i++) {
      if (phases[i] === 2) continue;
      allDone = false;
      const progress = Math.min(1, (now - startTimes) / DURATIONS[i]);
      if (progress < 0.55) {
        syms[i].textContent = SYMS[Math.floor(Math.random() * SYMS.length)];
        syms[i].style.filter = 'blur(3px)'; syms[i].style.transform = '';
      } else if (progress < 1) {
        const dp = (progress - 0.55) / 0.45;
        if (Math.random() < 1 - dp * 0.7) syms[i].textContent = SYMS[Math.floor(Math.random() * SYMS.length)];
        syms[i].style.filter = `blur(${(1 - dp) * 3}px)`;
        if (dp > 0.7) { const bounce = Math.sin((dp - 0.7) / 0.3 * Math.PI) * 3; syms[i].style.transform = `translateY(${bounce}px)`; }
      } else {
        phases[i] = 2;
        syms[i].textContent = SYMS[results[i]];
        syms[i].style.filter = 'blur(0)'; syms[i].style.transform = '';
        reels[i].classList.add('landed');
      }
    }
    if (!allDone) requestAnimationFrame(tick);
    else { slotsSpinning = false; checkSlotsWin(results); }
  }
  requestAnimationFrame(tick);
}
function spinSlots3x5() {
  S.cash -= S.bet;
  $('slots-result').textContent = '';
  const results = [];
  for (let c = 0; c < 5; c++) { results[c] = []; for (let r = 0; r < 3; r++) results[c][r] = randSym(); }
  const DURATIONS = [500, 650, 800, 950, 1100];
  const phases = [0, 0, 0, 0, 0];
  const startTimes = performance.now();
  function tick() {
    let allDone = true;
    const now = performance.now();
    for (let c = 0; c < 5; c++) {
      if (phases[c] === 2) continue;
      allDone = false;
      const progress = Math.min(1, (now - startTimes) / DURATIONS[c]);
      for (let r = 0; r < 3; r++) {
        const cell = $(`sc${c}r${r}`); if (!cell) continue;
        const sym = cell.querySelector('.slot-sym');
        cell.classList.remove('win-line');
        if (progress < 0.5) { sym.textContent = SYMS[Math.floor(Math.random() * SYMS.length)]; sym.style.filter = 'blur(2px)'; sym.style.transform = ''; }
        else if (progress < 1) {
          const dp = (progress - 0.5) / 0.5;
          if (Math.random() < 1 - dp * 0.6) sym.textContent = SYMS[Math.floor(Math.random() * SYMS.length)];
          sym.style.filter = `blur(${(1 - dp) * 2}px)`;
          if (dp > 0.7) { const bounce = Math.sin((dp - 0.7) / 0.3 * Math.PI) * 2; sym.style.transform = `translateY(${bounce}px)`; }
        } else {
          sym.textContent = SYMS[results[c][r]]; sym.style.filter = 'blur(0)'; sym.style.transform = '';
        }
      }
      if (progress >= 1) phases[c] = 2;
    }
    if (!allDone) requestAnimationFrame(tick);
    else { slotsSpinning = false; checkSlotsWin3x5(results); }
  }
  requestAnimationFrame(tick);
}
function checkSlotsWin(results) {
  const syms = results.map(i => SYMS[i]);
  let wm = 0;
  if (syms[0] === syms[1] && syms[1] === syms[2]) {
    wm = syms[0] === '💎' ? 50 : syms[0] === '7️⃣' ? 25 : syms[0] === 'BAR' ? 15 : syms[0] === '🍒' ? 10 : syms[0] === '🍋' ? 8 : syms[0] === '🍊' ? 5 : syms[0] === '⭐' ? 4 : 3;
  } else if (syms[0] === syms[1] || syms[1] === syms[2] || syms[0] === syms[2]) { wm = 2; }
  wm += S.slBonus;
  if (wm === 0 && S.slPity > 0 && lossesStreak >= 3) { wm = 1.5; toast('PITY!', 'info'); }
  if (wm > 0) {
    const win = Math.round(S.bet * wm);
    $('slots-result').textContent = '+' + fmt(win); $('slots-result').style.color = '#00ffcc';
    $('slots-machine').classList.add('slots-win-flash');
    setTimeout(() => $('slots-machine').classList.remove('slots-win-flash'), 500);
    toast('+' + fmt(win) + ' (' + wm.toFixed(1) + 'x)', 'win');
    endRound(true, win);
  } else {
    $('slots-result').textContent = 'No match'; $('slots-result').style.color = '#ff3344';
    endRound(false, 0);
  }
}
function checkSlotsWin3x5(grid) {
  const PAYLINES = [[[0,1],[1,1],[2,1],[3,1],[4,1]],[[0,0],[1,0],[2,0],[3,0],[4,0]],[[0,2],[1,2],[2,2],[3,2],[4,2]],[[0,0],[1,1],[2,2],[3,1],[4,0]],[[0,2],[1,1],[2,0],[3,1],[4,2]]];
  let totalWin = 0, winLines = 0;
  const lineNames = ['Middle', 'Top', 'Bottom', 'V-Shape', 'A-Shape'];
  const winLineTexts = [];
  for (let li = 0; li < PAYLINES.length; li++) {
    const line = PAYLINES[li];
    const lineSyms = line.map(([c, r]) => SYMS[grid[c][r]]);
    let matchLen = 1;
    for (let i = 1; i < lineSyms.length; i++) { if (lineSyms[i] === lineSyms[i-1]) matchLen++; else break; }
    if (matchLen >= 3) {
      const s = lineSyms[0];
      const mult = s === '💎' ? 20 : s === '7️⃣' ? 12 : s === 'BAR' ? 8 : s === '🍒' ? 6 : s === '🍋' ? 4 : s === '🍊' ? 3 : s === '⭐' ? 3 : 2;
      totalWin += mult * (matchLen === 4 ? 2 : matchLen === 5 ? 5 : 1);
      winLines++;
      winLineTexts.push(lineNames[li] + ': ' + s + '×' + matchLen);
      for (let i = 0; i < matchLen; i++) {
        const [c, r] = line[i];
        const cell = $(`sc${c}r${r}`);
        if (cell) cell.classList.add('win-line');
      }
    }
  }
  totalWin += S.slBonus;
  if (totalWin > 0) {
    const win = Math.round(S.bet * totalWin);
    $('slots-result').textContent = '+' + fmt(win);
    $('slots-result').style.color = '#00ffcc';
    $('slots-win-lines').textContent = winLineTexts.join(' • ');
    toast('+' + fmt(win) + (winLines > 1 ? ' (' + winLines + ' lines!)' : ''), 'win');
    endRound(true, win);
  } else {
    $('slots-result').textContent = 'No match'; $('slots-result').style.color = '#ff3344';
    $('slots-win-lines').textContent = '';
    endRound(false, 0);
  }
}

/* ============================================================
   MINES (with combo counter)
   ============================================================ */
const MGRID = 5;
let mState = null;
function changeMinesCount(d) { minesCount = Math.max(1, Math.min(10, minesCount + d)); $('mines-count-display').textContent = minesCount; updMinesInfo(); }
function updMinesInfo() {
  if (!mState) {
    const mult = getMinesMult(0);
    $('mines-possible-win').textContent = 'Win: ' + fmt(Math.round(S.bet * mult));
    $('mines-combo').innerHTML = '';
  } else {
    const mult = getMinesMult(mState.picks);
    $('mines-possible-win').textContent = 'Win: ' + fmt(Math.round(mState.bet * mult));
    if (mState.picks > 0) {
      const stepMult = Math.pow((MGRID * MGRID) / (MGRID * MGRID - minesCount + S.mnSafe), 1);
      $('mines-combo').innerHTML = '💎 ×' + mState.picks + ' <span class="combo-mult">(' + stepMult.toFixed(2) + 'x each)</span>';
    } else {
      $('mines-combo').innerHTML = '';
    }
  }
}
function initMinesGrid() {
  const g = $('mines-grid'); if (!g) return; g.innerHTML = '';
  for (let i = 0; i < MGRID * MGRID; i++) {
    const cell = document.createElement('div');
    cell.className = 'mcell'; cell.dataset.i = i;
    cell.onclick = () => revealMine(i);
    g.appendChild(cell);
  }
}
function startMines() {
  if (S.cash < S.bet) return;
  S.cash -= S.bet;
  const total = MGRID * MGRID, mc = minesCount - S.mnSafe;
  const mineSet = new Set();
  while (mineSet.size < mc) mineSet.add(Math.floor(Math.random() * total));
  mState = { revealed: new Set(), mines: mineSet, safeLeft: total - mc, bet: S.bet, alive: true, picks: 0 };
  document.querySelectorAll('.mcell').forEach(c => { c.className = 'mcell'; c.innerHTML = ''; });
  $('mines-cashout').disabled = false; $('mines-start').disabled = true;
  $('mines-mult').textContent = '1.00x'; $('mines-info').textContent = 'Pick a tile!';
  updUI(); updMinesInfo();
}
function getMinesMult(picks) {
  const base = (MGRID * MGRID) / (MGRID * MGRID - minesCount + S.mnSafe);
  return Math.pow(base, picks) + S.mnBonus * picks * .08;
}
function revealMine(i) {
  if (!mState || !mState.alive || mState.revealed.has(i)) return;
  mState.revealed.add(i);
  const cell = document.querySelectorAll('.mcell')[i];
  if (mState.mines.has(i)) {
    if (S.mnInsurance > 0 && Math.random() < S.mnInsurance) {
      cell.className = 'mcell rev safe'; cell.innerHTML = '<span class="shield">🛡️</span>';
      spawnInsuredPop(cell);
      toast('INSURED!', 'info');
    } else {
      cell.className = 'mcell rev boom'; cell.innerHTML = '<span class="sym">💣</span>';
      spawnMineExplosion(cell);
      mState.alive = false;
      mState.mines.forEach(m => { if (!mState.revealed.has(m)) { const mc = document.querySelectorAll('.mcell')[m]; mc.className = 'mcell rev boom'; mc.innerHTML = '<span class="sym">💣</span>'; } });
      $('mines-cashout').disabled = true; $('mines-start').disabled = false;
      $('mines-info').textContent = 'BOOM! Lost ' + fmt(mState.bet);
      $('mines-mult').textContent = '0x';
      toast('BOOM! -' + fmt(mState.bet), 'loss');
      endRound(false, 0); mState = null; updMinesInfo(); return;
    }
  } else {
    cell.className = 'mcell rev safe'; cell.innerHTML = '<span class="sym">💎</span>';
    spawnDiamondSparkle(cell);
    mState.picks++; mState.safeLeft--;
  }
  const mult = getMinesMult(mState.picks);
  $('mines-mult').textContent = mult.toFixed(2) + 'x';
  $('mines-info').textContent = 'Safe left: ' + mState.safeLeft;
  updMinesInfo();
  if (mState.safeLeft === 0) cashoutMines();
}
function cashoutMines() {
  if (!mState || !mState.alive || mState.picks === 0) return;
  const mult = getMinesMult(mState.picks);
  const win = Math.round(mState.bet * mult);
  toast('Cashed out +' + fmt(win) + ' (' + mult.toFixed(2) + 'x)', 'gold');
  $('mines-cashout').disabled = true; $('mines-start').disabled = false;
  $('mines-info').textContent = 'Cashed out at ' + mult.toFixed(2) + 'x!';
  endRound(true, win); mState = null; updMinesInfo();
}

/* ============================================================
   BLACKJACK
   ============================================================ */
const BJ_SUITS = ['♠', '♥', '♦', '♣'];
const BJ_VALS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let bjDeck = [], bjDealer = [], bjPlayer = [], bjState = 'idle', bjBet = 0;

function bjShuffle() {
  bjDeck = [];
  for (let s = 0; s < 4; s++) for (const v of BJ_VALS) bjDeck.push({ suit: BJ_SUITS[s], val: v });
  for (let i = bjDeck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [bjDeck[i], bjDeck[j]] = [bjDeck[j], bjDeck[i]]; }
}
function bjCardVal(c) { return c.val === 'A' ? 11 : ['K', 'Q', 'J'].includes(c.val) ? 10 : parseInt(c.val); }
function bjHandVal(h) { let s = 0, aces = 0; for (const c of h) { s += bjCardVal(c); if (c.val === 'A') aces++; } while (s > 21 && aces > 0) { s -= 10; aces--; } return s; }
function bjRenderHands(dealerReveal) {
  const dc = $('bj-dealer-cards'), pc = $('bj-player-cards');
  dc.innerHTML = ''; pc.innerHTML = '';
  bjDealer.forEach((c, i) => {
    const el = document.createElement('div');
    if (!dealerReveal && i === 1) { el.className = 'bj-card facedown'; el.innerHTML = '<div class="card-val">?</div><div class="card-sym">?</div>'; }
    else { el.className = 'bj-card'; el.innerHTML = `<div class="card-val">${c.val}</div><div class="card-sym" style="color:${c.suit === '♥' || c.suit === '♦' ? '#cc0000' : '#111'}">${c.suit}</div>`; }
    el.style.animationDelay = (i * 0.1) + 's';
    dc.appendChild(el);
  });
  bjPlayer.forEach((c, i) => {
    const el = document.createElement('div');
    el.className = 'bj-card';
    el.innerHTML = `<div class="card-val">${c.val}</div><div class="card-sym" style="color:${c.suit === '♥' || c.suit === '♦' ? '#cc0000' : '#111'}">${c.suit}</div>`;
    el.style.animationDelay = (i * 0.1) + 's';
    pc.appendChild(el);
  });
  $('bj-dealer-total').textContent = dealerReveal ? bjHandVal(bjDealer) : bjHandVal([bjDealer[0]]);
  $('bj-player-total').textContent = bjHandVal(bjPlayer);
}
function bjNew() {
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  bjShuffle(); bjDealer = []; bjPlayer = [];
  bjDealer.push(bjDeck.pop(), bjDeck.pop());
  bjPlayer.push(bjDeck.pop(), bjDeck.pop());
  bjState = 'playing'; bjBet = S.bet;
  S.cash -= S.bet;
  $('bj-result').textContent = '';
  bjRenderHands(false);
  $('bj-hit').disabled = false; $('bj-stand').disabled = false;
  $('bj-double').disabled = S.cash < S.bet;
  $('bj-deal').disabled = true;
  updUI();
  if (bjHandVal(bjPlayer) === 21) setTimeout(() => bjStand(), 300);
}
function bjHit() {
  if (bjState !== 'playing') return;
  bjPlayer.push(bjDeck.pop());
  bjRenderHands(false);
  $('bj-double').disabled = true;
  if (bjHandVal(bjPlayer) > 21) bjFinish('bust');
}
function bjStand() {
  if (bjState !== 'playing') return;
  bjState = 'dealer';
  bjRenderHands(true);
  function dealerPlay() {
    if (bjHandVal(bjDealer) < 17) {
      bjDealer.push(bjDeck.pop());
      bjRenderHands(true);
      setTimeout(dealerPlay, 400);
    } else {
      const dv = bjHandVal(bjDealer), pv = bjHandVal(bjPlayer);
      if (dv > 21) bjFinish('dealer-bust');
      else if (pv > dv) bjFinish('win');
      else if (dv > pv) bjFinish('lose');
      else bjFinish('push');
    }
  }
  setTimeout(dealerPlay, 400);
}
function bjDouble() {
  if (bjState !== 'playing' || S.cash < S.bet) return;
  S.cash -= S.bet; bjBet += S.bet;
  bjPlayer.push(bjDeck.pop());
  bjRenderHands(false);
  if (bjHandVal(bjPlayer) > 21) bjFinish('bust');
  else bjStand();
}
function bjFinish(result) {
  bjState = 'done';
  bjRenderHands(true);
  $('bj-hit').disabled = true; $('bj-stand').disabled = true; $('bj-double').disabled = true; $('bj-deal').disabled = false;
  const pv = bjHandVal(bjPlayer), dv = bjHandVal(bjDealer);
  let msg = '', color = '', winAmt = 0;
  const isNatural = pv === 21 && bjPlayer.length === 2;
  const payout = 1.5 + S.bjPayout;
  if (result === 'bust') { msg = 'BUST! ' + pv; color = '#ff3344'; toast('Busted!', 'loss'); }
  else if (result === 'dealer-bust') { msg = 'DEALER BUSTS! +' + fmt(Math.round(bjBet * payout)); color = '#00ffcc'; winAmt = Math.round(bjBet * payout); }
  else if (result === 'win') { msg = 'YOU WIN! +' + fmt(Math.round(bjBet * payout)); color = '#00ffcc'; winAmt = Math.round(bjBet * payout); }
  else if (result === 'lose') { msg = 'DEALER WINS. ' + dv + ' > ' + pv; color = '#ff3344'; toast('Dealer wins', 'loss'); }
  else { msg = 'PUSH'; color = '#ffd700'; winAmt = bjBet; }
  if (isNatural && winAmt > 0) { winAmt = Math.round(bjBet * (2 + S.bjPayout)); msg = 'BLACKJACK! +' + fmt(winAmt); color = '#ffd700'; toast('BLACKJACK! +' + fmt(winAmt), 'gold'); }
  else if (winAmt > bjBet) toast('+' + fmt(winAmt), 'win');
  $('bj-result').textContent = msg; $('bj-result').style.color = color;
  if (winAmt > bjBet) endRound(true, winAmt);
  else if (winAmt === bjBet) { S.cash += bjBet; }
  else endRound(false, 0);
  updUI();
}

/* ============================================================
   ROULETTE (fixed landing + multi-bet)
   ============================================================ */
const RL_REDS = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
function rlColor(n) { if (n === 0) return 'green'; return RL_REDS.includes(n) ? 'red' : 'black'; }
let rlSpinning = false, rlAngle = 0;
let rlActiveBets = [];

function rlToggleBet(el, type, val) {
  const existing = rlActiveBets.findIndex(b => b.type === type && b.val === val);
  if (existing >= 0) {
    rlActiveBets.splice(existing, 1);
    el.classList.remove('active');
  } else {
    rlActiveBets.push({ el, type, val });
    el.classList.add('active');
  }
  updateActiveBetsDisplay();
}
function updateActiveBetsDisplay() {
  const el = $('roulette-active-bets');
  if (!rlActiveBets.length) { el.textContent = 'No bets placed'; return; }
  el.textContent = rlActiveBets.map(b => {
    if (b.type === 'color') return b.val.toUpperCase();
    if (b.type === 'even') return 'EVEN';
    if (b.type === 'odd') return 'ODD';
    if (b.type === 'half') return b.val === 1 ? '1–18' : '19–36';
    if (b.type === 'dozen') return ['1–12','13–24','25–36'][b.val - 1];
    if (b.type === 'number') return '#' + b.val;
    return b.type;
  }).join(' • ');
}

function drawRouletteWheel() {
  const c = $('roulette-wheel'); if (!c) return;
  const ctx = c.getContext('2d');
  const cx = 150, cy = 150, r = 140;
  ctx.clearRect(0, 0, 300, 300);
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rlAngle);
  const nums = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
  const slice = (Math.PI * 2) / nums.length;
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i], a = i * slice - Math.PI / 2;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, a, a + slice); ctx.closePath();
    ctx.fillStyle = n === 0 ? '#009933' : RL_REDS.includes(n) ? '#cc0000' : '#1a1a3a';
    ctx.fill(); ctx.strokeStyle = '#333'; ctx.lineWidth = 1; ctx.stroke();
    ctx.save(); ctx.rotate(a + slice / 2); ctx.fillStyle = '#fff'; ctx.font = 'bold 10px Orbitron,monospace'; ctx.textAlign = 'center';
    ctx.fillText(n, r - 18, 4); ctx.restore();
  }
  ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI * 2);
  ctx.fillStyle = '#111'; ctx.fill(); ctx.strokeStyle = '#555'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#ddd'; ctx.font = 'bold 9px Orbitron,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('LUCKY', 0, 0);
  ctx.restore();
}

function rlSpin(targetNum, callback) {
  rlSpinning = true;
  $('roulette-spin-btn').disabled = true;
  const nums = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
  const slice = (Math.PI * 2) / nums.length;
  const targetIdx = nums.indexOf(targetNum);
  const targetAngle = -(targetIdx * slice + slice / 2);
  const currentAngleMod = ((rlAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const diff = ((targetAngle - currentAngleMod) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
  const totalSpin = Math.PI * 2 * (6 + Math.random() * 4) + diff;
  const startAngle = rlAngle;
  const duration = 4500;
  const startTime = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const ease = 1 - Math.pow(1 - t, 3);
    rlAngle = startAngle + totalSpin * ease;
    drawRouletteWheel();
    if (t < 1) requestAnimationFrame(tick);
    else { rlAngle = rlAngle % (Math.PI * 2); rlSpinning = false; $('roulette-spin-btn').disabled = false; callback(); }
  }
  requestAnimationFrame(tick);
}

function rlSpinAction() {
  if (rlSpinning || rlActiveBets.length === 0) { if (rlActiveBets.length === 0) toast('Place a bet first!', 'info'); return; }
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= S.bet;
  const betPerSelection = Math.max(1, Math.floor(S.bet / rlActiveBets.length));
  const result = Math.floor(Math.random() * 37);
  rlSpin(result, () => {
    let totalWin = 0;
    const resultColor = rlColor(result);
    for (const bet of rlActiveBets) {
      let won = false, mult = 0;
      if (bet.type === 'color') { won = resultColor === bet.val; mult = bet.val === 'green' ? 14 : 2; }
      else if (bet.type === 'even') { won = result !== 0 && result % 2 === 0; mult = 2; }
      else if (bet.type === 'odd') { won = result !== 0 && result % 2 === 1; mult = 2; }
      else if (bet.type === 'half') { won = bet.val === 1 ? (result >= 1 && result <= 18) : (result >= 19 && result <= 36); mult = 2; }
      else if (bet.type === 'dozen') { const lo = (bet.val - 1) * 12 + 1, hi = bet.val * 12; won = result >= lo && result <= hi; mult = 3; }
      else if (bet.type === 'number') { won = result === bet.val; mult = 35; }
      if (S.rlLucky > 0 && !won && Math.random() < S.rlLucky) { won = true; mult = 1; toast('LUCKY SAVE!', 'gold'); }
      if (won) totalWin += Math.round(betPerSelection * mult * (1 + S.rlBonus));
    }
    const sym = result === 0 ? '🟢' : rlColor(result) === 'red' ? '🔴' : '⚫';
    if (totalWin > 0) {
      $('roulette-result').textContent = sym + ' ' + result + ' — +' + fmt(totalWin);
      $('roulette-result').style.color = '#00ffcc';
      toast('+' + fmt(totalWin), 'win');
      endRound(true, totalWin);
    } else {
      $('roulette-result').textContent = sym + ' ' + result + ' — No match';
      $('roulette-result').style.color = '#ff3344';
      toast('-' + fmt(S.bet), 'loss');
      endRound(false, 0);
    }
    document.querySelectorAll('.rnum').forEach(el => el.classList.remove('rn-hit'));
    const hitEl = document.querySelector(`.rnum[data-num="${result}"]`);
    if (hitEl) hitEl.classList.add('rn-hit');
    updUI();
  });
}

function initRouletteNumbers() {
  const container = $('roulette-numbers'); if (!container) return;
  container.innerHTML = '';
  for (let i = 1; i <= 36; i++) {
    const el = document.createElement('div');
    el.className = 'rnum rn-' + rlColor(i);
    el.dataset.num = i;
    el.textContent = i;
    el.onclick = () => { rlToggleBet(el, 'number', i); };
    container.appendChild(el);
  }
}

/* ============================================================
   DRILLS (gradual dig: layers, depth mult, chance to explode)
   ============================================================ */
const DRILL_LAYERS = 8;
let drState = null;
let drAnimating = false;
let drAnimatingTimer = null;

function drAction() {
  if (drAnimating) return;
  if (!drState || !drState.alive) startDrills();
  else digLayer();
}

function startDrills() {
  if (drAnimating) return;
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= S.bet;
  const layers = [];
  let bombLayer = Math.floor(Math.random() * DRILL_LAYERS);
  for (let i = 0; i < DRILL_LAYERS; i++) {
    const mult = i === bombLayer ? 0 : (1 + i * 0.2 + Math.random() * 0.15);
    layers.push({ mult, revealed: false });
  }
  drState = { bet: S.bet, layers, current: 0, alive: true, totalMult: 1 };
  $('drills-result').textContent = '';
  $('drills-cashout').disabled = true;
  $('drills-mult').textContent = '1.00x';
  $('drills-info').textContent = 'Click DIG to drill!';
  buildDrillLayers();
  updUI();
}

function buildDrillLayers() {
  const container = $('drills-layers');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < DRILL_LAYERS; i++) {
    const el = document.createElement('div');
    el.className = 'drill-layer' + (i === 0 ? ' current' : '');
    el.textContent = 'Layer ' + (i + 1);
    el.id = 'drill-layer-' + i;
    container.appendChild(el);
  }
  const bit = $('drills-drill-bit');
  if (bit) { bit.style.top = '0px'; bit.style.display = 'block'; }
}

function digLayer() {
  if (!drState || !drState.alive || drAnimating) return;
  if (drState.current >= DRILL_LAYERS) return;
  drAnimating = true;
  if (drAnimatingTimer) clearTimeout(drAnimatingTimer);
  drAnimatingTimer = setTimeout(() => { drAnimating = false; drAnimatingTimer = null; }, 2000);
  const i = drState.current;
  const layer = drState.layers[i];
  const el = document.getElementById('drill-layer-' + i);
  const bit = $('drills-drill-bit');
  const targetTop = i * 50 + 8;
  if (bit) bit.style.top = targetTop + 'px';

  setTimeout(() => {
    layer.revealed = true;
    if (el) {
      el.classList.remove('current');
      el.classList.add('revealed');
    }
    if (layer.mult === 0) {
      if (el) { el.classList.add('boom'); el.textContent = '💣 BOOM!'; }
      $('drills-result').textContent = 'BOOM! -' + fmt(drState.bet);
      $('drills-result').style.color = '#ff3344';
      $('drills-info').textContent = 'You hit a bomb at layer ' + (i + 1) + '!';
      toast('BOOM! -' + fmt(drState.bet), 'loss');
      spawnDrillExplosion(el);
      if (bit) { bit.style.opacity = '0.3'; }
      drState.alive = false;
      $('drills-start').disabled = false;
      $('drills-cashout').disabled = true;
      endRound(false, 0);
      drState = null;
    } else {
      if (el) { el.classList.add('safe'); el.textContent = '💎 ' + layer.mult.toFixed(2) + 'x'; }
      drState.totalMult *= layer.mult;
      drState.current++;
      $('drills-mult').textContent = drState.totalMult.toFixed(2) + 'x';
      $('drills-possible-win').textContent = 'Win: ' + fmt(Math.round(drState.bet * drState.totalMult));
      $('drills-cashout').disabled = false;
      if (drState.current < DRILL_LAYERS) {
        const nextEl = document.getElementById('drill-layer-' + drState.current);
        if (nextEl) nextEl.classList.add('current');
        $('drills-info').textContent = 'Layer ' + drState.current + ' cleared! Dig deeper?';
      } else {
        $('drills-info').textContent = 'All layers cleared!';
        cashoutDrills();
      }
    }
    drAnimating = false;
    if (drAnimatingTimer) { clearTimeout(drAnimatingTimer); drAnimatingTimer = null; }
  }, 450);
}

function cashoutDrills() {
  if (!drState || !drState.alive || drState.current === 0) return;
  const win = Math.round(drState.bet * drState.totalMult);
  $('drills-result').textContent = '+' + fmt(win) + ' (' + drState.totalMult.toFixed(2) + 'x)';
  $('drills-result').style.color = '#00ffcc';
  $('drills-info').textContent = 'Cashed out at layer ' + drState.current + '!';
  toast('+' + fmt(win) + ' (' + drState.totalMult.toFixed(2) + 'x)', 'gold');
  $('drills-start').disabled = false;
  $('drills-cashout').disabled = true;
  endRound(true, win);
  drAnimating = false;
  if (drAnimatingTimer) { clearTimeout(drAnimatingTimer); drAnimatingTimer = null; }
  drState = null;
  updDrillsInfo();
}

function spawnDrillExplosion(el) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
  const colors = ['#ff3344', '#ff6600', '#ff9900', '#ffcc00'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'mine-particle';
    const angle = (i / 12) * Math.PI * 2 + (Math.random() - .5) * .5;
    const dist = 20 + Math.random() * 40;
    p.style.left = cx + 'px'; p.style.top = cy + 'px';
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.background = colors[i % 4];
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }
  document.body.classList.add('screen-shake');
  setTimeout(() => document.body.classList.remove('screen-shake'), 300);
}

function updDrillsInfo() {
  if (!drState) {
    $('drills-possible-win').textContent = 'Win: ' + fmt(Math.round(S.bet));
  } else {
    $('drills-possible-win').textContent = 'Win: ' + fmt(Math.round(drState.bet * drState.totalMult));
  }
}

/* ============================================================
   PACHINKO (calm, simple: rectangular pin grid, single ball,
   PACHINKO (authentic machine: launcher, dense pins, curved walls, trap zones)
   ============================================================ */
const PKW = 500, PKH = 680;
const PKPR = 3.5, PKBR = 5.5;
const PKROWS = 20, PKCOLS = 15;
const PKDX = 28, PKDY = 26;
const PKY0 = 65;
const PKGRAV = 0.11, PKFRIC = 0.997, PKBNC = 0.75, PKWAL = 0.55;
const PKMULTS = [0, 2, 5, 3, 0, 8, 0, 3, 5, 2, 0];
const PKTRAPS = [0, 4, 6, 10];
const PKBOOST = [1, 3, 5, 8, 9];
const PKBUCKETY = PKH - 50;
const PK_BALL_COST = 10;
const PKFRAME = 14;
let pkCanvas, pkCtx, pkPins = [], pkBalls = [], pkParts = [];
let pkBGlows = new Float32Array(PKMULTS.length), pkShake = 0;
let pkLastDrop = 0;
let pkBallCount = 0;

function initPachinko() {
  pkCanvas = $('pachinko-c');
  if (!pkCanvas) return;
  pkCtx = pkCanvas.getContext('2d');
  const area = $('pachinko-view');
  if (!area) return;
  const dpr = window.devicePixelRatio || 1;
  pkCanvas.width = PKW * dpr;
  pkCanvas.height = PKH * dpr;
  pkCanvas.style.width = PKW + 'px';
  pkCanvas.style.height = PKH + 'px';
  pkCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  pkPins = [];
  for (let r = 0; r < PKROWS; r++) {
    const stagger = (r % 2 === 1) ? PKDX / 2 : 0;
    const cols = PKCOLS;
    const ox = (PKW - (cols - 1) * PKDX) / 2;
    for (let c = 0; c < cols; c++) {
      pkPins.push({ x: ox + c * PKDX + stagger, y: PKY0 + r * PKDY, glow: 0 });
    }
  }
  pkBalls = []; pkParts = [];
  drawPachinko();
}

function buyPachinkoBalls(count) {
  const cost = count * PK_BALL_COST;
  if (S.cash < cost) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= cost;
  pkBallCount += count;
  toast('Bought ' + count + ' balls (-' + fmt(cost) + ')', 'info');
  updPachinkoBalls();
  updUI();
}

function dropPachinko() {
  if (pkBallCount <= 0) { toast('Buy some balls first!', 'info'); return; }
  const now = Date.now();
  if (now - pkLastDrop < 250) return;
  pkLastDrop = now;
  pkBallCount--;
  const launchX = PKW - PKFRAME - 16;
  const laneX = launchX + (Math.random() - 0.5) * 12;
  pkBalls.push({
    x: laneX, y: 30,
    vx: -1.5 - Math.random() * 1.5, vy: 0.5 + Math.random() * 0.5,
    alive: true, age: 0,
    hue: 30 + Math.random() * 20,
    processed: false, trail: []
  });
  updPachinkoBalls();
  updUI();
}

function exchangePachinkoBalls() {
  if (pkBallCount <= 0) return;
  const win = pkBallCount * 10;
  toast('Exchanged ' + pkBallCount + ' balls → ' + fmt(win), 'gold');
  pkBallCount = 0;
  updPachinkoBalls();
  endRound(true, win);
}

function updPachinkoBalls() {
  if ($('pachinko-balls-count')) $('pachinko-balls-count').textContent = pkBallCount;
  const ex = $('pachinko-exchange');
  if (ex) {
    if (pkBallCount > 0) {
      ex.disabled = false;
      ex.classList.add('has-balls');
      ex.textContent = 'EXCHANGE ALL (' + pkBallCount + ' balls)';
    } else {
      ex.disabled = true;
      ex.classList.remove('has-balls');
      ex.textContent = 'EXCHANGE ALL';
    }
  }
}

function tickPachinko() {
  try {
  for (let i = pkBalls.length - 1; i >= 0; i--) {
    const b = pkBalls[i];
    if (!b.alive) { if (b.age > 12) pkBalls.splice(i, 1); else b.age++; continue; }
    b.vy += PKGRAV; b.x += b.vx; b.y += b.vy; b.vx *= PKFRIC; b.age++;
    if (b.x < PKFRAME + PKBR + 2) { b.x = PKFRAME + PKBR + 2; b.vx = Math.abs(b.vx) * PKWAL + 0.2; }
    if (b.x > PKW - PKFRAME - PKBR - 2) { b.x = PKW - PKFRAME - PKBR - 2; b.vx = -Math.abs(b.vx) * PKWAL - 0.2; }
    for (const p of pkPins) {
      const dx = b.x - p.x, dy = b.y - p.y, d2 = dx * dx + dy * dy, md = PKBR + PKPR;
      if (d2 < md * md && d2 > 0) {
        const d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
        b.x = p.x + nx * md; b.y = p.y + ny * md;
        const dot = b.vx * nx + b.vy * ny;
        b.vx = (b.vx - 2 * dot * nx) * PKBNC + (Math.random() - 0.5) * 1.0;
        b.vy = (b.vy - 2 * dot * ny) * PKBNC + (Math.random() - 0.3) * 0.3;
        p.glow = 1;
        const a = Math.random() * Math.PI * 2, sp = 0.4 + Math.random() * 0.8;
        pkParts.push([p.x, p.y, Math.cos(a) * sp, Math.sin(a) * sp, 1, 0.04, 0.5 + Math.random() * 0.5, 35]);
      }
    }
    const bumperHits = [
      { x: PKFRAME + 15 + 25, y: PKY0 + PKROWS * PKDY * 0.35, ex: 1 },
      { x: PKW - PKFRAME - 15 - 25, y: PKY0 + PKROWS * PKDY * 0.35, ex: -1 },
      { x: PKFRAME + 15 + 25, y: PKY0 + PKROWS * PKDY * 0.65, ex: 1 },
      { x: PKW - PKFRAME - 15 - 25, y: PKY0 + PKROWS * PKDY * 0.65, ex: -1 }
    ];
    for (const bp of bumperHits) {
      const dx = b.x - bp.x, dy = b.y - bp.y, d2 = dx * dx + dy * dy, md = PKBR + 10;
      if (d2 < md * md && d2 > 0) {
        const d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
        b.x = bp.x + nx * md; b.y = bp.y + ny * md;
        const dot = b.vx * nx + b.vy * ny;
        b.vx = bp.ex * (3 + Math.random() * 2) + (Math.random() - 0.5) * 0.8;
        b.vy = -2 - Math.random() * 2;
        for (let j = 0; j < 8; j++) {
          const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 1.5;
          pkParts.push([bp.x, bp.y, Math.cos(a) * sp, Math.sin(a) * sp, 1, 0.035, 0.6 + Math.random() * 0.6, 10, 255, 120, 40]);
        }
        const rect = pkCanvas.getBoundingClientRect();
        const scaleX = rect.width / PKW, scaleY = rect.height / PKH;
        showFloat(rect.left + bp.x * scaleX, rect.top + bp.y * scaleY - 8, 'EJECT!', '#ff8844');
      }
    }
    if (b.age % 3 === 0) b.trail.push(b.x, b.y);
    if (b.trail.length > 20) { b.trail.shift(); b.trail.shift(); }
    if (b.y >= PKBUCKETY) {
      b.alive = false;
      const bw = PKW / PKMULTS.length;
      const bi = Math.max(0, Math.min(PKMULTS.length - 1, Math.floor(b.x / bw)));
      const mult = PKMULTS[bi];
      const isTrap = PKTRAPS.includes(bi);
      const isBoost = PKBOOST.includes(bi);
      if (isBoost) {
        pkBallCount++;
        b.alive = true;
        b.y = PKBUCKETY - 6;
        b.vy = -7 - Math.random() * 4;
        b.vx = (Math.random() - 0.5) * 4;
        for (let j = 0; j < 12; j++) {
          const a = Math.random() * Math.PI * 2, sp = 1.5 + Math.random() * 2.5;
          pkParts.push([b.x, PKBUCKETY, Math.cos(a) * sp, Math.sin(a) * sp - 1.5, 1, 0.025, 0.7 + Math.random() * 0.7, 150, 50, 255, 120]);
        }
        const rect = pkCanvas.getBoundingClientRect();
        const scaleX = rect.width / PKW, scaleY = rect.height / PKH;
        showFloat(rect.left + b.x * scaleX, rect.top + PKBUCKETY * scaleY - 12, '▲ BOOST!', '#00ffaa');
        updPachinkoBalls();
        continue;
      }
      pkBallCount += mult;
      pkBGlows[bi] = 1;
      for (let j = 0; j < (isTrap ? 4 : 6); j++) {
        const a = Math.random() * Math.PI * 2, sp = 0.5 + Math.random() * 1.5;
        pkParts.push([b.x, PKBUCKETY - 4, Math.cos(a) * sp, Math.sin(a) * sp - 0.5, 1, 0.04, 0.5 + Math.random() * 0.8, isTrap ? 0 : 35, isTrap ? 255 : 255, isTrap ? 50 : 200, isTrap ? 50 : 50]);
      }
      const rect = pkCanvas.getBoundingClientRect();
      const scaleX = rect.width / PKW, scaleY = rect.height / PKH;
      if (isTrap) {
        showFloat(rect.left + b.x * scaleX, rect.top + PKBUCKETY * scaleY - 12, 'EATEN!', '#ff3333');
      } else {
        showFloat(rect.left + b.x * scaleX, rect.top + PKBUCKETY * scaleY - 12, '+' + mult + ' balls', mult >= 8 ? '#ffd700' : '#ffcc66');
      }
      updPachinkoBalls();
    }
  }
  for (let i = pkParts.length - 1; i >= 0; i--) {
    const p = pkParts[i]; p[0] += p[2]; p[1] += p[3]; p[2] *= 0.96; p[3] *= 0.96; p[4] -= p[5];
    if (p[4] <= 0) pkParts.splice(i, 1);
  }
  } catch(e) { console.error('pachinko tick error', e); }
}

function drawPachinko() {
  const c = pkCtx; if (!c) return;
  c.clearRect(0, 0, PKW, PKH);
  const F = PKFRAME;
  const boardW = PKW - F * 2 - 30;
  const boardX = F + 15;
  const boardTop = 8;
  const boardBot = PKBUCKETY + 28;

  const bgGrad = c.createLinearGradient(0, 0, 0, PKH);
  bgGrad.addColorStop(0, '#1e0a0a'); bgGrad.addColorStop(0.3, '#160608'); bgGrad.addColorStop(0.7, '#100406'); bgGrad.addColorStop(1, '#0a0304');
  c.fillStyle = bgGrad;
  c.fillRect(0, 0, PKW, PKH);

  c.fillStyle = '#0e0608';
  c.fillRect(boardX, boardTop, boardW, boardBot - boardTop);
  c.strokeStyle = '#4a1a1a';
  c.lineWidth = 1.5;
  c.strokeRect(boardX, boardTop, boardW, boardBot - boardTop);

  c.strokeStyle = 'rgba(100,35,25,.08)'; c.lineWidth = 0.5;
  for (let x = boardX; x < boardX + boardW; x += 24) { c.beginPath(); c.moveTo(x, boardTop); c.lineTo(x, boardBot); c.stroke(); }
  for (let y = boardTop; y < boardBot; y += 24) { c.beginPath(); c.moveTo(boardX, y); c.lineTo(boardX + boardW, y); c.stroke(); }

  const boardL = boardX;
  const boardR = boardX + boardW;
  c.beginPath();
  c.moveTo(boardL, boardTop);
  c.quadraticCurveTo(boardL - 8, (boardTop + boardBot) / 2, boardL, boardBot);
  c.strokeStyle = 'rgba(200,70,30,.3)';
  c.lineWidth = 3;
  c.stroke();
  c.beginPath();
  c.moveTo(boardR, boardTop);
  c.quadraticCurveTo(boardR + 8, (boardTop + boardBot) / 2, boardR, boardBot);
  c.stroke();
  c.beginPath();
  c.moveTo(boardL + 2, boardTop);
  c.quadraticCurveTo(boardL - 5, (boardTop + boardBot) / 2, boardL + 2, boardBot);
  c.strokeStyle = 'rgba(255,120,50,.12)';
  c.lineWidth = 1;
  c.stroke();
  c.beginPath();
  c.moveTo(boardR - 2, boardTop);
  c.quadraticCurveTo(boardR + 5, (boardTop + boardBot) / 2, boardR - 2, boardBot);
  c.stroke();

  const frameGrad = c.createLinearGradient(0, 0, F, 0);
  frameGrad.addColorStop(0, '#3a1808'); frameGrad.addColorStop(0.3, '#5a2a10'); frameGrad.addColorStop(0.7, '#5a2a10'); frameGrad.addColorStop(1, '#3a1808');
  c.fillStyle = frameGrad;
  c.fillRect(0, 0, F, PKH);
  c.fillStyle = frameGrad;
  c.fillRect(PKW - F - 30, 0, F + 30, PKH);

  c.strokeStyle = '#bb6633';
  c.lineWidth = 2.5;
  c.strokeRect(1, 1, PKW - 2, PKH - 2);
  c.strokeStyle = '#774422';
  c.lineWidth = 1;
  c.strokeRect(5, 5, PKW - 10, PKH - 10);
  c.strokeStyle = 'rgba(180,100,50,.15)';
  c.lineWidth = 0.5;
  c.strokeRect(8, 8, PKW - 16, PKH - 16);

  for (let i = 0; i < 18; i++) {
    const lx2 = boardX + 8 + i * ((boardW - 16) / 17);
    c.beginPath(); c.arc(lx2, boardTop + 3, 2.8, 0, Math.PI * 2);
    const phase = (Date.now() / 300 + i * 0.4) % 3;
    let lc;
    if (phase < 1) lc = 'rgba(255,200,50,.7)';
    else if (phase < 2) lc = 'rgba(255,80,40,.6)';
    else lc = 'rgba(255,50,80,.5)';
    c.fillStyle = lc;
    c.fill();
    c.beginPath(); c.arc(lx2, boardTop + 3, 5, 0, Math.PI * 2);
    c.fillStyle = 'rgba(255,200,50,.05)';
    c.fill();
  }

  const bumperPositions = [
    { x: boardX + 25, y: PKY0 + PKROWS * PKDY * 0.35 },
    { x: boardX + boardW - 25, y: PKY0 + PKROWS * PKDY * 0.35 },
    { x: boardX + 25, y: PKY0 + PKROWS * PKDY * 0.65 },
    { x: boardX + boardW - 25, y: PKY0 + PKROWS * PKDY * 0.65 }
  ];
  for (const bp of bumperPositions) {
    const pulse = 0.6 + Math.sin(Date.now() / 300) * 0.15;
    c.beginPath(); c.arc(bp.x, bp.y, 10, 0, Math.PI * 2);
    const bg2 = c.createRadialGradient(bp.x - 1, bp.y - 1, 0, bp.x, bp.y, 10);
    bg2.addColorStop(0, 'rgba(255,120,40,' + pulse + ')'); bg2.addColorStop(0.6, 'rgba(200,60,20,' + (pulse * 0.5) + ')'); bg2.addColorStop(1, 'rgba(120,30,10,.1)');
    c.fillStyle = bg2; c.fill();
    c.strokeStyle = 'rgba(255,140,60,' + (pulse * 0.7) + ')'; c.lineWidth = 2; c.stroke();
    c.beginPath(); c.arc(bp.x, bp.y, 14, 0, Math.PI * 2);
    c.strokeStyle = 'rgba(255,100,40,' + (pulse * 0.15) + ')'; c.lineWidth = 1; c.stroke();
    c.font = 'bold 7px Orbitron,monospace';
    c.fillStyle = 'rgba(255,200,100,' + (pulse * 0.6) + ')';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('EJ', bp.x, bp.y);
  }

  const lx = PKW - F - 14;
  const ly0 = 14;
  const ly1 = boardTop + 30;
  c.fillStyle = '#2a1008';
  c.fillRect(lx - 7, ly0, 14, ly1 - ly0);
  c.strokeStyle = '#884422';
  c.lineWidth = 1.5;
  c.strokeRect(lx - 7, ly0, 14, ly1 - ly0);
  for (let i = 0; i < 4; i++) {
    const sy = ly0 + 8 + i * ((ly1 - ly0 - 16) / 4);
    c.beginPath(); c.moveTo(lx - 4, sy); c.lineTo(lx + 4, sy + 4);
    c.strokeStyle = 'rgba(180,100,40,.5)'; c.lineWidth = 1; c.stroke();
  }
  c.beginPath(); c.arc(lx, ly0 - 4, 7, 0, Math.PI * 2);
  const knobG = c.createRadialGradient(lx - 1, ly0 - 5, 0, lx, ly0 - 4, 7);
  knobG.addColorStop(0, '#dd8833'); knobG.addColorStop(1, '#884411');
  c.fillStyle = knobG; c.fill();
  c.strokeStyle = '#ffaa44'; c.lineWidth = 1; c.stroke();

  const bw = PKW / PKMULTS.length;
  for (let i = 0; i < PKMULTS.length; i++) {
    const x = i * bw, m = PKMULTS[i], g = pkBGlows[i];
    const isTrap = PKTRAPS.includes(i);
    const isBoost = PKBOOST.includes(i);
    if (g > 0.01) {
      c.fillStyle = isTrap ? 'rgba(255,0,0,' + (g * 0.15) + ')' : isBoost ? 'rgba(0,255,150,' + (g * 0.15) + ')' : 'rgba(255,255,255,' + (g * 0.1) + ')';
      c.fillRect(x, PKBUCKETY - 6, bw, 28);
      pkBGlows[i] *= 0.9;
    }
    const bg = isTrap ? 'rgba(100,0,0,.18)' : isBoost ? 'rgba(0,60,30,.18)' : m >= 8 ? 'rgba(200,40,20,.12)' : m >= 5 ? 'rgba(200,150,0,.1)' : m >= 3 ? 'rgba(180,100,20,.08)' : 'rgba(50,20,15,.06)';
    c.fillStyle = bg; c.fillRect(x, PKBUCKETY - 6, bw, 28);
    c.strokeStyle = isTrap ? 'rgba(255,60,60,.5)' : isBoost ? 'rgba(0,200,100,.5)' : 'rgba(140,70,25,.3)';
    c.lineWidth = 1.5; c.strokeRect(x, PKBUCKETY - 6, bw, 28);
    c.font = 'bold ' + (m >= 8 ? 10 : 8) + 'px Orbitron,monospace';
    c.fillStyle = isTrap ? '#ff5555' : isBoost ? '#22ffaa' : m >= 8 ? '#ff4444' : m >= 5 ? '#ffd700' : m >= 3 ? '#ff9944' : m > 0 ? '#aa7744' : '#664433';
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(isTrap ? '×' : isBoost ? '▲' : (m === 0 ? '—' : '+' + m), x + bw / 2, PKBUCKETY + 8);
  }

  for (const p of pkPins) {
    if (p.glow > 0.02) { c.beginPath(); c.arc(p.x, p.y, PKPR + 4, 0, Math.PI * 2); c.fillStyle = 'rgba(255,210,80,' + (p.glow * 0.18) + ')'; c.fill(); p.glow *= 0.88; }
    c.beginPath(); c.arc(p.x, p.y, PKPR, 0, Math.PI * 2);
    const pg = c.createRadialGradient(p.x - 0.7, p.y - 0.7, 0, p.x, p.y, PKPR);
    pg.addColorStop(0, 'rgba(240,210,120,' + (0.5 + p.glow * 0.3) + ')');
    pg.addColorStop(0.6, 'rgba(180,140,60,' + (0.5 + p.glow * 0.2) + ')');
    pg.addColorStop(1, 'rgba(100,70,20,' + (0.5 + p.glow * 0.1) + ')');
    c.fillStyle = pg; c.fill();
  }

  for (const b of pkBalls) {
    if (!b.alive) continue;
    const tl = b.trail.length;
    for (let j = 0; j < tl; j += 2) {
      const a = (1 - j / tl) * 0.15, s = PKBR * (1 - j / tl) * 0.3;
      if (a < 0.01) continue;
      c.beginPath(); c.arc(b.trail[j], b.trail[j + 1], s, 0, Math.PI * 2);
      c.fillStyle = 'hsla(' + (b.hue + j * 2) + ',70%,65%,' + a + ')'; c.fill();
    }
    c.beginPath(); c.arc(b.x, b.y, PKBR, 0, Math.PI * 2);
    const bg = c.createRadialGradient(b.x - 1.5, b.y - 1.5, 0, b.x, b.y, PKBR);
    bg.addColorStop(0, '#f0e8d8'); bg.addColorStop(0.4, '#ccbb99'); bg.addColorStop(1, '#776644');
    c.fillStyle = bg; c.fill();
    c.beginPath(); c.arc(b.x - 1, b.y - 1, 1.5, 0, Math.PI * 2);
    c.fillStyle = 'rgba(255,255,255,.55)'; c.fill();
    c.beginPath(); c.arc(b.x + 1, b.y + 1.5, 0.8, 0, Math.PI * 2);
    c.fillStyle = 'rgba(255,255,255,.2)'; c.fill();
  }

  for (const p of pkParts) {
    const sz = p[6] * p[4]; if (sz < 0.2) continue;
    c.beginPath(); c.arc(p[0], p[1], sz, 0, Math.PI * 2);
    c.fillStyle = p.length > 8 ? 'rgba(' + p[8] + ',' + p[9] + ',' + p[10] + ',' + p[4] + ')' : 'hsla(' + p[7] + ',90%,60%,' + p[4] + ')';
    c.fill();
  }

  c.font = 'bold 9px Orbitron,monospace';
  c.fillStyle = 'rgba(255,200,100,.5)';
  c.textAlign = 'center'; c.textBaseline = 'top';
  c.fillText('▼ DROP ▼', PKW / 2, boardTop + 2);

  const dropX = PKW - PKFRAME - 14;
  c.beginPath();
  c.moveTo(dropX, boardTop + 8);
  c.lineTo(dropX - 12, boardTop + 22);
  c.lineTo(dropX + 12, boardTop + 22);
  c.closePath();
  c.fillStyle = 'rgba(255,180,60,.15)';
  c.fill();
  c.strokeStyle = 'rgba(255,180,60,.3)';
  c.lineWidth = 1;
  c.stroke();
}

function pachinkoLoop() { if (S.game === 'pachinko') { tickPachinko(); drawPachinko(); } requestAnimationFrame(pachinkoLoop); }

/* ============================================================
   PUMP (bigger balloon, no shake warning)
   ============================================================ */
let pumpState = null;

function startPump() {
  if (S.cash < S.bet) return;
  S.cash -= S.bet;
  const popPoint = 3 + Math.floor(Math.random() * 13);
  pumpState = { bet: S.bet, pumps: 0, mult: 1, popPoint, alive: true };
  $('pump-mult').textContent = '1.00x';
  $('pump-count').textContent = '0 pumps';
  $('pump-info').textContent = 'Pump the balloon!';
  $('pump-btn').disabled = false; $('pump-cashout').disabled = true;
  $('pump-balloon').style.transform = 'scale(1)';
  $('pump-balloon').style.opacity = '1';
  $('pump-balloon').style.animation = '';
  updUI(); updPumpInfo();
}
function pumpAction() {
  if (!pumpState || !pumpState.alive) return;
  pumpState.pumps++;
  const gain = 0.1 + Math.random() * 0.4;
  pumpState.mult += gain;
  const scale = 1 + pumpState.pumps * 0.15;
  $('pump-balloon').style.transform = 'scale(' + Math.min(scale, 4) + ')';
  $('pump-count').textContent = pumpState.pumps + ' pumps';
  $('pump-mult').textContent = pumpState.mult.toFixed(2) + 'x';
  $('pump-cashout').disabled = false;
  $('pump-info').textContent = 'Next pump could pop!';
  if (pumpState.pumps >= pumpState.popPoint) {
    const balloon = $('pump-balloon');
    balloon.style.animation = '';
    balloon.style.transform = 'scale(0)'; balloon.style.opacity = '0';
    $('pump-btn').disabled = true; $('pump-cashout').disabled = true;
    $('pump-mult').textContent = '0x';
    $('pump-info').textContent = 'POP! Lost ' + fmt(pumpState.bet);
    spawnPumpPop(balloon);
    toast('POP! -' + fmt(pumpState.bet), 'loss');
    endRound(false, 0); pumpState = null; updPumpInfo(); return;
  }
  updPumpInfo();
}
function cashoutPump() {
  if (!pumpState || !pumpState.alive || pumpState.pumps === 0) return;
  const mult = pumpState.mult;
  const win = Math.round(pumpState.bet * mult);
  $('pump-btn').disabled = true; $('pump-cashout').disabled = true;
  $('pump-info').textContent = 'Cashed out at ' + mult.toFixed(2) + 'x!';
  $('pump-balloon').style.animation = '';
  toast('Cashed out +' + fmt(win) + ' (' + mult.toFixed(2) + 'x)', 'gold');
  endRound(true, win); pumpState = null; updPumpInfo();
}
function spawnPumpPop(el) {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
  const colors = ['#ff3344', '#ff6600', '#ff9900', '#ffcc00', '#ff3366'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'mine-particle';
    const angle = (i / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = 30 + Math.random() * 60;
    p.style.left = cx + 'px'; p.style.top = cy + 'px';
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.background = colors[i % colors.length];
    p.style.width = '8px'; p.style.height = '8px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }
  document.body.classList.add('screen-shake');
  setTimeout(() => document.body.classList.remove('screen-shake'), 300);
}
function updPumpInfo() {
  if (!pumpState) { $('pump-mult').textContent = '1.00x'; $('pump-possible-win').textContent = 'Win: ' + fmt(Math.round(S.bet)); }
  else { $('pump-possible-win').textContent = 'Win: ' + fmt(Math.round(pumpState.bet * pumpState.mult)); }
}

/* ============================================================
   SCRATCH (mask-based redraw: symbols always visible)
   ============================================================ */
const SCRATCH_SYMS = ['🍀', '⭐', '💎', '🔔'];
const SCRATCH_MULTS = { '🍀': 2, '⭐': 3, '💎': 5, '🔔': 4 };
let scratchState = null;
let scratchCanvas, scratchCtx;
let scratchMask, scratchMaskCtx;
let scratchHolding = false, scratchLastPos = null;
let scratchListenersAttached = false;

function initScratchCanvas() {
  scratchCanvas = $('scratch-canvas');
  if (!scratchCanvas) return;
  scratchCtx = scratchCanvas.getContext('2d');
  scratchMask = document.createElement('canvas');
  scratchMask.width = 300;
  scratchMask.height = 300;
  scratchMaskCtx = scratchMask.getContext('2d');
  if (scratchListenersAttached) return;
  scratchListenersAttached = true;
  scratchCanvas.addEventListener('mousedown', e => { scratchHolding = true; scratchLastPos = getScratchPos(e); scratchTick(); });
  scratchCanvas.addEventListener('mousemove', e => { if (scratchHolding) { scratchLastPos = getScratchPos(e); scratchTick(); } });
  window.addEventListener('mouseup', () => { scratchHolding = false; scratchLastPos = null; });
  scratchCanvas.addEventListener('touchstart', e => { e.preventDefault(); scratchHolding = true; scratchLastPos = getScratchPos(e.touches[0]); scratchTick(); }, { passive: false });
  scratchCanvas.addEventListener('touchmove', e => { e.preventDefault(); if (scratchHolding) { scratchLastPos = getScratchPos(e.touches[0]); scratchTick(); } }, { passive: false });
  scratchCanvas.addEventListener('touchend', () => { scratchHolding = false; scratchLastPos = null; });
}
function getScratchPos(e) {
  const rect = scratchCanvas.getBoundingClientRect();
  return { x: (e.clientX - rect.left) * (scratchCanvas.width / rect.width), y: (e.clientY - rect.top) * (scratchCanvas.height / rect.height) };
}
function scratchTick() {
  if (!scratchState || !scratchLastPos || scratchState.done) return;
  const px = scratchLastPos.x, py = scratchLastPos.y;
  const radius = 22;
  scratchMaskCtx.globalCompositeOperation = 'destination-out';
  scratchMaskCtx.beginPath();
  scratchMaskCtx.arc(px, py, radius, 0, Math.PI * 2);
  scratchMaskCtx.fill();
  redrawScratch();
  checkScratchProgress();
}
function redrawScratch() {
  if (!scratchCtx || !scratchState || !scratchMask) return;
  const w = 300, h = 300;
  scratchCtx.clearRect(0, 0, w, h);
  scratchCtx.fillStyle = '#1a1a30';
  scratchCtx.fillRect(0, 0, w, h);
  const cellW = w / 3, cellH = h / 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const x = c * cellW, y = r * cellH;
      scratchCtx.fillStyle = '#2a2a55';
      scratchCtx.fillRect(x + 4, y + 4, cellW - 8, cellH - 8);
      scratchCtx.strokeStyle = 'rgba(255,215,0,.12)';
      scratchCtx.lineWidth = 1;
      scratchCtx.strokeRect(x + 4, y + 4, cellW - 8, cellH - 8);
      scratchCtx.font = '36px sans-serif';
      scratchCtx.textAlign = 'center';
      scratchCtx.textBaseline = 'middle';
      scratchCtx.fillStyle = '#fff';
      scratchCtx.fillText(scratchState.grid[r * 3 + c], x + cellW / 2, y + cellH / 2);
    }
  }
  scratchCtx.save();
  scratchCtx.globalCompositeOperation = 'destination-out';
  scratchCtx.drawImage(scratchMask, 0, 0);
  scratchCtx.restore();
  scratchCtx.save();
  scratchCtx.globalCompositeOperation = 'destination-over';
  const grad = scratchCtx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#666688');
  grad.addColorStop(0.3, '#8888aa');
  grad.addColorStop(0.5, '#9999bb');
  grad.addColorStop(0.7, '#8888aa');
  grad.addColorStop(1, '#666688');
  scratchCtx.fillStyle = grad;
  scratchCtx.fillRect(0, 0, w, h);
  scratchCtx.fillStyle = 'rgba(255,255,255,.08)';
  for (let i = 0; i < 20; i++) {
    const sx = (i * 47) % w, sy = (i * 31) % h;
    scratchCtx.beginPath();
    scratchCtx.arc(sx, sy, 15 + (i % 3) * 8, 0, Math.PI * 2);
    scratchCtx.fill();
  }
  scratchCtx.font = 'bold 14px Orbitron, monospace';
  scratchCtx.textAlign = 'center';
  scratchCtx.textBaseline = 'middle';
  scratchCtx.fillStyle = 'rgba(255,255,255,.35)';
  scratchCtx.fillText('✦ SCRATCH HERE ✦', w / 2, h / 2);
  scratchCtx.restore();
}
function checkScratchProgress() {
  if (!scratchState || !scratchMask) return;
  const imageData = scratchMaskCtx.getImageData(0, 0, 300, 300);
  const data = imageData.data;
  let total = 0, cleared = 0;
  for (let i = 3; i < data.length; i += 4) {
    total++;
    if (data[i] < 128) cleared++;
  }
  const pct = Math.round((cleared / total) * 100);
  $('scratch-progress').textContent = pct + '% scratched';
  if (pct >= 60 && !scratchState.done) {
    autoRevealScratch();
  }
}

function autoRevealScratch() {
  if (!scratchState || !scratchMaskCtx) return;
  scratchHolding = false;
  scratchLastPos = null;
  let frame = 0;
  const totalFrames = 20;
  function fadeStep() {
    frame++;
    const t = frame / totalFrames;
    scratchMaskCtx.globalCompositeOperation = 'destination-out';
    scratchMaskCtx.fillStyle = 'rgba(0,0,0,' + (0.06 + t * 0.1) + ')';
    scratchMaskCtx.fillRect(0, 0, 300, 300);
    redrawScratch();
    const pct = Math.min(100, Math.round(((frame / totalFrames) * 40) + 60));
    $('scratch-progress').textContent = pct + '% scratched';
    if (frame < totalFrames) {
      requestAnimationFrame(fadeStep);
    } else {
      scratchMaskCtx.clearRect(0, 0, 300, 300);
      redrawScratch();
      $('scratch-progress').textContent = '100% scratched';
      checkScratchWin();
    }
  }
  requestAnimationFrame(fadeStep);
}

function selectTicket(tier) {
  const prices = [100, 500, 2000];
  const names = ['BRONZE SCRATCH', 'SILVER SCRATCH', 'GOLD SCRATCH'];
  const price = prices[tier];
  if (S.cash < price) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= price;
  $('scratch-tickets').style.display = 'none';
  $('scratch-play').style.display = 'flex';
  if ($('scratch-ticket-name')) $('scratch-ticket-name').textContent = names[tier];
  if ($('scratch-ticket-price-tag')) $('scratch-ticket-price-tag').textContent = fmt(price);
  startScratchWithBet(price);
  updUI();
}
function startScratchWithBet(bet) {
  const grid = [];
  const hasWin = Math.random() < 0.5;
  if (hasWin) {
    for (let i = 0; i < 9; i++) grid.push(SCRATCH_SYMS[Math.floor(Math.random() * SCRATCH_SYMS.length)]);
    const winType = Math.random();
    if (winType < 0.3) {
      const row = Math.floor(Math.random() * 3);
      const sym = SCRATCH_SYMS[Math.floor(Math.random() * 4)];
      grid[row * 3] = sym; grid[row * 3 + 1] = sym; grid[row * 3 + 2] = sym;
    } else if (winType < 0.5) {
      const col = Math.floor(Math.random() * 3);
      const sym = SCRATCH_SYMS[Math.floor(Math.random() * 4)];
      grid[col] = sym; grid[3 + col] = sym; grid[6 + col] = sym;
    } else {
      const sym = SCRATCH_SYMS[Math.floor(Math.random() * 4)];
      const diag = Math.random() < 0.5;
      if (diag) { grid[0] = sym; grid[4] = sym; grid[8] = sym; }
      else { grid[2] = sym; grid[4] = sym; grid[6] = sym; }
    }
  } else {
    let attempts = 0;
    do {
      for (let i = 0; i < 9; i++) grid[i] = SCRATCH_SYMS[Math.floor(Math.random() * SCRATCH_SYMS.length)];
      attempts++;
    } while (checkScratchWinRaw(grid).total > 0 && attempts < 200);
  }
  scratchState = { grid, bet, done: false, totalWin: 0 };
  if (scratchMaskCtx) {
    scratchMaskCtx.globalCompositeOperation = 'source-over';
    scratchMaskCtx.fillStyle = '#8888aa';
    scratchMaskCtx.fillRect(0, 0, 300, 300);
  }
  redrawScratch();
  $('scratch-result').textContent = '';
  $('scratch-progress').textContent = '0% scratched';
  $('scratch-start').textContent = 'SCRATCHING...';
  $('scratch-start').disabled = true;
  $('scratch-info').textContent = 'Hold and drag to scratch!';
  updUI();
}
function startScratch() {
  $('scratch-tickets').style.display = 'flex';
  $('scratch-play').style.display = 'none';
  scratchState = null;
}
function checkScratchWinRaw(grid) {
  let total = 0;
  const wins = [];
  for (let r = 0; r < 3; r++) {
    const i0 = r * 3, i1 = r * 3 + 1, i2 = r * 3 + 2;
    if (grid[i0] === grid[i1] && grid[i1] === grid[i2]) {
      const m = SCRATCH_MULTS[grid[i0]] || 2;
      total += m; wins.push('Row ' + (r + 1) + ': ' + grid[i0] + ' ' + m + 'x');
    }
  }
  for (let c = 0; c < 3; c++) {
    if (grid[c] === grid[3 + c] && grid[3 + c] === grid[6 + c]) {
      const m = SCRATCH_MULTS[grid[c]] || 2;
      total += m; wins.push('Col ' + (c + 1) + ': ' + grid[c] + ' ' + m + 'x');
    }
  }
  if (grid[0] === grid[4] && grid[4] === grid[8]) {
    const m = (SCRATCH_MULTS[grid[0]] || 2) * 2;
    total += m; wins.push('Diag: ' + grid[0] + ' ' + m + 'x');
  }
  if (grid[2] === grid[4] && grid[4] === grid[6]) {
    const m = (SCRATCH_MULTS[grid[2]] || 2) * 2;
    total += m; wins.push('Diag: ' + grid[2] + ' ' + m + 'x');
  }
  return { total, wins };
}
function checkScratchWin() {
  if (!scratchState || scratchState.done) return;
  scratchState.done = true;
  const result = checkScratchWinRaw(scratchState.grid);
  scratchState.totalWin = result.total;
  $('scratch-start').textContent = 'NEW TICKET';
  $('scratch-start').disabled = false;
  if (result.total > 0) {
    const win = Math.round(scratchState.bet * result.total);
    $('scratch-result').textContent = '+' + fmt(win); $('scratch-result').style.color = '#00ffcc';
    $('scratch-info').textContent = result.wins.join(' • ');
    toast('+' + fmt(win) + ' (' + result.total.toFixed(1) + 'x)', 'win');
    endRound(true, win);
  } else {
    $('scratch-result').textContent = 'No match'; $('scratch-result').style.color = '#ff3344';
    $('scratch-info').textContent = 'No winning lines';
    toast('-' + fmt(scratchState.bet), 'loss');
    endRound(false, 0);
  }
}
function updScratchInfo() {
  if (!scratchState) { }
}

/* ============================================================
   LIMBO (choose target multiplier, roll under to win)
   ============================================================ */
let limboState = null, limboAnimating = false;

function setLimboTarget(val) {
  $('limbo-target').value = val;
  document.querySelectorAll('.limbo-preset').forEach(b => b.classList.remove('sel'));
  event.target.classList.add('sel');
  updLimboBar();
}

function updLimboBar() {
  const t = parseFloat($('limbo-target').value) || 2;
  const chance = Math.min(99, Math.max(1, 100 / t));
  $('limbo-chance').textContent = 'Win chance: ' + chance.toFixed(1) + '%';
  $('limbo-bar-win').style.width = chance + '%';
  $('limbo-bar-marker').style.left = chance + '%';
}

function startLimbo() {
  if (limboAnimating) return;
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  const target = parseFloat($('limbo-target').value) || 2;
  const t = Math.max(1.1, Math.min(100, target));
  S.cash -= S.bet;
  limboAnimating = true;
  const roll = Math.random() * 100;
  const won = roll < (100 / t);
  const resultEl = $('limbo-result');
  let frame = 0;
  const dur = 40;
  function tick() {
    try {
      frame++;
      if (frame < dur) {
        const v = (Math.random() * 100).toFixed(2);
        resultEl.textContent = v;
        resultEl.style.color = '#00ffcc';
        requestAnimationFrame(tick);
      } else {
        resultEl.textContent = roll.toFixed(2);
        if (won) {
          const win = Math.round(S.bet * t);
          resultEl.style.color = '#00ffcc';
          toast('+' + fmt(win) + ' (' + t.toFixed(2) + 'x)', 'win');
          endRound(true, win);
        } else {
          resultEl.style.color = '#ff3344';
          toast('-' + fmt(S.bet), 'loss');
          endRound(false, 0);
        }
        updUI();
      }
    } catch(e) { console.error('limbo tick error', e); updUI(); }
    limboAnimating = false;
  }
  requestAnimationFrame(tick);
}

/* ============================================================
   CRASH (exponential growth, cash out before crash)
   ============================================================ */
let crashState = null, crashAnimating = false;
let crashCanvas, crashCtx, crashHistory = [];
let crashParticles = [];
let crashAnimId = 0;

function initCrashCanvas() {
  crashCanvas = $('crash-canvas');
  if (!crashCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  const cssW = 500, cssH = 320;
  crashCanvas.width = cssW * dpr;
  crashCanvas.height = cssH * dpr;
  crashCanvas.style.width = cssW + 'px';
  crashCanvas.style.height = cssH + 'px';
  crashCtx = crashCanvas.getContext('2d');
  crashCtx.scale(dpr, dpr);
  drawCrashGraph();
}

function drawCrashGraph() {
  if (!crashCtx || !crashCanvas) return;
  const c = crashCtx, w = 500, h = 320;
  c.save();
  c.setTransform(1, 0, 0, 1, 0, 0);
  const dpr = window.devicePixelRatio || 1;
  c.scale(dpr, dpr);
  c.clearRect(0, 0, w, h);
  const grad = c.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#0c0c22');
  grad.addColorStop(1, '#080818');
  c.fillStyle = grad;
  c.fillRect(0, 0, w, h);
  c.strokeStyle = 'rgba(255,255,255,.04)';
  c.lineWidth = 1;
  for (let x = 0; x < w; x += 50) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
  for (let y = 0; y < h; y += 50) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
  const ml = 60, mt = 20, mr = 20, mb = 40;
  const gw = w - ml - mr, gh = h - mt - mb;
  c.strokeStyle = 'rgba(255,255,255,.15)';
  c.lineWidth = 2;
  c.beginPath(); c.moveTo(ml, mt); c.lineTo(ml, mt + gh); c.lineTo(ml + gw, mt + gh); c.stroke();
  c.font = '11px Orbitron, monospace';
  c.fillStyle = 'rgba(255,255,255,.25)';
  c.textAlign = 'right'; c.textBaseline = 'middle';
  const maxMult = crashState && crashState.mult > 1 ? Math.max(2, crashState.mult * 1.4) : 5;
  for (let i = 0; i <= 4; i++) {
    const val = 1 + (maxMult - 1) * (i / 4);
    const y = mt + gh - (gh * (val - 1) / (maxMult - 1));
    c.fillText(val.toFixed(1) + 'x', ml - 8, y);
    if (i > 0) {
      c.strokeStyle = 'rgba(255,255,255,.04)';
      c.lineWidth = 1;
      c.beginPath(); c.moveTo(ml, y); c.lineTo(ml + gw, y); c.stroke();
    }
  }
  if (crashHistory.length > 1) {
    const crashed = crashState && !crashState.alive && !crashAnimating;
    c.beginPath();
    c.moveTo(ml, mt + gh);
    for (let i = 0; i < crashHistory.length; i++) {
      const x = ml + (i / Math.max(1, crashHistory.length - 1)) * gw;
      const val = Math.min(crashHistory[i], maxMult);
      const y = mt + gh - (gh * (val - 1) / (maxMult - 1));
      c.lineTo(x, y);
    }
    if (!crashed) {
      c.strokeStyle = '#00ffcc';
      c.shadowColor = 'rgba(0,255,200,.35)';
      c.shadowBlur = 10;
    } else {
      c.strokeStyle = '#ff3344';
      c.shadowColor = 'rgba(255,51,68,.5)';
      c.shadowBlur = 14;
    }
    c.lineWidth = 3;
    c.stroke();
    c.shadowBlur = 0;
    if (!crashed && crashState && crashState.alive) {
      const li = crashHistory.length - 1;
      const rx = ml + (li / Math.max(1, crashHistory.length - 1)) * gw;
      const ry = mt + gh - (gh * (Math.min(crashHistory[li], maxMult) - 1) / (maxMult - 1));
      c.font = 'bold 22px sans-serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('🚀', rx, ry - 2);
    }
    if (crashed) {
      const li = crashHistory.length - 1;
      const rx = ml + (li / Math.max(1, crashHistory.length - 1)) * gw;
      const ry = mt + gh - (gh * (Math.min(crashHistory[li], maxMult) - 1) / (maxMult - 1));
      c.font = 'bold 28px sans-serif';
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillStyle = '#ff3344';
      c.fillText('💥', rx, ry);
    }
  }
  for (let i = crashParticles.length - 1; i >= 0; i--) {
    const p = crashParticles[i];
    p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.02;
    if (p.life <= 0) { crashParticles.splice(i, 1); continue; }
    c.beginPath(); c.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
    c.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${p.life})`;
    c.fill();
  }
  c.restore();
}

function startCrash() {
  if (crashAnimating) return;
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= S.bet;
  crashAnimId++;
  const myId = crashAnimId;
  initCrashCanvas();
  crashHistory = [1];
  crashParticles = [];
  const r = Math.random();
  const crashPoint = r < 0.05 ? 1.00 : Math.max(1.01, 0.95 / (1 - r));
  crashState = { bet: S.bet, mult: 1, crashPoint, alive: true };
  crashAnimating = true;
  $('crash-mult').textContent = '1.00x';
  $('crash-mult').style.color = '#00ffcc';
  $('crash-info').textContent = 'Cash out before it crashes!';
  $('crash-cashout').disabled = false;
  $('crash-start').disabled = true;
  $('crash-result').textContent = '';
  updUI();
  const start = performance.now();
  let lastMult = 1;
  function tick(now) {
    try {
      if (myId !== crashAnimId) return;
      if (!crashState || !crashState.alive) return;
      const elapsed = (now - start) / 1000;
      crashState.mult = Math.exp(0.12 * elapsed);
      if (crashState.mult >= crashState.crashPoint) {
        crashState.mult = crashState.crashPoint;
        crashHistory.push(crashState.mult);
        drawCrashGraph();
        const el = $('crash-mult');
        el.textContent = crashState.mult.toFixed(2) + 'x';
        el.style.color = '#ff3344';
        el.classList.remove('pulse');
        el.classList.add('crashed');
        $('crash-info').textContent = 'CRASHED at ' + crashState.mult.toFixed(2) + 'x!';
        $('crash-result').textContent = 'CRASHED! -' + fmt(crashState.bet);
        $('crash-result').style.color = '#ff3344';
        $('crash-cashout').disabled = true;
        $('crash-start').disabled = false;
        toast('CRASHED! -' + fmt(crashState.bet), 'loss');
        crashState.alive = false;
        crashAnimating = false;
        for (let i = 0; i < 20; i++) {
          const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 4;
          crashParticles.push({ x: 250, y: 100, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, r: 2 + Math.random() * 3, life: 1, cr: 255, cg: 50 + Math.random() * 50, cb: 0 });
        }
        endRound(false, 0);
        return;
      }
      if (crashState.mult - lastMult >= 0.05) {
        crashHistory.push(crashState.mult);
        lastMult = crashState.mult;
      }
      drawCrashGraph();
      $('crash-mult').textContent = crashState.mult.toFixed(2) + 'x';
      const r = Math.min(255, Math.floor((crashState.mult - 1) * 40));
      $('crash-mult').style.color = `rgb(${Math.max(0,255 - r)},${100 + r * 0.5},${r})`;
      requestAnimationFrame(tick);
    } catch(e) { console.error('crash tick error', e); crashAnimating = false; crashAnimId++; if (crashState) crashState.alive = false; $('crash-start').disabled = false; $('crash-cashout').disabled = true; updUI(); }
  }
  requestAnimationFrame(tick);
}

function cashoutCrash() {
  if (!crashState || !crashState.alive) return;
  crashAnimId++;
  const mult = crashState.mult;
  const win = Math.round(crashState.bet * mult);
  crashState.alive = false;
  $('crash-cashout').disabled = true;
  $('crash-start').disabled = false;
  const mel = $('crash-mult');
  mel.style.color = '#ffd700';
  mel.classList.remove('pulse', 'crashed');
  mel.style.textShadow = '0 0 20px rgba(255,215,0,.5)';
  $('crash-info').textContent = 'Cashed out at ' + mult.toFixed(2) + 'x!';
  $('crash-result').textContent = '+' + fmt(win) + ' (' + mult.toFixed(2) + 'x)';
  $('crash-result').style.color = '#00ffcc';
  toast('+' + fmt(win) + ' (' + mult.toFixed(2) + 'x)', 'gold');
  crashAnimating = false;
  drawCrashGraph();
  endRound(true, win);
}

/* ============================================================
   COIN FLIP (heads/tails, 1.96x payout)
   ============================================================ */
let cfAnimating = false;

function flipCoin(choice) {
  if (cfAnimating) return;
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= S.bet;
  cfAnimating = true;
  const result = Math.random() < 0.5 ? 'heads' : 'tails';
  const coin = $('cf-coin');
  const resultEl = $('cf-result');
  coin.className = 'flipping';
  resultEl.textContent = '';
  const face = $('cf-coin-face');
  let flipCount = 0;
  const flipInterval = setInterval(() => {
    if (face) face.textContent = Math.random() < 0.5 ? '♛' : '☽';
    flipCount++;
    if (flipCount > 12) clearInterval(flipInterval);
  }, 80);
  setTimeout(() => {
    try {
      clearInterval(flipInterval);
      if (face) face.textContent = result === 'heads' ? '♛' : '☽';
      const won = choice === result;
      if (won) {
        const win = Math.round(S.bet * 2);
        resultEl.textContent = result.toUpperCase() + '! +' + fmt(win);
        resultEl.style.color = '#00ffcc';
        coin.className = 'win-bounce';
        toast('+' + fmt(win), 'win');
        endRound(true, win);
      } else {
        resultEl.textContent = result.toUpperCase() + '! -' + fmt(S.bet);
        resultEl.style.color = '#ff3344';
        coin.className = 'lose-wobble';
        toast('-' + fmt(S.bet), 'loss');
        endRound(false, 0);
      }
    } catch(e) { console.error('coinflip error', e); updUI(); }
    setTimeout(() => { coin.className = ''; cfAnimating = false; }, 600);
    updUI();
  }, 1200);
}

/* ============================================================
   KENO (pick numbers, match drawn)
   ============================================================ */
let kenoState = null;

function startKeno() {
  if (kenoState && kenoState.drawing) return;
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  const numPicks = 10;
  const picked = [];
  document.querySelectorAll('.keno-num.sel').forEach(el => picked.push(parseInt(el.dataset.n)));
  if (picked.length === 0) { toast('Pick some numbers first!', 'info'); return; }
  S.cash -= S.bet;
  kenoState = { bet: S.bet, picked, drawn: [], drawing: true, mult: 0 };
  document.querySelectorAll('.keno-num').forEach(el => { el.classList.remove('hit', 'miss'); });
  $('keno-result').textContent = '';
  $('keno-info').textContent = 'Drawing...';
  let drawIdx = 0;
  const pool = [];
  for (let i = 1; i <= 40; i++) pool.push(i);
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  kenoState.drawn = pool.slice(0, 10);
  function drawNext() {
    if (drawIdx >= kenoState.drawn.length) {
      kenoState.drawing = false;
      checkKenoWin();
      return;
    }
    const num = kenoState.drawn[drawIdx];
    const el = document.querySelector('.keno-num[data-n="' + num + '"]');
    if (el) el.classList.add('drawn');
    drawIdx++;
    setTimeout(drawNext, 300);
  }
  drawNext();
  updUI();
}

function toggleKenoNum(el) {
  if (kenoState && kenoState.drawing) return;
  el.classList.toggle('sel');
}

function checkKenoWin() {
  if (!kenoState) return;
  try {
    const matches = kenoState.picked.filter(n => kenoState.drawn.includes(n)).length;
    const hitEls = [];
    const missEls = [];
    kenoState.picked.forEach(n => {
      const el = document.querySelector('.keno-num[data-n="' + n + '"]');
      if (kenoState.drawn.includes(n)) { if (el) { el.classList.add('hit'); hitEls.push(el); } }
      else { if (el) { el.classList.add('miss'); missEls.push(el); } }
    });
    const payTable = [0, 0, 2, 3, 5, 10, 25, 50, 100, 250, 500];
    const mult = payTable[matches] || 0;
    if (matches >= 2) {
      const win = Math.round(kenoState.bet * mult);
      $('keno-result').textContent = matches + ' matches! +' + fmt(win);
      $('keno-result').style.color = '#00ffcc';
      toast('+' + fmt(win) + ' (' + mult + 'x)', 'gold');
      endRound(true, win);
    } else {
      $('keno-result').textContent = matches + ' match' + (matches === 1 ? '' : 'es') + ' — no win';
      $('keno-result').style.color = '#ff3344';
      toast('-' + fmt(kenoState.bet), 'loss');
      endRound(false, 0);
    }
    $('keno-info').textContent = matches + ' of ' + kenoState.picked.length + ' matched';
  } catch(e) { console.error('keno check error', e); updUI(); }
  kenoState = null;
  updUI();
}

/* ============================================================
   TOWER (pick safe door, climb floors)
   ============================================================ */
let towerState = null;
let towerDiff = 'medium';
const towerDiffConfig = {
  easy:   { floors: 5, safeMin: 2, safeMax: 3, baseMult: 1.3, floorMult: 0.1 },
  medium: { floors: 8, safeMin: 2, safeMax: 2, baseMult: 1.5, floorMult: 0.15 },
  hard:   { floors: 12, safeMin: 1, safeMax: 1, baseMult: 1.8, floorMult: 0.2 }
};

function setTowerDiff(diff) {
  towerDiff = diff;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('sel'));
  $('tower-diff-' + diff).classList.add('sel');
}

function initTowerGrid() {
  const cfg = towerDiffConfig[towerDiff];
  const grid = $('tower-grid');
  grid.innerHTML = '';
  for (let f = 0; f < cfg.floors; f++) {
    const row = document.createElement('div');
    row.className = 'tower-floor';
    row.id = 'tower-floor-' + f;
    const num = document.createElement('span');
    num.className = 'tower-floor-num';
    num.textContent = 'F' + (f + 1);
    row.appendChild(num);
    for (let d = 0; d < 3; d++) {
      const door = document.createElement('div');
      door.className = 'tower-door';
      door.id = 'tower-floor-' + f + '-door-' + d;
      door.innerHTML = '<span class="td-icon td-unknown">?</span>';
      door.onclick = () => pickTowerDoor(d);
      row.appendChild(door);
    }
    grid.appendChild(row);
  }
  document.querySelectorAll('.tower-floor').forEach((f, i) => f.classList.toggle('active', i === 0));
}

function startTower() {
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= S.bet;
  const cfg = towerDiffConfig[towerDiff];
  const floors = [];
  for (let i = 0; i < cfg.floors; i++) {
    const safeCount = cfg.safeMin + Math.floor(Math.random() * (cfg.safeMax - cfg.safeMin + 1));
    const doors = [false, false, false];
    const indices = [0, 1, 2].sort(() => Math.random() - 0.5);
    for (let s = 0; s < safeCount; s++) doors[indices[s]] = true;
    floors.push(doors);
  }
  towerState = { bet: S.bet, floor: 0, floors, alive: true, mult: 1, cfg };
  $('tower-mult').textContent = '1.00x';
  $('tower-result').textContent = '';
  $('tower-info').textContent = 'Floor 1! Pick a door.';
  $('tower-cashout').disabled = false;
  $('tower-start').style.display = 'none';
  $('tower-new').style.display = 'none';
  $('tower-cashout').style.display = '';
  initTowerGrid();
  updUI();
}

function pickTowerDoor(doorIdx) {
  if (!towerState || !towerState.alive) return;
  const floor = towerState.floor;
  const cfg = towerState.cfg;
  const el = document.getElementById('tower-floor-' + floor + '-door-' + doorIdx);
  try {
    if (towerState.floors[floor][doorIdx]) {
      if (el) { el.classList.add('safe'); el.innerHTML = '<span class="td-icon td-safe">✓</span>'; }
      towerState.mult *= cfg.baseMult + floor * cfg.floorMult;
      towerState.floor++;
      $('tower-mult').textContent = towerState.mult.toFixed(2) + 'x';
      document.querySelectorAll('.tower-floor').forEach((f, i) => f.classList.toggle('active', i === towerState.floor));
      if (towerState.floor >= cfg.floors) {
        const win = Math.round(towerState.bet * towerState.mult);
        $('tower-result').textContent = '+' + fmt(win) + ' (all floors!)';
        $('tower-result').style.color = '#ffd700';
        $('tower-info').textContent = 'You conquered the tower!';
        toast('+' + fmt(win) + ' (' + towerState.mult.toFixed(2) + 'x)', 'gold');
        towerState.alive = false;
        $('tower-cashout').disabled = true;
        $('tower-new').style.display = '';
        endRound(true, win);
      } else {
        $('tower-info').textContent = 'Floor ' + (towerState.floor + 1) + '! Pick a door.';
      }
    } else {
      if (el) { el.classList.add('boom'); el.innerHTML = '<span class="td-icon td-boom">✗</span>'; }
      for (let f = towerState.floor; f < cfg.floors; f++) {
        for (let d = 0; d < 3; d++) {
          const de = document.getElementById('tower-floor-' + f + '-door-' + d);
          if (de && towerState.floors[f][d]) { de.classList.add('revealed-safe'); de.innerHTML = '<span class="td-icon td-revealed">✓</span>'; }
        }
      }
      $('tower-result').textContent = 'BUST! -' + fmt(towerState.bet);
      $('tower-result').style.color = '#ff3344';
      $('tower-info').textContent = 'Wrong door on floor ' + (floor + 1) + '!';
      toast('BUST! -' + fmt(towerState.bet), 'loss');
      towerState.alive = false;
      $('tower-cashout').disabled = true;
      $('tower-new').style.display = '';
      endRound(false, 0);
    }
  } catch(e) { console.error('tower pick error', e); updUI(); }
  updUI();
}

function cashoutTower() {
  if (!towerState || !towerState.alive || towerState.floor === 0) return;
  const win = Math.round(towerState.bet * towerState.mult);
  $('tower-result').textContent = '+' + fmt(win) + ' (' + towerState.mult.toFixed(2) + 'x)';
  $('tower-result').style.color = '#00ffcc';
  $('tower-info').textContent = 'Cashed out at floor ' + towerState.floor + '!';
  toast('+' + fmt(win) + ' (' + towerState.mult.toFixed(2) + 'x)', 'gold');
  towerState.alive = false;
  $('tower-cashout').disabled = true;
  $('tower-cashout').style.display = 'none';
  $('tower-start').style.display = '';
  $('tower-new').style.display = 'none';
  endRound(true, win);
}

/* ============================================================
   VIDEO POKER (5-card draw, hold & redraw)
   ============================================================ */
const VP_SUITS = ['♠', '♥', '♦', '♣'];
const VP_VALS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let vpDeck = [], vpHand = [], vpHeld = [], vpState = 'idle';

function vpShuffle() {
  vpDeck = [];
  for (const s of VP_SUITS) for (const v of VP_VALS) vpDeck.push({ suit: s, val: v });
  for (let i = vpDeck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [vpDeck[i], vpDeck[j]] = [vpDeck[j], vpDeck[i]]; }
}
function vpCardVal(c) { return VP_VALS.indexOf(c.val); }
function vpRenderHand() {
  const container = $('vp-hand');
  if (!container) return;
  container.innerHTML = '';
  vpHand.forEach((c, i) => {
    const el = document.createElement('div');
    const held = vpHeld[i];
    el.className = 'bj-card' + (held ? ' held' : '');
    el.innerHTML = `<div class="card-val">${c.val}</div><div class="card-sym" style="color:${c.suit === '♥' || c.suit === '♦' ? '#cc0000' : '#111'}">${c.suit}</div>` + (held ? '<div class="held-tag">HELD</div>' : '');
    el.onclick = () => { if (vpState === 'hold') vpToggleHold(i); };
    el.style.animationDelay = (i * 0.08) + 's';
    container.appendChild(el);
  });
}

function vpDeal() {
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= S.bet;
  vpShuffle();
  vpHand = vpDeck.splice(0, 5);
  vpHeld = [false, false, false, false, false];
  vpState = 'hold';
  vpRenderHand();
  $('vp-result').textContent = '';
  $('vp-draw').disabled = false;
  $('vp-deal').disabled = true;
  $('vp-info').textContent = 'Tap cards to hold, then DRAW';
  updUI();
}

function vpToggleHold(i) {
  if (vpState !== 'hold') return;
  vpHeld[i] = !vpHeld[i];
  vpRenderHand();
}

function vpDraw() {
  if (vpState !== 'hold') return;
  vpState = 'done';
  try {
    for (let i = 0; i < 5; i++) {
      if (!vpHeld[i]) vpHand[i] = vpDeck.pop();
    }
    vpRenderHand();
    $('vp-draw').disabled = true;
    $('vp-deal').disabled = false;
    const result = vpEvaluate(vpHand);
    const payTable = {
      'royal': 250, 'straight_flush': 50, 'four_kind': 25, 'full_house': 9,
      'flush': 6, 'straight': 4, 'three_kind': 3, 'two_pair': 2, 'jacks_plus': 1, 'any_pair': 1
    };
    const names = {
      'royal': 'ROYAL FLUSH!', 'straight_flush': 'STRAIGHT FLUSH!', 'four_kind': 'FOUR OF A KIND!',
      'full_house': 'FULL HOUSE!', 'flush': 'FLUSH!', 'straight': 'STRAIGHT!',
      'three_kind': 'THREE OF A KIND!', 'two_pair': 'TWO PAIR', 'jacks_plus': 'PAIR', 'any_pair': 'PAIR', 'nothing': ''
    };
    const mult = payTable[result.hand] || 0;
    if (mult > 0) {
      const win = Math.round(S.bet * mult);
      $('vp-result').textContent = names[result.hand] + ' +' + fmt(win);
      $('vp-result').style.color = mult >= 9 ? '#ffd700' : '#00ffcc';
      toast('+' + fmt(win) + ' (' + mult + 'x)', mult >= 9 ? 'gold' : 'win');
      endRound(true, win);
    } else {
      $('vp-result').textContent = 'No win';
      $('vp-result').style.color = '#ff3344';
      toast('-' + fmt(S.bet), 'loss');
      endRound(false, 0);
    }
  } catch(e) { console.error('vp draw error', e); updUI(); }
  vpState = 'idle';
  updUI();
}

function vpEvaluate(hand) {
  const vals = hand.map(c => vpCardVal(c)).sort((a, b) => a - b);
  const suits = hand.map(c => c.suit);
  const isFlush = suits.every(s => s === suits[0]);
  const isStraight = vals[4] - vals[0] === 4 && new Set(vals).size === 5;
  const isAceLow = vals.join(',') === '0,1,2,3,4';
  const counts = {};
  vals.forEach(v => counts[v] = (counts[v] || 0) + 1);
  const cnts = Object.values(counts).sort((a, b) => b - a);
  const isRoyal = isFlush && vals.join(',') === '8,9,10,11,12';
  if (isRoyal) return { hand: 'royal' };
  if (isFlush && isStraight) return { hand: 'straight_flush' };
  if (cnts[0] === 4) return { hand: 'four_kind' };
  if (cnts[0] === 3 && cnts[1] === 2) return { hand: 'full_house' };
  if (isFlush) return { hand: 'flush' };
  if (isStraight || isAceLow) return { hand: 'straight' };
  if (cnts[0] === 3) return { hand: 'three_kind' };
  if (cnts[0] === 2 && cnts[1] === 2) return { hand: 'two_pair' };
  if (cnts[0] === 2) {
    return { hand: 'any_pair' };
  }
  return { hand: 'nothing' };
}

/* ============================================================
   HI-LO (guess higher or lower, streak multiplier)
   ============================================================ */
const HL_VALS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let hlState = null;

function hlNewCard() {
  const val = Math.floor(Math.random() * 13);
  const suit = VP_SUITS[Math.floor(Math.random() * 4)];
  return { val, suit, display: HL_VALS[val] };
}

function startHiLo() {
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= S.bet;
  const card = hlNewCard();
  hlState = { bet: S.bet, card, streak: 0, mult: 1, alive: true };
  hlRenderCard('hl-current', card);
  $('hl-mult').textContent = '1.00x';
  $('hl-result').textContent = '';
  $('hl-info').textContent = 'Will next card be higher or lower?';
  $('hl-higher').disabled = false;
  $('hl-lower').disabled = false;
  $('hl-cashout').disabled = true;
  $('hl-start').style.display = 'none';
  $('hl-new').style.display = 'none';
  $('hl-higher').style.display = '';
  $('hl-lower').style.display = '';
  updUI();
}

function hlGuess(choice) {
  if (!hlState || !hlState.alive) return;
  try {
    const next = hlNewCard();
    hlRenderCard('hl-next', next);
    const curVal = hlState.card.val;
    const nextVal = next.val;
    const won = (choice === 'higher' && nextVal > curVal) || (choice === 'lower' && nextVal < curVal);
    if (nextVal === curVal) {
      hlState.alive = false;
      $('hl-result').textContent = 'TIE! -' + fmt(hlState.bet);
      $('hl-result').style.color = '#ffd700';
      $('hl-info').textContent = 'Same value — you lose!';
      toast('-' + fmt(hlState.bet), 'loss');
      $('hl-higher').disabled = true;
      $('hl-lower').disabled = true;
      $('hl-cashout').disabled = true;
      $('hl-start').style.display = 'none';
      $('hl-new').style.display = '';
      endRound(false, 0);
    } else if (won) {
      hlState.streak++;
      hlState.mult = 1 + hlState.streak * 0.5;
      hlState.card = next;
      $('hl-mult').textContent = hlState.mult.toFixed(2) + 'x';
      $('hl-info').textContent = 'Correct! Streak: ' + hlState.streak + ' — keep going or cash out!';
      $('hl-cashout').disabled = false;
      hlRenderCard('hl-current', next);
    } else {
      hlState.alive = false;
      $('hl-result').textContent = 'WRONG! -' + fmt(hlState.bet);
      $('hl-result').style.color = '#ff3344';
      $('hl-info').textContent = 'Card was ' + next.display + ' — you lose!';
      toast('-' + fmt(hlState.bet), 'loss');
      $('hl-higher').disabled = true;
      $('hl-lower').disabled = true;
      $('hl-cashout').disabled = true;
      $('hl-start').style.display = 'none';
      $('hl-new').style.display = '';
      endRound(false, 0);
    }
  } catch(e) { console.error('hilo guess error', e); updUI(); }
  updUI();
}

function hlCashout() {
  if (!hlState || !hlState.alive || hlState.streak === 0) return;
  const win = Math.round(hlState.bet * hlState.mult);
  $('hl-result').textContent = '+' + fmt(win) + ' (' + hlState.mult.toFixed(2) + 'x)';
  $('hl-result').style.color = '#00ffcc';
  $('hl-info').textContent = 'Cashed out at streak ' + hlState.streak + '!';
  toast('+' + fmt(win) + ' (' + hlState.mult.toFixed(2) + 'x)', 'gold');
  hlState.alive = false;
  $('hl-higher').disabled = true;
  $('hl-lower').disabled = true;
  $('hl-cashout').disabled = true;
  $('hl-start').style.display = 'none';
  $('hl-new').style.display = '';
  endRound(true, win);
}

function hlRenderCard(id, card) {
  const el = $(id);
  if (!el) return;
  const isRed = card.suit === '♥' || card.suit === '♦';
  el.innerHTML = `<div class="card-val">${card.display}</div><div class="card-sym" style="color:${isRed ? '#cc0000' : '#111'}">${card.suit}</div>`;
  el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip');
}

/* ============================================================
   BACCARAT (player vs banker, closest to 9 wins)
   ============================================================ */
let baccState = null;

function baccDraw() {
  const val = Math.floor(Math.random() * 13);
  const suit = VP_SUITS[Math.floor(Math.random() * 4)];
  return { val, suit, display: VP_VALS[val], num: Math.min(9, val >= 9 ? 0 : val + 1) };
}

function baccHandTotal(cards) {
  return cards.reduce((s, c) => s + c.num, 0) % 10;
}

function baccRenderHands(playerCards, bankerCards, reveal) {
  const pc = $('bacc-player-cards'), bc = $('bacc-banker-cards');
  if (pc) {
    pc.innerHTML = '';
    playerCards.forEach((c, i) => {
      const el = document.createElement('div');
      if (!reveal && i === playerCards.length - 1 && playerCards.length === 3) {
        el.className = 'bj-card facedown';
        el.innerHTML = '<div class="card-val">?</div><div class="card-sym">?</div>';
      } else {
        const isRed = c.suit === '♥' || c.suit === '♦';
        el.className = 'bj-card';
        el.innerHTML = `<div class="card-val">${c.display}</div><div class="card-sym" style="color:${isRed ? '#cc0000' : '#111'}">${c.suit}</div>`;
      }
      el.style.animationDelay = (i * 0.1) + 's';
      pc.appendChild(el);
    });
  }
  if (bc) {
    bc.innerHTML = '';
    bankerCards.forEach((c, i) => {
      const el = document.createElement('div');
      if (!reveal && i === 1) {
        el.className = 'bj-card facedown';
        el.innerHTML = '<div class="card-val">?</div><div class="card-sym">?</div>';
      } else {
        const isRed = c.suit === '♥' || c.suit === '♦';
        el.className = 'bj-card';
        el.innerHTML = `<div class="card-val">${c.display}</div><div class="card-sym" style="color:${isRed ? '#cc0000' : '#111'}">${c.suit}</div>`;
      }
      el.style.animationDelay = (i * 0.1) + 's';
      bc.appendChild(el);
    });
  }
  $('bacc-player-total').textContent = reveal ? baccHandTotal(playerCards) : (playerCards.length > 0 ? baccHandTotal([playerCards[0]]) : '?');
  $('bacc-banker-total').textContent = reveal ? baccHandTotal(bankerCards) : (bankerCards.length > 1 ? '?' : '?');
}

function baccDeal() {
  if (baccState && baccState.playing) return;
  const choice = $('bacc-bet-choice').value;
  if (S.cash < S.bet) { toast('Not enough cash!', 'loss'); return; }
  S.cash -= S.bet;
  const player = [baccDraw(), baccDraw()];
  const banker = [baccDraw(), baccDraw()];
  baccRenderHands(player, banker, false);
  baccState = { bet: S.bet, player, banker, choice, playing: true };
  $('bacc-result').textContent = '';
  $('bacc-info').textContent = 'Dealing...';
  $('bacc-deal').disabled = true;
  setTimeout(() => baccResolve(), 800);
  updUI();
}

function baccResolve() {
  if (!baccState) return;
  try {
    let { player, banker } = baccState;
    let pTotal = baccHandTotal(player);
    let bTotal = baccHandTotal(banker);
    if (pTotal <= 5) { player.push(baccDraw()); pTotal = baccHandTotal(player); }
    if (bTotal <= 5) { banker.push(baccDraw()); bTotal = baccHandTotal(banker); }
    baccRenderHands(player, banker, true);
    const winner = pTotal > bTotal ? 'player' : bTotal > pTotal ? 'banker' : 'tie';
    const mult = baccState.choice === 'tie' ? 8 : baccState.choice === winner ? (baccState.choice === 'banker' ? 1.95 : 2) : 0;
    if (mult > 0) {
      const win = Math.round(baccState.bet * mult);
      $('bacc-result').textContent = winner.toUpperCase() + ' wins! +' + fmt(win);
      $('bacc-result').style.color = '#00ffcc';
      toast('+' + fmt(win), winner === 'tie' ? 'gold' : 'win');
      endRound(true, win);
    } else {
      $('bacc-result').textContent = winner.toUpperCase() + ' wins! -' + fmt(baccState.bet);
      $('bacc-result').style.color = '#ff3344';
      toast('-' + fmt(baccState.bet), 'loss');
      endRound(false, 0);
    }
    $('bacc-info').textContent = 'Player: ' + pTotal + ' | Banker: ' + bTotal;
  } catch(e) { console.error('baccarat resolve error', e); updUI(); }
  baccState.playing = false;
  $('bacc-deal').disabled = false;
  updUI();
}

/* ============================================================
   KENO GRID INIT
   ============================================================ */
function initKenoGrid() {
  const grid = $('keno-grid');
  if (!grid || grid.children.length > 0) return;
  grid.innerHTML = '';
  for (let i = 1; i <= 40; i++) {
    const el = document.createElement('div');
    el.className = 'keno-num';
    el.dataset.n = i;
    el.textContent = i;
    el.onclick = () => toggleKenoNum(el);
    grid.appendChild(el);
  }
}

/* ============================================================
   SKILL TREE (renamed BJ MASTER, fixed spacing)
   ============================================================ */
const stCanvas = $('st-canvas'), stCtx = stCanvas.getContext('2d'), stArea = $('st-area');
const STD = [
  ['g0','CORE','Start',0,0,0,0,'#ffd700',['g0'],'global',()=>{}],
  ['g1','CASHBACK','5% back on losses',0,-110,1,1,'#00ffcc',['g0'],'global',()=>{S.cashback+=.05}],
  ['g2','INTEREST','3% per round',-100,-60,1,1,'#00ff88',['g0'],'global',()=>{S.interestRate+=.03}],
  ['g3','BIG BET','Max bet +50',100,-60,1,1,'#7b2dff',['g0'],'global',()=>{S.maxBetBonus+=50}],
  ['g4','CASHBACK+','10% back',0,-220,2,2,'#00ffcc',['g1'],'global',()=>{S.cashback+=.05}],
  ['g5','SAVINGS','8% interest',-140,-130,2,2,'#00ff88',['g2'],'global',()=>{S.interestRate+=.05}],
  ['g6','WHALE','Max bet +200',140,-130,2,2,'#7b2dff',['g3'],'global',()=>{S.maxBetBonus+=200}],
  ['g7','CASHBACK++','20% back',0,-330,3,3,'#00ffcc',['g4'],'global',()=>{S.cashback+=.1}],
  ['g8','TYCOON','15% interest',-190,-230,3,3,'#00ff88',['g5'],'global',()=>{S.interestRate+=.07}],
  ['g9','WHALE+','Max bet +500',190,-230,3,3,'#7b2dff',['g6'],'global',()=>{S.maxBetBonus+=500}],
  ['p1','EDGE','Edge +2',200,20,1,1,'#ff9900',['g0'],'plinko',()=>{S.plEdge+=2}],
  ['p2','CENTER','Center +3',260,90,1,1,'#00ccff',['g0'],'plinko',()=>{S.plCenter+=3}],
  ['p3','LUCKY','8% double',260,160,1,1,'#ffd700',['g0'],'plinko',()=>{S.plLucky+=.08}],
  ['p4','EDGE+','Edge +5',330,40,2,2,'#ff9900',['p1'],'plinko',()=>{S.plEdge+=3}],
  ['p5','CENTER+','Center +6',390,100,2,2,'#00ccff',['p2'],'plinko',()=>{S.plCenter+=3}],
  ['p6','MEGA','10% triple',390,170,2,2,'#ff3366',['p3'],'plinko',()=>{S.plMega+=.1}],
  ['p7','PIN','Pins boost',340,130,2,2,'#cc66ff',['p1','p2'],'plinko',()=>{S.plPin+=.5}],
  ['p8','LUCKY+','20% double',450,150,3,3,'#ffd700',['p6'],'plinko',()=>{S.plLucky+=.12}],
  ['p9','EDGE++','Edge +10',450,60,3,3,'#ff9900',['p4'],'plinko',()=>{S.plEdge+=5}],
  ['p10','CENTER++','Center +10',450,210,3,3,'#00ccff',['p5'],'plinko',()=>{S.plCenter+=4}],
  ['p11','MASTER','All plinko x2',510,130,5,4,'#ffd700',['p8','p9','p10'],'plinko',()=>{S.plEdge+=5;S.plCenter+=5;S.plLucky+=.1;S.plMega+=.1}],
  ['d1','EDGE-','House -0.5%',-200,20,1,1,'#ff6699',['g0'],'dice',()=>{S.diceEdge+=.005}],
  ['d2','BONUS','Mult +0.1',-260,90,1,1,'#7b2dff',['g0'],'dice',()=>{S.diceBonus+=.1}],
  ['d3','CRIT','5% double',-260,160,1,1,'#ff3366',['g0'],'dice',()=>{S.diceCrit+=.05}],
  ['d4','EDGE--','Edge -1%',-330,40,2,2,'#ff6699',['d1'],'dice',()=>{S.diceEdge+=.005}],
  ['d5','BONUS+','Mult +0.25',-390,100,2,2,'#7b2dff',['d2'],'dice',()=>{S.diceBonus+=.15}],
  ['d6','CRIT+','12% double',-390,170,2,2,'#ff3366',['d3'],'dice',()=>{S.diceCrit+=.07}],
  ['d7','SYNERGY','Edge+Bonus',-340,130,2,2,'#cc66ff',['d1','d2'],'dice',()=>{S.diceEdge+=.005;S.diceBonus+=.1}],
  ['d8','CRIT++','20% double',-450,150,3,3,'#ff3366',['d6'],'dice',()=>{S.diceCrit+=.08}],
  ['d9','EDGE---','Edge -1.5%',-450,60,3,3,'#ff6699',['d4'],'dice',()=>{S.diceEdge+=.01}],
  ['d10','BONUS++','Mult +0.5',-450,210,3,3,'#7b2dff',['d5'],'dice',()=>{S.diceBonus+=.25}],
  ['d11','DICE MASTER','All dice x2',-510,130,5,4,'#ffd700',['d8','d9','d10'],'dice',()=>{S.diceEdge+=.02;S.diceBonus+=.4;S.diceCrit+=.15}],
  ['s1','MULTI+','Payout +30%',-120,270,1,1,'#ff66cc',['g0'],'slots',()=>{S.slBonus+=.3}],
  ['s2','FREE','8% free spin',80,270,1,1,'#7b2dff',['g0'],'slots',()=>{S.slFree+=.08}],
  ['s3','PITY','Pity at 4',-180,350,1,1,'#cc66ff',['g0'],'slots',()=>{S.slPity+=.5}],
  ['s4','MULTI++','Payout +50%',-120,390,2,2,'#ff66cc',['s1'],'slots',()=>{S.slBonus+=.2}],
  ['s5','FREE+','15% free',80,390,2,2,'#7b2dff',['s2'],'slots',()=>{S.slFree+=.07}],
  ['s6','PITY+','Pity at 2',-180,440,2,2,'#cc66ff',['s3'],'slots',()=>{S.slPity+=.5}],
  ['s7','MULTI+++','Payout +100%',-120,510,3,3,'#ff66cc',['s4'],'slots',()=>{S.slBonus+=.5}],
  ['s8','FREE++','25% free',80,510,3,3,'#7b2dff',['s5'],'slots',()=>{S.slFree+=.1}],
  ['s9','SLOTS MASTER','All slots x2',-20,590,5,4,'#ffd700',['s7','s8','s6'],'slots',()=>{S.slBonus+=1;S.slFree+=.15;S.slPity+=1}],
  ['m1','SAFE+','+1 safe',200,270,1,1,'#00cc66',['g0'],'mines',()=>{S.mnSafe+=1}],
  ['m2','BONUS','+1 reveal',140,350,1,1,'#ffd700',['g0'],'mines',()=>{S.mnBonus+=1}],
  ['m3','INSURE','8% survive',260,350,1,1,'#ff3366',['g0'],'mines',()=>{S.mnInsurance+=.08}],
  ['m4','SAFE++','+2 safe',200,420,2,2,'#00cc66',['m1'],'mines',()=>{S.mnSafe+=1}],
  ['m5','BONUS+','+1.5 reveal',140,470,2,2,'#ffd700',['m2'],'mines',()=>{S.mnBonus+=1.5}],
  ['m6','INSURE+','15% survive',260,470,2,2,'#ff3366',['m3'],'mines',()=>{S.mnInsurance+=.07}],
  ['m7','SAFE+++','+3 safe',200,540,3,3,'#00cc66',['m4'],'mines',()=>{S.mnSafe+=1}],
  ['m8','BONUS++','+2.5 reveal',140,580,3,3,'#ffd700',['m5'],'mines',()=>{S.mnBonus+=2.5}],
  ['m9','MINES MASTER','All mines x2',200,620,5,4,'#ffd700',['m7','m8','m6'],'mines',()=>{S.mnSafe+=2;S.mnBonus+=5;S.mnInsurance+=.15}],
  ['bj1','BJ BONUS','+5% payout',-200,310,1,1,'#00cc66',['g0'],'blackjack',()=>{S.bjPayout+=.05}],
  ['bj2','NATURAL 21','+15% payout',-200,420,2,2,'#ffd700',['bj1'],'blackjack',()=>{S.bjPayout+=.1}],
  ['rl1','RL LUCKY','5% lucky save',200,310,1,1,'#ff9900',['g0'],'roulette',()=>{S.rlLucky+=.05}],
  ['rl2','RL BONUS','+10% payout',200,420,2,2,'#ffd700',['rl1'],'roulette',()=>{S.rlBonus+=.1}],
];
const stMap = new Map();
const stNodes = STD.map(d => {
  const n = { id: d[0], name: d[1], desc: d[2], x: d[3], y: d[4], cost: d[5], tier: d[6], color: d[7], requires: d[8], cat: d[9], effect: d[10], unlocked: d[0] === 'g0', r: d[6] === 0 ? 24 : d[6] === 1 ? 16 : d[6] === 2 ? 14 : d[6] === 3 ? 13 : 20, anim: 0 };
  stMap.set(n.id, n); return n;
});
const stConns = [];
for (const n of stNodes) for (const rid of n.requires) { const p = stMap.get(rid); if (p) stConns.push({ from: p, to: n }); }
function canSt(sk) { if (sk.unlocked || S.skillPoints < sk.cost) return false; return sk.requires.every(r => { const s = stMap.get(r); return s && s.unlocked; }); }
function doSt(sk) { if (!canSt(sk)) return; S.skillPoints -= sk.cost; sk.unlocked = true; sk.anim = 1; sk.effect(); updUI(); updSP(); toast('Unlocked: ' + sk.name, 'gold'); }
function resetST() { for (const s of stNodes) s.unlocked = s.id === 'g0'; }
function updSP() { $('st-sp').textContent = 'SP: ' + S.skillPoints; }
let skPX = 0, skPY = 20, skZ = .58, skDrag = false, skDX0, skDY0, skPX0, skPY0, skHover = null, skAnim = 0;
function initSTCanvas() { const r = stArea.getBoundingClientRect(); stCanvas.width = r.width; stCanvas.height = r.height; }
function drawST() {
  if (!$('st-overlay').classList.contains('open')) { skAnim = 0; return; }
  skAnim = requestAnimationFrame(drawST);
  const w = stCanvas.width, h = stCanvas.height;
  stCtx.clearRect(0, 0, w, h); stCtx.save();
  const cx = w / 2 + skPX, cy = h / 2 + skPY;
  stCtx.translate(cx, cy); stCtx.scale(skZ, skZ);
  const t = performance.now() * .001;
  stCtx.strokeStyle = 'rgba(30,28,50,.1)'; stCtx.lineWidth = 1;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 10) { stCtx.beginPath(); stCtx.moveTo(0, 0); stCtx.lineTo(Math.cos(a) * 600, Math.sin(a) * 600); stCtx.stroke(); }
  [100, 200, 310, 420, 550].forEach(r => { stCtx.beginPath(); stCtx.arc(0, 0, r, 0, Math.PI * 2); stCtx.stroke(); });
  const cats = { global: [0, -50], plinko: [350, 130], dice: [-350, 130], slots: [-140, 400], mines: [140, 400], blackjack: [-220, 360], roulette: [220, 360] };
  for (const [cat, pos] of Object.entries(cats)) {
    stCtx.font = 'bold 9px Orbitron,monospace'; stCtx.textAlign = 'center'; stCtx.textBaseline = 'middle';
    stCtx.fillStyle = ({ global: '#ffd70030', plinko: '#ff990030', dice: '#ff669930', slots: '#ff66cc30', mines: '#00cc6630', blackjack: '#00cc6630', roulette: '#ff990030' })[cat];
    stCtx.fillText(cat.toUpperCase(), pos[0], pos[1] - 70);
  }
  for (const conn of stConns) {
    const f = conn.from, t2 = conn.to, both = f.unlocked && t2.unlocked, par = f.unlocked;
    stCtx.beginPath(); stCtx.moveTo(f.x, f.y);
    const mx = (f.x + t2.x) / 2, my = (f.y + t2.y) / 2, dx = t2.x - f.x, dy = t2.y - f.y;
    stCtx.quadraticCurveTo(mx - dy * .05, my + dx * .05, t2.x, t2.y);
    if (both) { stCtx.strokeStyle = t2.color; stCtx.lineWidth = 3; stCtx.shadowColor = t2.color; stCtx.shadowBlur = 10; }
    else if (par) { stCtx.strokeStyle = 'rgba(80,80,140,.35)'; stCtx.lineWidth = 2; }
    else { stCtx.strokeStyle = 'rgba(30,30,50,.18)'; stCtx.lineWidth = 1.5; }
    stCtx.stroke(); stCtx.shadowBlur = 0;
    if (both) { const pr = (t * 1.1) % 1; stCtx.beginPath(); stCtx.arc(f.x + dx * pr, f.y + dy * pr, 2, 0, Math.PI * 2); stCtx.fillStyle = t2.color; stCtx.fill(); }
  }
  for (const sk of stNodes) {
    const hov = skHover === sk, av = canSt(sk);
    const hx = parseInt(sk.color.slice(1, 3), 16), hy = parseInt(sk.color.slice(3, 5), 16), hz = parseInt(sk.color.slice(5, 7), 16);
    if (sk.anim > .01) sk.anim *= .88;
    const as = 1 + sk.anim * .3, dr = sk.r * as;
    if (sk.unlocked) { const p = .18 + Math.sin(t * 2 + sk.x * .004) * .07; stCtx.beginPath(); stCtx.arc(sk.x, sk.y, dr + 12, 0, Math.PI * 2); stCtx.fillStyle = `rgba(${hx},${hy},${hz},${p})`; stCtx.fill(); }
    if (av) { const p = .1 + Math.sin(t * 3) * .07; stCtx.beginPath(); stCtx.arc(sk.x, sk.y, dr + 8, 0, Math.PI * 2); stCtx.fillStyle = `rgba(${hx},${hy},${hz},${p})`; stCtx.fill(); stCtx.save(); stCtx.translate(sk.x, sk.y); stCtx.rotate(t * 1.2); stCtx.beginPath(); stCtx.arc(0, 0, dr + 6, 0, Math.PI * 2); stCtx.strokeStyle = sk.color; stCtx.lineWidth = 1.5; stCtx.setLineDash([4, 6]); stCtx.stroke(); stCtx.setLineDash([]); stCtx.restore(); }
    stCtx.beginPath(); stCtx.arc(sk.x, sk.y, dr, 0, Math.PI * 2);
    if (sk.unlocked) { const g = stCtx.createRadialGradient(sk.x - dr * .2, sk.y - dr * .2, 0, sk.x, sk.y, dr); g.addColorStop(0, `rgba(${Math.min(255, hx + 25)},${Math.min(255, hy + 25)},${Math.min(255, hz + 25)},.8)`); g.addColorStop(1, `rgba(${hx},${hy},${hz},.3)`); stCtx.fillStyle = g; stCtx.strokeStyle = sk.color; stCtx.lineWidth = 2; }
    else if (av) { stCtx.fillStyle = `rgba(${hx},${hy},${hz},.05)`; stCtx.strokeStyle = sk.color; stCtx.lineWidth = 1.5; stCtx.setLineDash([3, 3]); }
    else { stCtx.fillStyle = 'rgba(8,8,18,.8)'; stCtx.strokeStyle = 'rgba(35,35,55,.22)'; stCtx.lineWidth = 1; }
    stCtx.fill(); stCtx.stroke(); stCtx.setLineDash([]);
    stCtx.fillStyle = sk.unlocked ? '#fff' : av ? sk.color : '#2a2a44';
    stCtx.font = `bold ${Math.max(6, dr * .46)}px Orbitron,monospace`; stCtx.textAlign = 'center'; stCtx.textBaseline = 'middle';
    stCtx.fillText(sk.tier === 0 ? '\u25C6' : sk.name.split(' ').map(w => w[0]).join('').slice(0, 3), sk.x, sk.y);
    if (hov) { stCtx.beginPath(); stCtx.arc(sk.x, sk.y, dr + 4, 0, Math.PI * 2); stCtx.strokeStyle = 'rgba(255,255,255,.35)'; stCtx.lineWidth = 1.5; stCtx.stroke(); }
    if (!sk.unlocked && sk.cost > 0) {
      stCtx.beginPath(); stCtx.arc(sk.x + dr * .65, sk.y - dr * .65, 8, 0, Math.PI * 2);
      stCtx.fillStyle = av ? '#ffd700' : '#151528'; stCtx.fill();
      stCtx.strokeStyle = av ? '#aa8800' : '#222'; stCtx.lineWidth = 1; stCtx.stroke();
      stCtx.fillStyle = av ? '#111' : '#444'; stCtx.font = 'bold 7px Orbitron,monospace';
      stCtx.fillText(sk.cost, sk.x + dr * .65, sk.y - dr * .65 + 1);
    }
  }
  stCtx.restore();
}
function openST() { $('st-overlay').classList.add('open'); initSTCanvas(); skPX = 0; skPY = 20; skZ = .58; updSP(); if (!skAnim) drawST(); }
function closeST() { $('st-overlay').classList.remove('open'); if (skAnim) { cancelAnimationFrame(skAnim); skAnim = 0; } }
(function () {
  const a = stArea; if (!a) return;
  a.addEventListener('mousedown', e => { skDrag = true; skDX0 = e.clientX; skDY0 = e.clientY; skPX0 = skPX; skPY0 = skPY; });
  window.addEventListener('mousemove', e => {
    if (skDrag) { skPX = skPX0 + (e.clientX - skDX0); skPY = skPY0 + (e.clientY - skDY0); }
    if (!$('st-overlay').classList.contains('open')) { skHover = null; return; }
    const rect = a.getBoundingClientRect();
    const mx = (e.clientX - rect.left - rect.width / 2 - skPX) / skZ;
    const my = (e.clientY - rect.top - rect.height / 2 - skPY) / skZ;
    skHover = null;
    for (const sk of stNodes) { if (Math.hypot(mx - sk.x, my - sk.y) < sk.r + 8) { skHover = sk; break; } }
    const tip = $('tip');
    if (skHover) {
      const sk = skHover; tip.style.display = 'block';
      tip.style.left = Math.min(e.clientX + 10, innerWidth - 250) + 'px';
      tip.style.top = Math.min(e.clientY + 10, innerHeight - 90) + 'px';
      tip.querySelector('.tn').textContent = sk.name; tip.querySelector('.tn').style.color = sk.color;
      tip.querySelector('.td').textContent = sk.desc;
      tip.querySelector('.tc').textContent = sk.unlocked ? 'UNLOCKED' : 'Cost: ' + sk.cost + ' SP';
      tip.querySelector('.tc').style.color = sk.unlocked ? '#00ffcc' : '#ffd700';
      const cu = canSt(sk);
      tip.querySelector('.te').textContent = cu ? '>> CLICK <<' : (!sk.unlocked && sk.requires.length ? 'Requires: ' + sk.requires.map(r => { const s = stMap.get(r); return s ? (s.unlocked ? '\u2713' : '\u2717') + ' ' + s.name : r; }).join(', ') : '');
      tip.querySelector('.te').style.color = cu ? '#00ff88' : '#ff5577';
    } else tip.style.display = 'none';
  });
  window.addEventListener('mouseup', e => { if (skDrag) { const m = Math.abs(e.clientX - skDX0) + Math.abs(e.clientY - skDY0); if (m < 5 && skHover && canSt(skHover)) doSt(skHover); } skDrag = false; });
  a.addEventListener('wheel', e => { e.preventDefault(); skZ = Math.max(.15, Math.min(2.5, skZ + (e.deltaY > 0 ? -.03 : .03))); }, { passive: false });
})();

/* ============================================================
   GRID VIEW
   ============================================================ */
function openGrid() {
  $('grid-overlay').classList.add('open');
  const hasLucky = activeBuffs && activeBuffs.includes('luckycharm');
  document.querySelectorAll('.grid-card').forEach(c => {
    if (hasLucky) c.classList.add('lucky-active');
    else c.classList.remove('lucky-active');
  });
}
function closeGrid() { $('grid-overlay').classList.remove('open'); }
function pickGame(g) { switchGame(g); closeGrid(); }

/* ============================================================
   BET INPUT
   ============================================================ */
(function () {
  const inp = $('bet-input'); if (!inp) return;
  inp.addEventListener('change', e => {
    const val = parseInt(e.target.value.replace(/[^0-9]/g, ''));
    if (!isNaN(val) && val >= 10) S.bet = Math.min(val, S.cash + S.maxBetBonus);
    else S.bet = 10;
    updUI(); if (S.game === 'dice') updDiceMult();
  });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') e.target.blur(); });
  inp.addEventListener('focus', e => { e.target.select(); });
})();

/* ============================================================
   KEYBOARD
   ============================================================ */
document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    if ($('st-overlay').classList.contains('open')) closeST();
    else if ($('grid-overlay').classList.contains('open')) closeGrid();
    else if ($('graph-overlay').classList.contains('open')) closeGraph();
    else if ($('settings-overlay').classList.contains('open')) closeSettings();
    else if ($('shop-overlay').classList.contains('open')) closeShop();
  }
  if (e.code === 'Space') { e.preventDefault(); if ($('st-overlay').classList.contains('open') || $('go-overlay').classList.contains('open') || $('grid-overlay').classList.contains('open') || $('settings-overlay').classList.contains('open') || $('shop-overlay').classList.contains('open')) return; playAction(); }
});

/* ============================================================
   INIT
   ============================================================ */
(function init() {
  if (!checkDisclaimer()) { $('disclaimer-overlay').style.display = 'flex'; }
  else { $('disclaimer-overlay').style.display = 'none'; }
  $('disclaimer-cb').addEventListener('change', function() { $('disclaimer-enter').disabled = !this.checked; });

  loadGame();
  initPlinko(); initDiceSlider(); animateDiceSlider(); initMinesGrid(); initScratchCanvas(); initRouletteNumbers(); drawRouletteWheel(); initPachinko(); initCrashCanvas(); updLimboBar(); updUI(); plinkoLoop(); pachinkoLoop();
  updMinesInfo(); updDrillsInfo(); updPumpInfo(); updScratchInfo();
  updateShopBuffs();
})();
