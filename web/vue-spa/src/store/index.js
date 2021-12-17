import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentEffect: 'отсутствует',
    currentFile: '',
    imgUploadStatus: false,
    modalBoxStatus: false,
    urlCurFile: '',
    resolution: '',
    activeFilter: ''
  },
  getters: {
    CUR_EFFECT: state => { return state.currentEffect },
    CUR_FILE: state => { return state.currentFile },
    CUR_STATUS: state => { return state.imgUploadStatus },
    MODAL_STATUS: state => { return state.modalBoxStatus },
    CUR_URL_FILE: state => { return state.urlCurFile },
    CUR_RESOLUTION: state => { return state.resolution },
    ACT_FILTER: state => { return state.activeFilter }

  },
  mutations: {
    CHANGE_EFF (state, effect) {
      state.currentEffect = effect
    },
    CHANGE_FILE (state, file) {
      state.currentFile = file
    },
    CHANGE_STATUS (state, status) {
      state.imgUploadStatus = status
    },
    CHANGE_MODAL_STATUS (state, modalStatus) {
      state.modalBoxStatus = modalStatus
    },
    CHANGE_URL_FILE (state, url) {
      state.urlCurFile = url
    },
    CHANGE_RES (state, res) {
      state.resolution = res
    },
    CHANGE_ACT_FILTER (state, actFil) {
      state.activeFilter = actFil
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
    },
    changeModalStatus ({ commit }, modalStatus) {
      const modStatus = modalStatus
      commit('CHANGE_MODAL_STATUS', modStatus)
    },
    changeURLFile ({ commit }, url) {
      const urlFile = url
      commit('CHANGE_URL_FILE', urlFile)
    },
    changeResolution ({ commit }, res) {
      const resFile = res
      commit('CHANGE_RES', resFile)
    },
    changeActiveFilter ({ commit }, act) {
      const actFil = act
      commit('CHANGE_ACT_FILTER', actFil)
    }
  },
  modules: {
  }
})
