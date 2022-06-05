import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong } from '../../store/actions/current-song.action'
import { PlayIcon, PauseIcon, BtnMoreIcon, LikedSongsIcon, LikeIconHollow } from '../../services/img.import.service'
import { getActionSetStation } from '../../store/actions/station.action'
import { useEffect, useRef, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Draggable } from 'react-beautiful-dnd'
import { OptionsMenu } from '../util/options-menu'
import songPlayingAnimation from '../../assets/imgs/song-playing-animation.gif'
import { userService } from '../../services/user.service'
import { setUserMsg } from '../../store/actions/user.action'
import { socketService, SOCKET_EMIT_ENTERED_STATION, SOCKET_EMIT_STATION_UPDATED, SOCKET_EMIT_ACTIVITY_LOG } from '../../services/socket.service'




export const SongPreview = ({ song, songIdx, station, onRemoveSong }) => {

    const dispatch = useDispatch()
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const { user } = useSelector((storeState) => storeState.userModule)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const [duration, setDuration] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAdminStation, setIsAdminStation] = useState(false)
    const loggedInUser = userService.getLoggedinUser()
    const [isLikeByLoggedUser, setIsLikeByLoggedUser] = useState(false)

    const optionsMenuRef = useRef()

    useEffect(() => {
        (station.createdBy.isAdmin) ?
            setIsAdminStation(true)
            :
            setIsAdminStation(false)
    }, [station])

    useEffect(() => {
        const handleClickOutsideMenu = (ev) => {
            if (optionsMenuRef.current && !optionsMenuRef.current.contains(ev.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutsideMenu)
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu)
        }
    }, [optionsMenuRef])


    useEffect(() => {
        if (song.duration) setDuration(song.duration)
        if (stationModule?.station?._id === station?._id
            && currSong?.id === song.id) setIsPlayShow(isPlaying)
        else setIsPlayShow(false)
    }, [station, isPlaying, currSong, stationModule])

    useEffect(() => {
        const isUserLikedSongBefore = loggedInUser?.likedSongs?.find(likedSong => likedSong.id === song.id)
        if(isUserLikedSongBefore) setIsLikeByLoggedUser(true)
    }, [])


    const onTogglePlayer = () => {
        if (currSong?.id !== song.id) dispatch(setCurrSong(song))
        else if (isPlaying) {
            player.pauseVideo()
        }
        else if (!isPlaying) player.playVideo()
        station.currSongIdx = songIdx
        dispatch(getActionSetStation(station))

    }

    const toggleMenuOpen = () => {
        setIsMenuOpen((prevIsMenuOpen => !prevIsMenuOpen))
    }

    const onTogggleLikeSong = async () => {
        try {
            const activity = {
                entity: song,
                user: userService.getLoggedinUser() || 'Guest',
                type: ''
            }
            if (!loggedInUser) {
                dispatch(setUserMsg({ type: 'danger', txt: 'Oops, must be a user to like song' }))
                return
            }
            const isUserLikedSongBefore = loggedInUser.likedSongs.find(likedSong => likedSong.id === song.id)
            let newUser = { ...loggedInUser }
            if(isUserLikedSongBefore){
                newUser.likedSongs =  newUser.likedSongs.filter(likedSong=> likedSong.id !== song.id)
                setIsLikeByLoggedUser(false)
                dispatch(setUserMsg({ type: 'success', txt: 'Removed to your liked songs' }))
                activity.type = 'unlike'
            }else{
                newUser.likedSongs.push(song)
                dispatch(setUserMsg({ type: 'success', txt: 'Added to your liked songs' }))
                setIsLikeByLoggedUser(true)
                activity.type = 'like'
            }
            userService.update(newUser)
            socketService.emit(SOCKET_EMIT_ACTIVITY_LOG, activity)

        } catch (error) {
            console.log('can not like song', error);
            if (loggedInUser) dispatch(setUserMsg({ type: 'danger', txt: 'Oops, something went wrong' }))
        }

    }


    return (<Draggable draggableId={song.id} key={song.id} index={songIdx}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`song-preview ${currSong?.id === song.id ? 'playing' : ''}`} onDoubleClick={onTogglePlayer}>

                <div className="play-song-container flex align-center" onClick={onTogglePlayer}>
                    <div className="inner-container">

                        {currSong?.id === song.id && isPlaying ?
                            <img className="song-playing-img" src={songPlayingAnimation}
                                alt="equaliser animation" />
                            :
                            <span className="song-number">{songIdx + 1}</span>
                        }
                        {!isPlayShow && <button className="btn-play"> <PlayIcon /> </button>}
                        {isPlayShow && <button className="btn-play"> <PauseIcon /> </button>}
                    </div>
                </div>
                <div className="img-and-title-container flex align-center">
                    <img src={song.imgUrl} alt="" />
                    <div className="title-container">
                        <div className="title">{song.title}</div>
                    </div>
                </div>
                <div className="created-at-container flex align-center">
                    <span>
                        {song?.createdAt && <ReactTimeAgo date={song.createdAt || Date.now()} locale="en-US" />}
                        {!song?.createdAt && <span></span>}
                    </span>
                </div>

                <div className="duration-and-actions-container flex align-center">
                    <div className="btn-like" onClick={onTogggleLikeSong}>
                        {!isLikeByLoggedUser &&<LikeIconHollow fill="#b3b3b3" />}
                        {isLikeByLoggedUser &&<LikedSongsIcon fill="#1ed760" height={'16px'} width={'16px'} />}
                    </div>
                    <div className="duration">{duration}</div>
                    <button onClick={toggleMenuOpen} className="btn-more-options"><BtnMoreIcon /></button>
                    {true &&
                        <div ref={optionsMenuRef}>
                            <OptionsMenu
                                setIsOpen={setIsMenuOpen}
                                isOpen={isMenuOpen}
                                options={[{
                                    name: "Remove song from playlist",
                                    action: () => {
                                        onRemoveSong(song.id)
                                        setIsMenuOpen(false)
                                    }
                                }
                                ]} />
                        </div>
                    }
                </div>



            </div>
        )}
    </Draggable>
    )
}