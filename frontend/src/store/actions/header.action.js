export function setHeaderColor(color) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_HEADER_COLOR', color })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function setHeaderSongResults(songResults) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_HEADER_SONG_RESULTS', songResults })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function setIsPlayPauseBtn(isPlayPauseBtn) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_HEADER_IS_PLAY_PAUSE_BUTTON', isPlayPauseBtn })
        } catch (err) {
            console.log('err:', err)
        }
    }
}