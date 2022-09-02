import { writable } from 'svelte/store'

//const user = writable({ username: null, jwt: null })
const userStore = writable(getStorageUser())

// The idea of the login is that once logged in / registered, we are going to pass data to local storage - the username and the token!

function getStorageUser() {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { username: null, jwt: null }
}

export function setStorageUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function setUser(user) {
  userStore.set(user)
}

export function logoutUser() {
  localStorage.clear()
  userStore.set({ username: null, jwt: null })
}
export default userStore
