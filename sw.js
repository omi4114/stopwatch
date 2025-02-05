let startTime = null;
let elapsedTime = 0;
let timerInterval = null;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const laps = document.getElementById('laps');

// Function to format the elapsed time
function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Function to update the stopwatch display
function updateDisplay() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start button event listener
startBtn.addEventListener('click', () => {
    startTime = new Date().getTime() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
});

// Pause button event listener
pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

// Reset button event listener
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00.000';
    laps.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
});

// Lap button event listener
lapBtn.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.childElementCount + 1}: ${lapTime}`;
    laps.appendChild(lapItem);
});
