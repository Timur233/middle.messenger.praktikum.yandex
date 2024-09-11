const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<body></body>', {
    url: 'https://example.org/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.HTMLElement = window.HTMLElement;
global.NodeList = window.NodeList;
