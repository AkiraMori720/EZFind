import createReducer, { RESET_STORE } from '../createReducer'

export const SET_FILTERS = 'Filter.SET_FILTERS'
export const CLEAR = 'Filter.CLEAR'

export const setFilters = (sortby, filterby) => (dispatch, getState) => {
    return dispatch({ type: SET_FILTERS, payload: { sortby, filterby } })
}
export const clear = () => ({ type: CLEAR })

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    sortby: null,
    filterby: null
}

export default createReducer(initialState, {
    [SET_FILTERS]: (state, { payload: { sortby, filterby } }) => ({
        sortby, filterby
    }),
    [CLEAR]: (state, action) => initialState,
})
