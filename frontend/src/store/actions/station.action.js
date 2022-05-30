import { stationService } from "../../services/station.service"


// Action Creators:
export function getActionAddStation(station) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'ADD_STATION', station })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function getActionUpdateStation(station) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'UPDATE_STATION', station })
        } catch (err) {
            console.log('err:', err)
        }

    }
}
export function getActionSetStation(station) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_STATION', station })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function addStation(station) {
    return async (dispatch) => {
        try {
            const savedStation = await stationService.save(station)
            console.log('Added Station', savedStation);
            dispatch(getActionAddStation(savedStation))
            return savedStation
        } catch (err) {
            console.log('Cannot add station', err)
        }
    }
}

export function updateStation(station) {
    return async (dispatch) => {
        try {
            const savedStation = await stationService.save(station)
            console.log('Updated Station', savedStation);
            dispatch(getActionUpdateStation(savedStation))
            return savedStation
        } catch (err) {
            console.log('Cannot Update station', err)
        }
    }
}
