"use strict";

var startState = {

    preload: function () {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('coin', 'assets/bitcoin.png');
        game.load.atlas('altcoins', 'assets/altcoins.png', 'assets/altcoins.json');

        // Load the jump sound
        // game.load.audio('jump', 'assets/jump.wav');

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    create: function () {
        game.state.start('game');
    },

    update: function () {
    }
};
