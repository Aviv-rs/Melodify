const INITIAL_STATE = {
   color: ''
}


export function headerReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_HEADER_COLOR':
            return {
                ...state,
                color: action.color
            }

        default:
            return state
    }
}