import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {routes} from './routes.js'
import { AppHeader } from './cmps/app-header.jsx'
// import { UserMsg } from './cmps/user-msg.jsx'
// import routes from './routes.js'
// import { Loader } from "./cmps/loader"
import { Navbar} from './cmps/navbar.jsx'

export function App() {
  return (
    <div className="app main-layout">
        <AppHeader />
        {/* <AppHeader /> */}
    { <Navbar/> } 
   
      {/* <Loader/> */}
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
      {/* <UserMsg /> */}
    </div>
  )
}
