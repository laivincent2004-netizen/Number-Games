const translations = {
  en: {
    appName: 'Number Games',
    language: 'Language',
    background: 'Background',
    history: 'History',
    chooseGame: 'Choose a Game',
    game24: '24 Game',
    sudoku: 'Sudoku',
    game2048: '2048',
    minesweeper: 'Minesweeper',
    crossmath: 'Crossmath',
    fillBlocks: 'Fill Blocks',
    selectMode24: 'Select a mode to begin.',
    modeTen: 'Numbers within 10',
    modeCards: 'Cards A-K',
    back: 'Back',
    exit: 'Exit',
    timer: 'Timer',
    undo: 'Undo',
    clear: 'Clear',
    submit: 'Submit',
    selectDifficulty: 'Select difficulty.',
    easy: 'Easy',
    normal: 'Normal',
    hard: 'Hard',
    inferno: 'Inferno',
    hints: 'Hints',
    noteMode: 'Note Mode',
    erase: 'Erase',
    hint: 'Hint',
    hintUsed: 'Hint used',
    solved: 'Solved!',
    incorrect: 'Try again.',
    missingCards: 'Use all cards exactly once.',
    invalidExpression: 'Invalid expression.',
    paused: 'Paused',
    resumed: 'Resumed',
    pause: 'Pause',
    resume: 'Resume',
    minesExploded: 'Boom! Try again.',
    minesCleared: 'You cleared the field!',
    selectCell: 'Select a cell first.',
    noteOn: 'Note mode on',
    noteOff: 'Note mode off',
    historyEmpty: 'No history yet.',
    recordsTitle: 'Saved Records',
    hintUnavailable: 'No hints remaining.',
    score: 'Score',
    best: 'Best',
    restart: 'Restart',
    game2048Hint: 'Use swipe or arrow keys to move tiles.',
    game2048Win: '2048 tile achieved!',
    game2048Over: 'No more moves.',
    newPuzzle: 'New Puzzle',
    crossmathInstructions: 'Place digits 1-9 so each row and column equation is true.',
    check: 'Check',
    row: 'Row',
    column: 'Column',
    duplicateDigits: 'Use digits 1-9 without repeats.',
    crossmathSolved: 'Equations solved!',
    crossmathError: 'Something is off.',
    fillBlocksInstructions: 'Use the clues to shade the correct squares.',
    fillModeFill: 'Fill',
    fillModeMark: 'Mark Blank',
    clearMarks: 'Clear Marks',
    fillBlocksSolved: 'Puzzle complete!',
    fillBlocksMistake: 'There are mistakes.',
    fillBlocksProgress: 'Keep going!',
    selectFillBlocksDifficulty: 'Select grid size.',
    bestScore: 'Best score',
    completedIn: 'Completed in',
    gridSize: 'Grid',
    game2048NewBest: 'New best score!',
    incomplete: 'Fill every cell first.',
  },
  zh: {
    appName: 'Number Games',
    language: '语言',
    background: '背景色',
    history: '历史记录',
    chooseGame: '选择游戏',
    game24: '算24点',
    sudoku: '数独',
    game2048: '2048',
    minesweeper: '扫雷',
    crossmath: 'Crossmath',
    fillBlocks: '填方块',
    selectMode24: '请选择模式开始游戏。',
    modeTen: '10以内数字',
    modeCards: '扑克牌A-K',
    back: '返回',
    exit: '退出',
    timer: '计时',
    undo: '撤销',
    clear: '清空',
    submit: '提交',
    selectDifficulty: '请选择难度。',
    easy: '简单',
    normal: '正常',
    hard: '困难',
    inferno: '地狱',
    hints: '提示',
    noteMode: '记笔记',
    erase: '擦除',
    hint: '提示',
    hintUsed: '已使用提示',
    solved: '完成！',
    incorrect: '再试一次。',
    missingCards: '必须恰好使用全部四张牌。',
    invalidExpression: '表达式不合法。',
    paused: '已暂停',
    resumed: '继续游戏',
    pause: '暂停',
    resume: '继续',
    minesExploded: '踩雷了，重来吧。',
    minesCleared: '扫雷成功！',
    selectCell: '请先选择一个格子。',
    noteOn: '笔记模式开启',
    noteOff: '笔记模式关闭',
    historyEmpty: '暂无记录。',
    recordsTitle: '保存的记录',
    hintUnavailable: '没有提示了。',
    score: '得分',
    best: '最佳',
    restart: '重新开始',
    game2048Hint: '滑动或使用方向键移动方块。',
    game2048Win: '达成2048！',
    game2048Over: '没有可用的移动了。',
    newPuzzle: '新谜题',
    crossmathInstructions: '将1-9填入使每行每列的等式成立。',
    check: '检查',
    row: '行',
    column: '列',
    duplicateDigits: '数字1-9不能重复使用。',
    crossmathSolved: '全部等式成立！',
    crossmathError: '还有错误。',
    fillBlocksInstructions: '根据提示给方格上色。',
    fillModeFill: '填色',
    fillModeMark: '标空',
    clearMarks: '清除标记',
    fillBlocksSolved: '谜题完成！',
    fillBlocksMistake: '还有错误。',
    fillBlocksProgress: '继续加油！',
    selectFillBlocksDifficulty: '请选择网格大小。',
    bestScore: '最佳成绩',
    completedIn: '完成用时',
    gridSize: '网格',
    game2048NewBest: '刷新最佳成绩！',
    incomplete: '请先填满所有格子。',
  },
};

const storageKey = 'numberGamesHistory';

