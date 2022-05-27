import { useDispatch } from 'react-redux'
import { setCurrSong } from '../store/actions/current-song.action'
import { addStation } from '../store/actions/station.action'
import { stationService } from '../services/station.service'

export const SongPreview = ({ song, isInSearchPage, onAddSong, currSongIdx }) => {
    const dispatch = useDispatch()
    const onPlaySong = () => {
        // dispatch(setCurrSong(song))
        const station =  stationService.getEmptyStation()
        station.songs.push(songs)
        dispatch(addStation(station))
    }

    return (<div className="song-preview">
        <img onClick={onPlaySong} src={song.imgUrl} alt="" />
        <div className="title">{song.title}</div>
        {!isInSearchPage && <button onClick={() => onAddSong(song)}>Add</button>}
    </div>)
}