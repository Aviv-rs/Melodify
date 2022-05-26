// Action Creators:
export function getActionAddStation(station) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'ADD_STATION',  station })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

//TODO: getActionUpdateStation(savedStation)