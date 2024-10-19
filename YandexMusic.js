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

    // Фикс недоступности последнего элемента списка воспроизведения
    style.innerHTML += '.sidebar__section+.sidebar__section {margin-bottom: 30px;}';

    // Увеличить высоту прогресс-бара
    style.innerHTML += '.bar__content .progress_branding .progress__bg {height: 50px;}';
    style.innerHTML += '.bar__content .progress_branding .progress__bar {height: 50px;}';

    style.innerHTML += '.bar__content:hover .progress_branding .progress__bg {height: 50px;}';
    style.innerHTML += '.bar__content:hover .progress_branding .progress__bar {height: 50px;}';

    style.innerHTML += '.player-progress.progress.deco-progress.progress_branding {height: 50px;}';

    document.body.appendChild(style);

})();
