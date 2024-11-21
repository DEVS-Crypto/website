const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-btn");
const scoreContainer = document.getElementById("score");
const timerContainer = document.getElementById("timer");

let gameInterval;
let score = 0;
let timer = 30;

// Function to create an item (developer or bug)
function createItem() {
    const item = document.createElement("div");
    const isBug = Math.random() < 0.3; // 30% chance of being a bug
    item.classList.add("item");

    // Set item image
    const img = document.createElement("img");
    img.src = isBug ? "bug.png" : "developer.png"; // Bug or Developer
    item.appendChild(img);

    // Set position
    item.style.left = Math.random() * (gameArea.offsetWidth - 60) + "px";
    item.style.top = "-70px";

    // Add click event
    item.addEventListener("click", () => {
        if (isBug) {
            score = Math.max(0, Math.floor(score / 2)); // Deduct half the score
            navigator.vibrate(200); // Vibrate on bug click
            triggerExplosion(item); // Trigger explosion effect
        } else {
            score += 10; // Add score for developer
            item.classList.add("shrink"); // Shrink effect
            setTimeout(() => item.remove(), 300); // Remove after animation
        }
        updateScore();
    });

    gameArea.appendChild(item);

    // Remove item after animation ends
    item.addEventListener("animationend", () => item.remove());
}

// Trigger explosion effect
function triggerExplosion(item) {
    const explosion = document.createElement("div");
    explosion.classList.add("explosion");
    explosion.style.left = item.style.left; // Position it where the bug was
    explosion.style.top = item.style.top;

    gameArea.appendChild(explosion);

    // Remove the explosion after the animation ends
    setTimeout(() => explosion.remove(), 500);

    // Remove the bug
    item.remove();
}

// Update score display
function updateScore() {
    scoreContainer.textContent = score;
}

// Update timer display
function updateTimer() {
    timerContainer.textContent = timer;
}

// Start the game
function startGame() {
    score = 0;
    timer = 30;
    updateScore();
    updateTimer();

    startButton.style.display = "none";

    // Spawn items every 800ms
    gameInterval = setInterval(() => {
        createItem();
    }, 800);

    // Countdown timer
    const timerInterval = setInterval(() => {
        timer -= 1;
        updateTimer();

        if (timer <= 0) {
            clearInterval(gameInterval); // Stop spawning items
            clearInterval(timerInterval); // Stop the timer
            alert(`Game Over! Final Score: ${score}`);
            resetGame();
        }
    }, 1000);
}

// Reset the game
function resetGame() {
    gameArea.innerHTML = ""; // Clear the game area
    gameArea.appendChild(scoreContainer); // Add the score display back
    gameArea.appendChild(timerContainer); // Add the timer display back
    gameArea.appendChild(startButton); // Add the start button back
    startButton.style.display = "block";
}

// Add event listener to start button
startButton.addEventListener("click", startGame);
