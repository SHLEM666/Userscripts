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

    // Цвет ссылок
    style.innerHTML += '#page a {color: #81BBF2;}';
    style.innerHTML += '#page a:visited {color: #81f2a9;}';

    // Цвет текста
    style.innerHTML += '#page {color: white;}';

    // Фон страницы
    style.innerHTML += '#page {background-color: black;}';

    // Оформление блоков кода
    style.innerHTML += 'pre {background-color: #171717;}';
    style.innerHTML += 'pre {border: 1pt solid #333333;}';

    // Оформление кода в тексте
    style.innerHTML += '.backtick {background-color: #333333;}';

    // Оформление блоков содержания статей
    style.innerHTML += 'div.table-of-contents {border: 1px solid #333333; color: white; background-color: #171717;}';

    document.body.appendChild(style);
    
    // Добавляем отступы в блоках кода
    var blocks = document.getElementsByTagName("pre");
    var len_i = blocks.length;
    for (var i = 0; i < len_i; i++) {
    if (blocks[i].id == "") {
        var len_j = blocks[i].childNodes.length;
           for (var j = 0; j < len_j; j++) {
               if (j % 2 != 0) { // Каждый нечетный
                  blocks[i].childNodes[j].nodeValue = "  " + blocks[i].childNodes[j].nodeValue;
               };
           };
       };
   };
})();
