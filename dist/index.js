'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var skypin$1 = require('skypin');

let default_options = {
    pinned: true,
    minified: true,
    relative_external: false,
    shouldReplace: () => true
};
function skypin(options) {
    options = { ...default_options, ...options };
    return {
        async resolveId(id) {
            if (id.startsWith('.')) {
                if (options.relative_external) {
                    return { id, external: true };
                }
            }
            else if (id.startsWith('https://') || id.startsWith('http://')) {
                return { id, external: true };
            }
            else if (options.shouldReplace(id)) {
                return {
                    id: await skypin$1.skypin(id, { minified: options.minified, pinned: options.pinned }),
                    external: true
                };
            }
        }
    };
}

exports.skypin = skypin;
