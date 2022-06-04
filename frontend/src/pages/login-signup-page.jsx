import { LoginSignup } from '../cmps/login-signup.jsx'
import { onLogin, onSignup } from '../store/actions/user.action.js'
import { useDispatch } from 'react-redux'
import { GoogleLogin} from 'react-google-login'

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

    const handleLogin = (googleData) => {
        console.log(googleData)
    }

    const handleFailure = (result) => {
        // alert("login error",result)
        console.log('id', process.env.REACT_APP_GOOGLE_CLIENT_ID);
    }
    return (
        <section className="user-login">
            <LoginSignup onLogin={onUserLogin} onSignup={onUserSignup} />
            <GoogleLogin 
            clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
        </section>
    )
}
