
import YouTube from 'react-youtube'
//https://www.youtube.com/watch?v=_nBlN9yp9R8&t=396s
export function MusicPlayer() {
    const opts = {
        // height: '390',
        // width: '640',
        playerVars: {
            //   https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }

    const videoOnReady = (event) => {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo()
        const player = event.target

        console.log('player', player)
        console.log('player', player.getCurrentTime())
    }

    const videoOnPlay = (event) => {
        const player = event.target
        player.playVideoAt(50)
        console.log('player', player.getCurrentTime())
    }
    return <YouTube videoId="_nBlN9yp9R8" opts={opts} onReady={videoOnReady} onPlay={videoOnPlay} />
}




