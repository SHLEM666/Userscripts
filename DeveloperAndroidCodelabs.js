// ==UserScript==
// @name         DeveloperAndroidCodelabs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       SHLEM666
// @match        https://developer.android.com/codelabs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=android.com
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/DeveloperAndroidCodelabs.js
// ==/UserScript==

(function() {
    'use strict';

    function foo() {

        var header = document.getElementById("codelab-title");
        var drawer = document.getElementById("drawer");
        var main = document.getElementById("main");
        var metadata = document.getElementsByClassName("metadata")[0]
        var controls = document.getElementById("controls");

        // Создаем кнопку меню
        (function add_my_button() {

            var my_button = document.createElement('div');

            my_button.className = 'my_button';
            my_button.onclick = toggle_view;

            my_button.innerHTML += '≡';

            document.body.appendChild(my_button);

            function toggle_view() {

                if (header.style.display == "") {

                    header.style.display = "none";
                    drawer.style.display = "none";
                    metadata.style.display = "none";
                    controls.style.display = "none";

                    main.style = "position: fixed; top: 0px; left: 0px; border: 0px; height: 100%; width: 100%;";

                } else {

                    header.style.display = "";
                    drawer.style.display = "";
                    metadata.style.display = "";
                    controls.style.display = "";

                    main.style = "";
                };
            };
        })();

        // Создаем стили
        (function add_style() {

            var style = document.createElement('style');

            // Внешний вид кнопки
            style.innerHTML += '.my_button {background-color:#0000004d; border-radius:100%; bottom: 3px; right: 14px; position: fixed; height:50px; width:50px; font: initial; font-size: 32pt; text-align: center; color: white;}';

            document.body.appendChild(style);
        })();
    }

    window.onload = function() {
        setTimeout(()=>{
            foo();
        }, 100);
    }

})();
