"use strict";

var game = new Phaser.Game(640, 360, Phaser.AUTO, 'gameDiv');

var mainState = {

    preload: function () {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');

        // Load the jump sound
        // game.load.audio('jump', 'assets/jump.wav');

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(30, 'pipe');
        this.pipesTimer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        this.bird = this.game.add.sprite(100, game.world.height / 2, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1300;

        // New anchor position
        this.bird.anchor.setTo(0.2, 0.5);

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        game.input.onTap.add(this.jump, this);

        this.score = 0;
        this.labelScore = this.game.add.text(100, 20, "0", {fontSize: '32px', fill: "#ffffff"});

        // Add the jump sound
        // this.jumpSound = this.game.add.audio('jump');

        this.pointMarks = game.add.group();
        this.pointMarks.enableBody = true;
        this.pointMarks.createMultiple(4);
    },

    addPoint: function (bird, mark) {
        mark.kill();

        this.score += 1;
        this.labelScore.text = this.score;
    },

    addPointMark: function () {
        var pointMark = this.pointMarks.getFirstDead();

        pointMark.reset(game.world.width + 50, 0);

        pointMark.scale.y = game.world.height;
        pointMark.body.velocity.x = - game.world.width / 2;
    },

    update: function () {
        if (this.bird.inWorld == false)
            this.restartGame();

        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
        game.physics.arcade.overlap(this.bird, this.pointMarks, this.addPoint, null, this);

        // Slowly rotate the bird downward, up to a certain point.
        if (this.bird.angle < 10)
            this.bird.angle += 1;
    },

    jump: function () {
        // If the bird is dead, he can't jump
        if (this.bird.alive == false)
            return;

        this.bird.body.velocity.y = -350;

        // Jump animation
        game.add.tween(this.bird).to({angle: -10}, 100).start();

        // Play sound
        // this.jumpSound.play();
    },

    hitPipe: function () {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.pipesTimer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function (p) {
            p.body.velocity.x = 0;
        }, this);

        this.pointMarks.forEach(function (p) {
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function () {
        game.state.start('main');
    },

    addOnePipe: function (x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = - game.world.width / 2;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function () {
        this.addPointMark();

        var hole = Math.floor(Math.random() * 3) + 1;

        for (var i = 0; i < 7; i++) {
            if (i != hole && i != hole + 1 /*&& i != hole + 2*/) {
                this.addOnePipe(game.world.width, i * 60 + 10);
            }
        }
    }
};

game.state.add('main', mainState);
