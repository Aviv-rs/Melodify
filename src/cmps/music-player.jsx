import { useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { PlayIcon, PauseIcon, PlayNextIcon, PlayPrevIcon, VolumeIcon, VolumeMuteIcon } from '../services/img.import.service'
import { utilService } from '../services/util.service'
import { PlayBackBar } from './slider'

export const MusicPlayer = ({ songId }) => {

    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    if (currSong) songId = currSong.songId
    const opts = {
        height: '0',
        width: '0',
    }
    const currTimeInterval = useRef()
    const [songTime, setSongTime] = useState(0)
    const [volume, setVolume] = useState(70)
    const [songTotalTime, setTotalTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [song, setSong] = useState(null)

    const songOnReady = ({ target }) => {
        setSong(target)
        setTotalTime(+target.getDuration())
    }
    const songOnPlay = () => {
        if (currTimeInterval.current) clearInterval(currTimeInterval.current)
        currTimeInterval.current = setInterval(() => setSongTime((prevSongTime) => prevSongTime + 1), 1000)
    }

    const handleTimeChange = ({ target }) => {
        setSongTime(+target.value)
        song.seekTo(+target.value)
    }

    const handleVolumeChange = ({ target }) => {
        setVolume(+target.value)
        song.setVolume(+target.value)
    }


    const toggleSongPlay = () => {
        if (!song) return
        setIsPlaying((prevIsPlaying) => !prevIsPlaying)
        if (isPlaying) {
            song.pauseVideo()
        }
        else {
            song.playVideo()
        }
    }

    const songOnPause = () => {
        if (currTimeInterval.current) clearInterval(currTimeInterval.current)
    }



    return (
        <div className='music-player'>
            <div className="song-details">
                {currSong && <img src={currSong.imgUrl} alt="" />}
            </div>
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <button className='btn-play-prev' ><PlayPrevIcon fill='#b3b3b3' /></button>
                    <button onClick={toggleSongPlay} className="btn-toggle-play" >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button className='btn-play-next'><PlayNextIcon fill='#b3b3b3' /></button>
                </div>
                <div className='playBackSlide'>
                    <div className='time-elapsed'> {utilService.convertSecToMin(songTime)}</div>
                    <PlayBackBar disabled={!song} handleChange={handleTimeChange} value={songTime} width={500} />
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
                    <PlayBackBar disabled={!song} handleChange={handleVolumeChange} value={volume} width={100} />
                </div>
            </div>
            <YouTube videoId={songId}
                opts={opts}
                onReady={songOnReady}
                onPlay={songOnPlay}
                onPause={songOnPause}
            />
        </div>
    )
}


