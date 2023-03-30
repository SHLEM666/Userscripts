// ==UserScript==
// @name         Mathprofi
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *.mathprofi.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mathprofi.ru
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/Mathprofi.js
// ==/UserScript==

(function() {
    'use strict';

	// Получаем рекламу
    var ads = document.getElementsByTagName('NOINDEX');

    // Прячим рекламу
    [].forEach.call(ads, function(ad, i) {
        ad.style.display = "none";
    });

    // Получаем главный фрейм
    var main = document.getElementsByTagName('table')[0].children[0].children[1].children[1];

	// Получаем меню
	var menu = document.getElementsByTagName('table')[0].children[0].children[1].children[0];

	// Прячим меню
	menu.style.display = "none";

    // Расширяем меню
    menu.width = "";

	// Увеличиваем изображения
	(function change_img_dims() {

        // Получаем ширину экрана
        var scr_wdth = document.documentElement.clientWidth - 50;

	    // Получаем все изображения
	    var imgs = main.getElementsByTagName('img');

	    var new_width;
	    var new_height;

	    [].forEach.call(imgs, function(img, i) {

	        var factor = 3;

	        new_width = img.width * factor;
	        new_height = img.height * factor;

	        if (new_width > scr_wdth) {

	            img.width = scr_wdth;

	            img.height = new_height / (new_width / scr_wdth)

	        } else {

	            img.width = new_width;

	            img.height = new_height;
	        };
	    });
	})();

    // Создаем стили
    (function add_style() {

        var style = document.createElement('style');

        // Внешний вид кнопки
        style.innerHTML += '.my_button {background-color:#0000004d; border-radius:100%; top: 30px; right: 30px; position: fixed; height:100px; width:100px; font-size: 65pt; text-align: center; color: white;}';

        // Размеры контейнеров меню
        style.innerHTML += '#bar, #bar1 {height: auto; width: 100%;}';

        // Увеличиваем шрифт ссылок в меню
        style.innerHTML += 'a.classbar {display: block;}';

        // Увеличиваем шрифт заголовков в меню
        style.innerHTML += 'p.classtopic {margin: 75px 0px 35px 0px; font-size: 20pt;}';

        document.body.appendChild(style);
    })();

	// Создаем кнопку меню
	(function add_my_button() {

	    var my_button = document.createElement('div');

	    my_button.className = 'my_button';
	    my_button.onclick = toggle_menu;

	    my_button.innerHTML += '≡';

	    document.body.appendChild(my_button);

	    function toggle_menu() {

	        if (menu.style.display == "") {

	            menu.style.display = "none";
                main.style.display = "";

	        } else {

	            menu.style.display = "";
                main.style.display = "none";
	        };
	    };
	})();
})();
