const INITIAL_STATE = {
    currSong: null//current song - this is a song that is played right now from search. not from playlist/station
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