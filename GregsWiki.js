// ==UserScript==
// @name         GregsWiki
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *.mywiki.wooledge.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wooledge.org
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/GregsWiki.js
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');

    // Увеличиваем размер шрифта
    style.innerHTML += 'html {font-size: 1.1em;}';

    // Добавляем скролл к контейнеру локаци
    style.innerHTML += '#locationline {overflow: auto}';

    // Добавляем скролл к абзацам с контентом
    // выходящим за границы документа
    style.innerHTML += '#content p {overflow: auto}';

    // Цвет ссылок
    style.innerHTML += '#page a {color: #81BBF2;}';
    style.innerHTML += '#page a:visited {color: #eb81f2;}';

    // Цвет текста
    style.innerHTML += '#page {color: white;}';

    // Фон страницы
    style.innerHTML += '#page {background-color: black;}';

    // Оформление обычных блоков кода
    style.innerHTML += 'pre {background-color: #171717;}';
    style.innerHTML += 'pre {border: 1pt solid #333333;}';
    style.innerHTML += 'pre {padding: 0pt;}';
    style.innerHTML += 'pre div:nth-child(4n) {background-color: #333333;}';
    style.innerHTML += 'pre > div {padding: 2pt 5pt; line-height: 18pt}';

    // Оформление блоков хитро....анных блоков кода
    style.innerHTML += 'div.codearea {background-color: #333333; border: 1pt solid #333333; line-height: 18pt;}';
    style.innerHTML += 'div.codearea pre {color: white; padding: 0px;}';
    style.innerHTML += 'div.codearea pre span.ID {color: white;}';
    style.innerHTML += 'div.codearea pre span.String {color: #81BBF2;}';
    style.innerHTML += 'div.codearea pre span.Comment {color: #00bb00;}';
    style.innerHTML += 'div.codearea pre span.ResWord {color: #dd0000;}';
    style.innerHTML += 'div.codearea pre .line {display: inline-block; width: 100%; padding: 2pt 0pt;}';
    style.innerHTML += 'div.codearea pre .line:nth-child(2n) {background-color: #333333;}';

    // Оформление кода в тексте
    style.innerHTML += '.backtick, #content > p > em, #content > p > tt {background-color: #333333;}';

    // Оформление блоков содержания статей
    style.innerHTML += 'div.table-of-contents {border: 1px solid #333333; color: white; background-color: #171717;}';

    document.body.appendChild(style);

    // Оборачивание текстовых узлов(строк) обычных блоков кода в DIV
    var blocks = document.getElementsByTagName("pre");
    var elem;
    // Перебор блоков
    for (var block of blocks) {
        // Если текущий блок - обычный, не хитро....анный
        if (block.id == "") {
            // Перебор элементов внутри блока
            for (var node of block.childNodes) {
                // Если текущий узел - TEXT_NODE
                if (node.nodeType == 3) {
                    // Оборачивание узел в DIV
                    elem = document.createElement('div');
                    // Используем метод document.createTextNode чтобы избежать ненужных преобразований частей текста в HTML-элементы
                    elem.appendChild(document.createTextNode("  " + node.nodeValue));
                    node.replaceWith(elem);
                };
            };
        };
    };

    // Горизонтальная прокрутка таблиц
    var tables = document.getElementsByTagName("table");
    for (var table of tables) {
        if (table.parentElement.tagName == "DIV") {
            table.parentElement.style.overflow = "scroll";
        };
    };
})();
