import { LikedSongPreview } from '../song/liked-song-preview'
export const LikedSongList = ({ songs }) => {
    console.log("🚀 ~ file: liked-song-list.jsx ~ line 3 ~ LikedSongList ~ songs", songs)
    return (
        songs.map((song, idx) => {
            return <LikedSongPreview
                key={idx}
                song={song}
                songIdx={idx}
            />
        })
    )
}