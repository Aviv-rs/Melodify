const INITIAL_STATE = {
    station: null,
    isShuffle: false
}


export function stationReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'SET_STATION':
            return {
                ...state,
                station: action.station
            }
        case 'SET_SHUFFLE':
            return {
                ...state,
                isShuffle: action.isShuffle
            }

        default:
            return state
    }
}