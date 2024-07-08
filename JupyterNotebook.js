// ==UserScript==
// @name         JupyterNotebook
// @namespace    http://tampermonkey.net/
// @version      2024-07-08
// @description  try to take over the world!
// @author       SHLEM666
// @match        http://127.0.0.1:8888/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jupyter.org
// @grant        none
// @run-at       document-idle
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/JupyterNotebook.js
// ==/UserScript==

(function (window) {

    var w;

    if (typeof unsafeWindow != "undefined") {
        w = unsafeWindow
    } else {
        w = window;
    }

    if (w.self != w.top) {
        return;
    }

    if (/http:\/\/127.0.0.1:8888/.test(w.location.href)) {

        "use strict";
        try {

            w.onbeforeunload = function() {
                return "Введенные вами данные могут не сохраниться";
            };

            var elem1 = document.createElement("style");

            // Скролл панели меню"
            elem1.innerHTML += "#jp-MainMenu {overflow-x: scroll;}";

            // Скрыть статус
            elem1.innerHTML += ".jp-NotebookTrustedStatus {display: none;}";

            document.body.appendChild(elem1);

            // Отключение контекстного меню при выделении текста
            document.addEventListener('contextmenu', (e) => {
                e.stopImmediatePropagation();
                e.stopPropagation();
            }, true);

        } catch (err) {

            alert(err);
        };
    };

})(window);
