import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong } from '../../store/actions/current-song.action'
import { PlayIcon, PauseIcon, BtnMoreIcon } from '../../services/img.import.service'
import { getActionSetStation } from '../../store/actions/station.action'
import { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Draggable } from 'react-beautiful-dnd'
import { OptionsMenu } from '../util/options-menu'


export const SongPreview = ({ song, songIdx, station, onRemoveSong }) => {



    const dispatch = useDispatch()
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const [duration, setDuration] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const isAdminStation = station.createdBy.isAdmin

    useEffect(() => {
        if (song.duration) setDuration(song.duration)
        if (stationModule?.station?._id === station?._id
            && currSong?.id === song.id) setIsPlayShow(isPlaying)
        else setIsPlayShow(false)
    }, [station, isPlaying, currSong, stationModule])

    const onTogglePlayer = () => {
        if (currSong?.id !== song.id) dispatch(setCurrSong(song))
        else if (isPlaying) {
            player.pauseVideo()
        }
        else if (!isPlaying) player.playVideo()
        station.currSongIdx = songIdx
        dispatch(getActionSetStation(station))

    }

    return (<Draggable draggableId={song.id} index={songIdx}>
        {(provided) =>

            <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="song-preview" onDoubleClick={onTogglePlayer}>

                <div className='play-song-container' onClick={onTogglePlayer}>
                    {!isPlayShow && <button className="btn-play"> <PlayIcon /> </button>}
                    {isPlayShow && <button className="btn-play"> <PauseIcon /> </button>}
                    <span className='song-number'>{songIdx + 1}</span>
                </div>
                <img src={song.imgUrl} alt="" />
                <div className="title">{song.title}</div>
                <span>
                    {song?.createdAt && <ReactTimeAgo date={song.createdAt || Date.now()} locale="en-US" />}
                    {!song?.createdAt && <span></span>}
                </span>
                <span>{duration}</span>
                {!isAdminStation && <>
                    <button className='btn-more-options'><BtnMoreIcon /></button>
                    <OptionsMenu isOpen={isMenuOpen} options={[{ name: 'Remove song from playlist', action: () => onRemoveSong(song.id) }]} />
                </>}


            </div>
        }
    </Draggable>
    )
}