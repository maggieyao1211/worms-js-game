import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('battlefield');
    const musicController = document.getElementById('music-controller');
    const soundController = document.getElementById('sound-controller');
    new Game(canvas, musicController, soundController);
});