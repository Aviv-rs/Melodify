import { StationPreview } from '../cmps/station-preview'

export const StationList = ({ stations }) => {

    return <section className='station-list'>
        {stations.map((station, idx) => <StationPreview
            station={station}
            key={idx}
        />)}
    </section>
}

