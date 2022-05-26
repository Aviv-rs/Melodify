const INITIAL_STATE = {
    currSong: null
}


export function currSongReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_CURRENT_SONG':
            return {
                ...state,
                currSong: action.song
            }

        default:
            return state
    }
}