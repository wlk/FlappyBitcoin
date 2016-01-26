"use strict";

var startState = {

    preload: function () {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('coin', 'assets/bitcoin.png');
        game.load.atlas('altcoins', 'assets/altcoins.png', 'assets/altcoins.json');

        game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

        // Load the jump sound
        // game.load.audio('jump', 'assets/jump.wav');

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    create: function () {
        var title = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 100, 'carrier_command','Bitcoin Bird', 28);
        title.anchor.setTo(0.5, 0.5);

        this.startGame = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2, 'carrier_command','Start Game', 28);
        this.startGame.anchor.setTo(0.5, 0.5);
        this.startGame.inputEnabled = true;
        this.startGame.events.onInputDown.add(this.startClicked, this);

    },

    startClicked: function () {
        game.state.start('game');
    },

    update: function () {
    }
};
