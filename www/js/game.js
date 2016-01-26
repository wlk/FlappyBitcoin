"use strict";

var game = new Phaser.Game(640, 360, Phaser.AUTO, 'gameDiv');

game.state.add('game', gameState);
game.state.add('start', startState);
