import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentEffect: 'отсутствует',
    currentFile: '',
    initFile: '',
    imgUploadStatus: false,
    modalBoxStatus: false,
    urlInitFile: '',
    urlCurFile: '',
    resolution: '',
    activeFilter: ''

  },
  getters: {
    CUR_EFFECT: state => { return state.currentEffect },
    CUR_FILE: state => { return state.currentFile },
    URL_CUR_FILE: state => { return state.urlCurFile },
    CUR_STATUS: state => { return state.imgUploadStatus },
    MODAL_STATUS: state => { return state.modalBoxStatus },
    INIT_FILE: state => { return state.initFile },
    URL_INIT_FILE: state => { return state.urlInitFile },
    CUR_RESOLUTION: state => { return state.resolution },
    ACT_FILTER: state => { return state.activeFilter }
  },
  mutations: {
    CHANGE_EFF (state, effect) {
      state.currentEffect = effect
    },
    CHANGE_CUR_FILE (state, file) {
      state.currentFile = file
    },
    CHANGE_STATUS (state, status) {
      state.imgUploadStatus = status
    },
    CHANGE_MODAL_STATUS (state, modalStatus) {
      state.modalBoxStatus = modalStatus
    },
    CHANGE_URL_INIT_FILE (state, url) {
      state.urlInitFile = url
    },
    CHANGE_URL_CUR_FILE (state, url) {
      state.urlCurFile = url
    },
    CHANGE_RES (state, res) {
      state.resolution = res
    },
    CHANGE_ACT_FILTER (state, actFil) {
      state.activeFilter = actFil
    },
    CHANGE_INIT_FILE (state, file) {
      state.initFile = file
    }

  },
  actions: {
    changeEffect ({ commit }, effect) {
      const curEffect = effect
      commit('CHANGE_EFF', curEffect)
    },
    changeCurFile ({ commit }, file) {
      const curImg = file
      commit('CHANGE_CUR_FILE', curImg)
    },
    changeInitFile ({ commit }, file) {
      const initImg = file
      commit('CHANGE_INIT_FILE', initImg)
    },
    changeStatus ({ commit }, status) {
      const curStatus = status
      commit('CHANGE_STATUS', curStatus)
    },
    changeModalStatus ({ commit }, modalStatus) {
      const modStatus = modalStatus
      commit('CHANGE_MODAL_STATUS', modStatus)
    },
    changeURLInitFile ({ commit }, url) {
      const urlFile = url
      commit('CHANGE_URL_INIT_FILE', urlFile)
    },
    changeURLCurFile ({ commit }, url) {
      const urlFile = url
      commit('CHANGE_URL_CUR_FILE', urlFile)
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
