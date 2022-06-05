import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useMatch, useParams } from 'react-router-dom'
import { ArrowDownIcon } from '../../services/img.import.service'
import { ArrowUpIcon } from '../../services/img.import.service'
import { onLogout } from '../../store/actions/user.action'
import { DefaultAvatarIcon } from '../../services/img.import.service'
import { OptionsMenu } from '../util/options-menu'
import { Search } from '../search/search'
import { setHeaderSongResults } from '../../store/actions/header.action'
import { PlayIcon, PauseIcon } from '../../services/img.import.service'
import { setIsPlayPauseBtn } from '../../store/actions/header.action'
import { getActionSetStation } from '../../store/actions/station.action'
import { setCurrSong } from '../../store/actions/current-song.action'





export const AppHeader = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

    // const { color } = useSelector(storeState => storeState.headerModule)
    const { isPlayPauseBtn, currPageStation, color } = useSelector(storeState => storeState.headerModule)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const { isPlaying, currSong} = useSelector(storeState => storeState.currSongModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const [isPlayShow, setIsPlayShow] = useState(true)
    const [colorToShow, setColorToShow] = useState('')

    const matchStation = useMatch('music/station/:stationId')
    const matchNewStation = useMatch('music/station')
    const isSearchPage = useMatch('music/search')
    const isLikedSongsPage = useMatch('music/liked')


    const { user } = useSelector(storeState => storeState.userModule)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        
        if (isLikedSongsPage) setColorToShow('rgb(80, 56, 160)')
        else if (matchStation) setColorToShow(color)
        else if (matchNewStation) setColorToShow('rgb(83,83,83)')
        else if(isSearchPage) setColorToShow('rgb(7,7,7)')
        else setColorToShow('')
        

        if (stationModule?.station?._id === matchStation?.params?.stationId) return
        dispatch(setIsPlayPauseBtn(false))
    }, [color, params])


    useEffect(() => {
        if (stationModule?.station?._id === matchStation?.params?.stationId){
            setIsPlayShow(isPlaying)
        } 
        else setIsPlayShow(false)
    }, [isPlaying, currPageStation])



    const onTogglePlayer = () => {
        if (!currSong) {
            onPlayStation()
            setIsPlayShow(isPlaying)
        }
        else if (stationModule.station._id !== currPageStation?._id) onPlayStation()
        else if (isPlaying) {
            player.pauseVideo()
        }
        else if (!isPlaying) {
            player.playVideo()
        }
    }

    
    const onPlayStation = () => {
        dispatch(getActionSetStation(currPageStation))
        dispatch(setCurrSong(currPageStation.songs[currPageStation.currSongIdx]))
    }


    const onNavigate = (route) => {
        navigate(route)
    }

    const onUserLogout = () => {
        dispatch(onLogout())
    }

    const toggleMenuOpen = () => {
        setIsMenuOpen((prevIsMenuOpen => !prevIsMenuOpen))
    }

    const conveySongsToStore = (songResults) => {
        dispatch(setHeaderSongResults(songResults))
    }

    return <header className="app-header" style={{ background: `${colorToShow}` }}>

        {isSearchPage &&
            <Search onSearchSongs={conveySongsToStore} />
        }
        {!isSearchPage &&
            //TODO: Player button needs to be here 
            <div >

                {isPlayPauseBtn ?

                    <div className='header-play-pause' onClick={onTogglePlayer}>
                        {isPlayShow ? <PauseIcon /> : <PlayIcon />}
                    </div>
                    :
                    <div></div>
                }
            </div>
        }

        {user ? <>
            <button onClick={
                toggleMenuOpen}
                onBlur={()=>setIsMenuOpen(false)}
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