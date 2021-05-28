import { combineReducers } from 'redux'
import configureStore from '../createStore'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
    //nav: require('./nav').default,
    global: require('./global').default,
    user: require('./user').default,
    filter: require('./filter').default
})

export default (helpersConfig) => {
    let finalReducers = reducers
    let { store } = configureStore(finalReducers, helpersConfig)

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('.').reducers
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}
