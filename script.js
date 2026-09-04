/*
 * script.js
 * Orquesta la partida: selección del puzzle diario, persistencia en
 * localStorage, la lógica de selección/envío de grupos de 4 fichas y la
 * conexión con el tablero de 16 fichas.
 *
 * Además del puzzle diario, gestiona el "modo práctica" (Archivo de
 * puzzles), las estadísticas agregadas, el tema claro/oscuro, el modal de
 * bienvenida y el mensaje de "muy cerca". El modo práctica reutiliza
 * exactamente las mismas funciones de estado de partida que el puzzle
 * diario (setup de ronda, envío de grupo, fin de ronda...), distinguidas
 * por la bandera G.isDaily, para no duplicar lógica.
 */
(function () {
  'use strict';

  const PUZZLES = window.CategoriasDelDiaPuzzles;
  const MAX_MISTAKES = 4;
  const MAX_SELECTED = 4;
  const EPOCH_MS = Date.UTC(2024, 0, 1, 0, 0, 0);
  const SITE_URL = 'https://adrianezd.github.io/categorias-del-dia/';

  const DIFFICULTY_ORDER = ['yellow', 'green', 'blue', 'purple'];
  const DIFFICULTY_LABEL = { yellow: 'Fácil', green: 'Medio', blue: 'Difícil', purple: 'Muy difícil' };
  const DIFFICULTY_EMOJI = { yellow: '🟨', green: '🟩', blue: '🟦', purple: '🟪' };

  const THEME_KEY = 'categoriasdeldia:theme';
  const WELCOME_KEY = 'categoriasdeldia:seenWelcome';
  const STATS_KEY = 'categoriasdeldia:stats';

  // -----------------------------------------------------------------
  // Utilidades de fecha / selección diaria
  // -----------------------------------------------------------------
  function getDayIndex() {
    return Math.floor((Date.now() - EPOCH_MS) / 86400000);
  }
  function getTodayDateKey() {
    return new Date().toISOString().slice(0, 10);
  }
  function getPuzzleOfTheDay() {
    const dayIndex = getDayIndex();
    const i = ((dayIndex % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
    return { puzzle: PUZZLES[i], dayIndex };
  }
  function msUntilNextUTCMidnight() {
    const now = new Date();
    const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0);
    return next - Date.now();
  }
  function formatCountdown(ms) {
    if (ms < 0) ms = 0;
    const totalSec = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }

  // -----------------------------------------------------------------
  // PRNG determinista (mulberry32) para barajar de forma reproducible
  // -----------------------------------------------------------------
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function seededShuffle(array, seed) {
    const rng = mulberry32(seed);
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // -----------------------------------------------------------------
  // Persistencia del progreso diario
  // -----------------------------------------------------------------
  function storageKey(dateKey) { return 'categoriasdeldia:' + dateKey; }
  function loadProgress(dateKey) {
    try {
      const raw = localStorage.getItem(storageKey(dateKey));
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function saveProgress(dateKey, progress) {
    try { localStorage.setItem(storageKey(dateKey), JSON.stringify(progress)); } catch (e) { /* almacenamiento no disponible */ }
  }

  // -----------------------------------------------------------------
  // Estadísticas agregadas (solo puzzle diario, nunca modo práctica)
  // -----------------------------------------------------------------
  function loadStats() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.distribution)) return parsed;
      }
    } catch (e) { /* almacenamiento no disponible */ }
    // distribution index 0..4 = número de errores cometidos en una victoria (0 a MAX_MISTAKES-1), índice 4 = derrota
    return { played: 0, wins: 0, currentStreak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0], lastWinDateKey: null };
  }
  function saveStats(stats) {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch (e) { /* almacenamiento no disponible */ }
  }
  function daysBetweenDateKeys(aKey, bKey) {
    const a = Date.UTC(+aKey.slice(0, 4), +aKey.slice(5, 7) - 1, +aKey.slice(8, 10));
    const b = Date.UTC(+bKey.slice(0, 4), +bKey.slice(5, 7) - 1, +bKey.slice(8, 10));
    return Math.round((b - a) / 86400000);
  }
  function updateStatsOnFinish(success, mistakesUsed) {
    const stats = loadStats();
    const todayKey = getTodayDateKey();
    stats.played++;
    if (success) {
      stats.wins++;
      const idx = Math.min(Math.max(mistakesUsed, 0), MAX_MISTAKES - 1);
      stats.distribution[idx] = (stats.distribution[idx] || 0) + 1;
      if (stats.lastWinDateKey) {
        const diff = daysBetweenDateKeys(stats.lastWinDateKey, todayKey);
        if (diff === 1) stats.currentStreak += 1;
        else if (diff === 0) { /* ya contado hoy: no debería ocurrir en una ronda nueva */ }
        else stats.currentStreak = 1;
      } else {
        stats.currentStreak = 1;
      }
      stats.lastWinDateKey = todayKey;
      if (stats.currentStreak > stats.maxStreak) stats.maxStreak = stats.currentStreak;
    } else {
      stats.distribution[4] = (stats.distribution[4] || 0) + 1;
      stats.currentStreak = 0;
    }
    saveStats(stats);
  }

  // -----------------------------------------------------------------
  // Tema claro / oscuro
  // -----------------------------------------------------------------
  function loadThemePref() {
    try { return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; } catch (e) { return 'light'; }
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    if (dom['btn-theme']) {
      dom['btn-theme'].textContent = theme === 'dark' ? '☀️' : '🌙';
      dom['btn-theme'].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* almacenamiento no disponible */ }
    applyTheme(next);
  }

  // -----------------------------------------------------------------
  // Estado del juego
  // -----------------------------------------------------------------
  const dom = {};
  function cacheDom() {
    [
      'grid', 'puzzle-number', 'mistakes-row', 'status-message',
      'solved-groups', 'btn-deselect', 'btn-shuffle', 'btn-submit', 'result-panel',
      'result-title', 'result-groups', 'btn-share', 'share-feedback', 'share-row',
      'next-puzzle-countdown', 'game-panel', 'header-actions', 'practice-banner',
      'btn-back-daily', 'btn-help', 'btn-stats', 'btn-archive', 'btn-theme',
      'modal-backdrop', 'modal-welcome', 'modal-help', 'modal-stats', 'modal-archive',
      'btn-welcome-close', 'btn-help-close', 'btn-stats-close', 'btn-archive-close',
      'stat-played', 'stat-pct', 'stat-streak', 'stat-best', 'stats-distribution', 'archive-list'
    ].forEach((id) => { dom[id] = document.getElementById(id); });
  }

  const G = {
    puzzle: null,
    isDaily: true,
    dayIndex: 0,
    dateKey: '',
    tileOrder: [], // array de {word, catIndex}
    selected: [], // words seleccionadas actualmente
    solvedCatIndexes: [], // índices de categorías ya resueltas, en orden de resolución
    triedCombos: [], // combos ya probados (arrays de words ordenadas, unidas por '|')
    mistakesUsed: 0,
    solved: false,
    failed: false,
    roundOver: false,
    countdownTimer: null,
    shakeTimer: null
  };

  // -----------------------------------------------------------------
  // Carga de una ronda (compartida entre puzzle diario y modo práctica)
  // -----------------------------------------------------------------
  function loadRound(puzzle, isDaily, meta, restored) {
    if (G.countdownTimer) { clearInterval(G.countdownTimer); G.countdownTimer = null; }

    G.puzzle = puzzle;
    G.isDaily = isDaily;
    G.dayIndex = (meta && typeof meta.dayIndex === 'number') ? meta.dayIndex : 0;
    G.dateKey = (meta && meta.dateKey) ? meta.dateKey : ('practice-' + puzzle.id);
    G.selected = [];
    G.solvedCatIndexes = [];
    G.triedCombos = [];
    G.mistakesUsed = 0;
    G.solved = false;
    G.failed = false;
    G.roundOver = false;

    // Construir orden de fichas: barajado determinista por día (o por id en práctica)
    const flatWords = [];
    puzzle.categories.forEach((cat, ci) => {
      cat.words.forEach((w) => flatWords.push({ word: w, catIndex: ci }));
    });

    if (restored && Array.isArray(restored.tileOrder) && restored.tileOrder.length === 16) {
      G.tileOrder = restored.tileOrder.map((w) => flatWords.find((f) => f.word === w));
      G.solvedCatIndexes = restored.solvedCatIndexes || [];
      G.triedCombos = restored.triedCombos || [];
      G.mistakesUsed = restored.mistakesUsed || 0;
      G.solved = !!restored.solved;
      G.failed = !!restored.failed;
      G.roundOver = G.solved || G.failed;
    } else {
      const seed = isDaily ? (G.dayIndex + 1) * 100003 : (puzzle.id + 1) * 7919;
      G.tileOrder = seededShuffle(flatWords, seed);
    }

    dom['result-panel'].hidden = true;
    dom['next-puzzle-countdown'].textContent = '';
    dom['share-row'].hidden = !isDaily;
    dom['practice-banner'].hidden = isDaily;
    dom['puzzle-number'].textContent = isDaily
      ? 'Categorías del Día #' + (G.dayIndex + 1)
      : 'Modo práctica #' + puzzle.id;

    showStatus('', '');
    renderSolvedGroups();
    renderGrid();
    updateMistakesUI();
    updateSubmitButton();

    if (G.roundOver) {
      finishRound(G.solved, true);
    }
  }

  function setupDaily() {
    const { puzzle, dayIndex } = getPuzzleOfTheDay();
    const dateKey = getTodayDateKey();
    const stored = loadProgress(dateKey);
    const restored = (stored && stored.puzzleId === puzzle.id) ? stored : null;
    loadRound(puzzle, true, { dayIndex, dateKey }, restored);
  }

  function startPractice(puzzleId) {
    const puzzle = PUZZLES.find((p) => p.id === puzzleId);
    if (!puzzle) return;
    loadRound(puzzle, false, null, null);
    dom['game-panel'].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function returnToDaily() {
    setupDaily();
    dom['game-panel'].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // -----------------------------------------------------------------
  // Render de la cuadrícula
  // -----------------------------------------------------------------
  function renderGrid() {
    const grid = dom['grid'];
    grid.innerHTML = '';
    G.tileOrder.forEach((tile) => {
      if (G.solvedCatIndexes.indexOf(tile.catIndex) !== -1) return; // ya resuelta, no se muestra
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tile';
      btn.textContent = tile.word;
      btn.setAttribute('data-word', tile.word);
      if (G.selected.indexOf(tile.word) !== -1) btn.classList.add('selected');
      if (G.roundOver) btn.disabled = true;
      btn.addEventListener('click', () => onTileTap(tile.word));
      grid.appendChild(btn);
    });
  }

  function renderSolvedGroups() {
    const container = dom['solved-groups'];
    container.innerHTML = '';
    // Mostrar en el orden en que se resolvieron (o en orden de dificultad si es restauración fallida)
    G.solvedCatIndexes.forEach((ci) => {
      const cat = G.puzzle.categories[ci];
      const row = document.createElement('div');
      row.className = 'solved-group solved-' + cat.difficulty;
      const h = document.createElement('div');
      h.className = 'solved-group-name';
      h.textContent = cat.name;
      const w = document.createElement('div');
      w.className = 'solved-group-words';
      w.textContent = cat.words.join(' · ');
      row.appendChild(h);
      row.appendChild(w);
      container.appendChild(row);
    });
  }

  // -----------------------------------------------------------------
  // Interacción con las fichas
  // -----------------------------------------------------------------
  function onTileTap(word) {
    if (G.roundOver) return;
    const idx = G.selected.indexOf(word);
    if (idx !== -1) {
      G.selected.splice(idx, 1);
    } else {
      if (G.selected.length >= MAX_SELECTED) return;
      G.selected.push(word);
    }
    renderGrid();
    updateSubmitButton();
  }

  function deselectAll() {
    if (G.roundOver) return;
    G.selected = [];
    renderGrid();
    updateSubmitButton();
  }

  function shuffleGrid() {
    if (G.roundOver) return;
    const remaining = G.tileOrder.filter((t) => G.solvedCatIndexes.indexOf(t.catIndex) === -1);
    const solvedTiles = G.tileOrder.filter((t) => G.solvedCatIndexes.indexOf(t.catIndex) !== -1);
    const shuffled = seededShuffle(remaining, Math.floor(Math.random() * 1e9));
    G.tileOrder = solvedTiles.concat(shuffled);
    renderGrid();
    if (G.isDaily) persist();
  }

  function updateSubmitButton() {
    dom['btn-submit'].disabled = G.selected.length !== MAX_SELECTED || G.roundOver;
    dom['btn-deselect'].disabled = G.selected.length === 0 || G.roundOver;
  }

  function comboKey(words) {
    return words.slice().sort().join('|');
  }

  function submitGuess() {
    if (G.selected.length !== MAX_SELECTED || G.roundOver) return;
    const words = G.selected.slice();
    const key = comboKey(words);
    if (G.triedCombos.indexOf(key) !== -1) {
      showStatus('Ya has probado esa combinación exacta. ¡Prueba otra!', 'warn');
      return;
    }
    G.triedCombos.push(key);

    // Comprobar si todas pertenecen a la misma categoría no resuelta
    const catIndexesOfWords = words.map((w) => {
      const tile = G.tileOrder.find((t) => t.word === w);
      return tile ? tile.catIndex : -1;
    });
    const uniqueCats = Array.from(new Set(catIndexesOfWords));

    if (uniqueCats.length === 1) {
      // ¡Correcto!
      const ci = uniqueCats[0];
      G.solvedCatIndexes.push(ci);
      G.selected = [];
      const cat = G.puzzle.categories[ci];
      showStatus('¡Correcto! "' + cat.name + '"', 'ok');
      renderSolvedGroups();
      renderGrid();
      updateSubmitButton();
      if (G.isDaily) persist();

      if (G.solvedCatIndexes.length === 4) {
        G.solved = true;
        if (G.isDaily) persist();
        finishRound(true, false);
      }
      return;
    }

    // Incorrecto: contar el error
    G.mistakesUsed++;

    // Comprobar "estás cerca": 3 de las 4 pertenecen a la misma categoría
    const counts = {};
    catIndexesOfWords.forEach((c) => { counts[c] = (counts[c] || 0) + 1; });
    const maxCount = Math.max.apply(null, Object.values(counts));

    triggerShake();

    if (maxCount === 3) {
      showStatus('¡Un error, estabas muy cerca!', 'error');
    } else {
      showStatus('Combinación incorrecta. Inténtalo de nuevo.', 'error');
    }

    updateMistakesUI();
    if (G.isDaily) persist();

    if (G.mistakesUsed >= MAX_MISTAKES) {
      G.failed = true;
      if (G.isDaily) persist();
      finishRound(false, false);
    }
  }

  function triggerShake() {
    const grid = dom['grid'];
    grid.classList.remove('shake');
    // Forzar reflow para reiniciar la animación si se repite rápido
    void grid.offsetWidth;
    grid.classList.add('shake');
    if (G.shakeTimer) clearTimeout(G.shakeTimer);
    G.shakeTimer = setTimeout(() => grid.classList.remove('shake'), 420);
  }

  function persist() {
    saveProgress(G.dateKey, {
      puzzleId: G.puzzle.id,
      tileOrder: G.tileOrder.map((t) => t.word),
      solvedCatIndexes: G.solvedCatIndexes,
      triedCombos: G.triedCombos,
      mistakesUsed: G.mistakesUsed,
      solved: G.solved,
      failed: G.failed,
      timestamp: Date.now()
    });
  }

  // -----------------------------------------------------------------
  // Fin de ronda / resultado
  // -----------------------------------------------------------------
  function finishRound(success, isReplay) {
    G.roundOver = true;
    G.selected = [];
    updateSubmitButton();
    renderGrid();

    if (G.isDaily && !isReplay) {
      updateStatsOnFinish(success, G.mistakesUsed);
    }

    // Si falló, revelar las categorías restantes en orden de dificultad
    if (!success) {
      DIFFICULTY_ORDER.forEach((diff) => {
        G.puzzle.categories.forEach((cat, ci) => {
          if (cat.difficulty === diff && G.solvedCatIndexes.indexOf(ci) === -1) {
            G.solvedCatIndexes.push(ci);
          }
        });
      });
      renderSolvedGroups();
      renderGrid();
      // Volver a guardar para que la solución completa persista tras recargar.
      if (G.isDaily && !isReplay) persist();
    }

    if (G.isDaily) {
      if (!isReplay) {
        showStatus(success ? '¡Lo has conseguido! Grupo completo.' : 'Se acabaron los intentos. Aquí tienes la solución.', success ? 'ok' : 'error');
      } else {
        showStatus('Ya jugaste el puzzle de hoy.', '');
      }
      startCountdown();
    } else {
      showStatus(success ? '¡Correcto en modo práctica!' : 'Se acabaron los intentos en modo práctica.', success ? 'ok' : 'error');
      dom['next-puzzle-countdown'].textContent = 'Modo práctica: elige otro puzzle en el Archivo o vuelve al de hoy.';
    }

    renderResultPanel(success);
  }

  function renderResultPanel(success) {
    const p = G.puzzle;
    dom['result-title'].textContent = success ? '¡Resuelto!' : 'Puzzle terminado';
    dom['result-groups'].innerHTML = '';
    DIFFICULTY_ORDER.forEach((diff) => {
      const cat = p.categories.find((c) => c.difficulty === diff);
      if (!cat) return;
      const row = document.createElement('div');
      row.className = 'result-group result-' + diff;
      const h = document.createElement('div');
      h.className = 'result-group-name';
      h.textContent = DIFFICULTY_EMOJI[diff] + ' ' + cat.name;
      const w = document.createElement('div');
      w.className = 'result-group-words';
      w.textContent = cat.words.join(' · ');
      row.appendChild(h);
      row.appendChild(w);
      dom['result-groups'].appendChild(row);
    });
    dom['result-panel'].hidden = false;
  }

  function startCountdown() {
    if (G.countdownTimer) clearInterval(G.countdownTimer);
    function tick() {
      dom['next-puzzle-countdown'].textContent = 'Ya jugaste hoy. Próximo puzzle en ' + formatCountdown(msUntilNextUTCMidnight());
    }
    tick();
    G.countdownTimer = setInterval(tick, 1000);
  }

  // -----------------------------------------------------------------
  // Intentos / errores UI
  // -----------------------------------------------------------------
  function updateMistakesUI() {
    const row = dom['mistakes-row'];
    row.innerHTML = '';
    const label = document.createElement('span');
    label.className = 'mistakes-label';
    label.textContent = 'Errores:';
    row.appendChild(label);
    for (let i = 0; i < MAX_MISTAKES; i++) {
      const dot = document.createElement('span');
      dot.className = 'mistake-dot' + (i < G.mistakesUsed ? ' used' : '');
      row.appendChild(dot);
    }
  }

  function showStatus(msg, kind) {
    dom['status-message'].textContent = msg;
    dom['status-message'].className = kind || '';
  }

  // -----------------------------------------------------------------
  // Compartir (solo puzzle diario)
  // -----------------------------------------------------------------
  function buildShareText() {
    // Reconstruir el orden de intentos a partir de los emojis de dificultad resueltos
    // y una fila 'X' simplificada por cada error. Estilo simple tipo Wordle.
    let lines = [];
    const totalCats = G.puzzle.categories.length;
    // Fila por cada grupo resuelto en orden de resolución (solo los primeros 4 si completó)
    const solvedOrder = G.solved ? G.solvedCatIndexes.slice(0, 4) : G.solvedCatIndexes.filter((ci) => true);
    if (G.solved) {
      solvedOrder.forEach((ci) => {
        lines.push(DIFFICULTY_EMOJI[G.puzzle.categories[ci].difficulty].repeat(4));
      });
    } else {
      lines.push('❌ No completado');
    }
    const label = G.solved ? ('Errores: ' + G.mistakesUsed + '/' + MAX_MISTAKES) : ('X/' + MAX_MISTAKES);
    return 'Categorías del Día #' + (G.dayIndex + 1) + ' — ' + label + '\n' + lines.join('\n') + '\n' + SITE_URL;
  }

  function copyShareText() {
    const text = buildShareText();
    const done = () => { dom['share-feedback'].textContent = '¡Copiado!'; setTimeout(() => { dom['share-feedback'].textContent = ''; }, 2500); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) {
      dom['share-feedback'].textContent = 'No se pudo copiar automáticamente.';
    }
  }

  // -----------------------------------------------------------------
  // Estadísticas: render del modal
  // -----------------------------------------------------------------
  function renderStats() {
    const s = loadStats();
    dom['stat-played'].textContent = String(s.played);
    const pct = s.played ? Math.round((s.wins / s.played) * 100) : 0;
    dom['stat-pct'].textContent = pct + '%';
    dom['stat-streak'].textContent = String(s.currentStreak);
    dom['stat-best'].textContent = String(s.maxStreak);

    const dist = s.distribution || [0, 0, 0, 0, 0];
    const labels = ['0 errores', '1 error', '2 errores', '3 errores', 'No resuelto'];
    const max = Math.max(1, dist[0], dist[1], dist[2], dist[3], dist[4]);
    const container = dom['stats-distribution'];
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const row = document.createElement('div');
      row.className = 'dist-row';
      const label = document.createElement('span');
      label.className = 'dist-label';
      label.textContent = labels[i];
      const track = document.createElement('div');
      track.className = 'dist-bar-track';
      const fill = document.createElement('div');
      fill.className = 'dist-bar-fill';
      fill.style.width = Math.round(((dist[i] || 0) / max) * 100) + '%';
      track.appendChild(fill);
      const count = document.createElement('span');
      count.className = 'dist-count';
      count.textContent = String(dist[i] || 0);
      row.appendChild(label);
      row.appendChild(track);
      row.appendChild(count);
      container.appendChild(row);
    }
  }

  // -----------------------------------------------------------------
  // Archivo de puzzles: render del listado
  // -----------------------------------------------------------------
  function renderArchive() {
    const list = dom['archive-list'];
    list.innerHTML = '';
    PUZZLES.forEach((p) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'archive-item';
      const h3 = document.createElement('h3');
      h3.textContent = 'Puzzle #' + p.id;
      const teaser = document.createElement('p');
      teaser.className = 'archive-teaser';
      teaser.textContent = p.categories.map((c) => c.name).join(' · ');
      btn.appendChild(h3);
      btn.appendChild(teaser);
      btn.addEventListener('click', () => {
        closeModals();
        startPractice(p.id);
      });
      list.appendChild(btn);
    });
  }

  // -----------------------------------------------------------------
  // Modales (bienvenida, ayuda, estadísticas, archivo)
  // -----------------------------------------------------------------
  const MODAL_IDS = ['modal-welcome', 'modal-help', 'modal-stats', 'modal-archive'];
  function openModal(id) {
    dom['modal-backdrop'].hidden = false;
    MODAL_IDS.forEach((key) => { dom[key].hidden = (key !== id); });
    if (id === 'modal-stats') renderStats();
    if (id === 'modal-archive') renderArchive();
  }
  function closeModals() {
    dom['modal-backdrop'].hidden = true;
    MODAL_IDS.forEach((key) => { dom[key].hidden = true; });
  }
  function maybeShowWelcome() {
    let seen = false;
    try { seen = localStorage.getItem(WELCOME_KEY) === '1'; } catch (e) { /* almacenamiento no disponible */ }
    if (!seen) openModal('modal-welcome');
  }
  function dismissWelcome() {
    try { localStorage.setItem(WELCOME_KEY, '1'); } catch (e) { /* almacenamiento no disponible */ }
    closeModals();
  }

  // -----------------------------------------------------------------
  // Wiring
  // -----------------------------------------------------------------
  function wireControls() {
    dom['btn-deselect'].addEventListener('click', deselectAll);
    dom['btn-shuffle'].addEventListener('click', shuffleGrid);
    dom['btn-submit'].addEventListener('click', submitGuess);
    dom['btn-share'].addEventListener('click', copyShareText);

    dom['btn-back-daily'].addEventListener('click', returnToDaily);

    dom['btn-help'].addEventListener('click', () => openModal('modal-help'));
    dom['btn-stats'].addEventListener('click', () => openModal('modal-stats'));
    dom['btn-archive'].addEventListener('click', () => openModal('modal-archive'));
    dom['btn-theme'].addEventListener('click', toggleTheme);

    dom['btn-welcome-close'].addEventListener('click', dismissWelcome);
    dom['btn-help-close'].addEventListener('click', closeModals);
    dom['btn-stats-close'].addEventListener('click', closeModals);
    dom['btn-archive-close'].addEventListener('click', closeModals);

    dom['modal-backdrop'].addEventListener('click', (e) => {
      if (e.target === dom['modal-backdrop']) {
        if (!dom['modal-welcome'].hidden) dismissWelcome();
        else closeModals();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !dom['modal-backdrop'].hidden) {
        if (!dom['modal-welcome'].hidden) dismissWelcome();
        else closeModals();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    cacheDom();
    applyTheme(loadThemePref());
    wireControls();

    setupDaily();
    maybeShowWelcome();
  });
})();
