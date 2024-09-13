// ==UserScript==
// @name         Play-KotlinLang
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       SHLEM666
// @match        https://play.kotlinlang.org/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kotlinlang.org
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/Play-KotlinLang.js
// ==/UserScript==

(function (window) {

    "use strict";

    var elem1 = document.createElement("style");

    // Добавить правый отступ в поле ввода кода
    // Add right margin to code input area
    elem1.innerHTML += ".CodeMirror-scroll {margin-right: 0px;}";

    // Добавить правый отступ в поле вывода
    // Add right margin to output area
    elem1.innerHTML += ".standard-output.darcula {margin-right: 15px;}";

    // Удаление панели меню
    // Hide menu panel
    elem1.innerHTML += ".ktl-header-module_header-menu_wh71L.header {display: none;}";

    // Модификация кнопки закрытия консоли
    // Modify closing console button
    elem1.innerHTML += ".console-close.darcula {margin-top: -58px; opacity: 0.2;}";

    // Удаление кнопки помои
    // Hide help button
    elem1.innerHTML += ".playground__help-wrapper {display: none;}";

    document.body.appendChild(elem1);

})(window);
