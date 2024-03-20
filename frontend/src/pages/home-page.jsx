import { useEffect, useState, useRef } from 'react'
import { stationService } from '../services/station.service'
import { tags } from '../data/station'
import { StationList } from '../cmps/station/station-list'
import { Loader } from '../cmps/util/loader'
import { Link } from 'react-router-dom'
import { utilService } from '../services/util.service'

const pageSize = 4

export const HomePage = () => {

    const [sections, setSections] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    const [isLastPage, setIsLastPage] = useState(false)
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    const [page, setPage] = useState(1)

    const isLoadingRef = useRef(false)

    useEffect(() => {
        loadStations()
        const scrollElement = document.querySelector('.main-view-container')

        function setPageOnScroll(){
            const shouldLoadMore =
                scrollElement.scrollTop > scrollElement.scrollHeight - 700 &&
                !isLastPage &&
                !isLoadingRef.current

            if(shouldLoadMore) {
                setPage(prevPage=> prevPage + 1)
            }
        }

        scrollElement.addEventListener('scroll', setPageOnScroll)

        return () => {
            scrollElement.removeEventListener('scroll', setPageOnScroll)
        }
    }, [])

    useEffect(() => {
      if(page > 0) loadStations()
    
    }, [page])
    

    const loadStations = async () => {
        if(isLoadingRef.current || isLastPage) return
        isLoadingRef.current = true
        const currTagsStartIdx = page * pageSize - 1
        const offset = (currTagsStartIdx > tags.length) ? tags.length - 1 : currTagsStartIdx + pageSize
        setIsLastPage(offset === tags.length - 1)

        const sectionsToAdd = await stationService.getSections([tags.slice(currTagsStartIdx, offset)])
        setSections([...sections, ...sectionsToAdd])
        setTimeout(() => {
            setIsInitialLoading(false)
            isLoadingRef.current = false
        }, 500)
    }

    if (isInitialLoading) return <div className="loader-logo"><Loader /></div>
    return (
        <main>
            <section className="home-page">
                {
                    sections.map((section, idx) => {
                        const [tag, stations] = Object.entries(section)[0]
                        return <section key={idx} className="station-collection">
                            <div className="tag-title-container flex align-center">
                                <h2 className="tag-title">{tag}</h2>
                                <Link className="link-see-all" to={`genre/${utilService.getCapitalizedStr(tag)}`}>
                                    See all
                                </Link>
                            </div>
                            <StationList stations={stations} />
                        </section>
                    })
                }
            </section>
        </main>
    )
}