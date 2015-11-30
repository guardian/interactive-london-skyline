import reqwest from 'reqwest'
import sheetURL from './lib/sheetURL'

import mainHTML from './text/main.html!text'

var sheet = sheetURL('1pmrlEZalQnqUHYT63y2fsrYbCXtbN1oAkEWHQ_n3VFA', true); // TODO: remove test

function app(el, config, rules) {
}

export function init(el, context, config, mediator) {
    el.innerHTML = mainHTML.replace(/%assetPath%/g, config.assetPath);

    reqwest({
        'url': sheet,
        'type': 'json',
        'crossOrigin': true,
        'success': resp => app(el, config, resp.rules)
    });
}