const historyStore = {
  read() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  push(entry) {
    const list = this.read();
    const id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;
    list.unshift({ ...entry, id, date: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(list.slice(0, 100)));
  },
};

class Timer {
  constructor(onTick) {
    this.onTick = onTick;
    this.elapsed = 0;
    this.running = false;
    this._last = 0;
    this._frame = null;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this._last = performance.now();
    const loop = (now) => {
      if (!this.running) return;
      this.elapsed += now - this._last;
      this._last = now;
      this.onTick(this.elapsed);
      this._frame = requestAnimationFrame(loop);
    };
    this._frame = requestAnimationFrame(loop);
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    cancelAnimationFrame(this._frame);
    this._frame = null;
  }

  reset() {
    this.pause();
    this.elapsed = 0;
    this.onTick(this.elapsed);
  }

  getSeconds() {
    return Math.floor(this.elapsed / 1000);
  }
}

const state = {
  language: localStorage.getItem('numberGamesLang') || 'zh',
  background: localStorage.getItem('numberGamesBg') || '#f5f1e8',
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const themePresets = {
  '#f5f1e8': {
    text: '#3f5468',
    accent: '#3e6c8f',
    panel: 'rgba(255,255,255,0.88)',
    border: 'rgba(62,108,143,0.25)',
    card: 'rgba(255,255,255,0.75)',
    muted: '#6e8094',
  },
  '#dde7f0': {
    text: '#2b3f52',
    accent: '#2f5d8c',
    panel: 'rgba(255,255,255,0.92)',
    border: 'rgba(47,93,140,0.25)',
    card: 'rgba(255,255,255,0.8)',
    muted: '#617288',
  },
  '#e9f5f5': {
    text: '#2c4a52',
    accent: '#2f7c8a',
    panel: 'rgba(255,255,255,0.9)',
    border: 'rgba(47,124,138,0.22)',
    card: 'rgba(255,255,255,0.78)',
    muted: '#5f7a7f',
  },
  '#143642': {
    text: '#f1f5f9',
    accent: '#7cd1ff',
    panel: 'rgba(14,40,50,0.92)',
    border: 'rgba(124,209,255,0.28)',
    card: 'rgba(20,54,66,0.88)',
    muted: '#9cb9c6',
  },
  '#1f2833': {
    text: '#f5f5f5',
    accent: '#66fcf1',
    panel: 'rgba(31,40,51,0.92)',
    border: 'rgba(102,252,241,0.24)',
    card: 'rgba(43,54,70,0.88)',
    muted: '#9daab9',
  },
};

const fillBlockPresets = {
  10: [
    [
      '0011111100',
      '0111111110',
      '1111111111',
      '1110011111',
      '1110011111',
      '1111111111',
      '0111111110',
      '0011111100',
      '0001100000',
      '0001100000',
    ],
    [
      '0001100000',
      '0011110000',
      '0111111000',
      '1111111100',
      '0111111000',
      '0011110000',
      '0001100000',
      '0010010000',
      '0100001000',
      '1110001110',
    ],
  ],
  15: [
    [
      '000001111100000',
      '000111111111000',
      '001111111111100',
      '011111111111110',
      '011111001111110',
      '111110000011111',
      '111100000001111',
      '111100000001111',
      '111110000011111',
      '011111001111110',
      '011111111111110',
      '001111111111100',
      '000111111111000',
      '000001111100000',
      '000000111000000',
    ],
    [
      '111000000000111',
      '111100000001111',
      '011110000011110',
      '001111000111100',
      '000111101111000',
      '000011111110000',
      '000001111100000',
      '000011111110000',
      '000111101111000',
      '001111000111100',
      '011110000011110',
      '111100000001111',
      '111000000000111',
      '110000000000011',
      '100000000000001',
    ],
  ],
  20: [
    [
      '00000011111000000000',
      '00001111111100000000',
      '00011111111110000000',
      '00111111111111000000',
      '00111110011111000000',
      '01111100001111100000',
      '01111000000111100000',
      '11110000000011110000',
      '11110000000011110000',
      '11110011110011110000',
      '11110011110011110000',
      '11110000000011110000',
      '11110000000011110000',
      '01111000000111100000',
      '01111100001111100000',
      '00111110011111000000',
      '00111111111111000000',
      '00011111111110000000',
      '00001111111100000000',
      '00000011111000000000',
    ],
    [
      '11000000000000000011',
      '11110000000000001111',
      '01111000000000011110',
      '00111100000000111100',
      '00011110000001111000',
      '00001111000011110000',
      '00000111100111100000',
      '00000011111111000000',
      '00000001111110000000',
      '00000011111111000000',
      '00000111100111100000',
      '00001111000011110000',
      '00011110000001111000',
      '00111100000000111100',
      '01111000000000011110',
      '11110000000000001111',
      '11000000000000000011',
      '10000000000000000001',
      '11000000000000000011',
      '11100000000000000111',
    ],
  ],
};

const app = {
  init() {
    this.templates = new Map();
    $$('template').forEach((tpl) => this.templates.set(tpl.id, tpl));
    this.viewContainer = $('#viewContainer');
    this.menuButton = $('#menuButton');
    this.menuPanel = $('#menuPanel');
    this.languageSelect = $('#languageSelect');
    this.historyModal = $('#historyModal');
    this.historyList = $('#historyList');
    this.historyClose = $('#historyClose');
    this.registerEvents();
    this.applyLanguage(state.language);
    this.applyBackground(state.background);
    this.showView('homeTemplate');
  },

  registerEvents() {
    document.body.addEventListener('click', (e) => {
      if (e.target === this.menuButton) {
        this.menuPanel.classList.toggle('open');
      } else if (!this.menuPanel.contains(e.target)) {
        this.menuPanel.classList.remove('open');
      }
    });

    this.languageSelect.addEventListener('change', (e) => {
      this.applyLanguage(e.target.value);
      localStorage.setItem('numberGamesLang', state.language);
      this.refreshTexts();
    });

    $$('.color-swatch').forEach((btn) => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        this.applyBackground(color);
        localStorage.setItem('numberGamesBg', color);
        $$('.color-swatch').forEach((sw) => sw.classList.toggle('active', sw === btn));
      });
    });

    $('#historyButton').addEventListener('click', () => {
      this.renderHistory();
      this.historyModal.classList.remove('hidden');
    });

    this.historyClose.addEventListener('click', () => {
      this.historyModal.classList.add('hidden');
    });

    this.historyModal.addEventListener('click', (e) => {
      if (e.target === this.historyModal) {
        this.historyModal.classList.add('hidden');
      }
    });
  },

  applyLanguage(lang) {
    state.language = translations[lang] ? lang : 'en';
    this.languageSelect.value = state.language;
  },

  applyBackground(color) {
    state.background = color;
    const theme = themePresets[color] || themePresets['#f5f1e8'];
    document.body.style.setProperty('--bg-color', color);
    document.body.style.setProperty('--text-color', theme.text);
    document.body.style.setProperty('--accent-color', theme.accent);
    document.body.style.setProperty('--panel-bg', theme.panel);
    document.body.style.setProperty('--border-color', theme.border);
    document.body.style.setProperty('--card-bg', theme.card);
    document.body.style.setProperty('--muted-text', theme.muted);
    $$('.color-swatch').forEach((sw) => {
      sw.classList.toggle('active', sw.dataset.color === color);
    });
  },

  t(key) {
    const langPack = translations[state.language] || translations.en;
    return langPack[key] || key;
  },

  refreshTexts() {
    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = this.t(key);
    });
  },

  showView(templateId, context = {}) {
    const tpl = this.templates.get(templateId);
    if (!tpl) return;
    const node = tpl.content.cloneNode(true);
    this.viewContainer.innerHTML = '';
    this.viewContainer.appendChild(node);
    this.refreshTexts();
    this.attachHandlers(templateId, context);
  },

  attachHandlers(templateId, context) {
    switch (templateId) {
      case 'homeTemplate':
        $$('.game-card', this.viewContainer).forEach((btn) => {
          btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            if (view === 'twentyFour') this.showView('twentyFourSelectTemplate');
            if (view === 'sudoku') this.showView('sudokuSelectTemplate');
            if (view === 'game2048') this.start2048();
            if (view === 'minesweeper') this.showView('minesweeperSelectTemplate');
            if (view === 'crossmath') this.startCrossmath();
            if (view === 'fillBlocks') this.showView('fillBlocksSelectTemplate');
          });
        });
        break;
      case 'twentyFourSelectTemplate':
        $$('button[data-mode]', this.viewContainer).forEach((btn) => {
          btn.addEventListener('click', () => {
            this.startTwentyFour(btn.dataset.mode);
          });
        });
        $('button[data-action="back"]', this.viewContainer).addEventListener('click', () => {
          this.showView('homeTemplate');
        });
        break;
      case 'sudokuSelectTemplate':
        $$('button[data-difficulty]', this.viewContainer).forEach((btn) => {
          btn.addEventListener('click', () => this.startSudoku(btn.dataset.difficulty));
        });
        $('button[data-action="back"]', this.viewContainer).addEventListener('click', () => {
          this.showView('homeTemplate');
        });
        break;
      case 'minesweeperSelectTemplate':
        $$('button[data-difficulty]', this.viewContainer).forEach((btn) => {
          btn.addEventListener('click', () => this.startMinesweeper(btn.dataset.difficulty));
        });
        $('button[data-action="back"]', this.viewContainer).addEventListener('click', () => {
          this.showView('homeTemplate');
        });
        break;
      case 'twentyFourGameTemplate':
        this.bindTwentyFourHandlers(context);
        break;
      case 'sudokuGameTemplate':
        this.bindSudokuHandlers(context);
        break;
      case 'minesweeperGameTemplate':
        this.bindMinesweeperHandlers(context);
        break;
      case 'game2048Template':
        this.bind2048Handlers();
        break;
      case 'crossmathTemplate':
        this.bindCrossmathHandlers(context);
        break;
      case 'fillBlocksSelectTemplate':
        $$('button[data-size]', this.viewContainer).forEach((btn) => {
          btn.addEventListener('click', () => this.startFillBlocks(parseInt(btn.dataset.size, 10)));
        });
        $('button[data-action="back"]', this.viewContainer).addEventListener('click', () => {
          this.showView('homeTemplate');
        });
        break;
      case 'fillBlocksGameTemplate':
        this.bindFillBlocksHandlers(context);
        break;
      default:
        break;
    }
  },

  renderHistory() {
    const entries = historyStore.read();
    this.historyList.innerHTML = '';
    if (!entries.length) {
      const empty = document.createElement('div');
      empty.textContent = this.t('historyEmpty');
      this.historyList.appendChild(empty);
      return;
    }
    entries.forEach((entry) => {
      const item = document.createElement('div');
      item.className = 'history-item';
      const date = new Date(entry.date).toLocaleString();
      item.innerHTML = `<strong>${entry.game}</strong><br>${entry.detail}<br><small>${date}</small>`;
      this.historyList.appendChild(item);
    });
  },

  formatTime(ms) {
    const total = Math.floor(ms / 1000);
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${m}:${s}`;
  },

  // 24 Game implementation
  startTwentyFour(mode) {
    const context = { mode };
    this.showView('twentyFourGameTemplate', context);
  },

  bindTwentyFourHandlers({ mode }) {
    const cardsContainer = $('[data-role="cards"]', this.viewContainer);
    const numbersRow = $('[data-role="numbers"]', this.viewContainer);
    const exprDisplay = $('[data-role="expression"]', this.viewContainer);
    const message = $('[data-role="message"]', this.viewContainer);
    const timerEl = $('[data-role="timer"]', this.viewContainer);

    const timer = new Timer((elapsed) => {
      timerEl.textContent = this.formatTime(elapsed);
    });

    const deck = this.generateTwentyFourCards(mode);
    const counts = {};
    const tokens = [];

    timer.start();

    const renderCards = () => {
      cardsContainer.innerHTML = '';
      deck.forEach((card) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.textContent = card.label;
        cardsContainer.appendChild(div);
      });
    };

    const renderNumberButtons = () => {
      numbersRow.innerHTML = '';
      deck.forEach((card, index) => {
        const btn = document.createElement('button');
        btn.textContent = card.label;
        btn.dataset.index = index;
        btn.addEventListener('click', () => {
          const used = counts[index] || 0;
          if (used >= card.count) return;
          counts[index] = used + 1;
          tokens.push({ type: 'number', value: card.value, display: card.label, index });
          updateExpression();
        });
        numbersRow.appendChild(btn);
      });
    };

    const updateExpression = () => {
      exprDisplay.textContent = tokens.map((token) => token.display ?? token.value).join(' ');
    };

    $$('.operators button', this.viewContainer).forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        const display = value === '*' ? '×' : value === '/' ? '÷' : value;
        tokens.push({ type: 'operator', value, display });
        updateExpression();
      });
    });

    const undoBtn = $('button[data-action="undo"]', this.viewContainer);
    undoBtn.addEventListener('click', () => {
      const removed = tokens.pop();
      if (!removed) return;
      if (removed.type === 'number') {
        counts[removed.index] = Math.max(0, (counts[removed.index] || 0) - 1);
      }
      updateExpression();
    });

    $('button[data-action="clear"]', this.viewContainer).addEventListener('click', () => {
      tokens.length = 0;
      Object.keys(counts).forEach((k) => (counts[k] = 0));
      updateExpression();
    });

    $('button[data-action="submit"]', this.viewContainer).addEventListener('click', () => {
      const result = this.evaluateTwentyFour(tokens, deck);
      message.textContent = this.t(result.messageKey);
      if (result.success) {
        timer.pause();
        historyStore.push({
          game: this.t('game24'),
          detail: `${this.t('timer')}: ${timerEl.textContent}`,
        });
      }
    });

    $('button[data-action="exit"]', this.viewContainer).addEventListener('click', () => {
      timer.pause();
      this.showView('homeTemplate');
    });

    renderCards();
    renderNumberButtons();
  },

  generateTwentyFourCards(mode) {
    const cards = [];
    if (mode === 'cards') {
      const labels = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      for (let i = 0; i < 4; i++) {
        const idx = Math.floor(Math.random() * labels.length);
        const label = labels[idx];
        const value = idx + 1;
        cards.push({ label, value, count: 1, id: i });
      }
    } else {
      for (let i = 0; i < 4; i++) {
        const value = Math.floor(Math.random() * 10) + 1;
        cards.push({ label: String(value), value, count: 1, id: i });
      }
    }
    return cards;
  },

  evaluateTwentyFour(tokens, deck) {
    if (!tokens.length) return { success: false, messageKey: 'invalidExpression' };
    const numbersUsed = deck.map(() => 0);
    let expression = '';
    for (const token of tokens) {
      if (token.type === 'number') {
        numbersUsed[token.index] += 1;
        expression += token.value;
      } else if (token.type === 'operator') {
        expression += token.value;
      }
    }
    const allUsed = numbersUsed.every((used, idx) => used === deck[idx].count);
    if (!allUsed) {
      return { success: false, messageKey: 'missingCards' };
    }
    try {
      const value = Function(`"use strict"; return (${expression});`)();
      if (Math.abs(value - 24) < 1e-6) {
        return { success: true, messageKey: 'solved' };
      }
      return { success: false, messageKey: 'incorrect' };
    } catch (err) {
      return { success: false, messageKey: 'invalidExpression' };
    }
  },

  // Sudoku implementation
  startSudoku(difficulty) {
    const { puzzle, solution } = this.generateSudoku(difficulty);
    const context = { difficulty, puzzle, solution };
    this.showView('sudokuGameTemplate', context);
  },

  bindSudokuHandlers({ difficulty, puzzle, solution }) {
    const gridEl = $('[data-role="grid"]', this.viewContainer);
    const message = $('[data-role="message"]', this.viewContainer);
    const timerEl = $('[data-role="timer"]', this.viewContainer);
    const hintsEl = $('[data-role="hints"]', this.viewContainer);
    const noteBtn = $('button[data-action="note"]', this.viewContainer);

    let noteMode = false;
    let remainingHints = 3;
    let selectedCell = null;

    hintsEl.textContent = String(remainingHints);

    const timer = new Timer((elapsed) => {
      timerEl.textContent = this.formatTime(elapsed);
    });
    timer.start();

    const cells = [];

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const value = puzzle[r][c];
        const div = document.createElement('div');
        div.className = 'sudoku-cell';
        div.dataset.row = r;
        div.dataset.col = c;
        if (value !== 0) {
          div.textContent = value;
          div.classList.add('fixed');
        }
        gridEl.appendChild(div);
        const cell = { row: r, col: c, value, fixed: value !== 0, notes: new Set(), element: div };
        cells.push(cell);
      }
    }

    const selectCell = (cell) => {
      if (cell.fixed) return;
      if (selectedCell) selectedCell.element.classList.remove('selected');
      selectedCell = cell;
      selectedCell.element.classList.add('selected');
    };

    cells.forEach((cell) => {
      cell.element.addEventListener('click', () => selectCell(cell));
    });

    const updateCellView = (cell) => {
      if (cell.value) {
        cell.element.textContent = cell.value;
        cell.element.classList.remove('notes');
      } else if (cell.notes.size) {
        const wrapper = document.createElement('div');
        wrapper.className = 'notes';
        for (let i = 1; i <= 9; i++) {
          const span = document.createElement('span');
          span.textContent = cell.notes.has(i) ? i : '';
          wrapper.appendChild(span);
        }
        cell.element.innerHTML = '';
        cell.element.appendChild(wrapper);
      } else {
        cell.element.textContent = '';
        cell.element.innerHTML = '';
      }
    };

    const checkSolved = () => {
      for (const cell of cells) {
        if (cell.value === 0) return false;
        if (cell.value !== solution[cell.row][cell.col]) return false;
      }
      return true;
    };

    const finish = () => {
      timer.pause();
      message.textContent = this.t('solved');
      historyStore.push({
        game: this.t('sudoku'),
        detail: `${this.t('timer')}: ${timerEl.textContent} · ${this.t(difficulty)}`,
      });
    };

    const placeNumber = (number) => {
      if (!selectedCell) {
        message.textContent = this.t('selectCell');
        return;
      }
      if (selectedCell.fixed) return;
      if (noteMode) {
        if (selectedCell.notes.has(number)) selectedCell.notes.delete(number);
        else selectedCell.notes.add(number);
        updateCellView(selectedCell);
        return;
      }
      selectedCell.value = number;
      selectedCell.notes.clear();
      updateCellView(selectedCell);
      if (checkSolved()) finish();
    };

    const erase = () => {
      if (!selectedCell || selectedCell.fixed) return;
      selectedCell.value = 0;
      selectedCell.notes.clear();
      updateCellView(selectedCell);
    };

    const useHint = () => {
      if (remainingHints <= 0) {
        message.textContent = this.t('hintUnavailable');
        return;
      }
      if (!selectedCell || selectedCell.fixed) {
        const target = cells.find((c) => !c.fixed && c.value === 0);
        if (!target) return;
        selectCell(target);
      }
      selectedCell.value = solution[selectedCell.row][selectedCell.col];
      selectedCell.notes.clear();
      updateCellView(selectedCell);
      remainingHints -= 1;
      hintsEl.textContent = String(remainingHints);
      message.textContent = this.t('hintUsed');
      if (checkSolved()) finish();
    };

    noteBtn.addEventListener('click', () => {
      noteMode = !noteMode;
      message.textContent = noteMode ? this.t('noteOn') : this.t('noteOff');
    });

    $$('button[data-value]', this.viewContainer).forEach((btn) => {
      btn.addEventListener('click', () => {
        placeNumber(Number(btn.dataset.value));
      });
    });

    $('button[data-action="erase"]', this.viewContainer).addEventListener('click', erase);
    $('button[data-action="hint"]', this.viewContainer).addEventListener('click', useHint);

    $('button[data-action="exit"]', this.viewContainer).addEventListener('click', () => {
      timer.pause();
      this.showView('homeTemplate');
    });
  },

  generateSudoku(difficulty) {
    const solution = this.generateSudokuSolution();
    const puzzle = solution.map((row) => row.slice());
    const removalCounts = {
      easy: 36,
      normal: 45,
      hard: 52,
      inferno: 58,
    };
    const remove = removalCounts[difficulty] || removalCounts.normal;
    let removed = 0;
    let safety = 0;
    while (removed < remove && safety < 5000) {
      safety += 1;
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] === 0) continue;
      const backup = puzzle[row][col];
      puzzle[row][col] = 0;
      if (this.hasUniqueSolution(puzzle)) {
        removed += 1;
      } else {
        puzzle[row][col] = backup;
      }
    }
    return { puzzle, solution };
  },

  generateSudokuSolution() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const shuffle = (arr) => {
      const clone = arr.slice();
      for (let i = clone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clone[i], clone[j]] = [clone[j], clone[i]];
      }
      return clone;
    };

    const isValid = (row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
      }
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[startRow + r][startCol + c] === num) return false;
        }
      }
      return true;
    };

    const fill = (row = 0, col = 0) => {
      if (row === 9) return true;
      if (col === 9) return fill(row + 1, 0);
      const nums = shuffle(numbers);
      for (const num of nums) {
        if (isValid(row, col, num)) {
          board[row][col] = num;
          if (fill(row, col + 1)) return true;
          board[row][col] = 0;
        }
      }
      return false;
    };

    fill();
    return board;
  },

  hasUniqueSolution(puzzle) {
    const board = puzzle.map((row) => row.slice());
    let solutions = 0;

    const findEmpty = () => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] === 0) return [r, c];
        }
      }
      return null;
    };

    const isValid = (row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
      }
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[startRow + r][startCol + c] === num) return false;
        }
      }
      return true;
    };

    const solve = () => {
      if (solutions > 1) return;
      const empty = findEmpty();
      if (!empty) {
        solutions += 1;
        return;
      }
      const [row, col] = empty;
      for (let num = 1; num <= 9; num++) {
        if (isValid(row, col, num)) {
          board[row][col] = num;
          solve();
          board[row][col] = 0;
          if (solutions > 1) return;
        }
      }
    };

    solve();
    return solutions === 1;
  },

  // 2048 implementation
  start2048() {
    this.showView('game2048Template');
  },

  bind2048Handlers() {
    const gridEl = $('[data-role="grid"]', this.viewContainer);
    const scoreEl = $('[data-role="score"]', this.viewContainer);
    const bestEl = $('[data-role="best"]', this.viewContainer);
    const message = $('[data-role="message"]', this.viewContainer);
    const exitBtn = $('button[data-action="exit"]', this.viewContainer);
    const restartBtn = $('button[data-action="restart"]', this.viewContainer);

    const size = 4;
    const bestKey = 'numberGames2048Best';
    let board = Array.from({ length: size }, () => Array(size).fill(0));
    let score = 0;
    let gameOver = false;
    let announcedWin = false;

    let bestScore = parseInt(localStorage.getItem(bestKey), 10);
    if (Number.isNaN(bestScore)) bestScore = 0;
    bestEl.textContent = String(bestScore);

    const createCells = () => {
      gridEl.innerHTML = '';
      gridEl.style.setProperty('--grid-size', size);
      for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'tile tile-empty';
        gridEl.appendChild(cell);
      }
    };

    const updateScore = () => {
      scoreEl.textContent = String(score);
      if (score > bestScore) {
        bestScore = score;
        bestEl.textContent = String(bestScore);
        localStorage.setItem(bestKey, String(bestScore));
        if (!gameOver && !announcedWin) {
          message.textContent = this.t('game2048NewBest');
        }
        historyStore.push({
          game: this.t('game2048'),
          detail: `${this.t('bestScore')}: ${bestScore}`,
        });
      }
    };

    const render = () => {
      const nodes = Array.from(gridEl.children);
      let idx = 0;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++, idx += 1) {
          const value = board[r][c];
          const cell = nodes[idx];
          cell.textContent = value ? String(value) : '';
          cell.className = value ? `tile tile-${value}` : 'tile tile-empty';
        }
      }
      updateScore();
    };

    const spawnTile = () => {
      const empty = [];
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (board[r][c] === 0) empty.push([r, c]);
        }
      }
      if (!empty.length) return false;
      const [row, col] = empty[Math.floor(Math.random() * empty.length)];
      board[row][col] = Math.random() < 0.1 ? 4 : 2;
      return true;
    };

    const slideRow = (row) => {
      const filtered = row.filter((v) => v !== 0);
      const result = [];
      let gained = 0;
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i] === filtered[i + 1]) {
          const merged = filtered[i] * 2;
          result.push(merged);
          gained += merged;
          i += 1;
        } else {
          result.push(filtered[i]);
        }
      }
      while (result.length < size) {
        result.push(0);
      }
      return { row: result, gained };
    };

    const transpose = (matrix) => matrix[0].map((_, c) => matrix.map((row) => row[c]));

    const moveLeft = () => {
      let moved = false;
      let gainedTotal = 0;
      const newBoard = board.map((row) => {
        const { row: newRow, gained } = slideRow(row);
        if (!moved && newRow.some((val, idx) => val !== row[idx])) moved = true;
        gainedTotal += gained;
        return newRow;
      });
      if (moved) {
        board = newBoard;
        score += gainedTotal;
      }
      return moved;
    };

    const moveRight = () => {
      let moved = false;
      let gainedTotal = 0;
      const newBoard = board.map((row) => {
        const reversed = row.slice().reverse();
        const { row: newRow, gained } = slideRow(reversed);
        const restored = newRow.reverse();
        if (!moved && restored.some((val, idx) => val !== row[idx])) moved = true;
        gainedTotal += gained;
        return restored;
      });
      if (moved) {
        board = newBoard;
        score += gainedTotal;
      }
      return moved;
    };

    const moveUp = () => {
      let moved = false;
      let gainedTotal = 0;
      const transposed = transpose(board);
      const newTransposed = transposed.map((row) => {
        const { row: newRow, gained } = slideRow(row);
        if (!moved && newRow.some((val, idx) => val !== row[idx])) moved = true;
        gainedTotal += gained;
        return newRow;
      });
      if (moved) {
        board = transpose(newTransposed);
        score += gainedTotal;
      }
      return moved;
    };

    const moveDown = () => {
      let moved = false;
      let gainedTotal = 0;
      const transposed = transpose(board);
      const newTransposed = transposed.map((row) => {
        const reversed = row.slice().reverse();
        const { row: newRow, gained } = slideRow(reversed);
        const restored = newRow.reverse();
        if (!moved && restored.some((val, idx) => val !== row[idx])) moved = true;
        gainedTotal += gained;
        return restored;
      });
      if (moved) {
        board = transpose(newTransposed);
        score += gainedTotal;
      }
      return moved;
    };

    const hasMoves = () => {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const val = board[r][c];
          if (val === 0) return true;
          if (c < size - 1 && board[r][c + 1] === val) return true;
          if (r < size - 1 && board[r + 1][c] === val) return true;
        }
      }
      return false;
    };

    const checkStatus = () => {
      if (!announcedWin && board.some((row) => row.some((val) => val === 2048))) {
        announcedWin = true;
        message.textContent = this.t('game2048Win');
      }
      if (!hasMoves()) {
        gameOver = true;
        message.textContent = this.t('game2048Over');
      }
    };

    const handleMove = (direction) => {
      if (gameOver) return;
      let moved = false;
      if (direction === 'left') moved = moveLeft();
      if (direction === 'right') moved = moveRight();
      if (direction === 'up') moved = moveUp();
      if (direction === 'down') moved = moveDown();
      if (moved) {
        spawnTile();
        render();
        checkStatus();
      }
    };

    const keyHandler = (e) => {
      const map = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        s: 'down',
        a: 'left',
        d: 'right',
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        handleMove(dir);
      }
    };

    let touchStart = null;
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        touchStart = { x: t.clientX, y: t.clientY };
      }
    };

    const handleTouchEnd = (e) => {
      if (!touchStart) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.x;
      const dy = t.clientY - touchStart.y;
      touchStart = null;
      const threshold = 24;
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        handleMove(dx > 0 ? 'right' : 'left');
      } else {
        handleMove(dy > 0 ? 'down' : 'up');
      }
    };

    const cleanup = () => {
      document.removeEventListener('keydown', keyHandler);
      gridEl.removeEventListener('touchstart', handleTouchStart);
      gridEl.removeEventListener('touchend', handleTouchEnd);
    };

    exitBtn.addEventListener('click', () => {
      cleanup();
      this.showView('homeTemplate');
    });

    restartBtn.addEventListener('click', () => {
      cleanup();
      this.start2048();
    });

    document.addEventListener('keydown', keyHandler);
    gridEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    gridEl.addEventListener('touchend', handleTouchEnd, { passive: true });

    const newGame = () => {
      board = Array.from({ length: size }, () => Array(size).fill(0));
      score = 0;
      gameOver = false;
      announcedWin = false;
      message.textContent = '';
      spawnTile();
      spawnTile();
      render();
    };

    createCells();
    newGame();
  },

  // Crossmath implementation
  startCrossmath() {
    const puzzle = this.generateCrossmathPuzzle();
    this.showView('crossmathTemplate', { puzzle });
  },

  bindCrossmathHandlers({ puzzle }) {
    const gridEl = $('[data-role="grid"]', this.viewContainer);
    const rowsEl = $('[data-role="rows"]', this.viewContainer);
    const colsEl = $('[data-role="cols"]', this.viewContainer);
    const message = $('[data-role="message"]', this.viewContainer);
    const timerEl = $('[data-role="timer"]', this.viewContainer);

    const timer = new Timer((elapsed) => {
      timerEl.textContent = this.formatTime(elapsed);
    });

    let solved = false;
    const inputs = [];
    gridEl.innerHTML = '';
    for (let r = 0; r < 3; r++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'crossmath-row';
      for (let c = 0; c < 3; c++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.inputMode = 'numeric';
        input.maxLength = 1;
        input.dataset.row = String(r);
        input.dataset.col = String(c);
        input.className = 'crossmath-cell';
        input.addEventListener('input', () => {
          input.value = input.value.replace(/[^1-9]/g, '');
        });
        rowEl.appendChild(input);
        inputs.push(input);
      }
      gridEl.appendChild(rowEl);
    }

    const formatOps = (ops) => {
      const symbols = ops.map((op) => (op === '*' ? '×' : op === '/' ? '÷' : op));
      return `${symbols[0]} □ ${symbols[1]}`;
    };

    rowsEl.innerHTML = '';
    puzzle.rowOps.forEach((ops, idx) => {
      const div = document.createElement('div');
      const opsText = formatOps(ops);
      div.textContent = `${this.t('row')} ${idx + 1}: □ ${opsText} □ = ${puzzle.rowResults[idx]}`;
      rowsEl.appendChild(div);
    });

    colsEl.innerHTML = '';
    puzzle.colOps.forEach((ops, idx) => {
      const div = document.createElement('div');
      const opsText = formatOps(ops);
      div.textContent = `${this.t('column')} ${idx + 1}: □ ${opsText} □ = ${puzzle.colResults[idx]}`;
      colsEl.appendChild(div);
    });

    const collectValues = () => {
      const values = Array.from({ length: 3 }, () => Array(3).fill(0));
      inputs.forEach((input) => {
        const row = Number(input.dataset.row);
        const col = Number(input.dataset.col);
        values[row][col] = Number(input.value);
      });
      return values;
    };

    const isComplete = () => inputs.every((input) => input.value !== '');

    const checkSolution = () => {
      if (!isComplete()) {
        message.textContent = this.t('incomplete');
        return;
      }
      const values = collectValues();
      const digits = new Set();
      let duplicate = false;
      values.flat().forEach((val) => {
        if (digits.has(val)) duplicate = true;
        digits.add(val);
      });
      if (duplicate || digits.size !== 9) {
        message.textContent = this.t('duplicateDigits');
        return;
      }
      let correct = true;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (values[r][c] !== puzzle.solution[r][c]) {
            correct = false;
            break;
          }
        }
        if (!correct) break;
      }
      if (correct) {
        if (!solved) {
          solved = true;
          timer.pause();
          historyStore.push({
            game: this.t('crossmath'),
            detail: `${this.t('completedIn')} ${timerEl.textContent}`,
          });
        }
        message.textContent = this.t('crossmathSolved');
      } else {
        message.textContent = this.t('crossmathError');
      }
    };

    $('button[data-action="check"]', this.viewContainer).addEventListener('click', checkSolution);

    $('button[data-action="clear"]', this.viewContainer).addEventListener('click', () => {
      inputs.forEach((input) => {
        input.value = '';
      });
      message.textContent = '';
    });

    $('button[data-action="new"]', this.viewContainer).addEventListener('click', () => {
      timer.pause();
      this.startCrossmath();
    });

    $('button[data-action="exit"]', this.viewContainer).addEventListener('click', () => {
      timer.pause();
      this.showView('homeTemplate');
    });

    timer.start();
  },

  generateCrossmathPuzzle() {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const opsCombos = [
      { ops: ['+', '+'], calc: (a, b, c) => a + b + c },
      { ops: ['+', '-'], calc: (a, b, c) => {
        const res = a + b - c;
        return res > 0 ? res : null;
      } },
      { ops: ['-', '+'], calc: (a, b, c) => {
        const res = a - b + c;
        return res > 0 ? res : null;
      } },
      { ops: ['*', '+'], calc: (a, b, c) => {
        const res = a * b + c;
        return res <= 400 ? res : null;
      } },
      { ops: ['+', '*'], calc: (a, b, c) => {
        const res = a + b * c;
        return res <= 400 ? res : null;
      } },
      { ops: ['*', '-'], calc: (a, b, c) => {
        const res = a * b - c;
        return res > 0 && res <= 400 ? res : null;
      } },
      { ops: ['/', '+'], calc: (a, b, c) => {
        if (a % b !== 0) return null;
        return a / b + c;
      } },
      { ops: ['*', '/'], calc: (a, b, c) => {
        const product = a * b;
        if (product % c !== 0) return null;
        const res = product / c;
        return res > 0 && res <= 400 ? res : null;
      } },
    ];

    const shuffle = (array) => {
      const arr = array.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const pickCombo = (values) => {
      const order = shuffle(opsCombos);
      for (const combo of order) {
        const result = combo.calc(values[0], values[1], values[2]);
        if (result !== null && result > 0 && result <= 400) {
          return { ops: combo.ops, result: Math.round(result) };
        }
      }
      return null;
    };

    for (let attempt = 0; attempt < 500; attempt++) {
      const shuffled = shuffle(digits);
      const grid = [
        shuffled.slice(0, 3),
        shuffled.slice(3, 6),
        shuffled.slice(6, 9),
      ];
      const rowOps = [];
      const rowResults = [];
      let valid = true;
      for (let r = 0; r < 3; r++) {
        const combo = pickCombo(grid[r]);
        if (!combo) {
          valid = false;
          break;
        }
        rowOps.push(combo.ops);
        rowResults.push(combo.result);
      }
      if (!valid) continue;
      const columns = [
        [grid[0][0], grid[1][0], grid[2][0]],
        [grid[0][1], grid[1][1], grid[2][1]],
        [grid[0][2], grid[1][2], grid[2][2]],
      ];
      const colOps = [];
      const colResults = [];
      for (let c = 0; c < 3; c++) {
        const combo = pickCombo(columns[c]);
        if (!combo) {
          valid = false;
          break;
        }
        colOps.push(combo.ops);
        colResults.push(combo.result);
      }
      if (!valid) continue;
      return { solution: grid, rowOps, rowResults, colOps, colResults };
    }

    return {
      solution: [
        [2, 7, 6],
        [9, 5, 1],
        [4, 3, 8],
      ],
      rowOps: [
        ['+', '+'],
        ['-', '+'],
        ['*', '-'],
      ],
      rowResults: [15, 13, 4],
      colOps: [
        ['+', '*'],
        ['+', '-'],
        ['*', '+'],
      ],
      colResults: [26, 9, 32],
    };
  },

  // Fill Blocks implementation
  startFillBlocks(size) {
    const puzzle = this.getFillBlocksPuzzle(size);
    this.showView('fillBlocksGameTemplate', { puzzle });
  },

  bindFillBlocksHandlers({ puzzle }) {
    const size = puzzle.size;
    const solution = puzzle.solution;
    const gridEl = $('[data-role="grid"]', this.viewContainer);
    const topCluesEl = $('[data-role="topClues"]', this.viewContainer);
    const leftCluesEl = $('[data-role="leftClues"]', this.viewContainer);
    const message = $('[data-role="message"]', this.viewContainer);
    const timerEl = $('[data-role="timer"]', this.viewContainer);
    const modeButtons = $$('.fill-blocks-modes button', this.viewContainer);

    const timer = new Timer((elapsed) => {
      timerEl.textContent = this.formatTime(elapsed);
    });

    const stateGrid = Array.from({ length: size }, () => Array(size).fill(0));
    let mode = 'fill';
    let completed = false;

    gridEl.innerHTML = '';
    gridEl.style.setProperty('--grid-size', size);
    topCluesEl.style.setProperty('--grid-size', size);
    leftCluesEl.style.setProperty('--grid-size', size);

    const columnClues = [];
    for (let c = 0; c < size; c++) {
      const column = solution.map((row) => row[c]);
      columnClues.push(this.buildNonogramClues(column));
    }

    const rowClues = solution.map((row) => this.buildNonogramClues(row));

    topCluesEl.innerHTML = '';
    columnClues.forEach((clues) => {
      const col = document.createElement('div');
      col.className = 'clue-top';
      clues.forEach((num) => {
        const span = document.createElement('span');
        span.textContent = String(num);
        col.appendChild(span);
      });
      topCluesEl.appendChild(col);
    });

    leftCluesEl.innerHTML = '';
    rowClues.forEach((clues) => {
      const row = document.createElement('div');
      row.className = 'clue-left';
      clues.forEach((num) => {
        const span = document.createElement('span');
        span.textContent = String(num);
        row.appendChild(span);
      });
      leftCluesEl.appendChild(row);
    });

    const updateCellClass = (cell, value) => {
      cell.classList.remove('filled', 'marked');
      if (value === 1) cell.classList.add('filled');
      if (value === -1) cell.classList.add('marked');
    };

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'fill-cell';
        cell.dataset.row = String(r);
        cell.dataset.col = String(c);
        cell.addEventListener('click', () => {
          const row = Number(cell.dataset.row);
          const col = Number(cell.dataset.col);
          if (mode === 'fill') {
            stateGrid[row][col] = stateGrid[row][col] === 1 ? 0 : 1;
          } else {
            stateGrid[row][col] = stateGrid[row][col] === -1 ? 0 : -1;
          }
          updateCellClass(cell, stateGrid[row][col]);
        });
        gridEl.appendChild(cell);
      }
    }

    modeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        mode = btn.dataset.mode;
        modeButtons.forEach((b) => b.classList.toggle('active', b === btn));
      });
    });

    $('button[data-action="clear"]', this.viewContainer).addEventListener('click', () => {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          stateGrid[r][c] = 0;
        }
      }
      $$('.fill-cell', gridEl).forEach((cell) => {
        cell.classList.remove('filled', 'marked');
      });
      message.textContent = '';
    });

    $('button[data-action="check"]', this.viewContainer).addEventListener('click', () => {
      let hasError = false;
      let missing = false;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (solution[r][c] === 1 && stateGrid[r][c] !== 1) missing = true;
          if (solution[r][c] === 0 && stateGrid[r][c] === 1) hasError = true;
        }
      }
      if (!missing && !hasError) {
        if (!completed) {
          completed = true;
          timer.pause();
          historyStore.push({
            game: this.t('fillBlocks'),
            detail: `${this.t('gridSize')}: ${size}×${size} · ${this.t('completedIn')} ${timerEl.textContent}`,
          });
        }
        message.textContent = this.t('fillBlocksSolved');
      } else if (hasError) {
        message.textContent = this.t('fillBlocksMistake');
      } else {
        message.textContent = this.t('fillBlocksProgress');
      }
    });

    $('button[data-action="new"]', this.viewContainer).addEventListener('click', () => {
      timer.pause();
      this.startFillBlocks(size);
    });

    $('button[data-action="exit"]', this.viewContainer).addEventListener('click', () => {
      timer.pause();
      this.showView('homeTemplate');
    });

    timer.start();
  },

  getFillBlocksPuzzle(size) {
    const pools = fillBlockPresets[size] || fillBlockPresets[10];
    const pattern = pools[Math.floor(Math.random() * pools.length)];
    const solution = pattern.map((row) => row.split('').map((ch) => (ch === '1' ? 1 : 0)));
    return { size: solution.length, solution };
  },

  buildNonogramClues(line) {
    const clues = [];
    let count = 0;
    line.forEach((cell) => {
      if (cell === 1) {
        count += 1;
      } else if (count > 0) {
        clues.push(count);
        count = 0;
      }
    });
    if (count > 0) clues.push(count);
    if (!clues.length) clues.push(0);
    return clues;
  },

  // Minesweeper implementation
  startMinesweeper(difficulty) {
    const context = { difficulty };
    this.showView('minesweeperGameTemplate', context);
  },

  bindMinesweeperHandlers({ difficulty }) {
    const gridEl = $('[data-role="grid"]', this.viewContainer);
    const message = $('[data-role="message"]', this.viewContainer);
    const timerEl = $('[data-role="timer"]', this.viewContainer);
    const pauseBtn = $('button[data-action="pause"]', this.viewContainer);

    const settings = {
      easy: { rows: 9, cols: 9, mines: 10 },
      normal: { rows: 12, cols: 12, mines: 24 },
      hard: { rows: 16, cols: 16, mines: 40 },
    };
    const config = settings[difficulty] || settings.normal;

    gridEl.style.gridTemplateColumns = `repeat(${config.cols}, 36px)`;

    const timer = new Timer((elapsed) => {
      timerEl.textContent = this.formatTime(elapsed);
    });

    let paused = false;
    let revealedCount = 0;
    let totalSafe = config.rows * config.cols - config.mines;
    const cells = [];
    const mineSet = new Set();

    const index = (r, c) => r * config.cols + c;

    const placeMines = (safeIndex) => {
      while (mineSet.size < config.mines) {
        const pos = Math.floor(Math.random() * config.rows * config.cols);
        if (pos === safeIndex) continue;
        mineSet.add(pos);
      }
    };

    const getNeighbors = (r, c) => {
      const neighbors = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < config.rows && nc >= 0 && nc < config.cols) {
            neighbors.push([nr, nc]);
          }
        }
      }
      return neighbors;
    };

    const countMines = (r, c) => {
      return getNeighbors(r, c).filter(([nr, nc]) => mineSet.has(index(nr, nc))).length;
    };

    const reveal = (cell) => {
      if (cell.revealed || cell.flagged) return;
      cell.revealed = true;
      cell.element.classList.add('revealed');
      if (mineSet.has(index(cell.row, cell.col))) {
        cell.element.textContent = '💣';
        message.textContent = this.t('minesExploded');
        timer.pause();
        gridEl.classList.add('disabled');
        return;
      }
      revealedCount += 1;
      const minesAround = countMines(cell.row, cell.col);
      if (minesAround > 0) {
        cell.element.textContent = String(minesAround);
      } else {
        cell.element.textContent = '';
        getNeighbors(cell.row, cell.col).forEach(([nr, nc]) => {
          reveal(cells[index(nr, nc)]);
        });
      }
      if (revealedCount === totalSafe) {
        timer.pause();
        message.textContent = this.t('minesCleared');
        gridEl.classList.add('disabled');
        historyStore.push({
          game: this.t('minesweeper'),
          detail: `${this.t('timer')}: ${timerEl.textContent}`,
        });
      }
    };

    const toggleFlag = (cell) => {
      if (cell.revealed) return;
      cell.flagged = !cell.flagged;
      cell.element.classList.toggle('flagged', cell.flagged);
      cell.element.textContent = cell.flagged ? '⚑' : '';
    };

    let firstClick = true;

    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        const btn = document.createElement('button');
        btn.className = 'mines-cell';
        btn.type = 'button';
        const cell = { row: r, col: c, element: btn, revealed: false, flagged: false };
        cells.push(cell);
        gridEl.appendChild(btn);

        btn.addEventListener('click', (e) => {
          if (paused) return;
          if (firstClick) {
            placeMines(index(r, c));
            timer.start();
            firstClick = false;
          }
          reveal(cell);
        });

        btn.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          if (paused) return;
          toggleFlag(cell);
        });
      }
    }

    pauseBtn.addEventListener('click', () => {
      paused = !paused;
      if (paused) {
        timer.pause();
        pauseBtn.textContent = this.t('resume');
        pauseBtn.dataset.i18n = 'resume';
        message.textContent = this.t('paused');
        gridEl.style.pointerEvents = 'none';
      } else {
        pauseBtn.textContent = this.t('pause');
        pauseBtn.dataset.i18n = 'pause';
        message.textContent = this.t('resumed');
        gridEl.style.pointerEvents = '';
        if (!firstClick) timer.start();
      }
    });

    $('button[data-action="exit"]', this.viewContainer).addEventListener('click', () => {
      timer.pause();
      this.showView('homeTemplate');
    });
  },
};

window.addEventListener('DOMContentLoaded', () => app.init());
