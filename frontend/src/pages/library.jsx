import { useEffect, useState } from "react"
import { stationService } from "../services/station.service"
import { StationList } from "../cmps/station/station-list"
import { Loader } from "../cmps/util/loader"
import { userService } from "../services/user.service"

export const Library = () => {

    // TO BE CHANGED 
    const [stations, setStations] = useState([])
    const user = userService.getLoggedinUser()

    useEffect(() => {
        if (user) loadStations()
    }, [])

    const loadStations = async () => {
        // try {
        
        const stations = await stationService.query({createdBy:user})

        for (const stationId of user.likedStations){
            const station = await stationService.getById(stationId)
            stations.push(station)
        }
            
        if (stations) setStations(stations)
        
        // } catch (err) {        
    }

    if (!stations) return <div className="loader-logo"><Loader /></div>
    return <section className="library">
        <div className="library-title"><h1>Library</h1></div>
        <div className="library-list">{stations && <StationList stations={stations} />}</div>
    </section>
}