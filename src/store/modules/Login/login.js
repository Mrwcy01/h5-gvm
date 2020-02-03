
import store from '@/store'
const state = {
  id: '',
  name: '',
  idTree: '',
  userName: ''
}
// MANA_GE_MENT
const mutations = {
  SET_LOGIN_ID: (state, data) => {
    state.id = data
  },
  SET_LOGIN_NAME: (state, data) => {
    state.name = data
  },
  SET_LOGIN_IDTREE: (state, data) => {
    state.idTree = data
  },
  SET_LOGIN_USER_ACCOUNT: (state, data) => {
    state.userName = data
  }
}
const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
