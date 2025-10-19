// ==UserScript==
// @name         so-wiki.ru
// @namespace    http://tampermonkey.net/
// @version      2025-10-19
// @description  try to take over the world!
// @author       SHLEM666
// @match        https://so-wiki.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=so-wiki.ru
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/So-Wiki.js
// ==/UserScript==

(function() {
    'use strict';

    let timerId1 = setInterval(function() {
        let right_bottom_video = document.getElementById("rec_player");
        if (right_bottom_video.style.display != "none") {
            right_bottom_video.style.display = "none";
            clearInterval(timerId1);
        };
    }, 1000);


    let timerId2 = setInterval(function() {
        let banner1 = document.getElementById("centralNotice");
        if (banner1.style.display != "none") {
            banner1.style.display = "none";
            clearInterval(timerId2);
        };
    }, 1000);

    let timerId3 = setInterval(function() {
        let banners_list = document.getElementsByClassName("ads_container");
        if (banners_list[0]) {
            [].forEach.call(banners_list, function(item) {
                item.style.display = "none";
            });
            clearInterval(timerId3);
        };
    }, 1000);

})();
