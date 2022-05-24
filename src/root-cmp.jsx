import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {routes} from './routes.js'
// import { AppHeader } from './cmps/app-header.jsx'
// import { UserMsg } from './cmps/user-msg.jsx'



export function App() {
  return (
    <div className="app">
     

      <Router>
        {/* <AppHeader /> */}
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
