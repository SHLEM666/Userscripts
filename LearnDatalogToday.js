// ==UserScript==
// @name         LearnDatalogToday
// @namespace    http://tampermonkey.net/
// @version      2024-02-20
// @description  try to take over the world!
// @author       You
// @match        https://www.learndatalogtoday.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=learndatalogtoday.org
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/LearnDatalogToday.js
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');

    // Изменение полей
    style.innerHTML += '.span8 {width:' + (window.screen.width - 30) + 'px; margin-left: unset;}';
    style.innerHTML += '.container {margin-left: 15px; width: unset;}';
    style.innerHTML += '.row {margin-left: unset;}';

    document.body.appendChild(style);

    // Запрет зума
    var meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width user-scalable=no";
    document.getElementsByTagName('head')[0].appendChild(meta);

})();
