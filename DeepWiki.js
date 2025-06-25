// ==UserScript==
// @name         DeepWiki
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       SHLEM666
// @match        https://deepwiki.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deepwiki.com
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/DeepWiki.js
// ==/UserScript==

(function foo() {
    'use strict';

    var ul = document.getElementsByTagName("ul")[0];
    var cw = document.getElementById("codebase-wiki-repo-page");

    function get_chat_panel() {
        return document.getElementsByTagName("form")[0].parentElement.parentElement;
    };

    if (ul && cw) {

        var top_panel = cw.children[0];
        var left_menu = ul.parentElement.parentElement;
        var right_menu = ul.parentElement.parentElement.parentElement.children[2].children[0];
        var chat_panel = get_chat_panel();

        chat_panel.style.display = "none";
        top_panel.style.display = "none";
        top_panel.style.paddingTop = "0px";
        top_panel.style.paddingBottom = "0px";
        left_menu.style.top = "0px";
        left_menu.style.height = "calc(100vh)";
        right_menu.children[0].style.display = "none";
        right_menu.parentElement.style.top = "0px";
        right_menu.parentElement.style.height = "calc(100vh)";

        document.body.onclick = function() {
            setTimeout(()=>{
                chat_panel = get_chat_panel();
                if (top_panel.style.display != chat_panel.style.display) {
                    window.location.reload();
                };
            }, 100);
        };

        // Создаем кнопку меню
        (function add_my_button() {

            var my_button = document.createElement('div');

            my_button.className = 'my_button';
            my_button.onclick = toggle_view;

            my_button.innerHTML += '≡';

            document.body.appendChild(my_button);

            function toggle_view() {
                if (chat_panel.style.display == "" || chat_panel.style.display == '') {
                    chat_panel.style.display = "none";
                    top_panel.style.display = "none";
                    left_menu.style.top = "0px";
                    right_menu.parentElement.style.top = "0px";

                } else {
                    chat_panel.style.display = "";
                    top_panel.style.display = "";
                    left_menu.style.top = "35px";
                    right_menu.parentElement.style.top = "60px";
                };
            };
        })();

        // Создаем стили
        (function add_style() {

            var style = document.createElement('style');

            // Внешний вид кнопки
            style.innerHTML += '.my_button {background-color:#0000004d; border-radius:100%; bottom: 3px; right: 3px; position: fixed; height:50px; width:50px; font: initial; font-size: 32pt; text-align: center; color: white; cursor: pointer; user-select: none;}';

            document.body.appendChild(style);
        })();

    } else {
        setTimeout(()=>{
            foo();
        }, 100);
    }
})();
