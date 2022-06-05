import { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { tags } from '../data/station'
import { StationList } from '../cmps/station/station-list'
import { Loader } from '../cmps/util/loader'


export const HomePage = () => {

    const [stations, setStations] = useState([])

    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        const stations = await stationService.query()
        setStations(stations)
    }

    if (!stations) return <div className="loader-logo"><Loader /></div>
    return (
        <main>
            <section className="home-page">
                {
                    tags.map((tag, idx) => {
                        const stationsByTag = stations.filter(station => {
                            if (station._id === 'liked') return

                            return station.tags.includes(tag)
                        })
                        return <section key={idx} className="station-collection">
                            <div className="tag-title-container">
                                <h2 className="tag-title">{tag}</h2>
                            </div>
                            <StationList stations={stationsByTag} />
                        </section>
                    })
                }
            </section>
        </main>
    )
}