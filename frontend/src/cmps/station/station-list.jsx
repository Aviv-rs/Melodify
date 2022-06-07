import { useEffect, useState } from 'react'
import { StationPreview } from './station-preview'

export const StationList = ({ stations }) => {

    const [listLayoutStyle, setListLayoutStyle] = useState(null)

    useEffect(() => {
        const getListLayoutStyle = () => {
            const screenWidth = window.innerWidth - 240 - 64
            const minGap = 18
            const minWidth = 170

            const columnCount = Math.floor((screenWidth - minGap) / (minWidth + minGap))
            const columnWidth = (screenWidth - minGap) / columnCount / (1 + minGap / minWidth)
            const gap = columnWidth * minGap / minWidth


            setListLayoutStyle({ columnCount, columnWidth, gap })
        }

        if (!listLayoutStyle) getListLayoutStyle()

        window.addEventListener('resize', getListLayoutStyle)

        return () => window.removeEventListener('resize', getListLayoutStyle)
    }, [])

    if (!stations || !listLayoutStyle) return
    return <section style={{
        '--grid-gap': listLayoutStyle.gap + 'px',
        '--column-width': listLayoutStyle.columnWidth,
        '--column-count': listLayoutStyle.columnCount
    }} as CSSProperties className="station-list" >
        {
            stations.map((station, idx) => {
                if (station._id === 'liked' || idx >= listLayoutStyle.columnCount && window.innerWidth >= 640 ) return
                return <StationPreview
                    station={station}
                    key={idx}
                />
            })
        }
    </section >

}

