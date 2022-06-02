import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong } from '../../store/actions/current-song.action'
import { PlayIcon, PauseIcon, BtnMoreIcon, LikedSongsIcon, LikeIconHollow } from '../../services/img.import.service'
import { getActionSetStation } from '../../store/actions/station.action'
import { useEffect, useRef, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Draggable } from 'react-beautiful-dnd'
import { OptionsMenu } from '../util/options-menu'
import { userService } from '../../services/user.service'


export const SongPreview = ({ song, songIdx, station, onRemoveSong }) => {

    const dispatch = useDispatch()
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const [duration, setDuration] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAdminStation, setIsAdminStation] = useState(station.createdBy?.isAdmin)
    const [isUserAdmin, setIsUserAdmin] = useState(userService.getLoggedinUser()?.isAdmin)

    const optionsMenuRef = useRef()



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


    return (<Draggable draggableId={song.id} key={song.id} index={songIdx}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="song-preview" onDoubleClick={onTogglePlayer}>

                <div className='play-song-container flex align-center' onClick={onTogglePlayer}>
                    <div className="inner-container">

                        {!isPlayShow && <button className="btn-play"> <PlayIcon /> </button>}
                        {isPlayShow && <button className="btn-play"> <PauseIcon /> </button>}
                        <span className='song-number'>{songIdx + 1}</span>
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
                    <div className="btn-like"><LikeIconHollow fill="#fff" /></div>
                    <div className='duration'>{duration}</div>
                    {!isAdminStation || (isAdminStation && isUserAdmin) &&
                        <div ref={optionsMenuRef}>
                            <button onClick={toggleMenuOpen} className='btn-more-options'><BtnMoreIcon /></button>
                            <OptionsMenu
                                setIsOpen={setIsMenuOpen}
                                isOpen={isMenuOpen}
                                options={[{
                                    name: 'Remove song from playlist',
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