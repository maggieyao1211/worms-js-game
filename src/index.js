import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('battlefield');
    const game = new Game(canvas);
});