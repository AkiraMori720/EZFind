import AppNavigator from '../RootStack'
var _routeName = null;
var _type = null;
export var current_stackName = null;
export var prev_stackName = null;

export default (state, action) => {
  if(_routeName === null)
  {
    _routeName = action.routeName;
  }
  if (action.type.startsWith('Navigation/')) {
    const { type, routeName, actions } = action
    if(type == 'Navigation/RESET' && actions && actions.length > 0){
      prev_stackName = current_stackName;
      current_stackName = actions[0].routeName;
    }
    if(routeName == _routeName && type == _type)
      return state;
    _routeName = routeName;
    _type = type;
  }
  
  return AppNavigator.router.getStateForAction(action, state)
}
export const goBack = () => ({ type: 'Navigation/BACK' })