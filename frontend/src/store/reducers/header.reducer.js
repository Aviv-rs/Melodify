const INITIAL_STATE = {
    color: '',
    songResults: [],
    isPlayPauseBtn: false
}


export function headerReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_HEADER_COLOR':
            return {
                ...state,
                color: action.color
            }
        case 'SET_HEADER_SONG_RESULTS':
            return {
                ...state,
                songResults: action.songResults
            }
        case 'SET_HEADER_SONG_RESULTS':
            return {
                ...state,
                songResults: action.songResults
            }
        case 'SET_HEADER_IS_PLAY_PAUSE_BUTTON':
            return {
                ...state,
                isPlayPauseBtn: action.isPlayPauseBtn
            }

        default:
            return state
    }
}