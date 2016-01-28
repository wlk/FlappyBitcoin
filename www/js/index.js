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

        if (typeof analytics !== 'undefined') {
            if (/(android)/i.test(navigator.userAgent)) {
                analytics.startTrackerWithId("UA-54524356-22"); //Android
            } else {
                analytics.startTrackerWithId("UA-54524356-24"); //iOS
            }
        } else { // Windows
            console.log("Google Analytics Unavailable");
        }
    }
};

app.initialize();