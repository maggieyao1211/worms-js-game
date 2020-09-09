import Minion from './minion';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        const minionImg = new Image();
        minionImg.src = './dist/assets/minions.png';
        this.minion = new Minion(minionImg);
        this.animate = this.animate.bind(this)
        requestAnimationFrame(this.animate.bind(this));
    }

  animate(time) {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.minion.draw(ctx, time);
    requestAnimationFrame(this.animate);
  }
}

export default Game;