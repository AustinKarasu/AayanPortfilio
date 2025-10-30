// ===== Cursor Trail Effect =====
const canvas = document.getElementById('cursorTrail');
const ctx = canvas.getContext('2d');

let particles = [];
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(x, y) {
  particles.push({
    x,
    y,
    size: random(2, 5),
    alpha: 1,
    dx: random(-1, 1),
    dy: random(-1, 1),
    color: `hsl(${random(0, 10)}, 100%, 50%)`
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 0, 0, ${p.alpha})`;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    p.alpha -= 0.02;
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(drawParticles);
}

window.addEventListener('mousemove', e => {
  for (let i = 0; i < 4; i++) createParticle(e.clientX, e.clientY);
});

window.addEventListener('touchmove', e => {
  const touch = e.touches[0];
  for (let i = 0; i < 4; i++) createParticle(touch.clientX, touch.clientY);
});

drawParticles();
