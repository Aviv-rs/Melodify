import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
import { PlayIcon, PauseIcon, PlayNextIcon, PlayPrevIcon, VolumeIcon, VolumeMuteIcon } from '../services/img.import.service'
import { utilService } from '../services/util.service'
import { SliderBar } from './slider'
import { setCurrSong, setIsPlaying } from '../store/actions/current-song.action'
import { getActionSetStation } from '../store/actions/station.action'
import { Link } from 'react-router-dom'

export const MusicPlayer = () => {

    const { station } = useSelector((storeState) => storeState.stationModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const { isPlaying } = useSelector((storeState) => storeState.currSongModule)

    const opts = {
        height: '0',
        width: '0',
    }


    const currTimeInterval = useRef()
    const dispatch = useDispatch()
    const [player, setPlayer] = useState(null)
    // const [isPlaying, dispatch(setIsPlaying(!isPlaying))] = useState(false)
    const [songTime, setSongTime] = useState(0)
    const [songTotalTime, setTotalTime] = useState(0)
    const [volume, setVolume] = useState(100)

    const isDisabled = !player || !currSong

    useEffect(() => {
        // setSongTime(0)
        // dispatch(setIsPlaying(true))
    }, [currSong])

    useEffect(() => {
        player?.setVolume(volume)
    }, [volume])


    const playerOnReady = ({ target }) => {
        setPlayer(target)
        target.playVideo()
        setTotalTime(+target.getDuration())
    }

    const playerOnPlay = () => {
        dispatch(setIsPlaying(true))
        if (currTimeInterval.current) clearInterval(currTimeInterval.current)
        currTimeInterval.current = setInterval(() => setSongTime((prevSongTime) => prevSongTime + 1), 1000)
    }

    const handleTimeChange = ({ target }) => {
        setSongTime(+target.value)
        player.seekTo(+target.value)
    }

    const handleVolumeChange = ({ target }) => {
        setVolume(+target.value)
        player.setVolume(+target.value)
    }

    const toggleSongPlay = () => {
        if (!player) return
        dispatch(setIsPlaying(!isPlaying))
        if (isPlaying) {
            player.pauseVideo()
        }
        else {
            player.playVideo()
        }
    }

    const playerOnPause = () => {
        if (currTimeInterval.current) clearInterval(currTimeInterval.current)
    }

    const onChangeSong = (diff) => {
        const newStation = { ...station }

        newStation.currSongIdx = newStation.currSongIdx + diff
        if (newStation.currSongIdx < 0) {
            player.seekTo(0)
            setSongTime(0)
            return
        } else if (newStation.currSongIdx >= newStation.songs.length) return
        const currSong = newStation.songs[newStation.currSongIdx]
        dispatch(getActionSetStation(newStation))
        dispatch(setCurrSong(currSong))
        setSongTime(0)
        dispatch(setIsPlaying(true))
    }


    return (
        <div className='music-player'>
            <div className="left-side-controls">
                <div className="song-details">
                    <div className="song-img-container">

                        {currSong && <img src={currSong.imgUrl} alt="" />}
                    </div>
                    <div className="song-info">
                        <div className="song-name long-txt">{currSong?.title}</div>
                        <Link to={`station/${station?._id}`}>
                            <div className="station-name">{station?.name}</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <button disabled={isDisabled} className='btn-play-prev' onClick={() => onChangeSong(-1)} ><PlayPrevIcon fill='#b3b3b3' /></button>
                    <button disabled={isDisabled} onClick={toggleSongPlay} className="btn-toggle-play" >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button disabled={isDisabled} className='btn-play-next' onClick={() => onChangeSong(1)}><PlayNextIcon fill='#b3b3b3' /></button>
                </div>
                <div className='playBackSlide'>
                    <div className='time-elapsed'> {utilService.convertSecToMin(songTime)}</div>
                    <SliderBar maxValue={songTotalTime} disabled={isDisabled} handleChange={handleTimeChange} value={songTime} width={500} />
                    <div className='total-time'> {utilService.convertSecToMin(songTotalTime)}</div>
                </div>
            </div>

            <div className='right-side-controls'>
                <div className="volume-controls">
                    <button disabled={isDisabled} onClick={() => {
                        volume > 0 ? setVolume(0) : setVolume(100)
                    }} className="btn-volume">
                        {volume > 0 ? <VolumeIcon />
                            :
                            <VolumeMuteIcon />}
                    </button>
                    <SliderBar disabled={!currSong} handleChange={handleVolumeChange} value={volume} width={100} />
                </div>
            </div>

            <YouTube
                videoId={currSong?.id}
                opts={opts}
                onReady={playerOnReady}
                onPlay={playerOnPlay}
                onPause={playerOnPause}
                onEnd={() => onChangeSong(1)}
            />
        </div>
    )
}



