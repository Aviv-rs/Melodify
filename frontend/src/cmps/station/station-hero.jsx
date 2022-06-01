import { useEffect, useState } from 'react';
import { StationDetailsPencil, StationDefaultIcon, PlayIcon, PauseIcon, Clock, BtnMoreIcon } from '../../services/img.import.service'
import { StationModal } from './station-modal'
import { useDispatch, useSelector } from 'react-redux'
import { getActionSetStation } from '../../store/actions/station.action'
import { setCurrSong } from '../../store/actions/current-song.action'
import { stationService } from '../../services/station.service'
import { useNavigate } from 'react-router-dom'



export const StationHero = ({ station, handleImgUpload, setDescription, setTitle, onSubmit }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)

    useEffect(() => {
        if (stationModule?.station?._id === station?._id) setIsPlayShow(isPlaying)
    }, [station, isPlaying])


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
        setIsPlayShow(true)
    }


    const onRemoveStation = async () => {
        try {
            await stationService.remove(station._id)
            navigate('/music/library')
            
        } catch (error) {
            console.log('Can not delete', error);
        }
    }



    return (
        // <article className='hero-container' style={{ background: `linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%), ${colorAvg}` }}>
        <article className='hero-container'>
            <div className='hero-content' >

                <div className='hero-img hero-img-main' onClick={() => setIsModalOpen(true)}>
                    <StationDetailsPencil className='pencil' />
                    {(station.coverUrl) ?
                        <img src={station.coverUrl} alt="" />
                        : <StationDefaultIcon className='station-def-icon' />}
                </div>
                <div className='hero-details'>
                    <span>PLAYLIST</span>
                    <h1>{station.name}</h1>
                    <span>{station.description}</span>
                    {/* <span>{station.description}</span> */}
                </div>
                {isModalOpen && <StationModal onSubmit={onSubmit} setDescription={setDescription} setTitle={setTitle} setIsModalOpen={setIsModalOpen} handleImgUpload={handleImgUpload} station={station} />}
            </div>
            <div className='hero-footer'>
                {station.songs.length > 0 ?
                    <div className='buttons'>

                        <button onClick={onTogglePlayer}>
                            {isPlayShow ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <span onClick={onRemoveStation} className='button-more-hero-footer'>
                            <BtnMoreIcon />
                        </span>
                    </div>
                    :
                    <span></span>
                }
            </div>
            {station._id && <div className='table-header'>
                <span className='ashtag'>#</span>
                <span>TITLE</span>
                <span></span>
                <span>DATE ADDED</span>
                <Clock />
            </div>}
        </article>
    )
}