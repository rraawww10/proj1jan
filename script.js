const form = document.getElementById('timer-form');
const timersList = document.getElementById('timers-list');
let timers = [];

form.addEventListener('submit', (e) => e.preventDefault());

document.getElementById('start-timer').addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds > 0) {
    startTimer(totalSeconds);
    form.reset();
  }
});

function startTimer(duration) {
  const timerId = `timer-${Date.now()}`;
  const timerElement = document.createElement('div');
  timerElement.classList.add('timer');
  timerElement.setAttribute('id', timerId);

  timerElement.innerHTML = `
    <span>${formatTime(duration)}</span>
    <button onclick="stopTimer('${timerId}')">Stop Timer</button>
  `;

  timersList.appendChild(timerElement);

  const interval = setInterval(() => {
    if (duration <= 0) {
      clearInterval(interval);
      timerElement.classList.add('ended');
      timerElement.querySelector('span').textContent = 'Time’s up!';
      playAlert();
    } else {
      duration--;
      timerElement.querySelector('span').textContent = formatTime(duration);
    }
  }, 1000);

  timers.push({ id: timerId, interval });
}

function stopTimer(timerId) {
  const timer = timers.find((t) => t.id === timerId);
  if (timer) {
    clearInterval(timer.interval);
    timers = timers.filter((t) => t.id !== timerId);
    document.getElementById(timerId).remove();
  }
}

function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function playAlert() {
  const audio = new Audio('alert.mp3'); // Add your audio file
  audio.play();
}
