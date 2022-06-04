import { userService } from '../services/user.service'
import { LikedSongsList } from '../cmps/liked/liked-songs-list'
import { stationService } from '../services/station.service'
import { LikedSongsHero } from '../cmps/liked/liked-songs-hero'


export const LikedSongsDetails = () => {
    const loggedUser = userService.getLoggedinUser()
    const userStation = stationService.getEmptyStation()
    userStation.songs = { ...loggedUser.likedSongs }
    if (loggedUser?.likedSongs) return (
        <div className='liked-songs-details'>
            <LikedSongsHero/>
            <LikedSongsList songs={loggedUser.likedSongs} userStation={userStation} />

        </div>
    )
}