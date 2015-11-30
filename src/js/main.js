import doT from 'olado/doT'
import reqwest from 'reqwest'
import sheetURL from './lib/sheetURL'

import mainHTML from './text/main.html!text'

var templateFn = doT.template(mainHTML);
var sheet = sheetURL('1pmrlEZalQnqUHYT63y2fsrYbCXtbN1oAkEWHQ_n3VFA', true); // TODO: remove test

function app(el, config, rules) {
    el.innerHTML =  templateFn({rules, config});
}

export function init(el, context, config, mediator) {
    reqwest({
        'url': sheet,
        'type': 'json',
        'crossOrigin': true,
        'success': resp => app(el, config, resp.rules)
    });
}
