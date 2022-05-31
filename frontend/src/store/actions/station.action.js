import { stationService } from "../../services/station.service"


// Action Creators:
export function getActionSetStation(station) {
    return { type: 'SET_STATION', station }
}

export function addStation(station) {
    return async (dispatch) => {
        try {
            const savedStation = await stationService.save(station)
            console.log('Added Station', savedStation);
            dispatch(getActionSetStation(savedStation))
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
            dispatch(getActionSetStation(savedStation))
            return savedStation
        } catch (err) {
            console.log('Cannot Update station', err)
        }
    }
}
