// ==UserScript==
// @name         PicTest
// @namespace    http://tampermonkey.net/
// @version      0.27
// @description  try to take over the world!
// @author       SHLEM666
// @match        https://yandex.ru/company
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yandex.ru
// @grant        none
// @run-at       document-start
// @require      https://raw.githubusercontent.com/SHLEM666/Userscripts/main/PicTest.js
// ==/UserScript==

class Parced_element {

    set_onclick() {
        this.item.addEventListener('click', this.click_handler);
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

    change_text() {
        this.text_element.innerHTML = window.pictest.controll_panel.text_input.value;
    }

    edit() {
        window.pictest.controll_panel.initialze(this);
    }

    get_replacement_pairs() {
        return [{
            pattern: "// STRING TO REPLACE //",
            replacement: `
  <p class="file_input_lable">Image<br>
    <input class="file_input" type="file" data-style_property="` + this.image_style_property + `" multiple="false">
  </p>`}];
    }
}

class Header extends Parced_element {

    constructor() {
        super();
        this.item = this.spoof_target(
            document.getElementsByClassName("header")[0]
        );
        this.item.style.position = "absolute";
        this.change_theme_clients = [
            new Change_theme_client(this.item, "header_theme_white", "header_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("logo")[0], "logo_theme_white", "logo_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("menu-services")[0], "menu-services_theme_white", "menu-services_theme_black")
        ];
        this.set_onclick();
    }
}

class Main_feed_button extends Parced_element {

    constructor() {
        super();
        this.item = document.getElementsByClassName("main-feed__button")[0];
        this.set_onclick();
    }

    click_handler() {
        setTimeout(()=>{
            window.pictest.refresh();
        }, 100);
    }
}

class Feature extends Parced_element {

    constructor() {
        super();
        this.item = this.parse();
        this.change_theme_clients = [
            new Change_theme_client(this.item, "feature_theme_white", "feature_theme_black")
        ];
        this.text_element = this.item.getElementsByClassName("feature__title")[0];
        this.image_element = this.item;
        this.image_style_property_desktop = "--feature-image-desktop";
        this.image_style_property_tablet = "--feature-image-tablet";
        this.image_style_property_mobile = "--feature-image-mobile";
        this.set_onclick();
        window.addEventListener('resize', this.correct_width);
    }

    parse() {
        let new_elem = this.spoof_target(
            document.getElementsByClassName("slideshow")[0]
        );
        return new_elem.getElementsByClassName("feature")[0];
    }

    correct_width() {
        window.pictest.feature.item.parentElement.parentElement.style.width = window.getComputedStyle(document.body).width;
    }

    change_theme() {
        super.change_theme();
        window.pictest.header.change_theme();
    }

    click_handler(event) {
        super.click_handler(event);
        window.pictest.feature.edit();
    }

    get_replacement_pairs() {
        return [{
            pattern: "// STRING TO REPLACE //",
            replacement: `
  <p class="file_input_lable">Desktop image<br>
    <input class="file_input" type="file" data-style_property="` + this.image_style_property_desktop + `" multiple="false">
  </p>
  <p class="file_input_lable">Tablet image<br>
    <input class="file_input" type="file" data-style_property="` + this.image_style_property_tablet + `" multiple="false"></p>
  <p class="file_input_lable">Mobile image<br>
    <input class="file_input" type="file" data-style_property="` + this.image_style_property_mobile + `" multiple="false">
  </p>`}];
    }
}

class Product extends Parced_element {

    constructor(elem) {
        super();
        this.item = elem;
        this.change_theme_clients = [
            new Change_theme_client(this.item, "product-card_theme_white", "product-card_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("yandex-service")[0], "yandex-service_color_white", "yandex-service_color_black"),
            new Change_theme_client(this.item.getElementsByClassName("icon-inline_type_external-link")[0], "icon-inline_color_white", "icon-inline_color_black")
        ];
        this.text_element = this.item.getElementsByClassName("product-card__title")[0];
        this.image_element = this.item.getElementsByClassName("product-card__img")[0];
        this.image_style_property = "--product-image";
        this.set_onclick();
    }

    click_handler(event) {
        super.click_handler(event);
        window.pictest.products.edit(this);
    }
}

class Superblock extends Parced_element {

