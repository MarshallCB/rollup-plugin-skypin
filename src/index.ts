import { skypin as sky } from 'skypin'

export type Options = {
  minified: boolean,
  pinned: boolean,
  relative_external: boolean,
  web_external: boolean,
  shouldReplace: (module_id: string) => (boolean | string)
}

let default_options: Options = {
  pinned: true,
  minified: true,
  relative_external: false,
  web_external: true,
  shouldReplace: (_id) => true
}


export function skypin(opts: Partial<Options> = {}) {
  const options = { ...default_options, ...opts } as Options
  return {
    name: 'skypin',
    async resolveId(id: string) {
      if(id.startsWith('.')) {
        if(options.relative_external) {
          return { id, external: true }
        }
      } else if(id.startsWith('https://') || id.startsWith('http://')) {
        if(options.web_external) {
          return { id, external: true }
        }
      } else if(options.shouldReplace(id)) {
        let custom = options.shouldReplace(id)
        return {
          id: await sky(typeof custom === 'string' ? custom : id, { min: options.minified, pin: options.pinned}),
          external: true
        }
      }
    }
  }
}
