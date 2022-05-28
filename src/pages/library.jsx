import { useEffect, useState } from "react"
import { stationService } from "../services/station.service"
import { StationList } from "../cmps/station-list"

export const Library = () => {

    const [stations, setStations] = useState([])

    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        try {
            const stations = await stationService.query()
            setStations(stations)
        } catch (err) {
            console.log(err)
        }
    }

    return <section className="library">
        <div className="library-title"> <h1>Library</h1> </div>
        {stations && <StationList stations={stations} />}
    </section>
}