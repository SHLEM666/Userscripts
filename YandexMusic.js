// ==UserScript==
// @name         YandexMusic
// @namespace    http://tampermonkey.net/
// @version      2024-08-07
// @description  try to take over the world!
// @author       You
// @match        *music.yandex.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yandex.ru
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/YandexMusic.js
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');

    // Спрятать мини обложку
    style.innerHTML += '.PlayerBarDesktop_cover__IYLwR {display: none;}';

    document.body.appendChild(style);

})();
