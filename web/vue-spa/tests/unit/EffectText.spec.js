import { createLocalVue, mount } from '@vue/test-utils'
import EffectText from '../../src/components/EffectText.vue'
import store from '@/store'
import Vuex from 'vuex'

describe('EffectText testing', () => {
  // создаем новый экземпляр Vue приложения с помощью функции  “createLocalVue”
  const vueInstance = createLocalVue()
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = mount(EffectText, {
    vueInstance,
    store
  })
  // используем функцию от Jest “it”, в которой описываем наш первый тест с двумя ожидаемыми результатами:
  it('initialized correctly', () => {
    // ожидаем, что созданная обертка является экземпляром Vue
    expect(wrapper).toBeTruthy()
    expect(wrapper.is(EffectText)).toBe(true)
  })
})

it('when photo is uploaded effect text is "отсутствует"', () => {
  const vueInstance = createLocalVue()
  vueInstance.use(Vuex)
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = mount(EffectText, {
    vueInstance,
    store
  })
  expect(wrapper.vm.$options.name).toMatch('EffectText')
  expect(wrapper).toBeTruthy()
  expect(wrapper.is(EffectText)).toBe(true)
  expect(wrapper.findAll('div').at(1).text()).toMatch('Эффект: отсутствует')
})
