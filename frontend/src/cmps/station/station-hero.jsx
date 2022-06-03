import { useEffect, useState, useRef } from 'react'
import { StationDetailsPencil, StationDefaultIcon, PlayIcon, PauseIcon, Clock, BtnMoreIcon } from '../../services/img.import.service'
import { StationModal } from './station-modal'
import { useDispatch, useSelector } from 'react-redux'
import { getActionSetStation } from '../../store/actions/station.action'
import { setCurrSong } from '../../store/actions/current-song.action'
import { stationService } from '../../services/station.service'
import { useNavigate, useMatch } from 'react-router-dom'
import { OptionsMenu } from '../util/options-menu'
import { setIsPlayPauseBtn } from '../../store/actions/header.action'



export const StationHero = ({ station, handleImgUpload, setDescription, setTitle, onSaveDetails, title, description, tags, setTags }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const [isOpenMenu, setIsOpenMenue] = useState(false)
    const BtnRef = useRef()
    const isMatchStation = useMatch('music/station/:stationId')

    const stationModule = useSelector((storeState) => storeState.stationModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)


    useEffect(() => {
        if (stationModule?.station?._id === station?._id) setIsPlayShow(isPlaying)
    }, [station, isPlaying])

    useEffect(() => {
        if (!BtnRef.current) return
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (BtnRef.current && !entry.isIntersecting && isMatchStation) dispatch(setIsPlayPauseBtn(true))
            else dispatch(setIsPlayPauseBtn(false))

            return (() => dispatch(setIsPlayPauseBtn(false)))


        })
        observer.observe(BtnRef.current)

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

    return (
        <article className='hero-container'>
            <div className='hero-content' >

                <div className='hero-img hero-img-main' onClick={() => setIsModalOpen(true)}>
                    <StationDetailsPencil className='pencil' />
                    {(station.coverUrl) ?
                        <img src={station.coverUrl} alt="" />
                        : <StationDefaultIcon className='station-def-icon' />}
                </div>
                <div className='hero-details'>
                    <h2 className='playlist-txt flex align-center' >PLAYLIST</h2>
                    <span className='station-name-container'>
                        
                    <h1 className='station-name' onClick={() => setIsModalOpen(true)}>{station.name}</h1>
                    </span>
                    {station.description && <h2>{station.description}</h2>}
                    <div className="station-info flex align-center">
                        <div className="created-by">{station.createdBy.fullname || 'Guest'}</div>
                        <div className="like-count">1 like</div>
                        <div className="song-count">{station.songs.length + 'songs'}</div>
                        <div className="station-duration">{}</div>
                    </div>
                </div>
                {isModalOpen && <StationModal
                    onSaveDetails={onSaveDetails}
                    setDescription={setDescription}
                    description={description}
                    setTitle={setTitle}
                    title={title}
                    setIsModalOpen={setIsModalOpen}
                    handleImgUpload={handleImgUpload}
                    station={station}
                    tags={tags}
                    setTags={setTags}
                />}
            </div>
            <div className='hero-footer content-spacing'>
                {station.songs.length > 0 ?
                    <div className='buttons'>

                        <button className='btn-play' ref={BtnRef} onClick={onTogglePlayer}>
                            {isPlayShow ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        {!station.createdBy?.isAdmin &&
                            <span className='btn-more-hero-footer' onClick={() => setIsOpenMenue(!isOpenMenu)}>
                                <BtnMoreIcon />
                            </span>
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