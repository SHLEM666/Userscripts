// ==UserScript==
// @name         GregsWiki
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.mywiki.wooledge.org/*
// @match        http://mywiki.wooledge.org/*
// @match        https://www.mywiki.wooledge.org/*
// @match        https://mywiki.wooledge.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wooledge.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');

    // Добавляем скролл к контейнеру локаци
    style.innerHTML += '#locationline {overflow: auto}';

    // Добавляем скролл к абзацам с контентом
    // выходящим за границы документа
    style.innerHTML += '#content p {overflow: auto}';

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
    style.innerHTML += 'pre {padding: 0pt;}';

    // Оформление кода в тексте
    style.innerHTML += '.backtick {background-color: #333333;}';

    // Оформление блоков содержания статей
    style.innerHTML += 'div.table-of-contents {border: 1px solid #333333; color: white; background-color: #171717;}';


    document.body.appendChild(style);

    // Попеременное подсвечивание строк в блоках кода
    var blocks = document.getElementsByTagName("pre");
    var elem;
    var flag;
    var len_i = blocks.length;
    for (var i = 0; i < len_i; i++) {
        if (blocks[i].id == "") {
            flag = false;
            var len_j = blocks[i].childNodes.length;
            for (var j = 0; j < len_j; j++) {
                if (blocks[i].childNodes[j].nodeType == 1) {
                    elem = document.createElement('div');
                    elem.innerHTML = "  " + blocks[i].childNodes[j+1].nodeValue;
                    elem.style.padding = "2pt 5pt";
                    elem.style.lineHeight = "18pt";
                    if (flag) {
                        elem.style.backgroundColor = "#333333";
                        flag = false;
                    } else {
                        flag = true;
                    }
                    blocks[i].childNodes[j+1].replaceWith(elem);
                    j++;
                };
            };
        };
    };
})();
