import YouTube from 'react-youtube'


    const onChangeSong = (diff) => {
        const newPlaylist = { ...playlist }
        setSongTime(0)
        newPlaylist.currSongIdx = newPlaylist.currSongIdx + diff

        if (newPlaylist.currSongIdx < 0) {
            player.seekTo(0)
            return
        } else if (newPlaylist.currSongIdx >= newPlaylist.songs.length || !playlist) {

            if (currTimeInterval.current) clearInterval(currTimeInterval.current)
            player.seekTo(0)
            player.pauseVideo()
            dispatch(setIsPlaying(false))
            return
        }
        const currSong = newPlaylist.songs[newPlaylist.currSongIdx]
        dispatch(getActionSetPlaylist(newPlaylist))
        dispatch(setCurrSong(currSong))
        dispatch(setIsPlaying(true))
    }


