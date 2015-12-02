import './polyfill/classList'

import doT from 'olado/doT'
import reqwest from 'reqwest'
import sheetURL from './lib/sheetURL'
import sticky from './lib/sticky'
import rAF from './lib/rAF'
import isAndroid from './lib/isAndroid'

import mainHTML from './text/main.html!text'

const breakpoint = 740;

var templateFn = doT.template(mainHTML);
var sheet = sheetURL('1pmrlEZalQnqUHYT63y2fsrYbCXtbN1oAkEWHQ_n3VFA', true); // TODO: remove test

function app(el, config, rules) {
    el.innerHTML = templateFn({rules, config});
    el.classList.add('ls-interactive');
    if (!guardian.api) {
        el.classList.add('ls-app');
    }

    sticky(el, el.querySelector('.js-ls-container'));

    var ruleEls = [].slice.apply(el.querySelectorAll('.js-ls-rule'));
    var mapEls = [].slice.apply(el.querySelectorAll('.js-ls-map'));

    var lastMapEl;
    function setSelected(prop, threshold) {
        rAF(() => {
            for (var i = ruleEls.length - 1; i >= 0; i--) {
                if (ruleEls[i].getBoundingClientRect()[prop] < threshold) {
                    if (mapEls[i] !== lastMapEl) {
                        if (lastMapEl) lastMapEl.classList.remove('is-selected');
                        lastMapEl = mapEls[i];
                        lastMapEl.classList.add('is-selected');
                    }
                    break;
                }
            }
            if (i < 0 && lastMapEl) {
                lastMapEl.classList.remove('is-selected');
                lastMapEl = undefined;
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (window.innerWidth < breakpoint) return;
        setSelected('top', 20);
    });

    var rulesEl = el.querySelector('.js-ls-rules');
    rulesEl.addEventListener('scroll', () => {
        setSelected('left', rulesEl.getBoundingClientRect().left + 20);
    });

    if (window.GuardianJSInterface && isAndroid()) {
        rulesEl.addEventListener('touchstart', () => {
            window.GuardianJSInterface.registerRelatedCardsTouch(true);
        });

        rulesEl.addEventListener('touchend', () => {
            window.GuardianJSInterface.registerRelatedCardsTouch(false);
        });
    }
}

export function init(el, context, config, mediator) {
    reqwest({
        'url': sheet,
        'type': 'json',
        'crossOrigin': true,
        'success': resp => app(el, config, resp.rules)
    });
}
