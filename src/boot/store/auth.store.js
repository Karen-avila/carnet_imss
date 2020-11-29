import ApiLoginService from '@/boot/services/api.login.service'
import JwtService from '@/boot/services/jwt.service'
import { LOGIN } from '@/boot/endpoints/auth'

const state = {
  errors: {},
  user: {},
  isAuthenticated: !!JwtService.getToken(),
  authenting: false
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  },
  authenting (state) {
    return state.authenting
  }
}

const actions = {
  login (context, credentials) {
    return new Promise(resolve => {
      context.commit('setAuthenting', true)
      ApiLoginService.setHeaderLogin()
      ApiLoginService.post(LOGIN, credentials)
        .then(({ data }) => {
          data.token = credentials
          context.commit('setUser', data)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit('setError', ['El usuario y/o la clave son incorrectas.'])
        })
    })
  },
  logout (context) {
    context.commit('logOut')
  },
  sendError (context, error) {
    context.commit('setError', [error])
  },
  verifyAuth (context) {
    if (JwtService.getToken()) {
      context.commit('setAuthenting', true)
      ApiLoginService.setHeaderLogin()
      ApiLoginService.post(LOGIN, JwtService.getToken())
        .then(({ data }) => {
          data.token = JwtService.getToken()
          context.commit('setUser', data)
        })
        .catch(({ response }) => {
          context.commit('setError', ['Las credenciales son incorrectas'])
        })
    } else {
      context.commit('logOut')
    }
  }
}

const mutations = {
  setAuthenting (state) {
    state.authenting = true
  },
  setError (state, error) {
    state.errors = error
    state.authenting = false
  },
  setUser (state, user) {
    state.isAuthenticated = true
    if (!user.pacientes) user.pacientes = []
    state.user = user
    state.errors = {}
    state.authenting = false
    JwtService.saveToken(user.token)
  },
  logOut (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
