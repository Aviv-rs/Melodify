// import { storageService } from './async-storage.service'
import { socketService } from './socket.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  changeScore,
}

window.userService = userService

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

async function getById(userId) {
  // const user = await storageService.get('user', userId)
  const user = await httpService.get(`user/${userId}`)
  // gWatchedUser = user;
  return user
}
function remove(userId) {
  // return storageService.remove('user', userId)
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  // await storageService.put('user', user)
  user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  // const users = await storageService.query('user')
  // const user = users.find(user => user.username === userCred.username)
  // return _saveLocalUser(user)

  const user = await httpService.post('auth/login', userCred)
  // socketService.emit('set-user-socket', user._id);
  if (user) {
    socketService.login(user._id)
    return saveLocalUser(user)
  }
}
async function signup(userCred) {
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  // socketService.emit('set-user-socket', user._id);
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.emit('unset-user-socket');
  return await httpService.post('auth/logout')
}

async function changeScore(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.score = user.score + by || by
  await update(user)
  return user.score
}

function saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}


// This is relevant when backend is connected
// ;(async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();