    constructor(elem) {
        super();
        this.item = elem;
        this.change_theme_clients = [
            new Change_theme_client(this.item, "superblock-card_theme_white", "superblock-card_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("icon-inline_type_external-link")[0], "icon-inline_color_white", "icon-inline_color_black")
        ];
        this.text_element = this.item.getElementsByClassName("superblock-card__title")[0].getElementsByTagName("span")[0];
        this.image_element = this.item.getElementsByClassName("superblock-card__img")[0];
        this.image_style_property_desktop = "--img-desktop";
        this.image_style_property_mobile = "--img-mobile";
        this.set_onclick();
    }

    click_handler(event) {
        super.click_handler(event);
        window.pictest.superblocks.edit(this);
    }

    get_replacement_pairs() {
        return [{
            pattern: "// STRING TO REPLACE //",
            replacement: `
  <p class="file_input_lable">Desktop image<br>
    <input class="file_input" type="file" data-style_property="` + this.image_style_property_desktop + `" multiple="false">
  </p>
  <p class="file_input_lable">Mobile image<br>
    <input class="file_input" type="file" data-style_property="` + this.image_style_property_mobile + `" multiple="false">
  </p>`}];
    }
}

class News_card extends Parced_element {

    constructor(elem) {
        super();
        this.item = elem;
        this.text_element = this.get_text_element();
        this.image_element = this.item.getElementsByClassName("news-card__image")[0];
        this.image_style_property = "--news-image";
        this.set_onclick();
    }

    get_text_element() {
        return this.item.getElementsByClassName("news-card__title")[0].getElementsByTagName("span")[0];
    }
}

class News_full_card extends News_card {

    constructor(elem) {
        super(elem);
        this.change_theme_clients = [
            new Change_theme_client(this.item, "news-card_theme_white", "news-card_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("yandex-service")[0], "yandex-service_color_white", "yandex-service_color_black"),
            new Change_theme_client(this.item.getElementsByClassName("icon-inline_type_external-link")[0], "icon-inline_color_white", "icon-inline_color_black")
        ];
    }

    get_text_element() {
        let title = this.item.getElementsByClassName("news-card__title")[0];
        if (title.children[0].className) {
            return title.getElementsByTagName("span")[1];
        } else {
            return title.getElementsByTagName("span")[0];
        }
    }

    click_handler(event) {
        super.click_handler(event);
        window.pictest.news_full_cards.edit(this);
    }
}

class News_half_card extends News_card {

    click_handler(event) {
        super.click_handler(event);
        window.pictest.news_half_cards.edit(this);
    }

    get_replacement_pairs() {
        let pairs = super.get_replacement_pairs();
        pairs.push({
            pattern: `
  <p>
    <input class="button_change_theme" type="button" value="Change theme">
  </p>`,
            replacement: ""});
        return pairs;
    }
}

class Parsed_elements_container {

    constructor(class_obj, class_name) {
        this.items_elements = document.getElementsByClassName(class_name);
        this.class_obj = class_obj;
        this.items = this.parse();
    }

    parse() {
        let result = [];
        let _this = this;
        [].forEach.call(this.items_elements, function(item) {
            result.push(new _this.class_obj(item));
        });
        return result;
    }

    edit(target) {
        let index = [].indexOf.call(this.items_elements, target)
        this.items[index].edit(target);
    }
}

class Change_theme_client {

    constructor(item, white_theme_class_name, black_theme_class_name) {
        this.item = item;
        this.white_theme_class_name = white_theme_class_name;
        this.black_theme_class_name = black_theme_class_name;
    }

    change_theme() {
        if (this.item.classList.contains(this.white_theme_class_name)) {
            this.set_black_theme();
        } else {
            this.set_white_theme();
        }
    }

    set_black_theme() {
        this.item.classList.remove(this.white_theme_class_name);
        this.item.classList.add(this.black_theme_class_name);
    }

    set_white_theme() {
        this.item.classList.add(this.white_theme_class_name);
        this.item.classList.remove(this.black_theme_class_name);
    }
}

class Controll_panel {

