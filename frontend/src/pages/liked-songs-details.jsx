import { userService } from '../services/user.service'
import {LikedSongList} from '../cmps/liked/liked-song-list'


export const LikedSongsDetails = () => {
    const loggedUser = userService.getLoggedinUser()

    if(loggedUser?.likedSongs)return (
        <section className="liked-songs-details">
            
           {/* <LikedSongList songs={loggedUser.likedSongs}/> */}
        </section>
    )
}