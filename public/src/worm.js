
class Worm {
    constructor(img, posX, posY, width, height, score, dirMultiplier) {
        this.posX = posX;
        this.posY = posY;
        this.dirMultiplier = dirMultiplier;
        this.img = img;
        this.bornTime = new Date().getTime() / 1000;
        this.width = width;
        this.height = height;
        this.score = score;
    }

    draw(ctx) {
        this.posX -= 1 * this.dirMultiplier;
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    collideWithBanana(banana) {
        return banana.posX < this.posX + this.width && banana.posX + banana.width > this.posX && 
            banana.posY < this.posY + this.height && banana.posY + banana.height > this.posY;
    }
}

export default Worm;