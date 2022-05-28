import { StationPreview } from '../cmps/station-preview'
export const StationList = ({ stations }) => {
    return <section>
        {stations.map((station, idx) => <StationPreview
            station={station}
            key={idx}
        />)}
    </section>
}

