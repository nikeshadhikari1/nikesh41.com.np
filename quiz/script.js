// ============================================================
// BRAIN QUIZ — Full Application
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // ===== QUESTIONS DATABASE =====
    const questionsDB = {
        gk: [
            { q: "What is the capital of France?", a: ["Berlin", "Madrid", "Paris", "Rome"], c: 2, cat: "General Knowledge" },
            { q: "Which planet is known as the Red Planet?", a: ["Venus", "Mars", "Jupiter", "Saturn"], c: 1, cat: "General Knowledge" },
            { q: "What is the largest ocean on Earth?", a: ["Atlantic", "Indian", "Arctic", "Pacific"], c: 3, cat: "General Knowledge" },
            { q: "Who painted the Mona Lisa?", a: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], c: 1, cat: "General Knowledge" },
            { q: "What is the smallest country in the world?", a: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], c: 1, cat: "General Knowledge" },
            { q: "Which is the longest river in the world?", a: ["Amazon", "Nile", "Yangtze", "Mississippi"], c: 1, cat: "General Knowledge" },
            { q: "How many continents are there?", a: ["5", "6", "7", "8"], c: 2, cat: "General Knowledge" },
            { q: "What year did World War II end?", a: ["1943", "1944", "1945", "1946"], c: 2, cat: "General Knowledge" },
            { q: "What is the hardest natural substance?", a: ["Gold", "Iron", "Diamond", "Platinum"], c: 2, cat: "General Knowledge" },
            { q: "Which language has the most native speakers?", a: ["English", "Spanish", "Mandarin", "Hindi"], c: 2, cat: "General Knowledge" },
        ],
        tech: [
            { q: "What does HTML stand for?", a: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], c: 0, cat: "Technology" },
            { q: "Who is the co-founder of Apple Inc.?", a: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"], c: 1, cat: "Technology" },
            { q: "What does CSS stand for?", a: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], c: 1, cat: "Technology" },
            { q: "Which company developed the Android OS?", a: ["Apple", "Microsoft", "Google", "Samsung"], c: 2, cat: "Technology" },
            { q: "What year was the first iPhone released?", a: ["2005", "2006", "2007", "2008"], c: 2, cat: "Technology" },
            { q: "What does CPU stand for?", a: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Program Utility"], c: 1, cat: "Technology" },
            { q: "Which programming language is known as the 'language of the web'?", a: ["Python", "Java", "JavaScript", "C++"], c: 2, cat: "Technology" },
            { q: "What does RAM stand for?", a: ["Random Access Memory", "Read Access Memory", "Rapid Access Module", "Random Action Memory"], c: 0, cat: "Technology" },
            { q: "Who invented the World Wide Web?", a: ["Tim Berners-Lee", "Vint Cerf", "Robert Cailliau", "Marc Andreessen"], c: 0, cat: "Technology" },
            { q: "What is the main language used for Android app development?", a: ["Swift", "Kotlin", "C#", "Ruby"], c: 1, cat: "Technology" },
        ],
        science: [
            { q: "What is the chemical symbol for water?", a: ["H2O", "CO2", "NaCl", "O2"], c: 0, cat: "Science" },
            { q: "What is the speed of light approximately?", a: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"], c: 0, cat: "Science" },
            { q: "What is the powerhouse of the cell?", a: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], c: 2, cat: "Science" },
            { q: "What gas do plants absorb from the atmosphere?", a: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], c: 2, cat: "Science" },
            { q: "What is the atomic number of Carbon?", a: ["4", "6", "8", "12"], c: 1, cat: "Science" },
            { q: "What planet is closest to the Sun?", a: ["Venus", "Earth", "Mercury", "Mars"], c: 2, cat: "Science" },
            { q: "What is the largest organ in the human body?", a: ["Heart", "Liver", "Brain", "Skin"], c: 3, cat: "Science" },
            { q: "What force keeps planets in orbit?", a: ["Magnetism", "Gravity", "Friction", "Inertia"], c: 1, cat: "Science" },
            { q: "What is the pH of pure water?", a: ["5", "7", "9", "14"], c: 1, cat: "Science" },
            { q: "How many bones are in the adult human body?", a: ["186", "206", "226", "256"], c: 1, cat: "Science" },
        ],
        nepal: [
            { q: "What is the height of Mt. Everest?", a: ["8,812m", "8,848m", "8,884m", "8,900m"], c: 1, cat: "Nepal" },
            { q: "What is the capital city of Nepal?", a: ["Pokhara", "Lalitpur", "Kathmandu", "Biratnagar"], c: 2, cat: "Nepal" },
            { q: "What is the national flower of Nepal?", a: ["Rose", "Rhododendron", "Lotus", "Sunflower"], c: 1, cat: "Nepal" },
            { q: "Which river is the longest in Nepal?", a: ["Bagmati", "Koshi", "Karnali", "Gandaki"], c: 2, cat: "Nepal" },
            { q: "What is the national animal of Nepal?", a: ["Tiger", "Elephant", "Cow", "Yak"], c: 2, cat: "Nepal" },
            { q: "In which year did Nepal become a republic?", a: ["2006", "2007", "2008", "2009"], c: 2, cat: "Nepal" },
            { q: "What is the largest city in Nepal by area?", a: ["Kathmandu", "Pokhara", "Biratnagar", "Dhangadhi"], c: 0, cat: "Nepal" },
            { q: "What is the national language of Nepal?", a: ["English", "Hindi", "Nepali", "Maithili"], c: 2, cat: "Nepal" },
            { q: "Which UNESCO World Heritage site is in Kathmandu?", a: ["Swayambhunath", "Taj Mahal", "Angkor Wat", "Borobudur"], c: 0, cat: "Nepal" },
            { q: "What is the currency of Nepal?", a: ["Rupee", "Taka", "Rupiah", "Dollar"], c: 0, cat: "Nepal" },
        ]
    };

    // ===== STATE =====
    let currentCategory = 'all';
    let questions = [];
    let currentIndex = 0;
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let answered = false;
    let timerInterval = null;
    let timeLeft = 15;

    // ===== ELEMENTS =====
    const screens = {
        start: document.getElementById('startScreen'),
        quiz: document.getElementById('quizScreen'),
        result: document.getElementById('resultScreen')
    };
    const startBtn = document.getElementById('startBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const homeBtn = document.getElementById('homeBtn');
    const catBtns = document.querySelectorAll('.cat-btn');
    const answerBtns = document.querySelectorAll('.answer-btn');

    // ===== CATEGORY SELECTION =====
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.cat;
        });
    });

    // ===== SCREEN MANAGEMENT =====
    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[name].classList.add('active');
    }

    // ===== START QUIZ =====
    function startQuiz() {
        if (currentCategory === 'all') {
            questions = [
                ...questionsDB.gk,
                ...questionsDB.tech,
                ...questionsDB.science,
                ...questionsDB.nepal
            ];
        } else {
            questions = [...questionsDB[currentCategory]];
        }

        // Shuffle
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }

        questions = questions.slice(0, 10);
        currentIndex = 0;
        score = 0;
        correctCount = 0;
        wrongCount = 0;

        document.getElementById('totalQ').textContent = questions.length;
        document.getElementById('score').textContent = '0';

        showScreen('quiz');
        loadQuestion();
    }

    // ===== LOAD QUESTION =====
    function loadQuestion() {
        answered = false;
        nextBtn.disabled = true;
        const q = questions[currentIndex];

        document.getElementById('currentQ').textContent = currentIndex + 1;
        document.getElementById('progressFill').style.width = ((currentIndex) / questions.length * 100) + '%';
        document.getElementById('qCategory').textContent = q.cat;
        document.getElementById('questionText').textContent = q.q;

        const letters = ['A', 'B', 'C', 'D'];
        answerBtns.forEach((btn, i) => {
            btn.className = 'answer-btn glass-card';
            btn.disabled = false;
            document.getElementById('ans' + i).textContent = q.a[i];
        });

        startTimer();
    }

    // ===== TIMER =====
    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 15;
        const timerBar = document.getElementById('timerBar');
        const timerText = document.getElementById('timerText');

        timerBar.style.width = '100%';
        timerBar.className = 'timer-bar';
        timerText.textContent = timeLeft + 's';

        timerInterval = setInterval(() => {
            timeLeft--;
            timerText.textContent = timeLeft + 's';
            timerBar.style.width = (timeLeft / 15 * 100) + '%';

            if (timeLeft <= 5) timerBar.className = 'timer-bar danger';
            else if (timeLeft <= 10) timerBar.className = 'timer-bar warning';

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);
    }

    function handleTimeout() {
        answered = true;
        wrongCount++;
        const q = questions[currentIndex];

        answerBtns.forEach((btn, i) => {
            btn.disabled = true;
            if (i === q.c) btn.classList.add('correct');
        });

        nextBtn.disabled = false;
    }

    // ===== ANSWER SELECTION =====
    answerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (answered) return;
            answered = true;
            clearInterval(timerInterval);

            const selected = parseInt(btn.dataset.index);
            const q = questions[currentIndex];

            answerBtns.forEach(b => b.disabled = true);

            if (selected === q.c) {
                btn.classList.add('correct');
                score += 10;
                correctCount++;
                document.getElementById('score').textContent = score;
            } else {
                btn.classList.add('wrong');
                answerBtns[q.c].classList.add('correct');
                wrongCount++;
            }

            nextBtn.disabled = false;
        });
    });

    // ===== NEXT QUESTION =====
    function nextQuestion() {
        currentIndex++;
        if (currentIndex >= questions.length) {
            showResults();
        } else {
            loadQuestion();
        }
    }

    // ===== SHOW RESULTS =====
    function showResults() {
        clearInterval(timerInterval);
        document.getElementById('progressFill').style.width = '100%';

        const accuracy = Math.round((correctCount / questions.length) * 100);

        document.getElementById('finalScore').textContent = score;
        document.getElementById('correctCount').textContent = correctCount;
        document.getElementById('wrongCount').textContent = wrongCount;
        document.getElementById('accuracy').textContent = accuracy + '%';

        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultSubtitle = document.getElementById('resultSubtitle');

        if (accuracy >= 90) {
            resultIcon.innerHTML = '<i class="fas fa-crown"></i>';
            resultTitle.textContent = 'Outstanding!';
            resultSubtitle.textContent = 'You\'re a genius!';
        } else if (accuracy >= 70) {
            resultIcon.innerHTML = '<i class="fas fa-trophy"></i>';
            resultTitle.textContent = 'Great Job!';
            resultSubtitle.textContent = 'Impressive performance!';
        } else if (accuracy >= 50) {
            resultIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
            resultTitle.textContent = 'Good Effort!';
            resultSubtitle.textContent = 'Keep learning and improving!';
        } else {
            resultIcon.innerHTML = '<i class="fas fa-book"></i>';
            resultTitle.textContent = 'Keep Practicing!';
            resultSubtitle.textContent = 'Every attempt makes you smarter!';
        }

        showScreen('result');
    }

    // ===== EVENT LISTENERS =====
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    playAgainBtn.addEventListener('click', () => {
        showScreen('start');
    });
    homeBtn.addEventListener('click', () => {
        showScreen('start');
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (screens.quiz.classList.contains('active') && !answered) {
            if (e.key >= '1' && e.key <= '4') {
                answerBtns[parseInt(e.key) - 1].click();
            }
        }
        if (e.key === 'Enter' && !nextBtn.disabled && screens.quiz.classList.contains('active')) {
            nextQuestion();
        }
    });

});
