import { useEffect, useState } from 'react'
import { StationPreview } from './station-preview'

export const StationList = ({ stations }) => {
    //  aviv screen width 1536
    // navbar width 240
    // column width 200
    // width for cards = (screen width - navbar width - (column count - 1) * gap - horizontal padding)
    // horizontal padding = 16 * 2 = 32
    // screenWidth

    const [columnCount, setColumnCount] = useState(Math.floor((window.innerWidth - 240) / 232))

    useEffect(() => {
        const getColumnCount = () => {
            const screenWidth = window.innerWidth
            setColumnCount(Math.floor((screenWidth - 240) / 232))
        }

        window.addEventListener('resize', getColumnCount)

        return () => window.removeEventListener('resize', getColumnCount)
    }, [])

    if (!stations) return
    return <section className='station-list'>
        {stations.map((station, idx) => {
            if (station._id === 'liked' || idx >= columnCount && window.innerWidth > 640 ) return
            return <StationPreview
                station={station}
                key={idx}
            />
        })}
    </section>

}

