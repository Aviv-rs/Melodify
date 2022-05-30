import { useNavigate } from "react-router-dom"

export const AppHeader = () => {

    const navigate = useNavigate()

    const onNavigate = (route) => {
        navigate(route)
    }

    return <header className="app-header">
        <div className="btns-container">
            <button onClick={() => onNavigate('signup')} className="btn-signup">Sign up</button>
            <button onClick={() => onNavigate('login')} className="btn-login">Log in</button>
        </div>
    </header>
}