'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var skypin$1 = require('skypin');

let default_options = {
    pinned: true,
    minified: true,
    relative_external: false,
    web_external: true,
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
                if (options.web_external) {
                    return { id, external: true };
                }
            }
            else if (options.shouldReplace(id)) {
                let custom = options.shouldReplace(id);
                return {
                    id: await skypin$1.skypin(typeof custom === 'string' ? custom : id, { min: options.minified, pin: options.pinned }),
                    external: true
                };
            }
        }
    };
}

exports.skypin = skypin;
