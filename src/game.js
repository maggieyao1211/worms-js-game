import Minion from './minion';
import Banana from './banana';
import Worm from './worm';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    const minionImg = new Image();
    minionImg.src = './dist/assets/minion.png';
    this.minion = new Minion(minionImg);

    this.bananas = [];

    this.worms = [];

    this.lastWormBornTime = new Date().getTime() / 1000;

    document.addEventListener('keydown', e => this.keyDownHandler(e), false);

    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate);
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
        default:
          break;
    }
  } 

  animate(time) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.minion.draw(this.ctx);

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
      this.worms.push(new Worm(wormImg, 2400, 810, 1));
    }

    this.worms.forEach(worm => worm.draw(this.ctx));

    requestAnimationFrame(this.animate);
  }
}

export default Game;