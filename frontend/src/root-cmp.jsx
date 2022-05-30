import { MusicApp } from './music-app';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LoginSignupPage } from './pages/login-signup-page';
// import { UserMsg } from './cmps/user-msg.jsx'
import { WelcomePage } from './pages/welcome-page';


export function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path={'music/*'} element={<MusicApp />} />
          <Route path={'login'} element={<LoginSignupPage />} />
          <Route path={'signup'} element={<LoginSignupPage />} />
          <Route path={'/'} element={<WelcomePage />} />
        </Routes>
      </Router>
    </div>
  )
}
