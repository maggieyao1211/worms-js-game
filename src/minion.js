
class Minion {
    constructor(img) {
        this.posX = 1800;
        this.posY = 600;
        this.horizVel = 0;
        this.vertVel = 0;
        this.falling = false;
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.img = img;
        // this.onGround = this.onGround.bind(this);
        // this.minion = document.getElementById('minion');
        // this.minionStyle = this.minion.style;
        // this.minionStyle.left = '1800px';
        // this.minionStyle.top = '600px';
        
        document.addEventListener('keydown', e => this.keyDownHandler(e), false);
        document.addEventListener('keyup', e => this.keyUpHandler(e), false);
    }

    draw(ctx) {
        if (this.destPosX && this.posX != this.destPosX && this.isInMinionMoveRange()) {
            this.posX += 0.5 * this.horizVel;
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
        ctx.drawImage(this.img, this.posX, this.posY, 140, 120);
    }

    keyDownHandler(e) {
        e.preventDefault();
        const keyCode = e.keyCode;
        switch (keyCode) {
            case 65: // 'A'
            case 68: // 'D'
                    this.horizVel = 10 * (keyCode === 65 ? -1 : 1);
                    this.destPosX = this.posX + 100 * (keyCode === 65 ? -1 : 1);
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
    }

    isInMinionMoveRange() {
        return this.horizVel < 0 ? this.posX >= 780 : this.posX <= 1380;
    }

    onGround() {
        return this.posY === 780;
    }
}

export default Minion;