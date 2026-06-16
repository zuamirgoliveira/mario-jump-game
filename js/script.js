// script.js - Versão Refatorada

// ===== CONFIGURAÇÕES =====
const CONFIG = {
    gravity: 0.6,
    jumpForce: 12,
    pipeSpeed: 3,
    pipeInterval: 1500, // ms entre pipes
    groundHeight: 50, // altura do chão
};

// ===== ESTADO DO JOGO =====
const state = {
    isRunning: false,
    isJumping: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('marioHighScore')) || 0,
    pipeTimer: null,
    animationId: null,
    pipes: [],
    gameOver: false,
};

// ===== DOM REFS =====
const elements = {
    mario: document.querySelector('.mario'),
    pipe: document.querySelector('.pipe'), // pipe inicial
    grass: document.querySelector('.grass'),
    cloud: document.querySelector('.cloud'),
    clouds: document.querySelector('.clouds'),
    clouds2: document.querySelector('.clouds-2'),
    score: document.getElementById('score'),
    gameOver: document.getElementById('game-over'),
    btnStart: document.getElementById('btn-start-game'),
    logoImg: document.getElementById('logo-img'),
    gameOverImg: document.getElementById('game-over-img'),
    highScore: document.getElementById('high-score'), // novo
};

// ===== FUNÇÕES DO JOGO =====

// Pulo
const jump = () => {
    if (!state.isRunning || state.isJumping || state.gameOver) return;
    
    state.isJumping = true;
    let jumpCount = 0;
    const maxJump = 200; // altura máxima em px
    
    const jumpInterval = setInterval(() => {
        if (jumpCount >= maxJump) {
            clearInterval(jumpInterval);
            // Descida com gravidade
            const fallInterval = setInterval(() => {
                const currentBottom = parseInt(elements.mario.style.bottom) || 0;
                if (currentBottom <= 0) {
                    elements.mario.style.bottom = '0px';
                    state.isJumping = false;
                    clearInterval(fallInterval);
                } else {
                    elements.mario.style.bottom = `${currentBottom - CONFIG.gravity * 2}px`;
                }
            }, 16);
            return;
        }
        
        jumpCount += CONFIG.jumpForce;
        elements.mario.style.bottom = `${jumpCount}px`;
    }, 16);
};

// Criar pipe
const createPipe = () => {
    if (!state.isRunning || state.gameOver) return;
    
    const newPipe = document.createElement('img');
    newPipe.src = './images/mario-pipe.png';
    newPipe.className = 'pipe';
    newPipe.style.right = '-80px';
    newPipe.style.animation = 'none'; // controle manual
    
    document.querySelector('.game-board').appendChild(newPipe);
    state.pipes.push(newPipe);
};

// Atualizar pipes
const updatePipes = () => {
    state.pipes.forEach((pipe, index) => {
        const currentRight = parseInt(pipe.style.right) || -80;
        pipe.style.right = `${currentRight + CONFIG.pipeSpeed}px`;
        
        // Verificar colisão
        const marioRect = elements.mario.getBoundingClientRect();
        const pipeRect = pipe.getBoundingClientRect();
        
        if (checkCollision(marioRect, pipeRect)) {
            gameOver();
        }
        
        // Remover pipe fora da tela
        if (currentRight > window.innerWidth + 100) {
            pipe.remove();
            state.pipes.splice(index, 1);
            updateScore();
        }
    });
};

// Colisão precisa
const checkCollision = (rect1, rect2) => {
    const padding = 10; // margem de erro
    return rect1.x < rect2.x + rect2.width - padding &&
           rect1.x + rect1.width - padding > rect2.x &&
           rect1.y < rect2.y + rect2.height - padding &&
           rect1.y + rect1.height - padding > rect2.y;
};

// Atualizar score
const updateScore = () => {
    state.score++;
    elements.score.textContent = state.score;
};

// Game Over
const gameOver = () => {
    if (state.gameOver) return;
    
    state.gameOver = true;
    state.isRunning = false;
    
    // Atualizar high score
    if (state.score > state.highScore) {
        state.highScore = state.score;
        localStorage.setItem('marioHighScore', state.highScore);
    }
    
    // Mostrar game over
    elements.gameOverImg.src = './images/game_over.svg';
    elements.btnStart.style.visibility = 'visible';
    elements.mario.src = './images/mario-game-over.png';
    
    // Limpar loops
    state.pipes.forEach(pipe => pipe.remove());
    state.pipes = [];
    
    if (state.pipeTimer) clearInterval(state.pipeTimer);
    if (state.animationId) cancelAnimationFrame(state.animationId);
};

// Reset game
const resetGame = () => {
    // Resetar estado
    state.isRunning = false;
    state.isJumping = false;
    state.gameOver = false;
    state.score = 0;
    state.pipes = [];
    
    // Resetar elementos
    elements.mario.src = './images/mario-sprint.gif';
    elements.mario.style.bottom = '0px';
    elements.mario.className = 'mario';
    elements.gameOverImg.src = '';
    elements.btnStart.style.visibility = 'hidden';
    elements.score.textContent = '0';
    
    // Remover pipes extras
    document.querySelectorAll('.pipe').forEach(pipe => {
        if (pipe !== elements.pipe) pipe.remove();
    });
    
    // Resetar pipe original
    elements.pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    elements.pipe.style.right = '';
    elements.pipe.style.left = '';
    
    // Resetar nuvens
    elements.cloud.style.animation = 'clauds-animation 40s infinite linear';
    elements.clouds.style.animation = 'clauds-animation-2 30s infinite linear';
    elements.clouds2.style.animation = 'clauds-animation-3 15s infinite linear';
    
    // Iniciar jogo
    startGame();
};

// Iniciar jogo
const startGame = () => {
    if (state.isRunning) return;
    
    state.isRunning = true;
    state.gameOver = false;
    state.score = 0;
    elements.score.textContent = '0';
    elements.btnStart.style.visibility = 'hidden';
    elements.gameOverImg.src = '';
    
    // Loop principal com requestAnimationFrame
    let lastTime = 0;
    const gameLoop = (timestamp) => {
        if (!state.isRunning) return;
        
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        
        updatePipes();
        
        state.animationId = requestAnimationFrame(gameLoop);
    };
    
    state.animationId = requestAnimationFrame(gameLoop);
    
    // Gerar pipes periodicamente
    if (state.pipeTimer) clearInterval(state.pipeTimer);
    state.pipeTimer = setInterval(createPipe, CONFIG.pipeInterval);
};

// ===== EVENT LISTENERS =====
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        jump();
    }
});

// Touch suporte (mobile)
document.addEventListener('touchstart', (e) => {
    e.preventDefault();
    jump();
});

// Botão start
elements.btnStart.addEventListener('click', resetGame);

// ===== INICIALIZAÇÃO =====
// Mostrar high score
const highScoreDisplay = document.createElement('div');
highScoreDisplay.id = 'high-score';
highScoreDisplay.style.cssText = `
    color: white;
    position: absolute;
    top: 40px;
    right: 10px;
    font-family: Verdana, sans-serif;
    font-weight: bold;
    font-size: 14px;
`;
highScoreDisplay.textContent = `🏆 High: ${state.highScore}`;
document.querySelector('.game-board').appendChild(highScoreDisplay);

// Iniciar automaticamente
setTimeout(startGame, 500);
