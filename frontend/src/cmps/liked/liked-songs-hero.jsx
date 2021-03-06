import { userService } from "../../services/user.service"
import { DefaultAvatarIcon } from "../../services/img.import.service"


export const LikedSongsHero = ({songs}) => {

    const user = userService.getLoggedinUser()

    const songAmountTxt = songs.length > 1 ? songs.length + ' songs ' : songs.length + ' song '
    const isStationEmpty = songs.length === 0

    return <div className="liked-songs-hero content-spacing">

        <div className="background-color"></div>
        <div className="background-shadow"></div>

        <div className="hero-img">
            <img src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" alt="Station's cover image" />
        </div>
        <div className="hero-details flex column">
            <h2 className="playlist-txt flex align-center" >PLAYLIST</h2>

            <span className="station-name-container">
                <h1 className="station-name" >Liked songs</h1>
            </span>

            <div className="station-info flex align-center">
                <div className="created-by">
                    {user?.avatar ?
                        <div className="avatar-container">
                            <img src={user?.avatar} alt="" />
                        </div>
                        :
                        <div className="default-avatar-container">
                            <DefaultAvatarIcon />
                        </div>
                    }
                    {user?.fullname || 'Guest'}
                </div>
                {!isStationEmpty && <span className="song-count">
                    {songAmountTxt}
                </span>}
            </div>
        </div>
    </div>
}