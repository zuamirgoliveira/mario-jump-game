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

const jump = () => {
    mario.classList.add('jump');
    
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);

}

const loopScore = setInterval(() => {

    score.innerHTML++;
    
}, 100);

const loop = setInterval(() => {
    
    const pipePosition = pipe.offsetLeft;
    const cloudPosition = cloud.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const clouds2Position = clouds2.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    
    if (pipePosition <= 85 && pipePosition > 10 && marioPosition < 50) {
        
        gameOverImg.src = './images/game_over.svg';
        btnStartGame.style.visibility = 'visible';

        pipe.style.animation = 'none';
        cloud.style.animation = 'none';
        clouds.style.animation = 'none';
        clouds2.style.animation = 'none';
        
        pipe.style.left = `${pipePosition}px`;
        mario.style.bottom = `${marioPosition}px`;
        cloud.style.left = `${cloudPosition}px`;
        clouds.style.left = `${cloudsPosition}px`;
        clouds2.style.left = `${clouds2Position}px`;

        mario.src = './images/mario-game-over.png';

        setTimeout(() => {
            mario.classList.add('game-over');
            setInterval(() => {
                mario.style.animation = 'none';
                mario.style.bottom = `-80px`;
            }, 1500);

        }, 500);

        clearInterval(loop);
        clearInterval(loopScore);
    }

}, 10);

const startGame = () =>  {
    btnStartGame.style.display = 'hidden';
    location.reload();
  }


document.addEventListener('keydown', jump);