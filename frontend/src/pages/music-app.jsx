import { Routes, Route } from "react-router-dom";
import { AppHeader } from '../cmps/base/app-header'
import { Navbar } from '../cmps/base/navbar'
import { MusicPlayer } from '../cmps/base/music-player'
import { routes } from "../routes";

export function MusicApp() {
    return <div className="main-layout">
        <div className="main-view-container">
            <AppHeader />
            <Routes>
                {routes.map(route => <Route key={route.path} element={route.element} path={route.path} />)}
            </Routes>
        </div>
        <Navbar />
        <MusicPlayer />
    </div>
}
