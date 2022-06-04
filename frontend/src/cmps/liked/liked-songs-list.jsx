import { LikedSongPreview } from './liked-song-preview'
export const LikedSongsList = ({ songs, userStation, setLoggedUser, setSongs }) => {

    return (
        <div className='content-spacing'>

            <div className='liked-song-list'>

                {songs.map((song, idx) => {
                    return <LikedSongPreview
                        key={idx}
                        song={song}
                        songIdx={idx}
                        userStation={userStation}
                        setLoggedUser={setLoggedUser}
                        setSongs={setSongs}
                    />
                })}
            </div>
        </div>
    )
}