import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
import {
    PlayIcon, PauseIcon, PlayNextIcon, PlayPrevIcon,
    VolumeIcon, VolumeMuteIcon, LikedSongsIcon, ShuffleIcon, RepeatIcon, LikeIconHollow
}
    from '../../services/img.import.service'
import { utilService } from '../../services/util.service'
import { SliderBar } from '../util/slider'
import { setCurrSong, setIsPlaying } from '../../store/actions/current-song.action'
import { setPlayer } from '../../store/actions/player.action'
import { getActionSetStation, setIsShuffle } from '../../store/actions/station.action'
import { Link } from 'react-router-dom'
import { stationService } from '../../services/station.service'
import { userService } from '../../services/user.service'
import { setUserMsg } from '../../store/actions/user.action'
import { socketService, SOCKET_EMIT_ACTIVITY_LOG } from '../../services/socket.service'

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
    const [isRepeat, setIsRepeat] = useState(false)
    const [volume, setVolume] = useState(100)
    const [isLikeByLoggedUser, setIsLikeByLoggedUser] = useState(false)

    const isDisabled = !player || !currSong
    const loggedInUser = userService.getLoggedinUser()




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
        player.setVolume(volume)
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
        const isMuted = player.isMuted()
        isMuted ? player.unMute() : player.mute()
        let volumeToSet
        if (isMuted) {
            player.unMute()
            volumeToSet = player.getVolume()
        } else {
            player.mute()
            volumeToSet = 0
        }
        setVolume(volumeToSet)
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
        setSongTime(0)
        newStation.currSongIdx = newStation.currSongIdx + diff

        if (newStation.currSongIdx < 0 || isRepeat) {
            player.seekTo(0)
            return
        } else if (newStation.currSongIdx >= newStation.songs.length || !station) {

            if (currTimeInterval.current) clearInterval(currTimeInterval.current)
            player.seekTo(0)
            player.pauseVideo()
            dispatch(setIsPlaying(false))
            return
        }
        const currSong = newStation.songs[newStation.currSongIdx]
        dispatch(getActionSetStation(newStation))
        dispatch(setCurrSong(currSong))
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

    const onTogggleLikeSong = async () => {
        try {
            const activity = {
                entityName: currSong.title,
                type: '',
                isStation: false
            }

            if (!loggedInUser) {
                dispatch(setUserMsg({ type: 'danger', txt: 'Oops, must be a user to like song' }))
                return
            }
            const isUserLikedSongBefore = loggedInUser.likedSongs.find(likedSong => likedSong.id === currSong.id)
            let newUser = { ...loggedInUser }
            if (isUserLikedSongBefore) {
                newUser.likedSongs = newUser.likedSongs.filter(likedSong => likedSong.id !== currSong.id)
                setIsLikeByLoggedUser(false)
                dispatch(setUserMsg({ type: 'success', txt: 'Removed from your liked songs' }))
                activity.type = 'unliked'
            } else {
                newUser.likedSongs.push(currSong)
                dispatch(setUserMsg({ type: 'success', txt: 'Added to your liked songs' }))
                setIsLikeByLoggedUser(true)
                activity.type = 'liked'
            }
            activity.createdBy = newUser
            userService.update(newUser)
            socketService.emit(SOCKET_EMIT_ACTIVITY_LOG, activity)

        } catch (error) {
            console.log('can not like song', error);
            if (loggedInUser) dispatch(setUserMsg({ type: 'danger', txt: 'Oops, something went wrong' }))
        }

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
                        <Link to={station?._id === 'liked' ? '/music/liked' : `station/${station?._id}`}>
                            <div className="station-name">{station?._id === 'liked' ? 'Liked songs' : station?.name}</div>
                        </Link>
                    </div>
                    {currSong && <button onClick={onTogggleLikeSong} className={`btn-like clean-btn ${isLikeByLoggedUser ? '' : 'unliked'}`}>
                        {isLikeByLoggedUser ? <LikedSongsIcon fill="#1ed760" /> : <LikeIconHollow fill="#b3b3b3" />}
                    </button>}
                </div>
            </div>
            <div className="player-controls">
                <div className="player-controls-buttons">
                    <button disabled={isDisabled} className={`btn-shuffle flex align-center clean-btn ${isShuffle ? 'active' : ''}`}
                        onClick={isShuffle ? onUnshuffleStation : onShuffleStation} >
                        <ShuffleIcon fill="#b3b3b3" />
                    </button>
                    <button disabled={!station} className="btn-play-prev" onClick={() => onChangeSong(-1)} ><PlayPrevIcon fill="#b3b3b3" /></button>
                    <button disabled={isDisabled} onClick={toggleSongPlay} className="btn-toggle-play" >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button disabled={!station} className="btn-play-next" onClick={() => onChangeSong(1)}><PlayNextIcon fill="#b3b3b3" /></button>
                    <button disabled={isDisabled}
                        onClick={() => setIsRepeat((prevIsRepeat) => !prevIsRepeat)}
                        className={`btn-repeat flex align-center clean-btn ${isRepeat ? 'active' : ''}`}>
                        <RepeatIcon fill="#b3b3b3" />
                    </button>
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



