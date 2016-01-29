"use strict";

var startState = {

    preload: function () {
        game.renderer.renderSession.roundPixels = true;
        game.time.desiredFps = 30;
        game.forceSingleUpdate = true;

        game.stage.backgroundColor = '#71c5cf';
        game.load.image('coin', 'assets/bitcoin.png');
        game.load.image('bottom', 'assets/bottom.png');
        game.load.image('top', 'assets/top.png');
        game.load.image('menuButton', 'assets/button.png');

        game.load.atlas('altcoins', 'assets/altcoins.png', 'assets/altcoins.json');

        game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');


        // Load the jump sound
        // game.load.audio('jump', 'assets/jump.wav');

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.startFullScreen();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.sessionPlays = 0;

        if (!!localStorage) {
            game.topScore = localStorage.getItem('topScore');
            if (game.topScore === null) {
                game.topScore = 0;
            }
        } else {
            game.topScore = 0;
        }

        if (AdMob) {
            AdMob.prepareInterstitial({adId: adMobId.interstitial, autoShow: false, isTesting: adMobId.isTesting});
        }
    },

    create: function () {
        var title = game.add.bitmapText(game.width / 2, game.height / 2 - 100, 'carrier_command', 'Bitcoin Bird', 28);
        title.anchor.setTo(0.5, 0.5);

        if (typeof analytics !== 'undefined') {
            analytics.trackView("Start Screen View");
        }

        if (game.topScore > 0) {
            var yourRecordText = game.add.bitmapText(game.width / 2, game.height / 2 + 100, 'carrier_command', 'Your Record: ' + game.topScore + " Points", 20);
            yourRecordText.anchor.setTo(0.5, 0.5);
        }

        var startGameButton = game.add.button(game.width / 2, game.height / 2, 'menuButton', this.startClicked, this);
        startGameButton.anchor.setTo(0.5, 0.5);
        startGameButton.buttonText = this.game.add.bitmapText(0, 0, 'carrier_command', 'Start', 20);
        startGameButton.buttonText.anchor.setTo(0.5, 0.5);
        startGameButton.buttonText.align = 'center';

        startGameButton.addChild(startGameButton.buttonText);
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
