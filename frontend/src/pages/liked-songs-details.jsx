import { userService } from '../services/user.service'
import {LikedSongList} from '../cmps/song/liked-song-list'


export const LikedSongsDetails = () => {
    const loggedUser = userService.getLoggedinUser()
    console.log("🚀 ~ file: liked-songs.jsx ~ line 7 ~ LikedSongsDetails ~ loggedUser", loggedUser)

    if(loggedUser?.likedSongs) return (
        <div className='liked-songs-details'>
           <LikedSongList songs={loggedUser.likedSongs}/>
            

        </div>
    )
}