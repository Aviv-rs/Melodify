import { useEffect, useState } from "react"
import { stationService } from "../services/station.service"
import { StationList } from "../cmps/station/station-list"
import { Loader } from "../cmps/util/loader"

export const Library = () => {

    // TO BE CHANGED 
    const [stations, setStations] = useState(null)

    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        // try {
        const stations = await stationService.query()
        if (stations) setStations(stations)
        // } catch (err) {        
    }

    if (!stations) return <div className="loader-logo"><Loader /></div>
    return <section className="library">
        <div className="library-title"><h1>Library</h1></div>
        <div className="library-list">{stations && <StationList stations={stations} />}</div>
    </section>
}