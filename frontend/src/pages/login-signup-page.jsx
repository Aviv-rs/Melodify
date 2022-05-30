import { LoginSignup } from '../cmps/login-signup.jsx'
import { onLogin, onSignup } from '../store/actions/user.action.js'
import { useDispatch } from 'react-redux'

export const LoginSignupPage = () => {
    const dispatch = useDispatch()

    const onUserLogin = async credentials => {
        try {
            await dispatch(onLogin(credentials))
        } catch (err) {
            throw err
        }
    }
    const onUserSignup = async credentials => {
        try {
            await dispatch(onSignup(credentials))
        } catch (err) {
            throw err
        }
    }
    return (
        <section className="user-login">
            <LoginSignup onLogin={onUserLogin} onSignup={onUserSignup} />
        </section>
    )
}
