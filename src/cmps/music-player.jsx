import { useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { Play, Pause } from '../services/img.import.service'

export const MusicPlayer = ({ videoId }) => {
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
        },
    }

    const rangeRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false)
    const [videoTime, setVideoTime] = useState(null)
    const [video, setVideo] = useState(null)

    const videoOnReady = ({ target }) => {
        setVideo(target)
        setVideoTime(target.getDuration())
        rangeRef.current.onchange = (ev) => {
            target.seekTo(+ev.target.value)
        }
    }

    const toggleVideoPlay = () => {
        if (!video) return
        setIsPlaying((prevIsPlaying) => !prevIsPlaying)
        isPlaying ? video.pauseVideo() : video.playVideo()
    }

    return (
        <div className='music-player'>
            <div className="player-controls">
                <button onClick={toggleVideoPlay} className="btn-toggle-play" >
                    {isPlaying ? <Pause /> : <Play />}
                </button>
                <input type="range" min={0} max={videoTime} ref={rangeRef} />
                <div> videoTime{videoTime}</div>
            </div>

            <YouTube videoId={videoId}
                opts={opts}
                onReady={videoOnReady}
            />
        </div>
    )


}


