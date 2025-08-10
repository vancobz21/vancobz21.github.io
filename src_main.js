// Handle setup screen, language, and game init
const $ = s => document.querySelector(s);

let currentLang = 'th';

function setLang(lang) {
  currentLang = lang;
  const t = window.i18n[lang];
  $('#appTitle').textContent = t.appTitle;
  $('#playerCountLabel').textContent = t.playerCountLabel;
  $('#languageLabel').textContent = t.languageLabel;
  $('#startGame').textContent = t.startGame;
  $('#restartBtn').textContent = t.restart;
  $('#fullscreenBtn').textContent = t.fullscreen;
  $('#randomBtn').textContent = t.random;
}
$('#language').addEventListener('change', e => setLang(e.target.value));

document.addEventListener('DOMContentLoaded', () => {
  setLang($('#language').value);

  $('#startGame').onclick = () => {
    const playerCount = parseInt($('#playerCount').value, 10);
    window.startGame(playerCount, currentLang);
    $('#setupScreen').classList.add('hidden');
    $('#gameScreen').classList.remove('hidden');
  };

  $('#restartBtn').onclick = () => location.reload();

  // Burger menu
  $('#burgerMenuBtn').onclick = () => $('#burgerMenu').classList.toggle('hidden');
  document.body.onclick = e => {
    if (!e.target.closest('#burgerMenu') && e.target.id!=='burgerMenuBtn') {
      $('#burgerMenu').classList.add('hidden');
    }
  };

  // Fullscreen toggle
  $('#fullscreenBtn').onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      $('#fullscreenBtn').textContent = window.i18n[currentLang].exitFullscreen;
    } else {
      document.exitFullscreen();
      $('#fullscreenBtn').textContent = window.i18n[currentLang].fullscreen;
    }
  };

  // Random button
  $('#randomBtn').onclick = () => {
    const n = parseInt(window.gameState.playerCount, 10) + 2;
    const rand = Math.floor(Math.random() * n) + 1;
    $('#randomNumber').textContent = rand;
    $('#randomOverlay').classList.remove('hidden');
    setTimeout(() => $('#randomOverlay').classList.add('hidden'), 3000);
  };

  // Close modal
  $('#closeModalBtn').onclick = () => location.reload();
});