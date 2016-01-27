"use strict";

var startState = {

    preload: function () {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('coin', 'assets/bitcoin.png');
        game.load.image('bottom', 'assets/bottom.png');
        game.load.image('top', 'assets/top.png');

        game.load.atlas('altcoins', 'assets/altcoins.png', 'assets/altcoins.json');

        game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');



        // Load the jump sound
        // game.load.audio('jump', 'assets/jump.wav');

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    create: function () {
        var title = game.add.bitmapText(game.width / 2, game.height / 2 - 100, 'carrier_command','Bitcoin Bird', 28);
        title.anchor.setTo(0.5, 0.5);

        var startGame = game.add.bitmapText(game.width / 2, game.height / 2, 'carrier_command','Start Game', 28);
        startGame.anchor.setTo(0.5, 0.5);
        startGame.inputEnabled = true;
        startGame.events.onInputDown.add(this.startClicked, this);

        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startClicked, this);
    },

    handleBackButton: function () {
        navigator.app.exitApp();
    },

    startClicked: function () {
        game.state.start('game');
    },

    update: function () {
    }
};
