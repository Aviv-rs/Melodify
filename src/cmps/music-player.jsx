import { useRef, useState } from 'react'
import YouTube from 'react-youtube'

export const MusicPlayer = ({ videoId }) => {
    const opts = {
        height: '300',
        width: '300',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }
    const playRef = useRef()
    const pauseRef = useRef()
    const [videoTime, setVideoTime] = useState(null)
    const rangeRef = useRef()
    const videoOnReady = ({ target }) => {
        playRef.current.onclick = () => {
            target.playVideo()
        }
        pauseRef.current.onclick = () => {
            target.pauseVideo()
        }
        setVideoTime(target.getDuration())
        rangeRef.current.onchange = (ev) => {
            console.log('ev.target.value', ev.target.value);
            target.seekTo(+ev.target.value)
            console.log("🚀 ~ file: music-player.jsx ~ line 29 ~ videoOnReady ~ target", target)
        }
    }

    const videoOnPlay = (event) => {
        // const player = event.target
        // console.log('player', player.getCurrentTime())
    }
    const onStateChange = (event) => {
        console.log('event.data', event.data)

    }
    return (
        <div>
            <button ref={pauseRef} >pause</button>
            <button ref={playRef} >play</button>
           

                <input type="range" min={0} max={videoTime} ref={rangeRef} /> 
                <div> videoTime{videoTime}</div>
          
            <YouTube videoId={videoId}
                opts={opts}
                onReady={videoOnReady}
                onPlay={videoOnPlay}
                onStateChange={onStateChange}
            />
        </div>
    )


}