    constructor() {
        this.elem = this.place();
        this.elem.addEventListener("click", this.click_handler);
        this.elem.addEventListener("change", this.change_handler);
        this.elem.addEventListener("mousedown", this.mousedown_handler);
        this.hide();
        this.base_html = `
<div class="connroll_panel">
  <input class="insert_symbol_1" type="button" value='" "' title="Insert non-breaking space">
  <input class="insert_symbol_2" type="button" value='" &#8629; "' title="Insert new line">
  <input class="insert_symbol_3" type="button" value='"–"' title="Insert em dash">
  <input class="insert_symbol_4" type="button" value='"«"' title="Insert left-pointing double angle quotation mark">
  <input class="insert_symbol_5" type="button" value='"»"' title="Insert right-pointing double angle quotation mark"><br>
  <textarea class="controll_panel_card_text" placeholder="Feature text" resi></textarea><br>
  <input class="button_change_text" type="button" value="Change text">
  <p>
    <input class="button_change_theme" type="button" value="Change theme">
  </p>
  // STRING TO REPLACE //
  <input class="button_cancle" type="button" value="Close"><br>
</div>
<style>
  .controll_panel_wrapper {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 20;
    text-align: center;
  }
  .controll_panel_wrapper:after {
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
  .controll_panel_hidden {
    display: none;
  }
  .controll_panel_card_text {
    width: 97%;
    height: 60pt;
    resize: none;
    margin-top: 12px;
  }
</style>
`;
    }

    show() {
        this.elem.classList.remove("controll_panel_hidden");
    }

    hide() {
        this.elem.classList.add("controll_panel_hidden");
    }

    place() {
        let elem = document.createElement("div");
        elem.className = "controll_panel_wrapper";
        document.body.append(elem);
        return elem;
    }

    initialze(target) {
        this.show();
        this.target = target;
        this.elem.innerHTML = this.build_html();
        this.text_input = this.elem.getElementsByClassName("controll_panel_card_text")[0];
        this.text_input.value = target.text_element.innerHTML;
    }

    build_html() {
        let result = this.base_html;
        let pairs = this.target.get_replacement_pairs();
        [].forEach.call(pairs, function(pair) {
            result = result.replace(pair.pattern, pair.replacement);
        });
        return result;
    }

    insert_symbol(symbol) {
        let str = this.text_input.value;
        let index = this.text_input.selectionStart;
        this.text_input.value = str.slice(0, index) + symbol + str.slice(index);
    }

    click_handler(event) {
        // Button insert symbol 1
        if (event.target.className == "insert_symbol_1") {
            window.pictest.controll_panel.insert_symbol("&nbsp;");
        }
         // Button insert symbol 2
        if (event.target.className == "insert_symbol_2") {
            window.pictest.controll_panel.insert_symbol("<br>");
        }
         // Button insert symbol 3
        if (event.target.className == "insert_symbol_3") {
            window.pictest.controll_panel.insert_symbol("—");
        }
         // Button insert symbol 4
        if (event.target.className == "insert_symbol_4") {
            window.pictest.controll_panel.insert_symbol("«");
        }
         // Button insert symbol 5
        if (event.target.className == "insert_symbol_5") {
            window.pictest.controll_panel.insert_symbol("»");
        }
        // Button Cancle
        if (event.target.className == "button_cancle") {
            window.pictest.controll_panel.hide();
        }
        // Button change text
        if (event.target.className == "button_change_text") {
            window.pictest.controll_panel.target.change_text();
        }
        // Button change theme
        if (event.target.className == "button_change_theme") {
            window.pictest.controll_panel.target.change_theme();
        }
    }

    change_handler(event) {
        // File input
        if (event.target.className == "file_input") {
            window.pictest.controll_panel.read_file(
                event.target,
                event.target.dataset.style_property,
                window.pictest.controll_panel.target.image_element
            );
        }
    }

    mousedown_handler(event) {
        // Wrapper
        if (event.target.className == "controll_panel_wrapper") {
            window.pictest.controll_panel.hide();
        }
    }

    read_file(input, property, elem) {
        let file = input.files[0];
        let reader = new FileReader();
        reader.onload = function (event) {
            let image = document.createElement('img');
            image.src = event.target.result;
            image.onload = function() {
                elem.style.setProperty(property, 'url("' + event.target.result + '")');
            };
            image.onerror = function() {
                alert("Failed to upload " + file.name);
            };
        };
        if (file) {
            reader.readAsDataURL(file);
        }
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
        this.products = new Parsed_elements_container(Product, "product-card");
        this.superblocks = new Parsed_elements_container(Superblock, "superblock-card");
        this.news_full_cards = new Parsed_elements_container(News_full_card, "news-card_full-image");
        this.news_half_cards = new Parsed_elements_container(News_half_card, "news-card_half-image");
    }
}

(function() {'use strict';

    function wheel_handler(event) {
        event.preventDefault();
    }

    window.addEventListener("wheel", wheel_handler, {passive: false});

    window.onload = function() {
        window.pictest = new Pictest();
        setTimeout(()=>{
            window.removeEventListener("wheel", wheel_handler);
        }, 500);
    }

    window.onbeforeunload = function() {
       window.scroll(0, 0);
    }
})();
