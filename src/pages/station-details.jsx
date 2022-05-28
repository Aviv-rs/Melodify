import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Search } from "../cmps/search"
import { SongList } from "../cmps/song-list"
import { Hero } from "../cmps/hero"
import { stationService } from "../services/station.service"
import { getActionSetStation } from "../store/actions/station.action"
import { uploadImg } from '../services/cloudinary-service'
export const StationDetails = () => {
    const dispatch = useDispatch()
    const { stationId } = useParams()
    const navigate = useNavigate()
    const stationModule = useSelector(storeState => storeState.stationModule)

    const [songResults, setSongResults] = useState(null)
    const [station, setStation] = useState(null)


    useEffect(() => {
        if (station) return
        loadStation()
    }, [])

    const loadStation = async () => {
        if (!stationId) {
            setStation(stationService.getEmptyStation())
            return
        }
        const station = await stationService.getById(stationId)
        if (!station) {
            navigate('/library')
            return
        }
        // TODO: show user an indication that playlist wasnt found
        setStation(station)
    }


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

    const handleImgUpload = async (ev) => {
        try {
            const src = await uploadImg(ev)
            const newStation = { ...station, coverUrl: src }
            setStation(newStation)
            const savedStation = await stationService.save(newStation)
        } catch {
            console.log('could not upload image')
        }
    }

    if (!station) return <div>Loading...</div> //TODO: add loader
    return <section className="station-details">
        <Hero station={station} handleImgUpload={handleImgUpload} />
        <SongList songs={station.songs} isSearchResults={false} onAddSong={null} station={station} />
        <Search onSearchSongs={displaySongResults} />
        <div>{songResults &&
            <SongList songs={songResults} isSearchResults={true} onAddSong={onAddSong} />
        }</div>
    </section>
}