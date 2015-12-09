import rAF from './rAF';

function getOffset(el) {
    return el ? el.offsetTop + getOffset(el.offsetParent) : 0;
}

function toggleClass(el, toggle, className) {
    if (toggle) {
        el.className += ' ' + className;
    } else {
        el.className = el.className.replace(new RegExp(className, 'g'), '').trim();
    }
    return toggle;
}

export default function sticky(parentEl, stickyEl) {
    var isSticky = false, isBottom = false;

    window.addEventListener('scroll', () => {
        rAF(() => {
            var pageY = window.pageYOffset;
            var parentTop = getOffset(parentEl);

            var newBottom = pageY > parentTop + parentEl.clientHeight - stickyEl.clientHeight;
            var newSticky = pageY >= parentTop && !newBottom;

            if (isSticky !== newSticky) {
                isSticky = toggleClass(parentEl, newSticky, 'is-sticky');
            }
            if (isBottom !== newBottom) {
                isBottom = toggleClass(parentEl, newBottom, 'is-bottom');
            }
        });
    });
}
