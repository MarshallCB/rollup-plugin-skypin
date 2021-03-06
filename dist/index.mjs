import { skypin as skypin$1 } from 'skypin';

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
                    id: await skypin$1(typeof custom === 'string' ? custom : id, { min: options.minified, pin: options.pinned }),
                    external: true
                };
            }
        }
    };
}

export { skypin };
