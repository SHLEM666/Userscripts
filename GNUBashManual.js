// ==UserScript==
// @name         GNUBashManual
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *.gnu.org/*/bash/manual/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gnu.org
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/GNUBashManual.js
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');

    // Увеличиваем размер шрифта
    style.innerHTML += 'html {font-size: 1.1em;}';

    // Меняем семейство шрифта
    style.innerHTML += 'p, pre, li, dt, dd, table, code, address, .settitle, .top, .chapter, .section, .subsection, .subsubsection {font-family: system-ui;}';

    // Цвет заголовков
    style.innerHTML += 'h1, h2, h3, h4, h5, h6, dt, .header {color: white;}';

    // Цвет ссылок
    style.innerHTML += 'a[href], a[href]:link {color: #81BBF2;}';
    style.innerHTML += 'a[href]:visited {color: #eb81f2;}';

    // Цвет текста и фона страницы
    style.innerHTML += 'html, body {color: white; background-color: black;}';

    // Убираем рамку страницы и отступы
    style.innerHTML += 'body {border: none; max-width: none; width:92%; margin: 4%; padding: 0px}';

    // Оформление блоков кода
    style.innerHTML += 'div.example {background-color: black; border: 1pt solid #333333; margin: 1.5em 0em; padding: 0px;}';
    style.innerHTML += 'div.example > pre.example {background-color: black; padding: 0px; word-wrap: break-word; white-space: pre-wrap;}';
    style.innerHTML += 'div.example > pre.example div {padding: 0.4em; background-color: #191919;}';
    style.innerHTML += 'div.example > pre.example div:nth-child(2n) {background-color: #333333;}';

    // Оформление кода в тексте
    style.innerHTML += 'p {word-wrap: break-word;}';
    style.innerHTML += 'p code, span code, samp {background-color: #333333; color: white;}';

    document.body.appendChild(style);

    // Оборачивание строк кода в DIV
    var pres = document.getElementsByTagName("pre");
    var lines;
    var newHTML;
    for (var pre of pres) {
        if (pre.className == "example") {
            newHTML = "";
            lines = pre.innerHTML.split("\n");
            for (var line of lines) {
                if (line != "") {
                    newHTML += '<div calss="my_line">  ' + line + '</div>'
                };
            };
            pre.innerHTML = newHTML;
        };
    };
})();
