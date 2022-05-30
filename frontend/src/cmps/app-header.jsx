import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ArrowDownIcon } from "../services/img.import.service"
import { ArrowUpIcon } from "../services/img.import.service"

export const AppHeader = () => {

    const navigate = useNavigate()
    const { user } = useSelector(storeState => storeState.userModule)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const onNavigate = (route) => {
        navigate(route)
    }

    return <header className="app-header">
        {user ? <button onClick={
            () => setIsMenuOpen((prevIsMenuOpen => !prevIsMenuOpen))}
            className={`btn-user-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="avatar-container">
                <img src={user.avatar} alt="" />
            </div>
            <span>{user.fullname}</span>
            {isMenuOpen ?
                <ArrowUpIcon />
                :
                <ArrowDownIcon />
            }
        </button>
            : <div className="btns-container">
                <button onClick={() => onNavigate('/signup')} className="btn-signup">Sign up</button>
                <button onClick={() => onNavigate('/login')} className="btn-login">Log in</button>
            </div>}
    </header>
}