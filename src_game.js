// Game logic & rendering
window.gameState = {};

window.startGame = function(playerCount, lang) {
  const t = window.i18n[lang];
  window.gameState = {
    playerCount,
    lang,
    players: Array.from({length: playerCount}, (_, i) => ({
      life: playerCount === 2 ? 30 : 60,
      atk: 0,
      def: 0,
      block: 0,
      blockLeft: 0,
      blockRight: 0,
      ready: false,
      defeated: false
    })),
    round: 1
  };
  renderGrid();
};

function renderGrid() {
  const { playerCount, players, lang } = window.gameState;
  const t = window.i18n[lang];
  const grid = document.getElementById('playerGrid');
  grid.innerHTML = '';

  // Layout grid class
  let gridClass = '';
  if (playerCount === 2) gridClass = 'grid-cols-1 grid-rows-2';
  else if (playerCount === 3) gridClass = 'grid-cols-2 grid-rows-2';
  else if (playerCount === 4) gridClass = 'grid-cols-2 grid-rows-2';
  else if (playerCount === 5) gridClass = 'grid-cols-3 grid-rows-2';
  else if (playerCount === 6) gridClass = 'grid-cols-3 grid-rows-2';
  grid.className = `flex-1 grid gap-4 p-4 ${gridClass}`;

  // Layout logic
  let cardOrder = [];
  if (playerCount === 2) cardOrder = [0,1];
  else if (playerCount === 3) cardOrder = [0,1,2];
  else if (playerCount === 4) cardOrder = [0,1,2,3];
  else if (playerCount === 5) cardOrder = [0,1,2,3,4];
  else if (playerCount === 6) cardOrder = [0,1,2,3,4,5];

  cardOrder.forEach((idx, i) => {
    const p = players[idx];
    const rotate180 = (
      (playerCount === 2 && i === 0) ||
      (playerCount === 3 && i < 2) ||
      (playerCount === 4 && i < 2) ||
      (playerCount === 5 && i < 3) ||
      (playerCount === 6 && i < 3)
    );

    // Card
    const card = document.createElement('div');
    card.className = `relative rounded-xl bg-gray-800 shadow-lg flex flex-col items-center justify-center p-4 transition-opacity ${p.defeated ? 'opacity-50' : ''}`;
    if (rotate180) card.style.transform = 'rotate(180deg)';

    // Overlay defeated
    if (p.defeated) {
      const overlay = document.createElement('div');
      overlay.className = 'absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-xl z-10';
      overlay.innerHTML = `<span class="text-3xl font-bold text-red-500">${t.defeated}</span>`;
      card.appendChild(overlay);
    }

    // Life Counter
    const lifeDiv = document.createElement('div');
    lifeDiv.className = 'flex flex-col items-center mb-2';
    lifeDiv.innerHTML = `
      <span class="text-lg">${lang==='th'?'ผู้เล่นที่':''} ${idx+1}</span>
      <span class="text-5xl font-bold">${p.life}</span>
      <div class="flex gap-2 mt-1">
        <button class="lifeBtn bg-green-600 px-2 py-1 rounded text-lg" data-p="${idx}" data-d="1" ${p.ready||p.defeated?'disabled':''}>+</button>
        <button class="lifeBtn bg-red-600 px-2 py-1 rounded text-lg" data-p="${idx}" data-d="-1" ${p.ready||p.defeated?'disabled':''}>-</button>
      </div>
    `;
    card.appendChild(lifeDiv);

    // ATK, DEF, Block
    ['atk','def'].forEach(stat=>{
      const statDiv = document.createElement('div');
      statDiv.className = 'flex items-center gap-2 mb-1';
      statDiv.innerHTML = `
        <span class="font-bold">${t[stat]}</span>
        <button class="${stat}Btn bg-blue-600 px-2 rounded text-lg" data-p="${idx}" data-d="1" ${p.ready||p.defeated?'disabled':''}>+</button>
        <span class="w-8 text-center">${p[stat]}</span>
        <button class="${stat}Btn bg-blue-600 px-2 rounded text-lg" data-p="${idx}" data-d="-1" ${p.ready||p.defeated?'disabled':''}>-</button>
      `;
      card.appendChild(statDiv);
    });

    // Block
    if (playerCount === 2 || (playerCount > 2 && window.gameState.players.filter(pl => !pl.defeated).length === 2)) {
      // Block (กลาง)
      const blockDiv = document.createElement('div');
      blockDiv.className = 'flex items-center gap-2 mb-1';
      blockDiv.innerHTML = `
        <span class="font-bold">${t.block}</span>
        <button class="blockBtn bg-yellow-600 px-2 rounded text-lg" data-p="${idx}" data-d="1" ${p.ready||p.defeated?'disabled':''}>+</button>
        <span class="w-8 text-center">${p.block}</span>
        <button class="blockBtn bg-yellow-600 px-2 rounded text-lg" data-p="${idx}" data-d="-1" ${p.ready||p.defeated?'disabled':''}>-</button>
      `;
      card.appendChild(blockDiv);
    } else {
      // Block ซ้าย/ขวา
      ['blockLeft','blockRight'].forEach((blockName,j)=>{
        const colorIdx = (j===0)
          ? ((idx-1+playerCount)%playerCount)
          : ((idx+1)%playerCount);
        const blockDiv = document.createElement('div');
        blockDiv.className = 'flex items-center gap-2 mb-1';
        blockDiv.innerHTML = `
          <span class="font-bold">${t[blockName]}</span>
          <span class="inline-block w-5 h-5 rounded-full border-4 border-white mr-1" style="background:${playerColor(colorIdx)}"></span>
          <button class="block${j===0?'Left':'Right'}Btn bg-yellow-600 px-2 rounded text-lg" data-p="${idx}" data-d="1" ${p.ready||p.defeated?'disabled':''}>+</button>
          <span class="w-8 text-center">${p[blockName]}</span>
          <button class="block${j===0?'Left':'Right'}Btn bg-yellow-600 px-2 rounded text-lg" data-p="${idx}" data-d="-1" ${p.ready||p.defeated?'disabled':''}>-</button>
        `;
        card.appendChild(blockDiv);
      });
    }

    // Ready button
    const readyBtn = document.createElement('button');
    readyBtn.className = `readyBtn mt-2 px-4 py-2 rounded font-bold ${p.ready?'bg-gray-500':'bg-green-700 hover:bg-green-800'} ${p.defeated?'opacity-50':'opacity-100'}`;
    readyBtn.textContent = t.ready;
    readyBtn.disabled = p.ready || p.defeated;
    readyBtn.dataset.p = idx;
    card.appendChild(readyBtn);

    grid.appendChild(card);
  });

  bindControls();
}

