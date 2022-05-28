import { useEffect, useState } from "react"
import { stationService } from "../services/station.service"
import { StationList } from "../cmps/station-list"

export const Library = () => {

    // TO BE CHANGED 
    const [stations, setStations] = useState(null)

    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
<<<<<<< HEAD
        // try {
            const stations = await stationService.query()
            console.log("stations2", stations);
            if (stations) setStations(stations)
        // } catch (err) {        
=======
        const stations = await stationService.query()
        if (stations) setStations(stations)
>>>>>>> 4bb181caaa1b31f7427f40748fdcbcfb886df3f2
    }

    return <section className="library">
        <div className="library-title"> <h1>Library</h1> </div>
        {stations && <StationList stations={stations} />}
    </section>
}