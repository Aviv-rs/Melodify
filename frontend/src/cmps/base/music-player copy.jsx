// import YouTube from 'react-youtube'


//     const onChangeSong = (diff) => {
//         const newStation = { ...station }
//         setSongTime(0)
//         newStation.currSongIdx = newStation.currSongIdx + diff

//         if (newStation.currSongIdx < 0 || isRepeat) {
//             player.seekTo(0)
//             return
//         } else if (newStation.currSongIdx >= newStation.songs.length || !station) {

//             if (currTimeInterval.current) clearInterval(currTimeInterval.current)
//             player.seekTo(0)
//             player.pauseVideo()
//             dispatch(setIsPlaying(false))
//             return
//         }
//         const currSong = newStation.songs[newStation.currSongIdx]
//         dispatch(getActionSetStation(newStation))
//         dispatch(setCurrSong(currSong))
//         dispatch(setIsPlaying(true))
//     }


