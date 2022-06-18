import { StationDetailsPencil, StationDefaultIcon } from '../../services/img.import.service'
import { stationService } from '../../services/station.service'


export const StationHero = ({ station, setIsModalOpen, bgColor }) => {

    const stationDuration = stationService.getStationDuration(station.songs)

    let stationLikesTxt, stationSongsTxt, isStationEmpty, isStationLiked
    const stationCreator = station.createdBy?.fullname

    if (station.likedByUsers) {
        isStationLiked = station.likedByUsers.length > 0
        stationLikesTxt = station.likedByUsers.length > 1 ?
            station.likedByUsers.length + ' likes' : station.likedByUsers.length + ' like'

        stationSongsTxt = station.songs.length > 1 ?
            station.songs.length + ' songs, ' : station.songs.length + ' song, '

        isStationEmpty = station.songs.length === 0
    }

    return (
        <div className="station-hero" >
            <div style={{ backgroundColor: bgColor }} className="background-color"></div>
            <div className="background-shadow"></div>

            <div className="hero-img" onClick={() => setIsModalOpen(true)}>
                <StationDetailsPencil className="pencil" />
                {(station.coverUrl) ?
                    <img src={station.coverUrl} alt="Station's cover image" />
                    : <StationDefaultIcon className="station-def-icon" />}
            </div>
            <div className="hero-details content-spacing">
                <h2 className="playlist-txt flex align-center" >PLAYLIST</h2>
                <span className="station-name-container">

                    <h1 className="station-name" onClick={() => setIsModalOpen(true)}>{station.name}</h1>
                </span>
                {station.description && <h2 className='station-description'>{station.description}</h2>}
                <div className="station-info flex align-center">
                    <div className="created-by">{stationCreator || 'Guest'} </div>
                    {isStationLiked && <span className="like-count">{stationLikesTxt} </span>}
                    {!isStationEmpty && <span className="duration-and-song-count-container">

                        {stationSongsTxt}

                        <span className="station-duration">{
                            stationDuration && `${(stationDuration.hr) ?
                                stationDuration.hr + ' hr ' + stationDuration.min + ' min '
                                :
                                stationDuration.min + ' min ' + stationDuration.sec + ' sec '}`
                        }
                        </span>
                    </span>}
                </div>
            </div>

        </div>
    )
}