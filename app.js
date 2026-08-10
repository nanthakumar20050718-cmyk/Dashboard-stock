const canvas = document.getElementById('signalCanvas');
const ctx = canvas.getContext('2d');
const consistencyValue = document.getElementById('consistencyValue');
const latencyValue = document.getElementById('latencyValue');
const meterFill = document.getElementById('meterFill');
const meterValue = document.getElementById('meterValue');
const signalStatus = document.getElementById('signalStatus');
const packetFlow = document.getElementById('packetFlow');
const logList = document.getElementById('logList');

const logMessages = [
  'Queue normalization complete',
  'Replica sync heartbeat active',
  'Forecast drift under threshold',
  'Security policy applied',
  'Routing preference rebalanced',
  'Cluster node self-healed'
];

let phase = 0;
let logIndex = 0;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function drawSignal(time) {
  const width = canvas.width;
  const height = canvas.height;
  const centerY = height / 2;
  const amplitude = 34 + Math.sin(time * 0.002) * 8;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(4, 7, 15, 0.72)';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#5fe3ff';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  for (let x = 0; x <= width; x += 12) {
    const y = centerY + Math.sin(x * 0.018 + phase) * amplitude + Math.sin(x * 0.005 + time * 0.0018) * 12;
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  const dotX = 0.78 * width + Math.sin(time * 0.0024 + phase) * 70;
  const dotY = centerY + Math.sin(dotX * 0.018 + phase) * amplitude + Math.sin(dotX * 0.005 + time * 0.0018) * 12;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
  ctx.fill();

  phase += 0.05;
}

function animate(now) {
  drawSignal(now);
  requestAnimationFrame(animate);
}

function updateMetrics() {
  consistencyValue.textContent = `${(99.9 + randomBetween(0.02, 0.08)).toFixed(2)}%`;
  latencyValue.textContent = `${Math.round(randomBetween(18, 28))} ms`;
  const meter = Math.round(randomBetween(58, 88));
  meterFill.style.width = `${meter}%`;
  meterValue.textContent = `${meter}%`;
  signalStatus.textContent = `+${randomBetween(0.04, 0.12).toFixed(2)}`;
  packetFlow.textContent = `${Math.round(randomBetween(78, 94))}%`;
}

function renderLogs() {
  const visibleLogs = [];
  for (let i = 0; i < 3; i += 1) {
    const index = (logIndex + i) % logMessages.length;
    visibleLogs.push(logMessages[index]);
  }

  logList.innerHTML = '';
  visibleLogs.forEach((message) => {
    const item = document.createElement('li');
    item.className = 'log-entry';
    item.textContent = message;
    logList.appendChild(item);
    requestAnimationFrame(() => item.classList.add('is-visible'));
  });
}

function cycleLogs() {
  logIndex = (logIndex + 1) % logMessages.length;
  renderLogs();
}

updateMetrics();
renderLogs();
requestAnimationFrame(animate);
setInterval(updateMetrics, 1800);
setInterval(cycleLogs, 1400);
