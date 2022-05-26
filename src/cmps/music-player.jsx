import { useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { PlayIcon, PauseIcon } from '../services/img.import.service'

export const MusicPlayer = ({ songId }) => {
    const { currSong } = useSelector((storeState) => storeState.currSongModule)

    if (currSong) songId = currSong.songId
    const opts = {
        height: '0',
        width: '0',
    }

    const rangeRef = useRef()
    const [songTime, setSongTime] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [song, setSong] = useState(null)

    const songOnReady = ({ target }) => {
        setSong(target)
        setSongTime(target.getDuration())
        rangeRef.current.onchange = (ev) => {
            target.seekTo(+ev.target.value)
        }
    }

    const toggleSongPlay = () => {
        if (!song) return
        setIsPlaying((prevIsPlaying) => !prevIsPlaying)
        isPlaying ? song.pauseVideo() : song.playVideo()
    }
    return (
        <div className='music-player'>
            <div className="player-controls">
                <button onClick={toggleSongPlay} className="btn-toggle-play" >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <input type="range" min={0} max={songTime} ref={rangeRef} />
                <div> {songTime}</div>
            </div>

            <YouTube videoId={songId}
                opts={opts}
                onReady={songOnReady}
            />
        </div>
    )


}


