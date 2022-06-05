import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EMIT_ENTERED_STATION = 'enter-station'
export const SOCKET_EMIT_UPDATE_STATION = 'update-station'
export const SOCKET_EMIT_STATION_UPDATED = 'station-updated'
export const SOCKET_EMIT_ACTIVITY_LOG = 'activity-log-made'
export const SOCKET_EMIT_ACTIVITY_LOG_BRODCAST = 'activity-log-made-brodcast'
const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()

function createSocketService() {
  let socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedinUser()
        if (user) {
          this.login(user._id)
        }
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}

// eslint-disable-next-line
// function createDummySocketService() {
//   let listenersMap = {}
//   const socketService = {
//     listenersMap,
//     setup() {
//       listenersMap = {}
//     },
//     terminate() {
//       this.setup()
//     },
//     login() { },
//     logout() { },
//     on(eventName, cb) {
//       listenersMap[eventName] = [...(listenersMap[eventName] || []), cb]
//     },
//     off(eventName, cb) {
//       if (!listenersMap[eventName]) return
//       if (!cb) delete listenersMap[eventName]
//       else
//         listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
//     },
//     emit(eventName, data) {
//       if (!listenersMap[eventName]) return
//       listenersMap[eventName].forEach(listener => {
//         listener(data)
//       })
//     },
//     debugMsg() {
//       this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
//     },
//   }
//   window.listenersMap = listenersMap
//   return socketService
// }


