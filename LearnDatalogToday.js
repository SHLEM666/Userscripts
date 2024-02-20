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

    // Увеличиваем размер шрифта
    style.innerHTML += 'body {font-size: 2em;}';
    style.innerHTML += '.textcontent h1 {font-size: 2em;}';
    style.innerHTML += '.textcontent h2 {font-size: 1.5em;}';
    style.innerHTML += 'code, pre, .btn {font-size: 1em;}';

    // Изменения кнопки
    style.innerHTML += '.btn {padding: 0.5em 0;}';

    // Изменения отступов
    style.innerHTML += 'h1, h2, h3, h4, h5, h6 {margin: 0.5em 0;}';
    style.innerHTML += 'body, pre, li, .CodeMirror {line-height: unset;}';
    style.innerHTML += '.row {margin-bottom: 1em;}';

    // Изменение полей
    style.innerHTML += '.offset2 {margin-left: 5%;}';
    style.innerHTML += '.span8 {width: 884px;}';

    // Изменение панели навигации
    style.innerHTML += '.nav {margin-top: 20px;}';
    style.innerHTML += '.nav .label {display: unset; font-size: unset; line-height: unset; margin: 0 1em;}';

    document.body.appendChild(style);

})();
