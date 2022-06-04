import { userService } from '../services/user.service'
import {LikedSongsList} from '../cmps/liked/liked-songs-list'


export const LikedSongsDetails = () => {
    const loggedUser = userService.getLoggedinUser()
    console.log("🚀 ~ file: liked-songs.jsx ~ line 7 ~ LikedSongsDetails ~ loggedUser", loggedUser)

    if(loggedUser?.likedSongs) return (
        <div className='liked-songs-details'>
           <LikedSongsList songs={loggedUser.likedSongs}/>
            

        </div>
    )
}