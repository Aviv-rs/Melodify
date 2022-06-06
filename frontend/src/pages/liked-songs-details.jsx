import { userService } from '../services/user.service'
import { LikedSongsList } from '../cmps/liked/liked-songs-list'
import { stationService } from '../services/station.service'
import { LikedSongsHero } from '../cmps/liked/liked-songs-hero'
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { setCurrSong } from '../store/actions/current-song.action'
import { getActionSetStation } from '../store/actions/station.action'
import { useDispatch } from "react-redux"
import { PlayIcon, PauseIcon } from '../services/img.import.service'
import { likedSongsService } from '../services/liked.songs.service'
import { Loader } from '../cmps/util/loader'

export const LikedSongsDetails = () => {


    const dispatch = useDispatch()
    const btnPlayRef = useRef()

    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const [songs, setSongs] = useState([])
    const [station, setStation] = useState([])

    useEffect(() => {
        if (stationModule?.station?._id === station?._id) setIsPlayShow(isPlaying)
    }, [station, isPlaying])

    useEffect(() => {
        loadStation()
    }, [])


    const loadStation = async () => {
        const station = stationService.getEmptyStation()
        station._id = 'liked'
        const loggedInUser = userService.getLoggedinUser()
        if (!loggedInUser) {
            const songs = await likedSongsService.query()
            station.songs = songs
            setStation(station)
            setSongs(station.songs)
            return
        }
        
        station.songs = [ ...loggedInUser.likedSongs ]
        setStation(station)
        setSongs(station.songs)
    }


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
        dispatch(getActionSetStation(station))
        dispatch(setCurrSong(station.songs[station.currSongIdx]))
    }

    !songs && <div className="loader-logo"><Loader /></div>

    return (
        <div className='liked-songs-details'>
            <LikedSongsHero songs={songs} />
            <div className="background-fade"></div>
            <div className="hero-footer content-spacing">
                <div className='buttons'>
                    <button className='btn-play' ref={btnPlayRef} onClick={onTogglePlayer}>
                        {isPlayShow ? <PauseIcon /> : <PlayIcon />}
                    </button>
                </div>
            </div>
            <LikedSongsList setSongs={setSongs} songs={songs} userStation={station} />
        </div>
    )
}