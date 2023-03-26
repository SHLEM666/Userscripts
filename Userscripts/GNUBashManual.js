// ==UserScript==
// @name         GNUBashManual
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.gnu.org/software/bash/manual/*
// @match        http://gnu.org/software/bash/manual/*
// @match        https://www.gnu.org/software/bash/manual/*
// @match        https://gnu.org/software/bash/manual/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gnu.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');

    // Цвет заголовков
    style.innerHTML += 'h1, h2, h3, h4, .header {color: white;}';

    // Цвет ссылок
    style.innerHTML += 'a[href], a[href]:link {color: #81BBF2;}';
    style.innerHTML += 'a[href]:visited {color: #eb81f2;}';

    // Цвет текста и фона страницы
    style.innerHTML += 'body {color: white; background-color: black;}';

    // Убираем рамку по краям страницы
    style.innerHTML += 'body {border: none;}';

    // Оформление обычных блоков кода
    style.innerHTML += 'div.example, pre.example {background-color: #171717;}';
    style.innerHTML += 'div.example, pre.example {border: 1pt solid #333333;}';

    // Оформление кода в тексте
    style.innerHTML += 'p.code, span code {background-color: #333333; color: white;}';

    document.body.appendChild(style);

})();
