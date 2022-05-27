import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Search } from "../cmps/search"
import { SongList } from "../cmps/song-list"
import { stationService } from "../services/station.service"
import { getActionSetStation } from "../store/actions/station.action"

export const StationDetails = () => {
    const dispatch = useDispatch()
    const { stationId } = useParams()

    const stationModule = useSelector(storeState => storeState.stationModule)

    const [songResults, setSongResults] = useState(null)
    const [station, setStation] = useState(null)

    // const onAddStation = async () => {
    //     const savedStation = await dispatch(addStation(station))
    //     setStation(savedStation)
    // }

    // const onUpdateStation = async () => {
    //     const savedStation = await dispatch(updateStation(station))
    //     setStation(savedStation)
    // }

    // useEffect(() => {
    //     if (!station) return
    //     if (!station._id && station.songs.length) onAddStation()
    //     else if (station?._id) onUpdateStation()

    // }, [station?.songs])


    useEffect(() => {
        if (station) return
        setStation(stationService.getEmptyStation())
    }, [])




    const onAddSong = async (song) => {
        console.log('adding song to station', song)
        const newStation = { ...station, songs: [...station.songs, song] }
        setStation(newStation)
        if (station?._id) {
            const savedStation = await stationService.save(newStation)
            if (station._id === stationModule.station._id) {
                dispatch(getActionSetStation(savedStation))
            }
        } else stationService.save(newStation)
    }

    const displaySongResults = (songs) => {
        setSongResults(songs)
    }

    if (!station) return <div>Loading...</div> //TODO: add loader
    return <section className="station-details">
        <h1>{station.name}</h1>
        <SongList songs={station.songs} isSearchResults={false} onAddSong={null} station={station} />
        <Search onSearchSongs={displaySongResults} />
        <div>{songResults &&
            <SongList songs={songResults} isSearchResults={true} onAddSong={onAddSong} />
        }</div>
    </section>
}