import { userService } from '../services/user.service'
import { LikedSongsList } from '../cmps/liked/liked-songs-list'
import { stationService } from '../services/station.service'
import { LikedSongsHero } from '../cmps/liked/liked-songs-hero'
import { useEffect, useState } from 'react'


export const LikedSongsDetails = () => {
    const [loggedUser, setLoggedUser] = useState({})
    const [songs, setSongs] = useState([])
    let userStation = stationService.getEmptyStation()
    useEffect(()=>{
        setLoggedUser(userService.getLoggedinUser())
        setSongs(userService.getLoggedinUser().likedSongs)
    },[])
    useEffect(()=>{
        
    },[loggedUser, songs])

    userStation.songs = { ...loggedUser.likedSongs }
    if (loggedUser?.likedSongs) return (
        <div className='liked-songs-details'>
            <LikedSongsHero />
            <LikedSongsList setLoggedUser={setLoggedUser} setSongs={setSongs} songs={songs} userStation={userStation} />

        </div>
    )
}