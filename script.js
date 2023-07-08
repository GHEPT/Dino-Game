const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let contador = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jogar() {
	window.addEventListener('load', () => {
  	const audio = document.getElementById('myAudio');
  	audio.play();
	});
	window.location.reload();
  	return false;
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 130) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          //descendo
          position -= 15;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // subindo
      position += 15;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1850;
  let randomTime = Math.random() * 3000;

  cactus.classList.add('cactus');
  cactus.style.left = 1300 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    cactusPosition -= 5;
    cactus.style.left = cactusPosition + 'px';

    if (cactusPosition < 10) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML =
        '<h1 class="over">GAME OVER</h1><button id="play">Play</button>';
    } else {
      cactusPosition -= 5;
      cactus.style.left = cactusPosition + 'px';
      let botao = document.getElementById('play');
      botao.addEventListener('click', jogar);
      clearInterval(leftInterval);
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);
