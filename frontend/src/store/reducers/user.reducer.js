import { userService } from '../../services/user.service.js'
const initialState = {
    msg: null,
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null,
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break
        case 'SET_WATCHED_USER':
            newState = { ...state, watchedUser: action.user }
            break
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId),
            }
            break
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break
        case 'SET_MSG':
            newState = { ...state, msg: action.msg }
            break
        default:
    }

    return newState
}
