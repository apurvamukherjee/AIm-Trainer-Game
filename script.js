const box = document.getElementById('box');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const gameArea = document.getElementById('game-area');
const timerElement = document.getElementById('time-left');
const startButton = document.getElementById('start-btn');
const highscoreElement = document.getElementById('highscore');

let score = 0;
let gameInterval;
let timerInterval;
let timeLeft = 10; // Set the timer to 10 seconds
let highScore = localStorage.getItem('highscore') || 0; // Retrieve high score from localStorage

highscoreElement.textContent = highScore;

// Function to start the game
function startGame() {
    score = 0;
    timeLeft = 10; // Reset the timer to 10 seconds
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    moveBox();
    gameInterval = setInterval(moveBox, 1000);
    timerInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
    restartButton.disabled = false;
}

// Function to move the box to a random position
function moveBox() {
    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;

    const randomX = Math.floor(Math.random() * (gameAreaWidth - box.offsetWidth));
    const randomY = Math.floor(Math.random() * (gameAreaHeight - box.offsetHeight));

    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;
}

// Function to update score
box.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
    if (score > highScore) {
        highScore = score;
        highscoreElement.textContent = highScore;
        localStorage.setItem('highscore', highScore); // Save high score in localStorage
    }
});

function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        clearInterval(gameInterval);
        alert("Game Over! Your final score is: " + score);
        startButton.disabled = false;
        restartButton.disabled = false;
    }
}

restartButton.addEventListener('click', () => {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    startGame();
});

startButton.addEventListener('click', startGame);
