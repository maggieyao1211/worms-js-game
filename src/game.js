import Minion from './minion';
import Banana from './banana';
import Worm from './worm';
import { backgroundMusic, gameOverMusic, wormHurtSound } from './sounds';

class Game {
  constructor(canvas, musicController, soundController) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.isMusicOn = true;
    this.musicController = musicController;
    this.musicController.onclick = () => { 
      this.isMusicOn = !this.isMusicOn;
      this.musicController.innerHTML = this.isMusicOn ? 'Music: On' : 'Music: Off';
      if (this.isMusicOn) {
        this.backgroundMusic.play(this.isMusicOn);
      } else {
        this.backgroundMusic.pause();
      }
    };

    this.isSoundOn = true;
    this.soundController = soundController;
    this.soundController.onclick = () => { 
      this.isSoundOn = !this.isSoundOn;
      this.soundController.innerHTML = this.isSoundOn ? 'Sound: On' : 'Sound: Off';
    };

    this.isGameStarted = false;

    this.backgroundMusic = backgroundMusic;

    const minionImg = new Image();
    minionImg.src = './dist/assets/minion.png';
    this.minion = new Minion(minionImg);

    this.reset();

    document.addEventListener('keydown', e => this.keyDownHandler(e), false);

    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate);
  }

  reset() {
    this.score = 0;
    this.kills = 0;

    this.bananas = [];

    this.worms = [];

    this.lastWormBornTime = new Date().getTime() / 1000;
    this.lastWormWithGolfBornTime = new Date().getTime() / 1000;

    this.hasGameOverMusicPlayed = false;
  }

  keyDownHandler(e) {
    e.preventDefault();
    const keyCode = e.keyCode;
    switch (keyCode) {
        case 74: // 'J'
        case 75: // 'K'
          const img = new Image();
          img.src = './dist/assets/banana.png';
          const banana = new Banana(img, this.minion, keyCode === 74 ? 1 : -1);
          this.bananas.push(banana);
          break;
        case 32: // 'Space'
          this.isGameStarted = !this.isGameStarted;
          if (this.isGameStarted) {
            this.backgroundMusic.play(this.isMusicOn);
          } else {
            this.backgroundMusic.pause(this.isMusicOn);
          }
          if (this.minion.health <= 0) {
            this.minion.health = 500;
            this.reset();
          }
          break;
        default:
          break;
    }
  } 

  animate(time) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.minion.health <= 0) {
      this.ctx.fillStyle = "Yellow";
      this.ctx.font = "64px 'Grandstander', cursive";
      this.ctx.fillText("Game Over", 920, 200);
      this.ctx.fillText("Score:", 940, 300);
      this.ctx.fillText(this.score, 1140, 300);
      this.ctx.fillText("Kills:", 964, 400);
      this.ctx.fillText(this.kills, 1140, 400);
      this.backgroundMusic.pause();
      if (!this.hasGameOverMusicPlayed) {
        gameOverMusic.play(this.isMusicOn);
        this.hasGameOverMusicPlayed = true;
      }
      this.isGameStarted = false;
    }

    if (this.isGameStarted) {
    this.minion.draw(this.ctx);

    this.ctx.fillStyle = "Yellow";
    this.ctx.font = "20px 'Grandstander', cursive";
    this.ctx.fillText("Health:", 50, 55);
    this.ctx.fillRect(125, 35, this.minion.health, 30);

    this.ctx.fillText("Score:", 50, 95);
    this.ctx.fillText(this.score, 125, 95);

    this.ctx.fillText("Kills:", 50, 130);
    this.ctx.fillText(this.kills, 125, 130);

    // clear outdated bananas
    const currentTime = new Date().getTime() / 1000;
    while (this.bananas.length > 0 && (currentTime - this.bananas[0].releaseTime) >= 20) {
      this.bananas.shift();
    }

    this.bananas.forEach(banana => banana.draw(this.ctx, time));

    // clear outdated worms
    while (this.worms.length > 0 && (currentTime - this.worms[0].bornTime) >= 60) {
      this.worms.shift();
    }

    if (currentTime - this.lastWormBornTime >= 5) {
      this.lastWormBornTime = currentTime;
      const wormImg = new Image();
      wormImg.src = './dist/assets/worm.png';
      this.worms.push(new Worm(wormImg, 2400, 810, 100, 80, 50, 1));
    }
    if (currentTime - this.lastWormWithGolfBornTime >= 4) {
      this.lastWormWithGolfBornTime = currentTime;
      const wormImg = new Image();
      wormImg.src = './dist/assets/worm_with_golf.png';
      this.worms.push(new Worm(wormImg, 0, 820, 140, 120, 40, -1));
    }

    this.deadWorms = [];
    this.worms.forEach((worm, i) => {
      this.bananas.forEach(banana => {
        if (worm.collideWithBanana(banana)) {
          wormHurtSound.play(this.isSoundOn);
          this.deadWorms.push(i);
          this.score += worm.score;
          this.kills += 1;
        }
      });
      if (this.minion.collideWithWorm(worm)) {
        wormHurtSound.play(this.isSoundOn);
        this.deadWorms.push(i);
        this.minion.health -= 100;
      }
    });

    this.worms = this.worms.filter((_worm, i) => !this.deadWorms.includes(i));
    this.deadWorms = [];

    this.worms.forEach(worm => worm.draw(this.ctx));
    } else {
      this.ctx.fillStyle = "Yellow";
      this.ctx.font = "64px 'Grandstander', cursive";
      this.ctx.fillText("Press 'Space' to Start/Pause", 670, 500);
    }

    requestAnimationFrame(this.animate);
  }
}

export default Game;