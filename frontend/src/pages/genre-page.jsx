import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { StationList } from "../cmps/station/station-list"
import { stationService } from "../services/station.service"
import { Loader } from "../cmps/util/loader"

export const GenrePage = () => {

    const {tag} = useParams()
    const [stations, setStations] = useState([])
    const naviagte = useNavigate()

    useEffect(()=>{
       loadStations()
    },[])

    const loadStations = async () => {
        const stations = await stationService.query({tags:[tag[0].toUpperCase() + tag.substring(1)]})
        console.log(stations)
        if (!stations) naviagte('/music/library')
        setStations(stations)
    }
    
    !stations && <div className="loader-logo"><Loader /></div>
    return <section className="genre-page content-spacing">
        <h1 className="genre-title">{tag}</h1>
        <StationList stations={stations} />
    </section>
}