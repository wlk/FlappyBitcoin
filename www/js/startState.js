"use strict";

var startState = {

    preload: function () {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('coin', 'assets/bitcoin.png');
        game.load.atlas('altcoins', 'assets/altcoins.png', 'assets/altcoins.json');

        game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');


        game.load.image('menu', 'assets/altcoins.png', 676, 52);
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
