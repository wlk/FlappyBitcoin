"use strict";

var adMobId = {};

if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
    adMobId = {
        banner: 'ca-app-pub-xxx/xxx',
        interstitial: 'ca-app-pub-5829945009169600/9836301162',
        isTesting: false
    };
} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    adMobId = {
        banner: 'ca-app-pub-xxx/zzz',
        interstitial: 'ca-app-pub-xxx/kkk',
        isTesting: false
    };
} else { // for windows phone
    adMobId = {
        banner: 'ca-app-pub-xxx/zzz',
        interstitial: 'ca-app-pub-5829945009169600/1615030367',
        isTesting: false
    };
}