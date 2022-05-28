import { StationPreview } from '../cmps/station-preview'

export const StationList = ({ stations }) => {
    console.log("station", stations);
    if (!stations) return
    return <section className='station-list'>
        {stations.map((station, idx) => <StationPreview
            station={station}
            key={idx}
        />)}
    </section>
}

