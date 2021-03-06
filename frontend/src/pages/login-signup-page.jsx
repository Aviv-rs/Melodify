import { LoginSignup } from '../cmps/login-signup.jsx'
import { onLogin, onSignup } from '../store/actions/user.action.js'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'

export const LoginSignupPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onNavigate = (route) => {
        navigate(route)
    }

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
        <>
            <div className="btn-go-home-container">
                <button className='btn-go-home' onClick={() => onNavigate('/music')}>Home</button>
            </div>
            <section className="user-login">
                <LoginSignup onLogin={onUserLogin} onSignup={onUserSignup} />
               
            </section>
        </>
    )
}
