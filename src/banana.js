
class Banana {
    constructor(img, minion, dirMultiplier) {
        this.dirMultiplier = dirMultiplier;
        this.posX = dirMultiplier === 1 ? minion.posX - 50 : minion.posX + 80;
        this.posY = minion.posY - 30;
        this.releaseTime = new Date().getTime() / 1000;
        this.releaseVel = 50;
        this.img = img;
    }

    draw(ctx) {
        const currentTime = new Date().getTime() / 1000;
        const timeDiff = currentTime - this.releaseTime;
        this.posX -= 7.5 * timeDiff * this.dirMultiplier;
        const currentVel = this.releaseVel - 46 * timeDiff;
        this.posY -= currentVel * timeDiff;
        ctx.drawImage(this.img, this.posX, this.posY, 70, 60);
    }
}

export default Banana;