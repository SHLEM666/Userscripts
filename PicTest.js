// ==UserScript==
// @name         PicTest
// @namespace    http://tampermonkey.net/
// @version      0.22
// @description  try to take over the world!
// @author       SHLEM666
// @match        https://yandex.ru/company
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yandex-team.ru
// @grant        none
// @run-at       document-start
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/PicTest.js
// @require      https://gist.githubusercontent.com/rainyjune/4951208/raw/1b127e91171d8aa650e27d3e720eb19636fc815b/gistfile1.js
// ==/UserScript==

class Parced_element {

    set_onclick() {
        var _this = this;
        this.item.addEventListener('click', _this.click_handler);
    }

    click_handler(event) {
        event.preventDefault();
    }

    spoof_target(orig_elem) {
        let new_elem = orig_elem.cloneNode(true);
        orig_elem.style.display = "none";
        orig_elem.parentElement.prepend(new_elem);
        return new_elem;
    }

    change_theme() {
        [].forEach.call(this.change_theme_clients, function(change_theme_client) {
            change_theme_client.change_theme();
        });
    }
}

class Feature extends Parced_element {

    constructor() {
        super();
        this.item = this.parse();
        this.change_theme_clients = [];
        this.add_change_theme_clients();
        this.text_element = this.item.getElementsByClassName("feature__title")[0];
        this.image_element = this.item;
        this.set_onclick();
        window.addEventListener('resize', this.correct_width);
    }

    parse() {
        let new_elem = this.spoof_target(document.getElementsByClassName("slideshow")[0]);
        return new_elem.getElementsByClassName("feature")[0];
    }

    add_change_theme_clients() {
        this.change_theme_clients.push(
            new Change_theme_client(this.item, "feature_theme_white", "feature_theme_black")
        );
    }

    correct_width() {
        window.pictest.feature.item.parentElement.parentElement.style.width = window.getComputedStyle(document.body).width;
    }

    change_theme(elem) {
        super.change_theme(elem);
        window.pictest.header.change_theme();
    }

    change_text() {
        this.text_element.innerHTML = window.pictest.controll_panel.elem.getElementsByClassName("card_text")[0].value;
    }

    click_handler(event) {
        super.click_handler(event);
        window.pictest.feature.edit();
    }

    controll_panel_click_handler(event) {
        // Button change text
        if (event.target.className == "feature_button_change_text") {
            window.pictest.feature.change_text();
        }
        // Button change theme
        if (event.target.className == "feature_change_theme_button") {
            window.pictest.feature.change_theme(window.pictest.controll_panel.target.item);
        }
    }

    edit() {
        window.pictest.controll_panel.start_edit(this);
    }

    build_html() {
        return `
<div class="connroll_panel">
  <textarea class="card_text" placeholder="Feature text" resi></textarea>
  <input class="feature_button_change_text" type="button" value="Change text">
  <input class="insert_symbol_1" type="button" value='" "' title="Insert non-breaking space"><br>
  <p>
    <input class="feature_change_theme_button" type="button" value="Change theme">
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
  .insert_symbol_1 {
    position: absolute;
    margin: 6px 0px 0px 100px;
  }
</style>
`;
    }
}

class Header extends Parced_element {

    constructor() {
        super();
        this.item = this.parse();
        this.change_theme_clients = [];
        this.add_change_theme_clients();
        this.set_onclick();
    }

    parse() {
        return this.spoof_target(document.getElementsByClassName("header")[0]);
    }

    add_change_theme_clients() {
        this.change_theme_clients.push(
            new Change_theme_client(this.item, "header_theme_white", "header_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("logo")[0], "logo_theme_white", "gogo_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("menu-services")[0], "menu-services_theme_white", "menu-services_theme_black")
        );
    }
}

class Main_feed_button extends Parced_element {

    constructor() {
        super();
        this.item = this.parse();
        this.set_onclick();
    }

    parse() {
        return document.getElementsByClassName("main-feed__button")[0];
    }

    click_handler() {
        setTimeout(()=>{
            window.pictest.refresh();
        }, 100);
    }
}

class Product extends Parced_element {

    constructor(elem) {
        super();
        this.item = elem;
        this.change_theme_clients = [];
        this.add_change_theme_clients();
        this.text_element = this.item.getElementsByClassName("product-card__title")[0];
        this.image_element = this.item.children[0];
        this.set_onclick();
    }

