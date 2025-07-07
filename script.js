// game.js

function choose(faction) {
  document.getElementById('choices').style.display = 'none';

  if (faction === 'anjos') {
    document.getElementById('text').textContent = "Você foi aceito pelos anjos. Mas há um teste: derrote o Guardião da Pureza.";
  } else {
    document.getElementById('text').textContent = "Os demônios te acolhem. Mas primeiro, prove sua força contra o General Infernal.";
  }

  // Começar batalha
  setTimeout(startBattle, 3000);
}

function startBattle() {
  document.getElementById('story').style.display = 'none';
  document.getElementById('battleCanvas').style.display = 'block';
  document.getElementById('battleText').style.display = 'block';

  const canvas = document.getElementById('battleCanvas');
  const ctx = canvas.getContext('2d');

  let player = { x: 180, y: 180, size: 20 };
  let bullets = [];

  document.addEventListener('keydown', movePlayer);

  function movePlayer(e) {
    if (e.key === 'ArrowLeft') player.x -= 10;
    if (e.key === 'ArrowRight') player.x += 10;
    if (e.key === 'ArrowUp') player.y -= 10;
    if (e.key === 'ArrowDown') player.y += 10;
  }

  function spawnBullet() {
    bullets.push({ x: Math.random() * 380, y: 0, size: 10, speed: 2 + Math.random() * 2 });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // player
    ctx.fillStyle = 'cyan';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // bullets
    ctx.fillStyle = 'red';
    bullets.forEach((b, i) => {
      b.y += b.speed;
      ctx.fillRect(b.x, b.y, b.size, b.size);

      // colisão
      if (
        b.x < player.x + player.size &&
        b.x + b.size > player.x &&
        b.y < player.y + player.size &&
        b.y + b.size > player.y
      ) {
        endBattle();
      }

      // remove se sair da tela
      if (b.y > canvas.height) bullets.splice(i, 1);
    });

    requestAnimationFrame(update);
  }

  setInterval(spawnBullet, 500);
  update();
}

function endBattle() {
  alert("Você foi atingido! Fim da batalha.");
  location.reload();
}