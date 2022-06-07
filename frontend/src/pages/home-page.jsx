import { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { tags } from '../data/station'
import { StationList } from '../cmps/station/station-list'
import { Loader } from '../cmps/util/loader'
import { Link } from 'react-router-dom'


export const HomePage = () => {

    const [stations, setStations] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        setIsLoading(true)
        const stations = await stationService.query()
        setStations(stations)
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }

    if (isLoading) return <div className="loader-logo"><Loader /></div>
    return (
        <main>
            <section className="home-page">
                {
                    tags.map((tag, idx) => {
                        const stationsByTag = stations.filter(station => station.tags?.includes(tag))
                        return <section key={idx} className="station-collection">
                            <div className="tag-title-container flex align-center">
                                <h2 className="tag-title">{tag}</h2>
                                <Link className="link-see-all" to={`genre/${tag.toLowerCase()}`}>
                                    See all
                                </Link>
                            </div>
                            <StationList stations={stationsByTag} />
                        </section>
                    })
                }
            </section>
        </main>
    )
}