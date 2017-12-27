// TODO: transpile ES6 to ES5
(() => {
    'use strict';

    let Scrollable = {
        init: (selector) => {
            let nodes = document.querySelectorAll(selector);

            nodes.forEach((node) => {
                node.onclick = (e) => {
                    let nodeTarget = document
                        .querySelector(e.target.getAttribute('data-scroll-to'));

                    if (nodeTarget) {
                        window.scroll({
                            top: nodeTarget.offsetTop,
                            left: 0,
                            behavior: 'smooth',
                        });
                    } else {
                        console.warn('Scrollable -> scrol-to target is null');
                    }
                };
            });
        },
    };

    document.addEventListener('DOMContentLoaded', () => {
        Scrollable.init('[data-scrollable]');
    });
})();
