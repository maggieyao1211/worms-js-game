import Minion from './minion';
import Banana from './banana';
import Worm from './worm';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.score = 0;
    this.kills = 0;

    const minionImg = new Image();
    minionImg.src = './dist/assets/minion.png';
    this.minion = new Minion(minionImg);

    this.bananas = [];

    this.worms = [];

    this.lastWormBornTime = new Date().getTime() / 1000;
    this.lastWormWithGolfBornTime = new Date().getTime() / 1000;

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

    this.ctx.fillStyle = "Yellow";
    this.ctx.font = "20px 'Grandstander', cursive";
    this.ctx.fillRect(50, 50, this.minion.health, 30);
    this.ctx.fillText("Minion Health", 50, 35);

    this.ctx.fillText("Score:", 50, 115);
    this.ctx.fillText(this.score, 115, 115);

    this.ctx.fillText("Kills:", 50, 150);
    this.ctx.fillText(this.kills, 115, 150);

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
          this.deadWorms.push(i);
          this.score += worm.score;
        }
      });
      if (this.minion.collideWithWorm(worm)) {
        this.deadWorms.push(i);
        this.minion.health -= 100;
      }
    });

    const filteredWorms = this.worms.filter((_worm, i) => !this.deadWorms.includes(i));
    this.kills += this.worms.length - filteredWorms.length;
    this.worms = filteredWorms;
    this.deadWorms = [];

    this.worms.forEach(worm => worm.draw(this.ctx));



    requestAnimationFrame(this.animate);
  }
}

export default Game;