    add_change_theme_clients() {
        this.change_theme_clients.push(
            new Change_theme_client(this.item, "product-card_theme_white", "product-card_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("yandex-service")[0], "yandex-service_color_white", "yandex-service_color_black")
        );
    }

    click_handler(event) {
        super.click_handler(event);
        window.pictest.products.edit(this);
    }

    edit() {
        window.pictest.controll_panel.start_edit(this);
    }

    change_text() {
        this.text_element.innerHTML = window.pictest.controll_panel.elem.getElementsByClassName("card_text")[0].value;
    }

    controll_panel_click_handler(event) {
        // Button change text
        if (event.target.className == "products_button_change_text") {
            window.pictest.products.change_text(window.pictest.controll_panel.target.item);
        }
        // Button change theme
        if (event.target.className == "products_change_theme_button") {
            window.pictest.products.change_theme(window.pictest.controll_panel.target.item);
        }
    }

    build_html() {
        return `
<div class="connroll_panel">
  <textarea class="card_text" placeholder="Feature text" resi></textarea>
  <input class="products_button_change_text" type="button" value="Change text">
  <input class="insert_symbol_1" type="button" value='" "' title="Insert non-breaking space"><br>
  <p>
    <input class="products_change_theme_button" type="button" value="Change theme">
  </p>
  <p class="file_input_lable">
    <input class="file_input" type="file" data-style_property="product-image" multiple="false">
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
  .insert_symbol_1 {
    position: absolute;
    margin: 6px 0px 0px 100px;
  }
</style>
`;
    }
}

class Parsed_elements_container {

    constructor() {
        this.items = this.parse();
    }

    parse() {
        let result = [];
        this._items = document.getElementsByClassName("product-card");
        [].forEach.call(this._items, function(product) {
            result.push(new Product(product));
        });
        return result;
    }

    edit(target) {
        let index = [].indexOf.call(this._items, target)
        this.items[index].edit(target);
    }

    change_text(target) {
        let index = [].indexOf.call(this._items, target)
        this.items[index].change_text();
    }

    change_theme(target) {
        let index = [].indexOf.call(this._items, target)
        this.items[index].change_theme();
    }
}

class Change_theme_client {

    constructor(item, white_theme_class_name, black_theme_class_name) {
        this.item = item;
        this.white_theme_class_name = white_theme_class_name;
        this.black_theme_class_name = black_theme_class_name;
    }

    change_theme() {
        if (classList(this.item).contains(this.white_theme_class_name)) {
            this.set_black_theme();
        } else {
            this.set_white_theme();
        }
    }

    set_black_theme() {
        classList(this.item).remove(this.white_theme_class_name);
        classList(this.item).add(this.black_theme_class_name);
    }

    set_white_theme() {
        classList(this.item).add(this.white_theme_class_name);
        classList(this.item).remove(this.black_theme_class_name);
    }
}

class Controll_panel {

    constructor() {
        this.elem = this.place();
        let _this = this;
        this.elem.addEventListener("click", _this.click_handler);
        this.elem.addEventListener("change", _this.change_handler);
        this.elem.addEventListener("mousedown", _this.mousedown_handler);
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

    start_edit(target) {
        this.show();
        this.target = target;
        this.elem.innerHTML = target.build_html();
        this.elem.getElementsByClassName("card_text")[0].value = target.text_element.innerHTML;
        this.elem.onclick = target.controll_panel_click_handler;
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
        // Button Cancle
        if (event.target.className == "pictest_button_cancle") {
            window.pictest.controll_panel.hide(this);
        }
    }

    change_handler(event) {
        // File input
        if (event.target.className == "file_input") {
            window.pictest.controll_panel.read_file(event.target, event.target.dataset.style_property, window.pictest.controll_panel.target.image_element);
        }
    }

    mousedown_handler(event) {
        // Wrapper
        if (event.target.className == "connroll_panel_wrapper") {
            window.pictest.controll_panel.hide(this);
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
        this.header = new Header();
        this.feature = new Feature();
        this.main_feed_button = new Main_feed_button();
    }

    refresh() {
        this.brake_links();
        this.products = new Parsed_elements_container();
        //this.news_full = new News_full("news-card_full-image");
        //this.news_half = new News_half("news-card_half-image");
        //this.superblock = new Superblock("superblock-card");
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
