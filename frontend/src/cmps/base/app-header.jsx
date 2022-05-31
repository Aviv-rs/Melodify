import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ArrowDownIcon } from "../../services/img.import.service"
import { ArrowUpIcon } from "../../services/img.import.service"
import { onLogout } from "../../store/actions/user.action"
import { DefaultAvatarIcon } from "../../services/img.import.service"

export const AppHeader = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(storeState => storeState.userModule)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const onNavigate = (route) => {
        navigate(route)
    }

    const onUserLogout = () => {
        dispatch(onLogout())
    }

    const toggleMenuOpen = () => {
        setIsMenuOpen((prevIsMenuOpen => !prevIsMenuOpen))
    }

    return <header className="app-header">
        {user ? <button onClick={
            toggleMenuOpen}
            onBlur={toggleMenuOpen}
            className={`btn-user-menu ${isMenuOpen ? 'open' : ''}`}>
            {user.avatar ?
                <div className="avatar-container">
                    <img src={user.avatar} alt="" />

                </div>
                :
                <div className="default-avatar-container">
                    <DefaultAvatarIcon />
                </div>
            }
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
        {user && isMenuOpen && <div className="user-menu">
            <ul className="option-list clean-list">
                <li className="option" onMouseDown={onUserLogout}>Logout</li>
            </ul>
        </div>}
    </header>
}