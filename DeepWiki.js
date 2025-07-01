// ==UserScript==
// @name         DeepWiki
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       SHLEM666
// @match        https://deepwiki.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deepwiki.com
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/DeepWiki.js
// ==/UserScript==

(function foo() {
    'use strict';

    var tp = document.body.getElementsByTagName("div")[0];
    var cp = document.getElementsByTagName("form")[0];

    if (tp && cp) {

        var top_panel = tp.children[0];
        var chat_panel = get_chat_panel();

        function get_chat_panel() {
            return document.getElementsByTagName("form")[0].parentElement.parentElement;
        };

        chat_panel.style.display = "none";
        top_panel.style.display = "none";
        top_panel.style.paddingTop = "0px";
        top_panel.style.paddingBottom = "0px";

        var cw = document.getElementById("codebase-wiki-repo-page");
        var pb = document.getElementsByClassName("pb-36")[0];

        if (cw) {

            var ul = document.getElementsByTagName("ul")[0];
            var left_menu = ul.parentElement.parentElement;
            var right_menu = ul.parentElement.parentElement.parentElement.children[2].children[0];

            left_menu.style.top = "0px";
            left_menu.style.height = "calc(100vh)";
            right_menu.children[0].style.display = "none";
            right_menu.parentElement.style.top = "0px";
            right_menu.parentElement.style.height = "calc(100vh)";

            function actions() {
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

            create_my_button(actions);

            document.body.onclick = function() {
                setTimeout(()=>{
                    chat_panel = get_chat_panel();
                    if (top_panel.style.display != chat_panel.style.display) {
                        window.location.reload();
                    };
                }, 100);
            };

        } else if (pb) {

            setTimeout(()=>{
                var right_content = pb.children[0].children[1].children[0];
                right_content.style.maxHeight = "calc(100vh)";
                right_content.style.top = "0px";
                pb.style.paddingBottom = "0px";
                pb.children[0].style.paddingTop = "0px";
            }, 700);

            function actions() {
                if (chat_panel.style.display == "" || chat_panel.style.display == '') {
                    chat_panel.style.display = "none";
                    top_panel.style.display = "none";
                } else {
                    chat_panel.style.display = "";
                    top_panel.style.display = "";
                };
            };

            create_my_button(actions);
        }
    } else {
        setTimeout(()=>{
            foo();
        }, 100);
    }
})();

function create_my_button(func) {

    var my_button = document.createElement('div');

    my_button.className = 'my_button';
    my_button.onclick = func;

    my_button.innerHTML += '≡';

    document.body.appendChild(my_button);

    var style = document.createElement('style');

    // Внешний вид кнопки
    style.innerHTML += '.my_button {background-color:#0000004d; border-radius:100%; bottom: 3px; right: 3px; position: fixed; height:50px; width:50px; font: initial; font-size: 32pt; text-align: center; color: white; cursor: pointer; user-select: none;}';

    document.body.appendChild(style);
}
