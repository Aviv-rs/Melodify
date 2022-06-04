import { userService } from '../services/user.service'
import {LikedSongList} from '../cmps/liked/liked-song-list'


export const LikedSongsDetails = () => {
    const loggedUser = userService.getLoggedinUser()
    console.log("🚀 ~ file: liked-songs.jsx ~ line 7 ~ LikedSongsDetails ~ loggedUser", loggedUser)

    if(loggedUser?.likedSongs)return (
        <div>
           <LikedSongList songs={loggedUser.likedSongs}/>
            liked songs 

        </div>
    )
}