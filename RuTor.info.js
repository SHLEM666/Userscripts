// ==UserScript==
// @name         RuTor.info
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *.rutor.info/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rutor.info
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/RuTor.js
// ==/UserScript==

(function() {
    'use strict';
    
    // Hide ads
    let timerId = setInterval(function() {
        let iframes = document.getElementsByTagName("iframe");
        if (iframes[0]) {
            iframes[0].parentElement.hidden = "true";
            clearInterval(timerId);
        };
    }, 1000);
})();
