// ============================================================
// TIC-TAC-TOE — Game Logic with AI
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    const resetBtn = document.getElementById('resetBtn');
    const scoreXEl = document.getElementById('scoreX');
    const scoreOEl = document.getElementById('scoreO');
    const scoreDrawEl = document.getElementById('scoreDraw');
    const player1Name = document.getElementById('player1Name');
    const player2Name = document.getElementById('player2Name');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const diffBtns = document.querySelectorAll('.diff-btn');
    const diffSection = document.getElementById('difficultySelection');

    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameActive = true;
    let mode = 'ai'; // 'ai' or 'pvp'
    let difficulty = 'hard';
    let scores = { X: 0, O: 0, draw: 0 };

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    // ===== MODE SELECTION =====
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mode = btn.dataset.mode;
            diffSection.style.display = mode === 'ai' ? 'flex' : 'none';
            player1Name.textContent = 'You';
            player2Name.textContent = mode === 'ai' ? 'AI' : 'P2';
            resetGame();
        });
    });

    // ===== DIFFICULTY =====
    diffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            diffBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            difficulty = btn.dataset.diff;
            resetGame();
        });
    });

    // ===== CELL CLICK =====
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = parseInt(cell.dataset.index);
            if (board[index] || !gameActive) return;

            makeMove(index, currentPlayer);

            if (mode === 'ai' && gameActive && currentPlayer === 'O') {
                setTimeout(aiMove, 300);
            }
        });
    });

    function makeMove(index, player) {
        board[index] = player;
        const cell = cells[index];
        cell.textContent = player;
        cell.classList.add('taken', player.toLowerCase());

        const winResult = checkWin();
        if (winResult) {
            gameActive = false;
            highlightWin(winResult);
            scores[player]++;
            updateScores();
            status.textContent = `${player === 'X' ? (mode === 'ai' ? 'You win!' : 'Player 1 wins!') : (mode === 'ai' ? 'AI wins!' : 'Player 2 wins!')}`;
            status.classList.add('win');
            return;
        }

        if (board.every(c => c)) {
            gameActive = false;
            scores.draw++;
            updateScores();
            status.textContent = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = mode === 'ai'
            ? (currentPlayer === 'X' ? 'Your turn (X)' : 'AI thinking...')
            : (currentPlayer === 'X' ? "Player 1's turn (X)" : "Player 2's turn (O)");
    }

    function checkWin() {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return pattern;
            }
        }
        return null;
    }

    function highlightWin(pattern) {
        pattern.forEach(i => cells[i].classList.add('win-cell'));
    }

    // ===== AI =====
    function aiMove() {
        if (!gameActive) return;
        let move;
        if (difficulty === 'easy') {
            move = easyAI();
        } else if (difficulty === 'medium') {
            move = Math.random() < 0.6 ? hardAI() : easyAI();
        } else {
            move = hardAI();
        }
        if (move !== -1) makeMove(move, 'O');
    }

    function easyAI() {
        const empty = board.map((v, i) => v ? -1 : i).filter(i => i !== -1);
        return empty.length ? empty[Math.floor(Math.random() * empty.length)] : -1;
    }

    function hardAI() {
        // Try to win
        for (const p of winPatterns) {
            const vals = p.map(i => board[i]);
            if (vals.filter(v => v === 'O').length === 2 && vals.includes('')) {
                return p[vals.indexOf('')];
            }
        }
        // Block player
        for (const p of winPatterns) {
            const vals = p.map(i => board[i]);
            if (vals.filter(v => v === 'X').length === 2 && vals.includes('')) {
                return p[vals.indexOf('')];
            }
        }
        // Take center
        if (!board[4]) return 4;
        // Take corner
        const corners = [0, 2, 6, 8].filter(i => !board[i]);
        if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
        // Take any
        const empty = board.map((v, i) => v ? -1 : i).filter(i => i !== -1);
        return empty.length ? empty[0] : -1;
    }

    function updateScores() {
        scoreXEl.textContent = scores.X;
        scoreOEl.textContent = scores.O;
        scoreDrawEl.textContent = scores.draw;
    }

    function resetGame() {
        board = Array(9).fill('');
        currentPlayer = 'X';
        gameActive = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        status.textContent = mode === 'ai' ? 'Your turn (X)' : "Player 1's turn (X)";
        status.classList.remove('win');
    }

    restartBtn.addEventListener('click', resetGame);
    resetBtn.addEventListener('click', () => {
        scores = { X: 0, O: 0, draw: 0 };
        updateScores();
        resetGame();
    });

});
