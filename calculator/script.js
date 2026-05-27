// ============================================================
// CALCULATOR — Full Functional
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    const expressionEl = document.getElementById('expression');
    const resultEl = document.getElementById('result');
    const basicGrid = document.getElementById('basicGrid');
    const scientificGrid = document.getElementById('scientificGrid');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const modeBtns = document.querySelectorAll('.mode-btn');

    let currentInput = '0';
    let expression = '';
    let lastResult = null;
    let history = [];

    // ===== MODE TOGGLE =====
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.dataset.mode;
            basicGrid.style.display = mode === 'basic' ? 'grid' : 'none';
            scientificGrid.style.display = mode === 'scientific' ? 'grid' : 'none';
        });
    });

    // ===== UPDATE DISPLAY =====
    function updateDisplay() {
        expressionEl.textContent = expression;
        resultEl.textContent = currentInput;
        resultEl.classList.toggle('small', currentInput.length > 10);
    }

    // ===== FACTORIAL HELPER =====
    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    }

    // ===== ADD TO HISTORY =====
    function addToHistory(expr, value) {
        history.unshift({ expr, value });
        if (history.length > 20) history.pop();
        renderHistory();
    }

    function renderHistory() {
        if (history.length === 0) {
            historyList.innerHTML = '<p class="history-empty">No calculations yet</p>';
            return;
        }
        historyList.innerHTML = history.map((h, i) => `
            <div class="history-item" data-index="${i}">
                <span class="history-expr">${h.expr}</span>
                <span class="history-val">= ${h.value}</span>
            </div>
        `).join('');

        historyList.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const idx = parseInt(item.dataset.index);
                currentInput = String(history[idx].value);
                expression = history[idx].expr;
                updateDisplay();
            });
        });
    }

    clearHistoryBtn.addEventListener('click', () => {
        history = [];
        renderHistory();
    });

    // ===== BUTTON HANDLERS =====
    document.querySelectorAll('.btn-grid button').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const value = btn.dataset.value;

            switch (action) {
                case 'number':
                    if (currentInput === '0' || currentInput === 'Error') {
                        currentInput = value;
                    } else {
                        currentInput += value;
                    }
                    break;

                case 'decimal':
                    if (currentInput === 'Error') currentInput = '0';
                    if (!currentInput.includes('.')) {
                        currentInput += '.';
                    }
                    break;

                case 'operator':
                    if (currentInput !== 'Error') {
                        expression += currentInput + ' ' + value + ' ';
                        currentInput = '0';
                    }
                    break;

                case 'equals':
                    try {
                        const fullExpr = expression + currentInput;
                        const result = Function('"use strict"; return (' + fullExpr + ')')();
                        const displayResult = Number.isFinite(result) ? parseFloat(result.toFixed(10)) : 'Error';
                        addToHistory(fullExpr, displayResult);
                        expression = fullExpr + ' =';
                        currentInput = String(displayResult);
                    } catch {
                        currentInput = 'Error';
                    }
                    break;

                case 'clear':
                    currentInput = '0';
                    expression = '';
                    break;

                case 'backspace':
                    if (currentInput === 'Error') {
                        currentInput = '0';
                    } else if (currentInput.length > 1) {
                        currentInput = currentInput.slice(0, -1);
                    } else {
                        currentInput = '0';
                    }
                    break;

                case 'percent':
                    try {
                        const val = parseFloat(currentInput);
                        currentInput = String(parseFloat((val / 100).toFixed(10)));
                    } catch {
                        currentInput = 'Error';
                    }
                    break;

                case 'negate':
                    if (currentInput !== '0' && currentInput !== 'Error') {
                        currentInput = currentInput.startsWith('-')
                            ? currentInput.slice(1)
                            : '-' + currentInput;
                    }
                    break;

                case 'func':
                    try {
                        const funcName = value;
                        if (funcName === 'Math.PI') {
                            currentInput = String(Math.PI);
                        } else if (funcName === 'Math.E') {
                            currentInput = String(Math.E);
                        } else if (funcName === 'factorial') {
                            currentInput = String(factorial(parseInt(currentInput)));
                        } else if (funcName === 'Math.pow') {
                            expression += currentInput + ' ^ ';
                            currentInput = '0';
                        } else if (funcName === 'Math.pow10') {
                            currentInput = String(Math.pow(10, parseFloat(currentInput)));
                        } else {
                            const fn = Function('"use strict"; return (' + funcName + ')')();
                            const result = fn(parseFloat(currentInput));
                            currentInput = String(parseFloat(result.toFixed(10)));
                        }
                    } catch {
                        currentInput = 'Error';
                    }
                    break;

                case 'openParen':
                    expression += '( ';
                    break;

                case 'closeParen':
                    expression += currentInput + ' ) ';
                    currentInput = '0';
                    break;
            }

            updateDisplay();
        });
    });

    // ===== KEYBOARD SUPPORT =====
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key >= '0' && key <= '9') {
            document.querySelector(`[data-value="${key}"][data-action="number"]`)?.click();
        } else if (key === '.') {
            document.querySelector('[data-action="decimal"]')?.click();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            document.querySelector(`[data-value="${key}"]`)?.click();
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            document.querySelector('[data-action="equals"]')?.click();
        } else if (key === 'Backspace') {
            document.querySelector('[data-action="backspace"]')?.click();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            document.querySelector('[data-action="clear"]')?.click();
        } else if (key === '%') {
            document.querySelector('[data-action="percent"]')?.click();
        }
    });

    updateDisplay();
});
