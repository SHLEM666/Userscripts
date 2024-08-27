// ==UserScript==
// @name         PicTest
// @namespace    http://tampermonkey.net/
// @version      0.40
// @description  try to take over the world!
// @author       SHLEM666
// @match        https://yandex.ru/company
// @match        https://yandex.ru/company/
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

    change_image(data, property) {
        this.image_element.style.setProperty(property, 'url(' + data + ')');
    }

    change_text() {
        this.text_element.innerHTML = window.pictest.controll_panel.text_input.value;
    }

    edit() {
        window.pictest.controll_panel.initialize(this);
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
        this.text_element = this.item.getElementsByClassName("feature__title")[0].children[0];
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
            new Change_theme_client(this.item, "card-showcase_theme_white", "card-showcase_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("yandex-service")[0], "yandex-service_color_white", "yandex-service_color_black"),
            new Change_theme_client(this.item.getElementsByClassName("icon-inline_type_external-link")[0], "icon-inline_color_white", "icon-inline_color_black")
        ];
        this.text_element = this.item.getElementsByClassName("product-card__title")[0];
        this.image_element = this.item.getElementsByClassName("card-showcase__img")[0];
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
        this.image_style_property = "--news-card-image";
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
    <input class="button_change_theme" type="button" value="Change theme">
    `,
            replacement: ""});
        return pairs;
    }
}

class News_statistic_card extends News_card {

    constructor(elem) {
        super(elem);
        this.digit_element = this.get_digit_element();
        this.image_element = this.item.getElementsByClassName("card-text__image")[0];
        this.image_style_property_desktop = "--card-text-image-desktop";
        this.image_style_property_mobile = "--card-text-image-mobile";
        this.change_theme_clients = [
            new Change_theme_client(this.item, "card-text_theme_white", "card-text_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("yandex-service")[0], "yandex-service_color_white", "yandex-service_color_black"),
            new Change_theme_client(this.item.getElementsByClassName("icon-inline_type_external-link")[0], "icon-inline_color_white", "icon-inline_color_black")
        ];
    }

    click_handler(event) {
        super.click_handler(event);
        window.pictest.news_statistic_cards.edit(this);
    }

    get_replacement_pairs() {
        let pairs = [];
        pairs.push({
            pattern: `
    <textarea class="controll_panel_card_text" placeholder="Feature text"></textarea><br>`,
            replacement: `
    <textarea class="controll_panel_card_digit" placeholder="Feature text"></textarea><br>
    <textarea class="controll_panel_card_text" placeholder="Feature text"></textarea><br>`});
        pairs.push({
            pattern: "// STRING TO REPLACE //",
            replacement: `
    <p class="file_input_lable">Desktop image<br>
      <input class="file_input" type="file" data-style_property="` + this.image_style_property_desktop + `" multiple="false">
    </p>
    <p class="file_input_lable">Mobile image<br>
      <input class="file_input" type="file" data-style_property="` + this.image_style_property_mobile + `" multiple="false">
    </p>`});
        return pairs;
    }

    get_text_element() {
        return this.item.getElementsByClassName("card-text__text")[0];
    }

    get_digit_element() {
        return this.item.getElementsByClassName("card-text__digit")[0];
    }

    change_text() {
        super.change_text();
        this.digit_element.innerHTML = window.pictest.controll_panel.digit_input.value;
    }
}

class News_longread_card extends News_card {

    constructor(elem) {
        super(elem);
        this.change_theme_clients = [
            new Change_theme_client(this.item, "news-card_theme_white", "news-card_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("yandex-service")[0], "yandex-service_color_white", "yandex-service_color_black"),
            new Change_theme_client(this.item.getElementsByClassName("icon-inline_type_external-link")[0], "icon-inline_color_white", "icon-inline_color_black")
        ];
    }

    click_handler(event) {
        super.click_handler(event);
        window.pictest.news_longread_cards.edit(this);
    }

    get_replacement_pairs() {
        let pairs = super.get_replacement_pairs();
        pairs.push({
            pattern: `
    <input class="button_change_theme" type="button" value="Change theme">
    `,
            replacement: `
    <input class="button_change_theme" type="button" value="Change theme"><br><br>
    <textarea class="controll_panel_card_bg_color" placeholder="#color-code"></textarea><br>
    <input class="button_change_bg_color" type="button" value="Change color">
    <input class="color_picker" type="color"><br>
  `});
        return pairs;
    }

    change_bg_color() {
        this.item.style.setProperty("--news-card-bg", window.pictest.controll_panel.bg_color_input.value);
    }

    set_color_to_picker() {
        window.pictest.controll_panel.color_picker.value = window.pictest.controll_panel.bg_color_input.value;
    }

    set_color_from_picker(event) {
        window.pictest.controll_panel.bg_color_input.value = event.target.value;
        window.pictest.controll_panel.target.change_bg_color();
    }
}

class Video_card extends News_card {
    constructor(elem) {
        super(elem);
        this.image_style_property_desktop = "--card-text-image-desktop";
        this.image_style_property_mobile = "--card-text-image-mobile";
        this.change_theme_clients = [
            new Change_theme_client(this.item, "card-video_theme_white", "card-video_theme_black"),
            new Change_theme_client(this.item.getElementsByClassName("yandex-service")[0], "yandex-service_color_white", "yandex-service_color_black"),
            new Change_theme_client(this.item.getElementsByClassName("icon-inline_type_external-link")[0], "icon-inline_color_white", "icon-inline_color_black")
        ];
    }

    create_image_element() {
        let elem = document.createElement("div");
        elem.className = "card-text__image card-text__image card-text__image_loaded";
        this.item.prepend(elem);
        return elem;
    }

    change_image(data, property) {
        if (!this.image_element) {
            this.change_class_name();
            this.remove_video_element();
            this.image_element = this.create_image_element();
        }
        this.image_element.style.setProperty(property, 'url(' + data + ')');
    }

    change_class_name() {
        this.item.className += " card-text";
    }

    remove_video_element() {
        this.item.getElementsByClassName("card-video__video")[0].remove();
    }

    get_text_element() {
        return this.item.getElementsByClassName("card-video__title")[0].children[0];
    }

    get_replacement_pairs() {
        let pairs = [];
        pairs.push({
            pattern: "// STRING TO REPLACE //",
            replacement: `
    <p class="file_input_lable">Desktop image<br>
      <input class="file_input" type="file" data-style_property="` + this.image_style_property_desktop + `" multiple="false">
    </p>
    <p class="file_input_lable">Mobile image<br>
      <input class="file_input" type="file" data-style_property="` + this.image_style_property_mobile + `" multiple="false">
    </p>`});
        return pairs;
    }

    click_handler(event) {
        super.click_handler(event);
        window.pictest.video_cards.edit(this);
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
        if (this.item) {
            if (this.item.classList.contains(this.white_theme_class_name)) {
                this.set_black_theme();
            } else {
                this.set_white_theme();
            }
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
        this.elem.addEventListener("input", this.input_handler);
        this.elem.addEventListener("focusin", this.focusin_handler);
        this.hide();
        this.base_html = `
<div class="controll_panel">
  <div class="controll_panel_header">PicTest v` + GM.info.script.version + `</div>
  <div class="controll_panel_content">
    <input class="insert_symbol_1" type="button" value='" "' title="Insert non-breaking space">
    <input class="insert_symbol_2" type="button" value='" &#8629; "' title="Insert new line">
    <input class="insert_symbol_3" type="button" value='"–"' title="Insert em dash">
    <input class="insert_symbol_4" type="button" value='"«"' title="Insert left-pointing double angle quotation mark">
    <input class="insert_symbol_5" type="button" value='"»"' title="Insert right-pointing double angle quotation mark"><br>
    <textarea class="controll_panel_card_text" placeholder="Feature text"></textarea><br>
    <input class="button_change_text" type="button" value="Change text">
    <input class="button_change_theme" type="button" value="Change theme">
    // STRING TO REPLACE //
  </div>
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
  }
  .controll_panel {
    position: absolute;
    background-color: white;
    text-align: left;
    border-radius: 0em;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.5);
    filter: progid:DXImageTransform.Microsoft.shadow(direction=180, color=#000000, strength=10);
  }
  .controll_panel_header {
    padding: 0em 0em 0em 0.5em;
    font-size: 0.7em;
    cursor: move;
    background-color: #E3E3E3;
  }
  .controll_panel_content {
    padding: 0.5em 1em 0em 1em;
  }
  .controll_panel_hidden {
    display: none;
  }
  .controll_panel_card_text {
    width: 97%;
    height: 70pt;
    resize: none;
    margin-top: 12px;
  }
  .controll_panel_card_digit {
    width: 97%;
    height: 12pt;
    resize: none;
    margin-top: 12px;
  }
  .controll_panel_card_bg_color {
    width: 97%;
    height: 12pt;
    resize: none;
  }
