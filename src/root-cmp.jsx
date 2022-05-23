// import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// import { AppHeader } from './cmps/app-header.jsx'
// import { UserMsg } from './cmps/user-msg.jsx'
// import routes from './routes.js'

export function App() {
  return (
    <div className="app">
      {/* <Router>
        <AppHeader />
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              exact
              component={route.component}
              path={route.path}
            />
          ))}
        </Switch>
      </Router>
      <UserMsg /> */}
    </div>
  )
}
