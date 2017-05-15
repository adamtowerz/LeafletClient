import title from './leaves/title'
import rawText from './leaves/rawText'
import JS from './leaves/js'

let leaves = {
  'title': title,
  'rawText': rawText,
  'JS': JS
}

export let fetchTemplate = (type, data, update, meta) => {
  return leaves[type].template(data, leaves[type].styles(data), update, meta)
}

// TODO: move to api
export let fetchActions = (type, data) => {
  return leaves[type].actions(data)
}
