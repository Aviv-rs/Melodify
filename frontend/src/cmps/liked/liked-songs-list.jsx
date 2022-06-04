import { LikedSongPreview } from './liked-song-preview'
export const LikedSongsList = ({ songs, userStation }) => {
    return (
        <div className='content-spacing'>

            <div className='liked-song-list'>

                {songs.map((song, idx) => {
                    return <LikedSongPreview
                        key={idx}
                        song={song}
                        songIdx={idx}
                        userStation={userStation}
                    />
                })}
            </div>
        </div>
    )
}