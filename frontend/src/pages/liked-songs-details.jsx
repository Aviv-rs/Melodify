import { userService } from '../services/user.service'
import { LikedSongsList } from '../cmps/liked/liked-songs-list'
import { stationService } from '../services/station.service'
import { LikedSongsHero } from '../cmps/liked/liked-songs-hero'
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { setCurrSong } from '../store/actions/current-song.action'
import { getActionSetStation } from '../store/actions/station.action'
import { useDispatch } from "react-redux"
import { PlayIcon,PauseIcon } from '../services/img.import.service'

export const LikedSongsDetails = () => {
    const [loggedUser, setLoggedUser] = useState({})
    const [songs, setSongs] = useState([])
    let userStation = stationService.getEmptyStation()
    userStation.songs = { ...loggedUser.likedSongs }
    userStation._id = 'liked'
    
    useEffect(()=>{
        const loggedInUser = userService.getLoggedinUser()
        if (!loggedInUser) return
        setLoggedUser(loggedInUser)
        setSongs(userService.getLoggedinUser().likedSongs)
    },[])

    useEffect(()=>{
        
    },[loggedUser, songs])


    const dispatch = useDispatch()
    const btnPlayRef = useRef()

    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const [isPlayShow, setIsPlayShow] = useState(false)

    useEffect(() => {
        if (stationModule?.station?._id === userStation?._id) setIsPlayShow(isPlaying)
    }, [userStation, isPlaying])

    const onTogglePlayer = () => {
        if (!currSong) {
            onPlayStation()
        }
        else if (stationModule.station._id !== 'liked') onPlayStation()
        else if (isPlaying) {
            player.pauseVideo()
        }
        else if (!isPlaying) {
            player.playVideo()
        }
    }

    const onPlayStation = () => {
        dispatch(getActionSetStation(userStation))
        dispatch(setCurrSong(userStation.songs[userStation.currSongIdx]))
    }

    if (loggedUser?.likedSongs) return (
        <div className='liked-songs-details'>
            <LikedSongsHero/>
            <div className="background-fade"></div>
            <div className="hero-footer content-spacing">
                <div className='buttons'>
                    <button className='btn-play' ref={btnPlayRef} onClick={onTogglePlayer}>
                        {isPlayShow ? <PauseIcon /> : <PlayIcon />}
                    </button>
                </div>
            </div>
            <LikedSongsList setLoggedUser={setLoggedUser} setSongs={setSongs} songs={songs} userStation={userStation} />
        </div>
    )
}