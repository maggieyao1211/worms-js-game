
class Minion {
    constructor(img) {
        this.posX = 1100;
        this.posY = 770;
        this.horizVel = 0;
        this.vertVel = 0;
        this.falling = false;
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.health = 500;
        this.width = 140;
        this.height = 120;
        this.img = img;
        
        document.addEventListener('keydown', e => this.keyDownHandler(e), false);
        document.addEventListener('keyup', e => this.keyUpHandler(e), false);
    }

    draw(ctx) {
        if (this.isInMinionMoveRange()) {
            this.posX += this.horizVel;
        }
        if (this.vertVel != 0 && this.posY > this.destPosY && !this.falling) {
            this.posY -= 0.5 * this.vertVel;
        } 
        if (this.vertVel != 0 && this.posY === this.destPosY || this.falling) {
            this.posY += 0.5 * this.vertVel;
            if (this.onGround()) {
                this.falling = false;
                this.vertVel = 0;
            } else {
                this.falling = true;
            }
        }
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    keyDownHandler(e) {
        e.preventDefault();
        const keyCode = e.keyCode;
        switch (keyCode) {
            case 65: // 'A'
            case 68: // 'D'
                this.horizVel = 10 * (keyCode === 65 ? -1 : 1);
                break;
            case 87: // 'W
                if (this.vertVel === 0) {
                    this.vertVel = 10;
                    this.destPosY = this.posY - 150; 
                }
                break;
            default:
                break;
        }
    }

    keyUpHandler(e) {
        e.preventDefault();
        const keyCode = e.keyCode;
        switch (keyCode) {
            case 65: // 'A'
            case 68: // 'D'
                this.horizVel = 0;
                break;
            default:
                break;
        }
    }

    isInMinionMoveRange() {
        return this.horizVel < 0 ? this.posX >= 780 : this.posX <= 1380;
    }

    onGround() {
        return this.posY === 780;
    }

    collideWithWorm(worm) {
        return worm.posX < this.posX + this.width && worm.posX + worm.width > this.posX && 
            worm.posY < this.posY + this.height && worm.posY + worm.height > this.posY;
    }
}

export default Minion;