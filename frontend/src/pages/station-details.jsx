import { StationActions } from '../cmps/station/station-actions'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Search } from '../cmps/search/search'
import { SongList } from '../cmps/song/song-list'
import { StationHero } from '../cmps/station/station-hero'
import { stationService } from '../services/station.service'
import { getActionSetStation } from '../store/actions/station.action'
import { setHeaderColor, setCurrPageStation } from '../store/actions/header.action'
import { cloudinaryService } from '../services/cloudinary.service'
import { BtnExit } from '../services/img.import.service'
import getAverageColor from 'get-average-color'
import { youtubeService } from '../services/youtube.service'
import { DragDropContext } from 'react-beautiful-dnd'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { SearchResultList } from '../cmps/search/search-result-list'
import { socketService, SOCKET_EMIT_ENTERED_STATION, SOCKET_EMIT_STATION_UPDATED, SOCKET_EMIT_ACTIVITY_LOG } from '../services/socket.service'
import { setUserMsg } from '../store/actions/user.action'
import { StationModal } from '../cmps/station/station-modal'
import { Loader } from "../cmps/util/loader"
import { userService } from '../services/user.service'


export const StationDetails = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [colorAvg, setColorAvg] = useState('rgb(83,83,83)')

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(true)
    const [songResults, setSongResults] = useState(null)
    const [station, setStation] = useState(null)

    const stationModule = useSelector(storeState => storeState.stationModule)

    const searchContainerRef = useRef()
    const { stationId } = useParams()

    const isStationEmpty = !station?.songs.length

    useEffect(() => {
        socketService.off(SOCKET_EMIT_STATION_UPDATED, setStation)
        socketService.on(SOCKET_EMIT_STATION_UPDATED, setStation)
        if (stationId) {
            socketService.emit(SOCKET_EMIT_ENTERED_STATION, stationId)
        }

        loadStation()

        return () => {
            socketService.off(SOCKET_EMIT_STATION_UPDATED, setStation)
        }
    }, [])

    useEffectUpdate(() => {
        loadStation()
    }, [stationId])

    useEffect(() => {
        if (isSearchOpen && searchContainerRef.current)
            searchContainerRef.current.scrollIntoView(true, { behavior: 'smooth' })
    }, [isSearchOpen])

    useEffect(() => {
        if (station?.coverUrl) getAvgColor(station?.coverUrl)
    }, [station?.coverUrl])

    const loadStation = async () => {
        if (!stationId) {
            const station = stationService.getEmptyStation()
            station.createdBy = userService.getLoggedinUser() || {}
            setStation(station)

            setColorAvg('rgb(83,83,83)')
            return
        }

        const station = await stationService.getById(stationId)
        if (!station) {
            navigate('/music/library')
            return
        }
        // TODO: show user an indication that playlist wasnt found
        setStation(station)
        // If it's an existing playlist, the search bar should be closed
        setIsSearchOpen(false)
        if (!station.coverUrl) dispatch(setHeaderColor('rgb(83,83,83)'))
        else getAvgColor(station.coverUrl)
        dispatch(setCurrPageStation(station))
    }


    const onAddSong = async (song) => {
        const activity = {
            entity: song,
            type: 'added',
            isStation: false
          }
        if (!isStationEmpty) {
            const isSongInStation = station.songs.some(currSong =>
                currSong.id === song.id
            )
            if (isSongInStation) {
                dispatch(setUserMsg({ type: 'danger', txt: 'Oops, Song is already in playlist' }))
                return
            }
        }
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
            navigate(`/music/station/${savedStation._id}`)
            dispatch(setUserMsg({ type: 'success', txt: 'Added playlist to your library' }))
            socketService.emit(SOCKET_EMIT_ACTIVITY_LOG, activity)
            return
        }
        socketService.emit(SOCKET_EMIT_ACTIVITY_LOG, activity)
        dispatch(setUserMsg({ type: 'success', txt: 'Added song to playlist' }))
        
    }
    
    const onRemoveSong = async (songId) => {
        const newStation = { ...station, songs: [...station.songs.filter(currSong => currSong.id !== songId)] }
        await stationService.save(newStation)
        setStation(newStation)
        if (station?._id === stationModule?.station?._id) {
            dispatch(getActionSetStation(newStation))
        }
        dispatch(setUserMsg({ type: 'success', txt: 'Removed song from playlist' }))
    }

    const onOpenSearch = () => {
        setIsSearchOpen(true)
    }

    const displaySongResults = (songs) => {
        setSongResults(songs)
    }

    //TODO: add img first to local state and then when save button clicked save it to data base!!!
    const handleImgUpload = async (ev) => {
        try {
            const src = await cloudinaryService.uploadImg(ev)
            const newStation = { ...station, coverUrl: src }
            setStation(newStation)
        } catch {
            console.log('could not upload image')
        }
    }

    const getAvgColor = async (url) => {
        let color = await getAverageColor(url)
        color = `rgb(${color.r},${color.g}, ${color.b})`
        setColorAvg(color)
        dispatch(setHeaderColor(color))
        dispatch(setCurrPageStation(station))

        return color
    }

    const onSaveDetails = async (details) => {
        try {
            const newStation = { ...station, ...details }
            const savedStation = await stationService.save(newStation)
            if (!station._id) {
                navigate(`/music/station/${savedStation._id}`) 
                dispatch(setUserMsg({ type: 'success', txt: 'Added playlist to your library' }))
            }
            setStation(savedStation)
            dispatch(setUserMsg({ type: 'success', txt: 'Playlist details saved' }))
        } catch {
            console.log('could not save title and description')
        }
    }

    // After dropping a song with drag and drop
    const onDragEnd = async (result) => {
        const { source, destination } = result
        // If dropped out of container bounds or dropped uppon the same song, return
        if (!destination || (destination.droppableId === source.droppableId &&
            destination.index === source.index)) return
        const newStation = JSON.parse(JSON.stringify(station))
        const newSongs = [...newStation.songs]
        const [song] = newSongs.splice(source.index, 1)
        newSongs.splice(destination.index, 0, song)
        newStation.songs = newSongs
        setStation((prevStation) => ({ ...prevStation, songs: [...newSongs] }))
        const savedStation = await stationService.save(newStation)
        if (station?._id === stationModule?.station?._id) dispatch(getActionSetStation(savedStation))
    }

    if (!station) return <div className="loader-logo"><Loader /></div>
    return <section className="station-details">

        <StationHero
            setIsModalOpen={setIsModalOpen}
            station={station}
            bgColor={colorAvg}
        />
        {isModalOpen && <StationModal
            onSaveDetails={onSaveDetails}
            setIsModalOpen={setIsModalOpen}
            handleImgUpload={handleImgUpload}
            station={station}
        />}
        <div style={{ backgroundColor: colorAvg }} className="background-fade"></div>

        {station._id && <StationActions station={station} setStation={setStation} setIsModalOpen={setIsModalOpen} />}

        {!isStationEmpty && station?._id && <DragDropContext onDragEnd={onDragEnd}>
            <SongList onRemoveSong={onRemoveSong} songs={station.songs} station={station} />
        </DragDropContext>}

        <div className="content-spacing relative">
            {isSearchOpen ?
                <div className="search-songs" >
                    <h1 className="search-title">Let's find something for your playlist</h1>
                    <div className="btn-close-search" onClick={() => setIsSearchOpen(false)}>
                        <BtnExit />
                    </div>
                    <div ref={searchContainerRef} className="search-container">
                        <Search isInStationDetails={true} onSearchSongs={displaySongResults} />
                    </div>
                </div>
                :
                <button className="btn-find-more" onClick={onOpenSearch}>
                    <div className="find-more-txt">
                        FIND MORE
                    </div>
                </button>
            }
        </div>

        {isSearchOpen && <div className='search-results-placeholder'>{songResults && isSearchOpen &&
            <SearchResultList searchResults={songResults} onAddSong={onAddSong} />
        }</div>}
    </section>
}