import { LikedSongPreview } from './liked-song-preview'
export const LikedSongList = ({ songs }) => {
    console.log("🚀 ~ file: liked-song-list.jsx ~ line 3 ~ LikedSongList ~ songs", songs)
    return (
        <div className='content-spacing'>

            <div className='liked-song-list'>

                {songs.map((song, idx) => {
                    return <LikedSongPreview
                        key={idx}
                        song={song}
                        songIdx={idx}
                    />
                })}
            </div>
        </div>
    )
}