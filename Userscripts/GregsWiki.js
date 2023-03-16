// ==UserScript==
// @name         GregsWiki
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.mywiki.wooledge.org/*
// @match        http://mywiki.wooledge.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wooledge.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');

    // Добавляем скролл к контейнеру локаци
    style.innerHTML += '#locationline {overflow: scroll}';

    // Добавляем скролл к абзацам с контентом
    // выходящим за границы документа
    style.innerHTML += '#content p {overflow: scroll}';

    document.body.appendChild(style);
})();
