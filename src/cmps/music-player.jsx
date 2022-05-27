import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
import { PlayIcon, PauseIcon, PlayNextIcon, PlayPrevIcon, VolumeIcon, VolumeMuteIcon } from '../services/img.import.service'
import { utilService } from '../services/util.service'
import { PlayBackBar } from './slider'
import { setCurrSong } from '../store/actions/current-song.action'
import { getActionSetStation } from '../store/actions/station.action'

export const MusicPlayer = () => {

    const { station } = useSelector((storeState) => storeState.stationModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)

    const opts = {
        height: '0',
        width: '0',
    }

    const currTimeInterval = useRef()
    const dispatch = useDispatch()
    const [player, setPlayer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [songTime, setSongTime] = useState(0)
    const [songTotalTime, setTotalTime] = useState(0)
    const [volume, setVolume] = useState(100)



    const playerOnReady = ({ target }) => {
        setPlayer(target)
        target.playVideo()
        setTotalTime(+target.getDuration())
    }

    const playerOnPlay = () => {
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
        setIsPlaying((prevIsPlaying) => !prevIsPlaying)
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
    }


    return (
        <div className='music-player'>
            <div className="song-details">
                {currSong && <img src={currSong.imgUrl} alt="" />}
            </div>
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <button className='btn-play-prev' onClick={() => onChangeSong(-1)} ><PlayPrevIcon fill='#b3b3b3' /></button>
                    <button onClick={toggleSongPlay} className="btn-toggle-play" >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button className='btn-play-next' onClick={() => onChangeSong(1)}><PlayNextIcon fill='#b3b3b3' /></button>
                </div>
                <div className='playBackSlide'>
                    <div className='time-elapsed'> {utilService.convertSecToMin(songTime)}</div>
                    <PlayBackBar maxValue={songTotalTime} disabled={!player} handleChange={handleTimeChange} value={songTime} width={500} />
                    <div className='total-time'> {utilService.convertSecToMin(songTotalTime)}</div>
                </div>
                {/* TODO: change time text font */}
                {/* TODO: add volume range input (make another component using material UI) */}
            </div>

            <div className='right-side-controls'>
                <div className="volume-controls">
                    <button className="btn-volume">
                        {volume > 0 ? <VolumeIcon />
                            :
                            <VolumeMuteIcon />}
                    </button>
                    <PlayBackBar disabled={!player} handleChange={handleVolumeChange} value={volume} width={100} />
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


// test data
// const ids = ["tcYodQoapMg",
//     , "QYh6mYIJG2Y",
//     "1ekZEVeXwek",
//     "SXiSVQZLje8",
//     "QYh6mYIJG2Y"]
