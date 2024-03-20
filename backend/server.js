const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const http = require('http').createServer(app)

const port = process.env.PORT || 3030

// Config the Express App
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const stationRoutes = require('./api/station/station.routes')
const activityRoutes = require('./api/activity/activity.routes')
const socketRoutes = require('./api/socket/socket.routes')
const { setupSocketAPI } = require('./services/socket.service')


app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/station', stationRoutes)
app.use('/api/activity', activityRoutes)
app.use('/api/socket', socketRoutes)
setupSocketAPI(http)

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
http.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})
