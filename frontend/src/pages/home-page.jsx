import { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { tags } from '../data/station'
import { demoDataStations } from '../data/station'
import { StationList } from '../cmps/station-list'


export const HomePage = () => {

    const [stations, setStations] = useState([])

    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        // const stations = await stationService.query()
        // if (!stations) return
        setStations(demoDataStations)
    }

    return (
        <main>
            <section className="home-page">
                {
                    tags.map((tag, idx) => {
                        // stationService.query({createdBy:{
                        //     userName:'melodifyDYA'
                        // }})
                        const stationsByTag = stations.filter(station => station.tags.includes(tag))
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