function playerColor(idx) {
  // 6 distinct colors
  return ['#f87171','#fbbf24','#34d399','#60a5fa','#a78bfa','#f472b6'][idx%6];
}

function bindControls() {
  const { players } = window.gameState;
  document.querySelectorAll('.lifeBtn').forEach(btn=>{
    btn.onclick = e => {
      const i = +btn.dataset.p, d = +btn.dataset.d;
      players[i].life += d;
      renderGrid();
    };
  });
  document.querySelectorAll('.atkBtn').forEach(btn=>{
    btn.onclick = e => {
      const i = +btn.dataset.p, d = +btn.dataset.d;
      players[i].atk = Math.max(0, players[i].atk + d);
      renderGrid();
    };
  });
  document.querySelectorAll('.defBtn').forEach(btn=>{
    btn.onclick = e => {
      const i = +btn.dataset.p, d = +btn.dataset.d;
      players[i].def = Math.max(0, players[i].def + d);
      renderGrid();
    };
  });
  document.querySelectorAll('.blockBtn').forEach(btn=>{
    btn.onclick = e => {
      const i = +btn.dataset.p, d = +btn.dataset.d;
      players[i].block = Math.max(0, players[i].block + d);
      renderGrid();
    };
  });
  document.querySelectorAll('.blockLeftBtn').forEach(btn=>{
    btn.onclick = e => {
      const i = +btn.dataset.p, d = +btn.dataset.d;
      players[i].blockLeft = Math.max(0, players[i].blockLeft + d);
      renderGrid();
    };
  });
  document.querySelectorAll('.blockRightBtn').forEach(btn=>{
    btn.onclick = e => {
      const i = +btn.dataset.p, d = +btn.dataset.d;
      players[i].blockRight = Math.max(0, players[i].blockRight + d);
      renderGrid();
    };
  });
  document.querySelectorAll('.readyBtn').forEach(btn=>{
    btn.onclick = e => {
      const i = +btn.dataset.p;
      players[i].ready = true;
      renderGrid();
      // Check all ready
      if (players.filter((p,idx)=>!p.defeated).every(p=>p.ready)) {
        setTimeout(resolveRound, 600);
      }
    };
  });
}

function resolveRound() {
  const { playerCount, players, lang } = window.gameState;
  const t = window.i18n[lang];
  const alive = players.map((p, i) => ({...p, idx: i})).filter(p=>!p.defeated);

  if (alive.length === 2) {
    // 2-player logic
    let [a, b] = alive;
    let dA = Math.max(0, b.atk - a.block - a.def);
    let dB = Math.max(0, a.atk - b.block - b.def);
    players[a.idx].life -= dA;
    players[b.idx].life -= dB;
  } else {
    // 3+ logic (each gets attacked by left and right)
    alive.forEach((p, k, arr) => {
      const left = arr[(k-1+arr.length)%arr.length];
      const right = arr[(k+1)%arr.length];
      let dmgFromLeft = Math.max(0, left.atk - p.blockRight);
      let dmgFromRight = Math.max(0, right.atk - p.blockLeft);
      let total = dmgFromLeft + dmgFromRight - p.def;
      players[p.idx].life -= Math.max(0, total);
    });
  }

  // Check defeated
  players.forEach(p=>{
    if (!p.defeated && p.life<=0) p.defeated = true;
    // Reset stats
    p.atk = 0;
    p.def = 0;
    p.block = 0;
    p.blockLeft = 0;
    p.blockRight = 0;
    p.ready = false;
  });

  const remaining = players.filter(p=>!p.defeated);
  if (remaining.length === 1) {
    // Game Over
    document.getElementById('winnerText').textContent = t.winner(players.indexOf(remaining[0])+1);
    document.getElementById('gameOverModal').classList.remove('hidden');
  }
  renderGrid();
}