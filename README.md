# Minions-V.S-Worms
## Introduction
Minion V.S Worms is a JavaScript browser game based on Worms:WMD https://en.wikipedia.org/wiki/Worms_W.M. The worms walk from the edges of the screen to the center of the house. The game will end if the worm touch you(Minion) and your Health downs to zero.

You(Minion) can blast the worms with your bananas, and you can hold the J and K to shoot out your banana in left and right directions. Minion can also move left, right and jump since the banana is throwed as a curve shape so positioning your minion is very important.


## MVP List
1. The player can move to the left and right
2. The player can jump
3. The player can shoot the banana to left and right directions
4. The player will lose health when the worm touch him/her
5. The game ends when the player's health turns zero
6. Worms come from left and right side of the screen and at least two types of worms are added in first version

## Technologies
- JavaScript
- HTML5 Canvas

## Challenges
- Banana Curve
In Minion VS. Worms, banana are throwed like a curve shape. This actually uses a classical physics equation: s=v0t + 1/2at^2. In horizontal direction, banana moves in constant speed, e.g. Speed * Time Difference, while in vertical direction, banana moves in continue changing speed, e.g. 0.5 * acceleration * Time Difference ^ 2.
```
draw(ctx) {
        const currentTime = new Date().getTime() / 1000;
        const timeDiff = currentTime - this.releaseTime;
        this.posX -= 7.5 * timeDiff * this.dirMultiplier;
        const currentVel = this.releaseVel - 26 * timeDiff;
        this.posY -= currentVel * timeDiff;
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
}
```

- Object Collision
How to decide if banana collides with worm or worm collides with minion? Use below code:
```
collideWithWorm(worm) {
        return worm.posX < this.posX + this.width && worm.posX + worm.width > this.posX && 
            worm.posY < this.posY + this.height && worm.posY + worm.height > this.posY;
}
```
e.g. two objects interact each other.

## Legal
Picture, music and sound assets used in this project are for educational purposes only. Picture, music and sound assets are property of [PNGIMG](http://pngimg.com), [Fandom](https://www.fandom.com/) and [Zapsplat](https://www.zapsplat.com).
