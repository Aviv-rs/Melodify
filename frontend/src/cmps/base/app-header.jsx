import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useMatch, useParams } from "react-router-dom"
import { ArrowDownIcon } from "../../services/img.import.service"
import { ArrowUpIcon } from "../../services/img.import.service"
import { onLogout } from "../../store/actions/user.action"
import { DefaultAvatarIcon } from "../../services/img.import.service"
import { OptionsMenu } from "../util/options-menu"
import { useScrollPosition } from "../../hooks/useScrollPosition"


export const AppHeader = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    // const scrollPosition = useScrollPosition()
    const scrollPosition = window.pageYOffset

    const { color } = useSelector(storeState => storeState.headerModule)
    const [colorToShow, setColorToShow] = useState('')
    const matchStation = useMatch('music/station/:stationId')
    const matchNewStation = useMatch('music/station')
    const { user } = useSelector(storeState => storeState.userModule)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        if (matchStation) setColorToShow(color)
        else if (matchNewStation) setColorToShow('rgb(83,83,83)')
        else setColorToShow('')
    }, [color, params])


    // const [offset, setOffset] = useState(0);

    // useEffect(() => {
    //     const onScroll = () => setOffset(window.pageYOffset);
    //     // clean up code
    //     window.removeEventListener('scroll', onScroll);
    //     window.addEventListener('scroll', onScroll, { passive: true });
    //     console.log(offset); 
    //     return () => window.removeEventListener('scroll', onScroll);
    // }, [offset]);
    // setInterval(() => {
    //     console.log('window.pageYOffset', window);
    //     console.log("🚀 ~ file: app-header.jsx ~ line 44 ~ AppHeader ~ offset", offset)
    // }, 1000);



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
        {user ? <>
            <button onClick={
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
            <OptionsMenu options={[{ name: 'Logout', action: onUserLogout }]} isOpen={isMenuOpen} className={'user-menu'} />
        </>

            : <div className="btns-container">
                <button onClick={() => onNavigate('/signup')} className="btn-signup">Sign up</button>
                <button onClick={() => onNavigate('/login')} className="btn-login">Log in</button>
            </div>}


    </header>
}