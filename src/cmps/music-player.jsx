import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { PlayIcon, PauseIcon, PlayNextIcon, PlayPrevIcon, VolumeIcon, VolumeMuteIcon } from '../services/img.import.service'
import { utilService } from '../services/util.service'
import { PlayBackBar } from './slider'

export const MusicPlayer = ({ songId }) => {

    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const { station } = useSelector((storeState) => storeState.stationModule)
    if (currSong) songId = currSong.songId
    const opts = {
        height: '0',
        width: '0',
    }
    const currTimeInterval = useRef()
    const [player, setPlayer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [songTime, setSongTime] = useState(0)
    const [songTotalTime, setTotalTime] = useState(0)
    const [volume, setVolume] = useState(70)


    useEffect(() => {
        if (!station) return
        loadPlayList()
    }, [station, currSong])


    const loadPlayList = () => {
        if (player && station?.songs.length > 0) {
            const stationIds = station.songs.map(song => song.songId)
            console.log('the magic happens!!!', stationIds);
            // player.cuePlaylist(stationIds)
            player.loadPlaylist(stationIds)
        }
    }

    const playerOnReady = ({ target }) => {
        setPlayer(target)
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

    const onPlayNext = () => {
        player.nextVideo()
    }
    const onPlayPrev = () => {
        console.log('onPlayPrev', player);
        player.previousVideo()
    }



    return (
        <div className='music-player'>
            <div className="song-details">
                {currSong && <img src={currSong.imgUrl} alt="" />}
            </div>
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <button className='btn-play-prev' onClick={onPlayPrev} ><PlayPrevIcon fill='#b3b3b3' /></button>
                    <button onClick={toggleSongPlay} className="btn-toggle-play" >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button className='btn-play-next' onClick={onPlayNext}><PlayNextIcon fill='#b3b3b3' /></button>
                </div>
                <div className='playBackSlide'>
                    <div className='time-elapsed'> {utilService.convertSecToMin(songTime)}</div>
                    <PlayBackBar disabled={!player} handleChange={handleTimeChange} value={songTime} width={500} />
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

            <YouTube videoId={songId}
                opts={opts}
                onReady={playerOnReady}
                onPlay={playerOnPlay}
                onPause={playerOnPause}
            />
        </div>
    )
}
