const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const grass = document.querySelector('.grass');
const cloud = document.querySelector('.cloud');
const clouds = document.querySelector('.clouds');
const clouds2 = document.querySelector('.clouds-2');
const score = document.getElementById('score');
const gameOver = document.getElementById('game-over');
const looseMessage = document.getElementById('loose');
const btnStartGame = document.getElementById('btn-start-game');
const logoImg = document.getElementById('logo-img');
const gameOverImg = document.getElementById('game-over-img');
const pressKeyMessage = document.getElementById('press-key-message');

// Audio Context para sons
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playJumpSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function playGameOverSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.8);
}

function playNightSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Som grave e longo - trovão
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
}

function playDaySound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Som agudo e alegre - passarinho
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

function createJumpParticles() {
    const gameBoard = document.querySelector('.game-board');
    const marioLeft = 50;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#8B7355';
        particle.style.left = `${marioLeft + 20}px`;
        particle.style.bottom = '5px';
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '3';
        particle.style.pointerEvents = 'none';
        
        gameBoard.appendChild(particle);
        
        const angle = (Math.random() * 60 + 210) * (Math.PI / 180);
        const distance = 15 + Math.random() * 25;
        const moveX = Math.cos(angle) * distance;
        const moveY = 10 + Math.random() * 30;
        
        particle.animate([
            {
                transform: 'translate(0px, 0px)',
                opacity: 1
            },
            {
                transform: `translate(${moveX}px, -${moveY}px)`,
                opacity: 0.5,
                offset: 0.3
            },
            {
                transform: `translate(${moveX * 1.5}px, -${moveY * 0.3}px)`,
                opacity: 0
            }
        ], {
            duration: 300 + Math.random() * 200,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Controle do modo noturno
let isNight = false;

function updateBackground() {
    const gameBoard = document.querySelector('.game-board');
    
    const shouldBeNight = Math.floor(scoreCount / 10) % 2 === 1;
    
    if (shouldBeNight && !isNight) {
        // Efeito de raio antes de escurecer
        flashLightning(() => {
            // Modo noite após o raio
            gameBoard.style.background = 'linear-gradient(#1a1a2e, #16213e)';
            createStars();
            isNight = true;
            playNightSound();
            updateCloudsNightMode(true); // 🌙 Nuvens escuras
        });
        
    } else if (!shouldBeNight && isNight) {
        // Modo dia
        gameBoard.style.background = 'linear-gradient(#87CEEB, #E0F6FF)';
        removeStars();
        isNight = false;
        playDaySound();
        updateCloudsNightMode(false); // ☀️ Nuvens claras
    }
}

// NOVA FUNÇÃO: Controla a aparência das nuvens
function updateCloudsNightMode(isNight) {
    if (isNight) {
        // Nuvens ficam acinzentadas e mais transparentes
        cloud.style.filter = 'brightness(0.4) opacity(0.6)';
        clouds.style.filter = 'brightness(0.4) opacity(0.6)';
        clouds2.style.filter = 'brightness(0.4) opacity(0.6)';
    } else {
        // Nuvens voltam ao normal
        cloud.style.filter = 'brightness(1) opacity(1)';
        clouds.style.filter = 'brightness(1) opacity(1)';
        clouds2.style.filter = 'brightness(1) opacity(1)';
    }
}

function flashLightning(callback) {
    const gameBoard = document.querySelector('.game-board');
    let flashes = 0;
    const maxFlashes = 3;
    
    const lightningInterval = setInterval(() => {
        if (flashes >= maxFlashes) {
            clearInterval(lightningInterval);
            if (callback) callback();
            return;
        }
        
        // Flash branco
        gameBoard.style.background = 'linear-gradient(#ffffff, #f0f0f0)';
        
        setTimeout(() => {
            // Volta para transição
            gameBoard.style.background = 'linear-gradient(#4a4a6e, #2a2a4e)';
        }, 50);
        
        flashes++;
    }, 150);
}

function createStars() {
    const gameBoard = document.querySelector('.game-board');
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.zIndex = '0';
        star.style.opacity = '0';
        star.style.transition = 'opacity 2s ease';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 60}%`;
        
        gameBoard.appendChild(star);
        
        setTimeout(() => {
            star.style.opacity = '1';
        }, 100);
    }
}

function removeStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.opacity = '0';
        setTimeout(() => {
            star.remove();
        }, 2000);
    });
}

let gameActive = false;
let scoreCount = 0;
let pipePassed = false;

// Carregar high score do localStorage
let highScore = localStorage.getItem('marioJumpHighScore') || 0;
highScore = parseInt(highScore);

function updateHighScoreDisplay() {
    const highScoreElement = document.getElementById('high-score');
    if (highScoreElement) {
        highScoreElement.innerHTML = highScore;
        
        highScoreElement.style.transition = 'none';
        highScoreElement.style.transform = 'scale(1.5)';
        highScoreElement.style.color = '#FFD700';
        
        setTimeout(() => {
            highScoreElement.style.transition = 'all 0.3s ease-out';
            highScoreElement.style.transform = 'scale(1)';
            highScoreElement.style.color = 'white';
        }, 50);
    }
}

const jump = () => {
    if (!gameActive) {
        // Se o jogo não começou, inicia ao pressionar qualquer tecla
        if (pressKeyMessage.style.display !== 'none') {
            startGameFirstTime();
        }
        return;
    }
    
    mario.classList.add('jump');
    playJumpSound();
    createJumpParticles();
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    if (!gameActive) return;
    
    const pipePosition = pipe.offsetLeft;
    const cloudPosition = cloud.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const clouds2Position = clouds2.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    // Verificar se o Mario passou pelo pipe
    if (pipePosition < 50 && pipePosition > 0 && !pipePassed) {
        scoreCount++;
        score.innerHTML = scoreCount;
        pipePassed = true;
        
        // Atualizar tema noite/dia
        updateBackground();
        
        // Efeito visual ao pontuar
        score.style.transition = 'none';
        score.style.transform = 'scale(1.8)';
        score.style.color = '#FFD700';
        
        setTimeout(() => {
            score.style.transition = 'all 0.3s ease-out';
            score.style.transform = 'scale(1)';
            score.style.color = 'white';
        }, 50);
        
        // Atualizar high score em tempo real
        if (scoreCount > highScore) {
            highScore = scoreCount;
            localStorage.setItem('marioJumpHighScore', highScore);
            updateHighScoreDisplay();
        }
    }
    
    // Resetar a flag quando um novo pipe aparece
    if (pipePosition > 80) {
        pipePassed = false;
    }
    
    // Verificar colisão
    if (pipePosition <= 85 && pipePosition > 10 && marioPosition < 50) {
        gameActive = false;
        playGameOverSound();
        
        if (scoreCount > highScore) {
            highScore = scoreCount;
            localStorage.setItem('marioJumpHighScore', highScore);
        }
        
        gameOverImg.src = './images/game_over.svg';
		gameOverImg.style.display = 'block';
        btnStartGame.style.visibility = 'visible';

        pipe.style.animation = 'none';
        grass.style.animation = 'none';
        cloud.style.animation = 'none';
        clouds.style.animation = 'none';
        clouds2.style.animation = 'none';
        
        pipe.style.left = `${pipePosition}px`;
        mario.style.bottom = `${marioPosition}px`;
        cloud.style.left = `${cloudPosition}px`;
        clouds.style.left = `${cloudsPosition}px`;
        clouds2.style.left = `${clouds2Position}px`;

        mario.src = './images/mario-game-over.png';
        mario.classList.remove('jump');

        setTimeout(() => {
            mario.classList.add('game-over');
            setTimeout(() => {
                mario.style.animation = 'none';
                mario.style.bottom = '-80px';
            }, 1500);
        }, 500);

        clearInterval(loop);
    }
}, 10);

const startGame = () =>  {
    btnStartGame.style.visibility = 'hidden';
    gameActive = true;
    scoreCount = 0;
    score.innerHTML = '0';
    pipePassed = false;
    isNight = false;
	gameOverImg.style.display = 'none';
	
	cloud.style.filter = 'brightness(1) opacity(1)';
    clouds.style.filter = 'brightness(1) opacity(1)';
    clouds2.style.filter = 'brightness(1) opacity(1)';
    
    location.reload();
}

function startGameFirstTime() {
    pressKeyMessage.style.display = 'none';
    gameActive = true;
    // O jogo já está rodando, só esconder a mensagem
}

// Inicializar high score display
updateHighScoreDisplay();

document.addEventListener('keydown', jump);