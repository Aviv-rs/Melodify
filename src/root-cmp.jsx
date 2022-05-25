import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {routes} from './routes.js'
import { AppHeader } from './cmps/app-header.jsx'
import { Navbar} from './cmps/navbar.jsx'
// import { UserMsg } from './cmps/user-msg.jsx'

export function App() {

  return (
    <div className="app main-layout">
      <div className="main-view-container">
      <AppHeader />
      <Router>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              element={route.element}
              path={route.path}
            />
          ))}
        </Routes>
      </Router>
      </div>
    { <Navbar/> } 
      
      {/* <UserMsg /> */}
    </div>
  )
}
