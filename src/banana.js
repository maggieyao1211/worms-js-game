
class Banana {
    constructor(img, minion, dirMultiplier) {
        this.dirMultiplier = dirMultiplier;
        this.posX = dirMultiplier === 1 ? minion.posX - 50 : minion.posX + 80;
        this.posY = minion.posY - 30;
        this.releaseTime = new Date().getTime() / 1000;
        this.releaseVel = 30;
        this.img = img;
        this.width = 70;
        this.height = 60;
    }

    draw(ctx) {
        const currentTime = new Date().getTime() / 1000;
        const timeDiff = currentTime - this.releaseTime;
        this.posX -= 7.5 * timeDiff * this.dirMultiplier;
        const currentVel = this.releaseVel - 26 * timeDiff;
        this.posY -= currentVel * timeDiff;
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
}

export default Banana;