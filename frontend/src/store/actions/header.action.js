export function setHeaderColor(color) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_HEADER_COLOR', color })
        } catch (err) {
            console.log('err:', err)
        }
    }
}