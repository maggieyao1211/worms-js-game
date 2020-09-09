import Minion from './minion';
import Banana from './banana';

class Game {
  constructor(canvas) {
    this.canvas = canvas;

    const minionImg = new Image();
    minionImg.src = './dist/assets/minions.png';
    this.minion = new Minion(minionImg);

    document.addEventListener('keydown', e => this.keyDownHandler(e), false);

    this.bananas = [];

    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate.bind(this));
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
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.minion.draw(ctx, time);

    // clear outdated bananas
    while (this.bananas.length > 0 && (new Date().getTime() / 1000 - this.bananas[0].releaseTime) >= 20) {
      this.bananas.shift();
    }

    this.bananas.forEach(banana => banana.draw(ctx, time));

    requestAnimationFrame(this.animate);
  }
}

export default Game;