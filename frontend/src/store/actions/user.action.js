import { userService } from '../../services/user.service.js'

export function loadUsers() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function onLogin(credentials) {
    return async dispatch => {
        const user = await userService.login(credentials)
        dispatch({
            type: 'SET_USER',
            user,
        })
    }
}

export function onSignup(credentials) {
    return async dispatch => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user,
            })
        } catch (err) {
            console.log('Cannot signup', err)
        }
    }
}

export function onLogout() {
    return async dispatch => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null,
            })
        } catch (err) {
            console.log('Cannot logout', err)
        }
    }
}

export function setUserMsg(msg) {
    
    return dispatch => {
        dispatch({
            type: 'SET_MSG',
            msg,
        })
    }
}
