import './polyfill/classList'

import doT from 'olado/doT'
import reqwest from 'reqwest'
import sheetURL from './lib/sheetURL'
import sticky from './lib/sticky'
import rAF from './lib/rAF'

import mainHTML from './text/main.html!text'

var templateFn = doT.template(mainHTML);
var sheet = sheetURL('1pmrlEZalQnqUHYT63y2fsrYbCXtbN1oAkEWHQ_n3VFA', true); // TODO: remove test

function app(el, config, rules) {
    el.innerHTML =  templateFn({rules, config});

    sticky(el, el.querySelector('.js-ls-container'));

    var ruleEls = [].slice.apply(el.querySelectorAll('.js-ls-rule'));
    var mapEls = [].slice.apply(el.querySelectorAll('.js-ls-map'));

    var lastMapEl;
    window.addEventListener('scroll', () => {
        rAF(() => {
            for (var i = ruleEls.length - 1; i >= 0; i--) {
                if (ruleEls[i].getBoundingClientRect().top < 20) {
                    if (mapEls[i] !== lastMapEl) {
                        if (lastMapEl) lastMapEl.classList.remove('is-selected');
                        lastMapEl = mapEls[i];
                        lastMapEl.classList.add('is-selected');
                    }
                    break;
                }
            }
        });
    });
}

export function init(el, context, config, mediator) {
    reqwest({
        'url': sheet,
        'type': 'json',
        'crossOrigin': true,
        'success': resp => app(el, config, resp.rules)
    });

}
