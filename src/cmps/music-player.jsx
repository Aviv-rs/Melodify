import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useSelector } from 'react-redux'
import { PlayIcon, PauseIcon, PlayNextIcon, PlayPrevIcon } from '../services/img.import.service'
import { utilService } from '../services/util.service'
import { PlayBackBar } from './slider'

export const MusicPlayer = ({ songId }) => {

    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const  {station}  = useSelector((storeState) => storeState.stationModule)
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

    useEffect(() =>{
        if(!song) return
        loadPlayList()
    },[song])

    const loadPlayList =() =>{
        if(song &&  station?.songs.length >0){
            const stationIds = station.songs.map(song => song.songId)
            song.cuePlaylist(stationIds)
        } 
    }

    const songOnReady = ({ target }) => {
        setSong(target)
        setTotalTime(+target.getDuration())
    }
    const songOnPlay = ({ target }) => {
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

    const onPlayNext =() =>{
        song.nextVideo()
        console.log("🚀 ~ file: music-player.jsx ~ line 69 ~ onPlayNext ~ song.getVideoData()", song.getVideoData())
    }
    const onPlayPrev =() =>{
        console.log('onPlayPrev', song);
        song.previousVideo()
    }



    return (
        <div className='music-player'>
            {currSong ? <img src={currSong.imgUrl} alt="" /> : <div></div>}
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <button className='btn-play-prev' onClick={onPlayPrev} ><PlayPrevIcon fill='#b3b3b3' /></button>
                    <button onClick={toggleSongPlay} className="btn-toggle-play" >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button className='btn-play-next' onClick={onPlayNext}><PlayNextIcon fill='#b3b3b3' /></button>
                </div>
                <div className='playBackSlide'>
                    <div className='slideTime'> {utilService.convertSecToMin(songTime)}</div>
                    <PlayBackBar disabled={!song} handleChange={handleTimeChange} value={songTime/songTotalTime *100} width={200} />
                    <div className='slideTime'> {utilService.convertSecToMin(songTotalTime)}</div>
                </div>
                {/* TODO: change time text font */}
                {/* TODO: add volume range input (make another component using material UI) */}
            </div>
            <div className='volume-slide'>
                <div></div>
                <PlayBackBar disabled={!song} handleChange={handleVolumeChange} value={volume} width={100} />
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


