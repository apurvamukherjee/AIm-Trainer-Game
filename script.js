const box = document.getElementById('box');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const pauseButton = document.getElementById('pause-btn');
const startButton = document.getElementById('start-btn');
const gameArea = document.getElementById('game-area');
const timerElement = document.getElementById('time-left');
const highscoreElement = document.getElementById('highscore');
const level1Button = document.getElementById('level-1-btn');
const level2Button = document.getElementById('level-2-btn');
const level3Button = document.getElementById('level-3-btn');

let score = 0;
let gameInterval;
let timerInterval;
let timeLeft = 10;
let highScore = localStorage.getItem('highscore') || 0;
let level = 1;
let gameActive = false;
let gamePaused = false;

highscoreElement.textContent = highScore;

function startGame() {
    score = 0;
    timeLeft = 10;
    gameActive = true;
    gamePaused = false;
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    moveBox();
    updateLevelSettings();
    gameInterval = setInterval(moveBox, 1000);
    timerInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
    restartButton.disabled = false;
    pauseButton.textContent = 'Pause Game';
}

function pauseGame() {
    if (gamePaused) {
        // Resume game
        gamePaused = false;
        gameInterval = setInterval(moveBox, 1000);
        timerInterval = setInterval(updateTimer, 1000);
        pauseButton.textContent = 'Pause Game';
    } else {
        // Pause game
        gamePaused = true;
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        pauseButton.textContent = 'Resume Game';
    }
}

function moveBox() {
    if (!gameActive || gamePaused) return;

    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;

    const randomX = Math.floor(Math.random() * (gameAreaWidth - box.offsetWidth));
    const randomY = Math.floor(Math.random() * (gameAreaHeight - box.offsetHeight));

    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;
}

box.addEventListener('click', () => {
    if (!gameActive || gamePaused) return; // Prevent clicks if the game is not active or paused

    score++;
    scoreElement.textContent = score;

    if (score > highScore) {
        highScore = score;
        highscoreElement.textContent = highScore;
        localStorage.setItem('highscore', highScore);
    }
});

function updateTimer() {
    if (!gameActive || gamePaused) return;

    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        clearInterval(gameInterval);
        gameActive = false;
        alert(`Game Over! Your final score is: ${score}`);
        startButton.disabled = false;
        pauseButton.disabled = true;
        restartButton.disabled = false;
    }
}

function updateLevelSettings() {
    if (level === 1) {
        box.style.width = '40px';
        box.style.height = '40px';
        clearInterval(gameInterval);
        gameInterval = setInterval(moveBox, 1000);
    } else if (level === 2) {
        box.style.width = '30px';
        box.style.height = '30px';
        clearInterval(gameInterval);
        gameInterval = setInterval(moveBox, 800);
    } else if (level === 3) {
        box.style.width = '20px';
        box.style.height = '20px';
        clearInterval(gameInterval);
        gameInterval = setInterval(moveBox, 600);
    }
}

level1Button.addEventListener('click', () => {
    level = 1;
    updateLevelSettings();
});

level2Button.addEventListener('click', () => {
    level = 2;
    updateLevelSettings();
});

level3Button.addEventListener('click', () => {
    level = 3;
    updateLevelSettings();
});

pauseButton.addEventListener('click', pauseGame);

restartButton.addEventListener('click', () => {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    startGame();
});

startButton.addEventListener('click', startGame);
