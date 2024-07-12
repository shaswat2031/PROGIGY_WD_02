let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        startStopBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        startStopBtn.classList.remove('bg-blue-500', 'hover:bg-blue-700');
        startStopBtn.classList.add('bg-yellow-500', 'hover:bg-yellow-700');
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        startStopBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-700');
        startStopBtn.classList.add('bg-blue-500', 'hover:bg-blue-700');
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = '00:00:00.000';
    startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    startStopBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-700');
    startStopBtn.classList.add('bg-blue-500', 'hover:bg-blue-700');
    lapsList.innerHTML = '';
    lapCounter = 0;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.innerHTML}`;
        lapsList.appendChild(lapTime);
    }
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
