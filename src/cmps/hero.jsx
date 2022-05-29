import { useEffect, useState } from 'react';
import { StationDetailsPencil, StationDetMusic, StationDefaultIcon, PlayIcon, PauseIcon } from '../services/img.import.service'
import { StationModal } from './station-modal'
import getAverageColor from 'get-average-color'
import { useDispatch } from 'react-redux'
import { getActionSetStation } from '../store/actions/station.action'
import { setCurrSong } from '../store/actions/current-song.action'
export const Hero = ({ station, handleImgUpload, setDescription, setTitle, onSubmit }) => {

    console.log('station', station)
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [colorAvg, setColorAvg] = useState('rgb(83,83,83)')
    // const [classAvgColor, setClassAvgColor] = useState(`background: linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%), $clr10`)
    const [isPlay, setIsPlay] = useState(false)
    useEffect(() => {
        getAvgColor()
        // if (colorAvg) setClassAvgColor()
    }, [station])
    const getAvgColor = () => {
        getAverageColor(station.coverUrl).then(rgb => {
            console.log(rgb)
            const color = `rgb(${rgb.r},${rgb.g}, ${rgb.b})`
            setColorAvg(color)
        })
    }

    const togglePlay = () => {
        setIsPlay((prevIsplay) => !prevIsplay)
        if (!isPlay) onPlaySong()
    }

    const onPlaySong = () => {
        dispatch(getActionSetStation(station))
        dispatch(setCurrSong(station.songs[station.currSongIdx]))
    }
    //TODO : consult with the head team about pause song from here. This move might change alot..


    return (
        <article className='hero-container' style={{ background: `linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%), ${colorAvg}` }}>
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
                </div>
                {isModalOpen && <StationModal onSubmit={onSubmit} setDescription={setDescription} setTitle={setTitle} setIsModalOpen={setIsModalOpen} handleImgUpload={handleImgUpload} station={station} />}
            </div>
            <div className='hero-footer'>
                {station.songs.length > 0 ?
                    <button onClick={togglePlay}>
                        {isPlay ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    :
                    <span></span>
                }
            </div>
        </article>
    )
}