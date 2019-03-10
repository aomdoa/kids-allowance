import { AUTH_TOKEN } from './constants'
import jwtDecode from 'jwt-decode'

export function getUser () {
  const token = window.localStorage.getItem(AUTH_TOKEN)
  if (token) {
    return jwtDecode(token)
  }
}

export function logout () {
  window.localStorage.removeItem(AUTH_TOKEN)
}
