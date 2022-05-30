import { StationPreview } from './station-preview'

export const StationList = ({ stations }) => {
    if (!stations) return
    return <section className='station-list'>
        {stations.map((station, idx) => <StationPreview
            station={station}
            key={idx}
        />)}
    </section>
}
