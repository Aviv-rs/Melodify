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




export const StationHero = ({ station, handleImgUpload, onSaveDetails, setStation }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const [isOpenMenu, setIsOpenMenue] = useState(false)
    const [likeCount, setLikeCount] = useState(station.likedByUsers.length)

    const btnRef = useRef()
    const isMatchStation = useMatch('music/station/:stationId')

    const stationModule = useSelector((storeState) => storeState.stationModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const stationDuration = stationService.getStationDuration(station.songs)
    const [isLikeByLoggedUser, setIsLikeByLoggedUser] = useState(false)
    const loggedInUser = userService.getLoggedinUser()

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
        // setLikeCount(station.likedByUsers.length)
        const isUserLikedStationBefore = station.likedByUsers.find(user => user._id === loggedInUser?._id)
        if(isUserLikedStationBefore) setIsLikeByLoggedUser(true)
    }, [])




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

        } catch (error) {
            console.log('Can not delete', error)
        }
    }


    const onToggleLikeStation = async () => {
        try {
            if (!loggedInUser) {
                //TODO : add message to user that he cant like station if he is not logged in 
                console.log('TODO : add message to user that he cant like station if he is not logged in ');
                return
            }
            const isUserLikedStationBefore = station.likedByUsers.find(user => user._id === loggedInUser?._id)
            console.log("🚀 ~ file: station-hero.jsx ~ line 104 ~ onToggleLikeStation ~ station", station)
            let newStation = { ...station }
            if (isUserLikedStationBefore) {
                console.log('unlike!!')
                newStation.likedByUsers = newStation.likedByUsers.filter(user => user._id !== loggedInUser?._id)
                setIsLikeByLoggedUser(false)
            } else {
                console.log('like!!')
                newStation.likedByUsers.push(loggedInUser)
                setIsLikeByLoggedUser(true)
            }
            const savedStation = await stationService.save(newStation)
            
            setLikeCount(savedStation.likedByUsers.length)
            setStation(savedStation)
        } catch (error) {
            console.log('can not save a like')
            //TODO : add message to user that he cant like station if he is not logged in 
        }
    }

    return (
        <article className="hero-container">
            <div className="hero-content" >

                <div className="hero-img hero-img-main" onClick={() => setIsModalOpen(true)}>
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
                    {station.description && <h2>{station.description}</h2>}
                    <div className="station-info flex align-center">
                        <div className="created-by">{station.createdBy.fullname || 'Guest'} </div>
                        <span className="like-count">{station.likedByUsers.length} likes </span>
                        <span className="duration-and-song-count-container">

                            {station.songs.length + ' songs, '}

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
                            <button className='btn-more-hero-footer clean-btn' onClick={() => setIsOpenMenue(!isOpenMenu)}>
                                <BtnMoreIcon />
                            </button>
                        }

                        <OptionsMenu
                            options={[
                                { name: 'Delete', action: onRemoveStation },
                                { name: 'Edit', action: () => setIsModalOpen(true) },
                            ]}
                            isOpen={isOpenMenu && !station.createdBy?.isAdmin}
                            className={'station-menu'}
                        />

                    </div>
                    :
                    <span></span>
                }
            </div>
            {station._id &&
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
                </div>}
        </article>
    )
}