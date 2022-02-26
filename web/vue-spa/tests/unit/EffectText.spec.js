import { createLocalVue, mount } from '@vue/test-utils'
import EffectText from '../../src/components/EffectText.vue'
import store from '@/store'
import Vuex from 'vuex'

it('when photo is uploaded effect text is "отсутствует"', () => {
  const vueInstance = createLocalVue()
  vueInstance.use(Vuex)
  // создаем и помещаем в переменную “wrapper” обертку, в которую передаем наш компонент, дополнительно помещая в объект опций созданный экземпляр вью, чтобы  смонтировать и отрендерить наш компонент во Vue-приложении
  const wrapper = mount(EffectText, {
    vueInstance,
    store
  })
  expect(wrapper.vm.$options.name).toMatch('EffectText')
  expect(wrapper.isVueInstance()).toBe(true)
  expect(wrapper.is(EffectText)).toBe(true)
  expect(wrapper.findAll('div').at(1).text()).toMatch('Эффект: отсутствует')
})
