let assert = require('chai').assert;
let jsdom = require('jsdom-global')();
let $ = require('jquery');

function nuke(selector1, selector2) {
    if (selector1 === selector2) return;
    $(selector1).filter(selector2).remove();
}

describe("function nuke", function () {
    beforeEach(() => {
        document.body.innerHTML =
            `<div id="target">
                <div class="nested target">
                    <p>This is some text</p>
                </div>
                <div class="target">
                    <p>Empty div</p>
                </div>
                <div class="inside">
                    <span class="nested">Some more text</span>
                    <span class="target">Some <span>more</span> text</span>
                </div>
            </div>`
    });
    it("same selectors, should do nothing", function () {
        let old = $('body').html();

        nuke('#target', '#target');

        assert.equal($('body').html(), old);
    });
    it("valid data and when nothing to delete, should not change the html", () => {
        let old = $('body').html();

        nuke('.nested', '.inside');

        assert.equal($('body').html(), old);
    });
    it("valid data, should remove correct elements", () => {
        let old = $('body').html();

        nuke('.nested', '.target');

        assert.notEqual($('body').html(), old);
    });
});