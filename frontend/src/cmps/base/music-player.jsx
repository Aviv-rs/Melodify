import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
import {
    PlayIcon, PauseIcon, PlayNextIcon, PlayPrevIcon,
    VolumeIcon, VolumeMuteIcon, LikedSongsIcon, ShuffleIcon, RepeatIcon
}
    from '../../services/img.import.service'
import { utilService } from '../../services/util.service'
import { SliderBar } from '../util/slider'
import { setCurrSong, setIsPlaying } from '../../store/actions/current-song.action'
import { setPlayer } from '../../store/actions/player.action'
import { getActionSetStation, setIsShuffle } from '../../store/actions/station.action'
import { Link } from 'react-router-dom'
import { stationService } from '../../services/station.service'

export const MusicPlayer = () => {

    const { station, isShuffle } = useSelector((storeState) => storeState.stationModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const { isPlaying } = useSelector((storeState) => storeState.currSongModule)
    const { player } = useSelector((storeState) => storeState.playerModule)

    const opts = {
        height: '0',
        width: '0',
    }


    const currTimeInterval = useRef()
    const dispatch = useDispatch()
    const [songTime, setSongTime] = useState(0)
    const [songTotalTime, setTotalTime] = useState(0)
    const [volume, setVolume] = useState(100)

    const isDisabled = !player || !currSong


    useEffect(() => {
        return () => {
            dispatch(setPlayer(null))
            dispatch(setCurrSong(null))
            dispatch(getActionSetStation(null))
            if (currTimeInterval.current) clearInterval(currTimeInterval.current)
        }
    }, [])

    const playerOnReady = ({ target }) => {
        target.playVideo()
        setSongTime(0)
        dispatch(setPlayer(target))
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

    const handleMute = () => {
        const volumeToSet = volume > 0 ? 0 : 70
        setVolume(volumeToSet)
        player.setVolume(volumeToSet)
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
        dispatch(setIsPlaying(false))
    }

    const onChangeSong = (diff) => {
        const newStation = { ...station }

        newStation.currSongIdx = newStation.currSongIdx + diff
        if (newStation.currSongIdx < 0) {
            player.seekTo(0)
            setSongTime(0)
            return
        } else if (newStation.currSongIdx >= newStation.songs.length || !station) return
        const currSong = newStation.songs[newStation.currSongIdx]
        dispatch(getActionSetStation(newStation))
        dispatch(setCurrSong(currSong))
        setSongTime(0)
        dispatch(setIsPlaying(true))
    }

    const onShuffleStation = async () => {
        const shuffledSongs = utilService.shuffle(station.songs)
        const shuffledStation = { ...station, songs: [...shuffledSongs] }
        await dispatch(getActionSetStation(shuffledStation))

        dispatch(setIsShuffle(true))
    }

    const onUnshuffleStation = async () => {
        const unshuffledStation = await stationService.getById(station._id)
        await dispatch(getActionSetStation(unshuffledStation))
        dispatch(setIsShuffle(false))
    }


    return (
        <div className="music-player">
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
                    <button className="like-btn">
                        {currSong && <LikedSongsIcon fill="#181818" stroke="#b3b3b3" />}
                    </button>
                </div>
            </div>
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <button disabled={isDisabled} className={`btn-shuffle flex align-center clean-btn ${isShuffle ? 'active' : ''}`} onClick={isShuffle ? onUnshuffleStation : onShuffleStation} ><ShuffleIcon fill="#b3b3b3" /></button>
                    <button disabled={!station} className="btn-play-prev" onClick={() => onChangeSong(-1)} ><PlayPrevIcon fill="#b3b3b3" /></button>
                    <button disabled={isDisabled} onClick={toggleSongPlay} className="btn-toggle-play" >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button disabled={!station} className="btn-play-next" onClick={() => onChangeSong(1)}><PlayNextIcon fill="#b3b3b3" /></button>
                    <button className="btn-repeat flex align-center clean-btn"><RepeatIcon fill="#b3b3b3" /></button>
                </div >
                <div className="playBackSlide">
                    <div className="time-elapsed"> {utilService.convertSecToMin(songTime)}</div>
                    <SliderBar maxValue={songTotalTime} disabled={isDisabled} handleChange={handleTimeChange} value={songTime} width={500} />
                    <div className="total-time"> {utilService.convertSecToMin(songTotalTime)}</div>
                </div>
            </div >

            <div className="right-side-controls">
                <div className="volume-controls">
                    <button disabled={isDisabled} onClick={handleMute} className="btn-volume">
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
        </div >
    )
}



