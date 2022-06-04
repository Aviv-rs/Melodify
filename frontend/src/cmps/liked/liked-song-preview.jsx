import { PlayIcon, PauseIcon, BtnMoreIcon, LikedSongsIcon, LikeIconHollow } from '../../services/img.import.service'
export const LikedSongPreview = ({ song, songIdx }) => {
    console.log("🚀 ~ file: liked-song-preview.jsx ~ line 2 ~ LikedSongPreview ~ song", song)

    return (
        <section className='liked-song-preview'>
            <div>{songIdx + 1}</div>
            <img src={song.imgUrl} alt="" />
            <div>{song.title}</div>
            <div>6 days ago</div>
            <LikedSongsIcon/>
        </section>
    )
}