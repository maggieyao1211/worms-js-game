
class Worm {
    constructor(img, posX, posY, dirMultiplier) {
        this.posX = posX;
        this.posY = posY;
        this.dirMultiplier = dirMultiplier;
        this.img = img;
        this.bornTime = new Date().getTime() / 1000;
    }

    draw(ctx) {
        this.posX -= 1 * this.dirMultiplier;
        ctx.drawImage(this.img, this.posX, this.posY, 100, 80);
    }
}

export default Worm;