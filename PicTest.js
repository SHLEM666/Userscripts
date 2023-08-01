// ==UserScript==
// @name         PicTest
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/company
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yandex-team.ru
// @grant        none
// @run-at       document-start
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/PicTest.js
// @require      https://gist.githubusercontent.com/rainyjune/4951208/raw/1b127e91171d8aa650e27d3e720eb19636fc815b/gistfile1.js
// ==/UserScript==

class Parced_elems {

    constructor(class_name) {
        this.class_name = class_name;
        this.refresh();
    }

    refresh() {
        this.items = document.getElementsByClassName(this.class_name);
        this.set_onclick();
    }

    set_onclick() {
        var _this = this; // !!!
        [].forEach.call(this.items, function(item) {
            item.addEventListener('click', _this.click_handler);
        });
    }

     spoof_target(orig_elem) {
        let new_elemw = orig_elem.cloneNode(true);
        orig_elem.style.display = "none";
        orig_elem.parentElement.prepend(new_elemw);
    }

    change_theme() {
        if (classList(this.items[0]).contains(this.white_theme_class_name)) {
            this.set_black_theme();
        } else {
            this.set_white_theme();
        }
    }
}

class Features extends Parced_elems {

    constructor(class_name) {
        super(class_name);
        this.white_theme_class_name = "feature_theme_white";
    }

    refresh() {
        this.spoof_target(document.getElementsByClassName("slideshow")[0]);
        super.refresh();
        this.text_element = this.items[0].getElementsByClassName("feature__title")[0];
        window.onresize = this.correct_width;
    }

    correct_width() {
        window.pictest.features.items[0].parentElement.parentElement.style.width = window.getComputedStyle(document.body).width;
    }

    change_text(elem) {
        this.text_element.innerHTML = elem.getElementsByClassName("card_text")[0].value;
    }

    set_black_theme() {
        classList(this.items[0]).remove("feature_theme_white");
        classList(this.items[0]).add("feature_theme_black");
    }

    set_white_theme() {
        classList(this.items[0]).add("feature_theme_white");
        classList(this.items[0]).remove("feature_theme_black");
    }

    click_handler(e) {
        e.preventDefault();
        window.pictest.features.edit(this);
    }

    edit(target) {
        window.pictest.controll_panel.start_edit(target, this.build_html());
    }

    build_html() {
        return `
<div class="connroll_panel">
  <input class="insert_symbol_1" type="button" value='" "'><br>
  <textarea class="card_text" placeholder="Feature text" resi></textarea>
    <input class="pictest_button_change_text" type="button" value="Change text"><br>
  <p>
    <input class="change_theme_button" type="button" value="Change theme">
  </p>
  <p class="file_input_lable">Desktop image<br>
    <input class="file_input" type="file" data-style_property="feature-image-desktop" multiple="false">
  </p>
  <p class="file_input_lable">Tablet image<br>
    <input class="file_input" type="file" data-style_property="feature-image-tablet" multiple="false"></p>
  <p class="file_input_lable">Mobile image<br>
    <input class="file_input" type="file" data-style_property="feature-image-mobile" multiple="false">
  </p>

  <input class="pictest_button_cancle" type="button" value="Close"><br>
</div>
<style>
  .own_created_elems_hidden {
    display: none;
  }
  .connroll_panel_wrapper {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 20;
    text-align: center;
  }
  .connroll_panel_wrapper:after {
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    content: "";
  }
  .connroll_panel {
    background-color: white;
    text-align: left;
    padding: 1em;
    max-width: 98%;
    max-height: 100%;
    display: inline-block;
    vertical-align: middle;
    border-radius: 0em;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.5);
    filter: progid:DXImageTransform.Microsoft.shadow(direction=180, color=#000000, strength=10);
  }
  .card_text {
    width: 97%;
    height: 50pt;
    resize: none;
  }
</style>
`;
    }
}

class News_full extends Parced_elems {

}

class News_half extends Parced_elems {

}

class Products extends Parced_elems {

}

class Superblocks extends Parced_elems {

}

class Header extends Parced_elems {

    constructor(class_name) {
        super(class_name);
        this.logo = this.items[0].getElementsByClassName("logo");
        this.menu_services = this.items[0].getElementsByClassName("menu-services");
        this.white_theme_class_name = "header_theme_white";
    }

