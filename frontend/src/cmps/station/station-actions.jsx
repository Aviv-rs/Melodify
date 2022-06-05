import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { LikeIconHollow, PlayIcon, PauseIcon, BtnMoreIcon, LikedSongsIcon } from '../../services/img.import.service'
import { OptionsMenu } from '../util/options-menu'
import { userService } from '../../services/user.service'
import { stationService } from '../../services/station.service'
import { setCurrSong } from '../../store/actions/current-song.action'
import { useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { setUserMsg } from '../../store/actions/user.action'
import { getActionSetStation } from '../../store/actions/station.action'
import { setIsPlayPauseBtn } from '../../store/actions/header.action'
import { socketService, SOCKET_EMIT_ACTIVITY_LOG } from '../../services/socket.service'


export const StationActions = ({ setIsModalOpen, station, setStation }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isPlayShow, setIsPlayShow] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLikeByLoggedUser, setIsLikeByLoggedUser] = useState(false)

  const { player } = useSelector((storeState) => storeState.playerModule)
  const { currSong, isPlaying } = useSelector((storeState) => storeState.currSongModule)
  const stationModule = useSelector(storeState => storeState.stationModule)

  const loggedInUser = userService.getLoggedinUser()

  const btnRef = useRef()
  const stationMenuRef = useRef()
  const isMatchStation = useMatch('music/station/:stationId')

  useEffect(() => {
    if (stationModule?.station?._id === station?._id) setIsPlayShow(isPlaying)
  }, [station, isPlaying])

  useEffect(() => {
    if (!station) return
    const isUserLikedStationBefore = station.likedByUsers.find(user => user._id === loggedInUser?._id)
    if (isUserLikedStationBefore) setIsLikeByLoggedUser(true)
  }, [])

  useEffect(() => {
    if (!btnRef.current) return
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (btnRef.current && !entry.isIntersecting && isMatchStation) dispatch(setIsPlayPauseBtn(true))
      else dispatch(setIsPlayPauseBtn(false))

      return (() => dispatch(setIsPlayPauseBtn(false)))

    })
    observer.observe(btnRef.current)

  }, [])

  useEffect(() => {
    const handleClickOutsideMenu = (ev) => {
      if (stationMenuRef.current && !stationMenuRef.current.contains(ev.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu)
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu)
    }
  }, [stationMenuRef])

  const onTogglePlayer = () => {
    if (!currSong) {
      onPlayStation()
    }
    else if (stationModule.station._id !== station._id) onPlayStation()
    else if (isPlaying) {
      player.pauseVideo()
    }
    else if (!isPlaying) {
      player.playVideo()
    }
  }

  const onRemoveStation = async () => {
    try {
      await stationService.remove(station._id)
      navigate('/music/library')

    } catch (error) {
      console.log('Can not delete', error)
    }
  }

  const onToggleLikeStation = async () => {
    try {
      const activity = {
        entity: station,
        user: userService.getLoggedinUser() || 'Guest',
        type: ''
      }

      if (!loggedInUser) {
        dispatch(setUserMsg({ type: 'danger', txt: 'Oops, must be a user to like playlist' }))
        return
      }
      const isUserLikedStationBefore = station.likedByUsers.find(user => user._id === loggedInUser?._id)
      let newStation = { ...station }
      if (isUserLikedStationBefore) {
        newStation.likedByUsers = newStation.likedByUsers.filter(user => user._id !== loggedInUser?._id)
        setIsLikeByLoggedUser(false)
        activity.type = 'unlike'
      } else {
        newStation.likedByUsers.push(loggedInUser)
        setIsLikeByLoggedUser(true)
        activity.type = 'like'
      }
      const savedStation = await stationService.save(newStation)
      setStation(savedStation)
      socketService.emit(SOCKET_EMIT_ACTIVITY_LOG, activity)
    } catch (error) {
      dispatch(setUserMsg({ type: 'danger', txt: 'Something went wrong, please try again later' }))
    }
  }

  const onPlayStation = () => {
    dispatch(getActionSetStation(station))
    dispatch(setCurrSong(station.songs[station.currSongIdx]))
  }

  return <div className='hero-footer content-spacing'>
    {station.songs.length > 0 ? <div className='buttons'>

      <button className='btn-play' ref={btnRef} onClick={onTogglePlayer}>
        {isPlayShow ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button className="btn-like clean-btn" onClick={onToggleLikeStation}>
        {!isLikeByLoggedUser && <LikeIconHollow fill="#b3b3b3" />}
        {isLikeByLoggedUser && <LikedSongsIcon fill="#1ed760" />}

      </button>
      {!station.createdBy?.isAdmin && <button className='btn-more-hero-footer clean-btn' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <BtnMoreIcon />
      </button>}

      <div className="station-menu-container" ref={stationMenuRef}>

        <OptionsMenu options={[{
          name: 'Delete playlist',
          action: onRemoveStation
        }, {
          name: 'Edit details',
          action: ev => {
            ev.stopPropagation();
            setIsModalOpen(true);
            setIsMenuOpen(false);
          }
        }]} isOpen={isMenuOpen && !station.createdBy?.isAdmin} className={'station-options-menu'} />
      </div>

    </div> : <span></span>}
  </div>;
}
