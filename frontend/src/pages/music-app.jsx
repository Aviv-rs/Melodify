import { Routes, Route } from "react-router-dom";
import { AppHeader } from '../cmps/base/app-header'
import { Navbar } from '../cmps/base/navbar'
import { MusicPlayer } from '../cmps/base/music-player'
import { routes } from "../routes";
import { UserMsg } from "../cmps/util/user-msg";
import { useSelector } from "react-redux";


export function MusicApp() {
    const {currSong} = useSelector(storeState=>storeState.currSongModule)
    return <div className={`main-layout ${currSong ? 'playing-now' : ''}`}>
        <div className="main-view-container">
            <AppHeader />
            <Routes>
                {routes.map(route => <Route key={route.path} element={route.element} path={route.path} />)}
            </Routes>
        </div>
        <UserMsg/>
        <Navbar />  
        <MusicPlayer />
    </div>
}