</style>
`;
    }

    show() {
        this.elem.classList.remove("controll_panel_hidden");
        this.shade_wrapper();
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

    shade_wrapper() {
        this.elem.style.backgroundColor = "rgba(0,0,0,0.5)";
    }

    unshade_wrapper() {
        this.elem.style.backgroundColor = "rgba(0,0,0,0.0)";
    }

    initialize(target) {
        this.show();
        this.target = target;
        this.last_focused_input = undefined;
        this.elem.innerHTML = this.build_html();
        this.controll_panel_body = document.getElementsByClassName("controll_panel")[0];
        this.text_input = this.elem.getElementsByClassName("controll_panel_card_text")[0];
        this.text_input.value = target.text_element.innerHTML;
        if (target.digit_element) {
            this.digit_input = this.elem.getElementsByClassName("controll_panel_card_digit")[0];
            this.digit_input.value = target.digit_element.innerHTML;
        }
        if (target.constructor.name == "News_longread_card") {
            this.bg_color_input = this.elem.getElementsByClassName("controll_panel_card_bg_color")[0];
            this.bg_color_input.value = target.item.style.getPropertyValue("--news-card-bg");
            this.color_picker = this.elem.getElementsByClassName("color_picker")[0];
            this.color_picker.value = target.item.style.getPropertyValue("--news-card-bg");
        }
        this.set_start_position();
        dragElement(this);
    }

    set_start_position() {
        if (!this.hasOwnProperty("x_pos")) {
            let wrapper_width = Number(window.getComputedStyle(this.elem).width.split("px")[0]);
            let controll_panel_width = Number(window.getComputedStyle(this.controll_panel_body).width.split("px")[0]);
            let wrapper_height = Number(window.getComputedStyle(this.elem).height.split("px")[0]);
            let controll_panel_height = Number(window.getComputedStyle(this.controll_panel_body).height.split("px")[0]);
            this.x_pos = (wrapper_width / 2) - (controll_panel_width / 2);
            this.y_pos = (wrapper_height / 2) - (controll_panel_height / 2);
        }
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
        let input = window.pictest.controll_panel.last_focused_input;
        if (input) {
            let str = input.value;
            let index = input.selectionStart;
            input.value = str.slice(0, index) + symbol + str.slice(index);
            setTimeout(()=>{
                input.selectionStart = index + symbol.length;
            }, 1);
        }
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
        // Button change text
        if (event.target.className == "button_change_text") {
            window.pictest.controll_panel.target.change_text();
        }
        // Button change theme
        if (event.target.className == "button_change_theme") {
            window.pictest.controll_panel.target.change_theme();
        }
        // Button change color
        if (event.target.className == "button_change_bg_color") {
            window.pictest.controll_panel.target.change_bg_color();
        }
        // Color picker
        if (event.target.className == "color_picker") {
            window.pictest.controll_panel.unshade_wrapper();
        }
        // Connroll panel
        if (event.target.className == "controll_panel") {
            window.pictest.controll_panel.shade_wrapper();
        }
    }

    change_handler(event) {
        // File input
        if (event.target.className == "file_input") {
            window.pictest.controll_panel.read_file(
                event.target,
                event.target.dataset.style_property,
                window.pictest.controll_panel.target
            );
        }
         // Color picker
        if (event.target.className == "color_picker") {
            window.pictest.controll_panel.shade_wrapper();
        }
         // Color code input
        if (event.target.className == "controll_panel_card_bg_color") {
            window.pictest.controll_panel.target.set_color_to_picker();
        }
    }

    mousedown_handler(event) {
        // Wrapper
        if (event.target.className == "controll_panel_wrapper") {
            window.pictest.controll_panel.hide();
        }
        // Controll panel
        if (event.target.className == "controll_panel") {
        }
    }

    input_handler(event) {
        // Color picker
        if (event.target.className == "color_picker") {
            window.pictest.controll_panel.target.set_color_from_picker(event);
        }
    }

    focusin_handler(event) {
        // Text input or Digit input
        if (
            event.target.className == "controll_panel_card_text" ||
            event.target.className == "controll_panel_card_digit"
        ) {
            window.pictest.controll_panel.last_focused_input = event.target;
        }

    }

    read_file(input, property, target) {
        let file = input.files[0];
        let reader = new FileReader();
        reader.onload = function (event) {
            let image = document.createElement('img');
            image.src = event.target.result;
            image.onload = function() {
                target.change_image(event.target.result, property);
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
        this.products = new Parsed_elements_container(Product, "card-showcase");
        this.superblocks = new Parsed_elements_container(Superblock, "superblock-card");
        this.news_full_cards = new Parsed_elements_container(News_full_card, "news-card_full-image");
        this.news_half_cards = new Parsed_elements_container(News_half_card, "news-card_half-image");
        this.news_statistic_cards = new Parsed_elements_container(News_statistic_card, "card-text_type_statistic");
        this.news_longread_cards = new Parsed_elements_container(News_longread_card, "news-card_view_longread");
        this.video_cards = new Parsed_elements_container(Video_card, "card-video");
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

// =======================================================================================
// =================================== Thirdparty code ===================================
// =======================================================================================

function dragElement(obj) {
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	let elmnt = document.getElementsByClassName("controll_panel")[0];
	let header = document.getElementsByClassName("controll_panel_header")[0];
	header.onmousedown = dragMouseDown;
    elmnt.style.top = obj.y_pos + "px";
    elmnt.style.left = obj.x_pos + "px";

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		obj.x_pos = (elmnt.offsetLeft - pos1);
		obj.y_pos = (elmnt.offsetTop - pos2);

	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
