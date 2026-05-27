// ============================================================
// SNAKE GAME — Game Logic
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score');
    const highScoreEl = document.getElementById('highScore');
    const levelEl = document.getElementById('level');
    const overlay = document.getElementById('overlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayText = document.getElementById('overlayText');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');

    const GRID = 20;
    const TILE = canvas.width / GRID;

    let snake, food, direction, nextDirection, score, highScore, level, gameLoop, isRunning, isPaused;

    const speedNames = ['Slow', 'Normal', 'Fast', 'Insane', 'Impossible'];
    const speedMs = [150, 120, 80, 55, 35];

    highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
    highScoreEl.textContent = highScore;

    function init() {
        snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
        direction = 'right';
        nextDirection = 'right';
        score = 0;
        level = 1;
        isRunning = false;
        isPaused = false;
        scoreEl.textContent = 0;
        levelEl.textContent = 1;
        spawnFood();
        draw();
    }

    function spawnFood() {
        let pos;
        do {
            pos = {
                x: Math.floor(Math.random() * GRID),
                y: Math.floor(Math.random() * GRID)
            };
        } while (snake.some(s => s.x === pos.x && s.y === pos.y));
        food = pos;
    }

    function draw() {
        // Background
        ctx.fillStyle = '#111118';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= GRID; i++) {
            ctx.beginPath();
            ctx.moveTo(i * TILE, 0);
            ctx.lineTo(i * TILE, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * TILE);
            ctx.lineTo(canvas.width, i * TILE);
            ctx.stroke();
        }

        // Food with glow
        ctx.shadowColor = '#ff6b6b';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(food.x * TILE + TILE / 2, food.y * TILE + TILE / 2, TILE / 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Snake
        snake.forEach((segment, i) => {
            const isHead = i === 0;
            const alpha = 1 - (i / snake.length) * 0.4;

            if (isHead) {
                ctx.shadowColor = '#00d4aa';
                ctx.shadowBlur = 12;
                ctx.fillStyle = '#00d4aa';
            } else {
                ctx.shadowBlur = 0;
                ctx.fillStyle = `rgba(0, 212, 170, ${alpha})`;
            }

            const padding = 1;
            const radius = 4;
            const x = segment.x * TILE + padding;
            const y = segment.y * TILE + padding;
            const size = TILE - padding * 2;

            ctx.beginPath();
            ctx.roundRect(x, y, size, size, radius);
            ctx.fill();
        });

        ctx.shadowBlur = 0;

        // Eyes on head
        const head = snake[0];
        ctx.fillStyle = '#111118';
        const eyeSize = 2.5;
        let eye1x, eye1y, eye2x, eye2y;
        const cx = head.x * TILE + TILE / 2;
        const cy = head.y * TILE + TILE / 2;

        if (direction === 'right') {
            eye1x = cx + 4; eye1y = cy - 4;
            eye2x = cx + 4; eye2y = cy + 4;
        } else if (direction === 'left') {
            eye1x = cx - 4; eye1y = cy - 4;
            eye2x = cx - 4; eye2y = cy + 4;
        } else if (direction === 'up') {
            eye1x = cx - 4; eye1y = cy - 4;
            eye2x = cx + 4; eye2y = cy - 4;
        } else {
            eye1x = cx - 4; eye1y = cy + 4;
            eye2x = cx + 4; eye2y = cy + 4;
        }

        ctx.beginPath();
        ctx.arc(eye1x, eye1y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eye2x, eye2y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
    }

    function update() {
        direction = nextDirection;
        const head = { ...snake[0] };

        if (direction === 'up') head.y--;
        else if (direction === 'down') head.y++;
        else if (direction === 'left') head.x--;
        else if (direction === 'right') head.x++;

        // Wall collision
        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
            gameOver();
            return;
        }

        // Self collision
        if (snake.some(s => s.x === head.x && s.y === head.y)) {
            gameOver();
            return;
        }

        snake.unshift(head);

        // Eat food
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreEl.textContent = score;

            // Level up every 50 points
            const newLevel = Math.floor(score / 50) + 1;
            if (newLevel !== level) {
                level = newLevel;
                levelEl.textContent = level;
                // Restart loop with faster speed
                clearInterval(gameLoop);
                const speed = speedMs[speedSlider.value - 1] - (level - 1) * 5;
                gameLoop = setInterval(gameStep, Math.max(speed, 30));
            }

            if (score > highScore) {
                highScore = score;
                highScoreEl.textContent = highScore;
                localStorage.setItem('snakeHighScore', highScore);
            }

            spawnFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function gameStep() {
        if (!isPaused) update();
    }

    function startGame() {
        if (isRunning) return;
        isRunning = true;
        isPaused = false;
        overlay.classList.add('hidden');
        pauseBtn.disabled = false;
        const speed = speedMs[speedSlider.value - 1];
        gameLoop = setInterval(gameStep, speed);
    }

    function pauseGame() {
        isPaused = !isPaused;
        pauseBtn.innerHTML = isPaused
            ? '<i class="fas fa-play"></i> Resume'
            : '<i class="fas fa-pause"></i> Pause';
    }

    function gameOver() {
        isRunning = false;
        clearInterval(gameLoop);
        pauseBtn.disabled = true;

        // Flash effect
        ctx.fillStyle = 'rgba(255, 107, 107, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        overlayTitle.textContent = 'Game Over!';
        overlayText.textContent = `Score: ${score}`;
        startBtn.innerHTML = '<i class="fas fa-redo"></i> Play Again';
        overlay.classList.remove('hidden');
    }

    // ===== CONTROLS =====
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        // Start game on space
        if (key === ' ' && !isRunning) {
            e.preventDefault();
            startGame();
            return;
        }

        // Pause on space
        if (key === ' ' && isRunning) {
            e.preventDefault();
            pauseGame();
            return;
        }

        // Direction
        if ((key === 'arrowup' || key === 'w') && direction !== 'down') nextDirection = 'up';
        else if ((key === 'arrowdown' || key === 's') && direction !== 'up') nextDirection = 'down';
        else if ((key === 'arrowleft' || key === 'a') && direction !== 'right') nextDirection = 'left';
        else if ((key === 'arrowright' || key === 'd') && direction !== 'left') nextDirection = 'right';
    });

    // Mobile controls
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dir = btn.dataset.dir;
            if (!isRunning) {
                startGame();
                return;
            }
            if (dir === 'up' && direction !== 'down') nextDirection = 'up';
            else if (dir === 'down' && direction !== 'up') nextDirection = 'down';
            else if (dir === 'left' && direction !== 'right') nextDirection = 'left';
            else if (dir === 'right' && direction !== 'left') nextDirection = 'right';
        });
    });

    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            init();
            startGame();
        }
    });

    pauseBtn.addEventListener('click', pauseGame);

    restartBtn.addEventListener('click', () => {
        clearInterval(gameLoop);
        init();
        overlayTitle.textContent = 'Snake Game';
        overlayText.textContent = 'Press Space or tap Start to play';
        startBtn.innerHTML = '<i class="fas fa-play"></i> Start Game';
        overlay.classList.remove('hidden');
        pauseBtn.disabled = true;
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    });

    speedSlider.addEventListener('input', () => {
        speedValue.textContent = speedNames[speedSlider.value - 1];
        if (isRunning) {
            clearInterval(gameLoop);
            const speed = speedMs[speedSlider.value - 1] - (level - 1) * 5;
            gameLoop = setInterval(gameStep, Math.max(speed, 30));
        }
    });

    // Touch swipe support
    let touchStartX = 0, touchStartY = 0;
    canvas.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    canvas.addEventListener('touchend', (e) => {
        if (!isRunning) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 20 && direction !== 'left') nextDirection = 'right';
            else if (dx < -20 && direction !== 'right') nextDirection = 'left';
        } else {
            if (dy > 20 && direction !== 'up') nextDirection = 'down';
            else if (dy < -20 && direction !== 'down') nextDirection = 'up';
        }
    });

    init();
});
