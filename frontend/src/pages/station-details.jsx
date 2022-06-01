import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Search } from '../cmps/search/search'
import { SongList } from '../cmps/song/song-list'
import { Hero } from '../cmps/station/station-hero'
import { stationService } from '../services/station.service'
import { getActionSetStation } from '../store/actions/station.action'
import { setHeaderColor } from '../store/actions/header.action'
import { cloudinaryService } from '../services/cloudinary.service'
import { BtnExit } from '../services/img.import.service'
import getAverageColor from 'get-average-color'
import { youtubeService } from '../services/youtube.service'
import { DragDropContext } from 'react-beautiful-dnd'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { SearchResultList } from '../cmps/search/search-result-list'


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
        if (station) return
        loadStation()
    }, [])

    useEffectUpdate(() => {
        if (!stationId) window.location.reload()
    }, [stationId])

    useEffect(() => {

        station?.coverUrl && getAvgColor(station?.coverUrl)
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

        song.duration = await youtubeService.getSongDuration(song.id)
        song.createdAt = Date.now()
        const newStation = { ...station, songs: [...station.songs, song] }
        if (newStation?._id) {
            const savedStation = await stationService.save(newStation)
            setStation(savedStation)

            if (station?._id === stationModule?.station?._id) {
                dispatch(getActionSetStation(savedStation))
            }
        } else {
            const savedStation = await stationService.save(newStation)
            setStation(savedStation)
        }
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
            setColorAvg(color)
            dispatch(setHeaderColor(color))
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

    const onDragEnd = () => {
        // TODO: reorder columns
    }



    const isStationEmpty = !station?.songs.length
    if (!station) return <div>Loading...</div> //TODO: add loader
    return <section className="station-details" style={{ background: `linear-gradient(transparent 0, rgba(0, 0, 0, .9) 70%), ${colorAvg}` }}>

        <Hero onSubmit={onSubmit} station={station} handleImgUpload={handleImgUpload} setDescription={setDescription} setTitle={setTitle} />
        {!isStationEmpty && station?._id && <DragDropContext onDragEnd={onDragEnd}>
            <SongList songs={station.songs} station={station} />
        </DragDropContext>}

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
            <SearchResultList searchResults={songResults} onAddSong={onAddSong} />
        }</div>
    </section>
}