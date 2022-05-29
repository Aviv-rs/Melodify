const INITIAL_STATE = {
    currSong: null,
    isPlaying: false
}


export function currSongReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_CURRENT_SONG':
            return {
                ...state,
                currSong: action.song
            }
        case 'SET_IS_PLAYING':
            return {
                ...state,
                isPlaying: action.isPlaying
            }

        default:
            return state
    }
}