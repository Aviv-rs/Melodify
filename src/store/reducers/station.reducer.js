const INITIAL_STATE = {
    station: null
}


export function stationReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADD_STATION':
            return {
                ...state,
                station: action.station
            }
        case 'UPDATE_STATION':
            return {
                ...state,
                station: action.station
            }
        case 'SET_STATION':
            return {
                ...state,
                station: action.station
            }
    

        default:
            return state
    }
}