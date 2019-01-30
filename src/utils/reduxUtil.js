const camelToBlank = (name) => 
  name.replace(/([A-Z])/g, ' $1').toLowerCase()

const createReducerHelper = ({typeList, actionList, defaultState}) => {
  
}

export const createReducer = ({ defaultState, name, actions = {}, isLocal }) => {
  const nameList = Array.isArray(name) ? name : [name]

  const typeList = nameList.map((name) => isLocal ? {
    update: `update ${camelToBlank(name)}`,
    reset: `reset ${camelToBlank(name)}`
  } : {
    request: `request ${camelToBlank(name)}`,
    receive: `recieve ${camelToBlank(name)}`
  })

  const actionList = {}
  Object.keys(actions).forEach(key => {
    actionList[camelToBlank(key)] = actions[key]
  })

  return createReducerHelper({typeList, actionList, defaultState})
}