const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const grass = document.querySelector('.grass');
const cloud = document.querySelector('.cloud');
const clouds = document.querySelector('.clouds');
const clouds2 = document.querySelector('.clouds-2');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);

}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const cloudPosition = cloud.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const clouds2Position = clouds2.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    if (pipePosition <= 85 && pipePosition > -10 && marioPosition < 64) {
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
            mario.classList.add('gameover');

            setInterval(() => {
                mario.style.animation = 'none';
                mario.style.bottom = `-80px`;
            }, 1500);

        }, 500);

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', jump);