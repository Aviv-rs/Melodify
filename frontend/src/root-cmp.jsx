import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routes.js'
import { AppHeader } from './cmps/app-header.jsx'
import { Navbar } from './cmps/navbar.jsx'
import { MusicPlayer } from './cmps/music-player'
// import { UserMsg } from './cmps/user-msg.jsx'


export function App() {

  return (
    <div className="app main-layout">
      <Router>
        <div className="main-view-container">
          <AppHeader />
          <Routes>
            {routes.map(route => (
              <Route
                key={route.path}
                element={route.element}
                path={route.path}
              />
            ))}
          </Routes>
        </div>
        <Navbar />
        <MusicPlayer />
        {/* <UserMsg /> */}
      </Router>
    </div>
  )
}
