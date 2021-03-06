"use strict";

var gameState = {
    preload: function () {
    },

    create: function () {
        ++game.sessionPlays;

        if (typeof analytics !== 'undefined') {
            analytics.trackEvent("game", "new play");
        }

        this.taps = 0;

        this.pointMarks = game.add.group();
        this.pointMarks.enableBody = true;
        this.pointMarks.createMultiple(4);

        this.altcoins = game.add.group();
        this.altcoins.enableBody = true;
        this.altcoins.createMultiple(20, 'altcoins');
        this.altcoinsTimer = game.time.events.loop(1500, this.addRowOfAltcoins, this);

        this.coin = game.add.sprite(100, game.world.height - 150, 'coin');

        this.bottom = game.add.sprite(0, game.world.height - 10, 'bottom');

        this.bottom.enableBody = true;

        game.physics.arcade.enable(this.coin);
        this.coin.body.collideWorldBounds = true;

        game.physics.arcade.enable(this.bottom);

        this.bottom.body.immovable = true;

        // New anchor position
        this.coin.anchor.setTo(0.5, 0.5);

        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.jump, this);

        game.input.onTap.add(this.jump, this);

        // Add the jump sound
        // this.jumpSound = game.add.audio('jump');

        this.score = 0;
        this.labelScore = game.add.bitmapText(100, 20, 'carrier_command', 'Score: 0', 20);

        if (game.topScore < 1) {
            this.tutorialText = game.add.bitmapText(game.world.width / 2, game.world.height / 2, 'carrier_command', 'Touch to start flying', 20);
            this.tutorialText.anchor.setTo(0.5, 0.5);

            this.coinTween = game.add.tween(this.coin);
            this.coinTween.to({y: game.world.height - 200}, 250, 'Linear', true, 0);
            this.coinTween.yoyo(true);
            this.coinTween.repeat(2);
            this.coinTween.onComplete.add(function () {
                this.taps++;
            }, this);
        } else {
            this.coin.body.gravity.y = 1300;
        }
    },

    handleBackButton: function () {
        game.state.start('start');
    },

    addPoint: function (bird, mark) {
        mark.kill();

        if (typeof analytics !== 'undefined') {
            analytics.trackEvent("game", "point");
        }

        this.score += 1;
        this.labelScore.text = "Score: " + this.score;
    },

    addPointMark: function () {
        var pointMark = this.pointMarks.getFirstDead();

        pointMark.reset(game.world.width + 50, 0);

        pointMark.scale.y = game.world.height;
        pointMark.body.velocity.x = -260;
    },

    update: function () {
        if (this.coin.alive) {
            game.physics.arcade.overlap(this.coin, this.pointMarks, this.addPoint, null, this);
            game.physics.arcade.overlap(this.coin, this.bottom, this.handleDeath, null, this);

            this.altcoins.forEachAlive(function (p) {
                if (Math.abs(this.coin.x - p.x) <= 50 && Math.abs(this.coin.y - p.y) <= 50) { // first level of collision checking
                    this.checkPipeHit(this.coin, p); // more detailed collision checking
                }
            }, this);


            // Slowly rotate the coin downward, up to a certain point.
            /*if (this.coin.angle < 10)
             this.coin.angle += 1;*/
        }

        if (game.topScore < 1) {
            if (this.taps == 1) {
                this.coin.body.gravity.y = 1300;
                this.coinTween.stop();
                this.tutorialText.kill();
            }
            if (this.taps == 0) {
            }
        }
    },

    jump: function () {
        this.taps++;
        // If the coin is dead, he can't jump
        if (!this.coin.alive)
            return;

        this.coin.body.velocity.y = -350;

        // Jump animation
        //game.add.tween(this.coin).to({angle: -10}, 100).start();

        // Play sound
        // this.jumpSound.play();
    },

    areColliding: function (coin, altcoin) {
        return Phaser.Circle.intersects(
            new Phaser.Circle(coin.x, coin.y, coin.width),
            new Phaser.Circle(altcoin.x + 25, altcoin.y + 25, altcoin.width)
        );
    },

    checkPipeHit: function (coin, pipe) {
        if (this.areColliding(coin, pipe)) {
            // If the coin has already hit a pipe, we have nothing to do
            if (this.coin.alive) {
                this.handleDeath();
            }
        }
    },

    handleDeath: function () {
        // Set the alive property of the coin to false
        this.coin.alive = false;
        game.add.tween(this.coin).to({angle: 72}, 100).start();

        game.time.events.add(0, this.displayDeathMenu, this);

        // Prevent new altcoins from appearing
        game.time.events.remove(this.altcoinsTimer);

        // Go through all the altcoins, and stop their movement
        this.altcoins.forEachAlive(function (p) {
            p.body.velocity.x = 0;
        }, this);

        this.pointMarks.forEachAlive(function (p) {
            p.body.velocity.x = 0;
        }, this);
    },

    displayDeathMenu: function () {
        this.labelScore.kill();

        if (this.score > game.topScore) {
            game.topScore = this.score;
            localStorage.setItem('topScore', this.score);
        }

        if (typeof analytics !== 'undefined') {
            analytics.trackEvent("game", "death", "points", this.score);
        }

        if (game.sessionPlays >= 10 && game.sessionPlays % 10 == 0) {
            if (AdMob) {
                AdMob.showInterstitial();
                AdMob.prepareInterstitial({adId: adMobId.interstitial, autoShow: false, isTesting: adMobId.isTesting});
            }
        }

        var menu = game.add.bitmapText(game.width / 2, game.height / 2 - 70, 'carrier_command', 'Game Over', 30);
        menu.anchor.setTo(0.5, 0.5);

        var scoreText = game.add.bitmapText(game.width / 2, game.height / 2 - 20, 'carrier_command', 'Score: ' + this.score, 20);
        scoreText.anchor.setTo(0.5, 0.5);

        if (game.topScore > 0) {
            var yourRecordText = game.add.bitmapText(game.width / 2, game.height / 2 + 20, 'carrier_command', 'Record: ' + game.topScore, 20);
            yourRecordText.anchor.setTo(0.5, 0.5);
        }
        //game.input.onDown.add(this.continueAfterDeath, this);

        var restartGameButton = game.add.button(game.width / 2, game.height - 80, 'menuButton', this.continueAfterDeath, this);
        restartGameButton.anchor.setTo(0.5, 0.5);
        restartGameButton.buttonText = this.game.add.bitmapText(0, 0, 'carrier_command', 'Restart', 20);
        restartGameButton.buttonText.anchor.setTo(0.5, 0.5);
        restartGameButton.buttonText.align = 'center';
        restartGameButton.addChild(restartGameButton.buttonText);

        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.continueAfterDeath, this);
    },

    continueAfterDeath: function () {
        this.restartGame();
    },

    restartGame: function () {
        game.state.start('game');
    },

    addOneAltcoin: function (x, y) {
        var altcoin = this.altcoins.getFirstDead();
        altcoin.frame = Math.floor(Math.random() * 14);
        altcoin.reset(x, y);
        altcoin.body.velocity.x = -260;
        altcoin.checkWorldBounds = true;
        altcoin.outOfBoundsKill = true;
    },

    addRowOfAltcoins: function () {
        this.addPointMark();

        var hole = Math.floor(Math.random() * 3) + 1;

        for (var i = 0; i < 8; i++) {
            if (i != hole && i != hole + 1 /*&& i != hole + 2*/) {
                this.addOneAltcoin(game.world.width, i * 50);
            }
        }
    }
};