    refresh() {
        this.spoof_target(document.getElementsByClassName(this.class_name)[0]);
        super.refresh();
        this.text_element = this.items[0].getElementsByClassName("feature__title")[0];
        window.onresize = this.correct_width;
    }

    set_black_theme() {
        classList(this.items[0]).remove("header_theme_white");
        classList(this.items[0]).add("header_theme_black");

        classList(this.logo[0]).remove("logo_theme_white");
        classList(this.logo[0]).add("logo_theme_black");

        classList(this.menu_services[0]).remove("menu-services_theme_white");
        classList(this.menu_services[0]).add("menu-services_theme_black");
    }

    set_white_theme() {
        classList(this.items[0]).add("header_theme_white");
        classList(this.items[0]).remove("header_theme_black");

        classList(this.logo[0]).add("logo_theme_white");
        classList(this.logo[0]).remove("logo_theme_black");

        classList(this.menu_services[0]).add("menu-services_theme_white");
        classList(this.menu_services[0]).remove("menu-services_theme_black");
    }

    click_handler(e) {
        e.preventDefault();
    }
}

class Main_feed_button extends Parced_elems {

    click_handler() {
        setTimeout(()=>{
            window.pictest.refresh();
        }, 100);
    }
}

class Controll_panel {

    constructor() {
        this.elem = this.place();
        let _this = this;
        this.elem.addEventListener("click", _this.click_handler);
        this.elem.addEventListener("change", _this.change_handler);
        this.hide();
    }

    show() {
        classList(this.elem).remove("own_created_elems_hidden");
    }

    hide() {
        classList(this.elem).add("own_created_elems_hidden");
    }

    place() {
        let elem = document.createElement("div");
        elem.className = "connroll_panel_wrapper";
        document.body.append(elem);
        return elem;
    }

    start_edit(target, html) {
        this.show();
        this.target = target;
        this.elem.innerHTML = html;
        this.elem.getElementsByClassName("card_text")[0].value = window.pictest.features.text_element.innerHTML;
    }

    insert_symbol(event, symbol) {
        let text_input = event.target.parentElement.getElementsByClassName("card_text")[0];
        text_input.value = text_input.value + symbol;
    }

    click_handler(event) {

        // Button insert symbol 1
        if (event.target.className == "insert_symbol_1") {
            window.pictest.controll_panel.insert_symbol(event, "&nbsp;");
        }
        // Button change text
        if (event.target.className == "pictest_button_change_text") {
            window.pictest.features.change_text(this);
        }
        // Button change theme
        if (event.target.className == "change_theme_button") {
            window.pictest.header.change_theme(this);
            window.pictest.features.change_theme(this);
        }
        // Button Cancle
        if (event.target.className == "pictest_button_cancle") {
            window.pictest.controll_panel.hide(this);
        }
        // Wrapper
        if (event.target.className == "connroll_panel_wrapper") {
            //window.pictest.controll_panel.hide(this);
        }
    }

    change_handler(event) {
        // File input
        if (event.target.className == "file_input") {
            window.pictest.controll_panel.read_file(event.target, event.target.dataset.style_property, window.pictest.controll_panel.target);
        }
    }

    read_file(input, property, elem) {
        let file = input.files[0];
        let reader = new FileReader();
        reader.onload = function (event) {
            let image = document.createElement('img');
            image.src = event.target.result;
            image.onload = function() {
                elem.style.setProperty('--' + property, 'url("' + event.target.result + '")');
            };
            image.onerror = function() {
                alert("Failed to upload " + file.name);
            };
        };
        reader.readAsDataURL(file);
    }
}

class Pictest {

    constructor() {
        this.refresh();
        this.controll_panel = new Controll_panel();
        this.header = new Header("header");
        this.features = new Features("feature");
        this.main_feed_button = new Main_feed_button("main-feed__button");
    }

     refresh() {
        this.brake_links();
        this.news_full = new News_full("news-card_full-image");
        this.news_half = new News_half("news-card_half-image");
        this.products = new News_half("feed__product");
        this.superblocks = new News_half("superblock-card");
    }

    brake_links() {
        let links = document.getElementsByTagName("a");
        [].forEach.call(links, function(link) {
            link.addEventListener("click", (event) => event.preventDefault());
        });
    }
}

(function() {'use strict';

    window.onload = function() {
       window.pictest = new Pictest();
       console.log(window.pictest);
    }

    window.onbeforeunload = function() {
       window.scroll(0, 0);
    }
})();
