// ==UserScript==
// @name         CalcMe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *.calcme.com/*
// @icon         https://calcme.com/favicon.ico
// @grant        none
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/CalcMe.js
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

    if (/https:\/\/calcme.com/.test(w.location.href)) {

        "use strict";
        try {

            window.onbeforeunload = function() {
                return "Введенные вами данные могут не сохраниться";
            };

            var elem1 = document.createElement("style");

            //Панель главное меню (Google avatar / File / Settings)
            elem1.innerHTML += ".wrsUI_component.wrsUI_panel.wrsUI_flowPanel.wrsUI_flowPanelLeftToRight.wrsUI_toolbar.wrsUI_editbar.wrsUI_borderPanelAtSouth {right: 0px; top: 0px; position: fixed !important; z-index: 4; background-color: #4697cb; padding-left: 5px;}";

            //Исправление положения меню функций и символов
            //elem1.innerHTML += ".wrsUI_component.wrsUI_panel.wrsUI_flowPanel.wrsUI_flowPanelTopToBottom.wrsUI_panelLightBackground.wrsUI_leftBarsContainer.wrsUI_taskbarAccordionbarContainer.wrsUI_borderPanelAtWest.wrsUI_menuHidden {z-index: 5 !important;}";
            elem1.innerHTML += ".wrsUI_component.wrsUI_panel.wrsUI_flowPanel.wrsUI_flowPanelTopToBottom.wrsUI_toolbar.wrsUI_accordionbar {height: 100%; top: 0px !important;}";

            //Положение диалогового окна открытия и сохранения файла
            elem1.innerHTML += ".picker.shr-q-shr-r.picker-dialog {top: 5% !important;}";

            //Размеры диалогового окна открытия и сохранения файла
            //elem1.innerHTML += ".picker.shr-q-shr-r-shr-ud.picker-dialog-content {height: " + ((window.visualViewport.height/100)*90).toFixed(0) + "px !important;}";
            elem1.innerHTML += ".picker.shr-q-shr-r-shr-vd.picker-dialog-content {height: " + ((window.visualViewport.height/100)*90).toFixed(0) + "px !important;}";

            //Длина поля имени документа
            elem1.innerHTML += ".wrsUI_component.wrsUI_panel.wrsUI_flowPanel.wrsUI_flowPanelLeftToRight.wrsUI_leftBlock.wrsUI_borderPanelAtUndefined {width: calc(117% - 251px) !important;}";

            //Положение и размер кнопки "равно"
            elem1.innerHTML += ".wrsUI_component.wrsUI_button.wrsUI_buttonIcon.wrsUI_floatingButton {top: 0px; right: 10px; width: 30px; height: 30px;}";

            //Удаление кнопки "Справка"
            elem1.innerHTML += "#wrsUI_help {display: none;}";

            //Удаление кнопки "Cookie Preferences"
            elem1.innerHTML += "#ot-sdk-btn {display: none;}";

            //Удаление кнопки "Построение графиков"
            elem1.innerHTML += "#wrsUI_graphButton {display: none;}";

            document.body.appendChild(elem1);

        } catch (err) {

            alert(err);
        };
    };

})(window);
