import { useEffect, useState } from "react"
import { Search } from "../cmps/search"
import { SongList } from "../cmps/song-list"
import { stationService } from "../services/station.service"

export const StationDetails = () => {
    const [songs, setSongs] = useState(null)
    const [station, setStation] = useState(null)

    useEffect(() => {
        setStation(stationService.getEmptyStation())
    }, [])

    const onAddSong = (song) => {
        console.log('adding song to station', song)
        //TODO: add song to the current station
        // setStation()
        //TODO: add the station to local storage 
        //TODO: adding a song to a station that is already exist 
    }

    const displaySongs = (songs) => {
        setSongs(songs)
    }
    if (!station) return <div>Loading...</div> //TODO: add loader
    return <section className="station-details">
        <h1>{station.name}</h1>
        <Search displaySongs={displaySongs} />
        <div>{songs ?
            <SongList songs={songs} isInSearchPage={false} onAddSong={onAddSong} />
            : ''}</div> 
    </section>
}