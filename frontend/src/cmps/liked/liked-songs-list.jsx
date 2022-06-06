import { LikedSongPreview } from './liked-song-preview'
import { Clock } from '../../services/img.import.service'
export const LikedSongsList = ({ songs, userStation, setSongs }) => {

    return (
        <div className='content-spacing'>

            <div className='liked-song-list'>

            
                    <div className='table-header'>
                        <div className="song-index-container">
                            <span className='song-index'>#</span>
                        </div>
                        <div className="song-title-container">
                            <span>TITLE</span>
                        </div>
                        <div className="date-added-container">
                            <span>DATE ADDED</span>
                        </div>
                        <div className="duration-container">

                            <Clock />
                        </div>
                    </div>
                

                {songs.map((song, idx) => {
                    return <LikedSongPreview
                        key={idx}
                        song={song}
                        songIdx={idx}
                        userStation={userStation}
                        setSongs={setSongs}
                    />
                })}
            </div>
        </div>
    )
}