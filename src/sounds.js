
class Sound {
    constructor(src, volume) {
        this.sound = new Audio(src);
        this.sound.volume = volume;
    }

    play(isMusicOn) {
        if (isMusicOn) {
            this.sound.play();
        } else {
            this.sound.pause();
        }
    }

    pause() {
        this.sound.pause();
    }
}

export const backgroundMusic = new Sound('./dist/sounds/back_in_toon.mp3', '0.45');
export const gameOverMusic = new Sound('./dist/sounds/game_over.mp3', '0.45');
export const wormHurtSound = new Sound('./dist/sounds/worm_hurt.wav.mp3', '0.55');