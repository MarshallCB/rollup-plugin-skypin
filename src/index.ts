import { skypin as sky } from 'skypin'

let default_options = {
  pinned: true,
  minified: true,
  relative_external: false,
  web_external: true,
  shouldReplace: ()=>true
}

type Options = {
  minified: boolean,
  pinned: boolean,
  relative_external: boolean,
  web_external: boolean,
  shouldReplace: (module_id:string)=>(boolean|string)
}

export function skypin(options:Options){
  options = { ...default_options, ...options }
  return {
    async resolveId(id:string){
      if(id.startsWith('.')){
        if(options.relative_external){
          return { id, external: true }
        }
      } else if(id.startsWith('https://') || id.startsWith('http://')){
        if(options.web_external){
          return { id, external: true }
        }
      } else if(options.shouldReplace(id)){
        let custom = options.shouldReplace(id)
        return {
          id: await sky(typeof custom === 'string' ? custom : id, { min: options.minified, pin: options.pinned}),
          external: true
        }
      }
    }
  }
}