// ==UserScript==
// @name         Mathprofi
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.mathprofi.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	
    // Your code here...
	
    // Получаем ширину экрана
	var scr_wdth = document.documentElement.clientWidth - 50;

	// Получаем главный фрейм
	var main = document.getElementsByTagName('table')[0].children[0].children[1].children[1];

	// Прячим рекламу
	if ( main.children[0].tagName == 'NOINDEX') {
	    
	    main.children[0].style.display = 'none';
    };

	// Получаем меню
	var menu = document.getElementsByTagName('table')[0].children[0].children[1].children[0];

	// Прячим меню
	menu.style.display = "none";

	// Увеличиваем изображения
	(function change_img_dims() {

	    // Получаем все изображения
	    var imgs = main.getElementsByTagName('img');

	    var new_width;
	    var new_height;

	    [].forEach.call(imgs, function(img, i) {

	        var a = 3;

	        new_width = img.width * a;
	        new_height = img.height * a;

	        if (new_width > scr_wdth) {

	            img.width = scr_wdth;

	            img.height = new_height / (new_width / scr_wdth)

	        } else {

	            img.width = new_width;

	            img.height = new_height;
	        };
	    });
	})();

	// Создаем кнопку меню
	(function add_my_button() {

	    var my_button = document.createElement('div');

	    my_button.className = 'my_button';
	    my_button.onclick = toggle_menu;

	    my_button.innerHTML += '';

	    document.body.appendChild(my_button);

	    add_style();

	    function add_style() {

	        var style = document.createElement('style');

	        style.innerHTML += '.my_button {background-color:#0000004d; border-radius:100%; top: 0px; left:0px; position: fixed;height:100px; width:100px;}';

	        document.body.appendChild(style);
	    };

	    function toggle_menu() {

	        if (menu.style.display == "") {

	            menu.style.display = "none";

	        } else {

	            menu.style.display = "";
	        };
	    };
	})();
})();
