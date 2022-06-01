import { StationPreview } from './station-preview'

export const StationList = ({ stations }) => {
    if (!stations) return
    return <section className='station-list'>
        {stations.map((station, idx) => {
            if (station._id === 'liked') return

            return <StationPreview
                station={station}
                key={idx}
            />
        })}
    </section>

}

