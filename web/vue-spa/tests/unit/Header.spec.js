/* eslint-disable */
import { createLocalVue, mount } from '@vue/test-utils'
import Header from '../../src/components/Header.vue'
// import axios from 'axios'

describe('Header testing', () => {
  // создаем новый экземпляр Vue приложения с помощью функции  “createLocalVue”
  const vueInstance = createLocalVue()
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = mount(Header, {
    vueInstance
  })
  // используем функцию от Jest “it”, в которой описываем наш первый тест с двумя ожидаемыми результатами:
  it('initialized correctly', () => {
    // ожидаем, что созданная обертка является экземпляром Vue
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(Header)).toBe(true)
  })

  it('header is correct', () => {
    expect(wrapper.isVisible()).toBe(true)
    expect(wrapper.classes('header')).toBe(true)
    expect(wrapper.classes()).toContain('header')
    expect(wrapper.is(Header)).toBe(true)
    expect(wrapper.findAll('div').at(0).text()).toMatch('YourEditor')
  })
})
