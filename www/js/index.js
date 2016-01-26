"use strict";

var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        game.state.start('start');

        document.addEventListener("backbutton", function(e){
            if(game.state.current === "start"){
                startState.handleBackButton();
            } else {
                gameState.handleBackButton();
            }
        }, false);
    }
};

app.initialize();