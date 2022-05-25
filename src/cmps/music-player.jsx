import { useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { Play, Pause } from '../services/img.import.service'
export const MusicPlayer = ({ songId }) => {
    const { currSong } = useSelector((storeState) => storeState.currSongModule)

    if (currSong) songId = currSong.songId
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // autoplay: 1,
        },
    }
    const playRef = useRef()
    const pauseRef = useRef()
    const [songTime, setSongTime] = useState(null)
    const rangeRef = useRef()
    const songOnReady = ({ target }) => {
        playRef.current.onclick = () => {
            target.playVideo()
        }
        pauseRef.current.onclick = () => {
            target.pauseVideo()
        }
        setSongTime(target.getDuration())
        rangeRef.current.onchange = (ev) => {
            target.seekTo(+ev.target.value)
        }
    }

    const songOnPlay = (event) => {
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
            <input type="range" min={0} max={songTime} ref={rangeRef} />
            <div> songTime{songTime}</div>
            <YouTube videoId={songId}
                opts={opts}
                onReady={songOnReady}
                onPlay={songOnPlay}
                onStateChange={onStateChange}
            />
        </div>
    )


}


