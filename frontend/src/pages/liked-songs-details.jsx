import { userService } from '../services/user.service'
import {LikedSongList} from '../cmps/liked/liked-song-list'
import { LikedSongsHero } from '../cmps/liked/liked-songs-hero'


export const LikedSongsDetails = () => {
    const loggedUser = userService.getLoggedinUser()

    if(loggedUser?.likedSongs) return (
        <div className='liked-songs-details'>
           {/* <LikedSongList songs={loggedUser.likedSongs}/> */}
           <LikedSongsHero/>
            

        </div>
    )
}