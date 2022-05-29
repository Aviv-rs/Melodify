
export function setCurrSong(song) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_CURRENT_SONG', song })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function setIsPlaying(isPlaying) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_IS_PLAYING', isPlaying })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

