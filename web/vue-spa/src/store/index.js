import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentEffect: 'отсутствует',
    currentFile: '',
    imgUploadStatus: false
  },
  getters: {
    CUR_EFFECT: state => { return state.currentEffect },
    CUR_FILE: state => { return state.currentFile },
    CUR_STATUS: state => { return state.imgUploadStatus }
  },
  mutations: {
    CHANGE_EFF (state, effect) {
      // Vue.set(state, this.currentEffect, effect)
      state.currentEffect = effect
    },
    CHANGE_FILE (state, file) {
      // Vue.set(state, this.currentEffect, effect)
      state.currentFile = file
    },
    CHANGE_STATUS (state, status) {
      // Vue.set(state, this.currentEffect, effect)
      state.imgUploadStatus = status
    }
  },
  actions: {
    changeEffect ({ commit }, effect) {
      const curEffect = effect
      commit('CHANGE_EFF', curEffect)
    },
    changeFile ({ commit }, file) {
      const curImg = file
      commit('CHANGE_FILE', curImg)
    },
    changeStatus ({ commit }, status) {
      const curStatus = status
      commit('CHANGE_STATUS', curStatus)
    }
  },
  modules: {
  }
})
