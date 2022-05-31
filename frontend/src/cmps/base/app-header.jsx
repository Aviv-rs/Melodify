import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useMatch, useParams } from "react-router-dom"
import { ArrowDownIcon } from "../../services/img.import.service"
import { ArrowUpIcon } from "../../services/img.import.service"
import { onLogout } from "../../store/actions/user.action"
import { DefaultAvatarIcon } from "../../services/img.import.service"
import { useScrollPosition } from "../../hooks/useScrollPosition"


export const AppHeader = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const scrollPosition = useScrollPosition()

    const { color } = useSelector(storeState => storeState.headerModule)
    const [colorToShow, setColorToShow] = useState('')
    const match1 = useMatch('music/station/:stationId')
    const match2 = useMatch('music/station')
    const { user } = useSelector(storeState => storeState.userModule)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        if (match1 || match2) {
            setColorToShow(color)
        } else setColorToShow('')

    }, [color, params])

    const onNavigate = (route) => {
        navigate(route)
    }

    const onUserLogout = () => {
        dispatch(onLogout())
    }

    const toggleMenuOpen = () => {
        setIsMenuOpen((prevIsMenuOpen => !prevIsMenuOpen))
    }

    return <header className="app-header" style={{ background: `${colorToShow}` }}>
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