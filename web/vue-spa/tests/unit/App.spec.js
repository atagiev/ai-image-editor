/* eslint-disable */
import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'
import store from '@/store'
import Vuex from 'vuex'
import axios from 'axios'

const mockData = [{ success: true }]

const file = {
  name: 'image.jpg',
  size: 50000,
  type: 'image/jpg'
}

const responseGet = {
  data:
  {
    success: true
  }
}
const responseGetFile = {
  data:
  {
    image: file
  }
}
const responseGetId = {
  data:
  {
    id: 5
  }
}
jest.mock('axios', () => ({
  get: jest.fn(() => mockData),
  post: jest.fn()
}))

jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({ data: file }))

describe('App testing', () => {
  // создаем новый экземпляр Vue приложения с помощью функции  “createLocalVue”
  const vueInstance = createLocalVue()
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = shallowMount(App, {
    vueInstance,
  })

  // используем функцию от Jest “it”, в которой описываем наш первый тест с двумя ожидаемыми результатами:
  it('initialized correctly', async () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(App)).toBe(true)
  })

  it('onChangeStatusInUpload', () => {
    // jest.spyOn(wrapper.vm, 'closeModal')
    wrapper.vm.onChangeStatusInUpload(true)
    expect(wrapper.vm.statusUpload).toBe(true)
    wrapper.vm.onChangeStatusInUpload(false)
    expect(wrapper.vm.statusUpload).toBe(false)
  })
  it('onChangeServerStatus', () => {
    // jest.spyOn(wrapper.vm, 'closeModal')
    wrapper.vm.onChangeServerStatus(true)
    expect(wrapper.vm.isServerOn).toBe(true)
    wrapper.vm.onChangeServerStatus(false)
    expect(wrapper.vm.isServerOn).toBe(false)
  })
  it('onChangeModal', () => {
    // jest.spyOn(wrapper.vm, 'closeModal')
    wrapper.vm.onChangeModal(true, 'errorText', 'acceptError')
    expect(wrapper.vm.isModalVisible).toBe(true)
    expect(wrapper.vm.modalMessage).toMatch('errorText')
    expect(wrapper.vm.userAction).toMatch('acceptError')
  })
  it('isModalVisible = false', () => {
    // jest.spyOn(wrapper.vm, 'closeModal')
    wrapper.vm.showModal()
    expect(wrapper.vm.isModalVisible).toBe(true)
    wrapper.vm.closeModal()
    expect(wrapper.vm.isModalVisible).toBe(false)
  })
})

describe('App testing axios', () => {
  const vueInstance = createLocalVue()
  const wrapper = shallowMount(App, {
    vueInstance,
    store
  })
  it('Testing isServerAnswer', async () => {
    jest.spyOn(wrapper.vm, 'isServerAnswer')
    axios.get.mockResolvedValue(responseGet)
    wrapper.vm.isServerAnswer()
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/ping')
  })
  it('Testing resetBackendStore', async () => {
    jest.spyOn(wrapper.vm, 'resetBackendStore')
    axios.get.mockImplementationOnce(() => Promise.resolve(responseGet))
    wrapper.vm.resetBackendStore()
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/reset')
  })
  it('Testing acceptAction type=accept', async () => {
    jest.spyOn(wrapper.vm, 'acceptAction')
    axios.get.mockImplementationOnce(() => Promise.resolve(responseGetFile))
    await wrapper.vm.acceptAction();
    expect(axios.get).toHaveBeenCalled()
    // expect(axios.get).toHaveBeenCalledWith('')
  })
  it('Testing get_last_saved', async () => {
    jest.spyOn(wrapper.vm, 'acceptAction')
    axios.get.mockImplementationOnce(() => Promise.resolve(responseGetId))
    await wrapper.vm.acceptAction();
    expect(axios.get).toHaveBeenCalled()
    // expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/get_last_saved')
  })
  it('Testing saveImage"', () => {
    // jest.spyOn(axios, "post").mockImplementation(() => Promise.resolve({ data: file }))
    jest.spyOn(wrapper.vm, 'saveImage')
    axios.post.mockImplementationOnce(() => Promise.resolve(responseGet))
    wrapper.vm.saveImage();
    // axios.post.mockResolvedValue(responseGetSize)
    expect(axios.post).toHaveBeenCalled()
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/save_image', expect.any(FormData))
  })
})

describe('App testing acceptAction', () => {
  const vueInstance = createLocalVue()
  const wrapper = shallowMount(App, {
    vueInstance,
    store
  })

  it('Testing acceptAction type=accept', async () => {
    jest.spyOn(wrapper.vm, 'acceptAction')
    axios.get.mockImplementationOnce(() => Promise.resolve(responseGetFile))
    await wrapper.vm.acceptAction();
    expect(axios.get).toHaveBeenCalled()
    // expect(axios.get).toHaveBeenCalledWith('')
  })
  it('Testing acceptAction type=help', async () => {
    const spy = jest.spyOn(wrapper.vm, 'closeModal')
    wrapper.setData({ userAction: 'help' })
    wrapper.vm.acceptAction()
    expect(spy).toHaveBeenCalled()
  })
})
