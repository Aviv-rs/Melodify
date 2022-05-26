import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Search } from "../cmps/search"
import { SongList } from "../cmps/song-list"
import { stationService } from "../services/station.service"
import { addStation, updateStation } from "../store/actions/station.action"

export const StationDetails = () => {
    const dispatch = useDispatch()
    const { stationId } = useParams()

    const [songResults, setSongResults] = useState(null)
    const [station, setStation] = useState(null)

    const onAddStation = async () => {
        const savedStation = await dispatch(addStation(station))
        setStation(savedStation)
    }

    const onUpdateStation = async () => {
        const savedStation = await dispatch(updateStation(station))
        setStation(savedStation)
    }

    useEffect(() => {
        if (!station) return
        if (!station._id && station.songs.length) onAddStation()
        else if (station?._id) onUpdateStation()

    }, [station?.songs])


    useEffect(() => {
        if (station) return
        setStation(stationService.getEmptyStation())
    }, [])




    const onAddSong = (song) => {
        console.log('adding song to station', song)
        //DONE: add song to the current station
        setStation(prevStation => ({ ...prevStation, songs: [...prevStation.songs, song] }))
        //TODO: add the station to local storage 
        //TODO: adding a song to a station that is already exist 
    }

    const displaySongResults = (songs) => {
        setSongResults(songs)
    }

    if (!station) return <div>Loading...</div> //TODO: add loader
    return <section className="station-details">
        <h1>{station.name}</h1>
        <SongList songs={station.songs} isInSearchPage={true} onAddSong={null} station={station} />
        <Search onSearchSongs={displaySongResults} />
        <div>{songResults &&
            <SongList songs={songResults} isInSearchPage={false} onAddSong={onAddSong} />
        }</div>
    </section>
}