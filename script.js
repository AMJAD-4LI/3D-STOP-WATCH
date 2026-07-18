// Stopwatch functionality
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// DOM elements
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

// Format time with leading zeros
function formatTime(time) {
    return time.toString().padStart(2, '0');
}

// Update display
function updateDisplay() {
    const time = Date.now() - startTime + elapsedTime;
    
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

// Start stopwatch
function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        startBtn.disabled = true;
        startBtn.style.opacity = '0.5';
        startBtn.style.cursor = 'not-allowed';
        stopBtn.disabled = false;
        stopBtn.style.opacity = '1';
        stopBtn.style.cursor = 'pointer';
    }
}

// Stop stopwatch
function stopStopwatch() {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
        startBtn.style.cursor = 'pointer';
        stopBtn.disabled = true;
        stopBtn.style.opacity = '0.5';
        stopBtn.style.cursor = 'not-allowed';
    }
}

// Reset stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    
    startBtn.disabled = false;
    startBtn.style.opacity = '1';
    startBtn.style.cursor = 'pointer';
    stopBtn.disabled = true;
    stopBtn.style.opacity = '0.5';
    stopBtn.style.cursor = 'not-allowed';
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

// Initialize button states
stopBtn.disabled = true;
stopBtn.style.opacity = '0.5';
stopBtn.style.cursor = 'not-allowed';

// Add particle elements dynamically
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = -Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
createParticles();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!isRunning) {
            startStopwatch();
        } else {
            stopStopwatch();
        }
    } else if (e.code === 'KeyR') {
        resetStopwatch();
    }
});
