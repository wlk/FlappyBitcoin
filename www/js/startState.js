"use strict";

var startState = {

    preload: function () {
    },

    create: function () {
    },

    update: function () {
        this.altcoins.forEachAlive(function (p) {
            this.checkPipeHit(this.coin, p);
        }, this);

        if (!this.coin.inWorld)
            this.restartGame();

        game.physics.arcade.overlap(this.coin, this.pointMarks, this.addPoint, null, this);

        // Slowly rotate the coin downward, up to a certain point.
        /*if (this.coin.angle < 10)
         this.coin.angle += 1;*/
    }
};

game.state.add('start', startState);