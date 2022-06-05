import { useEffect, useState, useRef } from 'react'
import { StationDetailsPencil, StationDefaultIcon, LikeIconHollow, PlayIcon, PauseIcon, Clock, BtnMoreIcon, LikedSongsIcon } from '../../services/img.import.service'
import { StationModal } from './station-modal'
import { useDispatch, useSelector } from 'react-redux'
import { getActionSetStation } from '../../store/actions/station.action'
import { setCurrSong } from '../../store/actions/current-song.action'
import { stationService } from '../../services/station.service'
import { useNavigate, useMatch } from 'react-router-dom'
import { OptionsMenu } from '../util/options-menu'
import { setIsPlayPauseBtn } from '../../store/actions/header.action'
import { userService } from '../../services/user.service'
import { setUserMsg } from '../../store/actions/user.action'
import { socketService, SOCKET_EMIT_ENTERED_STATION, SOCKET_EMIT_STATION_UPDATED, SOCKET_EMIT_ACTIVITY_LOG } from '../../services/socket.service'


export const StationHero = ({ station, handleImgUpload, onSaveDetails, setStation }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    const btnRef = useRef()
    const isMatchStation = useMatch('music/station/:stationId')

    const stationModule = useSelector((storeState) => storeState.stationModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const stationDuration = stationService.getStationDuration(station.songs)
    const [isLikeByLoggedUser, setIsLikeByLoggedUser] = useState(false)
    const loggedInUser = userService.getLoggedinUser()

    const stationMenuRef = useRef()

    useEffect(() => {
        if (stationModule?.station?._id === station?._id) setIsPlayShow(isPlaying)
    }, [station, isPlaying])

    useEffect(() => {
        if (!btnRef.current) return
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (btnRef.current && !entry.isIntersecting && isMatchStation) dispatch(setIsPlayPauseBtn(true))
            else dispatch(setIsPlayPauseBtn(false))

            return (() => dispatch(setIsPlayPauseBtn(false)))


        })
        observer.observe(btnRef.current)

    }, [])

    useEffect(() => {
        const isUserLikedStationBefore = station.likedByUsers.find(user => user._id === loggedInUser?._id)
        if (isUserLikedStationBefore) setIsLikeByLoggedUser(true)
    }, [])

    useEffect(() => {
        const handleClickOutsideMenu = (ev) => {
            if (stationMenuRef.current && !stationMenuRef.current.contains(ev.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutsideMenu)
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu)
        }
    }, [stationMenuRef])




    const onTogglePlayer = () => {
        if (!currSong) {
            onPlayStation()
        }
        else if (stationModule.station._id !== station._id) onPlayStation()
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


    const onRemoveStation = async () => {
        try {
            await stationService.remove(station._id)
            navigate('/music/library')
            const activity = {
                entity: station,
                user: userService.getLoggedinUser() || 'Guest',
                type: 'Remove'
            }
            socketService.emit(SOCKET_EMIT_ACTIVITY_LOG, activity)
        } catch (error) {
            console.log('Can not delete', error)
        }
    }


    const onToggleLikeStation = async () => {
        try {
            const activity = {
                entity: station,
                user: userService.getLoggedinUser() || 'Guest',
                type: ''
            }

            if (!loggedInUser) {
                dispatch(setUserMsg({ type: 'danger', txt: 'Oops, must be a user to like playlist' }))
                return
            }
            const isUserLikedStationBefore = station.likedByUsers.find(user => user._id === loggedInUser?._id)
            let newStation = { ...station }
            if (isUserLikedStationBefore) {
                newStation.likedByUsers = newStation.likedByUsers.filter(user => user._id !== loggedInUser?._id)
                setIsLikeByLoggedUser(false)
                activity.type = 'unlike'
            } else {
                newStation.likedByUsers.push(loggedInUser)
                setIsLikeByLoggedUser(true)
                activity.type = 'like'
            }
            const savedStation = await stationService.save(newStation)
            setStation(savedStation)
            socketService.emit(SOCKET_EMIT_ACTIVITY_LOG, activity)
        } catch (error) {
            dispatch(setUserMsg({ type: 'danger', txt: 'Something went wrong, please try again later' }))
        }
    }

    const stationLikesTxt = station.likedByUsers.length > 1 ? station.likedByUsers.length + ' likes' : station.likedByUsers.length + ' like'
    const stationSongsTxt = station.songs.length > 1 ? station.songs.length + ' songs, ' : station.songs.length + ' song, '

    return (
        <article className="hero-container">
            <div className="hero-content" >

                <div className="hero-img" onClick={() => setIsModalOpen(true)}>
                    <StationDetailsPencil className="pencil" />
                    {(station.coverUrl) ?
                        <img src={station.coverUrl} alt="Station's cover image" />
                        : <StationDefaultIcon className="station-def-icon" />}
                </div>
                <div className="hero-details">
                    <h2 className="playlist-txt flex align-center" >PLAYLIST</h2>
                    <span className="station-name-container">

                        <h1 className="station-name" onClick={() => setIsModalOpen(true)}>{station.name}</h1>
                    </span>
                    {station.description && <h2 className='station-description'>{station.description}</h2>}
                    <div className="station-info flex align-center">
                        <div className="created-by">{station.createdBy.fullname || 'Guest'} </div>
                        {station.likedByUsers.length > 0 && <span className="like-count">{stationLikesTxt} </span>}
                        <span className="duration-and-song-count-container">

                            {stationSongsTxt}

                            <span className="station-duration">{
                                stationDuration && `${(stationDuration.hr) ?
                                    stationDuration.hr + ' hr ' + stationDuration.min + ' min '
                                    :
                                    stationDuration.min + ' min ' + stationDuration.sec + ' sec '}`
                            }
                            </span>
                        </span>
                    </div>
                </div>
                {isModalOpen && <StationModal
                    onSaveDetails={onSaveDetails}
                    setIsModalOpen={setIsModalOpen}
                    handleImgUpload={handleImgUpload}
                    station={station}
                />}
            </div>
            <div className='hero-footer content-spacing'>
                {station.songs.length > 0 ?
                    <div className='buttons'>

                        <button className='btn-play' ref={btnRef} onClick={onTogglePlayer}>
                            {isPlayShow ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <button className="btn-like clean-btn" onClick={onToggleLikeStation}>
                            {!isLikeByLoggedUser && <LikeIconHollow fill="#b3b3b3" />}
                            {isLikeByLoggedUser && <LikedSongsIcon fill="#1ed760" />}

                        </button>
                        {!station.createdBy?.isAdmin &&
                            <button className='btn-more-hero-footer clean-btn' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <BtnMoreIcon />
                            </button>
                        }

                        <div className="station-menu-container" ref={stationMenuRef}>

                            <OptionsMenu
                                options={[
                                    { name: 'Delete playlist', action: onRemoveStation },
                                    {
                                        name: 'Edit details', action: (ev) => {
                                            ev.stopPropagation()
                                            setIsModalOpen(true)
                                            setIsMenuOpen(false)
                                        }
                                    },
                                ]}
                                isOpen={isMenuOpen && !station.createdBy?.isAdmin}
                                className={'station-options-menu'}
                            />
                        </div>

                    </div>
                    :
                    <span></span>
                }
            </div>
            {station?.songs.length ?
                <div className="song-table-spacing">
                    <div className='table-header'>
                        <div className="song-index-container">
                            <span className='song-index'>#</span>
                        </div>
                        <div className="song-title-container">
                            <span>TITLE</span>
                        </div>
                        <div className="date-added-container">
                            <span>DATE ADDED</span>
                        </div>
                        <div className="duration-container">

                            <Clock />
                        </div>
                    </div>
                </div>
                : <></>
            }
        </article>
    )
}