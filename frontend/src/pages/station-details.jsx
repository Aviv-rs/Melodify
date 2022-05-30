import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Search } from "../cmps/search"
import { SongList } from "../cmps/song-list"
import { Hero } from "../cmps/hero"
import { stationService } from "../services/station.service"
import { getActionSetStation } from "../store/actions/station.action"
import { cloudinaryService } from '../services/cloudinary.service'
import { BtnExit } from '../services/img.import.service'
import getAverageColor from 'get-average-color'


export const StationDetails = () => {
    const dispatch = useDispatch()
    const { stationId } = useParams()
    const [colorAvg, setColorAvg] = useState('rgb(83,83,83)')
    const navigate = useNavigate()
    const stationModule = useSelector(storeState => storeState.stationModule)


    const [isSearchOpen, setIsSearchOpen] = useState(true)

    const [songResults, setSongResults] = useState(null)
    const [station, setStation] = useState(null)
    const [description, setDescription] = useState(null)
    const [title, setTitle] = useState(null)


    useEffect(() => {
        // if(params.stationId) setIsSearchOpen(false)
        if (station) return
        loadStation()
    }, [])
    useEffect(() => {
        getAvgColor(station?.coverUrl)
    }, [station?.coverUrl])

    const loadStation = async () => {
        if (!stationId) {
            setStation(stationService.getEmptyStation())
            return
        }

        const station = await stationService.getById(stationId)
        if (!station) {
            navigate('/music/library')
            return
        }
        // TODO: show user an indication that playlist wasnt found
        setStation(station)
        setIsSearchOpen(false)
        getAvgColor(station.coverUrl)
    }


    const onAddSong = async (song) => {
        console.log('adding song to station', song)
        const newStation = { ...station, songs: [...station.songs, song] }
        setStation(newStation)
        if (station?._id) {
            const savedStation = await stationService.save(newStation)
            console.log('saved station', savedStation)
            if (station._id === stationModule.station._id) {
                dispatch(getActionSetStation(savedStation))
            }
        } else stationService.save(newStation)
    }

    const displaySongResults = (songs) => {
        setSongResults(songs)
    }
    //TODO: addd img first to local state and then when save button clicked save it to data base!!!
    const handleImgUpload = async (ev) => {
        try {
            const src = await cloudinaryService.uploadImg(ev)
            const newStation = { ...station, coverUrl: src }
            setStation(newStation)
        } catch {
            console.log('could not upload image')
        }
    }

    const getAvgColor = (url) => {
        getAverageColor(url).then(rgb => {
            const color = `rgb(${rgb.r},${rgb.g}, ${rgb.b})`
            console.log("🚀 ~ file: station-details.jsx ~ line 86 ~ getAverageColor ~ color", color)
            setColorAvg(color)
        })
    }

    const onSubmit = async () => {
        try {
            const newStation = { ...station, name: title, description }
            setStation(newStation)

        } catch {
            console.log('could not save title and description')
        }
    }




    if (!station) return <div>Loading...</div> //TODO: add loader
    return <section className="station-details" style={{ background: `linear-gradient(transparent 0, rgba(0, 0, 0, .9) 70%), ${colorAvg}` }}>
        {/* // return <section className="station-details" style={{ background: `background: linear-gradient( ${colorAvg}, black)` }}> */}

        <Hero onSubmit={onSubmit} station={station} handleImgUpload={handleImgUpload} setDescription={setDescription} setTitle={setTitle} />
        <SongList songs={station.songs} isSearchResults={false} onAddSong={null} station={station} />
        <div className="search-station-details-main" >
            {isSearchOpen ? <div className="flex space-between">
                <div className="search-container">
                    <h1>Let's find something for your playlist</h1>
                    <Search isInStationDetails={true} onSearchSongs={displaySongResults} />
                </div>
                <div onClick={() => setIsSearchOpen(false)}>
                    <BtnExit />
                </div>
            </div> :
                <span className="flex flex-end" onClick={() => { setIsSearchOpen(true) }}>FIND MORE</span>
            }

        </div>
        <div>{songResults &&
            <SongList songs={songResults} isSearchResults={true} onAddSong={onAddSong} />
        }</div>
    </section>
}