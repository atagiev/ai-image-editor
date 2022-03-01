/* eslint-disable */
import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'
import store from '@/store'
import Vuex from 'vuex'
import axios from 'axios'

const mockData = [
  { success: true }
]

jest.mock('axios', () => ({
  get: jest.fn(() => mockData),
  post: jest.fn()
}))

describe('App testing', () => {
  // создаем новый экземпляр Vue приложения с помощью функции  “createLocalVue”
  const vueInstance = createLocalVue()
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = shallowMount(App, {
    vueInstance
  })
  // используем функцию от Jest “it”, в которой описываем наш первый тест с двумя ожидаемыми результатами:
  it('initialized correctly', async () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(App)).toBe(true)
  })
})
