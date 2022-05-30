import { LoginSignup } from '../cmps/login-signup.jsx'
import { onLogin, onSignup } from '../store/actions/user.action.js'
import { useDispatch } from 'react-redux'

export const LoginSignupPage = () => {
    const dispatch = useDispatch()
    const onUserLogin = credentials => {
        console.log(credentials)
        dispatch(onLogin(credentials))
    }
    const onUserSignup = credentials => {
        console.log(credentials)
        dispatch(onSignup(credentials))
    }
    return (
        <section className="user-login">
            <LoginSignup onLogin={onUserLogin} onSignup={onUserSignup} />
        </section>
    )
}
