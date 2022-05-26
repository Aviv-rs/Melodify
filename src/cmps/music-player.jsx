import { useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { PlayIcon, PauseIcon, PlayNextIcon, PlayPrevIcon } from '../services/img.import.service'
import { PlayBackBar } from './slider'

export const MusicPlayer = ({ songId }) => {
    const { currSong } = useSelector((storeState) => storeState.currSongModule)

    if (currSong) songId = currSong.songId
    const opts = {
        height: '0',
        width: '0',
    }

    const [songTime, setSongTime] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [song, setSong] = useState(null)

    const songOnReady = ({ target }) => {
        setSong(target)
    }

    // TODO: add an interval function that will change the current time of the song
    const handlePlaybackChange = ({ target }) => {
        setSongTime(target.value)
        song.seekTo(+target.value)
    }


    const toggleSongPlay = () => {
        if (!song) return
        setIsPlaying((prevIsPlaying) => !prevIsPlaying)
        isPlaying ? song.pauseVideo() : song.playVideo()
    }
    return (
        <div className='music-player'>
            <div className="player-controls">
                <div className="player-controls-buttons">

                    <button className='btn-play-prev' ><PlayPrevIcon fill='#b3b3b3' /></button>
                    <button onClick={toggleSongPlay} className="btn-toggle-play" >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button className='btn-play-next'><PlayNextIcon fill='#b3b3b3' /></button>
                    {/* TODO: add time left and duration of song */}
                </div>
                {/* TODO: add active and hover state styles (look at spotify's player for reference) */}
                <PlayBackBar disabled={!song} handleChange={handlePlaybackChange} />
                {/* TODO: add volume range input (make another component using material UI) */}
                <div> {songTime}</div>
            </div>

            <YouTube videoId={songId}
                opts={opts}
                onReady={songOnReady}
            />
        </div>
    )


}


